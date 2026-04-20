import { useState } from "react";
import { motion } from "framer-motion";
import type { z } from "zod";
import type { faqSchema } from "./schema";

export type FAQProps = z.infer<typeof faqSchema>;

const FAQItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="flex flex-col border-b border-stroke last-of-type:border-none dark:border-strokedark">
      <button
        onClick={onClick}
        className="flex cursor-pointer items-center justify-between px-6 py-5 text-metatitle3 font-medium text-black dark:text-white lg:px-9 lg:py-7.5"
      >
        {question}

        {isOpen ? (
          <svg
            width="18"
            height="4"
            viewBox="0 0 18 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.1666 0.833374H10.1666H7.83331H0.833313V3.16671H7.83331H10.1666H17.1666V0.833374Z"
              fill="currentColor"
            />
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.83331 7.83337V0.833374H10.1666V7.83337H17.1666V10.1667H10.1666V17.1667H7.83331V10.1667H0.833313V7.83337H7.83331Z"
              fill="currentColor"
            />
          </svg>
        )}
      </button>
      <p
        className={`border-t border-stroke px-6 py-5 dark:border-strokedark lg:px-9 lg:py-7.5 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {answer}
      </p>
    </div>
  );
};

const FAQ = ({
  kicker = "OUR FAQS",
  heading = "Frequently Asked",
  headingHighlight = "Questions",
  ctaText = "Know More",
  ctaHref = "#",
  items = [
    {
      question: "How does the certificate issuance process work?",
      answer: "You can easily create and issue digital certificates in bulk by uploading participant details via an Excel sheet. Our AI automation generates and distributes certificates instantly.",
    },
    {
      question: "How can certificates be verified?",
      answer: "Users or third parties can scan the QR code on the certificate to instantly validate it via our secure web portal.",
    },
    {
      question: "Can certificates be shared on social media?",
      answer: "Yes, recipients can share their digital certificates on platforms like LinkedIn, Facebook, and Twitter.",
    },
  ],
}: Partial<FAQProps>) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  return (
    <>
      <section className="overflow-hidden pb-20 lg:pb-25 xl:pb-30">
        <div className="relative mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
          <div className="absolute -bottom-16 -z-1 h-full w-full">
            <img
              src="/images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden w-full h-full object-cover"
            />
            <img
              src="/images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="hidden dark:block w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-wrap gap-8 md:flex-nowrap md:items-center xl:gap-32.5">
            {/* Left: Heading + CTA */}
            <motion.div
              variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left md:w-2/5 lg:w-1/2"
            >
              <span className="font-medium uppercase text-black dark:text-white">{kicker}</span>
              <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                {heading}{" "}
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg2 dark:before:bg-titlebgdark">
                  {headingHighlight}
                </span>
              </h2>
              <a
                href={ctaHref}
                className="group mt-7.5 inline-flex items-center gap-2.5 text-black hover:text-primary dark:text-white dark:hover:text-primary"
              >
                <span className="duration-300 group-hover:pr-2">{ctaText}</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                  <path d="M10.4767 6.16701L6.00668 1.69701L7.18501 0.518677L13.6667 7.00034L7.18501 13.482L6.00668 12.3037L10.4767 7.83368H0.333344V6.16701H10.4767Z" />
                </svg>
              </a>
            </motion.div>

            {/* Right: Accordion */}
            <motion.div
              variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right md:w-3/5 lg:w-1/2"
            >
              <div className="rounded-lg bg-white shadow-solid-8 dark:border dark:border-strokedark dark:bg-blacksection">
                {items.map((faq, idx) => (
                  <FAQItem
                    key={idx}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={activeIdx === idx}
                    onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
