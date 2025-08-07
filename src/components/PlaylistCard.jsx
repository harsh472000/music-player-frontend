import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Avatar,
  IconButton,
  Divider,
  Button,
  Tooltip,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  MusicNote,
  PlaylistAdd,
  Close,
} from "@mui/icons-material";

const PlaylistCard = ({
  playlist,
  onEdit,
  onDelete,
  onAddSongs,
  onRemoveSong,
  theme,
}) => {
  return (
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
                onClick={() => onEdit(playlist)}
                sx={{ mr: 0.5 }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete playlist">
              <IconButton size="small" onClick={() => onDelete(playlist._id)}>
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
              onClick={onAddSongs}
              sx={{ textTransform: "none" }}
            >
              Add More
            </Button>
          )}
        </Box>

        {playlist.songs.length > 0 ? (
          <Box sx={{ maxHeight: 200, overflow: "auto" }}>
            {playlist.songs.map((song) => (
              <SongItem
                key={song.songId}
                song={song}
                onRemove={() => onRemoveSong(playlist._id, song.songId)}
              />
            ))}
          </Box>
        ) : (
          <EmptyPlaylistState onAddSongs={onAddSongs} />
        )}
      </CardContent>

      {playlist.songs.length === 0 && (
        <CardActions sx={{ justifyContent: "center", p: 2 }}>
          <Button
            size="small"
            startIcon={<Add />}
            onClick={onAddSongs}
            sx={{ width: "100%" }}
          >
            Add Songs
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

const SongItem = ({ song, onRemove }) => (
  <Box
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
        onClick={onRemove}
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
);

const EmptyPlaylistState = ({ onAddSongs }) => (
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
      onClick={onAddSongs}
    >
      Add Songs
    </Button>
  </Box>
);

export default PlaylistCard;
