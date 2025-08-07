export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  link?: string;
  github?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'PHiLIP - AI Image Generation Platform',
    description:
      'A personalized AI image generation platform that allows users to create custom artwork with multiple style variations and high-quality upscaling capabilities using advanced diffusion models.',
    category: 'Generative AI',
    tags: ['PyTorch', 'Stable Diffusion', 'ControlNet', 'AMD ROCm', 'PixArt'],
    image: '/images/philip.png?height=400&width=600',
    link: 'https://www.hackster.io/engineers-ucr/philip-personalized-human-in-loop-image-production-c6e10d',
    github: 'https://github.com/freddysongg/PHiLIP-Frontend',
    featured: true,
  },
  {
    id: '2',
    title: 'cafeXpress - Hybrid Recommendation Engine',
    description:
      'A smart cafe discovery platform that recommends coffee shops based on user preferences, location, and sentiment analysis of reviews using semantic search and geospatial filtering.',
    category: 'Fullstack + AI/ML',
    tags: [
      'TypeScript',
      'PostgreSQL',
      'PostGIS',
      'Redis',
      'Semantic Search',
      'Embeddings',
    ],
    image: '/images/cafexpress.png?height=400&width=600',
    github: 'https://github.com/freddysongg/cafeXpress',
    featured: true,
  },
  {
    id: '3',
    title: 'MafWays - Mathematical Symbol Recognition',
    description:
      'A computer vision application that recognizes and interprets handwritten mathematical symbols and equations using deep learning neural networks for educational and accessibility purposes.',
    category: 'Computer Vision + Deep Learning',
    tags: [
      'CNNs',
      'TensorFlow',
      'Keras',
      'Computer Vision',
      'Image Recognition',
    ],
    image: '/images/math.png?height=400&width=600',
    github: 'https://github.com/freddysongg/MafWays',
    featured: true,
  },
  {
    id: '4',
    title: 'Climate Changer - Data Visualization Platform',
    description:
      'An interactive web platform that visualizes climate data trends and environmental changes through dynamic charts and graphs, helping users understand climate patterns over time.',
    category: 'Data Science',
    tags: ['R', 'Docker', 'Kubernetes', 'CI/CD', 'ggplot2', 'Plotly'],
    image: '/images/climate.png?height=400&width=600',
    github: 'https://github.com/freddysongg/Climate-Changer',
    featured: true,
  },
  {
    id: '5',
    title: 'CafeCast - Time Series Forecasting',
    description:
      'A predictive analytics tool that forecasts cafe business trends and customer patterns using advanced time series analysis and machine learning models to help businesses make data-driven decisions.',
    category: 'Machine Learning',
    tags: [
      'ARIMA',
      'LSTM',
      'Time-Series Transformers',
      'Bayesian Optimization',
      'Pandas',
    ],
    image: '/images/placeholder.svg?height=400&width=600',
    github: 'https://github.com/freddysongg/CafeCast',
    featured: true,
  },
];
