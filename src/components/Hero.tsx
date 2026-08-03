import type { JSX } from "react";
import { assets } from "../assets/assets";
import { AnimatedBorderButton } from "./AnimatedBorderButton";

const Hero = (): JSX.Element => {
  return (
    <section className="pt-32 pb-8 sm:pb-16 px-4 sm:px-8 max-w-5xl mx-auto text-center">
      <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 mb-6">
        <assets.GraduationCap className="size-4" />
        12 Practical Courses, One Platform
      </span>

      <h1 className="text-3xl sm:text-5xl font-bold text-base-content leading-tight font-header">
        Learn Real Skills.
        <br />
        <span className="text-primary font-sans">Build Real Income.</span>
      </h1>

      <p className="mt-6 text-base-content/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
        DigitalHub brings together everything you need to register a business,
        build an online income, and grow with confidence — from CAC registration
        and web development to forex, AI automation, and digital products. No
        beating around the bush, just clear, step-by-step guides built to get
        you results.
      </p>

      <div className="mt-8 flex items-center justify-center gap-8">
        <a href="#courses">
          <AnimatedBorderButton>Get Started</AnimatedBorderButton>
        </a>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-sm text-base-content/70">
        <div className="flex items-center gap-2">
          <assets.ShieldCheck className="size-4 text-primary" />
          Step-by-step, beginner-friendly
        </div>
        <div className="flex items-center gap-2">
          <assets.Users className="size-4 text-primary" />
          Built from real, practical experience
        </div>
        <div className="flex items-center gap-2">
          <assets.GraduationCap className="size-4 text-primary" />
          12 courses, one payment
        </div>
      </div>
    </section>
  );
};

export default Hero;
