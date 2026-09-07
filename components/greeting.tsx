import { motion } from "framer-motion";
import { BRAND } from "@/lib/brand";

export const Greeting = () => {
  return (
    <div
      className="mx-auto mt-4 flex size-full max-w-3xl flex-col justify-center px-4 md:mt-16 md:px-8"
      key="overview"
    >
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="aurelis-display text-4xl leading-none text-foreground md:text-6xl"
        exit={{ opacity: 0, y: 10 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.35, duration: 0.45 }}
      >
        {BRAND.name}
      </motion.div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mt-3 max-w-xl text-lg leading-7 text-muted-foreground md:text-xl"
        exit={{ opacity: 0, y: 10 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5, duration: 0.45 }}
      >
        Inteligencja. Precyzja. Forma.
      </motion.div>
      <motion.div
        animate={{ opacity: 1, scaleX: 1 }}
        className="aurelis-gold-line mt-7 w-28 origin-left opacity-80"
        initial={{ opacity: 0, scaleX: 0 }}
        transition={{ delay: 0.65, duration: 0.55 }}
      />
    </div>
  );
};
