import achievement1 from "../assets/achievements/Achievements1.jpg";
import achievement2 from "../assets/achievements/Achievements2.jpeg";
import achievement3 from "../assets/achievements/Achievements3.jpeg";
import achievement5 from "../assets/achievements/Achievements5.jpg";
import achievement4 from "../assets/achievements/Achievements4.jpg";
import achievement6 from "../assets/achievements/Achievements6.jpg";
import achievement7 from "../assets/achievements/Achievements7.jpg";
import achievement8 from "../assets/achievements/Achievements8.jpg";

const programs = {
    DIPLOMA: [
        { code: "CSE", name: "Computer Science Engineering" },
        { code: "ME", name: "Mechanical Engineering" },
        { code: "ECE", name: "Electronics & Communication" },
        { code: "Civil", name: "Civil Engineering" },
        { code: "IT", name: "Information Technology" },
        { code: "EEE", name: "Electrical & Electronics" },
    ],
    UNDERGRADUATE: [
        { code: "IT", name: "Information Technology" },
        { code: "Civil", name: "Civil Engineering" },
        { code: "CSE", name: "Computer Science Engineering" },
        { code: "ECE", name: "Electronics & Communication" },
        { code: "ME", name: "Mechanical Engineering" },
        { code: "EEE", name: "Electrical & Electronics" },
    ],
    "POST GRADUATE": [
        { code: "ECE", name: "Electronics & Communication" },
        { code: "Electrical", name: "Electrical Engineering" },
        { code: "CSE", name: "Computer Science Engineering" },
        { code: "IT", name: "Information Technology" },
        { code: "ME", name: "Mechanical Engineering" },
        { code: "Civil", name: "Civil Engineering" },
    ],
};

const carouselItems = [
    { image: achievement6 },
    { image: achievement7 },
    { image: achievement8 },
    { image: achievement4 },
    { image: achievement1 },
    { image: achievement2 },
    { image: achievement3 },
    { image: achievement5 },
];

export { carouselItems, programs };