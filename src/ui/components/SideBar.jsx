import { Box } from '@mui/material'
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { MenuOutlined, NoteAlt} from '@mui/icons-material';
import { Link } from "react-router-dom";

import "../../theme/app.css";

export const SideBar = () => {

  const { collapseSidebar } = useProSidebar();

  return (
    <div 
      style={{ 
        display: 'flex',
        height: '100vh',
        position: 'fixed'
      }}
    >
      <Sidebar className="sidebar" backgroundColor="#262254" 
      >
        <Menu menuItemStyles={{
          button: {
            '&:hover': {
              backgroundColor: '#262254',
              color: '#E8640A'
            },
          },
        }}>
          <MenuItem className="menu-logo">
            MiniCore
            {/* <Box className="menu-img"
              component="img"
              src={logoImage}
            /> */}
          </MenuItem>
          <MenuItem className="menu-item"
            icon={<NoteAlt />}
            component={<Link to='/' />}
          >
            Sales
          </MenuItem>
          {/* <MenuItem className="menu-item"
            icon={<NoteAlt />}
            component={<Link to='/products' />}
          >
            Products
          </MenuItem> */}
        </Menu>
      </Sidebar>
    </div>
  );
}