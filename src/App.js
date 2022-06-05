import { Switch, Route } from 'react-router-dom';
import React, { useContext } from 'react';
import AuthContext from './store/auth-context';
import Layout from './components/Layout/Layout';
import AddPage from './pages/AddPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';


function App() {
  const authCtx = useContext(AuthContext);
  return (

   <Layout>
      <Switch>
       {authCtx.isLogedIn && ( <Route path='/' exact>
          <HomePage />
        </Route>)}
        {!authCtx.isLogedIn && (  <Route path='/auth'>
          <AuthPage />
        </Route>)}
       {authCtx.isLogedIn && ( <Route path='/add'>
          <AddPage />
        </Route>)}
        <Route path='*'>
          <p>ERROR 404</p>
        </Route>
      </Switch>
      </Layout>
  
  );
}

export default App;
