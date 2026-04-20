import { motion } from "framer-motion";
import type { z } from "zod";
import type { aboutSchema } from "./schema";

export type AboutProps = z.infer<typeof aboutSchema>;

const About = ({
  badge = "New",
  badgeLabel = "SaaS Boilerplate for Next.js",
  heading = "A Complete Solution for",
  headingHighlight = "SaaS Startup",
  description = "We help builders ship polished digital experiences with consistency and speed, using composable sections and strict schemas.",
  items = [
    { number: "01", title: "React 18, Next.js 13 and TypeScript", description: "Production-oriented defaults." },
    { number: "02", title: "Fully Customizable", description: "Every prop is hydrated and fully editable." },
  ],
  imageUrl = "",
  section2Kicker = "Launch Your SaaS Fast",
  section2Heading = "Packed with All Essential",
  section2Highlight = "Integrations",
  section2Description = "Everything your product needs to go from zero to launch in record time with powerful pre-built modules.",
  ctaText = "Know More",
  ctaHref = "#",
  image2Url = "",
}: Partial<AboutProps>) => {
  return (
    <>
      {/* <!-- ===== About Start ===== --> */}
      <section className="overflow-hidden pb-20 lg:pb-25 xl:pb-30">
        <div className="mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
          <div className="flex items-center gap-8 lg:gap-32.5">
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left relative mx-auto hidden aspect-[588/526.5] md:block md:w-1/2"
            >
              {imageUrl ? (
                <>
                  <img
                    src={imageUrl}
                    alt="About"
                    className="dark:hidden h-full w-full object-contain"
                  />
                  <img
                    src={imageUrl}
                    alt="About"
                    className="hidden dark:block h-full w-full object-contain"
                  />
                </>
              ) : (
                <div className="h-full w-full rounded-2xl bg-gradient-to-br from-[#EDF5FF] to-[#c7dbff] flex items-center justify-center min-h-[300px]">
                  <span className="text-waterloo text-sm">About Image</span>
                </div>
              )}
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right md:w-1/2"
            >
              <span className="font-medium uppercase text-black dark:text-white">
                <span className="mb-4 mr-4 inline-flex rounded-full bg-meta px-4.5 py-1 text-metatitle uppercase text-white ">
                  {badge}
                </span>{" "}
                {badgeLabel}
              </span>
              <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                {heading}
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark">
                  {headingHighlight}
                </span>
              </h2>
              <p>{description}</p>

              {items.map((item, i) => (
                <div key={i} className="mt-7.5 flex items-center gap-5">
                  <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                    <p className="text-metatitle2 font-semibold text-black dark:text-white">
                      {item.number}
                    </p>
                  </div>
                  <div className="w-3/4">
                    <h3 className="mb-0.5 text-metatitle2 text-black dark:text-white">
                      {item.title}
                    </h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== About End ===== --> */}

      {/* <!-- ===== About Two Start ===== --> */}
      <section>
        <div className="mx-auto max-w-c-1235 overflow-hidden px-4 md:px-8 2xl:px-0">
          <div className="flex items-center gap-8 lg:gap-32.5">
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left md:w-1/2"
            >
              <h4 className="font-medium uppercase text-black dark:text-white">
                {section2Kicker}
              </h4>
              <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                {section2Heading}{" "}
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg2 dark:before:bg-titlebgdark">
                  {section2Highlight}
                </span>
              </h2>
              <p>
                {section2Description}
              </p>
              <div>
                <a
                  href={ctaHref}
                  className="group mt-7.5 inline-flex items-center gap-2.5 text-black hover:text-primary dark:text-white dark:hover:text-primary"
                >
                  <span className="duration-300 group-hover:pr-2">
                    {ctaText}
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="currentColor"
                  >
                    <path d="M10.4767 6.16701L6.00668 1.69701L7.18501 0.518677L13.6667 7.00034L7.18501 13.482L6.00668 12.3037L10.4767 7.83368H0.333344V6.16701H10.4767Z" />
                  </svg>
                </a>
              </div>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right relative mx-auto hidden aspect-[588/526.5] md:block md:w-1/2"
            >
              {image2Url ? (
                <>
                  <img
                    src={image2Url}
                    alt="About integrations"
                    className="dark:hidden h-full w-full object-contain"
                  />
                  <img
                    src={image2Url}
                    alt="About integrations"
                    className="hidden dark:block h-full w-full object-contain"
                  />
                </>
              ) : (
                <div className="h-full w-full rounded-2xl bg-gradient-to-br from-[#FFEAC2] to-[#ffe9a0] flex items-center justify-center min-h-[300px]">
                  <span className="text-waterloo text-sm">Integrations Image</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== About Two End ===== --> */}
    </>
  );
};

export default About;
