import { useState } from "react";

const Ordinance = () => {
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const fileURL = URL.createObjectURL(file);
      setPdfFile(fileURL);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  return (
    <div className="px-6 md:px-16 py-10 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-10 text-center">
        Research Ordinance
      </h1>

      {/* Upload PDF Section */}
      <div className="bg-white border rounded-lg shadow-md p-6 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-4">
          Upload Research Ordinance PDF
        </h2>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
          className="block mx-auto mb-4 text-gray-700"
        />

        {pdfFile ? (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Preview Uploaded Ordinance:
            </h3>
            <iframe
              src={pdfFile}
              title="Research Ordinance PDF"
              className="w-full h-[600px] border rounded-lg"
            ></iframe>
          </div>
        ) : (
          <p className="text-gray-500">No PDF uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default Ordinance;
