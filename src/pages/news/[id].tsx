import { useRouter } from "next/router";
import relationsData from "@/data/relationsdetail.json";
import Image from "next/image";
import { Layout } from "@/components/layout";
import Breadcrumb from "@/components/BreadCrumb";
import { Facebook, Instagram, Youtube, X } from "lucide-react";
import RelatedNewsSwiper from "@/components/RelatedNewsSwiper";

export default function NewsDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const newsItem = relationsData.find((item) => item.id.toString() === id);

  if (!newsItem) {
    return <p className="text-center mt-20">ไม่พบข้อมูลข่าว</p>;
  }

  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto py-8 px-4 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
        {/* ASIDE */}
        <aside className="md:col-span-1 space-y-4 text-sm text-[#282828] md:bg-transparent rounded-xl p-4 md:p-0">
          <div>
            <p className="font-semibold">วันที่</p>
            <p>🕒 {newsItem.date}</p>
          </div>
          <div>
            <p className="font-semibold">ภูมิภาค</p>
            <span className="inline-block bg-[#7AC4C5] rounded-full px-3 py-1 text-xs mt-1">
              {newsItem.region}
            </span>
          </div>
          <div>
            <p className="font-semibold">หมวดหมู่</p>
            <span className="inline-block bg-[#7AC4C5] rounded-full px-3 py-1 text-xs mt-1">
              {newsItem.category}
            </span>
          </div>
          <div>
            <p className="font-semibold">ยอดผู้เข้าชม</p>
            <p>👁️ {newsItem.views} ครั้ง</p>
          </div>
          <hr />
          <div>
            <p className="font-semibold">แชร์</p>
            <div className="flex space-x-3">
              <div className="bg-black rounded-full p-2">
                <X className="text-white w-5 h-5" />
              </div>
              <div className="bg-black rounded-full p-2">
                <Facebook className="text-white w-5 h-5" />
              </div>
              <div className="bg-black rounded-full p-2">
                <Instagram className="text-white w-5 h-5" />
              </div>
              <div className="bg-black rounded-full p-2">
                <Youtube className="text-white w-5 h-5" />
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="md:col-span-3 space-y-6 md:space-y-8">
          <h1 className="text-2xl md:text-3xl font-bold leading-tight">
            {newsItem.title}
          </h1>

          {newsItem.content?.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <div className="flex justify-center">
                <Image
                  src={section.image}
                  alt={`image-${idx}`}
                  width={800}
                  height={620}
                  className="rounded-xl object-cover max-h-[500px] w-full max-w-full h-auto"
                />
              </div>

              {idx === 0 && (
                <div className="space-y-2 pt-4 md:pt-6">
                  <Breadcrumb
                    paths={[
                      { label: "ข่าวและประชาสัมพันธ์", href: "/relations" },
                    ]}
                    current={newsItem.title}
                  />
                </div>
              )}

              <div
                className="text-[#282828] text-sm md:text-base leading-7 whitespace-pre-line py-2 md:py-4"
                dangerouslySetInnerHTML={{ __html: section.text }}
              />
              {idx === 1 && section.motto && (
                <p className="text-center font-semibold text-lg md:text-2xl bg-[#7AC4C5] px-4 md:px-8 py-4 md:py-8 border rounded-2xl">
                  {section.motto}
                </p>
              )}
            </div>
          ))}
          {newsItem.tags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() =>
                router.push(`/news/map?tag=${encodeURIComponent(tag)}`)
              }
              className="inline-block bg-[#BEF0F1] text-black text-xs md:text-sm font-medium rounded-full px-3 py-1 hover:bg-[#a3e1e2] transition mr-2"
            >
              {tag}
            </button>
          ))}
        </main>
      </div>

      <hr className="max-w-screen-xl mx-auto my-6 md:my-8" />

      <RelatedNewsSwiper
        currentId={newsItem.id}
        currentCategory={newsItem.category}
      />
    </Layout>
  );
}
