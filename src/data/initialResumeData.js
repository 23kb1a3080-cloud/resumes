export const initialResumeData = {
  personalInfo: {
    fullName: "SRINIVAS PULIKONDA",
    headline: "Python Developer | Computer Vision | AI & Data Science",
    email: "srinivaspulikonda7997@gmail.com",
    phone: "7680925216",
    location: "Andhra Pradesh, India",
    linkedin: "linkedin.com/in/srinivas-pulikonda-b6b91a300",
    showIcons: true
  },
  summary: {
    title: "Summary",
    content: "Final-year B.Tech student in Computer Science & Engineering (AI & Data Science) with hands-on experience in Python, OpenCV, YOLOv8, NumPy, computer vision, object detection, video processing, Flask, and SQL. Interested in computer vision, AI applications, and practical problem-solving."
  },
  experience: {
    title: "Experience",
    items: [
      {
        id: "exp-1",
        role: "Python / AI Intern",
        company: "Edunet Foundation",
        duration: "4-Week Virtual Internship",
        bullets: [
          "Worked with Python, YOLOv8, OpenCV, dataset preparation, testing, and model evaluation."
        ]
      },
      {
        id: "exp-2",
        role: "Virtual Intern",
        company: "SmartBridge Educational Services Pvt. Ltd.",
        duration: "Vibe Coding, 2 Months / 120 Hours",
        bullets: [
          "Practiced programming, problem-solving, debugging, and real-world application development."
        ]
      }
    ]
  },
  education: {
    title: "Education",
    items: [
      {
        id: "edu-1",
        degree: "B.Tech – Computer Science & Engineering (AI & Data Science),",
        institution: "N.B.K. Institute of Science & Technology (NBKRIST)",
        location: "Andhra Pradesh",
        details: "CGPA: 7.56"
      }
    ]
  },
  skills: {
    title: "Technical Skills",
    categories: [
      {
        id: "skill-1",
        label: "Programming",
        items: "Python, C++ (Basic)"
      },
      {
        id: "skill-2",
        label: "Computer Vision",
        items: "OpenCV, Image Processing, Video Processing, Object Detection"
      },
      {
        id: "skill-3",
        label: "AI/ML",
        items: "YOLOv8, PyTorch (Basic), Machine Learning, Precision, Recall, mAP"
      },
      {
        id: "skill-4",
        label: "Backend",
        items: "Flask, REST APIs"
      },
      {
        id: "skill-5",
        label: "Database",
        items: "SQL"
      },
      {
        id: "skill-6",
        label: "Libraries",
        items: "NumPy"
      },
      {
        id: "skill-7",
        label: "Tools",
        items: "Git, GitHub, VS Code, Google Colab"
      },
      {
        id: "skill-8",
        label: "Concepts",
        items: "Algorithms, Data Structures, Model Evaluation, Debugging"
      }
    ]
  },
  projects: {
    title: "Projects",
    items: [
      {
        id: "proj-1",
        title: "Safety Helmet Detection System",
        tech: "Python, YOLOv8, OpenCV, Flask",
        bullets: [
          "Built a real-time helmet/no-helmet detection system for bike riders.",
          "Used YOLOv8 and OpenCV for object detection and video processing.",
          "Achieved 79.37% Precision, 74.26% Recall, 76.49% mAP50."
        ]
      },
      {
        id: "proj-2",
        title: "NBKRIST AI & DS Department Chatbot",
        tech: "Python, RAG",
        bullets: [
          "Built a chatbot for faculty, timetable, syllabus, and college information.",
          "Implemented document processing and information retrieval."
        ]
      },
      {
        id: "proj-3",
        title: "AgriConnect",
        tech: "Python, SQL, Web Technologies",
        bullets: [
          "Developed an agriculture-focused web application with backend and database integration."
        ]
      }
    ]
  },
  certifications: {
    title: "Certifications",
    items: [
      {
        id: "cert-1",
        title: "Python (Basic)",
        issuer: "HackerRank"
      },
      {
        id: "cert-2",
        title: "AI & Data Analytics / Green Skills",
        issuer: "Edunet Foundation"
      },
      {
        id: "cert-3",
        title: "Vibe Coding",
        issuer: "SmartBridge"
      }
    ]
  },
  activities: {
    title: "Activities",
    content: "IEEE Student Branch | Data Science & Coding Club | Hackathons | Coding Contests | Technical Paper Presentations"
  },
  customSections: []
};

export const defaultStyleSettings = {
  // Page setup
  pageSize: "A4", // A4 or Letter
  pageWidthMm: 210,
  pageHeightMm: 297,
  paddingTopMm: 16,
  paddingBottomMm: 16,
  paddingLeftMm: 18,
  paddingRightMm: 18,

  // Global Typography
  fontFamily: "Inter, Arial, sans-serif",
  baseFontSizePx: 13, // Standard resume body font size
  headerNameSizePx: 26,
  headerSubsizePx: 14,
  sectionTitleSizePx: 16,
  bodyFontSizePx: 13,
  metaFontSizePx: 12,

  // Indentation adjustments requested by user
  leftIndentPx: 0,
  rightIndentPx: 0,
  bulletIndentPx: 16,

  // Spacing & Line Height
  lineHeight: 1.35,
  itemSpacingPx: 6,
  sectionBottomMarginPx: 14,

  // Colors & Divider lines
  textColor: "#000000",
  headingColor: "#000000",
  dividerColor: "#000000",
  dividerThicknessPx: 1.5,
  dividerStyle: "solid", // solid, double, dotted

  // Formatting toggles
  boldName: true,
  boldSectionTitles: true,
  boldItemTitles: true,
  bulletCharacter: "•"
};
