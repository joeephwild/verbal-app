import { ethers } from "ethers";
import { getAccountPhrase } from "@rly-network/mobile-sdk";

import {
  VerbalAddress,
  SessionsAddress,
  PodcastAddress,
  RewardsAddress,
  VerbalABI,
  SessionsABI,
  PodcastABI,
  RewardsABI,
} from "../constants/contract";

// // Convert wei value to ether
const etherValue = (weiValue) => ethers.utils.formatEther(weiValue);

// Convert number to wei value
const weiValue = (number) => ethers.utils.parseUnits(String(number), "wei");

const gasLimit = 1000000;

export const connectWithEnsContract = async (contractAddress, contractAbi) => {
  const mnemonic = await getAccountPhrase();
  const privateKey =
    ethers.Wallet.fromMnemonic(mnemonic)._signingKey().privateKey;
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_goerli",
    "goerli"
  );
  const wallet = new ethers.Wallet(privateKey, provider);

  const myContract = new ethers.Contract(contractAddress, contractAbi, wallet);
  return myContract;
};

export const connectWithContract = async (contractAddress, contractAbi) => {
  const mnemonic = await getAccountPhrase();
  const privateKey =
    ethers.Wallet.fromMnemonic(mnemonic)._signingKey().privateKey;
  const provider = new ethers.providers.JsonRpcProvider(
    "https://linea-testnet.rpc.thirdweb.com/"
  );

  const wallet = new ethers.Wallet(privateKey, provider);

  const myContract = new ethers.Contract(contractAddress, contractAbi, wallet);
  return myContract;
};

export const fetchUserVerbalTokenBalance = async (userAddress) => {
  try {
    const contract = await connectWithContract(VerbalAddress, VerbalABI);
    const userTokenBalance = await contract?.balanceOf(userAddress);
    console.log("USER BALANCE IS ___", userTokenBalance);
    return userTokenBalance;
  } catch (error) {
    console.log(error.message);
  }
};

export const registerAsMentor = async (mentorPrice) => {
  //note that this function takes the caller as the person registering his mentor price
  try {
    const contract = await connectWithContract(SessionsAddress, SessionsABI);
    await contract?.registerMentorPrice(weiValue(mentorPrice));
  } catch (error) {
    console.log(error.message);
  }
};

export const scheduleASession = async (
  mentorAddress,
  timestamp,
  meetingLink,
  mentorPrice,
  topic
) => {
  //note that this functionn schedules a session, timestamp:int, mentorPrice: int, meetingLink: string(IPFS HASH), address of the mentor
  try {
    const contract = await connectWithContract(SessionsAddress, SessionsABI);
    const session = await contract?.scheduleASession(
      mentorAddress,
      timestamp,
      meetingLink,
      mentorPrice,
      topic,
      {
        value: weiValue(mentorPrice),
        gasLimit: gasLimit,
      }
    );
    let hashUrl = `https://goerli.lineascan.build/tx/${session.hash}`;
    console.log(`Commitment pending: https://goerli.lineascan.build/tx/${session.hash}`);
    return hashUrl;
  } catch (error) {
    console.log(error.message);
  }
};

export const getSessionIds = async (address) => {
  //note that this fucntion gets all session ids tied to the account, should return an array
  try {
    const contract = await connectWithContract(SessionsAddress, SessionsABI);
    const sessionIds = await contract?.getUserSessions(address);
    return sessionIds;
  } catch (error) {
    console.log(error.message);
  }
};

export const getSessionDetails = async (sessionId) => {
  //note that this fucntion gets info about the sesion, returns an object
  try {
    const contract = await connectWithContract(SessionsAddress, SessionsABI);
    const sessionDetails = await contract?.getSessionDetails(sessionId);
    return sessionDetails;
  } catch (error) {
    console.log(error.message);
  }
};

export const cancelSession = async (sessionId) => {
  //note that this fucntion cancels a session, takes msg.sender as caller
  try {
    const contract = await connectWithContract(SessionsAddress, SessionsABI);
    await contract?.cancelSession(sessionId);
    return true;
  } catch (error) {
    console.log(error.message);
  }
};

export const acceptSession = async (sessionId) => {
  //note that this fucntion accepts a session, takes msg.sender as caller
  try {
    const contract = await connectWithContract(SessionsAddress, SessionsABI);
    await contract?.acceptSession(sessionId);
    return true;
  } catch (error) {
    console.log(error.message);
  }
};

//PODCASTSSSS

export const uploadAPodcast = async (ipfsHash, podcastPrice) => {
  //note that this fucntion uploads a podcast takes the IPFS HASH (string)and the podcast price, takes msg.sender as caller
  try {
    const contract = await connectWithContract(PodcastAddress, PodcastABI);
    const podcast = await contract?.uploadPodcast(
      ipfsHash,
      weiValue(podcastPrice)
    );
    let hashUrl = `https://goerli.lineascan.build/tx/${podcast.hash}`;
    console.log(`Commitment pending: https://goerli.lineascan.build/tx/${podcast.hash}`);
    return hashUrl; //returns true for successful upload
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserPodcastsId = async (address) => {
  //note that this fucntion gets all podcast tied to an account, return array
  try {
    const contract = await connectWithContract(PodcastAddress, PodcastABI);
    const podcastIds = await contract?.getUserPodcasts(address);

    return podcastIds.hash;
  } catch (error) {
    console.log(error.message);
  }
};

export const getPodcastDetails = async (podcastId) => {
  //note that this fucntion gets info about the  podcast, returns an object
  try {
    const contract = await connectWithContract(PodcastAddress, PodcastABI);
    const podcastDetails = await contract?.getPodcastInfo(podcastId);
    return podcastDetails;
  } catch (error) {
    console.log(error.message);
  }
};

export const supportAPodcast = async (podcastId, supportAmount) => {
  //note that this fucntion allows supporting a podcast takes id and amount needed
  try {
    const contract = await connectWithContract(PodcastAddress, PodcastABI);
    await contract?.supportPodcast(podcastId, {
      value: weiValue(supportAmount),
    });
    return true; //returns true for successful support
  } catch (error) {
    console.log(error.message);
  }
};

//REWARDSSSSSSS
export const checkAndReward = async (address) => {
  //note that this fucntion checks an address worthy of rewards and rewards it where neccessary
  try {
    const contract = await connectWithContract(RewardsAddress, RewardsABI);
    await contract?.checkAndReward(address);
    return true; //returns true for success
  } catch (error) {
    console.log(error.message);
  }
};
// Other Reward function for returning values to track users total rewards

export const getPodcastRewardsCount = async (address) => {
  try {
    const contract = await connectWithContract(RewardsAddress, RewardsABI);
    const count = await contract?.getCountOfUploadPodcastRewards(address);
    return count;
  } catch (error) {
    console.log(error.message);
  }
};
export const getSupportRewardsCount = async (address) => {
  try {
    const contract = await connectWithContract(RewardsAddress, RewardsABI);
    const count = await contract?.getCountOfSupportRewards(address);
    return count;
  } catch (error) {
    console.log(error.message);
  }
};
export const getAttendanceRewardsCount = async (address) => {
  try {
    const contract = await connectWithContract(RewardsAddress, RewardsABI);
    const count = await contract?.getCountOfAttendanceRewards(address);
    return count;
  } catch (error) {
    console.log(error.message);
  }
};
export const getMentoringRewardsCount = async (address) => {
  try {
    const contract = await connectWithContract(RewardsAddress, RewardsABI);
    const count = await contract?.getCountOfMentoringRewards(address);
    return count;
  } catch (error) {
    console.log(error.message);
  }
};
// export function addAvalancheNetwork() {
//   injected.getProvider().then((provider) => {
//     provider
//       .request({
//         method: "wallet_addEthereumChain",
//         params: [AVALANCHE_MAINNET_PARAMS],
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   });
// }
