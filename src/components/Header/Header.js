import './Header.scss';
import logo from '../../logo.png';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState } from 'react';

function Header() {
    const [showList, toggleList] = useState(false);

    return (
        <header className="Header">
            <img className="Header-logo" src={logo} alt='logo' />
            <div className="NavBar">
                <div className={`NavBar-Links ${showList ? 'show' : ''}`}>
                    <Link to="/">Home</Link>
                    <Link to="/favorites">Favorites</Link>
                </div>
                <button className="NavBar-Trigger" onClick={() => {toggleList(!showList)}}><GiHamburgerMenu /></button>
            </div>
        </header>
    );
}

export default Header;
