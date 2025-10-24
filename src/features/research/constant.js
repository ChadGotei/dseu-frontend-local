import {
  faUserTie,
  faChalkboardTeacher,
  faUserGraduate,
  faBook,
  faUsers,
  faFileAlt,
  faBell,
  faUniversity,
} from "@fortawesome/free-solid-svg-icons";

const researchLinks = [
  {
    name: "Office Bearers",
    path: "/research/office-bearers",
    icon: faUserTie,
    color: "text-indigo-500",
  },
  {
    name: "Supervisors",
    path: "/research/supervisors",
    icon: faChalkboardTeacher,
    color: "text-green-500",
  },
  {
    name: "PhD Students",
    path: "/research/phd-students",
    icon: faUserGraduate,
    color: "text-purple-500",
  },
  {
    name: "Ordinance",
    path: "/research/ordinance",
    icon: faBook,
    color: "text-blue-500",
  },
  {
    name: "Doctoral Research Committee",
    path: "/research/department-research-committee",
    icon: faUsers,
    color: "text-pink-500",
  },
  {
    name: "Information Brochure",
    path: "/research/information-brochure",
    icon: faFileAlt,
    color: "text-yellow-500",
  },
  {
    name: "Notices / Orders",
    path: "/research/notices",
    icon: faBell,
    color: "text-red-500",
  },
  {
    name: "Admission Portal",
    path: "/research/admission-portal",
    icon: faUniversity,
    color: "text-teal-500",
  },
];

export { researchLinks };
