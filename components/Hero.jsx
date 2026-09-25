import { ArrowDownRight } from "lucide-react";

const HERO_IMAGE =
  "https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666664.jpg?w=1200";

export default function Hero() {
  return (
    <section className="container-fit py-8 sm:py-12">
      <div className="grid min-h-[560px] overflow-hidden rounded-2xl border border-zinc-700 bg-[#172126] lg:grid-cols-2">
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
          <p className="eyebrow">WORKOUT LIBRARY</p>

          <h1 className="display-font mt-6 max-w-2xl text-5xl font-bold uppercase leading-[0.94] tracking-tight text-white sm:text-6xl lg:text-7xl">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>

          <p className="mt-7 max-w-xl text-sm leading-7 text-zinc-300 sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
            today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="focus-ring mt-8 inline-flex w-fit items-center gap-3 rounded-lg bg-[#ccff00] px-5 py-3.5 text-xs font-black uppercase text-black transition hover:bg-[#b7e600]"
          >
            BROWSE WORKOUTS
            <ArrowDownRight size={17} />
          </a>
        </div>

        <div className="relative min-h-[360px] overflow-hidden border-t border-zinc-700 lg:min-h-0 lg:border-l lg:border-t-0">
          <img
            src="/images/banner.png"
            alt="Workout illustration"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
