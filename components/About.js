"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./About.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

function AnimatedCounter({ target, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = target / (duration * 60);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 1000 / 60);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function About() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".bento-card",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
      }
    );
  }, { scope: container });

  return (
    <section className={styles.about} id="bio" ref={container}>
      <div className={styles.container}>
        <div className={`bento-card ${styles.sectionLabel}`}>
          <span className={styles.tag}>// about</span>
          <h2 className={styles.title}>A Bit About Me</h2>
        </div>

        <div className={styles.bentoGrid}>
          {/* Main Bio Card */}
          <div className={`bento-card ${styles.card} ${styles.cardBio}`}>
            <div className={styles.cardGlow} />
            <p className={styles.cardTitle}>Who I Am</p>
            <p className={styles.bio}>
              I&apos;m a <span className={styles.highlight}>Fullstack Developer</span> driven by the thrill of building seamless digital experiences. Whether creating highly interactive frontends in React and Next.js, or architecting robust backends with NestJS — I focus on performance and high-level design aesthetics.
            </p>
            <p className={styles.bio} style={{ marginTop: '1rem' }}>
              I also extend web experiences into users&apos; pockets via <span className={styles.highlight}>React Native</span>, delivering smooth cross-platform mobile apps alongside powerful APIs.
            </p>
          </div>

          {/* Years of Experience */}
          <div className={`bento-card ${styles.card} ${styles.cardStat}`}>
            <div className={styles.cardGlow} style={{ background: 'var(--primary)' }} />
            <p className={styles.statNumber}>
              <AnimatedCounter target={3} />+
            </p>
            <p className={styles.statLabel}>Years of Experience</p>
          </div>

          {/* Projects Shipped */}
          <div className={`bento-card ${styles.card} ${styles.cardStat}`}>
            <div className={styles.cardGlow} style={{ background: 'var(--secondary)' }} />
            <p className={styles.statNumber}>
              <AnimatedCounter target={20} />+
            </p>
            <p className={styles.statLabel}>Projects Shipped</p>
          </div>

          {/* Contributions */}
          <div className={`bento-card ${styles.card} ${styles.cardStat}`}>
            <div className={styles.cardGlow} style={{ background: '#f59e0b' }} />
            <p className={styles.statNumber}>
              <AnimatedCounter target={500} />+
            </p>
            <p className={styles.statLabel}>GitHub Contributions</p>
          </div>

          {/* Open to Work */}
          <div className={`bento-card ${styles.card} ${styles.cardAvailable}`}>
            <div className={styles.cardGlow} style={{ background: '#22c55e' }} />
            <div className={styles.statusDot}>
              <span className={styles.pulse} />
            </div>
            <p className={styles.cardTitle}>Available for Work</p>
            <p className={styles.bioSmall}>Currently open to freelance projects and full-time roles.</p>
          </div>

          {/* Philosophy */}
          <div className={`bento-card ${styles.card} ${styles.cardPhilosophy}`}>
            <div className={styles.cardGlow} style={{ background: '#8b5cf6' }} />
            <p className={styles.cardTitle}>My Philosophy</p>
            <p className={styles.bioSmall}>
              &ldquo;Code is craft. Every line should be intentional, every interaction should feel magic.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
