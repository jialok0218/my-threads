import React, { useState, useRef, useEffect } from 'react';
import { AppBar, Toolbar, Stack, Box, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import GestureIcon from '@mui/icons-material/Gesture';
import MenuItem from '@mui/material/MenuItem';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import SearchBar from './SearchBar';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { logout } from '../lib/api';


const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const { user } = useAuth();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        height: '70px',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', height: '64px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <GestureIcon sx={{ fontSize: 30, mr: 1, color: '#6200ea' }} />
            <Typography variant="h6" sx={{ color: '#6200ea' }}>
              MyThreads
            </Typography>
          </Link>
        </Box>

        <Box sx={{ flexGrow: 2, display: 'flex', justifyContent: 'center' }}>
          <SearchBar />
        </Box>

        <Stack direction="row" spacing={4} sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>
          {user && (
            <>
              <Tooltip title="Post">
                <IconButton>
                  <EditOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Notifications">
                <IconButton>
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Tooltip title="Profile">
                  <IconButton>
                    <AccountCircleIcon />
                  </IconButton>
                </Tooltip>
                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                  {user.email}
                </Typography>
              </Box>
            </>
          )}
          <Tooltip title="Settings">
            <IconButton ref={anchorRef} onClick={handleToggle}>
              <ArrowDropDownOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        <Popper open={open} anchorEl={anchorRef.current} role={undefined} placement="bottom-end" transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom-end' ? 'right top' : 'right bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="settings-menu"
                    aria-labelledby="settings-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {user ? (
                      <>
                        <MenuItem onClick={handleClose} component={Link} to="/contact">Contact Us</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/settings">Settings</MenuItem>
                        <MenuItem onClick={handleClose}>Log Out</MenuItem>
                      </>
                    ) : (
                      <MenuItem component={Link} to="/login" onClick={handleClose}>
                        Log In
                      </MenuItem>
                    )}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
