import React, { useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import PostCard from '../components/Post/PostCard'; 
import TrendingTags from '../components/TrendingTags'; 
import PostModal from '../components/Modal/PostModal'; 
import { Post } from '../types/post';
import { Comment as CommentType } from '../types/comment'; 


// Sample data for posts
const posts: Post[] = [
  {
    id: '1',
    forum: 'Web Development',
    title: 'Lecture Rescheduling',
    content: 'We need to reschedule the upcoming lecture due to Dr. Hellen’s illness. Let’s vote for a new date!',
    timestamp: '6h ago',
    likes: 671,
    dislikes: 202,
    comments: 193,
    author: {
      username: 'John Doe',
      avatar: 'https://example.com/avatar1.jpg', // Replace with actual avatar URL or placeholder
    },
  },
  {
    id: '2',
    forum: 'Corporate Law',
    title: 'Date of the Final Exams',
    content: 'The date for the final exams will be adjusted due to COVID-19 circumstances. Extra attempts might be offered.',
    timestamp: '3d ago',
    likes: 231,
    dislikes: 120,
    comments: 81,
    author: {
      username: 'Jane Smith',
      avatar: 'https://example.com/avatar2.jpg', // Replace with actual avatar URL or placeholder
    },
  },
  {
    id: '3',
    forum: 'Web Development',
    title: 'Lecture Rescheduling',
    content: 'We need to reschedule the upcoming lecture due to Dr. Hellen’s illness. Let’s vote for a new date!',
    timestamp: '6h ago',
    likes: 671,
    dislikes: 202,
    comments: 193,
    author: {
      username: 'John Doe',
      avatar: 'https://example.com/avatar1.jpg', // Replace with actual avatar URL or placeholder
    },
  },
  {
    id: '4',
    forum: 'Corporate Law',
    title: 'Date of the Final Exams', 
    content: 'The date for the final exams will be adjusted due to COVID-19 circumstances. Extra attempts might be offered.',
    timestamp: '3d ago',
    likes: 231,
    dislikes: 120,
    comments: 81,
    author: {
      username: 'Jane Smith',
      avatar: 'https://example.com/avatar2.jpg', // Replace with actual avatar URL or placeholder
    },
  },
  {
    id: '7',
    forum: 'Data Science',
    title: 'Python Workshop Registration Open',
    content: 'Join our upcoming Python for Data Analysis workshop! Limited seats available. Early bird registration ends next week.',
    timestamp: '12h ago',
    likes: 445,
    dislikes: 28,
    comments: 156,
    author: {
      username: 'Sarah Chen',
      avatar: 'https://example.com/avatar7.jpg',
    },
  },
  {
    id: '8',
    forum: 'Business Analytics',
    title: 'Guest Speaker Series Announcement',
    content: 'Were excited to announce our next guest speaker, CEO of TechCorp, who will discuss AI in Business Analytics.',
    timestamp: '1d ago',
    likes: 892,
    dislikes: 45,
    comments: 234,
    author: {
      username: 'Michael Ross',
      avatar: 'https://example.com/avatar8.jpg',
    },
  },
  {
    id: '9',
    forum: 'Mobile Development',
    title: 'iOS Development Workshop',
    content: 'Learn SwiftUI basics in our hands-on workshop. Perfect for beginners! Bring your MacBook and enthusiasm.',
    timestamp: '2d ago',
    likes: 337,
    dislikes: 18,
    comments: 89,
    author: {
      username: 'Alex Kumar',
      avatar: 'https://example.com/avatar9.jpg',
    },
  },
  {
    id: '10',
    forum: 'Artificial Intelligence',
    title: 'Machine Learning Project Collaboration',
    content: 'Looking for team members for an exciting ML project. Experience with TensorFlow preferred but not required.',
    timestamp: '4h ago',
    likes: 556,
    dislikes: 31,
    comments: 178,
    author: {
      username: 'Emma Watson',
      avatar: 'https://example.com/avatar10.jpg',
    },
  }
];


// Sample comment data (linked to post IDs)
const commentsData: { [key: string]: CommentType[] } = {
  '1': [
    {
      id: '1',
      username: 'John Doe',
      avatar: '/path-to-avatar1.png',
      content: 'This is a great post! Thanks for sharing.',
      likes: 24,
      dislikes: 3,
      timestamp: '2 hours ago',
      replies: [],
    },
    {
      id: '2',
      username: 'Jane Smith',
      avatar: '/path-to-avatar2.png',
      content: 'I also think this is very helpful.',
      likes: 15,
      dislikes: 2,
      timestamp: '1 day ago',
      replies: [
        {
          id: '3',
          username: 'Sam Wilson',
          avatar: '/path-to-avatar3.png',
          content: 'Agreed! Very insightful.',
          likes: 5,
          dislikes: 0,
          timestamp: '12 hours ago',
        },
      ],
    },
  ],
  '2': [
    {
      id: '4',
      username: 'Alice Brown',
      avatar: '/path-to-avatar4.png',
      content: 'Thanks for this update! Looking forward to the final exams.',
      likes: 10,
      dislikes: 0,
      timestamp: '1 day ago',
      replies: [
        {
          id: '5',
          username: 'Sam Wilson',
          avatar: '/path-to-avatar3.png',
          content: 'Agreed! Very insightful.',
          likes: 5,
          dislikes: 0,
          timestamp: '12 hours ago',
        },
        {
          id: '6',
          username: 'John Doe',
          avatar: '/path-to-avatar1.png',
          content: 'This is a great post! Thanks for sharing.',
          likes: 24,
          dislikes: 3,
          timestamp: '2 hours ago',
        }
      ],
    },
  ],
};

const HomePage: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (post: Post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
    setModalOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', p: 3, backgroundColor: 'background.default', minHeight: '100vh' }}>
      {/* Left Side - Post List */}
      <Box sx={{ width: '70%', pr: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 4 }}>
          All Forums
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* Grid layout for Post Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', // Dynamic columns based on screen size
            gap: '16px', // Spacing between the posts
          }}
        >
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onClick={() => handleOpenModal(post)} />
          ))}
        </Box>
      </Box>

      {/* Right Side - Trending Tags */}
      <Box sx={{ width: '30%', pl: 2 }}>
        <TrendingTags />
      </Box>

      {/* Post Modal - Pass the selected post and corresponding comments */}
      {selectedPost && (
        <PostModal
          open={modalOpen}
          onClose={handleCloseModal}
          post={selectedPost}
          comments={commentsData[selectedPost.id] || []}
        />
      )}
    </Box>
  );
};

export default HomePage;