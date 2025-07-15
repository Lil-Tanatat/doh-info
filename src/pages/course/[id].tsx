import { useRouter } from "next/router";
import knowledgeData from "@/data/knowledgedetail.json";
import Image from "next/image";
import { Layout } from "@/components/layout";
import Breadcrumb from "@/components/BreadCrumb";
import { Facebook, Instagram, Youtube, X } from "lucide-react";
import { FileText, FileDown, FileDigit } from "lucide-react";
import RelatedCourseSwiper from "@/components/RelatedCourseSwiper";

export default function KnowledgeDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const knowledge = knowledgeData.find((item) => item.id.toString() === id);

  if (!knowledge) {
    return <p className="text-center mt-20">ไม่พบข้อมูล</p>;
  }

  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto py-8 px-4 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
        {/* ASIDE */}
        <aside className="md:col-span-1 space-y-4 text-sm text-[#282828] md:bg-transparent rounded-xl p-4 md:p-0">
          <div>
            <p className="font-semibold">วันที่</p>
            <p>🕒 {knowledge.date}</p>
          </div>
          <div>
            <p className="font-semibold">หมวดหมู่</p>
            <span className="inline-block bg-[#7AC4C5] rounded-full px-3 py-1 text-xs mt-1">
              {knowledge.category}
            </span>
          </div>
          <div>
            <p className="font-semibold">ยอดผู้เข้าชม</p>
            <p>👁️ {knowledge.views} ครั้ง</p>
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
            {knowledge.title}
          </h1>
          {knowledge.content?.map((section, idx) => (
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
                    paths={[{ label: "คลังความรู้", href: "/knowledge" }]}
                    current={knowledge.title}
                  />
                </div>
              )}
              <div
                className="text-[#282828] text-sm md:text-base leading-7 whitespace-pre-line py-2 md:py-4"
                dangerouslySetInnerHTML={{ __html: section.text }}
              />
            </div>
          ))}
          {/* Related Files Section */}
          <div className="max-w-screen-xl mt-8">
            <h2 className="text-lg font-semibold mb-4">ไฟล์ที่เกี่ยวข้อง</h2>
            <div className="flex flex-col gap-4 md:gap-3">
              <div className="flex items-center gap-2 text-[#111827] px-4 py-2 rounded-lg w-full max-w-full overflow-hidden">
                <FileDigit className="h-5 w-5 text-[#37594C] shrink-0" />
                <span className="text-sm font-medium truncate whitespace-nowrap overflow-hidden max-w-[250px] md:max-w-none">
                  Workforce_HealthScreening_BehaviorAssessment_Guide.pdf
                </span>
              </div>
              <a
                href="/files/Workforce_HealthScreening_BehaviorAssessment_Guide.pdf"
                download
                className="flex items-center justify-center gap-2 bg-[#0F5F4D] text-white rounded-md px-6 py-2 hover:bg-[#2d453b] w-full md:self-start md:w-auto"
              >
                <FileDown className="h-5 w-5" />
                ดาวน์โหลด
              </a>
            </div>
          </div>
        </main>
      </div>

      <hr className="max-w-screen-xl mx-auto my-6 md:my-8" />
      <RelatedCourseSwiper
        currentId={knowledge.id}
        currentCategory={knowledge.category}
      />
    </Layout>
  );
}
