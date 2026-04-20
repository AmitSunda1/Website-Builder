import { motion } from "framer-motion";
import type { z } from "zod";
import type { brandsSchema } from "./schema";

export type BrandsProps = z.infer<typeof brandsSchema>;

const DEFAULT_LOGOS = [
  { name: "Google", imageUrl: "" },
  { name: "Microsoft", imageUrl: "" },
  { name: "LinkedIn", imageUrl: "" },
  { name: "Udemy", imageUrl: "" },
  { name: "Coursera", imageUrl: "" },
  { name: "HubSpot", imageUrl: "" },
];

const LogoPlaceholder = ({ name }: { name: string }) => (
  <div className="flex h-9 items-center justify-center">
    <span className="text-lg font-semibold text-[#B8B8C0] tracking-wide">{name}</span>
  </div>
);

const Brands = ({
  title,
  logos = DEFAULT_LOGOS,
}: Partial<BrandsProps>) => {
  return (
    <section className="border border-x-0 border-y-stroke bg-alabaster py-11 dark:border-y-strokedark dark:bg-black">
      <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        {title && (
          <p className="mb-6 text-center text-sm font-medium text-[#999AA1] uppercase tracking-widest">
            {title}
          </p>
        )}
        <div className="grid grid-cols-3 items-center justify-center gap-7.5 md:grid-cols-6 lg:gap-12.5 xl:gap-29">
          {logos.map((logo, i) => (
            <motion.a
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: i * 0.1 }}
              viewport={{ once: true }}
              href="#"
              key={i}
              className="animate_top mx-w-full relative block h-10 w-[98px]"
            >
              {logo.imageUrl ? (
                <>
                  <img
                    className="h-full w-full object-contain opacity-65 transition-all duration-300 hover:opacity-100 dark:hidden"
                    src={logo.imageUrl}
                    alt={logo.name || "Brand"}
                  />
                  <img
                    className="hidden h-full w-full object-contain opacity-50 transition-all duration-300 hover:opacity-100 dark:block"
                    src={logo.imageUrl}
                    alt={logo.name || "Brand"}
                  />
                </>
              ) : (
                <LogoPlaceholder name={logo.name} />
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
