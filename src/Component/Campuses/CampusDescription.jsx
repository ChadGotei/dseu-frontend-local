const CampusDescription = ({
  campus_info,
  campus_director,
  campus_director_email,
}) => {
  return (
    <div className="space-y-10 text-gray-800">
      {campus_director_email !== "test@example.com" && (
        <div className="border-l-4 border-blue-500 pl-4">
          <h2 className="text-xl font-semibold text-blue-700 mb-1">
            Campus Director
          </h2>
          <p className="text-base font-medium">{campus_director}</p>
          <a
            href={`mailto:${campus_director_email}`}
            className="text-sm text-blue-600 hover:underline"
          >
            {campus_director_email}
          </a>
        </div>
      )}

      <div className="text-base leading-7 text-justify">{campus_info}</div>
    </div>
  );
};

export default CampusDescription;
