"use client";

import React, { useEffect, useState } from "react";
import HoverPlayCard from "@/components/ui/hover-play-card";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Nav scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Scroll reveal via IntersectionObserver
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navH = document.getElementById("nav")?.offsetHeight ?? 0;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - navH - 8,
      behavior: "smooth",
    });
    setMobileOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      (e.target as HTMLFormElement).reset();
    }, 3500);
  };

  return (
    <>
      {/* ── NAVIGATION ─────────────────────────────────────── */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
        <div className="nav__inner">
          <button
            onClick={() => scrollTo("hero")}
            className="nav__logo"
            aria-label="Go to top"
          >
            <span className="nav__logo-main">Chris Sebastian</span>
            <span className="nav__logo-sub">Media</span>
          </button>

          <button
            className="nav__toggle"
            id="navToggle"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>

          <ul className={`nav__links${mobileOpen ? " open" : ""}`}>
            {(["about", "services", "work", "contact"] as const).map((id) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={id === "contact" ? "nav__cta" : undefined}
                >
                  {id === "contact"
                    ? "Get In Touch"
                    : id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="hero" id="hero">
        {/*
          VIDEO BACKGROUND
          Drop your video file into the /public folder and update the src below.
          Example: if your file is public/hero.mp4, set src="/hero.mp4"
        */}
        <div className="hero__video-wrap">
          <video
            className="hero__video"
            autoPlay
            muted
            loop
            playsInline
            poster="/brand_assets/hero-poster.jpg"
          >
            <source src="/brand_assets/hero.mp4" type="video/mp4" />
          </video>
          <div className="hero__overlay" />
        </div>

        <div className="hero__content">
          <p className="hero__eyebrow">Stories Worth Telling</p>
          <h1 className="hero__title">
            Chris Sebastian
            <br />
            <em>Media</em>
          </h1>
          <p className="hero__tagline">
            Authentic storytelling. Cinematic vision. Curated for impact.
          </p>
          <div className="hero__actions">
            <button className="btn btn--primary" onClick={() => scrollTo("work")}>
              View Our Work
            </button>
            <button className="btn btn--ghost" onClick={() => scrollTo("contact")}>
              Start a Project
            </button>
          </div>
        </div>

        <button
          className="hero__scroll"
          onClick={() => scrollTo("about")}
          aria-label="Scroll down"
        >
          <span className="hero__scroll-label">Scroll</span>
          <div className="hero__scroll-line" />
        </button>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────── */}
      <section className="about section" id="about">
        <div className="container">
          <div className="about__grid">
            <div className="about__text reveal">
              <p className="section__eyebrow">Our Story</p>
              <h2 className="section__title">
                Crafted with
                <br />
                <em>Purpose &amp; Precision</em>
              </h2>
              <p className="about__body">
                Chris Sebastian Media is a full-service media production company
                built on a simple belief: every brand has a story that deserves
                to be told beautifully. We combine cinematic craft with strategic
                thinking to create content that doesn&apos;t just look good —
                it moves people.
              </p>
              <p className="about__body">
                From concept to final cut, we handle every detail with the kind
                of weathered expertise that only comes from years in the field.
              </p>
              <ul className="about__values">
                {["Authentic", "Experienced", "Curated Detail", "Sun-Drenched Vision"].map(
                  (v) => (
                    <li key={v}>
                      <span className="about__value-icon">◆</span> {v}
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="about__visual reveal">
              <div className="about__card about__card--1">
                <div className="about__card-inner">
                  <span className="about__stat">10+</span>
                  <span className="about__stat-label">Years of Experience</span>
                </div>
              </div>
              <div className="about__card about__card--2">
                <div className="about__card-inner">
                  <span className="about__stat">200+</span>
                  <span className="about__stat-label">Projects Delivered</span>
                </div>
              </div>
              <div className="about__card about__card--3">
                <div className="about__card-inner">
                  <span className="about__stat">50+</span>
                  <span className="about__stat-label">Brand Partners</span>
                </div>
              </div>
              <div className="about__ornament">
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
                  <path d="M100 5 L100 195 M5 100 L195 100" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                  <circle cx="100" cy="100" r="8" fill="currentColor" opacity="0.3" />
                  <path d="M100 60 L107 80 L128 80 L112 92 L118 112 L100 100 L82 112 L88 92 L72 80 L93 80 Z" fill="currentColor" opacity="0.6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────── */}
      <section className="services section section--dark" id="services">
        <div className="container">
          <div className="section__header section__header--center reveal">
            <p className="section__eyebrow section__eyebrow--light">What We Do</p>
            <h2 className="section__title section__title--light">
              Full-Service
              <br />
              <em>Media Production</em>
            </h2>
          </div>
          <div className="services__grid">
            {[
              {
                title: "Video Production",
                body: "Cinematic brand films, commercials, documentaries, and event coverage — shot and edited with intention.",
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="8" width="32" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M36 17l8-5v16l-8-5V17Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <line x1="4" y1="38" x2="44" y2="38" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="16" y1="32" x2="16" y2="38" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="28" y1="32" x2="28" y2="38" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                ),
              },
              {
                title: "Digital Content",
                body: "Social media content, reels, and digital campaigns designed to captivate audiences across every platform.",
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="20" r="10" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M24 10 C24 10 20 14 20 20 C20 26 24 30 24 30 C24 30 28 26 28 20 C28 14 24 10 24 10Z" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="14" y1="20" x2="34" y2="20" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 36 C12 32 16 30 24 30 C32 30 36 32 40 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                title: "Brand Storytelling",
                body: "We go beyond aesthetics — helping you define and communicate a brand narrative that builds genuine connection.",
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 38 L8 18 L24 8 L40 18 L40 38 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <rect x="18" y="26" width="12" height="12" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="14" y="18" width="8" height="8" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="26" y="18" width="8" height="8" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                ),
              },
              {
                title: "Event Coverage",
                body: "Live events, launches, and conferences captured with a documentary eye and broadcast-quality production value.",
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M24 16 L24 24 L32 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18 8 L20 4 M30 8 L28 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M40 18 L44 16 M40 30 L44 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                title: "Photography",
                body: "Commercial and editorial photography with a distinctive aesthetic — sun-drenched, authentic, and detail-obsessed.",
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="12" width="36" height="26" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M6 20 L42 20" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="12" cy="16" r="2" fill="currentColor" />
                    <circle cx="19" cy="16" r="2" fill="currentColor" />
                    <path d="M14 30 L22 26 L28 30 L36 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                title: "Post-Production",
                body: "Color grading, motion graphics, sound design, and editing that elevates raw footage into polished, broadcast-ready content.",
                icon: (
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 6 L6 16 L6 32 L24 42 L42 32 L42 16 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M24 6 L24 42 M6 16 L42 16 M6 32 L42 32" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
                  </svg>
                ),
              },
            ].map((service) => (
              <div className="service-card reveal" key={service.title}>
                <div className="service-card__icon">{service.icon}</div>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__body">{service.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK ───────────────────────────────────────────── */}
      <section className="work section" id="work">
        <div className="container">
          <div className="section__header reveal">
            <p className="section__eyebrow">Selected Work</p>
            <h2 className="section__title">
              Recent
              <br />
              <em>Projects</em>
            </h2>
          </div>
          <div className="work__grid">

            {/* Large featured item — HoverPlayCard */}
            <div className="work-item work-item--large reveal">
              <HoverPlayCard
                {/*
                  Replace src with your own video path, e.g. "/videos/showreel.mp4"
                  Files go in the /public folder: public/videos/showreel.mp4
                */}
                src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4"
                poster="https://images.unsplash.com/photo-1536240478700-b869ad10a2ab?w=1200&q=80"
                loop
                className="w-full rounded-none"
              />
              <div className="work-item__info" style={{ opacity: 1, transform: "none" }}>
                <span className="work-item__category">Brand Film</span>
                <h3 className="work-item__title">Your Showreel</h3>
              </div>
            </div>

            {/* Regular items — replace placeholders with HoverPlayCard or <img> */}
            {[
              { category: "Commercial", title: "Project Title Here" },
              { category: "Documentary", title: "Project Title Here" },
              { category: "Event", title: "Project Title Here" },
              { category: "Photography", title: "Project Title Here" },
            ].map((item) => (
              <div className="work-item reveal" key={item.category + item.title}>
                <div className="work-item__media work-item__media--placeholder">
                  <span className="work-item__placeholder-text">Project Visual</span>
                </div>
                <div className="work-item__info">
                  <span className="work-item__category">{item.category}</span>
                  <h3 className="work-item__title">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ────────────────────────────────────────── */}
      <section className="marquee-section">
        <div className="marquee">
          <div className="marquee__track">
            {[
              "Video Production",
              "Brand Storytelling",
              "Digital Content",
              "Photography",
              "Event Coverage",
              "Post-Production",
              "Video Production",
              "Brand Storytelling",
              "Digital Content",
              "Photography",
              "Event Coverage",
              "Post-Production",
            ].map((item, i) => (
              <React.Fragment key={i}>
                <span>{item}</span>
                <span className="marquee__sep">◆</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────── */}
      <section className="contact section section--cream" id="contact">
        <div className="container">
          <div className="contact__grid">
            <div className="contact__text reveal">
              <p className="section__eyebrow">Let&apos;s Create Together</p>
              <h2 className="section__title">
                Start Your
                <br />
                <em>Next Project</em>
              </h2>
              <p className="contact__body">
                Whether you have a fully formed brief or just a spark of an
                idea, we&apos;d love to hear about it. Great work starts with a
                conversation.
              </p>
              <div className="contact__details">
                <div className="contact__detail">
                  <span className="contact__detail-label">Email</span>
                  <a
                    href="mailto:hello@chrissebastianmedia.com"
                    className="contact__detail-value"
                  >
                    hello@chrissebastianmedia.com
                  </a>
                </div>
                <div className="contact__detail">
                  <span className="contact__detail-label">Based In</span>
                  <span className="contact__detail-value">
                    Available Worldwide
                  </span>
                </div>
              </div>
            </div>

            <form className="contact__form reveal" onSubmit={handleSubmit}>
              <div className="form__group">
                <label className="form__label" htmlFor="name">
                  Your Name
                </label>
                <input
                  className="form__input"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Full name"
                  required
                />
              </div>
              <div className="form__group">
                <label className="form__label" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="form__input"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="form__group">
                <label className="form__label" htmlFor="project">
                  Project Type
                </label>
                <select
                  className="form__input form__select"
                  id="project"
                  name="project"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {[
                    ["video", "Video Production"],
                    ["digital", "Digital Content"],
                    ["brand", "Brand Storytelling"],
                    ["event", "Event Coverage"],
                    ["photo", "Photography"],
                    ["post", "Post-Production"],
                    ["other", "Other"],
                  ].map(([val, label]) => (
                    <option key={val} value={val}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form__group">
                <label className="form__label" htmlFor="message">
                  Tell Us About Your Project
                </label>
                <textarea
                  className="form__input form__textarea"
                  id="message"
                  name="message"
                  placeholder="Brief overview of your project, timeline, and goals..."
                  rows={5}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn--primary btn--full"
                disabled={formSubmitted}
                style={
                  formSubmitted
                    ? { background: "var(--navy)", borderColor: "var(--navy)", color: "#fff" }
                    : undefined
                }
              >
                {formSubmitted ? "Message Sent!" : "Send Enquiry"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="footer">
        <div className="container">
          <div className="footer__inner">
            <div className="footer__brand">
              <p className="footer__logo-main">Chris Sebastian</p>
              <p className="footer__logo-sub">Media</p>
              <p className="footer__tagline">
                Authentic storytelling. Cinematic vision.
              </p>
            </div>
            <nav className="footer__nav">
              <ul>
                {(["about", "services", "work", "contact"] as const).map(
                  (id) => (
                    <li key={id}>
                      <button onClick={() => scrollTo(id)}>
                        {id.charAt(0).toUpperCase() + id.slice(1)}
                      </button>
                    </li>
                  ),
                )}
              </ul>
            </nav>
            <div className="footer__social">
              {[
                {
                  label: "Instagram",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                    </svg>
                  ),
                },
                {
                  label: "Vimeo",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 7c-.4 4-3 8-7.5 12C10 23 7 21 5.5 17l-1.5-5C3 9 2 8 1 8" strokeLinecap="round" />
                      <path d="M15 8c2 0 3 1.5 3 3.5 0 3-2 6-5 6" strokeLinecap="round" />
                    </svg>
                  ),
                },
                {
                  label: "LinkedIn",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  ),
                },
              ].map(({ label, icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="footer__social-link"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
          <div className="footer__bottom">
            <p>&copy; 2026 Chris Sebastian Media. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
