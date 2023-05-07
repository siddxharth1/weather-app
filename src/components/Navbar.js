import React, { useEffect, useState } from 'react'
import './css/Navbar.css'

function Navbar({setQuery}) {
    let defaultTheme = window.matchMedia("(prefers-color-scheme:dark)").matches
    const setDarkMode=()=>{
        document.querySelector("body").setAttribute('theme', 'dark')
    }
    const setLightMode=()=>{
        document.querySelector("body").setAttribute('theme', 'light')
    }
    useEffect(()=>{
        function changeTheme(){
            defaultTheme ? setDarkMode() :setLightMode()
        }
        changeTheme()
    }, [])

    const toggleTheme = (e)=>{
        e.target.checked ? setDarkMode() : setLightMode()
    }



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
                
                <input type="checkbox" className='dark-mode-btn' name="" id="checkbox" onClick={toggleTheme} defaultChecked={defaultTheme}/>
                
            </div>
        </div>
    )
}

export default Navbar