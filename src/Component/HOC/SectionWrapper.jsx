import { useState } from "react";
import useInView from "../../hooks/useInView";
import { motion } from "framer-motion";

const SectionWrapper = ({ children, height = "300px" }) => {
  const [ref, isVisible] = useInView({ threshold: 0.2 });

  return (
    <div ref={ref} style={{ minHeight: height }}>
      {isVisible ? (
        <div>{children}</div>
      ) : (
        // placeholder to reserve space and avoid layout shift
        <div style={{ height: "100%" }} />
      )}
    </div>
  );
};

export default SectionWrapper;
