"use client";

import { useRouter } from "next/navigation";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  paths?: BreadcrumbItem[];
  current: string;
}

export default function Breadcrumb({ paths = [], current }: BreadcrumbProps) {
  const router = useRouter();

  return (
    <nav
      className="py-0 flex items-center text-sm flex-wrap"
      aria-label="Breadcrumb"
    >
      <button
        onClick={() => router.push("/home")}
        className="text-[#71717A] text-sm hover:underline focus:outline-none"
      >
        หน้าหลัก
      </button>

      {/* Mid paths */}
      {paths.map((item, idx) => (
        <span key={idx} className="flex items-center">
          <span className="mx-2 text-[#71717A] text-2xl">›</span>
          {item.href ? (
            <button
              onClick={() => router.push(item.href ?? "/")}
              className="text-[#71717A] text-sm hover:underline focus:outline-none"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-[#71717A] text-sm">{item.label}</span>
          )}
        </span>
      ))}

      {/* Current page */}
      <span className="mx-2 text-[#71717A] text-2xl">›</span>
      <span className="text-[#0F5F4D] text-sm truncate max-w-[480px] overflow-hidden whitespace-nowrap">
        {current}
      </span>
    </nav>
  );
}
