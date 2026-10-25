/**
 * Single source of truth for the whole portfolio.
 * Edit text, links and lists here — no component changes needed.
 * Leave a link as "" to hide its button automatically.
 */
const base = import.meta.env.BASE_URL

export const site = {
  name: 'Chandrakant Patil',
  initials: 'CP',
  location: 'Belagavi, Karnataka',
  email: 'chandrakantpatil08112006@gmail.com',
  // Photo lives in /public/photo.jpg — swap the file to change it
  photo: `${base}photo.jpg`,
  resume: { href: `${base}Chandrakant_Patil_Resume.pdf`, filename: 'Chandrakant_Patil_Resume.pdf' },

  links: {
    github: 'https://github.com/chandrakantpatil-08112006',
    linkedin: 'https://linkedin.com/in/chandrakant-patil-884888330',
    leetcode: 'https://leetcode.com/u/Chandrakantpatil',
  },

  availability: 'Open to ML internships and SDE roles',

  hero: {
    greeting: 'Hi, I’m',
    roleLead: 'I’m',
    roles: ['an AI-powered full-stack developer', 'a MERN stack builder', 'an AIML enthusiast', 'a DSA problem solver'],
    description:
      'Third-year CSE (AI & ML) student who builds AI-powered full-stack web applications with the MERN stack and machine learning in Python, and keeps his problem-solving sharp with 250+ LeetCode problems.',
    // The JSON card on the hero. `tools` is pulled from the Tools skills group below.
    profileJson: {
      role: 'AI-Powered Full Stack & AIML',
      focus: 'AI-powered web applications',
      degree: 'B.E. CSE (AI & ML)',
      cgpa: 9.39,
      openTo: 'ML Internships & SDE Roles',
    },
  },

  about: {
    heading: 'I build things people can actually use, then make them hold up.',
    paragraphs: [
      'I’m a Computer Science undergraduate specializing in Artificial Intelligence and Machine Learning at Gogte Institute of Technology, with a strong base in data structures and algorithms, object-oriented programming and software development.',
      'My day-to-day is AI-powered full-stack web work with React.js, Node.js, Express.js and databases. I like thinking through authentication, permissions and data models before a single screen is drawn, because that is what keeps a product maintainable as it grows.',
      'I’m looking for an ML internship or an SDE role where I can build AI-powered products, contribute to scalable software and learn from an engineering team.',
    ],
    facts: [
      { label: 'CGPA', value: '9.39' },
      { label: 'LeetCode solved', value: '250+' },
      { label: 'Webathon teams beaten', value: '70+' },
      { label: 'Graduating', value: '2028' },
    ],
  },

  skills: [
    { group: 'Languages', icon: 'Braces', items: ['C', 'C++', 'Python', 'JavaScript', 'SQL'] },
    { group: 'Frontend', icon: 'Layers', items: ['HTML', 'CSS', 'React.js', 'Redux Toolkit', 'Tailwind CSS'] },
    { group: 'Backend & APIs', icon: 'Server', items: ['Node.js', 'Express.js', 'REST APIs'] },
    { group: 'Databases', icon: 'Database', items: ['MongoDB', 'MySQL'] },
    { group: 'Core CS', icon: 'Binary', items: ['DSA', 'OOP', 'DBMS', 'CN'] },
    { group: 'AI / ML', icon: 'Cpu', items: ['Machine Learning', 'scikit-learn', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Model Evaluation'] },
    { group: 'Tools', icon: 'Wrench', items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Jupyter Notebook', 'Google Colab'] },
  ],

  // Each project renders as a featured card. `demo` picks the interactive preview: 'projectforge' | 'gesture'.
  projects: [
    {
      name: 'ProjectForge',
      badge: 'Featured project',
      demo: 'projectforge',
      tagline: 'A developer collaboration platform',
      summary:
        'Developers publish project ideas, discover projects that match their skills, and apply for roles. Owners review applications and build a team, then run the work together in a shared workspace.',
      stack: ['React.js', 'Redux Toolkit', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
      highlights: [
        'Authentication, protected routes, user profiles and a personal dashboard',
        'Role-based applications: apply, withdraw, track status, owner accept or reject',
        'Team management with backend-enforced permissions',
        'Project workspace with a Kanban board, priorities and deadlines',
        'Persistent in-app notifications and real-time team chat built on Socket.IO',
        'Forms handled with React Hook Form and Zod validation',
      ],
      // Add real links when you have them, e.g. repo: 'https://github.com/…'
      repo: '',
      live: '',
      // Add real screenshots to /public/screenshots and list them, e.g.
      // screenshots: [{ src: `${base}screenshots/dashboard.png`, alt: 'ProjectForge dashboard' }]
      screenshots: [],
    },
    {
      name: 'Gesture-Controlled Mouse',
      badge: 'Real-time project',
      demo: 'gesture',
      tagline: 'Control the cursor with your hand',
      summary:
        'A gesture-controlled mouse system that turns hand movement from a live webcam feed into cursor actions, tuned for low latency and responsive interaction.',
      stack: ['Python', 'OpenCV', 'MediaPipe'],
      highlights: [
        'Processes real-time video input from a webcam',
        'Translates hand gestures into cursor actions',
        'Efficient tracking and gesture-recognition logic',
        'Built for low latency and responsive interaction',
      ],
      repo: '',
      live: '',
      screenshots: [],
    },
  ],

  education: [
    {
      school: 'Gogte Institute of Technology',
      place: 'Belagavi, Karnataka',
      degree: 'Bachelor of Engineering in Computer Science (AI & ML)',
      period: '2024 – 2028',
      score: 'CGPA 9.39',
    },
    {
      school: 'KLE’s G I Bagewadi College',
      place: 'Nippani',
      degree: 'XII, State Board',
      period: '2024',
      score: '95.8%',
    },
    {
      school: 'S S (K) Patil English Medium School',
      place: 'Sankeshwar',
      degree: 'X, State Board',
      period: '2022',
      score: '97.7%',
    },
  ],

  // Research paper presented at an international IEEE conference.
  // Certificate files live in /public/certificates/ (image = preview, pdf = download button).
  research: {
    badge: 'Research',
    title: 'Research paper presented at IEEE ICONAT 2026',
    paperTitle: 'Spatiotemporal Data Analysis for Intelligent Traffic Congestion Prediction through Machine Learning Models',
    text: 'Participated in and presented this paper at an international IEEE conference, with IEEE Maharashtra Section as technical co-sponsor, and received a Certificate of Participation.',
    conference: '5th IEEE International Conference for Advancement in Technology (ICONAT 2026)',
    location: 'Rajarambapu Institute of Technology, Rajaramnagar',
    year: '21–22 September 2026',
    certificate: {
      file: 'ieee-certificate.jpg',
      pdf: 'ieee-certificate.pdf',
      alt: 'IEEE ICONAT 2026 Certificate of Participation awarded to Chandrakant Patil',
    },
  },

  // Featured card shown directly below `research` (same layout). Certificate file lives in /public/certificates/.
  webathon: {
    badge: 'Competition',
    tag: 'Runner-up',
    title: 'Webathon Runner-up at TECHNOTSAV 2K26',
    text: 'Placed runner-up in the national-level webathon among 70+ teams, and received a Certificate of Participation.',
    conference: 'TECHNOTSAV 2K26 · National Level Technical Event',
    location: 'D. Y. Patil College of Engineering and Technology, Kolhapur',
    year: '15–16 April 2026',
    certificate: {
      file: 'technotsav-certificate.jpg',
      alt: 'TECHNOTSAV 2K26 Certificate of Participation for the Webathon runner-up, awarded to Chandrakant Patil',
    },
  },

  achievements: [
    {
      icon: 'Trophy',
      title: 'Runner-up, TECHNOTSAV 2K26',
      text: 'National-level webathon at D. Y. Patil College of Engineering and Technology, Kolhapur. Competed among 70+ teams.',
    },
    {
      icon: 'Code2',
      title: '250+ LeetCode problems',
      text: 'Solved with data structures and algorithms in C++.',
    },
    {
      icon: 'Users',
      // Resume lists "Technical Head". Set this to match your actual role.
      title: 'Technical Team Member, AAIE',
      text: 'Contribute to technical initiatives, workshops and AI/ML activities for the Association of Artificial Intelligence Engineers.',
    },
  ],

  certifications: [
    { title: 'Anthropic AI Fluency', issuer: 'Anthropic' },
    { title: 'Google AI Professional Certificate', issuer: 'Coursera' },
    { title: 'API Testing Using REST Assured', issuer: 'Coursera' },
    { title: 'IBM Full Stack using JS Professional Certificate', issuer: 'Coursera' },
    { title: 'Data Analysis Job Simulation', issuer: 'Deloitte' },
    { title: 'AI-driven Full Stack Course', issuer: 'KLS Gogte Institute of Technology' },
  ],

  leetcode: {
    solved: 250,
    language: 'C++',
    note: 'Consistent problem-solving practice with data structures and algorithms, written in C++.',
    // Topic names link to LeetCode's tag pages. No counts shown on purpose.
    topics: [
      {
        level: 'Advanced',
        color: '#d97706',
        items: [
          { name: 'Dynamic Programming', slug: 'dynamic-programming' },
          { name: 'Backtracking', slug: 'backtracking' },
          { name: 'Monotonic Stack', slug: 'monotonic-stack' },
          { name: 'Divide and Conquer', slug: 'divide-and-conquer' },
          { name: 'Union-Find', slug: 'union-find' },
        ],
      },
      {
        level: 'Intermediate',
        color: '#4f46e5',
        items: [
          { name: 'Hash Table', slug: 'hash-table' },
          { name: 'Binary Tree', slug: 'binary-tree' },
          { name: 'Depth-First Search', slug: 'depth-first-search' },
          { name: 'Breadth-First Search', slug: 'breadth-first-search' },
          { name: 'Binary Search', slug: 'binary-search' },
        ],
      },
      {
        level: 'Fundamental',
        color: '#0d9488',
        items: [
          { name: 'Array', slug: 'array' },
          { name: 'String', slug: 'string' },
          { name: 'Two Pointers', slug: 'two-pointers' },
          { name: 'Stack', slug: 'stack' },
          { name: 'Linked List', slug: 'linked-list' },
        ],
      },
    ],
  },

  contact: {
    heading: 'Let’s talk about an ML internship or SDE role.',
    text: 'Email is the best way to reach me. I’m happy to talk about ML internships, SDE roles or projects.',
  },

  nav: [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'leetcode', label: 'LeetCode' },
    { id: 'contact', label: 'Contact' },
  ],
}
