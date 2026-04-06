"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Sync with global layout state initially
    const currentTheme = document.documentElement.getAttribute('data-theme') || "dark";
    setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.nav
      className={styles.navbar}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        SMA.
      </div>
      <div className={styles.links}>
        <a className={styles.navLink} onClick={() => scrollTo("about")}>About</a>
        <a className={styles.navLink} onClick={() => scrollTo("skills")}>Skills</a>
        <a className={styles.navLink} onClick={() => scrollTo("projects")}>Projects</a>
        <a className={styles.navLink} onClick={() => scrollTo("contact")}>Contact</a>
        <button className={styles.themeToggle} onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </motion.nav>
  );
}
