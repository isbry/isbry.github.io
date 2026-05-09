import { motion } from "framer-motion";
import { facets, cubeRotations } from "../../data/facets.js";
import CubeFace from "./CubeFace.jsx";

export default function Cube({ activeIndex, onSelectFace }) {
  return (
    <div
      className="relative flex items-center justify-center mx-auto"
      style={{ width: "420px", height: "560px", perspective: "1400px" }}
    >
      <motion.div
        style={{ width: "320px", height: "320px", transformStyle: "preserve-3d" }}
        className="relative"
        animate={{ transform: cubeRotations[activeIndex] }}
        transition={{ type: "spring", stiffness: 80, damping: 18 }}
      >
        {facets.map((facet, index) => (
          <CubeFace
            key={facet.id}
            facet={facet}
            index={index}
            activeIndex={activeIndex}
            onSelect={onSelectFace}
          />
        ))}
      </motion.div>
    </div>
  );
}
