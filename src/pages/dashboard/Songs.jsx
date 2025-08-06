import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  CircularProgress,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ListItemButton,
  Divider,
  Grid,
  Avatar,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { VITE_CLIENT_ID, VITE_CLIENT_SECRET } from "../../utils/environment";
import { addSongToPlaylistService } from "../../services/playlistService";
import { getPlaylistsService } from "../../services/playlistService";
import { IoSearchCircleOutline } from "react-icons/io5";
import CustomButton from "../../components/common/CustomButton";
import { RiSearch2Line } from "react-icons/ri";
import { searchTracks } from "../../services/spotifyService";

const Songs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 10,
    total: 0,
  });

  const CLIENT_ID = VITE_CLIENT_ID;
  const CLIENT_SECRET = VITE_CLIENT_SECRET;

  // Get access token when component mounts
  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          "grant_type=client_credentials",
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
            },
          }
        );
        setAccessToken(response.data.access_token);
      } catch (err) {
        setError("Failed to authenticate with Spotify API");
        console.error(err);
      }
    };

    getAccessToken();
  }, [CLIENT_ID, CLIENT_SECRET]);

  // Fetch playlists from the backend
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const playlistsData = await getPlaylistsService();
        setPlaylists(playlistsData);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };
    fetchPlaylists();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);
    setPagination({ ...pagination, offset: 0 }); // Reset pagination to the first page

    try {
      const results = await searchTracks(searchQuery, pagination.limit, 0); // Start from offset 0
      setSearchResults(results.items);
      setPagination({
        offset: 0,
        limit: pagination.limit,
        total: results.total, // Set the total number of results
      });
    } catch (err) {
      setError("Failed to fetch songs. Please try again later.");
      console.error(err);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };
  const handleNextPage = async () => {
    if (pagination.offset + pagination.limit >= pagination.total) return;

    setPagination((prev) => ({
      ...prev,
      offset: prev.offset + prev.limit,
    }));

    try {
      const results = await searchTracks(
        searchQuery,
        pagination.limit,
        pagination.offset + pagination.limit
      );
      setSearchResults(results.items);
    } catch (err) {
      setError("Failed to fetch songs. Please try again later.");
      console.error(err);
    }
  };

  const handlePrevPage = async () => {
    if (pagination.offset <= 0) return;

    setPagination((prev) => ({
      ...prev,
      offset: prev.offset - prev.limit,
    }));

    try {
      const results = await searchTracks(
        searchQuery,
        pagination.limit,
        pagination.offset - pagination.limit
      );
      setSearchResults(results.items);
    } catch (err) {
      setError("Failed to fetch songs. Please try again later.");
      console.error(err);
    }
  };

  const handleAddToPlaylist = async (playlistId) => {
    if (!playlistId) return;

    try {
      await addSongToPlaylistService(
        playlistId,
        selectedSong.id,
        selectedSong.name,
        selectedSong.artists.map((a) => a.name).join(", ")
      );
      setOpenDialog(false);
      // Show a subtle success message instead of alert
      setError({
        type: "success",
        message: `"${selectedSong.name}" added to playlist!`,
      });
      setTimeout(() => setError(null), 3000);
    } catch (error) {
      console.error("Error adding song to playlist:", error);
      setError({ type: "error", message: "Failed to add song to playlist" });
    }
  };

  const handleCreateNewPlaylist = async () => {
    if (!newPlaylistName.trim()) {
      setError({
        type: "error",
        message: "Please enter a name for the new playlist.",
      });
      return;
    }

    try {
      const newPlaylist = await axios.post(
        "/api/playlists",
        { name: newPlaylistName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      );
      setPlaylists((prev) => [...prev, newPlaylist.data]);
      setNewPlaylistName("");
      setError({
        type: "success",
        message: `Created new playlist: ${newPlaylistName}`,
      });
    } catch (error) {
      console.error("Error creating new playlist:", error);
      setError({ type: "error", message: "Failed to create playlist" });
    }
  };

  const renderEmptyState = () => {
    if (loading) return null;

    if (!hasSearched) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "300px",
            textAlign: "center",
            p: 4,
          }}
        >
          <MusicNoteIcon
            sx={{ fontSize: 80, color: "text.secondary", mb: 2 }}
          />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Discover New Music
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: "500px", mb: 3 }}
          >
            Search for your favorite songs, artists, or albums to get started.
            Click the search button to explore the world of music.
          </Typography>
        </Box>
      );
    }

    if (hasSearched && searchResults.length === 0) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "200px",
            textAlign: "center",
            p: 4,
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No results found for "{searchQuery}"
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Try a different search term or check your spelling.
          </Typography>
        </Box>
      );
    }

    return null;
  };

  return (
    <Box sx={{ p: 3, maxWidth: "1200px", margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Music Search
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search for songs, artists, or albums..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                size="medium"
                InputProps={{
                  sx: { borderRadius: 1 },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <CustomButton
                Icon={RiSearch2Line}
                title={loading ? "Searching..." : "Search"}
                variant="primary"
                state="Filled"
                onClick={handleSearch}
                disabled={loading || !accessToken}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {error && (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            backgroundColor:
              error.type === "error" ? "error.light" : "success.light",
          }}
        >
          <Typography
            color={
              error.type === "error"
                ? "error.contrastText"
                : "success.contrastText"
            }
          >
            {error.message}
          </Typography>
        </Paper>
      )}

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 6 }}>
          <CircularProgress size={60} />
        </Box>
      )}

      {searchResults.length > 0 ? (
        <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ p: 2, fontWeight: 600 }}>
            Search Results
          </Typography>
          <List sx={{ py: 0 }}>
            {searchResults.map((track, index) => (
              <React.Fragment key={track.id}>
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="add"
                      onClick={() => {
                        setSelectedSong(track);
                        setOpenDialog(true);
                      }}
                      color="primary"
                      size="large"
                    >
                      <AddCircleIcon fontSize="medium" />
                    </IconButton>
                  }
                  sx={{
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                    transition: "background-color 0.2s",
                  }}
                >
                  <Avatar
                    variant="square"
                    src={track.album.images[0]?.url}
                    alt={track.album.name}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight={500}>
                        {track.name}
                      </Typography>
                    }
                    secondary={
                      <Box
                        sx={{ display: "flex", alignItems: "center", mt: 0.5 }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mr: 1 }}
                        >
                          {track.artists.map((a) => a.name).join(", ")}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          • {track.album.name}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < searchResults.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
            ))}
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <Button
                variant="outlined"
                onClick={handlePrevPage}
                disabled={pagination.offset === 0}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                onClick={handleNextPage}
                disabled={
                  pagination.offset + pagination.limit >= pagination.total
                }
                sx={{ ml: 2 }}
              >
                Next
              </Button>
            </Box>
          </List>
        </Paper>
      ) : (
        renderEmptyState()
      )}

      {/* Playlist Selection Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Add to Playlist</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar
              src={selectedSong?.album.images[0]?.url}
              variant="square"
              sx={{ width: 64, height: 64, mr: 2 }}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight={500}>
                {selectedSong?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedSong?.artists.map((a) => a.name).join(", ")}
              </Typography>
            </Box>
          </Box>

          <Typography variant="subtitle2" gutterBottom>
            Select a playlist:
          </Typography>

          <List dense sx={{ maxHeight: "300px", overflow: "auto", mb: 2 }}>
            {playlists.map((playlist) => (
              <ListItemButton
                key={playlist._id}
                onClick={() => handleAddToPlaylist(playlist._id)}
                sx={{
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <ListItemText
                  primary={playlist.name}
                  secondary={`${playlist.songs?.length || 0} songs`}
                />
              </ListItemButton>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" gutterBottom>
            Or create a new playlist:
          </Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="New playlist name"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              size="small"
            />
            <Button
              variant="outlined"
              onClick={handleCreateNewPlaylist}
              disabled={!newPlaylistName.trim()}
            >
              Create
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <CustomButton
            title={"Cancel"}
            variant="primary"
            state="Stroke"
            onClick={() => setOpenDialog(false)}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Songs;
