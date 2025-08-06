import axiosServices from "../utils/axios";
import { cookieStorage } from "../utils/cookie";

const API_URL = "/playlists";

// Add a new playlist
export const addPlaylistService = async (name, description) => {
  try {
    const response = await axiosServices.post(
      API_URL,
      {
        name,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${cookieStorage.getItem("jwt_token")}`,
        },
      }
    );
    return response.data; // Returning the response data (the newly created playlist)
  } catch (error) {
    console.error("Error adding playlist:", error);
    throw new Error("Error adding playlist");
  }
};

// Get all playlists
export const getPlaylistsService = async () => {
  try {
    const response = await axiosServices.get(API_URL, {
      headers: {
        Authorization: `Bearer ${cookieStorage.getItem("jwt_token")}`,
      },
    });
    return response.data; // Returning the list of playlists
  } catch (error) {
    console.error("Error fetching playlists:", error);
    throw new Error("Error fetching playlists");
  }
};

// Update a playlist
export const updatePlaylistService = async (playlistId, name, description) => {
  console.log("Updating playlist:", playlistId, name, description);
  try {
    const response = await axiosServices.put(
      `${API_URL}/${playlistId}`,
      {
        name,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${cookieStorage.getItem("jwt_token")}`,
        },
      }
    );
    return response.data; // Returning the updated playlist data
  } catch (error) {
    console.error("Error updating playlist:", error);
    throw new Error("Error updating playlist");
  }
};

// Delete a playlist
export const deletePlaylistService = async (playlistId) => {
  try {
    const response = await axiosServices.delete(`${API_URL}/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${cookieStorage.getItem("jwt_token")}`,
      },
    });
    return response.data; // Returning the success message or response
  } catch (error) {
    console.error("Error deleting playlist:", error);
    throw new Error("Error deleting playlist");
  }
};

// Add song to a playlist
export const addSongToPlaylistService = async (playlistId, songId, title, artist) => {
  try {
    const response = await axiosServices.post(
      `${API_URL}/${playlistId}/songs`,
      {
        songId,
        title,
        artist,
      },
      {
        headers: {
          Authorization: `Bearer ${cookieStorage.getItem("jwt_token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding song to playlist:", error);
    throw new Error("Error adding song to playlist");
  }
};

// Remove song from a playlist
export const deleteSongFromPlaylistService = async (playlistId, songId) => {
  try {
    const response = await axiosServices.delete(
      `${API_URL}/${playlistId}/songs/${songId}`,
      {
        headers: {
          Authorization: `Bearer ${cookieStorage.getItem("jwt_token")}`,
        },
      }
    );
    return response.data; 
  } catch (error) {
    console.error("Error removing song from playlist:", error);
    throw new Error("Error removing song from playlist");
  }
};