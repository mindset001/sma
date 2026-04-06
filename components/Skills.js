"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { Database, Server, Layout, Smartphone, Code, FileJson, Layers } from "lucide-react";
import styles from "./Skills.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const skillsData = [
  { name: "React", icon: <Layout size={32} /> },
  { name: "Next.js", icon: <Layers size={32} /> },
  { name: "React Native", icon: <Smartphone size={32} /> },
  { name: "NestJS", icon: <Server size={32} /> },
  { name: "Express", icon: <Code size={32} /> },
  { name: "MongoDB", icon: <Database size={32} /> },
  { name: "Postman", icon: <FileJson size={32} /> },
];

export default function Skills() {
  const container = useRef(null);
  
  useGSAP(() => {
    const cards = gsap.utils.toArray('.skill-card-gsap');
    
    let mm = gsap.matchMedia();

    // Desktop Animation
    mm.add("(min-width: 769px)", () => {
      gsap.fromTo(cards, 
        { 
          opacity: 0, 
          scale: 0,
          rotation: () => gsap.utils.random(-180, 180),
          x: () => gsap.utils.random(-400, 400),
          y: () => gsap.utils.random(-400, 400)
        },
        {
          opacity: 1, scale: 1, rotation: 0, x: 0, y: 0,
          duration: 1.5, ease: "elastic.out(1, 0.75)", stagger: 0.1,
          scrollTrigger: { trigger: container.current, start: "top 80%", end: "top 30%", scrub: 1 }
        }
      );
    });

    // Mobile Animation (Constrained)
    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(cards, 
        { 
          opacity: 0, 
          scale: 0,
          rotation: () => gsap.utils.random(-90, 90),
          x: () => gsap.utils.random(-100, 100),
          y: () => gsap.utils.random(-100, 100)
        },
        {
          opacity: 1, scale: 1, rotation: 0, x: 0, y: 0,
          duration: 1.5, ease: "elastic.out(1, 0.75)", stagger: 0.1,
          scrollTrigger: { trigger: container.current, start: "top 80%", end: "top 30%", scrub: 1 }
        }
      );
    });

    gsap.fromTo(".skills-header", 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, scrollTrigger: {
        trigger: container.current,
        start: "top 85%",
      }}
    );

  }, { scope: container });

  return (
    <section className={styles.skills} id="skills" ref={container}>
      <div className={`${styles.header} skills-header`}>
        <h2 className={styles.title}>
          My Tech Stack
        </h2>
        <p className={styles.subtitle}>
          Grab and throw the cards!
        </p>
      </div>

      <div className={styles.grid}>
        {skillsData.map((skill, index) => (
          <div key={index} className="skill-card-gsap">
            <motion.div 
              className={styles.skillCard}
              drag
              dragConstraints={container}
              whileDrag={{ scale: 1.1, zIndex: 10, cursor: "grabbing" }}
              dragElastic={0.2}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
              style={{ cursor: "grab" }}
            >
              <div className={styles.icon}>{skill.icon}</div>
              <p className={styles.skillName}>{skill.name}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
