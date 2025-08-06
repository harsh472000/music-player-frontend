import axios from "axios";
import { VITE_CLIENT_ID, VITE_CLIENT_SECRET } from "../utils/environment";

// Base Spotify API URL
const SPOTIFY_API_URL = "https://api.spotify.com/v1";

// Get access token for Spotify API
const getAccessToken = async () => {
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${VITE_CLIENT_ID}:${VITE_CLIENT_SECRET}`)}`,
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting Spotify access token:", error);
    throw new Error("Failed to authenticate with Spotify API");
  }
};

// Search for tracks
// export const searchTracks = async (query, limit = 10) => {
//   try {
//     const token = await getAccessToken();
//     const response = await axios.get(`${SPOTIFY_API_URL}/search`, {
//       params: {
//         q: query,
//         type: "track",
//         limit: limit,
//       },
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data.tracks.items;
//   } catch (error) {
//     console.error("Error searching tracks:", error);
//     throw new Error("Failed to search tracks");
//   }
// };

export const searchTracks = async (query, limit = 10, offset = 0) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get(`${SPOTIFY_API_URL}/search`, {
      params: {
        q: query,
        type: "track",
        limit: limit,
        offset: offset,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.tracks;
  } catch (error) {
    console.error("Error searching tracks:", error);
    throw new Error("Failed to search tracks");
  }
};
