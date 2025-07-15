// components/RelatedNewsSwiper.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import relationsData from "@/data/relationsdetail.json";

interface RelatedNewsSwiperProps {
  currentId: number;
  currentCategory: string;
}

export default function RelatedNewsSwiper({
  currentId,
  currentCategory,
}: RelatedNewsSwiperProps) {
  const relatedData = relationsData
    .filter(
      (item) => item.id !== currentId && item.category === currentCategory
    )
    .slice(0, 6);

  if (relatedData.length === 0) return null;

  return (
    <section className="max-w-screen-xl mx-auto px-4 md:px-12 py-16">
      <h2 className="text-center text-2xl md:text-4xl font-semibold text-[#0F5F4D] mb-8">
        ข่าวประชาสัมพันธ์/กิจกรรม ที่เกี่ยวข้อง
      </h2>

      <Swiper
        spaceBetween={24}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="custom-swiper bg-transparent"
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {relatedData.map((news) => (
          <SwiperSlide key={news.id}>
            <div className="bg-white w-full rounded-2xl border border-gray-200 p-4 shadow hover:shadow-lg transition-shadow duration-300 flex flex-col h-[460px]">
              <div className="relative w-full h-[188px] rounded-xl overflow-hidden border border-gray-300">
                <Image
                  src={news.content[0]?.image || "/fallback.jpg"}
                  alt={news.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="pt-4 space-y-2 flex-1 overflow-hidden">
                <h3 className="text-lg font-semibold text-[#1E293B] line-clamp-3">
                  {news.title}
                </h3>
                <p className="text-sm text-[#52525B] line-clamp-3">
                  {news.description}
                </p>
              </div>
              <div className="pt-2">
                <Link href={`/news/${news.id}`}>
                  <Button className="text-sm bg-[#0F5F4D] text-white hover:bg-[#0c4a3c]">
                    อ่านต่อ &gt;
                  </Button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
