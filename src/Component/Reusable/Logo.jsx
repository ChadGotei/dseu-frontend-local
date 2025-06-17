import logo from "../../assets/DSEULogo/logo.png";

const Logo = ({ cn, handleClick }) => {
  return (
    <img src={logo} alt="DSEU Logo" className={cn} onClick={handleClick} />
  );
};

export default Logo;
