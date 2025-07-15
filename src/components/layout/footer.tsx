import Link from "next/link";
import Image from "next/image";
// import { IconEye } from "@tabler/icons-react";
import { IconBrandFacebook, IconWorld } from "@tabler/icons-react";

// Footer data configuration
const FOOTER_SECTIONS = [
  {
    // title: "รู้จักโครงการ",
    links: [{ title: "รู้จักโครงการ", href: "/about" }],
  },
  {
    // title: "คำถามที่พบบ่อย",
    links: [{ title: "คำถามที่พบบ่อย", href: "/question" }],
  },
  {
    // title: "คำถามที่พบบ่อย",
    links: [{ title: "ข่าวประชาสัมพันธ์/กิจกรรม", href: "/relations" }],
  },
  {
    // title: "คำถามที่พบบ่อย",
    links: [{ title: "คลังความรู้", href: "/knowledge" }],
  },
  {
    // title: "คำถามที่พบบ่อย",
    links: [{ title: "สถิติย้อนหลัง", href: "/static" }],
  },

  {
    // title: "คำถามที่พบบ่อย",
    links: [{ title: "ติดต่อเรา", href: "/contact" }],
  },
  // {
  //   title: "สื่อประชาสัมพันธ์",
  //   links: [
  //     { title: "ข่าวประชาสัมพันธ์", href: "/" },
  //     { title: "คลังความรู้", href: "/about" },
  //   ],
  // },
];

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    icon: IconBrandFacebook,
    href: "#",
  },
  { name: "Website", icon: IconWorld, href: "#" },
  // { name: "Youtube", icon: "/images/footer/youtube.png", href: "#" },
  // { name: "Instagram", icon: "/images/footer/instagram.png", href: "#" },
  // { name: "Twitter", icon: "/images/footer/twitter.png", href: "#" },
];

const COMPANY_INFO = {
  logo: "/images/Footer New Logo.png",
  description: "กลุ่มอนามัยวัยทำงาน สำนักงานเสริมสุขภาพ กรมอนามัย",
  copyright: "HEALTH UP",
};

// Reusable components
const FooterSection = ({
  // title,
  links,
}: {
  // title: string;
  links: Array<{ title: string; href: string; isBold?: boolean }>;
}) => (
  <div className="flex-shrink-0 ">
    {/* <h3 className="text-md font-semibold text-white tracking-wider uppercase mb-4">
      {title}
    </h3> */}
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={`text-white hover:text-primary transition-colors ${
              link.isBold ? "font-semibold" : ""
            }`}
          >
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export function Footer() {
  return (
    <div
      style={{
        backgroundImage: "url('/images/footer/footer-bg.png')",
        backgroundSize: "contain",
        backgroundPosition: "top",
        backgroundRepeat: "repeat-y",
      }}
    >
      <footer className="bg-highlight rounded-4xl mx-3 mb-3 mt-20 overflow-hidden">
        <div className="py-12 px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
            {/* Company Info - Left Side */}
            <div className="flex flex-col gap-4 lg:max-w-sm">
              <Image
                src={COMPANY_INFO.logo}
                alt="logo"
                width={97}
                height={96}
                className="w-full h-auto max-w-20"
              />
            </div>

            {/* Footer Sections - Right Side */}
            <div className="grid grid-cols-2 grid-rows-3 gap-4 md:grid-flow-col md:grid-rows-2 md:gap-6 text-sm sm:text-base justify-center">
              {FOOTER_SECTIONS.map((section, index) => (
                <FooterSection key={index} links={section.links} />
              ))}
            </div>
          </div>

          {/* Description + Social links */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-white text-sm mt-8 gap-2">
            <p className="whitespace-nowrap">{COMPANY_INFO.description}</p>
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Copyright + Policy */}
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center text-white text-xs mt-4 gap-2 md:gap-4">
            <p className="text-center text-sm">
              Copyright <span className="text-gray-500">&copy;</span>
              {COMPANY_INFO.copyright} {new Date().getFullYear()}
            </p>
            <div className="flex flex-row space-x-4 text-[14px] font-semibold">
              <a
                href="#"
                className="hover:text-primary cursor-pointer"
                onClick={(e) => e.preventDefault()}
              >
                นโยบายการคุ้มครองข้อมูลส่วนบุคคล
              </a>
              <a
                href="#"
                className="hover:text-primary cursor-pointer"
                onClick={(e) => e.preventDefault()}
              >
                นโยบายการรักษาความมั่นคงปลอดภัยเว็บไซต์
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
