import React, { useEffect, useState } from 'react'
import './css/Navbar.css'
import { autocompleteFn } from '../services/weatherService'

function Navbar({ setQuery }) {
    let defaultTheme = window.matchMedia("(prefers-color-scheme:dark)").matches
    const setDarkMode = () => {
        document.querySelector("body").setAttribute('theme', 'dark')
    }
    const setLightMode = () => {
        document.querySelector("body").setAttribute('theme', 'light')
    }
    useEffect(() => {
        function changeTheme() {
            defaultTheme ? setDarkMode() : setLightMode()
        }
        changeTheme()
    }, [])

    const toggleTheme = (e) => {
        e.target.checked ? setDarkMode() : setLightMode()
    }

    const [city, setCity] = useState('')
    const [showSuggestion, setShowSuggestion] = useState(false)
    const [autoSuggest, setAutoSuggest] = useState()

    const debounceFunction = (func) => {
        let timer
        return function (...args) {
            let context = this
            if (timer) clearTimeout(timer)
            timer = setTimeout(async () => {
                func.apply(context, args)
            }, 1000);
        }
    }

    const inputHandler = async (e) => {
        const { value } = e.target
        setCity(e.target.value)
        // console.log("calling autocomplete fn")

        if (e.target.value !== '') {
            // console.log(e.target.value)
            let resp = await autocompleteFn(e.target.value)
            setAutoSuggest(resp)
            // console.log(resp)
        }
        setShowSuggestion(true)
    }

    const debounceGetAutocompleteData = debounceFunction(inputHandler)

    const search = (e) => {
        console.log(e.target.textContent)
        setQuery({ q: e.target.textContent })
    }
    const handleSearch = () => {
        if (city !== '') {
            setQuery({ q: city })
            setCity('')
            setShowSuggestion(true)
        }
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }
    const blurfn = () => {
        setTimeout(() => {
            setShowSuggestion(false)
        }, 200);
    }
    const focusFn = () => {
        if (city !== '') {
            setShowSuggestion(true)
        }
    }
    // console.log(autoSuggest)

    return (
        <div className='navbar'>
            <div className='navbar-title'>Weather app</div>
            <div className='navbar-btns'>
                <div>

                    <div className='search-box'>
                        <input type="text" className="search-input" name="" id="search" placeholder="Search"
                            // value={city}
                            onChange={debounceGetAutocompleteData} onKeyDown={handleKeyDown} onBlur={blurfn} onFocus={focusFn} />
                        <i className="bi bi-search searchIcon" onClick={handleSearch} />
                    </div>
                    {
                        showSuggestion &&
                        <div className='search-suggestion'>
                            {autoSuggest.map((data, key) => {
                                return (
                                    <p key={key} title={`${data.city}, ${data.state}, ${data.country}`} onClick={search}>{`${data.city}, ${data.state}, ${data.country}`}</p>
                                )
                            })}
                            <p>name2</p>
                        </div>
                    }
                </div>
                <input type="checkbox" className='dark-mode-btn' name="" id="checkbox" onClick={toggleTheme} defaultChecked={defaultTheme} />

            </div>
        </div>
    )
}

export default Navbar