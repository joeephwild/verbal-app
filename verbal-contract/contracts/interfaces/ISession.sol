// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

interface ISessions {
    struct Session {
        address mentor;
        address student;
        bool isAccepted;
        uint256 timeStamp;
        string meetingLink;
        uint256 paymentFee;
        uint256 sessionId;
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

    function isTimeFrameTaken(uint256 _timeStamp) external view returns (bool);

    function scheduleASession(
        address _mentor,
        uint256 _timestamp,
        string memory _meetingLink
    ) external;

    function cancelSession(uint256 _sessionId) external;

    function acceptSession(uint256 _sessionId) external;

    function getUserSessions(
        address _userAddress
    ) external view returns (uint[] memory);

    function getSessionDetails(
        uint256 _sessionId
    ) external view returns (Session memory);

    function sessionsAttendedCount(
        address _userAddress
    ) external view returns (uint);

    function sessionsMentoredCount(
        address _userAddress
    ) external view returns (uint);

    function registerMentorPrice(uint256 _amount) external;

    function fetchMentorsPrice(address _addr) external view returns (uint256);
}
