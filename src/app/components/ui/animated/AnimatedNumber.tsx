// components/AnimatedNumber.tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePrevious } from "@uidotdev/usehooks";

interface AnimatedNumberProps {
  value: number;
  formatOptions?: Intl.NumberFormatOptions;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  formatOptions = {
    style: "currency",
    currency: "EUR",
  },
}) => {
  const formattedValue = value.toLocaleString("fr-FR", formatOptions);
  const previousFormattedValue = usePrevious(formattedValue) || formattedValue;

  const maxLength = Math.max(
    formattedValue.length,
    previousFormattedValue.length
  );
  const paddedCurrent = formattedValue.padStart(maxLength, " ");
  const paddedPrevious = previousFormattedValue.padStart(maxLength, " ");

  return (
    <span style={{ display: "inline-block" }}>
      {paddedCurrent.split("").map((char, index) => {
        const prevChar = paddedPrevious[index];
        const shouldAnimate = char !== prevChar;

        return (
          <span
            key={index}
            style={{
              position: "relative",
              display: "inline-block",
              overflow: "hidden",
            }}
            className="text-base md:text-lg font-semibold"
          >
            {/* Si le caractère a changé, on affiche deux éléments superposés */}
            {shouldAnimate && (
              <AnimatePresence mode="wait">
                {/* Ancien caractère : il part vers le haut */}
                <motion.span
                  key={`old-${index}-${prevChar}`}
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: -10, opacity: 0 }}
                  exit={{}}
                  transition={{ duration: 0.4 }}
                  style={{ position: "absolute", top: 0, left: 0 }}
                >
                  {prevChar}
                </motion.span>
              </AnimatePresence>
            )}
            <AnimatePresence mode="wait">
              {shouldAnimate ? (
                // Nouveau caractère : il arrive par le bas
                <motion.span
                  key={`new-${index}-${char}`}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{}}
                  transition={{ duration: 1 }}
                >
                  {char}
                </motion.span>
              ) : (
                // Si le caractère n'a pas changé, on l'affiche sans animation
                <span key={index}>{char}</span>
              )}
            </AnimatePresence>
          </span>
        );
      })}
    </span>
  );
};

export default AnimatedNumber;
