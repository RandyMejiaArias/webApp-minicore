import { Box, Toolbar } from '@mui/material'
import { NavBar } from '../../ui/components/NavBar'
import { SideBar } from '../../ui/components/SideBar'
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export const MinicoreLayout = ({ children }) => {
  const drawerWidth = 240;
  return (
    <Box sx={{ display: 'flex' }} className='animate__animated animate__fadeIn animate__faster'>
      <NavBar />
      <SideBar />
      <Box component='main'
        sx={{ 
          flexGrow: 1, p: 3,
          width: { sm: `calc(100% - ${ drawerWidth }px)`},
          ml: { sm: `${ drawerWidth }px`} 
        }}
      >
        <Toolbar />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          { children }
        </LocalizationProvider>
      </Box>
    </Box>
  )
}