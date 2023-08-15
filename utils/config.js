export const pinata_apikey = "91edb486947fd2178d8f";
export const pinata_secret = "23771193399d44f2665856c9d29c153adcd5605bd1b17afcc259e7d914ad38a0";

export const readHeader = {
  "Content-Type": "application/json",
};

export const getHeader = {
  headers: {
    pinata_api_key: pinata_apikey,
    pinata_secret_api_key: pinata_secret,
  },
};

export const sendJsonHeader = {
  headers: {
    "Content-Type": "application/json",
    pinata_api_key: pinata_apikey,
    pinata_secret_api_key: pinata_secret,
  },
};