import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar: React.FC = () => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      size="small"
      sx={{
        width: '300px',  // Adjust the width as per your layout
        backgroundColor: '#ffffff', 
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
