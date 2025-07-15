import Link from "next/link";
import Image from "next/image";
// import { IconEye } from "@tabler/icons-react";
import { IconBrandFacebook, IconWorld } from "@tabler/icons-react";

// Footer data configuration
const FOOTER_SECTIONS = [
  {
    title: "รู้จักโครงการ",
    links: [{ title: "ข้อมูลโครงการ", href: "/" }],
  },
  {
    title: "สื่อประชาสัมพันธ์",
    links: [
      { title: "ข่าวประชาสัมพันธ์", href: "/" },
      { title: "คลังความรู้", href: "/about" },
    ],
  },
  {
    title: "คำถามที่พบบ่อย",
    links: [{ title: "ติดต่อเรา", href: "/help", isBold: true }],
  },
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
  logo: "/images/logo.png",
  description:
    "กรมอนามัย มุ่งส่งเสริมสุขภาพและคุณภาพชีวิตที่ดีของประชาชนวัยทำงาน ผ่านการให้ข้อมูล ความรู้ และเครื่องมือที่สนับสนุนการดูแลสุขภาวะอย่างรอบด้าน เพราะสุขภาพดีในวันนี้ คือรากฐานของสังคมที่แข็งแรงในวันข้างหน้า",
  copyright: "HEALTH UP",
};

// Reusable components
const FooterSection = ({
  title,
  links,
}: {
  title: string;
  links: Array<{ title: string; href: string; isBold?: boolean }>;
}) => (
  <div className="flex-shrink-0 ">
    <h3 className="text-md font-semibold text-white tracking-wider uppercase mb-4">
      {title}
    </h3>
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

const SocialLink = ({
  name,
  icon,
  href,
}: {
  name: string;
  icon: React.ReactNode;
  href: string;
}) => (
  <a
    href={href}
    className="text-white hover:text-primary transition-colors"
    aria-label={name}
  >
    {icon}
  </a>
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
      <footer className="bg-highlight rounded-4xl mx-3 mb-3 mt-20">
        <div className="py-12 px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
            {/* Company Info - Left Side */}
            <div className="flex flex-col gap-4 lg:max-w-sm">
              <Image
                src={COMPANY_INFO.logo}
                alt="logo"
                width={50}
                height={50}
                className="w-full h-auto max-w-20"
              />
              <p className="text-white text-sm leading-relaxed">
                {COMPANY_INFO.description}
              </p>
            </div>

            {/* Footer Sections - Right Side */}
            <div className=" flex-row md:mx-2 gap-4 lg:gap-12 hidden md:flex">
              {FOOTER_SECTIONS.map((section) => (
                <FooterSection
                  key={section.title}
                  title={section.title}
                  links={section.links}
                />
              ))}
            </div>
          </div>
          {/* Social Media Links */}
          <div className="flex justify-end mt-8">
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Copyright + Policy same line */}
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center text-white text-xs mt-4 gap-2 md:gap-4">
            <p className="text-center text-sm">
              Copyright <span className="text-gray-500">&copy;</span>{" "}
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
