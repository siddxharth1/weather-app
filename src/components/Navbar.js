import React from 'react'
import './Navbar.css'

function Navbar() {
    const setDarkMode=()=>{
        document.querySelector("body").setAttribute('theme', 'dark')
    }
    const setLightMode=()=>{
        document.querySelector("body").setAttribute('theme', 'light')
    }
    const toggleTheme = (e)=>{
        e.target.checked ? setDarkMode() : setLightMode()
    }

    let defaultTheme = window.matchMedia("(prefers-color-scheme:dark)").matches
    defaultTheme ? setDarkMode() :setLightMode()

    return (
        <div className='navbar'>
            <div className='navbar-title'>Weather app</div>
            <div className='navbar-btns'>
                <div className='search-box'>
                    <input type="text" className="search-input" name="" id="search" placeholder="Search" />
                    <i className="bi bi-search searchIcon" />
                </div>
                
                <input type="checkbox" className='dark-mode-btn' name="" id="checkbox" onChange={toggleTheme} defaultChecked={defaultTheme}/>
                
            </div>
        </div>
    )
}

export default Navbar