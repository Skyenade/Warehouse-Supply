import React from "react";
import './Style.css';
import logo from './logo.jpg';

const Header = ({ email, handleSignOut }) => {    

    const location = window.location.pathname;
    const showHeaderRight = location !== "/signup" && location !== "/signin";

    return (
        <div className="header-container">
            <img src={logo} alt="Logo" className="logo-header" />
            <h2 className="header-title">Warehouse Management</h2>
            {showHeaderRight && (
                <div className="header-right">
                    <button onClick={handleSignOut} className="sign-out">Sign Out</button>
                    <div className="email-in-use">{email}</div>
                </div>
            )}
        </div>
    );
};

export default Header;
