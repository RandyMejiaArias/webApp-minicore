import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth/authSlice";

export const NavBar = ({ drawerWidth = 240 }) => {

  const dispatch = useDispatch();

  const onLogout = () => {
    localStorage.clear();
    dispatch(logout());
  }

  return (
    <AppBar
      position='fixed'
      sx={{ 
        width: { sm: `calc(100% - ${ drawerWidth }px)`},
        ml: { sm: `${ drawerWidth }px`}
      }}
    >
      <Toolbar>
        <IconButton color='inherit' edge='start'
          sx={{ mr: 2,  display: { sm: 'none' }}}
        >
          <MenuOutlined />
        </IconButton>
        <Grid container direction='row'
          justifyContent='space-between' alignItems='center'
        >
          {/* { userInfo && (
            <Typography variant='h6' noWrap component='div'>
              Welcome back, &nbsp;{userInfo.name}!
            </Typography>

          )} */}
          <IconButton color='error' onClick={ onLogout }>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}