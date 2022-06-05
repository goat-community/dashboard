import React, {useState} from 'react';

const AuthContext = React.createContext({
    token: '',
    isLogedIn: false,
    login: (token) => {},
    logout: () => {}
});

export const AuthContextProvider = (props) => {
const initialToken = localStorage.getItem('token');
const [token, setToken] = useState(initialToken);
const userIsLogedIn = !!token; 

const logInHandler = (token) => {
    setToken(token);
    localStorage.setItem('token',token);
};
const logOutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
};
const contextValue = {
    token: token,
    isLogedIn: userIsLogedIn,
    login: logInHandler,
    logout: logOutHandler
}


 return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
};

export default AuthContext;