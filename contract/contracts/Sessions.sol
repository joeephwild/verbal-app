// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract Sessions {
    using Counters for Counters.Counter;

    Counters.Counter private _sessionID;

    struct Session {
        address mentor;
        address student;
        bool isAccepted;
        uint256 timeStamp;
        string meetingLink;
        uint256 paymentFee;
        uint256 sessionId;
        string topic;
    }

    event SessionScheduled(
        address indexed mentor,
        address indexed student,
        uint256 fee,
        string meetingLink,
        uint256 indexed id
    );
    event SessionCancelled(uint256 indexed sessionId);
    event SessionAccepted(uint256 indexed sessionId);

    Session[] public allSessions;
    //mapping an address to all Id of it sessions
    mapping(address => uint[]) public addressToSessions;
    mapping(uint256 => Session) public uintToSession;

    mapping(address => uint) public sessionsAttendedCount;
    mapping(address => uint) public sessionsMentoredCount;

    mapping(address => uint) mentorsPrice;

    modifier isTimeFrameAlreadyTaken(uint256 _timeStamp) {
        require(!isTimeFrameTaken(_timeStamp), "Timeframe is already taken");
        _;
    }

    function isTimeFrameTaken(uint256 _timeStamp) public view returns (bool) {
        for (uint256 i = 0; i < allSessions.length; i++) {
            if (allSessions[i].timeStamp == _timeStamp) {
                return true;
            }
        }
        return false;
    }

    function scheduleASession(
        address _mentor,
        uint256 _timestamp,
        string memory _meetingLink,
        uint256 _paymentFee,
        string memory _topic
    ) external payable isTimeFrameAlreadyTaken(_timestamp) {
        require(fetchMentorsPrice(_mentor) != 0, "Invalid Mentor");
        require(msg.value >= fetchMentorsPrice(_mentor), "Cant pay mentor");

        uint256 id = _sessionID.current();
        Session storage newSession = uintToSession[id];
        newSession.mentor = _mentor;
        newSession.student = msg.sender;
        newSession.meetingLink = _meetingLink;
        newSession.timeStamp = _timestamp;
        newSession.sessionId = id;
        newSession.paymentFee = _paymentFee;
        newSession.topic = _topic;
        allSessions.push(newSession);
        addressToSessions[msg.sender].push(id);
        uintToSession[id] = newSession;
        _sessionID.increment();

        emit SessionScheduled(
            _mentor,
            msg.sender,
            newSession.paymentFee,
            _meetingLink,
            id
        );
    }

    function cancelSession(uint256 _sessionId) external {
        Session storage session = uintToSession[_sessionId];
        require(
            session.student == msg.sender || session.mentor == msg.sender,
            "You are not authorized to make changes to this session"
        );
        if (msg.sender == session.mentor) {
            session.isAccepted = false;
            // addressToSessions[session.student].isAccepted = true;
        } else {
            (bool success, ) = payable(session.mentor).call{value: fetchMentorsPrice(session.mentor)}("");
            require(success, "Transfer failed.");
            delete addressToSessions[msg.sender][_sessionId];
            delete uintToSession[_sessionId];
        }

        emit SessionCancelled(_sessionId);
    }

    function getAllSession() external view returns (Session[] memory) {
        return allSessions;
    }

    function acceptSession(uint256 _sessionId) external {
        Session storage session = uintToSession[_sessionId];
        require(
            session.mentor == msg.sender,
            "You are not the mentor of this session"
        );
        require(session.isAccepted == false, "Already accepted");
        session.isAccepted = true;
          (bool success, ) = payable(session.mentor).call{value: fetchMentorsPrice(session.mentor)}("");
            require(success, "Transfer failed.");
        sessionsMentoredCount[session.mentor] += 1;
        sessionsAttendedCount[session.student] += 1;

        // addressToSessions[session.student].isAccepted = true;
        emit SessionAccepted(_sessionId);
    }

    function registerMentorPrice(uint _amount) external {
        require(_amount != 0, "CAnt set zero amount");
        mentorsPrice[msg.sender] = _amount;
    }

    function fetchMentorsPrice(address _addr) public view returns (uint) {
        return mentorsPrice[_addr];
    }

    function getUserSessions(
        address _userAddress
    ) external view returns (uint[] memory) {
        return addressToSessions[_userAddress];
    }

    function getSessionDetails(
        uint _sessionId
    ) external view returns (Session memory) {
        return uintToSession[_sessionId];
    }
}
