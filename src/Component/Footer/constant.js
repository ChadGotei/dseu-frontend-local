import {
    faLinkedin,
    faFacebook,
    faInstagram,
    faXTwitter,
    faYoutube,
  } from "@fortawesome/free-brands-svg-icons";

export const locationLink =
  "https://www.google.com/maps/place/Delhi+Skill+and+Entrepreneurship+University/@28.5824457,77.0600919,17z/data=!3m1!4b1!4m6!3m5!1s0x390d1b1939555555:0x5cb3da8201a9355b!8m2!3d28.5824457!4d77.0626668";

export const quickLinks = [
  { name: "Programs", href: "/Courses" },
  { name: "Placement", href: "/placement" },
  { name: "Faculties & Departments", href: "/academics/faculty" },
  { name: "Recruitment", href: "/recruitment" },
  { name: "Administrative Offices", href: "/administration/administrative" },
  { name: "Academic Regulations", href: "/academics/regulations" },
];

export const exploreLinks = [
  { name: "About University", href: "/about-us/About-the-University" },
  { name: "Student Life", href: "/ncc" },
  { name: "Library", href: "/amenities/Library" },
  { name: "Vision & Mission", href: "/about-us/Vision-and-Mission" },
  { name: "Fee Refund Policy", href: "/" },
];

export const socialLinks = [
  {
    icon: faXTwitter,
    color: "#000000",
    href: "https://x.com/dseu_official?lang=en",
    modal: false,
  },
  {
    icon: faLinkedin,
    color: "#0A66C2",
    href: "https://www.linkedin.com/school/delhi-skill-and-entrepreneurship-university/?originalSubdomain=in",
    modal: false,
  },
  {
    icon: faFacebook,
    color: "#1877F2",
    href: "https://www.facebook.com/dseuofficial/",
    modal: false,
  },
  {
    icon: faInstagram,
    color: "#E1306C",
    href: "https://www.instagram.com/dseu_official",
    modal: false,
  },
  {
    icon: faYoutube,
    color: "red",
    href: "",
    modal: true,
    sources: [
      {
        title: "DSEU Official channel",
        href: "https://www.youtube.com/channel/UCI15NHqMRNTjPdzrteFuwgA",
      },
      {
        title: "DSEU Talks",
        href: "https://www.youtube.com/@DSEUTalks",
      },
    ],
  },
];