import React, { useState, useRef } from "react";
import { navbarStyles } from "../assets/dummyStyles";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { SignedIn, SignedOut, useClerk, UserButton } from "@clerk/clerk-react";
import logo from "../assets/logo.png";
import { User, Key, Menu, X } from "lucide-react";

const STORAGE_KEY = "doctorToken_v1";

const Navbar = () => {
  const [isOpen, setisOpen] = useState(false);
  const [showNavbar, setshowNavbar] = useState(true);
  const [lastScrollY, setlastScrollY] = useState(0);
  const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState(() => {
    try {
      return Boolean(localStorage.getItem(STORAGE_KEY));
    } catch {
      return false;
    }
  });
  const location = useLocation();
  const navRef = useRef(null);
  const clerk = useClerk();
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Doctors", href: "/doctors" },
    { label: "Services", href: "/services" },
    { label: "Appointments", href: "/appointments" },
    { label: "Contact", href: "/contact" },
  ];
  return (
    <>
      <div className={navbarStyles.navbarBorder}></div>

      <nav
        className={`${navbarStyles.navbarContainer} ${
          showNavbar ? navbarStyles.navbarVisible : navbarStyles.navbarHidden
        }`}
      >
        <div className={navbarStyles.contentWrapper}>
          <div className={navbarStyles.flexContainer}>
            {/* Logo */}
            <Link to="/" className={navbarStyles.logoLink}>
              <div className={navbarStyles.logoContainer}>
                <div className={navbarStyles.logoImageWrapper}>
                  <img
                    src={logo}
                    alt="Logo"
                    className={navbarStyles.logoImage}
                  />
                </div>
              </div>

              <div className={navbarStyles.logoTextContainer}>
                <h1 className={navbarStyles.logoTitle}>MediCare</h1>
                <p className={navbarStyles.logoSubtitle}>
                  Your Health is Our Priority
                </p>
              </div>
            </Link>

            <div className={navbarStyles.desktopNav}>
              <div className={navbarStyles.navItemsContainer}>
                {navItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`${navbarStyles.navItem} ${
                        isActive
                          ? navbarStyles.navItemActive
                          : navbarStyles.navItemInactive
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* right side */}
            <div className={navbarStyles.rightContainer}>
              <SignedOut>
                <Link
                  to="/doctor-admin/login"
                  className={navbarStyles.doctorAdminButton}
                >
                  <User className={navbarStyles.doctorAdminIcon} />
                  <span className={navbarStyles.doctorAdminText}>
                    Doctor Admin
                  </span>
                </Link>

                {/*  Patient Login */}
                <button
                  onClick={() => clerk.openSignIn()}
                  className={navbarStyles.loginButton}
                >
                  <Key className={navbarStyles.loginIcon} />
                  Login
                </button>
              </SignedOut>

              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>

              {/* to toggle menu in mobile view */}
              <button
                className={navbarStyles.mobileToggle}
                onClick={() => setisOpen(!isOpen)}
              >
                {isOpen ? (
                  <X className={navbarStyles.toggleIcon} />
                ) : (
                  <Menu className={navbarStyles.toggleIcon} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigations */}
          {isOpen && (
            <div className={navbarStyles.mobileMenu}>
              {navItems.map((item, idx) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setisOpen(false)}
                    className={`${navbarStyles.mobileMenuItem} 
                                ${isActive ? navbarStyles.mobileMenuItemActive : navbarStyles.mobileMenuItemInactive}`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <SignedOut>
                <Link
                  to="/doctor-admin/login"
                  className={navbarStyles.mobileDoctorAdminButton}
                  onClick={() => setisOpen(false)}
                >
                  Doctor Admin
                </Link>

                <div className={navbarStyles.mobileLoginContainer}>
                  <button
                    onClick={() => {
                      setisOpen(false);
                      clerk.openSignIn();
                    }}
                    className={navbarStyles.mobileLoginButton}
                  >
                    Login
                  </button>
                </div>
              </SignedOut>
            </div>
          )}
        </div>
        <style>{navbarStyles.animationStyles}</style>
      </nav>
    </>
  );
};

export default Navbar;
