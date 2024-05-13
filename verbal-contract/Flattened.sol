// Sources flattened with hardhat v2.22.3 https://hardhat.org

// SPDX-License-Identifier: MIT

// File contracts/PodcastContract.sol

// Original license: SPDX_License_Identifier: MIT

pragma solidity ^0.8.9;

contract PodcastContract {
    uint256 private _podcastID;

    struct Podcast {
        string ipfsHash;
        address owner;
        uint256 amount;
        address[] supporters;
        uint totalSupport;
    }

    Podcast[] allPodcasts;
    mapping(address => uint[]) userToPodcasts;
    mapping(address => uint) public supportCount;
    mapping(uint256 => Podcast) uintToPodcast;

    event PodcastUploaded(
        uint256 indexed id,
        address indexed owner,
        string ipfsHash
    );

    event PodcastSupported(
        uint256 indexed id,
        address indexed supporter,
        uint256 indexed amount
    );

    modifier podcastExists(uint256 _id) {
        require(_id < _podcastID, "Podcast ID does not exist");
        _;
    }

    modifier onlyPodcastOwner(uint256 _id) {
        require(
            uintToPodcast[_id].owner == msg.sender,
            "Only podcast owner can perform this action"
        );
        _;
    }

    //IPFS HASH SHOULD ALSO CONTAIN THE iMAGE LINK AND TITLE
    function uploadPodcast(string memory _ipfsHash, uint256 _amount) external {
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty");
        require(_amount > 0, "Amount must be greater than zero");

        uint256 id = _podcastID;
        Podcast storage newPodcast = uintToPodcast[id];
        newPodcast.ipfsHash = _ipfsHash;
        newPodcast.amount = _amount;
        newPodcast.owner = msg.sender;

        allPodcasts.push(newPodcast);
        // uintToPodcast[id] = newPodcast;
        userToPodcasts[msg.sender].push(id);

        _podcastID += _podcastID;

        emit PodcastUploaded(id, msg.sender, _ipfsHash);
    }

    function supportPodcast(uint256 _id) external payable podcastExists(_id) {
        Podcast storage podcast = uintToPodcast[_id];
        require(
            podcast.owner != msg.sender,
            "You cannot support your own podcast"
        );
        require(msg.value == podcast.amount, "You must send the exact amount");

        podcast.totalSupport += msg.value;
        payable(podcast.owner).transfer(msg.value);
        supportCount[msg.sender] += 1;
        podcast.supporters.push(msg.sender);
    }

    function retrieveAllPodcasts() external view returns (Podcast[] memory) {
        return allPodcasts;
    }

    function getUserPodcasts(
        address _addr
    ) external view returns (uint[] memory) {
        return userToPodcasts[_addr];
    }

    function getPodcastInfo(uint _id) external view returns (Podcast memory) {
        return uintToPodcast[_id];
    }

    function getAllPodcast() external view returns (Podcast[] memory) {
        return allPodcasts;
    }
}
