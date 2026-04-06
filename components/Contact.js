"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Mail, Send } from "lucide-react";
import styles from "./Contact.module.css";

gsap.registerPlugin(useGSAP);

export default function Contact() {
  const container = useRef(null);
  const buttonRef = useRef(null);
  const wrapperRef = useRef(null);

  useGSAP(() => {
    // Reveal
    gsap.fromTo(wrapperRef.current,
      { opacity: 0, scale: 0.8, rotationX: 45 },
      {
        opacity: 1, scale: 1, rotationX: 0, duration: 1, ease: "back.out(1.2)", scrollTrigger: {
          trigger: container.current,
          start: "top 70%"
        }
      }
    );

    // Magnetic Button Effect
    const xTo = gsap.quickTo(buttonRef.current, "x", { duration: 0.4, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(buttonRef.current, "y", { duration: 0.4, ease: "elastic.out(1, 0.3)" });

    const mouseEnter = () => gsap.to(buttonRef.current, { scale: 1.1, duration: 0.3 });
    const mouseLeave = () => {
      gsap.to(buttonRef.current, { scale: 1, duration: 0.3 });
      xTo(0);
      yTo(0);
    };

    const mouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = buttonRef.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.4);
      yTo(y * 0.4);
    };

    buttonRef.current.addEventListener("mouseenter", mouseEnter);
    buttonRef.current.addEventListener("mouseleave", mouseLeave);
    buttonRef.current.addEventListener("mousemove", mouseMove);

    return () => {
      buttonRef.current?.removeEventListener("mouseenter", mouseEnter);
      buttonRef.current?.removeEventListener("mouseleave", mouseLeave);
      buttonRef.current?.removeEventListener("mousemove", mouseMove);
    };

  }, { scope: container });

  return (
    <section className={styles.contact} id="contact" ref={container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Get In Touch
        </h2>
        <p className={styles.subtitle}>
          Currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
      </div>

      <div className={styles.card} ref={wrapperRef}>
        <Mail size={48} color="var(--primary)" style={{ margin: "0 auto" }} />
        <a href="mailto:smademola01@gmail.com" className={styles.email}>
          smademola01@gmail.com
        </a>
        <button
          ref={buttonRef}
          className={styles.button}
          onClick={() => window.location.href = 'mailto:smademola01@gmail.com'}
        >
          Say Hello <Send size={16} />
        </button>
      </div>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Ademola. Built with Next.js, Framer Motion & GSAP.</p>
      </footer>
    </section>
  );
}
