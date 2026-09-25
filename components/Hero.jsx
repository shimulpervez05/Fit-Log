"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#E7E5F2]">
      <div className="container">
        <div className="grid min-h-[650px] items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          
          {/* Left Content */}
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#6D5DFB]" />

              <span className="text-xs font-black tracking-[0.18em] text-[#6D5DFB]">
                WORKOUT LIBRARY
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
              TRAIN WITH
              <br />
              <span className="text-[#6D5DFB]">INTENT.</span>
              <br />
              LOG EVERY SET.
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-xl text-base leading-7 text-[#55556B] sm:text-lg">
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
            <div className="mt-12 flex flex-wrap gap-8 border-t border-[#E7E5F2] pt-7">
              <div>
                <p className="text-2xl font-black text-white">12</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#6B6B80]">
                  Lifts
                </p>
              </div>

              <div>
                <p className="text-2xl font-black text-white">5</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#6B6B80]">
                  Daily Cap
                </p>
              </div>

              <div>
                <p className="text-2xl font-black text-white">7</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#6B6B80]">
                  Days
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
            {/* Decorative background */}
            <div className="absolute -inset-5 rounded-[30px] border border-[#6D5DFB]/10" />

            <div className="relative overflow-hidden rounded-2xl border border-[#E7E5F2] bg-[#F8F7FF]">
              <div className="aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5]">
                <img
                  src= "/images/banner.png"
                  alt="Athlete training with weights in a gym"
                  className="h-full w-full object-cover"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* Image Label */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#6D5DFB]" />

                    <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#6D5DFB]">
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
            <div className="absolute -bottom-5 -left-3 rounded-xl border border-[#D8D5EC] bg-white px-4 py-3 shadow-2xl sm:-left-6">
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#6B6B80]">
                YOUR WORK
              </p>

              <p className="mt-1 text-sm font-black text-[#6D5DFB]">
                LOG IT. BUILD IT.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}