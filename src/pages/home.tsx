import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import slides from "@/data/slides.json";
import newsData from "@/data/newsdetail.json";
import logos from "@/data/logopartner.json";
import { FaPhoneAlt } from "react-icons/fa";

export default function HomePage() {
  //     {
  //       image: "/images/hero.png",
  //       title: "ดูแลสุขภาพคนทำงาน...",
  //       subtitle: "มากกว่าที่คิด",
  //       description:
  //         "แหล่งรวมข้อมูลสุขภาพจากวิชาการของกรมอนามัย เสริมสร้างสิ่งแวดล้อมที่ดีต่อการทำงาน",
  //     },
  //     {
  //       image: "/images/hero.png",
  //       title: "สร้างสิ่งแวดล้อมการทำงาน",
  //       subtitle: "ที่เอื้อต่อสุขภาพ",
  //       description: "ข้อมูลจากกรมอนามัยเพื่อองค์กรยุคใหม่",
  //     },
  //     {
  //       image: "/images/hero.png",
  //       title: "สร้างสิ่งแวดล้อมการทำงาน",
  //       subtitle: "ที่เอื้อต่อสุขภาพ",
  //       description: "ข้อมูลจากกรมอนามัยเพื่อองค์กรยุคใหม่",
  //     },
  //     {
  //       image: "/images/hero.png",
  //       title: "สร้างสิ่งแวดล้อมการทำงาน",
  //       subtitle: "ที่เอื้อต่อสุขภาพ",
  //       description: "ข้อมูลจากกรมอนามัยเพื่อองค์กรยุคใหม่",
  //     },
  //     {
  //       image: "/images/hero.png",
  //       title: "สร้างสิ่งแวดล้อมการทำงาน",
  //       subtitle: "ที่เอื้อต่อสุขภาพ",
  //       description: "ข้อมูลจากกรมอนามัยเพื่อองค์กรยุคใหม่",
  //     },
  //   ];

  return (
    <Layout>
      <div className="space-y-16 px-6 py-10 md:px-12 lg:px-24">
        {/* Hero Section */}
        <section className="relative z-10 h-[350px] sm:h-[450px] md:h-[500px] overflow-hidden rounded-bl-4xl rounded-br-4xl">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4000 }}
            loop
            pagination={{ clickable: true }}
            className="h-full z-10"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full w-full">
                  <Image
                    src={slide.image}
                    alt={`Slide ${index}`}
                    fill
                    className="object-cover scale-110 transform transition-transform duration-1000"
                  />
                  <div className="absolute left-4 sm:left-10 md:left-20 top-1/2 -translate-y-1/2 z-10 max-w-xs sm:max-w-md md:max-w-lg text-white">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal">
                      {slide.title}
                      <br />
                      {slide.subtitle}
                    </h1>
                    <p className="mt-3 sm:mt-4 text-lg sm:text-xl md:text-2xl text-gray-100">
                      {slide.description}
                    </p>
                  </div>
                  <div className="absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 z-10">
                    <Button
                      style={{
                        borderRadius: "12px",
                        border: "2px solid #0F5F4D",
                        backgroundColor: "#fff",
                        color: "#0F5F4D",
                      }}
                    >
                      ดูรายละเอียด
                    </Button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Project Intro Section */}
        <section className="grid gap-8 md:grid-cols-2 items-stretch px-4 md:px-8 lg:px-16">
          <div className="flex flex-col justify-between h-full">
            <div>
              <h2 className="font-medium text-xl sm:text-2xl mb-3 sm:mb-4">
                รู้จักโครงการ
              </h2>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F5F4D] leading-snug">
                โครงการส่งเสริมสุขภาวะ <br />
                ในสถานประกอบการเพื่อสร้าง <br />
                แรงงานสุขภาพดีอย่างยั่งยืน
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-700 leading-7">
                โครงการนี้พัฒนาโดย กรมอนามัย กระทรวงสาธารณสุข
                เพื่อเป็นเครื่องมือให้สถาน <br />
                ประกอบการสามารถ บริหารจัดการข้อมูลสุขภาพของพนักงานวัยทำงาน
                ได้อย่างมีระบบ เป็นปัจจุบัน และมีประสิทธิภาพ
              </p>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-700 leading-7">
                ครอบคลุมการส่งเสริมสุขภาพ การป้องกันโรค และการติดตามผลแบบ
                Dashboard <br />
                เพื่อพัฒนาองค์กรสู่การเป็น องค์กรสุขภาวะ (Healthy Workplace)
                อย่างแท้จริง
              </p>
            </div>
            <Button
              className="mt-4 w-fit self-start"
              style={{
                borderRadius: "12px",
                backgroundColor: "#0F5F4D",
                color: "#fff",
              }}
            >
              ข้อมูลโครงการ
            </Button>
          </div>
          <div className="flex items-center justify-center h-full">
            <Image
              src="/images/project.png"
              alt="Project Visual"
              width={600}
              height={400}
              className="rounded-lg max-w-full h-auto object-contain"
            />
          </div>
        </section>

        {/* News and Updates Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-[#0F5F4D]">
            สื่อประชาสัมพันธ์ล่าสุด
          </h2>
          <p className="text-base sm:text-lg mb-8 text-center text-black">
            ติดตามข้อมูลข่าวสาร บทความ
            และสื่อส่งเสริมสุขภาพวัยทำงานล่าสุดจากกรมอนามัย <br />
            เพื่อให้คุณและองค์กรก้าวทันทุกความเคลื่อนไหวด้านสุขภาวะ
          </p>
          <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-stretch justify-center">
            <div className="w-full lg:w-[596px] relative rounded-2xl overflow-hidden shadow-md h-[300px] sm:h-[400px] lg:h-[576px]">
              <Image
                src={newsData[0].image}
                alt="News 1"
                width={596}
                height={576}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-lg sm:text-xl mb-2 text-center line-clamp-2">
                  {newsData[0].title}
                </h3>
                <p className="text-white text-sm mb-4 text-center line-clamp-3 hidden lg:block">
                  {newsData[0].description}
                </p>
                <Button
                  variant="outline"
                  className="self-center text-white border-white bg-transparent hover:bg-white hover:text-black font-semibold border-2"
                >
                  อ่านต่อ {">"}
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-10 w-full max-w-[596px]">
              {[1, 2].map((index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row rounded-2xl overflow-hidden shadow-md bg-white"
                >
                  <div className="relative w-full sm:w-[268px] aspect-[4/3] sm:aspect-[1] shrink-0 overflow-hidden rounded-t-2xl sm:rounded-l-2xl rounded-r-none">
                    <Image
                      src={newsData[index].image}
                      alt={`News ${index}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg line-clamp-2">
                        {newsData[index].title}
                      </h3>
                      <p className="text-[#52525B] text-sm line-clamp-3">
                        {newsData[index].description}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="self-start bg-[#0F5F4D] text-white"
                    >
                      อ่านต่อ {">"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              className="self-start bg-[#0F5F4D] text-white"
            >
              สื่อประชาสัมพันธ์ทั้งหมด
            </Button>
          </div>
        </section>

        {/* Related Organizations */}
        <section className="mt-12 md:mt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-semibold text-[#0F5F4D] leading-snug md:leading-tight">
              ติดต่อหน่วยงาน <br className="hidden sm:block" />
              ที่เกี่ยวข้อง
            </h2>
            <div className="text-left md:text-right font-semibold">
              <div className="text-[#282828] text-base sm:text-lg">
                สายด่วนสุขภาพ
              </div>
              <div className="flex items-center md:justify-end gap-2">
                <div className="text-[#0F5F4D] rounded-full p-1">
                  <FaPhoneAlt size={24} className="sm:size-6 md:size-7" />
                </div>
                <span className="text-[#0F5F4D] text-xl sm:text-2xl md:text-4xl font-bold">
                  1669
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <Swiper
              slidesPerView={2}
              spaceBetween={12}
              loop={true}
              autoplay={{ delay: 2500 }}
              pagination={{ el: ".custom-swiper-pagination", clickable: true }}
              navigation={true}
              breakpoints={{
                480: { slidesPerView: 2, spaceBetween: 16 },
                640: { slidesPerView: 3, spaceBetween: 16 },
                768: { slidesPerView: 4, spaceBetween: 20 },
                1024: { slidesPerView: 5, spaceBetween: 24 },
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className="w-full"
            >
              {logos.map((logo, index) => (
                <SwiperSlide key={index} className="flex justify-center">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={160}
                    height={120}
                    className="w-32 sm:w-40 md:w-48 h-24 sm:h-28 md:h-32 object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="custom-swiper-pagination mt-4 flex justify-center" />
          </div>
        </section>
      </div>
    </Layout>
  );
}
