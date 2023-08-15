import axios, { AxiosRequestConfig } from "axios";
import { pinata_apikey, pinata_secret, sendJsonHeader } from "./config";

export async function sendJSONToIPFS(metadata) {
  const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
  const data = {
    pinataMetadata: {
      name: "listdata",
    },
    pinataOptions: {
      cidVersion: 1,
    },
    pinataContent: {
      profileInfo: {
        metadataDetails: metadata,
      },
    },
  };
  const response = await axios.post(url, JSON.stringify(data), sendJsonHeader);
  const hash = `ipfs://${response.data.IpfsHash}`;
  return hash;
}

export async function sendDataToIPFS(metadata) {
  const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
  const data = {
    pinataMetadata: {
      name: "listcontent",
    },
    pinataOptions: {
      cidVersion: 1,
    },
    pinataContent: {
      contentInfo: {
        content: metadata,
      },
    },
  };
  const response = await axios.post(url, JSON.stringify(data), sendJsonHeader);
  const hash = `ipfs://${response.data.IpfsHash}`;
  return hash;
}

export async function sendFileToIPFS(file) {
  const formData = new FormData();
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  formData.append("file", file);
  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", pinataOptions);
  const config = {
    headers: {
      "Content-Type": `multipart/form-data`,
      pinata_api_key: pinata_apikey,
      pinata_secret_api_key: pinata_secret,
      Accept: "text/plain",
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  };
  const response = await axios.post(url, formData, config);
  return response.data.IpfsHash;
}
