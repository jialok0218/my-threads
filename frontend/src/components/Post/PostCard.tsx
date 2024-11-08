import React from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Post } from '../../types/post'; // Import Post type

interface PostCardProps {
  post: Post;
  onClick: () => void; // The function to handle clicking on the post
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        mb: 3,
        borderRadius: '20px', // Add border radius here
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Optional: Add shadow for better visuals
      }}
    >
      <CardContent>
        {/* Display the forum name */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="caption" sx={{ fontWeight: 500, color: '#212121' }}>
            {post.forum}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {post.timestamp}
          </Typography>
        </Box>

        {/* Display the title */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          {post.title}
        </Typography>

        {/* Display the content */}
        <Typography variant="body2" sx={{ mb: 2 }}>
          {post.content}
        </Typography>

        {/* Display Likes, Dislikes, and Comments */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <IconButton size="small" sx={{ color: 'red' }}>
              <FavoriteIcon />
            </IconButton>
            <Typography variant="body2" sx={{ mr: 2 }}>
              {post.likes}
            </Typography>

            <IconButton size="small" sx={{ color: 'gray' }}>
              <ThumbDownIcon />
            </IconButton>
            <Typography variant="body2" sx={{ mr: 2 }}>
              {post.dislikes}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <IconButton size="small" sx={{ color: 'gray' }}>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <Typography variant="body2">{post.comments}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
