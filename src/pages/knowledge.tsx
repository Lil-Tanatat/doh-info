import { Layout } from "@/components/layout";
import Breadcrumb from "@/components/BreadCrumb";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import knowledgeData from "@/data/knowledgedetail.json";
import { IconChevronDown } from "@tabler/icons-react";

export default function KnowledgePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("หมวดหมู่ทั้งหมด");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;

  const categories = [
    "หมวดหมู่ทั้งหมด",
    "หลักสูตร (e-learning)",
    "เอกสาร/คู่มือ",
    "VDO",
  ];

  const filteredData = knowledgeData.filter((item) => {
    const matchSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchCategory =
      selectedCategory === "หมวดหมู่ทั้งหมด" ||
      item.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Layout>
      <div className="space-y-16 px-6 py-4 md:px-12 lg:px-24">
        {/* Hero Section */}
        <section className="relative h-[100px] sm:h-[150px] md:h-[400px] overflow-hidden rounded-bl-4xl rounded-br-4xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/relationshero.png')" }}
          />
        </section>
        <div className="-mt-6 px-4 md:px-8 lg:px-12">
          <Breadcrumb current="ข่าวประชาสัมพันธ์/กิจกรรม" />
        </div>
        {/* Header & Year Dropdown */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4 md:px-8 lg:px-12">
          <h2 className="text-4xl font-semibold text-[#0F5F4D]">คลังความรู้</h2>
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold whitespace-nowrap">ตัวกรอง :</p>
            <div className="relative w-[160px]">
              <select
                className="appearance-none w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5F4D]"
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                defaultValue="latest"
              >
                <option value="latest">ล่าสุด</option>
                <option value="oldest">เก่าสุด</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black">
                <IconChevronDown size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-12 px-4 md:px-8 lg:px-12">
          <aside className="w-full lg:w-[280px] space-y-6">
            <p className="font-semibold">ค้นหา :</p>
            <input
              type="text"
              placeholder="พิมพ์คำค้นหา"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F5F4D]"
            />

            {/*Category */}
            <div className="bg-white p-4 rounded-xl shadow space-y-6">
              <div>
                <h3 className="text-[#0F5F4D] font-semibold text-lg mb-2">
                  หมวดหมู่
                </h3>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentPage(1);
                    }}
                    className={`block text-left w-full text-sm ${
                      selectedCategory === cat
                        ? "text-[#0F5F4D] font-bold"
                        : "text-black"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Grid & Pagination */}
          <div className="w-full space-y-10">
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16 justify-items-center w-full">
              {paginatedData.map((knowledge, index) => (
                <div
                  key={index}
                  className="bg-white w-[315px] h-[440px] rounded-2xl border border-gray-200 p-4 shadow hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  {/* รูปภาพ */}
                  <div className="relative w-full h-[188px] rounded-xl overflow-hidden border border-gray-300">
                    <Image
                      src={
                        knowledge.content && knowledge.content.length > 0
                          ? knowledge.content[0].image
                          : "/images/placeholder.png"
                      }
                      alt={knowledge.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* เนื้อหา */}
                  <div className="flex flex-col flex-1 pt-4">
                    <div className="space-y-2">
                      <h2 className="text-lg font-semibold text-[#1E293B] line-clamp-3">
                        {knowledge.title}
                      </h2>
                      <p className="text-sm text-[#52525B] line-clamp-3">
                        {knowledge.description}
                      </p>
                    </div>

                    {/* ปุ่มอ่านต่อ */}
                    <div className="pt-4 mt-auto">
                      <Link href={`/course/${knowledge.id}`}>
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
            {totalPages > 1 && (
              <div className="flex justify-end">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-2 py-1 hover:underline disabled:opacity-50"
                  >
                    <span>&lt;</span> ก่อนหน้า
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      return (
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(currentPage - page) <= 1
                      );
                    })
                    .map((page, idx, arr) => {
                      const prevPage = arr[idx - 1];
                      if (prevPage && page - prevPage > 1) {
                        return (
                          <span key={`ellipsis-${page}`} className="px-2">
                            ...
                          </span>
                        );
                      }
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 rounded-md ${
                            currentPage === page
                              ? "bg-[#0F5F4D] text-white"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-2 py-1 hover:underline disabled:opacity-50"
                  >
                    ถัดไป <span>&gt;</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
