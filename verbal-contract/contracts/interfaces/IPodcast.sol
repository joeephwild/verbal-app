// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

interface IPodcastContract {
    struct Podcast {
        string ipfsHash;
        address owner;
        uint256 amount;
        address[] supporters;
        uint totalSupport;
    }

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

    function uploadPodcast(string memory _ipfsHash, uint256 _amount) external;

    function supportPodcast(uint256 _id) external payable;

    function retrieveAllPodcasts() external view returns (Podcast[] memory);

    function getUserPodcasts(
        address _addr
    ) external view returns (uint[] memory);

    function getPodcastInfo(uint _id) external view returns (Podcast memory);

    function supportCount(address) external view returns (uint);
}
