"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Terminal, Briefcase, MapPin } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./Hero.module.css";

gsap.registerPlugin(useGSAP);

const roles = [
  "Fullstack Developer",
  "React Specialist",
  "React Native Engineer",
  "Creative UI Builder",
];

export default function Hero() {
  const container = useRef(null);
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    let timer;
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      if (text === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        timer = setTimeout(() => setText(text.slice(0, -1)), 50);
      }
    } else {
      if (text === currentRole) {
        timer = setTimeout(() => setIsDeleting(true), 2200);
      } else {
        timer = setTimeout(() => setText(currentRole.slice(0, text.length + 1)), 120);
      }
    }
    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(`.${styles.badge}`,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", delay: 0.1 }
    )
      .fromTo(`.${styles.name}`,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.2"
      )
      .fromTo(`.${styles.roleWrapper}`,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(`.${styles.description}`,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      )
      .fromTo(`.${styles.meta}`,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.2"
      )
      .fromTo(`.${styles.cta}`,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.5)" },
        "-=0.1"
      )
      .fromTo(`.${styles.imageCol}`,
        { opacity: 0, x: 60, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: "power3.out" },
        "-=0.8"
      );
  }, { scope: container });

  return (
    <section className={styles.hero} id="about" ref={container}>
      {/* Ambient glow blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <div className={styles.layout}>
        {/* ——— LEFT: Text Content ——— */}
        <div className={styles.inner}>
          <span className={styles.badge}>
            <Terminal size={14} /> Portfolio
          </span>

          <h1 className={styles.name}>
            S.M Ademola<span className={styles.dot}>.</span>
          </h1>

          <div className={styles.roleWrapper}>
            <span className={styles.rolePill}>
              {text}
              <span className={styles.caret} />
            </span>
          </div>

          <p className={styles.description}>
            I build polished, high-performance products across the stack —
            from pixel-perfect UIs to scalable microservices.
          </p>

          <div className={styles.metaRow}>
            <span className={`${styles.meta} ${styles.metaChip}`}>
              <MapPin size={14} /> Osogbo, Nigeria
            </span>
            <span className={`${styles.meta} ${styles.metaChip}`}>
              <Briefcase size={14} /> Open to roles
            </span>
          </div>

          <div className={styles.cta}>
            <button
              className={styles.primaryBtn}
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View My Work <ArrowRight size={16} />
            </button>
            <a href="mailto:hello@example.com" className={styles.secondaryBtn}>
              Contact Me
            </a>
          </div>

          <p className={styles.codeLine}>
            <span className={styles.codeComment}>// always shipping, never settling</span>
          </p>
        </div>

        {/* ——— RIGHT: Profile Image ——— */}
        <div className={styles.imageCol}>
          <div className={styles.imageFrame}>
            {/* Decorative ring */}
            <div className={styles.imageRing} />
            {/* Glow blob behind image */}
            <div className={styles.imageGlow} />
            <Image
              src="/moshood.png"
              alt="S.M Ademola — Fullstack Developer"
              width={480}
              height={480}
              priority
              className={styles.profileImg}
            />
            {/* Floating badge */}
            <div className={styles.floatBadge}>
              <span className={styles.floatDot} />
              Available for work
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}