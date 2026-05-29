// Content data for the portfolio. Edit these arrays to update the site —
// the DOM is rendered from them in main.ts.
//
// Images are imported (not written as string paths) so Bun bundles them and
// serves them in dev as well as build. Drop new files in /images and import
// them here the same way.

// Project images
import weatherVImg from "../images/weatherV.png";
import dictionaryImg from "../images/dictionary.png";
import weatherImg from "../images/weather.png";
import todoImg from "../images/todo.png";
import matImg from "../images/mat.png";

// Sports photos
import tennis1 from "../images/sports/tennis-1.jpg";
import tennis2 from "../images/sports/tennis-2.jpg";
import tennis3 from "../images/sports/tennis-3.jpg";
import yoga1 from "../images/sports/yoga-1.jpg";
import yoga2 from "../images/sports/yoga-2.jpg";
import yoga3 from "../images/sports/yoga-3.jpg";
import yoga4 from "../images/sports/yoga-4.jpg";
import yoga5 from "../images/sports/yoga-5.jpg";
import yoga6 from "../images/sports/yoga-6.jpg";

export interface Skill {
  name: string;
  /** Font Awesome icon classes, e.g. "fa-solid fa-brain" or "fa-brands fa-python" */
  icon: string;
  /** Featured skills get a subtle highlight in the grid */
  featured?: boolean;
}

export interface SkillGroup {
  title: string;
  /** Font Awesome icon for the group header */
  icon: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "AI & Agents",
    icon: "fa-solid fa-robot",
    skills: [
      {
        name: "Artificial Intelligence",
        icon: "fa-solid fa-brain",
        featured: true,
      },
      {
        name: "Prompt Engineering",
        icon: "fa-solid fa-wand-magic-sparkles",
        featured: true,
      },
      { name: "Prompt Writing", icon: "fa-solid fa-pen-nib" },
      {
        name: "Model Context Protocol (MCP)",
        icon: "fa-solid fa-plug",
        featured: true,
      },
      { name: "Claude Agent SDK", icon: "fa-solid fa-diagram-project" },
      { name: "Claude Skills", icon: "fa-solid fa-puzzle-piece" },
      { name: "Cursor AI", icon: "fa-solid fa-i-cursor" },
    ],
  },
  {
    title: "Languages & Frameworks",
    icon: "fa-solid fa-code",
    skills: [
      { name: "Python", icon: "fa-brands fa-python", featured: true },
      {
        name: "JavaScript / TypeScript",
        icon: "fa-brands fa-js",
        featured: true,
      },
      { name: "React.js", icon: "fa-brands fa-react", featured: true },
      { name: "Next.js", icon: "fa-solid fa-layer-group" },
      { name: "Nest.js", icon: "fa-solid fa-cube" },
    ],
  },
  {
    title: "Architecture & Backend",
    icon: "fa-solid fa-sitemap",
    skills: [
      {
        name: "System Architecture",
        icon: "fa-solid fa-sitemap",
        featured: true,
      },
      { name: "Web Caching", icon: "fa-solid fa-bolt" },
      { name: "Authentication Systems", icon: "fa-solid fa-lock" },
      { name: "Automation", icon: "fa-solid fa-gears" },
      { name: "Process Automation", icon: "fa-solid fa-arrows-spin" },
    ],
  },
  {
    title: "Cloud & Infrastructure",
    icon: "fa-solid fa-cloud",
    skills: [
      {
        name: "Amazon Web Services (AWS)",
        icon: "fa-brands fa-aws",
        featured: true,
      },
      { name: "Amazon S3", icon: "fa-solid fa-box-archive" },
      { name: "Cloudflare", icon: "fa-brands fa-cloudflare" },
      { name: "Grafana", icon: "fa-solid fa-chart-line" },
      { name: "Doppler", icon: "fa-solid fa-key" },
    ],
  },
  {
    title: "Tools & Analytics",
    icon: "fa-solid fa-toolbox",
    skills: [
      { name: "Amplitude Analytics", icon: "fa-solid fa-chart-simple" },
      { name: "Notion", icon: "fa-solid fa-note-sticky" },
      { name: "TablePlus", icon: "fa-solid fa-table" },
      { name: "Autotesting", icon: "fa-solid fa-vial-circle-check" },
    ],
  },
  {
    title: "Craft & Process",
    icon: "fa-solid fa-compass-drafting",
    skills: [
      { name: "Tech Interviews", icon: "fa-solid fa-comments" },
      { name: "Problem Finding", icon: "fa-solid fa-magnifying-glass" },
    ],
  },
];

export interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

export const projects: Project[] = [
  {
    title: "Weather App",
    description:
      "A weather forecast app built with advanced HTML, CSS, JavaScript and a live weather API. Check the forecast for your current location.",
    tags: ["JavaScript", "API", "Bootstrap"],
    image: weatherVImg,
    link: "https://ephemeral-mooncake-c2733d.netlify.app/",
  },
  {
    title: "Dictionary App",
    description:
      "My first React project — a dictionary powered by a definitions API and an image API, with all the building blocks of a real React app.",
    tags: ["React", "API", "Hooks"],
    image: dictionaryImg,
    link: "https://imaginative-froyo-18be06.netlify.app/",
  },
  {
    title: "Weather App — React",
    description:
      "The weather app rebuilt in React with a live API and a polished, more advanced interface and CSS.",
    tags: ["React", "API", "CSS"],
    image: weatherImg,
    link: "https://eloquent-sorbet-b4d104.netlify.app/",
  },
  {
    title: "Todo App",
    description:
      "A todo app built with React and TypeScript using localStorage. Create, edit, toggle and delete todos that persist between sessions.",
    tags: ["React", "TypeScript", "localStorage"],
    image: todoImg,
    link: "https://mariiamonakhova.github.io/todo-app_local-storage/",
  },
  {
    title: "MAT Museum Landing Page",
    description:
      "A pixel-perfect landing page built from a design using HTML, SCSS, BEM, CSS grid & flexbox, with form and link handling.",
    tags: ["HTML", "SCSS", "BEM"],
    image: matImg,
    link: "https://mariiamonakhova.github.io/MAT_landing-page/",
  },
];

export interface SportSlide {
  title: string;
  caption: string;
  /** Font Awesome icon shown on the slide / fallback */
  icon: string;
  /** Drop your photos into images/sports/ to replace the placeholders */
  image: string;
}

export const sportSlides: SportSlide[] = [
  {
    title: "Tennis",
    caption:
      "I've played tennis since I was 5 years old — it taught me discipline, focus and how to stay calm under pressure.",
    icon: "fa-solid fa-table-tennis-paddle-ball",
    image: tennis1,
  },
  {
    title: "Yoga",
    caption:
      "Yoga keeps me grounded — breath, balance and presence carry straight back into how I build.",
    icon: "fa-solid fa-spa",
    image: yoga1,
  },
  {
    title: "On Court",
    caption:
      "Years of training built the habits I lean on every day: show up, stay patient, keep improving.",
    icon: "fa-solid fa-table-tennis-paddle-ball",
    image: tennis2,
  },
  {
    title: "Flow",
    caption:
      "Finding stillness in movement — the practice that resets my mind between deep-work sessions.",
    icon: "fa-solid fa-spa",
    image: yoga2,
  },
  {
    title: "Coaching Tennis",
    caption:
      "I coach tennis and love helping people break their game down into small, winnable steps.",
    icon: "fa-solid fa-person-chalkboard",
    image: tennis3,
  },
  {
    title: "Balance",
    caption:
      "Strength, breath and balance — yoga is where I recharge the energy I bring to building.",
    icon: "fa-solid fa-spa",
    image: yoga3,
  },
  {
    title: "Practice",
    caption:
      "Every pose is a small problem to solve with patience — not so different from good engineering.",
    icon: "fa-solid fa-hands-praying",
    image: yoga4,
  },
  {
    title: "Grounded",
    caption:
      "Presence on the mat carries straight into how I show up for a team and a hard problem.",
    icon: "fa-solid fa-spa",
    image: yoga5,
  },
  {
    title: "Coaching Yoga",
    caption:
      "Guiding others through a practice is its own kind of joy — patience, attention and good energy.",
    icon: "fa-solid fa-person-chalkboard",
    image: yoga6,
  },
];

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export const socials: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ma_mamariia/",
    icon: "fa-brands fa-instagram",
  },
  {
    label: "GitHub",
    href: "https://github.com/MariiaMonakhova",
    icon: "fa-brands fa-github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mariia-monakhova-49948a283/",
    icon: "fa-brands fa-linkedin-in",
  },
  {
    label: "DOU",
    href: "https://dou.ua/users/mariia-monakhova/",
    icon: "fa-solid fa-link",
  },
];
