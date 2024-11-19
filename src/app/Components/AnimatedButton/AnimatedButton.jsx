"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import styles from "./AnimatedButton.module.css";

export default function AnimatedButton() {
  const buttonRef = useRef(null);
  const pixelBackgroundRef = useRef(null);
  const blocks = [];

  useEffect(() => {
    const pixelBackground = pixelBackgroundRef.current;
    const columns = 10;
    const rows = 10;

    for (let i = 0; i < columns * rows; i++) {
      const block = document.createElement("div");
      block.classList.add(styles.block);
      pixelBackground.appendChild(block);
      blocks.push(block);
    }

    return () => {
      blocks.forEach((block) => pixelBackground.removeChild(block));
    };
  }, []);

  const handleMouseEnter = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    startAnimation(offsetX, offsetY);
  };

  const handleMouseLeave = () => {
    console.log("left");
    gsap.to(blocks, { opacity: 0, duration: 0.2 });
  };

  const startAnimation = (cursorX, cursorY) => {
    blocks.forEach((block) => {
      const rect = block.getBoundingClientRect();
      const distance = Math.hypot(rect.left - cursorX, rect.top - cursorY);

      gsap.to(block, {
        opacity: 1,
        delay: distance * 0.002,
        duration: 0.5,
      });
    });
  };

  return (
    <div className={styles.pixelButton} ref={buttonRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <span className={styles.buttonText}>Hover me</span>
      <div className={styles.pixelBackground} ref={pixelBackgroundRef}></div>
    </div>
  );
}
