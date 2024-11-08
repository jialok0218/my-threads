import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  Avatar,
} from '@mui/material';
import { Favorite as FavoriteIcon, ThumbDown as ThumbDownIcon, ChatBubbleOutline as ChatIcon, Close as CloseIcon } from '@mui/icons-material';
import { Post } from '../../types/post'; // Importing Post interface from types
import { Comment as CommentType } from '../../types/comment'; // Importing Comment type
import Comment from '../Post/Comment'; // Importing the Comment component

interface PostModalProps {
  open: boolean;
  onClose: () => void;
  post: Post;
  comments: CommentType[]; // Array of comments
}

const PostModal: React.FC<PostModalProps> = ({ open, onClose, post, comments }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      sx={{
        '& .MuiPaper-root': {
          borderRadius: '20px', // Adding borderRadius to the modal
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {/* Forum Name at the Top */}
          <Typography variant="caption">{post.forum}</Typography>

          {/* Close Button */}
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'grey.500',
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Post Title Below the Forum Name */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{post.title}</Typography>
          <Typography variant="caption">{post.timestamp}</Typography>
        </Box>

        {/* User Information below the post title */}
        <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
          {post.author?.avatar && (
            <Avatar
              src={post.author.avatar}
              alt={post.author.username}
              sx={{ width: 24, height: 24, mr: 1 }}
            />
          )}
          <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>
            {post.author?.username || 'Unknown User'}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        {/* Post Content */}
        <Typography variant="body1" sx={{ mb: 2 }}>
          {post.content}
        </Typography>

        {/* Likes, Dislikes, Comments - Place it before the comments section */}
        <Box display="flex" alignItems="center" sx={{ mb: 3 }}>
          <IconButton>
            <FavoriteIcon sx={{ color: 'red' }} />
          </IconButton>
          <Typography variant="body2">{post.likes}</Typography>

          <IconButton>
            <ThumbDownIcon sx={{ color: 'gray' }} />
          </IconButton>
          <Typography variant="body2">{post.dislikes}</Typography>

          <IconButton>
            <ChatIcon />
          </IconButton>
          <Typography variant="body2">{post.comments}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Comments Section */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          All Comments
        </Typography>
        <Box>
          {comments.length > 0 ? (
            comments.map((comment) => <Comment key={comment.id} comment={comment} />)
          ) : (
            <Typography variant="body2" color="text.secondary">
              No comments yet.
            </Typography>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostModal;
