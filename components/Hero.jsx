"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800">
      <div className="container">
        <div className="grid min-h-[650px] items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          
          {/* Left Content */}
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#ccff00]" />

              <span className="text-xs font-black tracking-[0.18em] text-[#ccff00]">
                WORKOUT LIBRARY
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
              TRAIN WITH
              <br />
              <span className="text-[#ccff00]">INTENT.</span>
              <br />
              LOG EVERY SET.
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
              FitLog is a dark, no-nonsense gym companion: pick a lift,
              lock it into today&apos;s plan, and watch the week&apos;s work
              add up.
            </p>

            {/* CTA */}
            <div className="mt-9">
              <Link
                href="#library"
                className="btn-accent group"
              >
                BROWSE WORKOUTS

                <ArrowRight
                  size={17}
                  strokeWidth={2.5}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Small Stats */}
            <div className="mt-12 flex flex-wrap gap-8 border-t border-zinc-800 pt-7">
              <div>
                <p className="text-2xl font-black text-white">12</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  Lifts
                </p>
              </div>

              <div>
                <p className="text-2xl font-black text-white">5</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  Daily Cap
                </p>
              </div>

              <div>
                <p className="text-2xl font-black text-white">7</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  Days
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
            {/* Decorative background */}
            <div className="absolute -inset-5 rounded-[30px] border border-[#ccff00]/10" />

            <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
              <div className="aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=85"
                  alt="Athlete training with weights in a gym"
                  className="h-full w-full object-cover"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* Image Label */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#ccff00]" />

                    <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#ccff00]">
                      TRAIN SMART
                    </span>
                  </div>

                  <p className="max-w-xs text-xl font-black uppercase leading-tight text-white sm:text-2xl">
                    Every rep counts.
                    <br />
                    Every set matters.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-5 -left-3 rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 shadow-2xl sm:-left-6">
              <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">
                YOUR WORK
              </p>

              <p className="mt-1 text-sm font-black text-[#ccff00]">
                LOG IT. BUILD IT.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}