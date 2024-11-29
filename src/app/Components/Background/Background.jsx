"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import classes from "./Background.module.css";
const Background = () => {
  const blobRefs = useRef([]);

  useEffect(() => {
    const timeline = gsap.timeline();

    // Add animations for each blob
    blobRefs.current.forEach((blob, index) => {
      timeline.fromTo(
        blob,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,

          duration: 2,
          ease: "power3.out",
        },
        index * 0.2 // Stagger effect
      );
    });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.blobs}>
        <div className={classes.blob} ref={(el) => (blobRefs.current[0] = el)} />
        <div className={classes.blob} ref={(el) => (blobRefs.current[1] = el)} />
        <div className={classes.blob} ref={(el) => (blobRefs.current[2] = el)} />
      </div>
    </div>
  );
};

export default Background;
