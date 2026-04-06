"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Testimonials.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const testimonials = [
  {
    name: "Amara Okonkwo",
    role: "Co-Founder, 4orthspace",
    avatar: "AO",
    accent: "#e8703a",
    rating: 5,
    text: "Ademola delivered outstanding work on our platform. His ability to translate complex requirements into a seamless user experience was impressive. The site performs beautifully and looks even better — truly exceeded expectations.",
  },
  {
    name: "Tunde Adeyemi",
    role: "Product Manager, School Master",
    avatar: "TA",
    accent: "#7eb8c9",
    rating: 5,
    text: "Working with Ademola was a pleasure from start to finish. He built our school management system with incredible attention to detail — every feature worked exactly as requested, delivered ahead of schedule.",
  },
  {
    name: "Chisom Eze",
    role: "CEO, Startup Lagos",
    avatar: "CE",
    accent: "#a3c4a8",
    rating: 5,
    text: "I've worked with several developers, but Ademola stands out. His fullstack expertise meant we only needed one person for what would have taken a team. Communication was excellent throughout the entire project.",
  },
];

export default function Testimonials() {
  const container = useRef(null);
  const [active, setActive] = useState(0);

  useGSAP(() => {
    gsap.fromTo(".testimonials-header",
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: container.current, start: "top 80%" },
      }
    );
    gsap.fromTo(".testimonial-card",
      { opacity: 0, y: 60, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: ".testimonial-grid", start: "top 80%" },
      }
    );
  }, { scope: container });

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  const featured = testimonials[active];

  return (
    <section className={styles.section} id="testimonials" ref={container}>
      <div className={styles.inner}>
        {/* Header */}
        <div className={`testimonials-header ${styles.header}`}>
          <span className={styles.tag}>// kind words</span>
          <h2 className={styles.title}>What Clients Say</h2>
          <p className={styles.subtitle}>
            Real feedback from people I&apos;ve had the privilege of working with.
          </p>
        </div>

        {/* Featured large card */}
        <div className={styles.featured}>
          <div className={styles.quoteIcon}>
            <Quote size={28} />
          </div>
          <div className={styles.stars}>
            {Array.from({ length: featured.rating }).map((_, i) => (
              <Star key={i} size={16} fill="var(--primary)" color="var(--primary)" />
            ))}
          </div>
          <p className={styles.featuredText}>&ldquo;{featured.text}&rdquo;</p>
          <div className={styles.featuredAuthor}>
            <div
              className={styles.avatar}
              style={{ background: featured.accent + "22", borderColor: featured.accent + "44", color: featured.accent }}
            >
              {featured.avatar}
            </div>
            <div>
              <p className={styles.authorName}>{featured.name}</p>
              <p className={styles.authorRole}>{featured.role}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className={styles.nav}>
            <button className={styles.navBtn} onClick={prev} aria-label="Previous">
              <ChevronLeft size={20} />
            </button>
            <div className={styles.dots}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
                  onClick={() => setActive(i)}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button className={styles.navBtn} onClick={next} aria-label="Next">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* All cards grid */}
        <div className={`testimonial-grid ${styles.grid}`}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`testimonial-card ${styles.card} ${i === active ? styles.cardActive : ""}`}
              onClick={() => setActive(i)}
              style={{ "--t-accent": t.accent }}
            >
              <div className={styles.cardTopRow}>
                <div
                  className={styles.cardAvatar}
                  style={{ background: t.accent + "22", color: t.accent, borderColor: t.accent + "55" }}
                >
                  {t.avatar}
                </div>
                <div className={styles.cardStars}>
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star key={si} size={12} fill={t.accent} color={t.accent} />
                  ))}
                </div>
              </div>
              <p className={styles.cardText}>&ldquo;{t.text.slice(0, 100)}…&rdquo;</p>
              <div className={styles.cardFooter}>
                <p className={styles.cardName}>{t.name}</p>
                <p className={styles.cardRole}>{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
