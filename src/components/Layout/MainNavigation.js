import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import logo from '../../assets/logo.png';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
 
  const isLogedIn = authCtx.isLogedIn;

  const logOutHandler = () => {
  authCtx.logout();
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
      <img src={logo} alt="Logo" />
      </Link>
      <nav>
        <ul>
        {isLogedIn && (<li>
            <Link to='/'>Home</Link>
          </li>)}
        {!isLogedIn && (<li>
            <Link to='/auth'>Login</Link>
          </li>)}
         {isLogedIn &&  (<li>
            <Link to='/add'>Add</Link>
          </li>)}
         {isLogedIn && (<li>
            <button onClick={logOutHandler}>Logout</button>
          </li>)}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
