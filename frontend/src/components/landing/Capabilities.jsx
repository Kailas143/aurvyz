import { Globe, Database, BrainCircuit, Workflow, ArrowRight, Bot, Stethoscope, BarChart3, Clock, ReceiptText } from "lucide-react";

const capabilities = [
  {
    icon: Globe,
    title: "Web Systems",
    desc: "Strategic, high-conversion engines engineered to be the digital front-end of your operational stack.",
  },
  {
    icon: Database,
    title: "Custom ERPs",
    desc: "Architected to unify finance, inventory, and logic into a single, proprietary source of truth.",
  },
  {
    icon: BrainCircuit,
    title: "Operating Modules",
    desc: "Custom AI modules that plug directly into your workflows to handle decision-heavy tasks at scale.",
  },
  {
    icon: Workflow,
    title: "Workflow Systems",
    desc: "Engineered systems that replace manual overhead with observable, compounding business logic.",
  },
];

const solutions = [
  {
    icon: Stethoscope,
    name: "ClinicOS",
    desc: "Unifies bookings, records, and AI front-desk for clinic teams.",
    tag: "Business OS",
  },
  {
    icon: ReceiptText,
    name: "BillFlow AI",
    desc: "AI-powered invoice analysis and approval workflow system.",
    tag: "Finance AI",
  },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="py-24 sm:py-32 bg-[#F7F9FB]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs tracking-[0.22em] uppercase text-[#328CC1] font-semibold mb-4">
            / Capabilities & Solutions
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#0B3C5D] leading-tight tracking-tight">
            Engineered systems for <br className="hidden sm:block" />
            <span className="nx-gradient-text">growing businesses.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[#4B5563] leading-relaxed">
            We don't just build apps. We build the operating systems of modern, performance-driven organizations.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {capabilities.map((c, i) => (
            <div key={i} className="p-8 rounded-2xl bg-white border border-[#0B3C5D]/5 hover:border-[#2EC4B6]/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#0B3C5D]/5 text-[#0B3C5D] flex items-center justify-center mb-6 group-hover:bg-[#0B3C5D] group-hover:text-white transition-colors">
                <c.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h4 className="font-bold text-[#0B3C5D] text-lg mb-2">{c.title}</h4>
              <p className="text-sm text-[#4B5563] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Examples / Solutions Heading */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0B3C5D]">The Aurvyz Demo Lab</h3>
            <p className="text-sm text-[#4B5563] mt-2">Explore live interactive prototypes of systems we've engineered.</p>
          </div>
          <div className="hidden md:block h-[1px] flex-1 mx-8 bg-[#0B3C5D]/10" />
          <a 
            href="/demo-lab" 
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0B3C5D] hover:text-[#2EC4B6] transition-colors"
          >
            Visit Demo Lab <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Flagship solution / Image */}
        <div className="mb-8 relative rounded-3xl overflow-hidden bg-[#0B3C5D] text-white p-8 sm:p-12 grid lg:grid-cols-2 gap-12 items-center">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#2EC4B6]/10 to-transparent pointer-events-none" />
          <div>
            <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2EC4B6]/15 text-[#2EC4B6] text-[10px] font-bold uppercase tracking-widest">
                Flagship Prototype
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/90 text-[10px] font-bold uppercase tracking-widest border border-white/10">
                    <Clock className="w-3 h-3 text-[#2EC4B6]" />
                    Delivered in 18 hours
                </span>
            </div>
            <h4 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
              Clinic AI <span className="text-[#2EC4B6]">Operations System</span>.
            </h4>
            <p className="mt-6 text-white/70 leading-relaxed max-w-lg">
              A comprehensive operational OS for medical clinics. We unified patient intake, AI-driven records, and scheduling into a single high-performance interface.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium">AI Front-desk</div>
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium">Patient Intake</div>
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium">Real-time Pulse</div>
            </div>
            <div className="mt-10">
                <a 
                    href="/demo-lab" 
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2EC4B6] text-[#0B3C5D] font-bold text-sm hover:scale-105 transition-transform"
                >
                    View in Demo Lab <ArrowRight className="w-4 h-4" />
                </a>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#2EC4B6]/20 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="/assets/clinic-demo.png" 
                alt="Clinic AI Demo Screenshot" 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
        
        {/* Flagship solution 2 / Global Admissions OS */}
        <div className="mb-12 relative rounded-3xl overflow-hidden bg-white border border-[#0B3C5D]/10 p-8 sm:p-12 grid lg:grid-cols-2 gap-12 items-center">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#328CC1]/5 to-transparent pointer-events-none" />
          <div className="order-2 lg:order-1 relative group">
            <div className="absolute -inset-4 bg-[#328CC1]/10 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative rounded-2xl overflow-hidden border border-[#0B3C5D]/5 shadow-2xl">
              <img 
                src="/assets/global-admissions-demo.png" 
                alt="Global Admissions OS Demo Screenshot" 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B3C5D]/5 text-[#0B3C5D] text-[10px] font-bold uppercase tracking-widest">
                Latest Deployment
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#328CC1]/10 text-[#0B3C5D] text-[10px] font-bold uppercase tracking-widest border border-[#328CC1]/10">
                    <Clock className="w-3 h-3 text-[#328CC1]" />
                    Delivered in 24 hours
                </span>
            </div>
            <h4 className="font-display text-3xl sm:text-4xl font-bold text-[#0B3C5D] leading-tight">
              Global Admissions <span className="nx-gradient-text">OS</span>.
            </h4>
            <p className="mt-6 text-[#4B5563] leading-relaxed max-w-lg">
              A comprehensive system for education consultancies. We automated eligibility checks with Gemini AI and built a proactive counselor assistant to drive enrollment growth.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="px-4 py-2 rounded-xl bg-[#0B3C5D]/5 border border-[#0B3C5D]/10 text-xs font-semibold text-[#0B3C5D]">AI Counselor</div>
              <div className="px-4 py-2 rounded-xl bg-[#0B3C5D]/5 border border-[#0B3C5D]/10 text-xs font-semibold text-[#0B3C5D]">University Pipeline</div>
              <div className="px-4 py-2 rounded-xl bg-[#0B3C5D]/5 border border-[#0B3C5D]/10 text-xs font-semibold text-[#0B3C5D]">WhatsApp Automations</div>
            </div>
            <div className="mt-10">
                <a 
                    href="/demo-lab" 
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0B3C5D] text-white font-bold text-base hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                    View in Demo Lab <ArrowRight className="w-4 h-4" />
                </a>
            </div>
          </div>
        </div>


        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {solutions.map((s, i) => (
            <div key={i} className="group relative p-8 rounded-3xl bg-white border border-[#0B3C5D]/10 hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <s.icon className="w-24 h-24" />
               </div>
               <div className="relative z-10">
                <span className="text-[10px] tracking-widest uppercase text-[#328CC1] font-bold">
                  {s.tag}
                </span>
                <h4 className="font-display text-xl font-bold text-[#0B3C5D] mt-3">{s.name}</h4>
                <p className="mt-2 text-sm text-[#4B5563] leading-relaxed">{s.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[#0B3C5D] group-hover:text-[#2EC4B6] transition-colors">
                  Explore Capability <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
               </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
