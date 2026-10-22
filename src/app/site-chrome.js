"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./site-chrome.module.css";

const primaryLinks = [
  ["About", "#about"],
  ["Call for papers", "#dates"],
  ["Programme", "#keynotes"],
  ["Registration", "#registration"],
  ["Venue & travel", "#venue"],
  ["News", "#news"],
];

const menuGroups = [
  {
    title: "Conference",
    items: [
      ["About IMSC", "#about"],
      ["Organisers", "#about"],
      ["Committees", "#about"],
      ["Topics", "#tracks"],
      ["Key dates", "#dates"],
    ],
  },
  {
    title: "Participate",
    items: [
      ["Call for papers", "#dates"],
      ["Registration & fees", "#registration"],
      ["Programme", "#keynotes"],
      ["Keynotes", "#keynotes"],
      ["Social programme", "#venue"],
    ],
  },
  {
    title: "Visit",
    items: [
      ["Venue & travel", "#venue"],
      ["Accommodation", "#venue"],
      ["About Split", "#venue"],
    ],
  },
  {
    title: "Archive",
    items: [
      ["Publications", "#dates"],
      ["Certificates", "#dates"],
      ["Past editions", "#past-editions"],
      ["News", "#news"],
    ],
  },
];

export function Logo({ light = false }) {
  const prefix = light ? "footer" : "header";
  const mainFill = light ? "#FFFFFF" : "#004185";

  return (
    <svg role="img" aria-label="IMSC 12th" viewBox="0 0 280 100">
      <defs>
        <linearGradient id={`${prefix}-logo-a`} x1="106.53" y1="61.77" x2="55.46" y2="36.85" gradientUnits="userSpaceOnUse">
          <stop offset=".2" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#B9E5FB" />
        </linearGradient>
        <linearGradient id={`${prefix}-logo-b`} x1="193.89" y1="24.27" x2="282.64" y2="75.51" gradientUnits="userSpaceOnUse">
          <stop offset=".2" stopColor="#B9E5FB" />
          <stop offset="1" stopColor="#00AEEF" />
        </linearGradient>
        <linearGradient id={`${prefix}-logo-c`} x1="109.08" y1="58.15" x2="23.13" y2="26.86" gradientUnits="userSpaceOnUse">
          <stop offset=".2" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#B9E5FB" />
        </linearGradient>
      </defs>
      <path fill={`url(#${prefix}-logo-a)`} fillRule="evenodd" d="M122.02 26.77 41.13 66.22c1.4 2.88 2.93 5.69 4.58 8.43L122.86 28.3c-.3-.5-.58-1.01-.84-1.53Z" />
      <path fill={mainFill} fillRule="evenodd" d="M140 10a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm6 78.55c-29.34 7.98-60.67-12.38-90 7.13 41.34-9.35 64.67 12.02 90-7.13Zm60 6.22c-25.33 13-32.67-4.34-58 0 29.33-12.8 34.67 3.03 58 0ZM182.42 45.55l18.44 11.97V84h-12.7V62.06h-.49L184 70.32l-2.75 6.21h-8.04l-3.11-6.7-3.6-7.97h-.49v19c-4.28-.5-8.56-.53-12.84-.22V35.82h14.21l5.29 11.5 4.32 9.81h.28l4.32-9.74.85-1.83ZM133.95 45.16l-5.41-1.3v-8.12h18.53V81.3c-4.38.62-8.75 1.54-13.12 2.6V45.16ZM225.67 73.64l10.89 7.07c-.29.25-.57.49-.88.72-1.7 1.2-3.72 2.08-6.07 2.65-2.35.56-4.94.85-7.76.85-1.08 0-2.26-.06-3.53-.18-1.27-.12-2.57-.32-3.92-.6-1.34-.28-2.66-.66-3.95-1.13-1.3-.47-2.48-1.03-3.56-1.69l3.18-9.24c1.18.52 2.36.93 3.56 1.23s2.32.54 3.35.71c1.03.16 1.94.27 2.71.32.78.05 1.35.07 1.73.07 1.92 0 3.33-.26 4.25-.77ZM278.46 38.21l-1.35 3.97-23.43-4.13c.64-.45 1.32-.87 2.03-1.25 2.56-1.36 5.61-2.05 9.14-2.05 2.96 0 5.54.33 7.73.99 2.19.66 4.15 1.48 5.88 2.47Z" />
      <path fill={`url(#${prefix}-logo-b)`} fillRule="evenodd" d="m239.02 75.17-33.03-19.07c-.3-1.4-.42-3.01-.36-4.85.09-2.63.65-4.84 1.68-6.61 1.03-1.78 2.38-3.19 4.07-4.23s3.6-1.78 5.76-2.2c2.16-.42 4.41-.59 6.76-.51.99.04 2.08.14 3.27.33s2.41.44 3.64.76c1.24.33 2.46.73 3.67 1.22 1.2.49 2.29 1.06 3.26 1.7l-2.99 8.72c-.97-.41-2-.76-3.07-1.06-1.07-.3-2.08-.53-3.01-.71-.93-.17-1.78-.31-2.53-.41-.75-.1-1.29-.15-1.62-.16-1.79-.06-3.1.2-3.95.78-.84.58-1.29 1.56-1.34 2.92-.04 1.08.36 1.94 1.18 2.58.83.64 2.1 1.27 3.82 1.9 3.07 1.1 5.58 2.18 7.55 3.26 1.96 1.08 3.51 2.26 4.64 3.55 1.13 1.29 1.89 2.75 2.28 4.39.39 1.64.55 3.58.47 5.84-.02.64-.07 1.26-.15 1.86Zm20.4-22.08c1.42-2.28 3.57-3.37 6.43-3.27 2.78.1 5.6.76 8.48 1.99l1.85-4.86-23.27-4.95c-1.71 1.11-3.2 2.46-4.47 4.07-1.75 2.22-3.06 4.8-3.94 7.73-.88 2.94-1.38 6.02-1.49 9.27-.13 3.62.05 6.99.53 10.11.3 1.97.79 3.76 1.42 5.42l18.39 10.62c1.91-.07 3.8-.25 5.66-.57 2.84-.49 5.37-1.38 7.58-2.67l-2.71-9.27c-1.33.38-2.48.69-3.46.94-.97.25-1.85.43-2.63.54-.78.11-1.49.18-2.12.21-.64.02-1.26.03-1.87 0-2.21-.08-3.93-1.4-5.16-3.96-1.23-2.56-1.75-6.4-1.58-11.53.15-4.28.94-7.56 2.36-9.84ZM200.2 37.92l-13.92-.49-2.85 5.64 16.26 9.39.51-14.54Z" />
      <path fill={`url(#${prefix}-logo-c)`} fillRule="evenodd" d="M120.77 23.51 13.11 54.38c.85 2.95 1.79 5.88 2.85 8.76L121.2 24.84c-.16-.44-.3-.88-.43-1.33Z" />
      <text x="74.55" y="78.54" fill={mainFill} fontFamily="Inter Tight, sans-serif" fontSize="31" fontWeight="500">12</text>
      <text transform="translate(106.98 68.22) scale(.58)" fill={mainFill} fontFamily="Inter Tight, sans-serif" fontSize="31" fontWeight="500">th</text>
    </svg>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);
  const menuDialog = useRef(null);
  const closeButton = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const button = menuButton.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = menuDialog.current?.querySelectorAll("a[href], button:not([disabled])");
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    closeButton.current?.focus();
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      button?.focus();
    };
  }, [menuOpen]);

  return (
    <>
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <nav className={styles.primaryLinks} aria-label="Main">
            {primaryLinks.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
          </nav>
          <div className={styles.topActions}>
            <button
              ref={menuButton}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen(true)}
              className={styles.menuButton}
            >
              All pages
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 8h16" /><path d="M4 16h16" />
              </svg>
            </button>
            <a href="#dates" className={styles.submitButton}>Submit abstract</a>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div id="site-menu" ref={menuDialog} role="dialog" aria-modal="true" aria-label="Site menu" className={styles.siteMenu}>
          <div className={styles.menuInner}>
            <div className={styles.menuTop}>
              <div className={styles.menuEdition}>IMSC 2027 · 12th edition</div>
              <button ref={closeButton} type="button" onClick={() => setMenuOpen(false)} className={styles.closeButton}>
                Close
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="m6 6 12 12" /><path d="M18 6 6 18" />
                </svg>
              </button>
            </div>
            <nav className={styles.menuGroups} aria-label="All pages">
              {menuGroups.map((group) => (
                <div key={group.title}>
                  <div className={styles.menuGroupTitle}>{group.title}</div>
                  <div className={styles.menuGroupItems}>
                    {group.items.map(([label, href]) => (
                      <a href={href} key={label} onClick={() => setMenuOpen(false)}>{label}</a>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
            <div className={styles.menuFooter}>
              <span>[DATES] May 2027 · Split, Croatia</span>
              <a href="mailto:imsc@pfst.hr">imsc@pfst.hr</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function SiteFooter() {
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    let frame = 0;
    const updateScrolled = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(Math.round((window.scrollY || 0) * 0.026458));
      });
    };

    window.addEventListener("scroll", updateScrolled, { passive: true });
    updateScrolled();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScrolled);
    };
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <Logo light />
            <p>12th International Maritime Science Conference · Faculty of Maritime Studies, University of Split</p>
          </div>
          <div className={styles.footerLinks}>
            <div>
              <div className={styles.footerHeading}>Explore</div>
              <a href="#about">About</a>
              <a href="#tracks">Topics</a>
              <a href="#keynotes">Keynotes</a>
              <a href="#dates">Key dates</a>
            </div>
            <div>
              <div className={styles.footerHeading}>Find us</div>
              <span>Ruđera Boškovića 37</span>
              <span>HR-21000 Split, Croatia</span>
              <a href="tel:+38521619399">+385 21 619 399</a>
              <a href="mailto:imsc@pfst.hr">imsc@pfst.hr</a>
            </div>
            <div>
              <div className={styles.footerHeading}>Follow</div>
              <a href="#top">LinkedIn</a>
              <a href="#top">Instagram</a>
              <a href="#top">Facebook</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>© 2027 IMSC · Privacy · Cookies</span>
          <span>You&apos;ve scrolled {scrolled} cm</span>
        </div>
      </div>
    </footer>
  );
}
