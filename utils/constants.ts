export const PERSONAL_INFO = {
  name: 'FREDDY SONG',
  title: 'Fullstack + AI/ML',
  email: 'fredsong99@gmail.com',
  linkedin: 'https://www.linkedin.com/in/freddysong/',
  github: 'https://github.com/freddysongg',
  resumeLink:
    'https://drive.google.com/file/d/1c6mxasStYg4xHQlIaLTLsZynI4ps5Esp/view?usp=sharing',
  domain: 'freddysongg.me',
};

export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  },
  slideUp: {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  },
  textReveal: {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  },
};
