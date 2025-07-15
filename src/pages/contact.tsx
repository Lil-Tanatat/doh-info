import { Layout } from "@/components/layout";
import { useState } from "react";
import Breadcrumb from "@/components/BreadCrumb";
import Image from "next/image";
import contactCenters from "@/data/contactCenters.json";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function ContactPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Layout>
      <div className="space-y-10 px-4 sm:px-6 md:px-12 lg:px-24 py-10">
        <section className="relative h-[100px] sm:h-[150px] md:h-[190px] overflow-hidden rounded-bl-4xl rounded-br-4xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/contact.png')",
              backgroundPosition: "center",
            }}
          />
        </section>
        <div className="-mt-6 px-4 md:px-8 lg:px-12">
          <Breadcrumb current="รู้จักโครงการ" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 md:px-8 lg:px-12">
          <div>
            <Image
              src="/images/company.png"
              alt="กรมอนามัย"
              width={800}
              height={600}
              className="rounded-lg object-cover w-full h-auto"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#0F5F4D]">
              หน่วยงานส่วนกลาง กรมอนามัย กระทรวงสาธารณสุข
            </h2>
            <p className="text-[#52525B] text-sm sm:text-base">
              โครงการพัฒนาสุขภาพวัยทำงานยินดีรับฟังทุกข้อเสนอแนะ สอบถามข้อมูล
              หรือติดต่อเพื่อร่วมมือดำเนินงาน คุณสามารถติดต่อเราได้ผ่านโทรศัพท์
              อีเมล หรือส่งข้อความผ่านแบบฟอร์มด้านล่าง
              เราพร้อมตอบกลับและให้บริการด้วยความเต็มใจ
            </p>
            <div className="mt-4 text-sm sm:text-base text-gray-700 space-y-4">
              <p>📧 saranban@anamai.mail.go.th</p>
              <p>📞 0-2590-4044</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=88/22+ถ.ติวานนท์+ต.ตลาดขวัญ+อ.เมือง+จ.นนทบุรี+11000"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#52525B] hover:underline"
              >
                📍 88/22 ถ.ติวานนท์ ต.ตลาดขวัญ อ.เมือง จ.นนทบุรี 11000
              </a>
              <p className="text-2xl sm:text-3xl font-semibold text-[#0F5F4D]">
                กระทรวงสาธารณสุข
              </p>
              <p>📞 0-2590-1000</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=ถนนติวานนท์+ต.ตลาดขวัญ+อ.เมือง+จ.นนทบุรี+11000"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#52525B] hover:underline"
              >
                📍 ถนนติวานนท์ ต.ตลาดขวัญ อ.เมือง จ.นนทบุรี 11000
              </a>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 md:px-8 lg:px-12">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#0F5F4D] py-4">
              ศูนย์อนามัยและสถาบันพัฒนาสุขภาวะเขตเมือง
            </h2>
            <p className="text-[#52525B] text-sm sm:text-base">
              หากท่านมีข้อสงสัย ต้องการข้อมูลเพิ่มเติม
              หรือประสงค์จะติดต่อประสานงาน
              เกี่ยวกับโครงการพัฒนาสุขภาพวัยทำงานสามารถติดต่อเจ้าหน้าที่ของเราได้
              ผ่านช่องทางต่าง ๆ ดังต่อไปนี้
              เรายินดีให้บริการและตอบกลับโดยเร็วที่สุด ในเวลาทำการ
            </p>
          </div>
          <div className="space-y-4">
            {contactCenters.map((center, index) => (
              <div
                key={center.id}
                className="border border-[#7AC4C5] rounded-2xl overflow-hidden transition-all duration-300 ease-in-out"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="flex items-center justify-between px-4 py-2 h-[60px] w-full text-sm sm:text-base focus:outline-none active:outline-none"
                >
                  <span className="flex-1 text-left leading-none">
                    {center.name}
                  </span>
                  {openIndex === index ? (
                    <ChevronDown className="w-6 h-6 sm:w-7 sm:h-7 text-[#0F5F4D] transition-transform duration-300 shrink-0" />
                  ) : (
                    <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-[#0F5F4D] transition-transform duration-300 shrink-0" />
                  )}
                </button>
                <div
                  className={`px-4 pb-4 space-y-2 text-sm sm:text-base text-[#52525B] transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <p>📧 {center.email}</p>
                  <p>📞 {center.phone}</p>
                  <p>📠 {center.fax}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      center.address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:underline"
                  >
                    📍 {center.address}
                  </a>
                  <p>🌐 {center.website}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
