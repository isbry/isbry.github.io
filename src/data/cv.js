export const contact = {
  email: "Brayancc9912@gmail.com",
  linkedin: "https://www.linkedin.com/in/imbry/",
  github: "https://github.com/isbry",
};

export const jobs = [
  {
    company: "CCSolutions.io",
    role: "Cloud & DevOps Consultant",
    period: "Jan 2026 – Present",
    location: "Remote",
    bullets: [
      "Kubernetes-based infrastructure for client web/mobile platforms.",
      "Terraform IaC for repeatable cloud provisioning across multiple clients.",
      "Automated CI/CD pipelines enforcing DevSecOps best practices.",
    ],
  },
  {
    company: "Latam Airlines",
    role: "DevSecOps Engineer",
    period: "Nov 2022 – Present",
    location: "Remote, Chile",
    bullets: [
      "Migrated CI/CD pipelines using Jenkins shared libraries and GitLab CI, reducing deployment times by 30%.",
      "Managed GCP infrastructure (GKE, Cloud Build, IAM) ensuring 99.5% uptime across critical services.",
      "Implemented IaC with Terraform Cloud, improving scalability and reducing setup time by 40%.",
    ],
  },
  {
    company: "PayU",
    role: "DevOps Engineer",
    period: "May 2022 – Sept 2024",
    location: "Remote, Colombia",
    bullets: [
      "Implemented Karpenter in Amazon EKS clusters with Terraform, enabling dynamic provisioning and reducing infrastructure costs (£10k monthly savings).",
      "Developed and maintained CI/CD dynamic pipelines using GitLab CI and Python, enabling 10+ deployments daily with 20% faster time-to-market.",
      "Implemented and monitored DORA metrics with Prometheus/Grafana, increasing deployment frequency by 20%.",
      "Designed GitOps solutions using FluxCD and Helm for automated infrastructure deployment serving 4M+ users.",
    ],
  },
];

export const education = [
  {
    institution: "Liverpool John Moores University",
    degree: "MSc in Computing and Information Systems",
    period: "Sept 2025 – Present",
  },
  {
    institution: "Universidad Autónoma de Occidente",
    degree: "Bachelor in Biomedical Engineering",
    period: "June 2017 – Dec 2023",
  },
];

export const certs = [
  { name: "Certified Kubernetes Administrator (CKA)", issuer: "The Linux Foundation", period: "Jan 2025 – Jan 2027" },
  { name: "Certified Kubernetes Application Developer (CKAD)", issuer: "The Linux Foundation", period: "Jan 2025 – Jan 2027" },
  { name: "AWS Certified Developer Associate", issuer: "AWS", period: "May 2024 – May 2027" },
];

export const skills = [
  { category: "Languages", items: ["Python", "Golang", "Java"] },
  { category: "IaC", items: ["Terraform", "AWS CloudFormation"] },
  { category: "CI/CD", items: ["GitLab CI", "Jenkins", "GitHub Actions", "Bitbucket"] },
  { category: "Cloud", items: ["AWS", "GCP"] },
  { category: "Containers", items: ["Docker", "Kubernetes"] },
  { category: "Monitoring", items: ["Prometheus", "Grafana"] },
];

export const achievements = [
  { value: "30%", label: "Deployment time reduction", icon: "trophy" },
  { value: "£10k/mo", label: "Infrastructure cost savings", icon: "cloud" },
  { value: "99.5%", label: "Uptime guaranteed", icon: "globe" },
  { value: "4M+", label: "Users served via GitOps platform", icon: "cube" },
];

export const aiTools = ["Cursor", "Claude", "GitHub Copilot", "n8n", "LangChain"];
export const aiTopics = [
  "Agent architecture",
  "RAG vs fine-tuning",
  "AI in DevOps & Platform Engineering",
  "Prompt engineering patterns",
];

export const learnerArc = [
  {
    label: "Biomedical Engineering",
    institution: "Universidad Autónoma de Occidente, Cali",
    period: "2017–2023",
    insight: "Taught me to think in systems — sensors, signals, feedback loops — before I knew what DevOps was.",
  },
  {
    label: "DevOps Engineer",
    institution: "PayU → Latam Airlines",
    period: "2022–present",
    insight: "Where theory met real scale: 4M users, £10k/month infrastructure decisions, and learning by doing.",
  },
  {
    label: "MSc Computing",
    institution: "Liverpool John Moores University",
    period: "2025–present",
    insight: "Going back to fundamentals while working at the frontier. The hardest and most rewarding pivot yet.",
  },
];

export const builderProjects = [
  {
    name: "CI/CD pipeline templates",
    context: "Latam Airlines",
    description: "Jenkins shared libraries + GitLab CI reusable across 10+ teams. 30% faster deployments.",
  },
  {
    name: "Karpenter on Amazon EKS",
    context: "PayU",
    description: "Dynamic node provisioning setup — the architecture behind £10k/month infrastructure savings.",
  },
  {
    name: "DORA metrics dashboard",
    context: "PayU",
    description: "Prometheus + Grafana — made deployment frequency and reliability visible to leadership.",
  },
  {
    name: "GitOps platform",
    context: "PayU",
    description: "FluxCD + Helm automated infrastructure deployment serving 4M+ users.",
  },
  {
    name: "This site",
    context: "Personal",
    description: "Built with Vite + React + framer-motion. Designed as a brand, not a portfolio.",
  },
];

export const personalCards = [
  {
    title: "From Cali, Colombia",
    icon: "globe",
    copy: "I grew up in Cali — a city that taught me warmth, resilience, and how to find rhythm in chaos.",
  },
  {
    title: "Volleyball",
    icon: "trophy",
    copy: "I play 3 times a week. Sport keeps me grounded — teammates, discipline, and the satisfaction of a clean set.",
  },
  {
    title: "Colombia → UK",
    icon: "heart",
    copy: "I moved to Liverpool for my MSc. Building a life abroad is the hardest and most rewarding thing I've done.",
  },
];
