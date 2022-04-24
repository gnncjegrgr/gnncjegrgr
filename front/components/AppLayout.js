import React, { useState, useCallback } from 'react';
import { AppBar, Box, Toolbar, IconButton, Menu, Container, Avatar, Button, Tooltip, MenuItem, Typography, InputBase, Grid, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import LoginForm from './LoginForm';
import UserProfile from './UserProfile';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#000',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

const Margin = styled('div')(({ theme }) => ({
  marginBottom: 100,
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid black',
  backgroundColor: alpha(theme.palette.common.black, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.2),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  marginTop: 20,
  marginBottom: 20,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: -8,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  display: 'flex',
  marginLeft: 40,
  color: 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em+ ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}));

const pages = ['NodeBird'];
const settings = ['profile'];

const AppLayout = ({ children }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { me } = useSelector((state) => state.user);
  const handleOpenNavMenu = useCallback((e) => {
    setAnchorElNav(e.currentTarget);
  }, []);

  const handleOpenUserMenu = useCallback((e) => {
    setAnchorElUser(e.currentTarget);
  }, []);

  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  }, []);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="absolute" sx={{ bgcolor: 'white' }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography variant="h6" noWrap component="div" sx={{ mr: 2, color: 'black', display: { xs: 'none', md: 'flex' } }}>
                <Link href="/">
                  <a>
                    <img
                      style={{ width: '90px', height: '90px' }}
                      src="https://velog.velcdn.com/images/skystar2345/post/46c6b058-de4a-4add-91a0-175a2ff2dcd7/image.png"
                      alt="next logo"
                    />
                  </a>
                </Link>
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon sx={{ color: 'black' }} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <Link href="/" key={page}>
                      <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                    </Link>
                  ))}
                </Menu>
              </Box>
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: 'black', display: { xs: 'flex', md: 'none' } }}>
                <Link href="/">
                  <a>
                    <img
                      style={{ width: '90px', height: '90px' }}
                      src="https://velog.velcdn.com/images/skystar2345/post/46c6b058-de4a-4add-91a0-175a2ff2dcd7/image.png"
                      alt="next logo"
                    />
                  </a>
                </Link>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon style={{ color: 'black' }} />
                  </SearchIconWrapper>
                  <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                </Search>
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Link href="/" key={page}>
                    <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'black', display: 'block', fontSize: '16px' }}>
                      {page}
                    </Button>
                  </Link>
                ))}
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon style={{ color: 'black' }} />
                  </SearchIconWrapper>
                  <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                </Search>
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar>P</Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Link href={'/' + setting}>
                        <Typography textAlign="center">{setting}</Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Margin />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              {me ? <UserProfile /> : <LoginForm />}
            </Grid>
            <Grid item xs={12} md={6}>
              {children}
            </Grid>
            <Grid item xs={12} md={3}>
              <a href="https://github.com/gnncjegrgr" target="_blank" rel="noreferrer noopenner" style={{ color: 'black' }}>
                Made by gnncjegrgr
              </a>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
