"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import classes from "./Hero.module.css";

gsap.registerPlugin(useGSAP);

const Hero = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const datevenueyear = useRef(null);
  const numStripes = 8;
  const numTrails = 150;
  const animationDuration = 4;
  const trailGap = 0.005;
  const initDelays = [1, 0.5, 1.5, 1, 1, 1.25, 1.75, 1];
  const stripeDelays = [0.5, 1, 1.5, 2, 1, 1.25, 1.75, 1];

  function generateGradientColors(numColors) {
    return Array(numColors)
      .fill()
      .map((_, i) => {
        const ratio = i / (numColors - 1);
        return ratio < 0.5 ? `rgb(${148 * (1 - ratio * 2)}, 0, ${211 + 44 * (ratio * 2)})` : `rgb(0, 0, ${255 * (1 - (ratio - 0.5) * 2)})`;
      });
  }

  useGSAP(
    () => {
      const mainTl = gsap.timeline();

      const titles = gsap.utils.toArray(`.${classes.title} span`);
      gsap.set(titles, { autoAlpha: 1 });

      mainTl
        .from(titles, {
          yPercent: 100,
          stagger: 0.1,
          duration: 1,
          ease: "power2.out",
          delay: 1,
          onComplete: () => {
            animateStripes();
          },
        })
        .to(datevenueyear.current, {
          autoAlpha: 1,
          duration: 1,
          ease: "power2.out",
        });

      const animateStripes = () => {
        const stripes = contentRef.current?.children;

        if (stripes) {
          Array.from(stripes).forEach((stripe, stripeIndex) => {
            const stripeWidth = stripe.clientWidth;
            const colors = generateGradientColors(numTrails);
            const directionMultiplier = stripeIndex % 2 === 0 ? 1 : -1;
            const startX = directionMultiplier === 1 ? 0 : stripeWidth;
            const endX = directionMultiplier === 1 ? stripeWidth : 0;
            const timeline = gsap.timeline({
              repeat: -1,
              defaults: { duration: animationDuration, ease: "power3.out" },
            });

            Array.from(stripe.children).forEach((trail, i) => {
              gsap.set(trail, { x: startX, backgroundColor: colors[i] });

              timeline.to(
                trail,
                {
                  x: endX,
                  delay: initDelays[stripeIndex],
                  opacity: (numTrails - i) / numTrails,
                  onComplete: () => gsap.set(trail, { opacity: 0 }),
                },
                i * trailGap
              );

              timeline.to(
                trail,
                {
                  x: startX,
                  opacity: (numTrails - i) / numTrails,
                  onComplete: () => gsap.set(trail, { opacity: 0 }),
                },
                animationDuration + stripeDelays[stripeIndex] + i * trailGap
              );
            });
          });
        }
      };
    },
    { containerRef }
  );

  return (
    <div className={classes.container} ref={containerRef}>
      <div className={classes.content} ref={contentRef}>
        {Array.from({ length: numStripes }).map((_, stripeIndex) => (
          <div key={stripeIndex} className={`${classes.stripe} ${classes[`stripe${stripeIndex + 1}`]}`}>
            {Array.from({ length: numTrails }).map((_, trailIndex) => (
              <div key={trailIndex} className={classes.trail}></div>
            ))}
          </div>
        ))}
      </div>
      <div className={classes.text}>
        {/* <h1>11th IMSC</h1> */}
        <h1 className={classes.title}>
          <span>International</span>
        </h1>
        <h1 className={classes.title}>
          <span>Maritime Science</span>
        </h1>
        <h1 className={classes.title}>
          <span>Conference</span>
        </h1>
        {/* <h1 ref={titleRef}>
          <span>11th International</span>
          <span>Maritime Science</span>
          <span>Conference</span>
        </h1> */}
        <div className={classes.datevenueyear} ref={datevenueyear}>
          <div className={classes.datevenue}>
            <p>May 8th & 9th</p>
            <p>Hotel Cornaro, Split</p>
          </div>
          <div className={classes.year}>
            <p>2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
