import { useState } from "react";
import useInView from "../../hooks/useInView";
import { motion } from "framer-motion";

const SectionWrapper = ({ children }) => {
  const [ref, isVisible] = useInView({ threshold: 0.2 });
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  if (isVisible && !hasBeenVisible) setHasBeenVisible(true);

  return <div ref={ref}>{hasBeenVisible ? <div>{children}</div> : null}</div>;
};

export default SectionWrapper;
