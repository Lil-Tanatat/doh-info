import { Layout } from "@/components/layout";
import Breadcrumb from "@/components/BreadCrumb";
import Image from "next/image";

export default function AboutPage() {
  return (
    <Layout>
      <div className="space-y-16 px-6 py-10 md:px-12 lg:px-24">
        {/* Hero Section */}
        <section className="relative h-[100px] sm:h-[150px] md:h-[400px] overflow-hidden rounded-bl-4xl rounded-br-4xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/abouthero.png')",
              backgroundPosition: "center",
            }}
          />
        </section>
        <div className="-mt-6 px-4 md:px-8 lg:px-12">
          <Breadcrumb current="รู้จักโครงการ" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold mb-10 text-center">
          ร่วมขับเคลื่อนสังคมสุขภาพดี ผ่านระบบบริหารจัดการข้อมูลสุขภาพวัยทำงาน
          <br />
          ที่ทันสมัย ใช้งานง่าย และเชื่อมโยงทุกภาคส่วน
        </h2>
        {/* Intro Section */}
        <section className="grid gap-8 md:grid-cols-2 items-stretch px-4 md:px-8 lg:px-4">
          <div className="flex flex-col justify-between h-full">
            <div>
              <h2 className="text-xl sm:text-4xl text-[#0F5F4D] font-semibold">
                แนะนำโครงการ / ข้อมูลโครงการ
              </h2>
              <h2 className="text-3xl sm:text-2xl font-medium leading-relaxed">
                เกี่ยวกับโครงการบริหารจัดการข้อมูลสุขภาพวัยทำงาน
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-700 leading-7">
                โครงการบริหารจัดการข้อมูลสุขภาพวัยทำงานเป็นความร่วมมือระหว่างภาครัฐและภาคีเครือข่าย
                ด้านสุขภาพ ที่มุ่งเน้นการสร้างระบบดิจิทัลเพื่อเก็บรวบรวม
                วิเคราะห์ และเผยแพร่ข้อมูลด้าน
                สุขภาพของประชากรวัยทำงานอย่างเป็นระบบในยุคที่สุขภาพกลายเป็นปัจจัยสำคัญของการ
                พัฒนาเศรษฐกิจและคุณภาพชีวิต การมีข้อมูลที่ถูกต้อง
                ครบถ้วนและสามารถนำไปใช้ในการ
                วางแผนนโยบายหรือการดำเนินงานด้านสุขภาพจึงเป็นสิ่งสำคัญ
                ระบบนี้จึงได้รับการออกแบบ
                มาเพื่อให้ทุกภาคส่วนไม่ว่าจะเป็นหน่วยงานราชการ องค์กรภาคเอกชน
                หรือสถานประกอบ การสามารถเข้าถึงและใช้ข้อมูลได้อย่างมีประสิทธิภาพ
              </p>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-700 leading-7">
                โดยระบบจะครอบคลุมตั้งแต่
              </p>
              <ul className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-700 leading-7 list-disc list-inside">
                <li>การเก็บข้อมูลสุขภาพรายบุคคล (Health Profile)</li>
                <li>แบบประเมินสุขภาพตามมาตรฐานที่กำหนด</li>
                <li>ระบบรายงานและวิเคราะห์ผลภาพรวมในรูปแบบกราฟและสถิติ</li>
                <li>การเชื่อมโยงข้อมูลกับฐานกลางภาครัฐในอนาคต</li>
              </ul>
            </div>
          </div>
          <div className="flex items-center justify-center h-full">
            <Image
              src="/images/Intro.png"
              alt="Project Visual"
              width={619}
              height={464}
              className="rounded-lg max-w-full h-auto object-contain"
            />
          </div>
        </section>
      </div>
      {/* Objective Section */}
      <section className="relative mx-auto grid md:grid-cols-2 items-center bg-[#7AC4C5] px-4 sm:px-6 md:px-12 lg:px-18 h-auto md:h-[693px] overflow-hidden">
        <Image
          src="/images/wave topp.png"
          alt="Wave Top Left"
          width={1500}
          height={1500}
          className="absolute top-0 left-0 z-0 object-contain -translate-y-36 sm:-translate-y-48 md:-translate-y-120"
        />
        <Image
          src="/images/wave bottom.png"
          alt="Wave Bottom Right"
          width={1400}
          height={1400}
          className="absolute bottom-0 right-0 z-0 object-contain"
        />
        <div className="flex justify-center z-10 p-4">
          <div className="relative w-[280px] sm:w-[400px] md:w-[566px] h-[240px] sm:h-[340px] md:h-[491px]">
            <Image
              src="/images/wellness.png"
              alt="Workplace Wellness Video"
              fill
              className="rounded-lg shadow-lg object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-[#7AC4C5] p-4 rounded-full">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="z-10 p-4">
          <h3 className="text-xl sm:text-4xl font-semibold mb-10">
            วัตถุประสงค์ของโครงการ
          </h3>
          <ul className="text-sm sm:text-lg space-y-2 list-disc list-inside leading-relaxed">
            <li>
              สร้างระบบฐานข้อมูลด้านสุขภาพสำหรับประชากรวัยทำงานที่มีความถูกต้องและเชื่อถือได้
            </li>
            <li>
              ส่งเสริมให้องค์กรสามารถวางแผนด้านสุขภาพได้อย่างแม่นยำและยั่งยืน
            </li>
            <li>สร้างความตระหนักรู้ด้านสุขภาพในกลุ่มเป้าหมาย</li>
            <li>
              สนับสนุนการกำหนดนโยบายและมาตรการของภาครัฐบนพื้นฐานของข้อมูลจริง
            </li>
            <li>
              ส่งเสริมการมีส่วนร่วมของสถานประกอบการในการดูแลสุขภาพของพนักงาน
            </li>
          </ul>
        </div>
      </section>
      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 text-center">
        <h2 className="text-[#0F5F4D] text-xl sm:text-4xl font-semibold mb-4">
          ประโยชน์ที่ผู้ใช้จะได้รับ
        </h2>
        <p className="text-sm sm:text-lg font-medium text-black max-w-2xl mx-auto mb-12">
          ผู้ใช้จะได้รับประโยชน์ในการระบบในการจัดการและวิเคราะห์ข้อมูลสุขภาพ
          รวมถึงการได้รับคำแนะนำเพื่อการดูแลสุขภาพที่ดีขึ้น
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-y-12 gap-x-4">
          <div className="sm:col-start-1 flex flex-col items-center text-center">
            <Image
              src="/images/Benefit 1.png"
              alt="..."
              width={231}
              height={218}
            />
            <p className="mt-4 text-sm sm:text-lg font-medium text-[#282828]">
              เจ้าหน้าที่สาธารณสุขใน
              <br />
              สถานประกอบการ
            </p>
          </div>
          <div className="sm:col-start-3 flex flex-col items-center text-center">
            <Image
              src="/images/Benefit 2.png"
              alt="..."
              width={231}
              height={218}
            />
            <p className="mt-4 text-sm sm:text-lg font-medium text-[#282828]">
              ฝ่ายทรัพยากรบุคคล (HR)
              <br />
              ขององค์กรขนาดกลางและใหญ่
            </p>
          </div>
          <div className="sm:col-start-5 flex flex-col items-center text-center">
            <Image
              src="/images/Benefit 3.png"
              alt="..."
              width={231}
              height={218}
            />
            <p className="mt-4 text-sm sm:text-lg font-medium text-[#282828]">
              เจ้าหน้าที่โรงพยาบาลส่งเสริม
              <br />
              สุขภาพประจำตำบล (รพ.สต.)
            </p>
          </div>
          <div className="sm:col-start-2 sm:col-span-1 flex flex-col items-center text-center">
            <Image
              src="/images/Benefit 4.png"
              alt="..."
              width={231}
              height={218}
            />
            <p className="mt-4 text-sm sm:text-lg font-medium text-[#282828]">
              หน่วยงานรัฐด้าน
              <br />
              แรงงานและสุขภาพ
            </p>
          </div>
          <div className="sm:col-start-4 sm:col-span-1 flex flex-col items-center text-center">
            <Image
              src="/images/Benefit 5.png"
              alt="..."
              width={231}
              height={218}
            />
            <p className="mt-4 text-sm sm:text-lg font-medium text-[#282828]">
              นักวิจัยและผู้อำนวยแผน
              <br />
              ด้านสาธารณสุข
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
