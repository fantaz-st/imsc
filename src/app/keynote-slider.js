"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./page.module.css";

function ArrowIcon({ reverse = false }) {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={reverse ? styles.arrowLeft : undefined}
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function KeynoteSlider({ speakers }) {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="keynotes" className={styles.keynotes}>
      <div className={styles.sectionLabel}>(03) Keynotes</div>
      <div className={styles.keynoteLayout}>
        <div className={`${styles.imagePlaceholder} ${styles.pale} ${styles.keynotePortrait}`} data-anim="reveal">
          <Image
            src="/images/imsc-placeholder.svg"
            alt=""
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
            className={styles.placeholderImage}
          />
          <span className={styles.imageLabel}>[KEYNOTE PORTRAIT]</span>
        </div>
        <div className={styles.keynoteText}>
          <Swiper
            loop
            slidesPerView={1}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className={styles.keynoteSwiper}
            aria-label="Featured keynote speakers"
          >
            {speakers.map((speaker) => (
              <SwiperSlide key={speaker.name}>
                <div className={styles.keynoteDetails}>
                  <h2 aria-live="polite">{speaker.name}</h2>
                  <div className={styles.speakerOrg}>{speaker.org}</div>
                  <p className={styles.speakerTalk}>“{speaker.talk}”</p>
                  <p className={styles.speakerNote}>Previous keynotes came from IMO, EMSA and the World Maritime University.</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={styles.keynoteControls}>
            <div className={styles.keynoteCounter} aria-live="polite">
              {String(activeIndex + 1).padStart(2, "0")} / {String(speakers.length).padStart(2, "0")}
            </div>
            <div className={styles.keynoteButtons}>
              <button type="button" aria-label="Previous keynote" onClick={() => swiperRef.current?.slidePrev()}>
                <ArrowIcon reverse />
              </button>
              <button type="button" aria-label="Next keynote" onClick={() => swiperRef.current?.slideNext()}>
                <ArrowIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
