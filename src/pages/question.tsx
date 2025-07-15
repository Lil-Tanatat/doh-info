import { Layout } from "@/components/layout";
import { ChevronRight, ChevronUp } from "lucide-react";
import Breadcrumb from "@/components/BreadCrumb";
import { useState } from "react";
import questions from "@/data/questions.json";

type FAQ = {
  question: string;
  answer: string;
};

export default function QuestionPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Layout>
      <div className="space-y-16 px-6 py-4 md:px-12 lg:px-24">
        <section className="relative h-[100px] sm:h-[150px] md:h-[400px] overflow-hidden rounded-bl-4xl rounded-br-4xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/faq.png')",
              backgroundPosition: "center",
            }}
          />
        </section>
        <div className="-mt-6 px-2 sm:px-4 md:px-8 lg:px-12">
          <Breadcrumb current="คำถามที่พบบ่อย" />
        </div>
        <div className="text-center space-y-4">
          <h2 className="text-lg sm:text-xl md:text-4xl font-semibold text-[#0F5F4D]">
            คำถามที่พบบ่อย
          </h2>
          <h2 className="text-base sm:text-lg md:text-2xl font-semibold">
            รวมทุกข้อสงสัย ไขทุกคำถาม เพื่อสุขภาพวัยทำงานที่ดีขึ้น
          </h2>
          <p className="text-center px-4 sm:px-8 md:px-20 lg:px-36 text-sm sm:text-base">
            หากคุณมีคำถามเกี่ยวกับการดูแลสุขภาพในวัยทำงาน
            การใช้ระบบบริหารจัดการข้อมูลสุขภาพ หรือบริการต่าง ๆ จากกรมอนามัย
            <br />
            หน้านี้ได้รวบรวมคำถามที่พบบ่อยพร้อมคำตอบที่ชัดเจนและเข้าใจง่าย
            เพื่อช่วยให้คุณเข้าถึงข้อมูลที่จำเป็น
            <br />
            ได้รวดเร็วและสะดวกมากยิ่งขึ้น
          </p>
          <p className="text-center px-4 sm:px-6 md:px-12 lg:px-18 py-4 text-sm sm:text-base">
            ไม่ว่าจะเป็นเรื่องการลงทะเบียน การใช้งานระบบ การประเมินสุขภาพ
            หรือแนวทางการส่งเสริม
            <br />
            สุขภาวะในองค์กร – เรามีคำตอบไว้ให้แล้วที่นี่
          </p>
        </div>
        <div className="space-y-4">
          {questions.map((faq, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-[10px] px-4 sm:px-[20px] py-[18px] border border-[#7AC4C5] rounded-2xl w-full max-w-2xl mx-auto"
            >
              <button
                onClick={() => toggle(index)}
                className="flex justify-between items-center w-full px-4 py-3 transition"
              >
                <span>{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-7 h-7 text-[#7AC4C5] border border-[#F0F0F0] rounded-full" />
                ) : (
                  <ChevronRight className="w-7 h-7 text-[#7AC4C5] border border-[#F0F0F0] rounded-full" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
