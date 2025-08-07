'use client';

import React, { useState } from 'react';

import { motion } from 'framer-motion';

import { SlideIn } from '@/components/animations/SlideIn';
import { TextReveal } from '@/components/animations/TextReveal';

export function About() {
  const [activeCategory, setActiveCategory] = useState('languages');

  const skillCategories = {
    languages: [
      'Python',
      'JavaScript',
      'TypeScript',
      'Java',
      'HTML/CSS',
      'SQL',
      'R',
      'GraphQL',
    ],
    frameworks: [
      'NumPy',
      'Keras',
      'TensorFlow',
      'PyTorch',
      'Scikit-Learn',
      'Pandas',
      'React',
      'Node.js',
      'Express.js',
      'Astro',
      'Mastra',
      'Fastify',
      'Next.js',
      'Flask',
      'LangChain',
      'Jest',
      'Hugging Face Transformers',
      'WebSockets',
      'Drizzle ORM',
    ],
    tools: [
      'Git',
      'AWS (ECS, EC2, EKS, RDS, SQS)',
      'MongoDB',
      'Firebase',
      'PostgreSQL',
      'Docker',
      'Google Cloud',
      'Hugging Face',
      'RESTful API',
      'Vercel',
      'DataGrip',
      'Jira',
      'Supabase',
      'Kubernetes',
      'Redis',
      'Kafka',
      'Svelte',
      'MLFlow',
      'TensorBoard',
      'Terraform',
    ],
    ml: [
      'Retrieval-Augmented Generation',
      'Semantic Search',
      'Natural Language Processing',
      'Generative AI',
      'Bayesian Optimization',
      'Hyperparameter Tuning',
      'Feature Engineering',
      'CNNs',
      'RNNs (LSTM)',
      'Time Series Models',
      'LLMs (RoBERTa)',
      'MLR',
      'XGBoost',
    ],
  };

  const categoryLabels = {
    languages: 'Languages',
    frameworks: 'Frameworks/Libraries',
    tools: 'Tools/Platforms',
    ml: 'ML Architectures',
  };

  return (
    <section id='about' className='bg-muted/30 py-20'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-6xl'>
          <div className='grid items-start gap-16 lg:grid-cols-2'>
            <div>
              <TextReveal>
                <div className='mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground'>
                  ABOUT
                </div>
              </TextReveal>

              <TextReveal delay={0.2}>
                <h2 className='mb-8 text-4xl font-bold text-foreground md:text-5xl'>
                  Technical Skills Maxing
                </h2>
              </TextReveal>

              <SlideIn delay={0.4}>
                <div className='space-y-6 text-lg leading-relaxed text-muted-foreground'>
                  <p>
                    I&#39;m a fullstack developer who&#39;s deep in the world of
                    AI/ML. My focus is simple: build smart, production-ready
                    applications where the tech feels intuitive and the
                    experience is seamless.
                  </p>
                  <p>
                    From architecting RAG systems that process millions of
                    records to deploying scalable microservices on Kubernetes, I
                    bridge the gap between cutting-edge research and production
                    reality.
                  </p>
                </div>
              </SlideIn>

              {/* Creative Side */}
              <SlideIn delay={0.6}>
                <div className='mt-12 rounded-lg border border-border bg-muted/50 p-6'>
                  <div className='mb-4 flex items-center gap-4'>
                    <motion.img
                      src='/images/dj.png'
                      alt='DJ setup'
                      className='h-16 w-16 object-contain'
                      whileHover={{ rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    />
                    <div>
                      <div className='font-mono text-xs uppercase tracking-wider text-muted-foreground'>
                        CREATIVE OUTLET
                      </div>
                      <div className='text-lg font-semibold text-foreground'>
                        AKA I Touch Grass
                      </div>
                    </div>
                  </div>
                  <p className='text-sm leading-relaxed text-muted-foreground'>
                    When I&#39;m not building agentic systems or the next big
                    B2B SaaS application -- just jokes here I swear --
                    you&#39;ll find me making new mixes at my workstation.
                  </p>
                </div>
              </SlideIn>
            </div>

            <div>
              <SlideIn delay={0.8} direction='right'>
                {/* Category Tabs */}
                <div className='mb-8 flex flex-wrap gap-2 rounded-lg bg-muted/50 p-1'>
                  {Object.keys(skillCategories).map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        activeCategory === category
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
                      }`}
                    >
                      {categoryLabels[category as keyof typeof categoryLabels]}
                    </button>
                  ))}
                </div>
                {/* Skills Grid */}
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className='grid grid-cols-1 gap-3 sm:grid-cols-2'
                >
                  {skillCategories[
                    activeCategory as keyof typeof skillCategories
                  ].map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.05,
                        type: 'spring',
                        stiffness: 200,
                      }}
                      whileHover={{
                        scale: 1.02,
                        y: -2,
                        transition: { duration: 0.2 },
                      }}
                      className='group cursor-pointer rounded-lg border border-border bg-background p-4 transition-all duration-200 hover:border-primary/50 hover:shadow-sm'
                    >
                      <div className='text-sm font-medium text-foreground transition-colors group-hover:text-primary'>
                        {skill}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </SlideIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
