export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

export const experiences: Experience[] = [
  {
    id: '1',
    company: 'FORTIS Lab at USC',
    position: 'GenAI Research Assistant',
    duration: 'Q3 2025 - Present',
    description: 'WIP',
    technologies: ['???'],
    achievements: ['???'],
  },
  {
    id: '2',
    company: 'Air-Climate-Equity Lab at USC',
    position: 'Deep Learning Research Assistant',
    duration: 'Q2 2025 - Present',
    description:
      'Developing machine learning models to predict air quality patterns and environmental conditions using deep learning techniques and geospatial data analysis.',
    technologies: [
      'Python',
      'CNN-LSTM',
      'GeoPandas',
      'Shapely',
      'MLflow',
      'TensorBoard',
    ],
    achievements: [
      'Architected an end-to-end air quality prediction system combining CNN-LSTM deep learning with geospatial analysis, processing 8M+ records to achieve 98% predictive accuracy for PM2.5, NO2, and Ozone concentrations across CA.',
      'Optimized model performance through advanced feature engineering, implementing time-aware data splits, percentile-based outlier handling, and domain-specific spatial features, resulting in 40% accuracy improvement.',
      'Developed automated ML pipeline with comprehensive experiment tracking, integrating MLflow for model versioning, hyperparameter optimization, and artifact management, reducing model deployment time by 60%.',
      'Engineered advanced geospatial visualization and analysis tools using GeoPandas and Shapely for high-resolution interpolated surface mapping with geographic boundary masking and spatial bias analysis.',
    ],
  },
  {
    id: '3',
    company: 'switch.ai',
    position: 'Founder',
    duration: 'Q2 2025 - Present',
    description:
      'Building an AI-powered platform that provides intelligent search and retrieval capabilities for mechnical keyboard switches using advanced RAG architecture.',
    technologies: [
      'React',
      'TypeScript',
      'LangChain',
      'PostgreSQL',
      'pgvector',
      'Jest',
    ],
    achievements: [
      'Engineered a high-performance RAG architecture that boosted search recall by 27% and cut Gemini LLM hallucinations by 31% by implementing a custom LangChain BaseRetriever that fuses pgvector (HNSW) with PostgreSQL FTS via Reciprocal Rank Fusion (RRF), a LongContextReorder agent to mitigate context loss, and a declarative LCEL graph for modular pipeline orchestration.',
      'Reduced LLM iteration cycles by 50% by building a CI-integrated Jest/LangChain test harness that automates QA via synthetic query generation, LLM-as-judge grading, and streamlined A/B testing in LangSmith.',
      'Secured the RAG platform by implementing OWASP-grade input validation, a multi-stage prompt injection defense (instruction filtering, output framing), and strict Content Security Policies to prevent XSS from rendered LLM outputs.',
    ],
  },
  {
    id: '4',
    company: 'Marqui Labs',
    position: 'Lead Software Engineer',
    duration: 'Q1 2025 - Present',
    description:
      'Leading development of NASA Ames web platforms and creating AI-powered research tools to help scientists access and analyze internal publications and data.',
    technologies: [
      'React',
      'Python',
      'RAG',
      'Transformers',
      'PostgreSQL',
      'Docker',
    ],
    achievements: [
      'Maintain and modernize NASA Ames public-facing web platforms, serving 30k+ monthly users, while ensuring compatibility with legacy backend systems and compliance with federal cybersecurity protocols.',
      'Hardened web applications by integrating CSP hashing, sanitizing user inputs, and enforcing secure HTTPS configurations to mitigate XSS and injection vulnerabilities.',
      'Authored the proposal and built a transformer-based RAG (vector-embedding + RAG) search engine that indexes 100k+ internal publications and delivers sub-second answers, dramatically improving data access for 500+ researchers.',
    ],
  },
  {
    id: '5',
    company: 'BLNK',
    position: 'Software Engineer',
    duration: 'Q2 2024 - Q3 2025',
    description:
      'Developing intelligent search systems for e-commerce platforms and building scalable backend infrastructure to handle product data, payments, and shipping integrations.',
    technologies: [
      'Python',
      'RAG',
      'PostgreSQL',
      'Drizzle ORM',
      'Stripe API',
      'Shopify API',
      'Docker',
    ],
    achievements: [
      'Built a multi-stage RAG search engine for 3k+ SKUs, reinforced with OWASP-grade validation and anomaly detection to block prompt-injection exploits.',
      'Utilized Python scripts to automate and streamline the end-to-end data pipeline for refining over 100k lines of product taxonomy data imported from Shopify, ensuring high data integrity during migration.',
      'Developed a scalable architecture by creating over 90+ modular CRUD and RESTful endpoints, utilizing Drizzle ORM for schema validation to ensure secure and efficient PostgreSQL interactions, optimized for high-throughput requests.',
      'Led the integration of Stripe, Shopify, and Shippo through a secure CI/CD pipeline with Docker containerization, enabling seamless e-commerce workflows, high-volume transaction processing, and robust custom shipping solutions.',
    ],
  },
  {
    id: '6',
    company: 'TablePal',
    position: 'Lead Software Engineer',
    duration: 'Q3 2023 - Q4 2024',
    description:
      'Leading a development team to build cloud-native applications using microservices architecture, focusing on scalable deployment and secure API development.',
    technologies: [
      'AWS EKS',
      'Docker',
      'Kubernetes',
      'Jest',
      'JWT',
      'React',
      'Node.js',
    ],
    achievements: [
      'Architected and led a 6-person team in deploying a CI/CD pipeline on AWS EKS, orchestrating Docker-based microservices to automate application delivery and reduce task completion time by 30%.',
      'Engineered a secure API layer by deploying multiple microservices to AWS EKS, routing traffic through an API Gateway that enforced JWT-based authentication and fine-grained Role-Based Access Control (RBAC).',
      'Integrated Jest-based testing harness, increasing backend code coverage from 0% to 80%',
      'Streamlined front end and back end integration by developing over 60 modular UI components that consumed these APIs.',
    ],
  },
  {
    id: '7',
    company: 'Stealth Startup',
    position: 'Software Engineer Intern',
    duration: 'Q2 2023 - Q3 2023',
    description:
      'Building an intelligent chatbot application that provides contextual responses using AI and real-time streaming technology for enhanced user interactions.',
    technologies: [
      'Vue.js',
      'Nuxt.js',
      'Node.js',
      'Supabase',
      'Vector Database',
      'SSE',
    ],
    achievements: [
      'Developed a full-stack AI chatbot, leveraging a Vue/Nuxt front end (SSR) and a Node.js backend with a Supabase vector database to provide context-aware responses, driving 30% increase in site traffic within 2 months.',
      'Implemented a streaming UI using Server-Sent Events (SSE) to deliver AI responses token-by-token, cutting perceived response latency to under 500ms and significantly boosting user session duration.',
    ],
  },
];
