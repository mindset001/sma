"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Only enable on non-touch, pointer-device screens
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 769px)");
    setIsDesktop(mq.matches);

    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Restore body cursor on desktop, hide on mobile is handled by CSS
    document.body.style.cursor = "none";

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });
    const dotXTo = gsap.quickTo(dot, "x", { duration: 0.05, ease: "power3" });
    const dotYTo = gsap.quickTo(dot, "y", { duration: 0.05, ease: "power3" });

    const onMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      dotXTo(e.clientX);
      dotYTo(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);

    const interactiveElements = document.querySelectorAll("a, button, .skill-card-gsap");

    const onEnter = () => {
      gsap.to(cursor, { scale: 1.5, borderColor: "var(--secondary)", duration: 0.3 });
    };

    const onLeave = () => {
      gsap.to(cursor, { scale: 1, borderColor: "var(--primary)", duration: 0.3 });
    };

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [isDesktop]);

  // Don't render anything on touch/mobile devices
  if (!isDesktop) return null;

  return (
    <>
      <div className={styles.dot} ref={dotRef} />
      <div className={styles.cursor} ref={cursorRef} />
    </>
  );
}
