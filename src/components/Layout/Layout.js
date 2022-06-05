import { Fragment } from 'react';
import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { ProSidebar,SidebarHeader, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

import 'react-pro-sidebar/dist/css/styles.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import MainNavigation from './MainNavigation';

const Layout = (props) => {
  const authCtx = useContext(AuthContext);
 
const isLogedIn = authCtx.isLogedIn;
  return (
    <>
  {!isLogedIn && (<li>
      <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
    </li>)}
    {isLogedIn && (<li>
      <ProSidebar>
     <SidebarHeader>
     <img src={logo} alt="Logo" />
      <h2 >Dashboard</h2>
      </SidebarHeader>
      <Menu iconShape="square">
    <MenuItem >Overview</MenuItem>
    <MenuItem >Users
    <Link to="/" />
    </MenuItem>
    <MenuItem >Settings</MenuItem>
    <MenuItem >Subscription</MenuItem>
  </Menu>

    
    </ProSidebar> 
    </li>)}
    </>
  );
};

export default Layout;
