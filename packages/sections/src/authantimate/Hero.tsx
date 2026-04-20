import { useState } from "react";
import { motion } from "framer-motion";
import type { z } from "zod";
import type { heroSchema } from "./schema";

export type HeroProps = z.infer<typeof heroSchema>;

const Hero = ({
  kicker = "🔥 Certify Smarter, Not Harder",
  headline = "Digital Certificates Made",
  headlineHighlight = "Easy",
  description = "Say goodbye to manual processes! Authentimate simplifies creating, managing, and verifying digital certificates for individuals and organizations alike.",
  emailPlaceholder = "Enter your email address",
  ctaText = "Get Early Access",
  ctaHref = "#",
  trustNote = "Try for free no credit card required.",
  imageUrl = "/images/hero/hero-main.webp",
}: Partial<HeroProps>) => {
  const [email, setEmail] = useState("");

  return (
    <>
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
            <motion.div
              variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <h4 className="mb-4.5 text-lg font-medium text-black dark:text-white">
                {kicker}
              </h4>
              <h1 className="mb-5 pr-16 text-3xl font-bold text-black dark:text-white xl:text-hero ">
                {headline}{" "}
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark ">
                  {headlineHighlight}
                </span>
              </h1>
              <p>
                {description}
              </p>

              <div className="mt-10">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-wrap gap-5">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder={emailPlaceholder}
                      className="rounded-full border border-stroke px-6 py-2.5 shadow-solid-2 focus:border-primary focus:outline-none dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"
                    />
                    <a
                      href={ctaHref}
                      aria-label="get started button"
                      className="flex rounded-full bg-black px-7.5 py-2.5 text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
                    >
                      {ctaText}
                    </a>
                  </div>
                </form>

                <p className="mt-5 text-black dark:text-white">
                  {trustNote}
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right hidden md:w-1/2 lg:block"
            >
              <div className="relative 2xl:-mr-7.5">
                <img
                  src="/images/shape/shape-01.png"
                  alt="shape"
                  width={46}
                  height={246}
                  className="absolute -left-11.5 top-0"
                />
                <img
                  src="/images/shape/shape-02.svg"
                  alt="shape"
                  width={36.9}
                  height={36.7}
                  className="absolute bottom-0 right-0 z-10"
                />
                <img
                  src="/images/shape/shape-03.svg"
                  alt="shape"
                  width={21.64}
                  height={21.66}
                  className="absolute -right-6.5 bottom-0 z-1"
                />
                <div className=" relative aspect-[700/444] w-full">
                  {imageUrl ? (
                    <>
                      <img
                        className="shadow-solid-l dark:hidden h-full w-full rounded-xl object-cover"
                        src={imageUrl}
                        alt="Hero"
                      />
                      <img
                        className="hidden shadow-solid-l dark:block h-full w-full rounded-xl object-cover"
                        src={imageUrl}
                        alt="Hero"
                      />
                    </>
                  ) : (
                    <div className="h-full w-full rounded-xl bg-gradient-to-br from-[#EDF5FF] to-[#dde8ff] flex items-center justify-center">
                      <span className="text-[#757693] text-sm">Product Screenshot</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
