import { getWallet } from "./utils";
import { deployContract } from './utils';

export default async function (){
    const contractArtifactName = 'VerbalToken'
    await deployContract(contractArtifactName)

    await deployContract('PodcastContract')

    await deployContract('RewardContract')

    await deployContract('Sessions')
}
