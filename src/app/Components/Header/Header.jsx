"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import classes from "./Header.module.css";

const Header = () => {
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < prevScrollY) {
        setIsScrolledUp(true);
      } else {
        setIsScrolledUp(false);
      }
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  useEffect(() => {
    setTimeout(() => {
      setIsScrolledUp(true);
    }, 2000);
  }, []);

  return (
    <header className={`${classes.header} ${isScrolledUp ? classes.show : classes.hide}`} ref={headerRef}>
      <div className={classes.container}>
        <div className={classes.logo}>
          <Image src='/images/white-11th-imsc.svg' height={80} width={237} className={classes.logoImg} /* fill style={{ objectFit: "cover" }}  */ alt='Logo' />
        </div>
        <nav className={`${classes.nav} ${isMobileMenuOpen && classes.open}`}>
          <div className={classes.wrapper}>
            {["Welcome", "Organizers", "Topics", "Dates", "Committee", "Venue", "Registration", "Instructions for Authors"].map((item) => (
              <div key={item} className={classes.navItem}>
                <a href={`#${item.toLowerCase().replace(/ /g, "-")}`}>
                  <span>{item}</span>
                </a>
              </div>
            ))}
          </div>
        </nav>
        <button className={classes.submitButton}>
          <p>Submit Paper</p>
          <div className={classes.spans}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        <div className={classes.hamburger} onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
