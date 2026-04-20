import { motion } from "framer-motion";
import type { z } from "zod";
import type { pricingSchema } from "./schema";

export type PricingProps = z.infer<typeof pricingSchema>;

const Pricing = ({
  kicker = "PRICING PLANS",
  title = "Flexible Pricing",
  description = "We offer flexible pricing options tailored to your needs. Whether you're a small organization or a large enterprise, we have a plan that fits.",
  ctaText = "Contact Now",
  ctaHref = "#",
  plans = [
    {
      price: "$10",
      period: "/month",
      name: "Small Pack",
      description: "Perfect for individuals and small teams just getting started.",
      features: ["300 GB Storage", "Unlimited Photos and Videos", "Exclusive Support"],
      isPopular: false,
    },
    {
      price: "$59",
      period: "/month",
      name: "Medium Pack",
      description: "Great for growing organizations with higher certificate volumes.",
      features: ["300 GB Storage", "Unlimited Photos and Videos", "Exclusive Support", "Custom Branding Strategy"],
      isPopular: true,
    },
    {
      price: "$189",
      period: "/month",
      name: "Large Pack",
      description: "Enterprise-grade solution with all features unlocked.",
      features: ["300 GB Storage", "Unlimited Photos and Videos", "Exclusive Support", "Custom Branding Strategy"],
      isPopular: false,
    },
  ],
}: Partial<PricingProps>) => {
  return (
    <>
      <section className="overflow-hidden pb-20 pt-15 lg:pb-25 xl:pb-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          {/* Section Header */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_top mx-auto text-center"
          >
            <div className="mb-4 inline-block rounded-full bg-zumthor px-4.5 py-1.5 dark:border dark:border-strokedark dark:bg-blacksection">
              <span className="text-sectiontitle font-medium text-black dark:text-white">
                {kicker}
              </span>
            </div>
            <h2 className="mx-auto mb-4 text-3xl font-bold text-black dark:text-white md:w-4/5 xl:w-1/2 xl:text-sectiontitle3">
              {title}
            </h2>
            <p className="mx-auto md:w-4/5 lg:w-3/5 xl:w-[46%]">{description}</p>
          </motion.div>

          <div className="flex justify-center">
            <a
              href={ctaHref}
              className="mt-10 rounded-md bg-primary px-4 py-2 text-white"
            >
              {ctaText}
            </a>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="relative mx-auto mt-15 max-w-[1207px] px-4 md:px-8 xl:mt-20 xl:px-0">
          <div className="absolute -bottom-15 -z-1 h-full w-full">
            <img
              src="/images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-7.5 lg:flex-nowrap xl:gap-12.5">
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="animate_top group relative rounded-lg border border-stroke bg-white p-7.5 shadow-solid-10 dark:border-strokedark dark:bg-blacksection dark:shadow-none md:w-[45%] lg:w-1/3 xl:p-12.5"
              >
                {plan.isPopular && (
                  <div className="absolute -right-3.5 top-7.5 -rotate-90 rounded-bl-full rounded-tl-full bg-primary px-4.5 py-1.5 text-metatitle font-medium uppercase text-white">
                    popular
                  </div>
                )}

                <h3 className="mb-7.5 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle3">
                  {plan.price}{" "}
                  <span className="text-regular text-waterloo dark:text-manatee">{plan.period}</span>
                </h3>
                <h4 className="mb-2.5 text-para2 font-medium text-black dark:text-white">{plan.name}</h4>
                <p>{plan.description}</p>

                <div className="mt-9 border-t border-stroke pb-12.5 pt-9 dark:border-strokedark">
                  <ul>
                    {plan.features.map((feature, fi) => (
                      <li key={fi} className="mb-4 text-black last:mb-0 dark:text-manatee">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  aria-label="Get the Plan button"
                  className="group/btn inline-flex items-center gap-2.5 font-medium text-primary transition-all duration-300 dark:text-white dark:hover:text-primary"
                >
                  <span className="duration-300 group-hover/btn:pr-2">Get the Plan</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    <path d="M10.4767 6.16701L6.00668 1.69701L7.18501 0.518677L13.6667 7.00034L7.18501 13.482L6.00668 12.3037L10.4767 7.83368H0.333344V6.16701H10.4767Z" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
