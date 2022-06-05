import { useState , useRef, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import logo from '../../assets/logo.png';
import classes from './AuthForm.module.css';
import axios from "axios";

const AuthForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const usernameInputRef = useRef();
  const  passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const sumbitHandler = (event) => {
    event.preventDefault();
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassord = passwordInputRef.current.value;
    setIsLoading(true);
    var bodyFormData = new FormData();
    bodyFormData.append('username', enteredUsername);
    bodyFormData.append('password', enteredPassord);
     axios.post('https://goat-dev.plan4better.de/api/v1/login/access-token', bodyFormData)
    .then(function (response) {
      console.log(response);
      console.log(response.status);
      console.log(response.statusText);
      setIsLoading(false);
      authCtx.login(response.access_token);
      history.replace('/');
    })
    .catch(function (error) {
      console.log(error);
     
            alert(error);
    })
 
  };

  return (
    <section className={classes.auth}>
     
      <img src={logo} alt="Logo" />
      <h2 className={classes.authh2}>Dashboard</h2>
      <h1 className={classes.authh1}>Login</h1>
      <form onSubmit={sumbitHandler}>
        <div className={classes.control}>
          <input className={classes.input}  type='email' id='email' placeholder='Email address' required  ref={usernameInputRef}/>
        </div>
        <div className={classes.control}>
          <input className={classes.input} type='password' id='password' placeholder='Password' required  ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
         {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
         {isLoading && <p style={{color: 'white'}}>Loading ..</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
