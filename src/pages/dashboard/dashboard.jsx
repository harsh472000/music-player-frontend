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
//   Avatar,
//   Tooltip,
//   useMediaQuery,
//   useTheme,
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
// import CustomButton from "../../components/common/CustomButton";
// import CustomInput from "../../components/common/CustomInput";
// import { RiAddFill } from "react-icons/ri";

// const Dashboard = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

//   const navigate = useNavigate();
//   const [playlists, setPlaylists] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [currentPlaylist, setCurrentPlaylist] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//   });
//   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
//   const [deletingItem, setDeletingItem] = useState(null);

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
//     setOpenConfirmDialog(true);
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
//     if (deletingItem?.type === "playlist") {
//       try {
//         await deletePlaylistService(deletingItem.id);
//         setPlaylists(playlists.filter((pl) => pl._id !== deletingItem.id));
//       } catch (error) {
//         console.error("Error deleting playlist:", error);
//       }
//     } else if (deletingItem?.type === "song") {
//       await handleDeleteSong(deletingItem.playlistId, deletingItem.songId);
//     }
//     setOpenConfirmDialog(false);
//     setDeletingItem(null);
//   };

//   const handleRemoveSong = (playlistId, songId) => {
//     setDeletingItem({ playlistId, songId, type: "song" });
//     setOpenConfirmDialog(true);
//   };

//   const handleAddSongs = () => {
//     navigate("/songs");
//   };

//   // Calculate grid columns based on screen size
//   const getGridColumns = () => {
//     if (isMobile) return 12; // 1 column on mobile
//     if (isTablet) return 6; // 2 columns on tablet
//     return 4; // 3 columns on desktop
//   };

//   return (
//     <Box sx={{ p: 3, maxWidth: "1800px", margin: "0 auto" }}>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 4,
//           flexWrap: "wrap",
//           gap: 2,
//         }}
//       >
//         <Typography variant="h4" sx={{ fontWeight: 600 }}>
//           My Playlists
//         </Typography>

//         <CustomButton
//           title={"New Playlist"}
//           Icon={RiAddFill}
//           variant="primary"
//           state="Filled"
//           onClick={() => handleOpenDialog()}
//         />
//       </Box>

//       <Grid container spacing={3}>
//         {playlists.map((playlist) => (
//           <Grid item xs={12} sm={6} md={4} key={playlist._id}>
//             <Card
//               sx={{
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 transition: "transform 0.2s, box-shadow 0.2s",
//                 "&:hover": {
//                   transform: "translateY(-4px)",
//                   boxShadow: theme.shadows[6],
//                 },
//               }}
//             >
//               <CardContent sx={{ flexGrow: 1 }}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "flex-start",
//                     mb: 1,
//                   }}
//                 >
//                   <Typography
//                     gutterBottom
//                     variant="h5"
//                     component="div"
//                     sx={{
//                       fontWeight: 500,
//                       whiteSpace: "nowrap",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                       maxWidth: "70%",
//                     }}
//                   >
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

//                 {playlist.description && (
//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{
//                       mb: 2,
//                       display: "-webkit-box",
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: "vertical",
//                       overflow: "hidden",
//                     }}
//                   >
//                     {playlist.description}
//                   </Typography>
//                 )}

//                 <Divider sx={{ my: 2 }} />

//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     mb: 1,
//                   }}
//                 >
//                   <Typography variant="subtitle2">
//                     Songs ({playlist.songs.length})
//                   </Typography>
//                   {playlist.songs.length > 0 && (
//                     <Button
//                       size="small"
//                       startIcon={<Add />}
//                       onClick={handleAddSongs}
//                       sx={{ textTransform: "none" }}
//                     >
//                       Add More
//                     </Button>
//                   )}
//                 </Box>

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
//                           borderRadius: 1,
//                           "&:hover": {
//                             backgroundColor: "action.hover",
//                             "& .remove-btn": {
//                               visibility: "visible",
//                             },
//                           },
//                         }}
//                       >
//                         <Avatar
//                           sx={{
//                             bgcolor: "primary.main",
//                             mr: 2,
//                             width: 32,
//                             height: 32,
//                             color: "primary.contrastText",
//                           }}
//                         >
//                           <MusicNote fontSize="small" />
//                         </Avatar>
//                         <Box sx={{ flexGrow: 1, minWidth: 0 }}>
//                           <Typography
//                             variant="body2"
//                             sx={{
//                               whiteSpace: "nowrap",
//                               overflow: "hidden",
//                               textOverflow: "ellipsis",
//                             }}
//                           >
//                             {song.title}
//                           </Typography>
//                           <Typography
//                             variant="caption"
//                             color="text.secondary"
//                             sx={{
//                               whiteSpace: "nowrap",
//                               overflow: "hidden",
//                               textOverflow: "ellipsis",
//                               display: "block",
//                             }}
//                           >
//                             {song.artist}
//                           </Typography>
//                         </Box>
//                         <Tooltip title="Remove song">
//                           <IconButton
//                             size="small"
//                             className="remove-btn"
//                             onClick={() =>
//                               handleRemoveSong(playlist._id, song.id)
//                             }
//                             sx={{
//                               visibility: "hidden",
//                               "&:focus": {
//                                 visibility: "visible",
//                               },
//                             }}
//                           >
//                             <Close fontSize="small" />
//                           </IconButton>
//                         </Tooltip>
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
//                       height: 120,
//                       justifyContent: "center",
//                     }}
//                   >
//                     <PlaylistAdd
//                       sx={{
//                         fontSize: 40,
//                         color: "text.disabled",
//                         mb: 1,
//                         opacity: 0.6,
//                       }}
//                     />
//                     <Typography variant="body2" color="text.secondary">
//                       No songs in this playlist
//                     </Typography>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       sx={{ mt: 1.5 }}
//                       onClick={handleAddSongs}
//                     >
//                       Add Songs
//                     </Button>
//                   </Box>
//                 )}
//               </CardContent>

//               {playlist.songs.length === 0 && (
//                 <CardActions sx={{ justifyContent: "center", p: 2 }}>
//                   <Button
//                     size="small"
//                     startIcon={<Add />}
//                     onClick={handleAddSongs}
//                     sx={{ width: "100%" }}
//                   >
//                     Add Songs
//                   </Button>
//                 </CardActions>
//               )}
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {playlists.length === 0 && (
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             height: "50vh",
//             textAlign: "center",
//           }}
//         >
//           <PlaylistAdd sx={{ fontSize: 60, color: "text.disabled", mb: 2 }} />
//           <Typography variant="h6" color="text.secondary" gutterBottom>
//             No Playlists Yet
//           </Typography>
//           <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
//             Create your first playlist to get started
//           </Typography>

//           <CustomButton
//             title={"Create Playlist"}
//             Icon={RiAddFill}
//             variant="primary"
//             state="Filled"
//             onClick={() => handleOpenDialog()}
//           />
//         </Box>
//       )}

//       {/* Common Confirm Dialog for Deletion */}
//       <ConfirmDialog
//         open={openConfirmDialog}
//         onClose={() => setOpenConfirmDialog(false)}
//         onConfirm={handleConfirmDelete}
//         title={
//           deletingItem?.type === "playlist" ? "Delete Playlist" : "Remove Song"
//         }
//         message={
//           deletingItem?.type === "playlist"
//             ? "Are you sure you want to delete this playlist? This action cannot be undone."
//             : "Are you sure you want to remove this song from the playlist?"
//         }
//       />

//       {/* Add/Edit Playlist Dialog */}
//       <Dialog
//         open={openDialog}
//         onClose={handleCloseDialog}
//         fullWidth
//         maxWidth="sm"
//       >
//         <DialogTitle sx={{ fontWeight: 600 }}>
//           {currentPlaylist ? "Edit Playlist" : "Create New Playlist"}
//         </DialogTitle>
//         <DialogContent>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               gap: 2,
//               pt: 1,
//             }}
//           >
//             <CustomInput
//               name="name"
//               label="Playlist Name"
//               type="text"
//               value={formData.name}
//               onChange={handleInputChange}
//               fullWidth
//               sx={{ mb: 2 }}
//             />
//             <TextField
//               name="description"
//               label="Description (Optional)"
//               value={formData.description}
//               onChange={handleInputChange}
//               fullWidth
//               multiline
//               rows={3}
//             />
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <CustomButton
//             title={"Cancel"}
//             variant="primary"
//             state="Stroke"
//             onClick={handleCloseDialog}
//           />

//           <CustomButton
//             title={currentPlaylist ? "Save Changes" : "Create Playlist"}
//             variant="primary"
//             state="Filled"
//             onClick={handleSubmit}
//             disabled={!formData.name}
//           />
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Dashboard;

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
