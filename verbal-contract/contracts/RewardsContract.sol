// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IPodcast.sol";
import "./interfaces/ISession.sol";

contract RewardsContract is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    IPodcastContract public immutable podcastContract;
    ISessions public immutable sessionsContract;
    IERC20 public immutable tokenContract;

    constructor(
        address _podcastContract,
        address _sessionsContract,
        address _verbalToken
    ) ERC721("Verbal Rewards NFT", "RNFT") {
        podcastContract = IPodcastContract(_podcastContract);
        sessionsContract = ISessions(_sessionsContract);
        tokenContract = IERC20(_verbalToken);
    }

    //keeping count of rewards
    mapping(address => uint) countOfUploadPodcastRewards;
    mapping(address => uint) countOfSupportRewards;
    mapping(address => uint) countOfAttendanceRewards;
    mapping(address => uint) countOfMentoringRewards;

    function checkAndReward(address _user) external {
        // Check if the user uploaded a podcast
        uint[] memory usersPodcasts = podcastContract.getUserPodcasts(_user);
        if (
            countOfUploadPodcastRewards[_user] != 0 &&
            countOfUploadPodcastRewards[_user] % 30 == 0
        ) {
            //mint NFT for every 30 uploads
            _mintNFT(_user);
        }
        if (usersPodcasts.length > countOfUploadPodcastRewards[_user]) {
            //award 1 token for every podcast  upload
            uint tokensEarned = usersPodcasts.length -
                countOfUploadPodcastRewards[_user];
            countOfUploadPodcastRewards[_user] += tokensEarned;
            tokenContract.transfer(_user, tokensEarned);
            return;
        }

        // Check if the user supported a podcast
        uint userSupportCount = podcastContract.supportCount(_user);
        if (
            countOfSupportRewards[_user] != 0 &&
            countOfSupportRewards[_user] % 20 == 0
        ) {
            //mint NFT for every 20 supports
            _mintNFT(_user);
        }
        if (userSupportCount > countOfSupportRewards[_user]) {
            //award 2 token for every support
            uint tokensEarned = userSupportCount - countOfSupportRewards[_user];
            countOfSupportRewards[_user] += ((tokensEarned) * 2);
            tokenContract.transfer(_user, tokensEarned * 2);
            return;
        }

        // Check if the user attended a session
        uint userAttendance = sessionsContract.sessionsAttendedCount(_user);
        if (
            countOfAttendanceRewards[_user] != 0 &&
            countOfAttendanceRewards[_user] % 10 == 0
        ) {
            //mint NFT for every 10 attendance
            _mintNFT(_user);
        }
        if (userAttendance > countOfAttendanceRewards[_user]) {
            //award 1 token for every attendance
            uint tokensEarned = userAttendance -
                countOfAttendanceRewards[_user];
            countOfAttendanceRewards[_user] += tokensEarned;
            tokenContract.transfer(_user, tokensEarned);
            return;
        }

        // Check if the user mentored a session
        uint userMentoringCount = sessionsContract.sessionsMentoredCount(_user);
        if (
            countOfMentoringRewards[_user] != 0 &&
            countOfMentoringRewards[_user] % 12 == 0
        ) {
            //mint NFT for every 12 mentoring
            _mintNFT(_user);
        }
        if (userMentoringCount > countOfMentoringRewards[_user]) {
            //award 2 token for every mentoring
            uint tokensEarned = userMentoringCount -
                countOfMentoringRewards[_user];
            countOfMentoringRewards[_user] += ((tokensEarned) * 2);
            tokenContract.transfer(_user, tokensEarned * 2);
            return;
        }
    }

    function _mintNFT(address _user) internal {
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        _mint(_user, tokenId);
    }

    function getCountOfUploadPodcastRewards(
        address userAddress
    ) external view returns (uint) {
        return countOfUploadPodcastRewards[userAddress];
    }

    function getCountOfSupportRewards(
        address userAddress
    ) external view returns (uint) {
        return countOfSupportRewards[userAddress];
    }

    function getCountOfAttendanceRewards(
        address userAddress
    ) external view returns (uint) {
        return countOfAttendanceRewards[userAddress];
    }

    function getCountOfMentoringRewards(
        address userAddress
    ) external view returns (uint) {
        return countOfMentoringRewards[userAddress];
    }
}
