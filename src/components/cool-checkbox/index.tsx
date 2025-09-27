"use client";
import { motion, MotionConfig, Transition } from "motion/react";

const baseT: Transition = {
  ease: [0.215, 0.61, 0.355, 1],
  duration: 0.4,
};
const baseDelay = 0.2;

interface CoolCheckboxProps {
  label: string;
  checked: boolean;
  onToggle: (id: boolean) => void;
}

export default function CoolCheckbox({ label, checked, onToggle }: CoolCheckboxProps) {
  return (
    <MotionConfig transition={baseT}>
      <div className="flex items-center justify-center">
        <ul className="flex flex-col gap-0 font-medium">
          <li>
              <button
                onClick={() => onToggle(!checked)}
                className="flex w-fit cursor-pointer items-center gap-2 rounded-md p-3"
                role="checkbox"
                aria-checked={checked}
                aria-label={`${label}, ${checked ? "checked" : "not checked"}`}
              >
                {SVG(checked)}

                <motion.p
                  transition={{
                    ...baseT,
                    delay: checked ? baseDelay : 0,
                  }}
                  initial={false}
                  animate={{
                    x: checked ? [0, 4, -2, 0] : 0,
                  }}
                  className="relative line-clamp-1 flex-1 overflow-hidden"
                >
                  {label}
                  {/* <motion.span
                    transition={{
                      ...baseT,
                      delay: checked ? baseDelay : 0,
                    }}
                    initial={{ x: checked ? "0%" : "-101%" }}
                    animate={{ x: checked ? "0%" : "-101%" }}
                    className="absolute inset-x-0 top-1/2 inline-block h-[2px] bg-black"
                  /> */}
                </motion.p>
              </button>
            </li>
          
        </ul>
      </div>
    </MotionConfig>
  );
}

function SVG(checked: boolean) {
  return (
    <svg
      aria-hidden="true"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-white"
    >
      <motion.path
        transition={{ ...baseT, delay: checked ? baseDelay : 0 }}
        initial={{
          opacity: checked ? 1 : 0,
          scale: checked ? 1 : 0.5,
        }}
        animate={{
          opacity: checked ? 1 : 0,
          scale: checked ? 1 : 0.5,
        }}
        d="M1 13C1 7.34315 1 4.51472 2.75736 2.75736C4.51472 1 7.34315 1 13 1C18.6569 1 21.4853 1 23.2426 2.75736C25 4.51472 25 7.34315 25 13C25 18.6569 25 21.4853 23.2426 23.2426C21.4853 25 18.6569 25 13 25C7.34315 25 4.51472 25 2.75736 23.2426C1 21.4853 1 18.6569 1 13Z"
        fill="#027BFF"
      />
      <motion.path
        transition={{ ...baseT, delay: checked ? baseDelay : 0 }}
        initial={{
          clipPath: checked
            ? "inset(0% 0% 0% 0%)"
            : "inset(0% 100% 0% 0%)",
        }}
        animate={{
          clipPath: checked
            ? "inset(0% 0% 0% 0%)"
            : "inset(0% 100% 0% 0%)",
        }}
        d="M19.2574 8.9732L11.5035 18.204C11.4185 18.3053 11.3126 18.3871 11.1932 18.444C11.0737 18.5008 10.9435 18.5313 10.8112 18.5334H10.7956C10.6663 18.5333 10.5383 18.5061 10.4202 18.4534C10.302 18.4007 10.1962 18.3238 10.1097 18.2276L6.7866 14.5353C6.70221 14.4458 6.63656 14.3403 6.59351 14.2251C6.55046 14.1098 6.53089 13.9871 6.53593 13.8642C6.54098 13.7413 6.57054 13.6206 6.62289 13.5093C6.67524 13.398 6.74931 13.2982 6.84076 13.2159C6.93221 13.1336 7.03918 13.0705 7.15539 13.0301C7.27161 12.9897 7.39472 12.973 7.51749 12.9809C7.64026 12.9888 7.76021 13.0212 7.87029 13.0761C7.98038 13.131 8.07838 13.2074 8.15853 13.3007L10.7714 16.2038L17.8439 7.78589C18.0026 7.60248 18.227 7.48886 18.4687 7.4696C18.7105 7.45033 18.9501 7.52697 19.1358 7.68295C19.3215 7.83893 19.4383 8.06171 19.4611 8.30315C19.4838 8.54459 19.4107 8.78528 19.2574 8.9732Z"
        fill="white"
      />
      <motion.path
        strokeWidth={2}
        transition={{ ...baseT, delay: checked ? 0 : baseDelay }}
        initial={{
          pathLength: checked ? 0 : 1,
          strokeOpacity: checked ? [1, 1, 0] : [0, 1, 1, 1],
        }}
        animate={{
          pathLength: checked ? 0 : 1,
          strokeOpacity: checked ? [1, 1, 0] : [0, 1, 1, 1],
        }}
        d="M22.8891 22.889C22.1189 23.6593 21.0955 24.0726 19.517 24.2848C17.9242 24.4989 15.8426 24.5 13 24.5C10.1574 24.5 8.07582 24.4989 6.483 24.2848C4.90456 24.0726 3.88121 23.6594 3.11092 22.889C2.34063 22.1188 1.92743 21.0955 1.71521 19.517C1.50106 17.9242 1.5 15.8426 1.5 13C1.5 10.1574 1.50106 8.07582 1.71521 6.483C1.92743 4.90456 2.34062 3.88121 3.11091 3.11091C3.88121 2.34062 4.90456 1.92743 6.483 1.71521C8.07582 1.50106 10.1574 1.5 13 1.5C15.8426 1.5 17.9242 1.50106 19.517 1.71521C21.0955 1.92743 22.1188 2.34062 22.889 3.11091C23.6594 3.8812 24.0726 4.90456 24.2848 6.483C24.4989 8.07582 24.5 10.1574 24.5 13C24.5 15.8426 24.4989 17.9242 24.2848 19.517C24.0726 21.0955 23.6594 22.1188 22.8891 22.889Z"
        className="stroke-white"
      />
    </svg>
  );
}
