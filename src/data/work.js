// Things I've built at work and in research. Kept short on purpose:
// the CV has the numbers, this is what each thing is and why it exists.
export const work = [
  {
    id: "control-plane",
    name: "AI Control Plane",
    context: "CCSolutions.io, 2026",
    brick: "blue",
    studs: 4,
    summary:
      "The company's multi-tenant AI product. Teams get an OpenAI-compatible API with roles, quotas and data residency, and a console to manage access, usage and audit. I designed and built it.",
    stack: ["Go", "Next.js", "Kubernetes", "OIDC", "mTLS", "RBAC"],
  },
  {
    id: "execution-plane",
    name: "Execution Plane",
    context: "CCSolutions.io, 2026",
    brick: "green",
    studs: 3,
    summary:
      "Where our team builds and runs agents and workflows on Mastra, straight from Slack. Every run gets its own sandboxed pod and only the credentials it needs.",
    stack: ["Mastra", "Kubernetes", "Argo CD", "Slack"],
  },
  {
    id: "inference",
    name: "GPU inference fleet",
    context: "CCSolutions.io, 2026",
    brick: "orange",
    studs: 2,
    summary:
      "Six models served on vLLM and llm-d, provisioned with Terraform and Ansible. A small Go watchdog keeps spot capacity up so the models stay available.",
    stack: ["vLLM", "llm-d", "Nebius", "Terraform", "Ansible", "Go"],
  },
  {
    id: "mirna",
    name: "RNA research platform",
    context: "Liverpool John Moores University, 2026",
    brick: "yellow",
    studs: 3,
    summary:
      "A free public web platform for RNA researchers, built as a part-time Research Assistant. It covers miRNA target prediction with GO and pathway enrichment, and siRNA design on Modal GPUs or the Prospero HPC cluster via SLURM.",
    stack: ["Python", "Flask", "Docker", "Modal", "SLURM", "pytest"],
    link: { label: "Open the app", href: "https://mirna-pipeline-ueap.onrender.com" },
  },
];
