import React, { useState } from 'react';
import { Box, Avatar, Typography, IconButton, Divider, Button } from '@mui/material';
import { Favorite as FavoriteIcon, ThumbDown as ThumbDownIcon } from '@mui/icons-material';
import { Comment as CommentType } from '../../types/comment'; // Import the Comment type

interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [showReplies, setShowReplies] = useState(false); // Track whether replies are visible

  const handleToggleReplies = () => {
    setShowReplies(!showReplies); // Toggle the visibility of replies
  };

  return (
    <Box sx={{ mb: 3 }}>
      {/* Main Comment */}
      <Box display="flex" alignItems="flex-start">
        <Avatar src={comment.avatar} alt={comment.username} sx={{ mr: 2 }} />
        <Box flexGrow={1}>
          {/* Username and Timestamp in the same row, aligned to opposite sides */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {comment.username}
            </Typography>
            <Typography variant="body2">
              {comment.timestamp}
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ mt: 1 }}>
            {comment.content}
          </Typography>

          {/* Like and Dislike Buttons */}
          <Box display="flex" alignItems="center" mt={1}>
            <IconButton>
              <FavoriteIcon sx={{ color: 'red' }} />
            </IconButton>
            <Typography variant="body2">{comment.likes}</Typography>

            <IconButton>
              <ThumbDownIcon sx={{ color: 'gray' }} />
            </IconButton>
            <Typography variant="body2">{comment.dislikes}</Typography>
          </Box>

          {/* Replies Section */}
          {comment.replies && comment.replies.length > 0 && (
            <>
              <Button variant="text" size="small" onClick={handleToggleReplies} sx={{ mt: 1, color: '#212121' }}>
                {showReplies ? `Hide Replies` : `View ${comment.replies.length} ${comment.replies.length > 1 ? 'Replies' : 'Reply'}`}
              </Button>

              {/* Render each reply only if showReplies is true */}
              {showReplies && (
                <Box sx={{ mt: 2, ml: 4 }}>
                  {comment.replies.map((reply) => (
                    <Comment key={reply.id} comment={reply} />
                  ))}
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Comment;
