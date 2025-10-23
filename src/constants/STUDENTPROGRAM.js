import achievement2 from "../assets/achievements/Achievements2.jpeg";
import achievement3 from "../assets/achievements/Achievements3.jpeg";
import achievement6 from "../assets/achievements/Achievements6.jpg";
import achievement7 from "../assets/achievements/Achievements7.jpg";
import achievement8 from "../assets/achievements/Achievements8.jpg";
import achievement9 from "../assets/achievements/Achievements9.jpg";
import achievement10 from "../assets/achievements/Achievements10.jpg";
import achievement11 from "../assets/achievements/Achievements11.jpg";
import achievement12 from "../assets/achievements/Achivements12.jpg";
import achievement13 from "../assets/achievements/Achivements13.jpg";
import study from '../assets/achievements/study.jpg'

const carouselItems = [
    { image: achievement12 },
    { image: achievement9 },
    { image: achievement10 },
    { image: achievement11 },
    { image: achievement13 },
    { image: achievement6 },
    { image: achievement7 },
    { image: achievement8 },
    { image: achievement2 },
    { image: achievement3 },
];

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

export { carouselItems, programs, study };