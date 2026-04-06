"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    
    let xTo = gsap.quickTo(cursor, "x", {duration: 0.2, ease: "power3"});
    let yTo = gsap.quickTo(cursor, "y", {duration: 0.2, ease: "power3"});
    let dotXTo = gsap.quickTo(dot, "x", {duration: 0.05, ease: "power3"});
    let dotYTo = gsap.quickTo(dot, "y", {duration: 0.05, ease: "power3"});

    const onMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      dotXTo(e.clientX);
      dotYTo(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);

    // Expand logic for links/buttons
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
      window.removeEventListener("mousemove", onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div className={styles.dot} ref={dotRef} />
      <div className={styles.cursor} ref={cursorRef} />
    </>
  );
}
