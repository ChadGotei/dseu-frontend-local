// contains the constants for admin
const getSectionOptions = () => [
    { value: "admission", label: "Admission" },
    { value: "students", label: "Students" },
    { value: "important links", label: "Important Links" },
    { value: "alerts and circulars", label: "Notices" },
    { value: "academic positions", label: "Academic Positions" },
    { value: "non academic positions", label: "Non Academic Positions" },
    { value: "short term positions", label: "Short Term Positions" },
    { value: "results", label: "Results" },
    { value: "recruitments and notice", label: "Recruitments and Notices" },
    { value: "announcements", label: "Announcements" },
    { value: "recruitment rules", label: "Administration Recruitment Rules" },
    { value: "ad office orders", label: "Administration Office Orders" },
    { value: "ad circulars", label: "Administration Circulars" },
    { value: "ad important forms", label: "Administration Important Forms" },
    {
        value: "member university court",
        label: "University Court Members",
    },
    {
        value: "member board of management",
        label: "Board of Management Members",
    },
    {
        value: "member academic council",
        label: "Academic Council Members",
    },
    {
        value: "member finance comittee",
        label: "Finance Committee Members",
    },
    { value: "university court", label: "MOM University Court" },
    { value: "board of management", label: "MOM Board of Management" },
    { value: "academic council", label: "MOM Academic Council" },
    { value: "finance comittee", label: "MOM Finance Committee" },
];

// for information bulletion 
const getInformationBulletinOptions = () => [
    { value: "admission", label: "Admission" },
    { value: "students", label: "Students" },
    { value: "important links", label: "Important Links" },
    { value: "alerts and circulars", label: "Notices" },
];

// for view pdfs page
const getSectionName = (section) => {
    switch (section) {
        case "admission": return "Admission";
        case "students": return "Students";
        case "important links": return "Important Links";
        case "alerts and circulars": return "Notices";
        case "academic positions": return "Academic Positions";
        case "non academic positions": return "Non Academic Positions";
        case "short term positions": return "Short Term Positions";
        case "results": return "Results";
        case "recruitments and notice": return "Recruitments and Notices";
        case "announcements": return "Announcements";
        case "recruitment rules": return "Recruitment Rules";
        case "ad office orders": return "Office Orders";
        case "ad circulars": return "Circulars";
        case "ad important forms": return "Administration Important Forms";
        case "member university court": return "University Court Members";
        case "member board of management": return "Board of Management Members";
        case "member academic council": return "Academic Council Members";
        case "member finance comittee": return "Finance Committee Members";
        case "university court": return "MOM University Court";
        case "board of management": return "MOM Board of Management";
        case "academic council": return "MOM Academic Council";
        case "finance comittee": return "MOM Finance Committee";
        default: return section;
    }
};


export { getSectionOptions, getSectionName, getInformationBulletinOptions };