import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Collapse,
  IconButton,
  styled,
} from '@mui/material';
import {
  Forum as ForumIcon,
  Bookmark as BookmarkIcon,
  Home as HomeIcon,
  TrendingUp as TrendingIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from '@mui/icons-material';

// Updated Forum interface
interface Forum {
  id: string;
  name: string;
  unreadCount?: number;
}

const SideBar = () => {
  const [followingOpen, setFollowingOpen] = React.useState(true);
  const [favoritesOpen, setFavoritesOpen] = React.useState(true); // State for expanding/collapsing favourites
  const [favorites, setFavorites] = React.useState<Forum[]>([]); // State for favorited forums

  // Following forums with relevant topics and emojis
  const [followingForums, setFollowingForums] = React.useState<Forum[]>([
    { id: '1', name: '🖥️ Web Development', unreadCount: 2 },
    { id: '2', name: '🪙 Blockchain & Crypto', unreadCount: 5 },
    { id: '3', name: '🤖 Machine Learning' },
    { id: '4', name: '🔐 Cybersecurity Best Practices' },
    { id: '5', name: '☁️ DevOps and Cloud' },
  ]);

  // Toggle for expanding/collapsing the following forums list
  const handleFollowingForumsClick = () => {
    setFollowingOpen(!followingOpen);
  };

  // Toggle for expanding/collapsing the favourites forums list
  const handleFavoritesClick = () => {
    setFavoritesOpen(!favoritesOpen);
  };

  // Handle toggling of favorites
  const toggleFavorite = (forum: Forum) => {
    if (favorites.find((fav) => fav.id === forum.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== forum.id)); // Remove from favorites
    } else {
      setFavorites([...favorites, forum]); // Add to favorites
    }
  };

  // Check if forum is favorited
  const isFavorited = (forum: Forum) => {
    return !!favorites.find((fav) => fav.id === forum.id);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          border: 'none',
          borderRight: '1px solid #bdbdbd', // Add border line here
          backgroundColor: 'background.default',
          height: 'calc(100vh - 64px)',
          top: 74,
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <List sx={{ px: 1 }}>
          {/* All Forums Button */}
          <ListItemButton sx={{ borderRadius: 1, '&:hover': { backgroundColor: 'background.paper' } }}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="All Forums" />
          </ListItemButton>

          {/* Your Forums Button */}
          <ListItemButton sx={{ borderRadius: 1, '&:hover': { backgroundColor: 'background.paper' } }}>
            <ListItemIcon>
              <ForumIcon />
            </ListItemIcon>
            <ListItemText primary="Your Forums" />
          </ListItemButton>

          {/* Saved Forums Button */}
          <ListItemButton sx={{ borderRadius: 1, '&:hover': { backgroundColor: 'background.paper' } }}>
            <ListItemIcon>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText primary="Saved Forums" />
          </ListItemButton>

          {/* Trending Forums Button */}
          <ListItemButton sx={{ borderRadius: 1 }}>
            <ListItemIcon>
              <TrendingIcon />
            </ListItemIcon>
            <ListItemText primary="Trending Forums" />
          </ListItemButton>
        </List>

        <Divider sx={{ my: 2 }} />

        {/* My Favourites Section with Count */}
        {favorites.length > 0 && (
          <>
            <List
              subheader={
                <ListItemButton onClick={handleFavoritesClick} sx={{ borderRadius: 1 }}>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        My Favourites ({favorites.length}) {/* Count of favorited forums */}
                      </Typography>
                    }
                  />
                  {favoritesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>
              }
            >
              <Collapse in={favoritesOpen} timeout="auto" unmountOnExit>
                {favorites.map((forum) => (
                  <ListItemButton key={forum.id} sx={{ borderRadius: 1, pl: 2 }}>
                    <ListItemText
                      primary={forum.name}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                    {/* Favorite icon */}
                    <IconButton onClick={() => toggleFavorite(forum)}>
                      {isFavorited(forum) ? (
                        <StarIcon sx={{ color: 'gold' }} />
                      ) : (
                        <StarBorderIcon />
                      )}
                    </IconButton>
                  </ListItemButton>
                ))}
              </Collapse>
            </List>
            <Divider sx={{ my: 2 }} />
          </>
        )}

        {/* Following Forums Section */}
        <List
          subheader={
            <ListItemButton onClick={handleFollowingForumsClick} sx={{ borderRadius: 1 }}>
              <ListItemText 
                primary={
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Following Forums ({followingForums.length}) {/* Count of following forums */}
                  </Typography>
                }
              />
              {followingOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          }
        >
          <Collapse in={followingOpen} timeout="auto" unmountOnExit>
            {followingForums.map((forum) => (
              <ListItemButton key={forum.id} sx={{ borderRadius: 1, pl: 2 }}>
                {/* Display forum name with emoji */}
                <ListItemText
                  primary={forum.name}
                  primaryTypographyProps={{ variant: 'body2' }}
                />
                {forum.unreadCount && (
                  <UnreadCount>
                    {forum.unreadCount}
                  </UnreadCount>
                )}
                {/* Favorite icon */}
                <IconButton onClick={() => toggleFavorite(forum)}>
                  {isFavorited(forum) ? (
                    <StarIcon sx={{ color: 'gold' }} />
                  ) : (
                    <StarBorderIcon />
                  )}
                </IconButton>
              </ListItemButton>
            ))}
          </Collapse>
        </List>
      </Box>
    </Drawer>
  );
};

// Unread count styled component
const UnreadCount = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  color: theme.palette.secondary.main,
  padding: '2px 8px',
  borderRadius: 12,
  fontSize: '0.75rem',
  fontWeight: 600,
}));

export default SideBar;
