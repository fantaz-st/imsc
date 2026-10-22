"use client";

import { useState } from "react";
import styles from "./page.module.css";

export function FAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className={styles.faqList} data-anim="stagger">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const answerId = `faq-answer-${index + 1}`;

        return (
          <div className={styles.faqItem} key={faq.q}>
            <button
              type="button"
              className={styles.faqQuestion}
              aria-expanded={isOpen}
              aria-controls={answerId}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span>{faq.q}</span>
              <span className={styles.faqSign} aria-hidden="true">{isOpen ? "−" : "+"}</span>
            </button>
            <div id={answerId} hidden={!isOpen}>
              {isOpen && <p className={styles.faqAnswer}>{faq.a}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
