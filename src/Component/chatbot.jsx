// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import Chatbot from "../assets/Chatbot.png";
// import vector from "../assets/Vector.svg";

// const ChatWidget = () => {
//   const [open, setOpen] = useState(false);
//   const [prompt, setPrompt] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showTooltip, setShowTooltip] = useState(false);
//   const [showCourses, setShowCourses] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       from: "bot",
//       text: "👋 Hi! I’m Lakshay, your assistant. How can I help you today?",
//     },
//   ]);

//   const modalRef = useRef(null);

//   useEffect(() => {
//     const hasOpened = sessionStorage.getItem("chatbotOpened");
//     const hasClosed = sessionStorage.getItem("chatbotClosed");

//     if (!hasOpened && !hasClosed) {
//       const tooltipTimer = setTimeout(() => setShowTooltip(true), 2000);
//       const chatbotTimer = setTimeout(() => {
//         setShowTooltip(false);
//         setOpen(true);
//         sessionStorage.setItem("chatbotOpened", "true");
//       }, 7000);

//       return () => {
//         clearTimeout(tooltipTimer);
//         clearTimeout(chatbotTimer);
//       };
//     }
//   }, []);

//   // Close chatbot when clicking outside modal
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         open &&
//         modalRef.current &&
//         !modalRef.current.contains(event.target)
//       ) {
//         setOpen(false);
//         sessionStorage.setItem("chatbotClosed", "true");
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [open]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!prompt.trim()) return;

//     const userMessage = { from: "user", text: prompt };
//     setMessages((prev) => [...prev, userMessage]);
//     setPrompt("");
//     setLoading(true);

//     try {
//       const res = await axios.post("http://159.203.9.197:8080/prompt", {
//         prompt,
//       });
//       const botMessage = { from: "bot", text: res.data.response };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       setMessages((prev) => [
//         ...prev,
//         { from: "bot", text: "⚠️ Error communicating with the chatbot." },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Floating Button with Tooltip */}
//       <div className="fixed bottom-6 right-10 z-50 flex flex-col items-center space-y-1">
//         {showTooltip && (
//           <div className="mb-2 bg-white text-gray-800 px-3 py-1 text-sm rounded-md shadow-lg animate-fade-in-out">
//             💬 May I assist you?
//           </div>
//         )}
//         <button
//           onClick={() => {
//             setOpen(true);
//             sessionStorage.setItem("chatbotOpened", "true");
//           }}
//           className="text-white text-2xl w-24 h-24 rounded-full shadow-lg flex items-center justify-center transition bg-white"
//           title="Chat with Lakshay"
//         >
//           <img
//             src={Chatbot}
//             alt="bot"
//             className={`w-20 h-20 rounded-full object-cover border-white border-2 ${
//               showTooltip ? "animate-shake" : ""
//             }`}
//           />
//         </button>
//       </div>

//       {/* Chat Modal */}
//       {open && (
//         <div
//           ref={modalRef}
//           className="fixed bottom-28 right-10 md:right-10 md:left-auto md:translate-x-0 left-1/2 -translate-x-1/2 w-[95%] sm:w-[380px] h-[500px] bg-white rounded-xl shadow-xl z-50 flex flex-col overflow-hidden border border-gray-200"
//         >
//           {/* Header */}
//           <div className="bg-gradient-to-r from-blue-200 to-blue-400 text-white px-4 py-3 flex justify-between items-center">
//             <div className="flex items-center gap-2">
//               <img src={vector} alt="logo" className="h-8 w-6" />
//               <h3 className="font-semibold text-lg text-blue-700">Lakshay</h3>
//             </div>
//             <button
//               onClick={() => {
//                 setOpen(false);
//                 sessionStorage.setItem("chatbotClosed", "true");
//               }}
//               className="text-lg font-semibold hover:text-gray-300 transition"
//             >
//               ✖
//             </button>
//           </div>

//           {/* Chat Area */}
//           <div className="flex-1 px-4 py-3 bg-gray-50 text-sm overflow-y-auto custom-scroll space-y-3">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`flex items-start space-x-2 ${
//                   msg.from === "user" ? "justify-end" : ""
//                 }`}
//               >
//                 {msg.from === "bot" && (
//                   <img src={vector} alt="Lakshay" className="h-6 w-6 mt-1" />
//                 )}
//                 <div
//                   className={`px-4 py-2 rounded-lg max-w-[75%] break-words whitespace-pre-wrap ${
//                     msg.from === "bot"
//                       ? "bg-gray-200 text-gray-800"
//                       : "bg-blue-500 text-white ml-auto"
//                   }`}
//                   dangerouslySetInnerHTML={{
//                     __html: msg.text.replace(
//                       /(https?:\/\/[^\s]+)/g,
//                       (url) =>
//                         `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline break-words">${url}</a>`
//                     ),
//                   }}
//                 />
//               </div>
//             ))}
//             {loading && (
//               <p className="italic text-gray-500">⌛ Lakshay is thinking...</p>
//             )}

//             {/* Courses Offered Dropdown */}
//             <div className="mt-4">
//               <button
//                 onClick={() => setShowCourses((prev) => !prev)}
//                 className="w-50 bg-[#2B4A7F] text-white py-3 px-2 rounded-md hover:bg-[#4F83C4] transition text-xs font-medium"
//               >
//                 📚 Programs Offered
//               </button>

//               {showCourses && (
//                 <div className="mt-2 space-y-2">
//                   <button
//                     onClick={() => (window.location.href = "/Courses/UG")}
//                     className="w-full bg-gray-100 hover:bg-gray-200 text-sm text-gray-800 py-2 px-3 rounded-md text-left"
//                   >
//                     🎓 Undergraduate
//                   </button>
//                   <button
//                     onClick={() => (window.location.href = "/Courses/PG")}
//                     className="w-full bg-gray-100 hover:bg-gray-200 text-sm text-gray-800 py-2 px-3 rounded-md text-left"
//                   >
//                     🎓 Postgraduate
//                   </button>
//                   <button
//                     onClick={() => (window.location.href = "/Courses/diploma")}
//                     className="w-full bg-gray-100 hover:bg-gray-200 text-sm text-gray-800 py-2 px-3 rounded-md text-left"
//                   >
//                     🎓 Diploma
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Input Field */}
//           <form
//             onSubmit={handleSubmit}
//             className="flex items-center gap-2 border-t p-3 bg-white"
//           >
//             <input
//               type="text"
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               placeholder="Ask me about DSEU"
//               className="flex-1 px-4 py-3 border rounded-md text-base focus:outline-none focus:ring-1 focus:ring-teal-500"
//             />
//             <button
//               type="submit"
//               className="bg-[#2B4A7F] hover:bg-[#4F83C4] text-white text-xl w-11 h-11 flex items-center justify-center rounded-full transition"
//               title="Send"
//             >
//               ➤
//             </button>
//           </form>
//         </div>
//       )}
//     </>
//   );
// };

// export default ChatWidget;
