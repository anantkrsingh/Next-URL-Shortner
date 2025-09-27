"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  MotionValue,
  Transition,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useState } from "react";
import { TbChevronUp, TbX } from "react-icons/tb";

export interface TOC_INTERFACE {
  name: string;
  value?: string;
}

interface Props {
  value?: TOC_INTERFACE;
  setValue?: (v: TOC_INTERFACE) => void;
  data: TOC_INTERFACE[];
  ref?: any;
  transition?: Transition;
  className?: string;
  lPrefix?: string;
}

const cKey = "toc-wrapper";
const iKey = "toc-items";

const DynamicScrollIslandTOC = ({
  data,
  value: _v,
  setValue: _setValue,
  ref,
  className,
  lPrefix,
  transition = { type: "spring", duration: 0.5, bounce: 0.1 },
}: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(_v);
  const sp = useMotionValue(0);

  useEffect(() => {
    const c = ref?.current || window;

    const updateScrollProgress = () => {
      const scrollTop = c === window ? window.scrollY : c.scrollTop;
      const scrollHeight =
        c === window ? document.body.scrollHeight : c.scrollHeight;
      const clientHeight = c === window ? window.innerHeight : c.clientHeight;

      const progress = scrollTop / (scrollHeight - clientHeight) || 0;

      if (scrollHeight === clientHeight) sp.set(1);
      sp.set(progress);
    };

    c.addEventListener("scroll", updateScrollProgress);

    const resizeObserver = new ResizeObserver(updateScrollProgress);
    resizeObserver.observe(c === window ? document.body : c.firstChild);

    return () => {
      c.removeEventListener("scroll", updateScrollProgress);
      resizeObserver.disconnect();
    };
  }, [ref?.current]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") return setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handleSelect(value: TOC_INTERFACE) {
    setValue(value);
    _setValue?.(value);
  }

  const p = { data, open, value, setValue: handleSelect, ref, lPrefix };
  const txt = <Text sp={sp} {...p} />;
  const prog = <Progress sp={sp} {...p} />;
  const items = <Items {...p} />;

  return (
    <MotionConfig transition={transition}>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            role="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="bg-d-bg/10 fixed inset-0 z-50 backdrop-blur-[4px]"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          />
        )}
      </AnimatePresence>

      <div
        className={cn(
          "relative z-51 cursor-pointer select-none",
          "[--height-opened:150px] [--width-opened:350px] [--width:220px]",
          "text-white/80",
          className,
        )}
      >
        <motion.div
          role="button"
          aria-label="Open"
          tabIndex={0}
          onClick={() => setOpen((prev) => !prev)}
          layoutId={`${lPrefix}-${cKey}`}
          style={{ borderRadius: 24 }}
          className={cn(
            "relative flex h-10 cursor-pointer items-center overflow-hidden px-1 outline-hidden!",
            "min-w-[var(--width)] bg-black",
          )}
        >
          <div className="absolute top-0 left-1/2 h-full w-[calc(var(--width-opened)-50px)] -translate-x-1/2">
            <motion.div
              layoutId={`${lPrefix}-${iKey}`}
              layout="position"
              className="h-full w-full"
            />
          </div>

          <div className="w-full">{txt}</div>
          <div className="absolte top-0 right-0 bottom-0">{prog}</div>
        </motion.div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2">
          <AnimatePresence mode="popLayout" initial={false}>
            {open && (
              <motion.div
                role="button"
                aria-label="Close"
                tabIndex={0}
                onClick={() => setOpen((prev) => !prev)}
                layoutId={`${lPrefix}-${cKey}`}
                className={cn(
                  "cursor-pointer justify-center overflow-hidden p-5 pt-14",
                  "min-h-[var(--height-opened)] w-[var(--width-opened)] bg-black",
                )}
                style={{ borderRadius: 24 }}
              >
                <motion.div layoutId={`${lPrefix}-${iKey}`} layout="position">
                  {items}
                </motion.div>
                <div className="absolute top-3 right-3 left-3">{txt}</div>
                <div className="absolute top-3 right-3">{prog}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
};

export default DynamicScrollIslandTOC;

function Progress({
  value,
  setValue,
  ref,
  sp,
  lPrefix,
}: Props & { sp: MotionValue }) {
  const [p, setP] = useState(0);
  const { scrollYProgress } = useScroll({ container: ref });

  useEffect(() => {
    setP(Math.round(sp.get() * 100));
    const unsubscribe = sp.on("change", (v) => setP(Math.round(v * 100)));

    return () => unsubscribe();
  }, [ref, scrollYProgress]);

  return (
    <motion.button
      layoutId={`${lPrefix}-toc-progress-x`}
      onClick={(e) => {
        if (value?.value === null) return;
        e.stopPropagation();
        setValue?.({ name: "All" });
      }}
      className={cn(
        "relative flex h-8 w-14 items-center justify-center overflow-hidden rounded-full text-sm font-bold",
        "bg-white/[0.1] transition-colors hover:bg-white/[0.15]",
      )}
    >
      {value?.value ? <TbX /> : `${p}%`}
    </motion.button>
  );
}

function Items({ setValue, data }: Props) {
  return (
    <div className="group grid transition-opacity">
      {data.map((i) => (
        <button
          key={i.name}
          onClick={() => setValue?.(i)}
          aria-label={i.name}
          className="cursor-pointer text-left font-semibold transition-all group-hover:opacity-40 hover:opacity-100!"
        >
          {i.name}
        </button>
      ))}
    </div>
  );
}

function Text({
  open,
  value,
  sp,
  lPrefix,
}: Props & { open: boolean; sp: MotionValue }) {
  const circum = 2 * Math.PI * 10 - 0.5;
  const val = useTransform(sp, [0, 1], [circum, 0]);
  const sVal = useSpring(val, { visualDuration: 0.1, bounce: 0 });

  return (
    <div className="flex items-center gap-3">
      <motion.div layoutId={`${lPrefix}-toc-svg-progress`}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            className="stroke-white/20"
            strokeWidth="4"
            fill="none"
          />
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            className="stroke-white/80"
            strokeWidth="4"
            fill="none"
            strokeDasharray={circum}
            strokeDashoffset={sVal}
            strokeLinecap="round"
            transform="rotate(-90 12 12)"
          />
        </svg>
      </motion.div>
      <div className="flex items-center gap-2">
        <motion.p
          layout="position"
          layoutId={`${lPrefix}-toc-text`}
          className="font-bold"
        >
          {value?.name}
        </motion.p>
        <motion.div className="mt-0.5 text-white/80">
          <motion.div
            layout="position"
            layoutId={`${lPrefix}-toc-chevron`}
            animate={{ rotate: open ? 0 : 180 }}
          >
            <TbChevronUp strokeWidth={4} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
