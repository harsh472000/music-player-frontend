import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Divider,
  Grid,
  Avatar,
  List,
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { RiSearch2Line } from "react-icons/ri";
import { searchTracks } from "../../services/spotifyService";
import {
  addPlaylistService,
  addSongToPlaylistService,
  getPlaylistsService,
} from "../../services/playlistService";
import CustomButton from "../../components/common/CustomButton";
import CustomInput from "../../components/common/CustomInput";
import SongItem from "../../components/SongItem";
import EmptyState from "../../components/EmptyState";
import PaginationControls from "../../components/PaginationControls";
import PlaylistDialog from "../../components/PlaylistDailog";

const Songs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 10,
    total: 0,
  });

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
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);
    setPagination((prev) => ({ ...prev, offset: 0 }));

    try {
      const results = await searchTracks(searchQuery, pagination.limit, 0);
      setSearchResults(results.items);
      setPagination((prev) => ({
        ...prev,
        total: results.total,
      }));
    } catch (err) {
      setError({
        type: "error",
        message: "Failed to fetch songs. Please try again later.",
      });
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (direction) => {
    const newOffset =
      direction === "next"
        ? pagination.offset + pagination.limit
        : pagination.offset - pagination.limit;

    if (newOffset < 0 || newOffset >= pagination.total) return;

    try {
      const results = await searchTracks(
        searchQuery,
        pagination.limit,
        newOffset
      );
      setSearchResults(results.items);
      setPagination((prev) => ({ ...prev, offset: newOffset }));
    } catch (err) {
      setError({
        type: "error",
        message: "Failed to fetch songs. Please try again later.",
      });
    }
  };

  const handleAddToPlaylist = async (playlistId) => {
    try {
      await addSongToPlaylistService(
        playlistId,
        selectedSong.id,
        selectedSong.name,
        selectedSong.artists.map((a) => a.name).join(", ")
      );
      setOpenDialog(false);
      setError({
        type: "success",
        message: `"${selectedSong.name}" added to playlist!`,
      });
      setTimeout(() => setError(null), 3000);
    } catch (error) {
      setError({ type: "error", message: "Failed to add song to playlist" });
    }
  };

  const handleCreateNewPlaylist = async (name, description) => {
    try {
      const newPlaylist = await addPlaylistService(name, description);
      setPlaylists((prev) => [...prev, newPlaylist]);
      setError({
        type: "success",
        message: `Created new playlist: ${name}`,
      });
    } catch (error) {
      setError({ type: "error", message: "Failed to create playlist" });
    }
  };

  const showEmptyState =
    !loading && (!hasSearched || searchResults.length === 0);

  return (
    <Box sx={{ p: 3, maxWidth: "1200px", margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Music Search
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid
          container
          spacing={2}
          display={"flex"}
          justifyContent={"flex-end"}
          alignItems="center"
        >
          <Grid item xs={12} sm={9}>
            <CustomInput
              label="Search Songs"
              name="Search songs"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomButton
              Icon={RiSearch2Line}
              title={loading ? "Searching..." : "Search"}
              variant="primary"
              state="Filled"
              onClick={handleSearch}
              disabled={loading}
            />
          </Grid>
        </Grid>
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

      {/* {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 6 }}>
          <CircularProgress size={60} />
        </Box>
      )} */}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 6 }}>
          <CircularProgress size={60} />
        </Box>
      ) : showEmptyState ? (
        <EmptyState hasSearched={hasSearched} searchQuery={searchQuery} />
      ) : searchResults.length > 0 ? (
        <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ p: 2, fontWeight: 600 }}>
            Search Results
          </Typography>
          <List sx={{ py: 0 }}>
            {searchResults.map((track, index) => (
              <React.Fragment key={track.id}>
                <SongItem
                  track={track}
                  onAddToPlaylist={(song) => {
                    setSelectedSong(song);
                    setOpenDialog(true);
                  }}
                />
                {index < searchResults.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
            ))}
            <PaginationControls
              onPrev={() => handlePageChange("prev")}
              onNext={() => handlePageChange("next")}
              currentOffset={pagination.offset}
              limit={pagination.limit}
              total={pagination.total}
            />
          </List>
        </Paper>
      ) : null}

      <PlaylistDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        selectedSong={selectedSong}
        playlists={playlists}
        onAddToPlaylist={handleAddToPlaylist}
        onCreatePlaylist={handleCreateNewPlaylist}
      />
    </Box>
  );
};

export default Songs;
