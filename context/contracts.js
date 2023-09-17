import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

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

const ContractContext = createContext();

export function ContractProvider({ children }) {
  const [contracts, setContracts] = useState({
    verbalToken: null,
    session: null,
    podcast: null,
    rewards: null,
  });

  // Initialize contract instances when the context is created
  useEffect(() => {
    async function initContracts() {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.ALCHEMY_RPC_URL
      );
      const signer = provider.getSigner();

      const verbalTokenContract = new ethers.Contract(
        VerbalAddress,
        VerbalABI,
        signer
      );
      const sessionContract = new ethers.Contract(
        SessionsAddress,
        SessionsABI,
        signer
      );
      const podcastContract = new ethers.Contract(
        PodcastAddress,
        PodcastABI,
        signer
      );
      const rewardsContract = new ethers.Contract(
        RewardsAddress,
        RewardsABI,
        signer
      );

      setContracts({
        verbalToken: verbalTokenContract,
        session: sessionContract,
        podcast: podcastContract,
        rewards: rewardsContract,
      });
    }

    initContracts();
  }, []);

  return (
    <ContractContext.Provider value={...contracts}>
      {children}
    </ContractContext.Provider>
  );
}

export function useContracts() {
  return useContext(ContractContext);
}
