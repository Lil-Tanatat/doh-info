import { Layout } from "@/components/layout";
import { ChevronRight, ChevronUp } from "lucide-react";
import Breadcrumb from "@/components/BreadCrumb";
import { useState } from "react";
import questions from "@/data/questions.json";

type FAQ = {
  question: string;
  answer: string;
};

export default function StaticPage() {
  return (
    <Layout>
      <div className="space-y-16 px-6 py-4 md:px-12 lg:px-24">
        <section className="relative h-[100px] sm:h-[150px] md:h-[190px] overflow-hidden rounded-bl-4xl rounded-br-4xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/statichero.png')",
              backgroundPosition: "center",
            }}
          />
        </section>
        <div className="-mt-6 px-2 sm:px-4 md:px-8 lg:px-12">
          <Breadcrumb current="สถิติย้อนหลัง" />
        </div>
      </div>
    </Layout>
  );
}
