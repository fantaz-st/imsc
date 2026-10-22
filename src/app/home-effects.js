"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export function HomeEffects({ children }) {
  const root = useRef(null);

  useEffect(() => {
    const clock = root.current?.querySelector("[data-split-time]");
    if (!clock) return undefined;

    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Zagreb",
      hour: "2-digit",
      minute: "2-digit",
    });
    const update = () => {
      clock.textContent = formatter.format(new Date());
    };

    update();
    const interval = window.setInterval(update, 15000);
    return () => window.clearInterval(interval);
  }, []);

  useGSAP(() => {
    const scope = root.current;
    if (!scope) return undefined;

    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({ smoothWheel: true });
      const marqueeTweens = [];
      const syncScroll = () => ScrollTrigger.update();
      const tick = (time) => lenis.raf(time * 1000);

      lenis.on("scroll", syncScroll);
      gsap.ticker.add(tick);

      const hero = scope.querySelector('[data-anim="hero"]');
      if (hero) {
        const split = SplitText.create(hero, { type: "lines", mask: "lines" });
        gsap.from(split.lines, {
          yPercent: 100,
          duration: 1.1,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.12,
        });
      }

      scope.querySelectorAll('[data-anim="split"]').forEach((heading) => {
        const split = SplitText.create(heading, { type: "lines", mask: "lines" });
        gsap.from(split.lines, {
          yPercent: 100,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: heading, start: "top 85%", once: true },
        });
      });

      scope.querySelectorAll('[data-anim="reveal"]').forEach((element) => {
        gsap.from(element, {
          y: 56,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 85%", once: true },
        });
      });

      scope.querySelectorAll('[data-anim="stagger"]').forEach((container) => {
        gsap.from(container.children, {
          y: 56,
          opacity: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: container, start: "top 85%", once: true },
        });
      });

      scope.querySelectorAll("[data-count]").forEach((element) => {
        const count = Number(element.getAttribute("data-count"));
        if (!Number.isFinite(count)) return;
        const counter = { value: 0 };
        element.textContent = "0";
        gsap.to(counter, {
          value: count,
          duration: 1.5,
          ease: "power1.out",
          scrollTrigger: { trigger: element, start: "top 85%", once: true },
          onUpdate: () => { element.textContent = String(Math.round(counter.value)); },
        });
      });

      scope.querySelectorAll('[data-anim="parallax"]').forEach((element) => {
        gsap.fromTo(element, { yPercent: -7, scale: 1.16 }, {
          yPercent: 7,
          scale: 1.16,
          ease: "none",
          scrollTrigger: { trigger: element.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      scope.querySelectorAll("[data-marquee]").forEach((track) => {
        const duration = track.hasAttribute("data-marquee-slow") ? 70 : 48;
        marqueeTweens.push(gsap.to(track, {
          xPercent: -50,
          duration,
          repeat: -1,
          ease: "none",
        }));
      });

      lenis.on("scroll", ({ velocity }) => {
        const timeScale = gsap.utils.clamp(0.7, 2.2, 1 + Math.abs(velocity) / 1200);
        marqueeTweens.forEach((tween) => gsap.to(tween, { timeScale, duration: 0.25, overwrite: true }));
      });

      const responsive = gsap.matchMedia();
      responsive.add("(min-width: 961px)", () => {
        const track = scope.querySelector('[data-anim="hscroll"]');
        const section = track?.closest("[data-hscroll-section]");
        if (!track || !section) return undefined;

        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 48);
        return gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => {
        responsive.revert();
        lenis.off("scroll", syncScroll);
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });

    return () => motion.revert();
  }, { scope: root });

  return <div ref={root}>{children}</div>;
}
