import { motion } from "framer-motion";
import type { z } from "zod";
import type { testimonialSchema } from "./schema";

export type TestimonialProps = z.infer<typeof testimonialSchema>;

// @ts-ignore
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

const SingleTestimonial = ({ review }: { review: { name: string; designation: string; avatar: string; content: string } }) => {
  const { name, designation, avatar, content } = review;
  return (
    <div className="rounded-lg bg-white p-9 pt-7.5 shadow-solid-9 dark:border dark:border-strokedark dark:bg-blacksection dark:shadow-none">
      <div className="mb-7.5 flex justify-between border-b border-stroke pb-6 dark:border-strokedark">
        <div>
          <h3 className="mb-1.5 text-metatitle3 text-black dark:text-white">
            {name}
          </h3>
          <p>{designation}</p>
        </div>
        {avatar ? (
          <img width={60} height={50} src={avatar} alt={name} />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold text-lg">
            {name.charAt(0)}
          </div>
        )}
      </div>

      <p>{content}</p>
    </div>
  );
};

const Testimonial = ({
  kicker = "TESTIMONIALS",
  title = "Client's Testimonials",
  description = "Hear from those who've experienced the benefits of our solutions.",
  items = [
    {
      name: "Dr P.K. Singh",
      designation: "Dean CTAE Udaipur",
      avatar: "",
      content: "Authentimate has streamlined our certificate issuance at our Tech Fest with secure verification. It's efficient, reliable, and easy to use. Highly recommended!",
    },
    {
      name: "Anuj Kanwar",
      designation: "Founder Schoolsharks",
      avatar: "",
      content: "Authentimate has greatly enhanced our certificate management for Games and Learning events. Its verification ensures authenticity, while the ease of issuing certificates saves time.",
    },
    {
      name: "Sourabh Goyal",
      designation: "Founder SuccessBrew",
      avatar: "",
      content: "Authentimate has transformed how we issue and verify certificates for our freelance learning courses. The ease of distribution and security make it a reliable solution.",
    },
    {
      name: "Dillesh Kumar",
      designation: "Founder CareerGeek",
      avatar: "",
      content: "Authentimate has simplified the process of issuing certificates for our GRE course students. It's fast, secure, and makes sharing certificates effortless.",
    },
  ],
}: Partial<TestimonialProps>) => {
  return (
    <>
      <section>
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
        </div>

        <motion.div
          variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1, delay: 0.1 }}
          viewport={{ once: true }}
          className="animate_top mx-auto mt-15 max-w-c-1235 px-4 md:px-8 xl:mt-20 xl:px-0"
        >
          {/* Slider main container */}
          <div className="swiper testimonial-01 mb-20 pb-22.5">
            <Swiper
              spaceBetween={50}
              slidesPerView={2}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
              }}
            >
              {items.map((review, idx) => (
                <SwiperSlide key={idx}>
                  <SingleTestimonial review={review} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Testimonial;
