export const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

export const unslugify = (slug) => {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

export const getCategoryFullname = (category) => {
  let fullform;

  console.log(category);

  switch (category) {
    case "DB_UR":
      fullform = "Delhi General";
      break;
    case "DB_SC":
      fullform = "Delhi SC";
      break;
    case "DB_ST":
      fullform = "Delhi ST";
      break;
    case "DB_OBC":
      fullform = "Delhi OBC";
      break;
    case "OD_DEL_UR":
      fullform = "Outside Delhi General";
      break;
    case "OD_DEL_SC":
      fullform = "Outside Delhi SC";
      break;
    case "OD_DEL_ST":
      fullform = "Outside Delhi ST";
      break;
    case "DEL_UR":
      fullform = "Delhi General";
      break;
    case "OB_DEL_SC":
      fullform = "Outside Delhi SC";
      break;
    case "OB_DEL_ST":
      fullform = "Outside Delhi ST";
      break;
    default:
      fullform = "Unknown Category";
  }

  return fullform;
};
