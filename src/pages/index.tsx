import { Layout } from "@/components/layout";

export default function Home() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.64))] ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center"></div>
        </div>
      </div>
    </Layout>
  );
}
