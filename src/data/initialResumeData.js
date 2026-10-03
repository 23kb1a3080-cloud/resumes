export const initialResumeData = {
  personalInfo: {
    fullName: "SRINIVAS PULIKONDA",
    headline: "B.Tech – Computer Science & Engineering",
    subHeadline: "Aspiring Software Developer | Problem Solver | Quick Learner",
    email: "srinivaspulikonda7997@gmail.com",
    phone: "+91 7680925216",
    location: "Andhra Pradesh, India",
    linkedin: "linkedin.com/in/srinivas-pulikonda-b6b91a300",
    github: "github.com/srinivaspulikonda",
    showIcons: true
  },
  summary: {
    title: "CAREER OBJECTIVE",
    content: "Motivated and enthusiastic Computer Science graduate seeking an entry-level software development role to apply my programming, problem-solving and technical skills while contributing to the growth of the organization."
  },
  experience: {
    title: "INTERNSHIP / TRAINING",
    items: [
      {
        id: "exp-1",
        role: "Software Development Intern",
        company: "ABC Technologies",
        duration: "Jun 2024 – Jul 2024",
        bullets: [
          "Assisted in developing and testing application features.",
          "Worked with Git and participated in code reviews.",
          "Learned practical software development and debugging practices."
        ]
      },
      {
        id: "exp-2",
        role: "Python / AI Virtual Intern",
        company: "Edunet Foundation",
        duration: "4-Week Virtual Internship",
        bullets: [
          "Worked with Python, YOLOv8, OpenCV, dataset preparation, testing, and model evaluation."
        ]
      }
    ]
  },
  education: {
    title: "EDUCATION",
    items: [
      {
        id: "edu-1",
        degree: "B.Tech – Computer Science & Engineering",
        institution: "ABC College of Engineering, XYZ University",
        location: "2022 – 2026",
        details: "CGPA: 8.5 / 10"
      },
      {
        id: "edu-2",
        degree: "Intermediate (12th)",
        institution: "Sri Chaitanya Junior College, Hyderabad",
        location: "2020 – 2022",
        details: "Percentage: 92%"
      },
      {
        id: "edu-3",
        degree: "SSC (10th)",
        institution: "ZP High School, Hyderabad",
        location: "2019 – 2020",
        details: "Percentage: 95%"
      }
    ]
  },
  skills: {
    title: "TECHNICAL SKILLS",
    categories: [
      {
        id: "skill-1",
        label: "Programming Languages",
        items: "Java, Python, C"
      },
      {
        id: "skill-2",
        label: "Web Technologies",
        items: "HTML, CSS, JavaScript"
      },
      {
        id: "skill-3",
        label: "Database",
        items: "MySQL, MongoDB"
      },
      {
        id: "skill-4",
        label: "Tools & Technologies",
        items: "Git, GitHub, VS Code"
      },
      {
        id: "skill-5",
        label: "Core Concepts",
        items: "OOP, DBMS, Data Structures, Operating Systems"
      }
    ]
  },
  projects: {
    title: "PROJECTS",
    items: [
      {
        id: "proj-1",
        title: "Student Management System",
        tech: "",
        duration: "Jan 2025 – Mar 2025",
        bullets: [
          "Developed a student management application using Java and MySQL.",
          "Implemented student registration, record management, search and update functionality.",
          "Designed database tables and SQL queries for efficient data management."
        ]
      },
      {
        id: "proj-2",
        title: "Personal Portfolio Website",
        tech: "",
        duration: "Aug 2024 – Oct 2024",
        bullets: [
          "Created a responsive portfolio website using HTML, CSS and JavaScript.",
          "Added sections for education, skills, projects and contact information.",
          "Hosted the project using GitHub Pages."
        ]
      }
    ]
  },
  certifications: {
    title: "CERTIFICATIONS",
    items: [
      {
        id: "cert-1",
        title: "Python Programming",
        issuer: "Coursera"
      },
      {
        id: "cert-2",
        title: "SQL Fundamentals",
        issuer: "HackerRank"
      },
      {
        id: "cert-3",
        title: "Java Programming",
        issuer: "Udemy"
      }
    ]
  },
  achievements: {
    title: "ACHIEVEMENTS",
    bullets: [
      "Participated in College-level Hackathon (Smart India Hackathon – Internal).",
      "Completed 150+ coding problems on LeetCode.",
      "Secured 2nd position in Technical Quiz at College Fest."
    ]
  },
  softSkills: {
    title: "SOFT SKILLS",
    items: "Problem Solving  |  Communication  |  Teamwork  |  Adaptability  |  Time Management"
  },
  declaration: {
    show: true,
    text: "I hereby declare that the information provided above is true and correct to the best of my knowledge."
  },
  activities: {
    title: "Activities",
    content: "IEEE Student Branch | Data Science & Coding Club | Hackathons | Coding Contests"
  },
  customSections: []
};

export const defaultStyleSettings = {
  // Template Choice: "blue_modern" (User Requested Template) or "classic"
  templateId: "blue_modern",

  // Page setup
  pageSize: "A4", // A4 or Letter
  pageWidthMm: 210,
  pageHeightMm: 297,
  paddingTopMm: 14,
  paddingBottomMm: 14,
  paddingLeftMm: 16,
  paddingRightMm: 16,

  // Global Typography
  fontFamily: "Inter, Arial, sans-serif",
  baseFontSizePx: 12.5,
  headerNameSizePx: 26,
  headerSubsizePx: 13.5,
  sectionTitleSizePx: 14.5,
  bodyFontSizePx: 12.5,
  metaFontSizePx: 11.5,

  // Indentation
  leftIndentPx: 0,
  rightIndentPx: 0,
  bulletIndentPx: 16,

  // Spacing & Line Height
  lineHeight: 1.35,
  itemSpacingPx: 6,
  sectionBottomMarginPx: 12,

  // Colors & Themes
  primaryColor: "#0f2b5c", // Deep Navy Blue accent from screenshot
  badgeBgColor: "#e8f0fe", // Light Blue Badge background from screenshot
  textColor: "#1e293b",
  headingColor: "#0f2b5c",
  dividerColor: "#0f2b5c",
  dividerThicknessPx: 1.5,
  dividerStyle: "solid",

  // Formatting toggles
  boldName: true,
  boldSectionTitles: true,
  boldItemTitles: true,
  bulletCharacter: "•"
};
