// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Divider,
//   Chip,
//   Avatar,
//   Tooltip,
// } from "@mui/material";

// import {
//   Add,
//   Edit,
//   Delete,
//   MusicNote,
//   PlaylistAdd,
//   Close,
// } from "@mui/icons-material";
// import {
//   addPlaylistService,
//   getPlaylistsService,
//   updatePlaylistService,
//   deletePlaylistService,
//   deleteSongFromPlaylistService,
// } from "../../services/playlistService";
// import ConfirmDialog from "../../components/common/ConfirmDailog";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [playlists, setPlaylists] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [currentPlaylist, setCurrentPlaylist] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//   });
//   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
//   const [deletingItem, setDeletingItem] = useState(null); // To store the item to be deleted (playlist or song)

//   // Fetch playlists from the API when the component mounts
//   useEffect(() => {
//     const fetchPlaylists = async () => {
//       try {
//         const data = await getPlaylistsService();
//         setPlaylists(data);
//       } catch (error) {
//         console.error("Error fetching playlists:", error);
//       }
//     };
//     fetchPlaylists();
//   }, []);

//   const handleOpenDialog = (playlist = null) => {
//     setCurrentPlaylist(playlist);
//     setFormData({
//       name: playlist ? playlist.name : "",
//       description: playlist ? playlist.description : "",
//     });
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setCurrentPlaylist(null);
//     setFormData({ name: "", description: "" });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     try {
//       if (currentPlaylist) {
//         // Update existing playlist
//         const updatedPlaylist = await updatePlaylistService(
//           currentPlaylist._id,
//           formData.name,
//           formData.description
//         );
//         setPlaylists(
//           playlists.map((pl) =>
//             pl._id === currentPlaylist._id ? updatedPlaylist : pl
//           )
//         );
//       } else {
//         // Create new playlist
//         const newPlaylist = await addPlaylistService(
//           formData.name,
//           formData.description
//         );
//         setPlaylists([...playlists, newPlaylist]);
//       }
//       handleCloseDialog();
//     } catch (error) {
//       console.error("Error submitting playlist:", error);
//     }
//   };

//   const handleDeletePlaylist = async (id) => {
//     setDeletingItem({ id, type: "playlist" });
//     setOpenConfirmDialog(true); // Open the confirmation dialog
//   };

//   const handleDeleteSong = async (playlistId, songId) => {
//     try {
//       await deleteSongFromPlaylistService(playlistId, songId);
//       setPlaylists(
//         playlists.map((pl) =>
//           pl._id === playlistId
//             ? {
//                 ...pl,
//                 songs: pl.songs.filter((song) => song.id !== songId),
//               }
//             : pl
//         )
//       );
//       setOpenConfirmDialog(false);
//       setDeletingItem(null);
//     } catch (error) {
//       console.error("Error deleting song:", error);
//     }
//   };

//   const handleConfirmDelete = async () => {
//     if (deletingItem.type === "playlist") {
//       // If we're deleting a playlist
//       try {
//         await deletePlaylistService(deletingItem.id);
//         setPlaylists(playlists.filter((pl) => pl._id !== deletingItem.id));
//         setOpenConfirmDialog(false);
//         setDeletingItem(null);
//       } catch (error) {
//         console.error("Error deleting playlist:", error);
//       }
//     } else if (deletingItem.type === "song") {
//       // If we're deleting a song from a playlist
//       await handleDeleteSong(deletingItem.playlistId, deletingItem.songId);
//     }
//   };

//   const handleRemoveSong = (playlistId, songId) => {
//     setDeletingItem({ playlistId, songId, type: "song" });
//     setOpenConfirmDialog(true); // Open the confirm dialog for song deletion
//   };

//   const handleAddSongs = () => {
//     navigate("/songs"); // Navigate to the /songs route
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 3,
//         }}
//       >
//         <Typography variant="h4">My Playlists</Typography>
//         <Button
//           variant="contained"
//           startIcon={<Add />}
//           onClick={() => handleOpenDialog()}
//           sx={{ ml: 2 }}
//         >
//           New Playlist
//         </Button>
//       </Box>

//       <Grid container spacing={3}>
//         {playlists.map((playlist) => (
//           <Grid item xs={12} sm={6} md={4} key={playlist._id}>
//             <Card
//               sx={{ height: "100%", display: "flex", flexDirection: "column" }}
//             >
//               <CardContent sx={{ flexGrow: 1 }}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "flex-start",
//                   }}
//                 >
//                   <Typography gutterBottom variant="h5" component="div">
//                     {playlist.name}
//                   </Typography>
//                   <Box>
//                     <Tooltip title="Edit playlist">
//                       <IconButton
//                         size="small"
//                         onClick={() => handleOpenDialog(playlist)}
//                         sx={{ mr: 0.5 }}
//                       >
//                         <Edit fontSize="small" />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Delete playlist">
//                       <IconButton
//                         size="small"
//                         onClick={() => handleDeletePlaylist(playlist._id)}
//                       >
//                         <Delete fontSize="small" color="error" />
//                       </IconButton>
//                     </Tooltip>
//                   </Box>
//                 </Box>

//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   sx={{ mb: 2 }}
//                 >
//                   {playlist.description}
//                 </Typography>

//                 <Divider sx={{ my: 1 }} />

//                 <Typography variant="subtitle2" sx={{ mb: 1 }}>
//                   Songs ({playlist.songs.length})
//                 </Typography>

//                 {playlist.songs.length > 0 ? (
//                   <Box sx={{ maxHeight: 200, overflow: "auto" }}>
//                     {playlist.songs.map((song) => (
//                       <Box
//                         key={song.id}
//                         sx={{
//                           display: "flex",
//                           alignItems: "center",
//                           mb: 1,
//                           p: 1,
//                           "&:hover": { backgroundColor: "action.hover" },
//                         }}
//                       >
//                         <Avatar
//                           sx={{
//                             bgcolor: "primary.main",
//                             mr: 2,
//                             width: 32,
//                             height: 32,
//                           }}
//                         >
//                           <MusicNote fontSize="small" />
//                         </Avatar>
//                         <Box sx={{ flexGrow: 1 }}>
//                           <Typography variant="body2">{song.title}</Typography>
//                           <Typography variant="caption" color="text.secondary">
//                             {song.artist}
//                           </Typography>
//                         </Box>
//                         <IconButton
//                           size="small"
//                           onClick={() =>
//                             handleRemoveSong(playlist._id, song.id)
//                           }
//                         >
//                           <Close fontSize="small" />
//                         </IconButton>
//                       </Box>
//                     ))}
//                   </Box>
//                 ) : (
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                       p: 2,
//                       textAlign: "center",
//                     }}
//                   >
//                     <PlaylistAdd
//                       sx={{ fontSize: 40, color: "text.disabled", mb: 1 }}
//                     />
//                     <Typography variant="body2" color="text.secondary">
//                       No songs in this playlist
//                     </Typography>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       sx={{ mt: 1 }}
//                       onClick={handleAddSongs}
//                     >
//                       Add Songs
//                     </Button>
//                   </Box>
//                 )}
//               </CardContent>

//               <CardActions sx={{ justifyContent: "center", p: 2 }}>
//                 <Button
//                   size="small"
//                   startIcon={<Add />}
//                   onClick={handleAddSongs}
//                 >
//                   Add Songs
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Common Confirm Dialog for Deletion */}
//       <ConfirmDialog
//         open={openConfirmDialog}
//         onClose={() => setOpenConfirmDialog(false)}
//         onConfirm={handleConfirmDelete} // Call handleConfirmDelete to perform the action
//         title={
//           deletingItem?.type === "playlist" ? "Delete Playlist" : "Delete Song"
//         }
//         message={
//           deletingItem?.type === "playlist"
//             ? "Are you sure you want to delete this playlist?"
//             : "Are you sure you want to delete this song from the playlist?"
//         }
//       />

//       {/* Add/Edit Playlist Dialog */}
//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>
//           {currentPlaylist ? "Edit Playlist" : "Create New Playlist"}
//         </DialogTitle>
//         <DialogContent>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               gap: 2,
//               minWidth: 400,
//               pt: 1,
//             }}
//           >
//             <TextField
//               name="name"
//               label="Playlist Name"
//               value={formData.name}
//               onChange={handleInputChange}
//               fullWidth
//               required
//             />
//             <TextField
//               name="description"
//               label="Description"
//               value={formData.description}
//               onChange={handleInputChange}
//               fullWidth
//               multiline
//               rows={3}
//             />
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Cancel</Button>
//           <Button
//             onClick={handleSubmit}
//             variant="contained"
//             disabled={!formData.name}
//           >
//             {currentPlaylist ? "Update" : "Create"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
  Avatar,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  MusicNote,
  PlaylistAdd,
  Close,
} from "@mui/icons-material";
import {
  addPlaylistService,
  getPlaylistsService,
  updatePlaylistService,
  deletePlaylistService,
  deleteSongFromPlaylistService,
} from "../../services/playlistService";
import ConfirmDialog from "../../components/common/ConfirmDailog";
import CustomButton from "../../components/common/CustomButton";
import { RiAddFill } from "react-icons/ri";

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

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

  // Fetch playlists from the API when the component mounts
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
      name: playlist ? playlist.name : "",
      description: playlist ? playlist.description : "",
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
        // Update existing playlist
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
        // Create new playlist
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

  const handleDeletePlaylist = async (id) => {
    setDeletingItem({ id, type: "playlist" });
    setOpenConfirmDialog(true);
  };

  const handleDeleteSong = async (playlistId, songId) => {
    try {
      await deleteSongFromPlaylistService(playlistId, songId);
      setPlaylists(
        playlists.map((pl) =>
          pl._id === playlistId
            ? {
                ...pl,
                songs: pl.songs.filter((song) => song.id !== songId),
              }
            : pl
        )
      );
      setOpenConfirmDialog(false);
      setDeletingItem(null);
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  const handleConfirmDelete = async () => {
    if (deletingItem?.type === "playlist") {
      try {
        await deletePlaylistService(deletingItem.id);
        setPlaylists(playlists.filter((pl) => pl._id !== deletingItem.id));
      } catch (error) {
        console.error("Error deleting playlist:", error);
      }
    } else if (deletingItem?.type === "song") {
      await handleDeleteSong(deletingItem.playlistId, deletingItem.songId);
    }
    setOpenConfirmDialog(false);
    setDeletingItem(null);
  };

  const handleRemoveSong = (playlistId, songId) => {
    setDeletingItem({ playlistId, songId, type: "song" });
    setOpenConfirmDialog(true);
  };

  const handleAddSongs = () => {
    navigate("/songs");
  };

  // Calculate grid columns based on screen size
  const getGridColumns = () => {
    if (isMobile) return 12; // 1 column on mobile
    if (isTablet) return 6; // 2 columns on tablet
    return 4; // 3 columns on desktop
  };

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
          title={"New Playlist"}
          Icon={RiAddFill}
          variant="primary"
          state="Filled"
          onClick={() => handleOpenDialog()}
        />
      </Box>

      <Grid container spacing={3}>
        {playlists.map((playlist) => (
          <Grid item xs={12} sm={6} md={4} key={playlist._id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[6],
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 1,
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "70%",
                    }}
                  >
                    {playlist.name}
                  </Typography>
                  <Box>
                    <Tooltip title="Edit playlist">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(playlist)}
                        sx={{ mr: 0.5 }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete playlist">
                      <IconButton
                        size="small"
                        onClick={() => handleDeletePlaylist(playlist._id)}
                      >
                        <Delete fontSize="small" color="error" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                {playlist.description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {playlist.description}
                  </Typography>
                )}

                <Divider sx={{ my: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="subtitle2">
                    Songs ({playlist.songs.length})
                  </Typography>
                  {playlist.songs.length > 0 && (
                    <Button
                      size="small"
                      startIcon={<Add />}
                      onClick={handleAddSongs}
                      sx={{ textTransform: "none" }}
                    >
                      Add More
                    </Button>
                  )}
                </Box>

                {playlist.songs.length > 0 ? (
                  <Box sx={{ maxHeight: 200, overflow: "auto" }}>
                    {playlist.songs.map((song) => (
                      <Box
                        key={song.id}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 1,
                          p: 1,
                          borderRadius: 1,
                          "&:hover": {
                            backgroundColor: "action.hover",
                            "& .remove-btn": {
                              visibility: "visible",
                            },
                          },
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: "primary.main",
                            mr: 2,
                            width: 32,
                            height: 32,
                            color: "primary.contrastText",
                          }}
                        >
                          <MusicNote fontSize="small" />
                        </Avatar>
                        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {song.title}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "block",
                            }}
                          >
                            {song.artist}
                          </Typography>
                        </Box>
                        <Tooltip title="Remove song">
                          <IconButton
                            size="small"
                            className="remove-btn"
                            onClick={() =>
                              handleRemoveSong(playlist._id, song.id)
                            }
                            sx={{
                              visibility: "hidden",
                              "&:focus": {
                                visibility: "visible",
                              },
                            }}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      p: 2,
                      textAlign: "center",
                      height: 120,
                      justifyContent: "center",
                    }}
                  >
                    <PlaylistAdd
                      sx={{
                        fontSize: 40,
                        color: "text.disabled",
                        mb: 1,
                        opacity: 0.6,
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      No songs in this playlist
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mt: 1.5 }}
                      onClick={handleAddSongs}
                    >
                      Add Songs
                    </Button>
                  </Box>
                )}
              </CardContent>

              {playlist.songs.length === 0 && (
                <CardActions sx={{ justifyContent: "center", p: 2 }}>
                  <Button
                    size="small"
                    startIcon={<Add />}
                    onClick={handleAddSongs}
                    sx={{ width: "100%" }}
                  >
                    Add Songs
                  </Button>
                </CardActions>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>

      {playlists.length === 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh",
            textAlign: "center",
          }}
        >
          <PlaylistAdd sx={{ fontSize: 60, color: "text.disabled", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Playlists Yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Create your first playlist to get started
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
            size="large"
          >
            Create Playlist
          </Button>
        </Box>
      )}

      {/* Common Confirm Dialog for Deletion */}
      <ConfirmDialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={handleConfirmDelete}
        title={
          deletingItem?.type === "playlist" ? "Delete Playlist" : "Remove Song"
        }
        message={
          deletingItem?.type === "playlist"
            ? "Are you sure you want to delete this playlist? This action cannot be undone."
            : "Are you sure you want to remove this song from the playlist?"
        }
      />

      {/* Add/Edit Playlist Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          {currentPlaylist ? "Edit Playlist" : "Create New Playlist"}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              pt: 1,
            }}
          >
            <TextField
              name="name"
              label="Playlist Name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
              autoFocus
              sx={{ mt: 1 }}
            />
            <TextField
              name="description"
              label="Description (Optional)"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <CustomButton
            title={"Cancel"}
            variant="primary"
            state="Stroke"
            onClick={handleCloseDialog}
          />

          <CustomButton
            title={currentPlaylist ? "Save Changes" : "Create Playlist"}
            variant="primary"
            state="Filled"
            onClick={handleSubmit}
            disabled={!formData.name}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
