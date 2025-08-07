import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, useTheme } from "@mui/material";
import { RiAddFill } from "react-icons/ri";
import {
  addPlaylistService,
  getPlaylistsService,
  updatePlaylistService,
  deletePlaylistService,
  deleteSongFromPlaylistService,
} from "../../services/playlistService";
import ConfirmDialog from "../../components/common/ConfirmDailog";
import CustomButton from "../../components/common/CustomButton";
import PlaylistCard from "../../components/PlaylistCard";
import EmptyDashboardState from "../../components/EmptyDashboardState";
import PlaylistDialog from "../../components/DashboardPlaylistDailog";

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [playlists, setPlaylists] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await getPlaylistsService();
        setPlaylists(data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };
    fetchPlaylists();
  }, []);

  const handleOpenDialog = (playlist = null) => {
    setCurrentPlaylist(playlist);
    setFormData({
      name: playlist?.name || "",
      description: playlist?.description || "",
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentPlaylist(null);
    setFormData({ name: "", description: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (currentPlaylist) {
        const updatedPlaylist = await updatePlaylistService(
          currentPlaylist._id,
          formData.name,
          formData.description
        );
        setPlaylists(
          playlists.map((pl) =>
            pl._id === currentPlaylist._id ? updatedPlaylist : pl
          )
        );
      } else {
        const newPlaylist = await addPlaylistService(
          formData.name,
          formData.description
        );
        setPlaylists([...playlists, newPlaylist]);
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error submitting playlist:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (deletingItem?.type === "playlist") {
        await deletePlaylistService(deletingItem.id);
        setPlaylists(playlists.filter((pl) => pl._id !== deletingItem.id));
      } else if (deletingItem?.type === "song") {
        await deleteSongFromPlaylistService(
          deletingItem.playlistId,
          deletingItem.songId
        );
        setPlaylists(
          playlists.map((pl) =>
            pl._id === deletingItem.playlistId
              ? {
                  ...pl,
                  songs: pl.songs.filter(
                    (song) => song.id !== deletingItem.songId
                  ),
                }
              : pl
          )
        );
      }
    } catch (error) {
      console.error("Error deleting:", error);
    } finally {
      setOpenConfirmDialog(false);
      setDeletingItem(null);
    }
  };

  const handleAddSongs = () => navigate("/songs");

  return (
    <Box sx={{ p: 3, maxWidth: "1800px", margin: "0 auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          My Playlists
        </Typography>

        <CustomButton
          title="New Playlist"
          Icon={RiAddFill}
          variant="primary"
          state="Filled"
          onClick={() => handleOpenDialog()}
        />
      </Box>

      {playlists.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3, // Material-UI spacing units
            "& > *": {
              flex: {
                xs: "1 1 100%", // 1 card per row on mobile
                sm: "1 1 calc(50% - 12px)", // 2 cards per row on tablet
                md: "1 1 calc(33.333% - 16px)", // 3 cards per row on desktop
              },
              minWidth: {
                xs: "100%",
                sm: "calc(50% - 12px)",
                md: "calc(33.333% - 16px)",
              },
            },
          }}
        >
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist._id}
              playlist={playlist}
              onEdit={handleOpenDialog}
              onDelete={(id) => {
                setDeletingItem({ id, type: "playlist" });
                setOpenConfirmDialog(true);
              }}
              onAddSongs={handleAddSongs}
              onRemoveSong={(playlistId, songId) => {
                setDeletingItem({ playlistId, songId, type: "song" });
                setOpenConfirmDialog(true);
              }}
              theme={theme}
            />
          ))}
        </Box>
      ) : (
        <EmptyDashboardState onCreatePlaylist={() => handleOpenDialog()} />
      )}

      <ConfirmDialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={handleDelete}
        title={
          deletingItem?.type === "playlist" ? "Delete Playlist" : "Remove Song"
        }
        message={
          deletingItem?.type === "playlist"
            ? "Are you sure you want to delete this playlist? This action cannot be undone."
            : "Are you sure you want to remove this song from the playlist?"
        }
      />

      <PlaylistDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        currentPlaylist={currentPlaylist}
        formData={formData}
        onInputChange={handleInputChange}
      />
    </Box>
  );
};

export default Dashboard;
