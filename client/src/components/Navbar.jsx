import React, { useState,useRef } from 'react'
import { navbarStyles } from '../assets/dummyStyles'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useClerk } from '@clerk/react'
import logo from '../assets/logo.png'



const STORAGE_KEY = 'doctorToken_v1'

const Navbar = () => {
    const [isOpen, setisOpen] = useState(false)
    const [showNavbar, setshowNavbar] = useState(true)
    const [lastScrollY, setlastScrollY] = useState(0)
    const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState(() => {
        try {
            return Boolean(localStorage.getItem(STORAGE_KEY))
        } catch {
            return  false
        }
    });
    const location = useLocation()
    const navRef = useRef(null)
    const clerk = useClerk()
    const navigate = useNavigate()
  return (
    <>
    <div className={navbarStyles.navbarBorder}></div>

    <nav className= { `${navbarStyles.navbarContainer} ${
        showNavbar ? navbarStyles.navbarVisible : navbarStyles.navbarHidden
    }`}
    >
        <div className={navbarStyles.contentWrapper}>
            <div className={navbarStyles.flexContainer}>
                {/* Logo */ }
                <Link to='/' className={navbarStyles.logoLink}>
                <div className={navbarStyles.logoContainer}>
                    <div className={navbarStyles.logoImageWrapper}>
                        <img src={logo} alt="Logo" className={navbarStyles.logoImage} />
                    </div>
                </div>
                </Link>
            </div>
        </div>
        
        
    </nav>   
    </>
  )
}

export default Navbar