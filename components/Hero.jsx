"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-card">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-line" />
              <span>WORKOUT LIBRARY</span>
            </div>

            <h1 className="hero-title">
              TRAIN WITH INTENT. LOG EVERY SET.
            </h1>

            <p className="hero-description">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <Link href="#library" className="hero-button">
              BROWSE WORKOUTS
              <ArrowRight size={17} strokeWidth={2.5} />
            </Link>
          </div>

          <div className="hero-image-wrap">
            <img
              src="/images/banner.png"
              alt="Workout illustration"
              className="hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
