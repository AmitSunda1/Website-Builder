import { motion } from "framer-motion";
import type { z } from "zod";
import type { ctaSchema } from "./schema";

export type CTAProps = z.infer<typeof ctaSchema>;

const CTA = ({
  heading = "Join Us Today and Transform Your Certificate Management",
  description = "Experience the power of digital certificates, secure verification, and seamless sharing. Get started now!",
  ctaText = "Join Now",
  ctaHref = "#",
  imageUrl = "",
}: Partial<CTAProps>) => {
  return (
    <>
      <section className="overflow-hidden px-4 py-20 md:px-8 lg:py-25 xl:py-30 2xl:px-0">
        <div className="mx-auto max-w-c-1390 rounded-lg bg-gradient-to-t from-[#F8F9FF] to-[#DEE7FF] px-7.5 py-12.5 dark:bg-blacksection dark:bg-gradient-to-t dark:from-transparent dark:to-transparent dark:stroke-strokedark md:px-12.5 xl:px-17.5 xl:py-0">
          <div className="flex flex-wrap gap-8 md:flex-nowrap md:items-center md:justify-between md:gap-0">
            {/* Left: Text */}
            <motion.div
              variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left md:w-[70%] lg:w-1/2"
            >
              <h2 className="mb-4 w-11/12 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle4">
                {heading}
              </h2>
              <p>{description}</p>
            </motion.div>

            {/* Right: Image + CTA */}
            <motion.div
              variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right lg:w-[45%]"
            >
              <div className="flex items-center justify-end xl:justify-between">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="CTA Banner"
                    className="hidden xl:block h-[299px] w-[299px] object-contain"
                  />
                ) : (
                  <div className="hidden xl:flex h-[299px] w-[299px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#c7dbff] to-[#EDF5FF]">
                    <span className="text-waterloo text-sm">Banner Image</span>
                  </div>
                )}
                <a
                  href={ctaHref}
                  className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white hover:opacity-90 dark:bg-white dark:text-black"
                >
                  {ctaText}
                  <svg width="20" height="20" viewBox="0 0 14 14" fill="currentColor">
                    <path d="M10.4767 6.16701L6.00668 1.69701L7.18501 0.518677L13.6667 7.00034L7.18501 13.482L6.00668 12.3037L10.4767 7.83368H0.333344V6.16701H10.4767Z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTA;
