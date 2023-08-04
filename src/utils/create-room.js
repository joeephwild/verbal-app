import axios from "axios";

export const createroom = async () => {
  const response = await axios.post(
    "https://api.huddle01.com/api/v1/create-room",
    {
      title: "Huddle01-Test",
      hostWallets: ["0x29f54719E88332e70550cf8737293436E9d7b10b"],
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "{{API_KEY}}", // Replace {{API_KEY}} with the actual API key
      },
    }
  );
  return response.data; // Return the data from the response
};
