import { useRouter } from "next/router";
import relationsData from "@/data/relationsdetail.json";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";

const ITEMS_PER_PAGE = 6;

export default function NewsMapPage() {
  const router = useRouter();
  const { tag } = router.query;

  const filteredNews = useMemo(() => {
    return relationsData.filter((item) =>
      item.tags?.includes(tag as string)
    );
  }, [tag]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredNews.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredNews, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-8 space-y-8">
        <h1 className="text-2xl font-bold text-[#0F5F4D]">
          ข่าวที่มีแท็ก: {tag}
        </h1>

        {/* Grid & Pagination */}
        <div className="w-full space-y-8">
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-2 gap-y-8 justify-items-center w-full">
            {paginatedData.map((news, index) => (
              <div
                key={index}
                className="bg-white w-full max-w-[315px] h-[440px] rounded-2xl border border-gray-200 p-4 shadow hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                {/* รูปภาพ */}
                <div className="relative w-full h-[188px] rounded-xl overflow-hidden border border-gray-300">
                  <Image
                    src={
                      news.content && news.content.length > 0
                        ? news.content[0].image
                        : "/images/placeholder.png"
                    }
                    alt={news.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* เนื้อหา + ปุ่ม */}
                <div className="flex flex-col justify-between flex-1 pt-4">
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-[#1E293B] line-clamp-3">
                      {news.title}
                    </h2>
                    <p className="text-sm text-[#52525B] line-clamp-3">
                      {news.description}
                    </p>
                  </div>

                  <div className="pt-4">
                    <Link href={`/news/${news.id}`}>
                      <Button className="text-sm bg-[#0F5F4D] text-white hover:bg-[#0c4a3c]">
                        อ่านต่อ &gt;
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Pagination */}
          {pageCount > 1 && (
            <div className="flex justify-center space-x-2">
              {Array.from({ length: pageCount }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    currentPage === i + 1
                      ? "bg-[#0F5F4D] text-white"
                      : "bg-white text-[#0F5F4D] border-[#0F5F4D]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
