import DSEUTEXTFINAL from "../assets/DSEULogo/DSEUTEXTFINAL.svg";
import Group24 from "../assets/DSEULogo/Group24.svg";
import Orange from "../assets/DSEULogo/Orange.svg";

export const navItems = [
  {
    name: "Home",
    path: "/",
    isHome: true,
  },
  {
    name: "About Us",
    dropdownItems: [
      { name: "About the University", path: "/about-us/About-the-University" },
      { name: "Vision and Mission", path: "/about-us/Vision-and-Mission" },
      { name: "History of DSEU", path: "/about-us/history" },
      {
        name: "Annual Report",
        path: "/about-us/annualReport",
      },
    ],
  },
  {
    name: "Academics",
    dropdownItems: [
      { name: "Faculties & Department", path: "/academics/faculty" },
      {
        name: "Academic Administration",
        path: "/academics/academicAdministration",
      },
      { name: "Academic Regulations", path: "/academics/regulations" },
      { name: "Academic Calendar", path: "/academics/academic-calendar" },
      { name: "Academic Collaboration", path: "/academics/collaboration" },
      {
        name: "Internal Quality Assurance Cell (IQAC)",
        path: "/academics/IQAC",
      },
      { name: "Library", path: "/amenities/Library" },
    ],
  },
  {
    name: "Campuses",
    dropdownItems: [
      { name: "Central", path: "/campus/zone/central zone" },
      { name: "North", path: "/campus/zone/north zone" },
      { name: "South", path: "/campus/zone/south zone" },
      { name: "East", path: "/campus/zone/east zone" },
      { name: "West", path: "/campus/zone/west zone" },
    ],
  },
  {
    name: "Admission",
    dropdownItems: [
      {
        name: "Admission 2025-26",
        path: "/admission",
      },
      {
        name: "Diploma Seat Allocation",
        path: "/admission/result/diploma/round4",
      },
      {
        name: "PG Seat Allocation",
        path: "/admission/result/pg",
      },
      {
        name: "UG Seat Allocation",
        path: "/admission/result/ug/round2",
      },
      {
        name: "Btech seat Allocation",
        path: "/admission/result/btech/round2",
      },
      {
        name: "Fee Refund Policy",
        path: "https://drive.google.com/file/d/1AQC5LFPX3j4B0hX7Ut1avU6n1qughj3z/view",
      },
      {
        name: "Information Bulletin",
        path: "/admission/information-bulletin",
      },
      {
        name: "Programs after 10th  ",
        path: "https://dseuadm.samarth.edu.in/",
      },
      {
        name: "Programs after 12th",
        path: "https://dseuadm.samarth.edu.in/ug",
      },
      {
        name: "Programs after Bachelor",
        path: "https://dseuadm.samarth.edu.in/pg",
      },
      {
        name: "Process and guidelines",
        path: "/admission/process-and-guidelines",
      },
    ],
  },
  {
    name: "Administration",
    dropdownItems: [
      {
        name: "Administrative Offices",
        path: "/administration/administrative",
      },
      { name: "Chancellor", path: "/administration/chancellor" },
      { name: "Vice Chancellor", path: "/administration/vice-chancellor" },
      { name: "Registrar", path: "/registrar" },
      { name: "Controller of Finance", path: "/administration/cof" },
      { name: "Controller of Examination", path: "/administration/coe" },
    ],
  },
  {
    name: "Student Life",
    dropdownItems: [
      { name: "NCC/NSS", path: "/ncc" },
      { name: "Sports", path: "/amenities/Sports" },
      { name: "Scholarship", path: "/amenities/Scholarship" },
      { name: "Internal Complaint Committee", path: "/amenities/ICC" },
      { name: "Anti-Ragging Cell", path: "amenities/Anti-Ragging" },
      { name: "Equal Opportunity Cell", path: "/amenities/Equal-Opportunity" },
    ],
  },
  {
    name: "T & P Cell",
    path: "/placement",
  },
  {
    name: "Work with us",
    dropdownItems: [
      { name: "Job Portal", path: "/recruitment" },
      { name: "Recruitment Rules", path: "/recruitment-rules" },
    ],
  },
    {
      name: "Research",
      path: "/research",
      dropdownItems: [
        { name: "Office Bearers", path: "/research/office-bearers" },
        { name: "Supervisors", path: "/research/supervisors" },
        { name: "PhD Students", path: "/research/phd-students" },
        { name: "Ordinance", path: "/research/ordinance" },
        {
          name: "Doctoral Research Committee",
          path: "/research/doctoral-research-committee",
        },
        { name: "Information Brochure", path: "/research/information-brochure" },
        { name: "Notices/Orders", path: "/research/notices" },
        { name: "Admission Portal", path: "/research/admission-portal" },
      ],
    },
  {
    name: "Entrepreneurship",
    path: "/Entrepreneurship",
  },
];

export const carouselImages = [
  {
    src: DSEUTEXTFINAL,
    alt: "DSEU Image 1",
  },
  {
    src: Group24,
    alt: "DSEU Image 2",
  },
  {
    src: Orange,
    alt: "DSEU Image 3",
  },
];
