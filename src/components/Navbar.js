import React, { useState } from 'react'
import './css/Navbar.css'

function Navbar({setQuery}) {
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


    const[city, setCity] = useState('')
    const handleSearch=()=>{
        if(city!=='') setQuery({q: city})
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
      }

    return (
        <div className='navbar'>
            <div className='navbar-title'>Weather app</div>
            <div className='navbar-btns'>
                <div className='search-box'>
                    <input type="text" className="search-input" name="" id="search" placeholder="Search" value={city} onChange={(e)=>setCity(e.target.value)} onKeyDown={handleKeyDown}
                    />
                    <i className="bi bi-search searchIcon" onClick={handleSearch} />
                </div>
                
                <input type="checkbox" className='dark-mode-btn' name="" id="checkbox" onChange={toggleTheme} defaultChecked={defaultTheme}/>
                
            </div>
        </div>
    )
}

export default Navbar