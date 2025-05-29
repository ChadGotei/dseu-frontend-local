import loader from "../../assets/DSEULogo/loader.gif"; 
import vector from "../../assets/DSEULogo/Vector.svg";

const Loader = () => {
  return (
    <div style={styles.loaderContainer}>
      <img src={vector} alt="Vector" style={styles.vectorImage} />
      <img src={loader} alt="Loading..." style={styles.loaderImage} />
    </div>
  );
};

const styles = {
  loaderContainer: {
    display: "flex",
    flexDirection: "column", 
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9", 
  },
  vectorImage: {
    width: "150px", 
    marginBottom: "10px",
  },
  loaderImage: {
    width: "100px", 
  },
};

export default Loader;
