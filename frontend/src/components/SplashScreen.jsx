import { ChefHat } from "lucide-react";
import { motion } from "framer-motion";

function SplashScreen() {
  return (
    <div className="
      h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-orange-500
      to-orange-700
    ">
      <motion.div
        animate={{
          scale: [1, 1.15, 1]
        }}
        transition={{
          repeat: Infinity,
          duration: 1.8
        }}
      >
        <ChefHat
          size={100}
          className="text-white"
        />
      </motion.div>
    </div>
  );
}

export default SplashScreen;