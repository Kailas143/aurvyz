import { PrototypeCard } from "@/components/prototypes/PrototypeCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Nav from "@/components/landing/Nav";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "Prototypes | Aurvyz AI",
  description: "Explore our interactive prototypes, workflow demos, and operational systems.",
};

export default async function PrototypesPage() {
  let prototypes = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/api/prototypes`);
    if (res.ok) {
      prototypes = await res.json();
    }
  } catch (error) {
    console.error("Error fetching prototypes", error);
  }

  return (
    <div className="min-h-screen bg-[#F7F9FB] dark:bg-gray-950 flex flex-col">
      <Nav />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>
          </div>
          
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              Operational Systems Lab
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Interactive prototypes, workflow demos, and custom software systems built for modern businesses. Experience how we turn operational chaos into engineered intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prototypes.map((prototype) => (
              <PrototypeCard key={prototype.id} prototype={prototype} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
