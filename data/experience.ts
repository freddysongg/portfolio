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
    company: 'Guitar Center',
    position: 'Software Engineer',
    duration: 'AUG 2025 - Present',
    description:
      'Building unified AI platforms and multi-agent orchestration systems to serve hundreds of employees across departments, focusing on scalable ML infrastructure and production RAG systems.',
    technologies: [
      'Python',
      'TypeScript',
      'Neo4j',
      'PostgreSQL',
      'pgvector',
      'OpenSearch',
      'Kubernetes',
      'ArgoCD',
      'Helm',
      'OpenTelemetry',
      'Prometheus',
      'Grafana',
      'LangChain',
      'OpenAI API',
      'Model Context Protocol (MCP)',
    ],
    achievements: [
      // 'Architected unified AI platform serving 500+ employees across HR, Engineering, and Sales, reducing quarterly operational expenses by 15% through task automation and unified AI tooling.',
      // 'Engineered multi-agent orchestration system with dynamic workflow routing and multi-intent recognition, leveraging Neo4j for intelligent context window selection while reducing token usage by 32%.',
      // 'Built universal OpenAPI-to-MCP adapter with dynamic tool loading, enabling zero-downtime configuration updates across 15+ API integrations while maintaining O(1) permission lookup through in-memory ACL caching.',
      // 'Architected multi-vector RAG system for 150k+ GC product catalog with hybrid retrieval combining pgvector HNSW and PostgreSQL BM25 full-text indexing for SKU/model matching, and structured metadata filtering (category, price, brand), improving answer accuracy by 35% and reducing outdated product information errors by 28%.',
      // 'Orchestrated Kubernetes deployment via ArgoCD with Helm charts managing multi-environment configurations, implementing OpenTelemetry with Prometheus metrics and Grafana dashboards for 99.8% uptime.',
    ],
  },
  {
    id: '2',
    company: 'FORTIS Lab at USC',
    position: 'Generative AI Research Assistant',
    duration: 'AUG 2025 - Present',
    description:
      'Investigating security vulnerabilities in RAG architectures through systematic attack research, focusing on preference manipulation and retrieval poisoning across multiple LLM backends.',
    technologies: [
      'Python',
      'GPT-4',
      'Claude',
      'Llama',
      'MLflow',
      'RAG',
      'Vector Databases',
      'Prompt Engineering',
    ],
    achievements: [
      // 'Investigated Preference Manipulation Attacks in glass-box RAG architectures, to systematically evaluate retrieval poisoning vulnerabilities across 6+ LLM backends (GPT-4, Claude, Llama), achieving 72-79% Attack Success Rate (ASR) through prompt injection, semantic manipulation, and competitor discreditation techniques.',
      // 'Architected unified benchmarking platform synthesizing multi-stage attack methodologies (Rewrite-to-Rank, Stealth Rank, keyword stuffing) with automated evaluation metrics (recommendation rate, citation frequency, NDCG@k degradation), integrating MLflow experiment tracking across 40+ model-retriever configurations.',
    ],
  },
  {
    id: '3',
    company: 'Air Climate Equity Lab at USC',
    position: 'Deep Learning Research Assistant',
    duration: 'JUN 2025 - AUG 2025',
    description:
      'Developing machine learning models to predict air quality patterns and environmental conditions using deep learning techniques and geospatial data analysis.',
    technologies: [
      'Python',
      'TensorFlow',
      'Keras',
      'CNN-LSTM',
      'GeoPandas',
      'Shapely',
      'MLflow',
      'TensorBoard',
      'NumPy',
      'Pandas',
    ],
    achievements: [
      // 'Created an end-to-end air quality prediction system combining CNN-LSTM deep learning with geospatial analysis, processing 8M+ records to attain 98% predictive accuracy for PM2.5, NO2, and Ozone concentrations across CA.',
      // 'Optimized model performance through advanced feature engineering, applying time-aware data splits, percentile-based outlier handling, and domain-specific spatial features, resulting in 40% accuracy improvement.',
      // 'Developed ML pipeline with comprehensive experiment tracking, integrating MLflow for model versioning, hyperparameter optimization, and artifact management, reducing model deployment time by 60%.',
      // 'Engineered advanced geospatial visualization and analysis tools leveraging GeoPandas and Shapely for high-resolution interpolated surface mapping with geographic boundary masking and spatial bias analysis.',
    ],
  },
  {
    id: '4',
    company: 'Marqui Labs at NASA',
    position: 'Software Engineer',
    duration: 'MAR 2025 - NOV 2025',
    description:
      'Leading development of NASA Ames web platforms and creating AI-powered research tools to help scientists access and analyze internal publications and data.',
    technologies: [
      'React',
      'Python',
      'RAG',
      'Transformers',
      'PostgreSQL',
      'Docker',
      'CSP',
      'HTTPS',
    ],
    achievements: [
      // 'Maintain and modernize NASA Ames public-facing web platforms, serving 30k+ monthly users, while ensuring compatibility with legacy backend systems and compliance with federal cybersecurity protocols.',
      // 'Authored a proposal and built an internal transformer-based RAG search engine for SSERVI team indexing 220k+ internal publications and delivers sub-second answers, improving data access for 100+ researchers.',
      // 'Hardened web applications by integrating CSP hashing, sanitizing user inputs, and enforcing secure HTTPS configurations to mitigate XSS and injection vulnerabilities.',
    ],
  },
  {
    id: '5',
    company: 'switch.ai',
    position: 'Founder',
    duration: 'MAY 2025 - SEPT 2025',
    description:
      'Building an AI-powered platform that provides intelligent search and retrieval capabilities for mechanical keyboard switches using advanced RAG architecture.',
    technologies: [
      'React',
      'TypeScript',
      'LangChain',
      'PostgreSQL',
      'pgvector',
      'Jest',
      'LangSmith',
      'OWASP',
      'CSP',
    ],
    achievements: [
      // 'Engineered a high-performance RAG architecture boosting search recall by 27% and cut LLM hallucinations by 31% by building a custom LangChain BaseRetriever to fuse pgvector (HNSW) with PostgreSQL FTS via Reciprocal Rank Fusion (RRF), a LongContextReorder agent to mitigate context loss, and a LCEL graph.',
      // 'Lowered LLM testing times by 50% by building a CI-integrated Jest/LangChain test harness to automate QA via synthetic query generation, LLM-as-judge grading, and streamlined A/B testing in LangSmith.',
      // 'Secured RAG platform through OWASP-grade input validation, a multi-stage prompt injection defense (instruction filtering, output framing), and strict Content Security Policies to prevent XSS from rendered LLM outputs.',
      // 'Architected a highly maintainable and scalable frontend leveraging React and TypeScript to develop secure, isolated UI components, with a robust authentication flow by enforcing HTTPS-only cookie storage for JWT session management and achieving zero-latency switching across a library of over 100+ pre-rendered application themes.',
    ],
  },
  {
    id: '6',
    company: 'BLNK',
    position: 'Software Engineer',
    duration: 'APR 2024 - AUG 2025',
    description:
      'Developing intelligent search systems for e-commerce platforms and building scalable backend infrastructure to handle product data, payments, and shipping integrations.',
    technologies: [
      'Python',
      'RAG',
      'PostgreSQL',
      'Drizzle ORM',
      'Stripe API',
      'Shopify API',
      'Shippo API',
      'Docker',
      'CI/CD',
    ],
    achievements: [
      // 'Built a multi-stage RAG search engine for 3k+ SKUs, reinforced with OWASP-grade validation and anomaly detection to block prompt-injection exploits.',
      // 'Utilized Python scripts to automate and streamline the end-to-end data pipeline for refining over 100k lines of product taxonomy data imported from Shopify, ensuring high data integrity during migration.',
      // 'Developed a scalable architecture by creating over 90+ modular CRUD and RESTful endpoints, utilizing Drizzle ORM for schema validation to ensure secure and efficient PostgreSQL interactions, optimized for high-throughput requests.',
      // 'Led the integration of Stripe, Shopify, and Shippo through a secure CI/CD pipeline with Docker containerization, enabling seamless e-commerce workflows, high-volume transaction processing, and robust custom shipping solutions.',
    ],
  },
  {
    id: '7',
    company: 'TablePal',
    position: 'Software Engineer',
    duration: 'JUL 2023 - OCT 2024',
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
      'API Gateway',
      'RBAC',
    ],
    achievements: [
      // 'Architected and led a 6-person team in deploying a CI/CD pipeline on AWS EKS, orchestrating Docker-based microservices to automate application delivery and reduce task completion time by 30%.',
      // 'Engineered a secure API layer by deploying multiple microservices to AWS EKS, routing traffic through an API Gateway that enforced JWT-based authentication and fine-grained Role-Based Access Control (RBAC).',
      // 'Integrated Jest-based testing harness, increasing backend code coverage from 0% to 80%.',
      // 'Streamlined front end and back end integration by developing over 60 modular UI components that consumed these APIs.',
    ],
  },
  {
    id: '8',
    company: 'Stealth Startup',
    position: 'Software Engineer Intern',
    duration: 'JUN 2023 - SEPT 2023',
    description:
      'Building an intelligent chatbot application that provides contextual responses using AI and real-time streaming technology for enhanced user interactions.',
    technologies: [
      'Vue.js',
      'Nuxt.js',
      'Node.js',
      'Supabase',
      'Vector Database',
      'SSE',
      'OpenAI API',
    ],
    achievements: [
      // 'Developed a full-stack AI chatbot, leveraging a Vue/Nuxt front end (SSR) and a Node.js backend with a Supabase vector database to provide context-aware responses, driving 30% increase in site traffic within 2 months.',
      // 'Implemented a streaming UI using Server-Sent Events (SSE) to deliver AI responses token-by-token, cutting perceived response latency to under 500ms and significantly boosting user session duration.',
    ],
  },
];
