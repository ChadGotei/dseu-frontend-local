const HeadingText = ({ heading, headingCN }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className={`text-3xl mb-2 font-bold ${headingCN}`}>
        {heading}
      </h2>
      <div className="flex items-center w-[120px] mt-1">
        <div className="h-[2px] bg-blue-900 flex-1"></div>
        <div className="h-[5px] w-[50px] bg-blue-900 rounded-[10px]"></div>
        <div className="h-[2px] bg-blue-900 flex-1"></div>
      </div>
    </div>
  );
};

export default HeadingText;
