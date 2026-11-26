/**
 * Customize everything in this file to make the portfolio yours!
 * Replace placeholder details (name, college, links, projects, etc.) with your own.
 */

export const PROFILE = {
  name: 'Chandra Mouli',
  initials: 'Neelathi',
  role: 'B.Tech Information Technology Student',
  yearBadge: '2nd Year • Sem 3–4',
  availability: 'Open to Sumīīmer Internships & Hackathons',
  location: 'India',
  college: 'Your Institute of Technology',
  headline: 'Curious builder turning IT fundamentals into warm, useful software.',
  bio: "I'm a second-year B.Tech Information Technology student passionate about full-stack web development, problem-solving with Data Structures & Algorithms, and designing clean interfaces people actually enjoy using.",
  aboutExtra:
    'Right now I am strengthening my foundations in DBMS, Operating Systems, and OOP while shipping React & Node.js side projects with friends and participating in campus hackathons.',
  email: 'neelathimouli@gmail.com',
  github: 'https://github.com/mouli213',
  linkedin: 'https://linkedin.com/in/yourusername',
  resumeUrl: '#contact', // Replace with Google Drive / PDF link when ready
  quickFacts: [
    { label: 'Degree', value: 'B.Tech IT (2024–2028)' },
    { label: 'Current Focus', value: 'React, Node.js & DSA' },
    { label: 'Core Subjects', value: 'DBMS, OS, OOP, CN' },
    { label: 'Looking For', value: '2026/27 Internships' },
  ],
  currentlyLearning: ['TypeScript', 'PostgreSQL', 'Graph Algorithms', 'System Design Basics'],
};

export const PROJECT_CATEGORIES = ['All', 'Web Dev', 'Core CS / DSA', 'Mini Apps'];

export const PROJECTS = [
  {
    id: 'campus-sync',
    title: 'CampusSync — Study Notes & Peer Hub',
    category: 'Web Dev',
    tagline: 'A centralized space for B.Tech IT classmates to share semester notes, PYQs, and lab manuals.',
    description:
      'Built to replace scattered WhatsApp PDFs before exams. Students can browse subjects by semester, bookmark key topics, and upvote helpful resources.',
    tech: ['React', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    highlight: 'Organized 60+ semester notes & lab guides across 5 IT subjects',
    accent: 'terracotta',
    github: 'https://github.com/mouli213/campus-sync',
    demo: '#',
    details: {
      problem:
        'During mid-sems, classmates struggled to find updated syllabus notes and previous year question papers buried in group chats.',
      solution:
        'Designed a clean subject-first directory with instant search, semester filters, and quick preview cards.',
      learned: [
        'Structuring REST APIs and handling pagination cleanly',
        'Designing accessible, mobile-friendly filterable UIs',
        'Collaborating with 2 batchmates via Git branches & PRs',
      ],
    },
  },
  {
    id: 'algo-viz',
    title: 'AlgoCanvas — Interactive DSA Visualizer',
    category: 'Core CS / DSA',
    tagline: 'Step-by-step visual playground for sorting, binary search, and BFS/DFS pathfinding.',
    description:
      'Created while studying 2nd-year Data Structures to visually trace how pointer swaps, recursion trees, and graph queues behave in real time.',
    tech: ['JavaScript', 'React', 'CSS Grid', 'Algorithms'],
    highlight: 'Supports 6 algorithms with adjustable speed & step-by-step pause mode',
    accent: 'sage',
    github: 'https://github.com/mouli213/algocanvas',
    demo: '#',
    details: {
      problem:
        'Dry-running recursion and graph traversals on paper made it tough to build intuition for time-complexity trade-offs.',
      solution:
        'Implemented an animation queue that highlights comparisons, swaps, and visited nodes alongside pseudocode.',
      learned: [
        'Deepened intuition for Merge Sort, Quick Sort, and BFS/DFS',
        'Managing React animation timers cleanly without memory leaks',
        'Writing modular, pure algorithm generator functions',
      ],
    },
  },
  {
    id: 'mess-split',
    title: 'SplitBite — Hostel & Group Expense Tracker',
    category: 'Mini Apps',
    tagline: 'Friendly bill-splitting web app for hostel outings, canteen runs, and hackathon trips.',
    description:
      'Lets small student groups log shared expenses, split unevenly or equally, and calculate the minimum number of UPI settlements needed.',
    tech: ['React', 'LocalStorage', 'Tailwind CSS', 'Greedy Algo'],
    highlight: 'Reduces n-person debt chains using a greedy net-balance settlement algorithm',
    accent: 'amber',
    github: 'https://github.com/mouli213/splitbite',
    demo: '#',
    details: {
      problem:
        'Tracking small daily canteen and travel expenses among 5–6 hostel friends always ended in confusing math at month-end.',
      solution:
        'Built an offline-first expense ledger that simplifies who owes whom in one tap.',
      learned: [
        'Applying greedy heap/two-pointer logic to real-world cashflow minimization',
        'Persisting client state gracefully with schema versioning in LocalStorage',
        'Creating warm, friction-free form UX on mobile screens',
      ],
    },
  },
  {
    id: 'dbms-query-pad',
    title: 'SQLite Mini Query Workbench',
    category: 'Core CS / DSA',
    tagline: 'Browser-based SQL practice pad aligned with 2nd-year B.Tech DBMS lab exercises.',
    description:
      'A lightweight sandbox loaded with sample student/library schemas so learners can test JOINs, GROUP BY, and nested queries right in the browser.',
    tech: ['JavaScript', 'SQL', 'HTML/CSS', 'DBMS'],
    highlight: 'Includes 15+ guided DBMS lab practice prompts and schema explorer',
    accent: 'terracotta',
    github: 'https://github.com/mouli213/sql-practice-pad',
    demo: '#',
    details: {
      problem:
        'Setting up local SQL servers before every lab session was slow for quick query revision.',
      solution:
        'Packaged interactive tables, query presets, and clean tabular output into a single responsive workspace.',
      learned: [
        'Relational schema normalization (1NF–3NF) and foreign-key constraints',
        'Handling syntax error states clearly for learners',
        'Keyboard-first developer ergonomics (Ctrl+Enter to run)',
      ],
    },
  },
];

export const SKILL_GROUPS = [
  {
    title: 'Languages',
    subtitle: 'Daily drivers for DSA & coursework',
    items: [
      { name: 'Java', level: 'Comfortable' },
      { name: 'C / C++', level: 'Comfortable' },
      { name: 'JavaScript (ES6+)', level: 'Comfortable' },
      { name: 'Python', level: 'Building' },
      { name: 'SQL', level: 'Building' },
    ],
  },
  {
    title: 'Web & App Stack',
    subtitle: 'Building responsive, full-stack products',
    items: [
      { name: 'React.js', level: 'Comfortable' },
      { name: 'Tailwind CSS', level: 'Comfortable' },
      { name: 'HTML5 & CSS3', level: 'Comfortable' },
      { name: 'Node.js & Express', level: 'Building' },
      { name: 'MongoDB', level: 'Exploring' },
    ],
  },
  {
    title: 'Core IT Foundations',
    subtitle: 'B.Tech Information Technology curriculum',
    items: [
      { name: 'Data Structures & Algorithms', level: 'Comfortable' },
      { name: 'Object-Oriented Programming', level: 'Comfortable' },
      { name: 'Database Management (DBMS)', level: 'Building' },
      { name: 'Operating Systems', level: 'Exploring' },
      { name: 'Computer Networks', level: 'Exploring' },
    ],
  },
  {
    title: 'Tools & Workflow',
    subtitle: 'Shipping, debugging, and collaborating',
    items: [
      { name: 'Git & GitHub', level: 'Comfortable' },
      { name: 'VS Code', level: 'Comfortable' },
      { name: 'Linux / CLI', level: 'Building' },
      { name: 'Postman', level: 'Building' },
      { name: 'Figma', level: 'Exploring' },
    ],
  },
];

export const TIMELINE = [
  {
    period: '2025 – Present',
    type: 'Education',
    title: 'B.Tech in Information Technology (2nd Year)',
    organization: 'Your Institute of Technology',
    summary:
      'Currently in 2nd year exploring core IT subjects—DSA, DBMS, Computer Organization, and Discrete Mathematics—while building practical web projects outside class.',
    tags: ['CGPA: 8.7/10 (Placeholder)', 'IT Department', 'Active Coder'],
  },
  {
    period: 'Oct 2025',
    type: 'Hackathon',
    title: 'Smart Campus Hackathon — Finalist Team',
    organization: 'Annual Tech Fest',
    summary:
      'Collaborated in a 4-member team over 36 hours to prototype CampusSync, owning the React frontend and user-flow design from wireframe to demo.',
    tags: ['36-Hr Sprint', 'Frontend Lead', 'Team Collaboration'],
  },
  {
    period: 'Mar 2025 – Present',
    type: 'Community',
    title: 'Web & Tech Member — Student Developer Club',
    organization: 'Campus Coding Society',
    summary:
      'Co-hosted beginner HTML/CSS/Git workshops for 1st-year juniors and contributed UI fixes to internal event-registration pages.',
    tags: ['Peer Mentorship', 'Git Workshops', 'Open Source'],
  },
  {
    period: 'Aug 2024',
    type: 'Milestone',
    title: 'Started B.Tech IT & First Programming Journey',
    organization: 'Semester 1–2 Foundation',
    summary:
      'Wrote my first C programs, discovered the joy of turning static ideas into interactive web pages, and built a consistent problem-solving habit.',
    tags: ['C Programming', 'HTML/CSS', 'Problem Solving'],
  },
];
