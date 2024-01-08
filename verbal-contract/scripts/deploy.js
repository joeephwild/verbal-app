// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = hre.ethers.parseEther("0.001");

  const session = await hre.ethers.deployContract("Sessions");
  const podcast = await hre.ethers.deployContract("PodcastContract");
  const verbalToken = await hre.ethers.deployContract("VerbalToken");

  await session.waitForDeployment();
  await podcast.waitForDeployment();
  await verbalToken.waitForDeployment();

  console.log(`session deployed to ${session.target}`);
  console.log(`podcast deployed to ${podcast.target}`);
  console.log(`value deployed to ${verbalToken.target}`);

  const rewardContract = await hre.ethers.deployContract("RewardsContract", [
    podcast.target,
    session.target,
    verbalToken.target,
  ]);

  await new Promise((resolve) => setTimeout(resolve, 5000));

  await verbalToken.initFunction(rewardContract.target);

  console.log(`reward deployed to ${rewardContract.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
