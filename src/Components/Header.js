import React from "react";
import logo from './logo.jpg';
import './Style.css';

const Header = ({email}) => {
    return (
        <div className="header-container">
            <img src={logo} alt="Logo" className="logo-header" />
            {email ? 
            <div className="header-right">                
                <button className="sign-out">Sign Out</button>
                <div className="email-in-use">{email} </div>
            </div>
            : 
            <></>}
        </div>
    );
};

export default Header;
