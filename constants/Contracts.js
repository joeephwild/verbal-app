import verbalAbi from "./VerbalToken.json";
import sessionsAbi from "./Sessions.json";
import podcastAbi from "./PodcastContract.json";
import rewardsAbi from "./RewardsContract.json";

const VerbalContract = "0x13Dc55d50a67C882Cf9930281C91688489642789";
const PodcastContract = "0x2413916b5b6d5d13770fba2F05e0BA04411a6691";
const SessionsContract = "0xfFDd21F23227c8776fF691635482EF3aFF6D750f";
const RewardsContract = "0xb00ca2cc9d7d6D4B72C55C356f8B911a9d8a8350";

const VerbalABI = verbalAbi.abi;
const SessionsABI = sessionsAbi.abi;
const PodcastABI = podcastAbi.abi;
const RewardsABI = rewardsAbi.abi;
export {
  VerbalContract,
  VerbalABI,
  PodcastContract,
  PodcastABI,
  SessionsContract,
  SessionsABI,
  RewardsContract,
  RewardsABI,
};
