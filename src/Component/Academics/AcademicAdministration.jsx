import flowchart from "../../assets/flowchartfinal.png";

export const AcademicAdministration = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white mt-20">
      <img
        src={flowchart}
        alt="Flowchart"
        className="w-full max-w-2xl h-auto object-contain  -mt-14"
      />
    </div>
  );
};

export default AcademicAdministration;
