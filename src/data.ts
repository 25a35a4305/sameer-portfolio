import { Skill, Project, Experience, Education } from './types';

export const skillsData: Skill[] = [
  {
    name: "Python & PyTorch",
    category: "programming",
    level: 95,
    iconName: "Code2",
    description: "Deep learning models, natural language parsing pipelines, and complex heuristics development."
  },
  {
    name: "TypeScript & React",
    category: "web",
    level: 90,
    iconName: "FileJson",
    description: "Building responsive, highly polished dashboards, interactive canvas renderers, and full-stack utilities."
  },
  {
    name: "Node.js & Express",
    category: "web",
    level: 88,
    iconName: "Cpu",
    description: "Robust REST APIs, secure tokenization/keys handling, and server-side model orchestration."
  },
  {
    name: "NLP & Large Language Models",
    category: "programming",
    level: 92,
    iconName: "BrainCircuit",
    description: "Context embedding, custom prompt engineering, streaming responses, and document summarizing pipelines."
  },
  {
    name: "Computer Vision & YOLO",
    category: "programming",
    level: 85,
    iconName: "Eye",
    description: "Real-time frame capture, bounding box prediction, telemetry formatting, and hardware-accelerated wrappers."
  },
  {
    name: "PostgreSQL & Redis",
    category: "database",
    level: 87,
    iconName: "Database",
    description: "Relational database schema design, indexing strategies, caching mechanisms, and connection pools."
  },
  {
    name: "UI/UX & Tailwind CSS",
    category: "design",
    level: 92,
    iconName: "Palette",
    description: "Crafting beautiful minimalist interfaces, professional typography scales, and fluid motion-driven micro-interactions."
  },
  {
    name: "Git & Deployment",
    category: "programming",
    level: 85,
    iconName: "GitBranch",
    description: "Containerized workflows with Docker, CI/CD automated test suites, and Cloud Run server environments."
  }
];

export const projectsData: Project[] = [
  {
    id: "summarizer",
    title: "NLP Document Summarizer",
    shortDesc: "Interactive context-aware text summarizer powered by Gemini 3.5 Flash.",
    fullDesc: "An intelligent, high-density editor designed to distill massive textual corpora into bite-sized highlights, structural bullet points, or executive summaries. Leverages custom system prompts with adjustable lengths, target output scales, and direct token budget calculators.",
    tags: ["Natural Language Processing", "Gemini 3.5 Flash", "Express API", "Deferred Streaming"],
    visualType: "summarizer"
  },
  {
    id: "detection",
    title: "Real-time Object Detection Telemetry Wrapper",
    shortDesc: "Simulation canvas mapping live camera stream coordinates and diagnostic logs.",
    fullDesc: "A sleek dashboard showcasing real-time object tracking, confidence score variations, class detection histograms, and standard console stream logs. Includes interactive target category switching, speed throttling, and visual camera noise filters.",
    tags: ["Computer Vision", "Bounding Box Telemetry", "HTML5 Canvas", "Tailwind Dashboard"],
    visualType: "detection"
  },
  {
    id: "game-solver",
    title: "Interactive Predictive Game Solver",
    shortDesc: "Playable minimax agent evaluating game states, heuristic depths, and pathways.",
    fullDesc: "A modern game-board puzzle playing against an advanced recursive agent. Features real-time forecasting charts, lookahead tree analysis logs, path weight calculations, and custom predictive state evaluation percentages.",
    tags: ["Predictive Heuristics", "Minimax AI Engine", "Data Visualization", "Subtree Analysis Logs"],
    visualType: "arcade"
  }
];

export const experiencesData: Experience[] = [
  {
    role: "Senior AI Engineer",
    organization: "Cognitive Synthetics Corp",
    period: "2024 - Present",
    bullets: [
      "Engineered full-stack NLP document pipeline reducing executive research cycles by 40% using highly accurate, multi-doc summarizers.",
      "Optimized real-time computer vision pipelines to output highly stable bounding box telemetry for robotic inspection arms.",
      "Designed predictive planning engines featuring customizable lookahead algorithms and interactive visual debugging logs."
    ]
  },
  {
    role: "Data & Systems Researcher",
    organization: "Apex Intelligent Analytics",
    period: "2022 - 2024",
    bullets: [
      "Developed high-throughput data processing endpoints handling telemetry streams of more than 5M records per day.",
      "Built clean React-based micro-frontends illustrating neural network weights and interactive gradient descent pathways.",
      "Maintained transactional database backends, streamlining query execution speeds by 30% through index consolidation."
    ]
  },
  {
    role: "AI Developer Associate",
    organization: "Nexis Laboratory",
    period: "2020 - 2022",
    bullets: [
      "Assisted in deploying lightweight vision systems onto Edge devices, using quantization and tensor optimizations.",
      "Vetted automated model verification tests and built interactive HTML5 dashboards to monitor training runs."
    ]
  }
];

export const educationData: Education[] = [
  {
    degree: "M.S. in Intelligent Systems & Machine Learning",
    institution: "Federal University of Science",
    period: "2018 - 2020",
    details: "Focused on Natural Language Processing (NLP), Advanced Heuristic Search Engines, and Computer Vision modules. Developed minor thesis on 'Optimizing Multi-Doc Heuristics under Tight Memory Constraints'."
  },
  {
    degree: "B.S. in Computer Science & Engineering",
    institution: "Tech University of Excellence",
    period: "2014 - 2018",
    details: "Graduated with honors. Solid foundation in Algorithms, Data Structures, Discrete Mathematics, Relational Database Design, and Software Systems Engineering."
  }
];
