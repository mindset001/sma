"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ExternalLink, Github, Layers } from "lucide-react";
import styles from "./Projects.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const projectsData = [
  {
    name: "School Master",
    description:
      "Simplify School Management in One Platform, From attendance tracking to parent communication, streamline every aspect of your school operations with our all-in-one management system.",
    tags: ["Next.js", "NestJS", "MongoDB", "Cloudinary"],
    live: "https://school-master-ruby.vercel.app/",
    github: "#",
    accent: "#8b5cf6",
    number: "01",
  },
  {
    name: "Social Connect App",
    description:
      "Cross-platform mobile application for connecting developers, featuring real-time chat, post sharing, and push notifications.",
    tags: ["React Native", "Express", "Socket.io", "PostgreSQL"],
    live: "#",
    github: "#",
    accent: "#06b6d4",
    number: "02",
  },
  {
    name: "Task Management Board",
    description:
      "Kanban-style project management tool with drag-and-drop functionality, team collaboration features, and deadline tracking.",
    tags: ["React", "Redux", "Node.js", "MongoDB"],
    live: "#",
    github: "#",
    accent: "#f59e0b",
    number: "03",
  },
];

export default function Projects() {
  const container = useRef(null);
  const [hovered, setHovered] = useState(null);

  useGSAP(() => {
    // Header reveal
    gsap.fromTo(".projects-header",
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: container.current, start: "top 80%" },
      }
    );

    // Cards stagger reveal
    gsap.fromTo(".project-card",
      { opacity: 0, y: 80 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.15,
        scrollTrigger: { trigger: ".projects-grid", start: "top 80%" },
      }
    );
  }, { scope: container });

  return (
    <section className={styles.projects} id="projects" ref={container}>
      <div className={styles.inner}>
        {/* Header */}
        <div className={`projects-header ${styles.header}`}>
          <span className={styles.tag}>// featured work</span>
          <h2 className={styles.title}>Projects</h2>
          <p className={styles.subtitle}>
            A selection of things I&apos;ve built across web and mobile.
          </p>
        </div>

        {/* Grid */}
        <div className={`projects-grid ${styles.grid}`}>
          {projectsData.map((project, index) => (
            <div
              key={index}
              className={`project-card ${styles.card}`}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              style={{
                "--accent": project.accent,
                boxShadow: hovered === index ? `0 20px 50px -15px ${project.accent}40` : "none",
              }}
            >
              {/* Top accent bar */}
              <div className={styles.accentBar} style={{ background: project.accent }} />

              {/* Number */}
              <span className={styles.number}>{project.number}</span>

              {/* Content */}
              <h3 className={styles.projectName}>{project.name}</h3>
              <p className={styles.projectDesc}>{project.description}</p>

              {/* Tags */}
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag2} style={{ color: project.accent, borderColor: `${project.accent}40` }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className={styles.links}>
                <a href={project.live} className={styles.link}>
                  <ExternalLink size={15} /> Live Demo
                </a>
                {/* <a href={project.github} className={styles.link}>
                  <Github size={15} /> Source
                </a> */}
              </div>

              {/* Background icon */}
              <Layers size={80} className={styles.bgIcon} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
