import Image from "next/image";
import { FAQAccordion } from "./faq-accordion";
import { HomeEffects } from "./home-effects";
import { KeynoteSlider } from "./keynote-slider";
import { Logo } from "./site-chrome";
import styles from "./page.module.css";
import FlutedGlass from "../../components/FlutedGlass.jsx";

const topics = [
  "Marine Engineering",
  "Navigation",
  "Maritime Safety and Security",
  "Marine Ecology and Blue Economy",
  "Energy Efficiency and Green Shipping",
  "Transportation and Logistics",
  "Management of Marine Systems",
  "Port Economics, Management and Policy",
  "Nautical and Cruising Tourism",
  "Information Technologies in Shipping",
  "Marine Automation and Electronics",
  "Bleeding-Edge Technologies and Innovation",
  "Applied Mathematics and Programming",
  "Autonomous Vessels",
  "Maritime Robotics and Artificial Intelligence",
  "Maritime Law",
  "Maritime Healthcare",
  "Human Resources in Maritime Transport",
  "Maritime Education and Training",
  "Marine Defence",
];

const keynoteSpeakers = [
  { name: "[KEYNOTE SPEAKER 1]", org: "[Role, institution]", talk: "[Keynote talk title to be announced]" },
  { name: "[KEYNOTE SPEAKER 2]", org: "[Role, institution]", talk: "[Keynote talk title to be announced]" },
  { name: "[KEYNOTE SPEAKER 3]", org: "[Role, institution]", talk: "[Keynote talk title to be announced]" },
  { name: "[KEYNOTE SPEAKER 4]", org: "[Role, institution]", talk: "[Keynote talk title to be announced]" },
];

const dates = [
  { date: "Now", title: "Call for abstracts", badge: "Open" },
  { date: "[DATE]", title: "Abstract submission deadline" },
  { date: "[DATE]", title: "Notification of acceptance" },
  { date: "[DATE]", title: "Full paper submission" },
  { date: "[DATE]", title: "Early-bird registration closes" },
  { date: "[DATES] May 2027", title: "IMSC 2027 in Split", badge: "Conference", featured: true },
];

const pastEditions = [
  { label: "[PHOTO — plenary session, past edition]", tone: "pale", wide: true },
  { label: "[PHOTO — speaker at the podium]", tone: "mist" },
  { label: "[PHOTO — delegates on the Riva at dusk]", tone: "navy", wide: true },
  { label: "[PHOTO — poster session]", tone: "line" },
];

const partnerSlots = Array.from({ length: 12 });

const news = [
  {
    category: "Call for papers",
    date: "[DATE]",
    type: "Announcement",
    title: "Call for abstracts for IMSC 2027 is now open",
    summary: "[Short summary of the announcement, one or two lines.]",
    tone: "navy",
    lighthouse: true,
  },
  {
    category: "Keynotes",
    date: "[DATE]",
    type: "Programme",
    title: "[NEWS HEADLINE]",
    summary: "[Short summary of the story, one or two lines.]",
    tone: "pale",
  },
  {
    category: "Split",
    date: "[DATE]",
    type: "Travel",
    title: "[NEWS HEADLINE]",
    summary: "[Short summary of the story, one or two lines.]",
    tone: "mist",
  },
];

const faqs = [
  {
    q: "Who can submit a paper?",
    a: "Researchers, practitioners and PhD students. BSc and MSc students submit an abstract only, with their mentors listed as supervisors. Each author can be main author on at most two submissions.",
  },
  {
    q: "Where are accepted papers published?",
    a: "Accepted abstracts appear in the Book of Abstracts. Full papers (up to 4,000 words, in English) are internationally reviewed and published in the Book of Proceedings. Selected papers may be invited to Transactions on Maritime Science (TOMS), indexed in Web of Science ESCI.",
  },
  {
    q: "How do I register and pay?",
    a: "Create an IMSC account, register and pay online. Registration is final once the fee is paid. [Fees for 2027]",
  },
  {
    q: "Can I attend without presenting?",
    a: "Yes. One-day and accompanying-person registrations are available, and BSc and MSc students attend free with a student ID. [Fees for 2027]",
  },
];

function ImagePlaceholder({ label, tone = "pale", className = "", priority = false }) {
  return (
    <div className={`${styles.imagePlaceholder} ${styles[tone]} ${className}`}>
      <Image
        src="/images/imsc-placeholder.svg"
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 760px) 100vw, 70vw"
        className={styles.placeholderImage}
      />
      {label && <span className={styles.imageLabel}>{label}</span>}
    </div>
  );
}

function ArrowIcon({ direction = "right" }) {
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
      className={direction === "left" ? styles.arrowLeft : undefined}
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function Ticker() {
  const items = [
    "● Call for abstracts is open",
    "Abstract deadline [DATE]",
    "Split, Croatia · May 2027",
    "12th edition",
    "Hosted by the Faculty of Maritime Studies, University of Split",
    "Early-bird registration until [DATE]",
  ];

  return (
    <div className={styles.ticker} aria-label="Conference announcements">
      <div className={styles.tickerTrack} data-marquee>
        {[...items, ...items].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <section id="about" className={`${styles.section} ${styles.about}`}>
      <div className={styles.aboutIntro}>
        <div className={styles.sectionLabel}>(01) About IMSC</div>
        <div>
          <p className={styles.aboutLead} data-anim="reveal">For its 12th edition, IMSC brings researchers, engineers, seafarers and policy-makers to Split — to share the work shaping safer, cleaner and smarter seas.</p>
          <a className={styles.textLink} href="#tracks">Explore the conference topics <ArrowIcon /></a>
        </div>
      </div>
      <div className={styles.stats} data-anim="stagger">
        <div className={styles.stat}>
          <div className={styles.statNumber}>12<span>th</span></div>
          <div className={styles.statCaption}>edition of the conference</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNumber}>[00]</div>
          <div className={styles.statCaption}>countries represented</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNumber}>[000]</div>
          <div className={styles.statCaption}>papers in past proceedings</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNumber} data-count="20">20</div>
          <div className={styles.statCaption}>topics of interest</div>
        </div>
      </div>
    </section>
  );
}

function PastEditions() {
  return (
    <section id="past-editions" className={styles.pastSection} aria-label="Past editions" data-hscroll-section>
      <div className={styles.pastHeading}>
        <div className={styles.sectionLabel}>Eleven editions, in pictures</div>
        <div className={styles.mono}>Scroll sideways →</div>
      </div>
      <div className={styles.pastViewport}>
        <div className={styles.pastTrack} data-anim="hscroll">
          {pastEditions.map((edition) => (
            <ImagePlaceholder key={edition.label} label={edition.label} tone={edition.tone} className={`${styles.pastImage} ${edition.wide ? styles.pastImageWide : ""}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TopicsSection() {
  return (
    <section id="tracks" className={`${styles.section} ${styles.topics}`}>
      <div className={styles.sectionHeading}>
        <div>
          <div className={styles.sectionLabel}>(02) Topics</div>
          <h2 className={styles.sectionTitle} data-anim="split">Twenty topics. One sea.</h2>
          <p className={styles.subheading}>Main theme 2027: [MAIN THEME]</p>
        </div>
        <a className={styles.textLink} href="#dates">Read the call for papers</a>
      </div>
      <div className={styles.topicGrid} data-anim="stagger">
        {topics.map((topic, index) => (
          <a key={topic} className={styles.topicCard} href="#dates">
            <span className={styles.topicNumber}>{String(index + 1).padStart(2, "0")}</span>
            <span>{topic}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function KeyDates() {
  return (
    <section id="dates" className={`${styles.section} ${styles.dates}`}>
      <div className={styles.dateIntro}>
        <div className={styles.sectionLabel}>(04) Key dates</div>
        <h2 className={styles.sectionTitle} data-anim="split">Your road to Split.</h2>
        <p>Abstracts and full papers are submitted through your IMSC account. Registration and payment move fully online this year.</p>
      </div>
      <div className={styles.dateList} data-anim="stagger">
        {dates.map((date) => (
          <div key={date.title} className={`${styles.dateRow} ${date.featured ? styles.featuredDate : ""}`}>
            <div className={styles.dateWhen}>{date.date}</div>
            <div className={styles.dateTitle}>{date.title}</div>
            {date.badge ? <span className={`${styles.dateBadge} ${date.featured ? styles.conferenceBadge : ""}`}>{date.badge}</span> : <span />}
          </div>
        ))}
      </div>
    </section>
  );
}

function VenueSection() {
  return (
    <>
      <section id="venue" className={`${styles.section} ${styles.venueHeading}`}>
        <div className={styles.sectionLabel}>(05) Venue</div>
        <h2 className={styles.sectionTitle} data-anim="split">Seventeen centuries on the water.</h2>
      </section>
      <ImagePlaceholder
        label="[PHOTO — Split waterfront and Diocletian's Palace, full width]"
        tone="venue"
        className={styles.venueImage}
      />
      <section className={`${styles.section} ${styles.venueDetails}`}>
        <div className={styles.clockCard}>
          <div className={styles.clockLabel}>Split, right now</div>
          <time className={styles.splitTime} data-split-time>--:--</time>
          <div className={styles.clockZone}>Central European Time</div>
        </div>
        <div className={styles.venueCopy}>
          <p>The conference is held in Split, home of the Faculty of Maritime Studies — a port city built around Diocletian&apos;s Palace. [VENUE NAME AND ADDRESS]. Split Airport is 20 km from the city centre.</p>
          <a className={styles.textLink} href="#venue">Travel &amp; accommodation</a>
        </div>
      </section>
    </>
  );
}

function Partners() {
  return (
    <section className={styles.partners}>
      <div className={`${styles.sectionLabel} ${styles.partnerHeading}`}>In good company</div>
      <div className={styles.partnerViewport}>
        <div className={styles.partnerTrack} data-marquee data-marquee-slow>
          {[...partnerSlots, ...partnerSlots].map((_, index) => <div className={styles.partnerLogo} key={index}>[PARTNER LOGO]</div>)}
        </div>
      </div>
    </section>
  );
}

function NewsSection() {
  return (
    <section id="news" className={`${styles.section} ${styles.newsSection}`}>
      <div className={styles.sectionHeading}>
        <div>
          <div className={styles.sectionLabel}>(06) News</div>
          <h2 className={styles.sectionTitle} data-anim="split">From the harbour.</h2>
        </div>
        <a className={styles.outlineButton} href="#news">View all news</a>
      </div>
      <div className={styles.newsGrid} data-anim="stagger">
        {news.map((item) => (
          <a href="#news" className={styles.newsCard} key={item.category}>
            <div className={`${styles.newsImage} ${styles[item.tone]}`}>
              <Image
                src="/images/imsc-placeholder.svg"
                alt=""
                fill
                sizes="(max-width: 760px) 100vw, 33vw"
                className={styles.placeholderImage}
              />
              {item.lighthouse ? (
                <svg aria-hidden="true" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={styles.newsArtwork}>
                  <polygon points="330,80 -10,150 -10,230" fill="#B9E5FB" fillOpacity="0.35" />
                  <circle cx="334" cy="78" r="8" fill="#FFFFFF" />
                </svg>
              ) : <span className={styles.photoCaption}>[PHOTO]</span>}
              <span className={styles.newsCategory}>{item.category}</span>
            </div>
            <div className={styles.newsMeta}><span>{item.date}</span><span>{item.type}</span></div>
            <div className={styles.newsTitle}>{item.title}</div>
            <div className={styles.newsSummary}>{item.summary}</div>
          </a>
        ))}
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className={`${styles.section} ${styles.faqSection}`}>
      <div className={styles.faqIntro}>
        <div className={styles.sectionLabel}>(07) FAQ</div>
        <h2 className={styles.sectionTitle} data-anim="split">Good questions.</h2>
      </div>
      <FAQAccordion faqs={faqs} />
    </section>
  );
}

function ClosingCTA() {
  return (
    <section id="registration" className={styles.closingCta}>
      <svg aria-hidden="true" viewBox="0 0 1440 640" preserveAspectRatio="xMidYMid slice" className={styles.closingArtwork}>
        <defs>
          <linearGradient id="beam3" x1="1300" y1="120" x2="200" y2="420" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#B9E5FB" stopOpacity="0.45" /><stop offset="1" stopColor="#00AEEF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points="1300,120 -40,360 -40,640" fill="url(#beam3)" />
        <circle cx="1310" cy="114" r="16" fill="#FFFFFF" />
      </svg>
      <div className={styles.closingInner}>
        <h2 data-anim="split">If your research moves with the sea, we want to hear it.</h2>
        <div className={styles.closingButtons}>
          <a className={styles.primaryButton} href="#dates">Submit an abstract <ArrowIcon /></a>
          <a className={styles.lightOutlineButton} href="#registration">Register to attend</a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <HomeEffects>
      <main>
        <header className={styles.pageHeader}>
          <a href="#top" aria-label="IMSC 2027 home" className={styles.pageLogo}><Logo /></a>
          <nav className={styles.sectionNav} aria-label="On this page">
            {[
              ["01", "About", "#about"],
              ["02", "Topics", "#tracks"],
              ["03", "Keynotes", "#keynotes"],
              ["04", "Dates", "#dates"],
              ["05", "Venue", "#venue"],
              ["06", "News", "#news"],
              ["07", "FAQ", "#faq"],
            ].map(([number, label, href]) => <a href={href} key={number}><span>{number}</span> {label}</a>)}
          </nav>
          <a className={styles.registerButton} href="#registration">Register</a>
        </header>

        <section id="top" className={styles.hero}>
          <FlutedGlass className="absolute inset-0" flutes={12} spread={0.42} />
          <div className={styles.heroFade} aria-hidden="true" />
          <div className={styles.heroInner}>
            <div className={styles.abstractBadge}><span />Call for abstracts — open now</div>
            <div className={styles.heroContent}>
              <div className={styles.heroHeadline}>
                <div className={styles.eyebrow}>12th International Maritime Science Conference</div>
                <h1 data-anim="hero">Science &amp; the sea. <span>Without borders.</span></h1>
              </div>
              <div className={styles.heroAside}>
                <div className={styles.heroMeta}>[DATES] May 2027<br />Split, Croatia · [VENUE NAME]</div>
                <div className={styles.heroButtons}>
                  <a className={styles.primaryButton} href="#dates">Submit an abstract <ArrowIcon /></a>
                  <a className={styles.outlineButton} href="#registration">Reserve your seat</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Ticker />
        <AboutSection />
        <PastEditions />
        <TopicsSection />
        <KeynoteSlider speakers={keynoteSpeakers} />
        <KeyDates />
        <VenueSection />
        <Partners />
        <NewsSection />
        <FAQSection />
        <ClosingCTA />
      </main>
    </HomeEffects>
  );
}
