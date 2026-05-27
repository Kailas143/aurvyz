export const categories = [
  "AI Systems",
  "Workflow Automation",
  "ERP & Operations",
  "Engineering",
  "Case Studies",
  "Product Breakdowns",
  "Architecture",
  "Business Systems"
];

export const articles = [
  {
    id: "1",
    slug: "ai-admissions-workflow-system",
    title: "How We Built an AI Admissions Workflow System",
    excerpt: "A deep dive into the architecture and operational impact of an automated admissions pipeline powered by LLMs.",
    content: `
# Introduction

Modern businesses are scaling faster than their internal operations can support. In this article, we break down how we architected a fully automated AI admissions workflow system that reduces processing time by 80%.

## The Architecture

We utilized a combination of Next.js for the interface, Python FastAPI for the orchestration layer, and several specialized AI agents for document parsing and decision support.

\`\`\`python
@app.post("/api/v1/admissions/process")
async def process_admission(data: AdmissionRequest):
    # AI orchestration logic
    result = await workflow_agent.execute(data)
    return {"status": "success", "data": result}
\`\`\`

## Operational Impact

The system effectively eliminated the bottleneck in document verification. By leveraging structured output from LLMs, we achieved a 99.2% accuracy rate in automated data extraction.

> "Operational chaos is the enemy of scale. By systematizing our admissions, we unlocked a new level of growth."
    `,
    category: "Case Studies",
    author: {
      name: "Alex Rivera",
      role: "Lead Systems Architect",
      avatar: "https://i.pravatar.cc/150?u=alex"
    },
    publishedAt: "2026-05-15T10:00:00Z",
    readingTime: "8 min read",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    tags: ["LLM", "FastAPI", "Automation", "Admissions"],
    featured: true
  },
  {
    id: "2",
    slug: "operational-chaos-slows-growth",
    title: "Why Operational Chaos Slows Growing Businesses",
    excerpt: "Scaling revenue without scaling systems leads to critical failures. Here is how to audit your operations.",
    content: "Content goes here...",
    category: "Business Systems",
    author: {
      name: "Sarah Chen",
      role: "VP of Operations",
      avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    publishedAt: "2026-05-10T14:30:00Z",
    readingTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    tags: ["Operations", "Scaling", "Audit"],
    featured: false
  },
  {
    id: "3",
    slug: "designing-workflow-automation-clinics",
    title: "Designing Workflow Automation for Clinics",
    excerpt: "Healthcare operations require precision and privacy. A look into our specialized clinic workflow automation.",
    content: "Content goes here...",
    category: "Workflow Automation",
    author: {
      name: "Marcus Johnson",
      role: "Product Engineer",
      avatar: "https://i.pravatar.cc/150?u=marcus"
    },
    publishedAt: "2026-05-02T09:15:00Z",
    readingTime: "12 min read",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    tags: ["Healthcare", "HIPAA", "Automation"],
    featured: false
  },
  {
    id: "4",
    slug: "real-time-erp-dashboard-architecture",
    title: "Inside a Real-Time ERP Dashboard Architecture",
    excerpt: "How we built a sub-50ms latency dashboard for supply chain tracking using WebSockets and Redis.",
    content: "Content goes here...",
    category: "Architecture",
    author: {
      name: "Alex Rivera",
      role: "Lead Systems Architect",
      avatar: "https://i.pravatar.cc/150?u=alex"
    },
    publishedAt: "2026-04-28T11:00:00Z",
    readingTime: "10 min read",
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    tags: ["Redis", "WebSockets", "ERP", "Performance"],
    featured: false
  },
  {
    id: "5",
    slug: "whatsapp-chaos-to-operational-clarity",
    title: "From WhatsApp Chaos to Operational Clarity",
    excerpt: "Centralizing customer communication into a unified operational dashboard.",
    content: "Content goes here...",
    category: "AI Systems",
    author: {
      name: "Elena Rodriguez",
      role: "AI Integration Specialist",
      avatar: "https://i.pravatar.cc/150?u=elena"
    },
    publishedAt: "2026-04-20T16:45:00Z",
    readingTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    tags: ["WhatsApp API", "CRM", "Integration"],
    featured: false
  }
];

export const prototypes = [
  {
    id: "p1",
    title: "Clinic Operations System",
    industry: "Healthcare",
    buildTime: "3 Weeks",
    techStack: ["Next.js", "Python", "PostgreSQL", "HL7 Integration"],
    summary: "Automated patient intake, scheduling, and follow-up communication system.",
    thumbnailUrl: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    demoUrl: "#",
    walkthroughUrl: "#"
  },
  {
    id: "p2",
    title: "Admissions Workflow OS",
    industry: "Education",
    buildTime: "4 Weeks",
    techStack: ["React", "FastAPI", "OpenAI", "AWS"],
    summary: "End-to-end AI document processing and applicant scoring pipeline.",
    thumbnailUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    demoUrl: "#",
    walkthroughUrl: "#"
  },
  {
    id: "p3",
    title: "Logistics Dashboard",
    industry: "Supply Chain",
    buildTime: "2 Weeks",
    techStack: ["Vue.js", "Node.js", "Redis", "Google Maps API"],
    summary: "Real-time fleet tracking and predictive delay analysis.",
    thumbnailUrl: "https://images.unsplash.com/photo-1586528116311-ad8ed7c159b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    demoUrl: "#",
    walkthroughUrl: "#"
  },
  {
    id: "p4",
    title: "AI Intake Assistant",
    industry: "Legal",
    buildTime: "2 Weeks",
    techStack: ["Next.js", "LangChain", "Pinecone", "Twilio"],
    summary: "Conversational AI that qualifies leads and schedules consultations via SMS.",
    thumbnailUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    demoUrl: "#",
    walkthroughUrl: "#"
  }
];

export const analyticsData = {
  views: 124500,
  viewsChange: "+14%",
  readingTimeAvg: "4m 12s",
  readingTimeChange: "+5%",
  subscribers: 8402,
  subscribersChange: "+23%",
  conversionRate: "3.2%",
  conversionChange: "+0.4%",
  trafficChart: [
    { date: "May 20", views: 4000 },
    { date: "May 21", views: 4500 },
    { date: "May 22", views: 4200 },
    { date: "May 23", views: 5800 },
    { date: "May 24", views: 5100 },
    { date: "May 25", views: 6000 },
    { date: "May 26", views: 7200 },
  ],
  topCategories: [
    { name: "AI Systems", views: 45000 },
    { name: "Workflow Automation", views: 32000 },
    { name: "Architecture", views: 28000 },
    { name: "Case Studies", views: 19500 },
  ]
};

export const scheduledArticles = [
  {
    id: "s1",
    title: "The Future of ERP is AI-Native",
    status: "Scheduled",
    publishDate: "2026-05-30T10:00:00Z",
    author: "Alex Rivera",
    category: "ERP & Operations"
  },
  {
    id: "s2",
    title: "Optimizing PostgreSQL for Time-Series Data",
    status: "Draft",
    publishDate: null,
    author: "Sarah Chen",
    category: "Engineering"
  },
  {
    id: "s3",
    title: "Building Resilient Automation Pipelines",
    status: "Scheduled",
    publishDate: "2026-06-05T14:00:00Z",
    author: "Elena Rodriguez",
    category: "Workflow Automation"
  }
];
