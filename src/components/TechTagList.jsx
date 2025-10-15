import {
  FaReact,
  FaNodeJs,
  FaJs,
  FaDocker,
  FaAws,
  FaJava,
  FaDatabase,
  FaGitAlt,
  FaGithub,
  FaNetworkWired,
  FaCogs,
  FaClock,
  FaPeopleCarry,
  FaHandHoldingHeart,
  FaCodeBranch,
  FaLaptopCode,
} from "react-icons/fa";
import {
  SiPostgresql,
  SiPython,
  SiMongodb,
  SiMysql,
  SiCplusplus,
  SiC,
  SiExpress,
  // SiVisualstudiocode,
  SiNpm,
  SiPostman,
  SiHtml5,
  SiCss3,
  SiNextdotjs,
  SiTypescript,
} from "react-icons/si";
import { BsBrush, BsBug, BsPeople } from "react-icons/bs"; // for design, testing, agile
import { FcLinux } from "react-icons/fc";
import { MdComputer, MdOutlineDesignServices, MdOutlinePsychology } from "react-icons/md";
import { GiThink, GiTeamIdea } from "react-icons/gi";

export default function TechTagsList({ tags = [], limit = 6, size, px, py }) {
  // const tagIcons = {
  //   javascript: <FaJs className={`w-${size} h-${size} text-yellow-400`} />,
  //   react: <FaReact className={`w-${size} h-${size} text-cyan-500`} />,
  //   nodejs: <FaNodeJs className={`w-${size} h-${size} text-green-600`} />,
  //   python: <SiPython className={`w-${size} h-${size} text-blue-500`} />,
  //   aws: <FaAws className={`w-${size} h-${size} text-orange-500`} />,
  //   docker: <FaDocker className={`w-${size} h-${size} text-blue-500`} />,
  //   docker: <FaDocker className={`w-${size} h-${size} text-blue-500`} />,
  //   sql: <SiPostgresql className={`w-${size} h-${size} text-indigo-600`} />,
  //   design: <BsBrush className={`w-${size} h-${size} text-pink-500`} />,
  //   testing: <BsBug className={`w-${size} h-${size} text-red-500`} />,
  //   agile: <BsPeople className={`w-${size} h-${size} text-purple-500`} />,
  //   linux: <FcLinux className={`w-${size} h-${size}`}/>,
  // };
  // size = 8
  const tagIcons = {
    // 💻 Programming Languages
    javascript: <FaJs className={`w-${size} h-${size} text-yellow-400`} />,
    typescript: <SiTypescript className={`w-${size} h-${size} text-blue-600`} />,
    python: <SiPython className={`w-${size} h-${size} text-blue-500`} />,
    java: <FaJava className={`w-${size} h-${size} text-red-500`} />,
    "c++": <SiCplusplus className={`w-${size} h-${size} text-blue-700`} />,
    c: <SiC className={`w-${size} h-${size} text-blue-600`} />,

    // ⚛️ Frontend
    react: <FaReact className={`w-${size} h-${size} text-cyan-500`} />,
    nextjs: <SiNextdotjs className={`w-${size} h-${size} text-black dark:text-white`} />,
    html: <SiHtml5 className={`w-${size} h-${size} text-orange-500`} />,
    css: <SiCss3 className={`w-${size} h-${size} text-blue-500`} />,

    // 🧠 Backend & Frameworks
    nodejs: <FaNodeJs className={`w-${size} h-${size} text-green-600`} />,
    express: <SiExpress className={`w-${size} h-${size} text-gray-700`} />,
    "data structures & algorithms": (
      <MdOutlinePsychology className={`w-${size} h-${size} text-amber-600`} />
    ),
    "object-oriented programming": (
      <FaLaptopCode className={`w-${size} h-${size} text-teal-600`} />
    ),
    "software engineering": (
      <FaCogs className={`w-${size} h-${size} text-gray-700`} />
    ),

    // 🗃️ Databases
    mysql: <SiMysql className={`w-${size} h-${size} text-blue-500`} />,
    mongodb: <SiMongodb className={`w-${size} h-${size} text-green-500`} />,
    postgresql: <SiPostgresql className={`w-${size} h-${size} text-indigo-600`} />,
    sql: <FaDatabase className={`w-${size} h-${size} text-gray-600`} />,
    "database management systems": (
      <FaDatabase className={`w-${size} h-${size} text-gray-600`} />
    ),

    // ☁️ DevOps & Tools
    aws: <FaAws className={`w-${size} h-${size} text-orange-500`} />,
    docker: <FaDocker className={`w-${size} h-${size} text-blue-500`} />,
    git: <FaGitAlt className={`w-${size} h-${size} text-orange-600`} />,
    github: <FaGithub className={`w-${size} h-${size} text-gray-800`} />,
    npm: <SiNpm className={`w-${size} h-${size} text-red-600`} />,
    // "vs code": <SiVisualstudiocode className={`w-${size} h-${size} text-blue-500`} />,
    postman: <SiPostman className={`w-${size} h-${size} text-orange-400`} />,
    linux: <FcLinux className={`w-${size} h-${size}`} />,

    // 🌐 Networking & OS
    "computer networks": <FaNetworkWired className={`w-${size} h-${size} text-blue-700`} />,
    "operating system": <MdComputer className={`w-${size} h-${size} text-gray-700`} />,

    // 🎨 Design & Testing
    design: <BsBrush className={`w-${size} h-${size} text-pink-500`} />,
    uiux: <MdOutlineDesignServices className={`w-${size} h-${size} text-purple-400`} />,
    testing: <BsBug className={`w-${size} h-${size} text-red-500`} />,

    // 🧩 Soft Skills
    "communication skills": <BsPeople className={`w-${size} h-${size} text-blue-500`} />,
    teamwork: <GiTeamIdea className={`w-${size} h-${size} text-green-600`} />,
    "time management": <FaClock className={`w-${size} h-${size} text-amber-500`} />,
    "work ethics": <FaHandHoldingHeart className={`w-${size} h-${size} text-rose-500`} />,
    agile: <FaPeopleCarry className={`w-${size} h-${size} text-purple-500`} />,
    "problem solving": <GiThink className={`w-${size} h-${size} text-indigo-500`} />,
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.slice(0, limit).map((tag, index) => {
        const label = tag.charAt(0).toUpperCase() + tag.slice(1);
        return (
          <span
            key={index}
            className={`
              flex items-center gap-1 px-${px?px:"3"} py-${py?py:'1.5'} text-xs font-medium rounded-full
              bg-[var(--color-surface)] text-[var(--color-text)]
              border border-[var(--color-border)] shadow-sm
              transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer
            `}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {tagIcons[tag.toLowerCase()] || null}
            {label}
          </span>
        );
      })}
    </div>
  );
}
