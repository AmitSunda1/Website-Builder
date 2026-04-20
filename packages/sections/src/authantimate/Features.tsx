import { motion } from "framer-motion";
import type { z } from "zod";
import type { featuresSchema } from "./schema";

export type FeaturesProps = z.infer<typeof featuresSchema>;

const Features = ({
  kicker = "SOLID FEATURES",
  title = "What Sets Us Apart",
  description = "From creation to verification, we've got you covered. Discover features designed for simplicity and success.",
  items = [
    {
      icon: "",
      title: "Bulk Issuance",
      description: "Streamline the process of issuing certificates and badges, especially when handling large quantities.",
    },
    {
      icon: "",
      title: "QR & URL Certificates",
      description: "Generate certificates with unique URLs and QR codes for easy verification and sharing.",
    },
    {
      icon: "",
      title: "Digital Locker Storage",
      description: "Store certificates securely in a digital locker for easy access and management.",
    },
    {
      icon: "",
      title: "Easy Sharing",
      description: "Enable recipients to share their certificates on social media and professional networks effortlessly.",
    },
    {
      icon: "",
      title: "Analytics & Tracking",
      description: "Gain insights into how and where credentials are being used, helping measure impact and reach.",
    },
  ],
}: Partial<FeaturesProps>) => {
  return (
    <>
      <section id="features" className="py-20 lg:py-25 xl:py-30">
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
              <span className="text-sectiontitle font-medium text-black dark:text-white">{kicker}</span>
            </div>
            <h2 className="mx-auto mb-4 text-3xl font-bold text-black dark:text-white md:w-4/5 xl:w-1/2 xl:text-sectiontitle3">
              {title}
            </h2>
            <p className="mx-auto md:w-4/5 lg:w-3/5 xl:w-[46%]">
              {description}
            </p>
          </motion.div>

          {/* Feature cards grid */}
          <div className="mt-12.5 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:mt-15 lg:grid-cols-3 xl:mt-20 xl:gap-12.5">
            {items.map((feature, key) => (
              <motion.div
                key={key}
                variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.5, delay: key * 0.1 }}
                viewport={{ once: true }}
                className="animate_top z-40 rounded-lg border border-white bg-white p-7.5 shadow-solid-3 transition-all hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark xl:p-12.5"
              >
                {/* Icon */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-[4px] bg-primary">
                  {feature.icon ? (
                    <img src={feature.icon} width={36} height={36} alt={feature.title} />
                  ) : (
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L22 14H30L24 20L26 28L18 23L10 28L12 20L6 14H14L18 6Z" fill="white" opacity="0.9" />
                    </svg>
                  )}
                </div>
                <h3 className="mb-5 mt-7.5 text-xl font-semibold text-black dark:text-white xl:text-itemtitle">
                  {feature.title}
                </h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
