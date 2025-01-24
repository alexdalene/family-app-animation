import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { useEffect, useRef } from 'react';

function usePrevious<T>(value: T) {
  const ref = useRef<T>(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export default function PasswordIndicator({ active }: { active: string }) {
  const prevActive = usePrevious(active);

  const inputState = {
    idle: 'Password Strength',
    weak: 'Weak Password',
    strong: 'Strong Password',
  };

  const variants = {
    initial: ({ from, to }: { from: string; to: string }) => {
      if (from === 'idle' && to === 'weak') {
        return { opacity: 0, x: '-100%', y: 0 };
      }
      if (from === 'weak' && to === 'strong') {
        return { opacity: 0, x: 0, y: '-100%' };
      }
      if (from === 'strong' && to === 'weak') {
        return { opacity: 0, x: 0, y: '100%' };
      }
      if (from === 'weak' && to === 'idle') {
        return { opacity: 0, x: '100%', y: 0 };
      }
    },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: ({ from, to }: { from: string; to: string }) => {
      if (from === 'idle' && to === 'weak') {
        return { opacity: 0, x: '100%', y: 0 };
      }
      if (from === 'weak' && to === 'strong') {
        return { opacity: 0, x: 0, y: '100%' };
      }
      if (from === 'strong' && to === 'weak') {
        return { opacity: 0, x: 0, y: '-100%' };
      }
      if (from === 'weak' && to === 'idle') {
        return { opacity: 0, x: '-100%', y: 0 };
      }
    },
  };

  return (
    <MotionConfig transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}>
      <div className="flex items-baseline relative">
        <div className="flex items-end gap-0.5">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={`bars-${index}`}
              style={{ height: `calc(3px * ${index + 2})` }}
              className="w-1 bg-gray-200 rounded-full"
            ></div>
          ))}
        </div>
        <AnimatePresence>
          {active === 'weak' ? (
            <motion.div
              initial={{ clipPath: 'inset(0px 20px 0px 0px)' }}
              animate={{ clipPath: 'inset(0px 10px 0px 0px)' }}
              exit={{ clipPath: 'inset(0px 20px 0px 0px)' }}
              className="flex items-end gap-0.5 absolute left-0 bottom-1.5"
            >
              {Array.from({ length: 3 }, (_, index) => (
                <div
                  key={`bars-${index}`}
                  style={{
                    height: `calc(3px * ${index + 2})`,
                    transition: 'background-color 0.3s ease',
                  }}
                  className="w-1 bg-red-500 rounded-full"
                ></div>
              ))}
            </motion.div>
          ) : null}
          {active === 'strong' ? (
            <motion.div
              initial={{ clipPath: 'inset(0px 10px 0px 0px)' }}
              animate={{ clipPath: 'inset(0px 0px 0px 0px)' }}
              exit={{ clipPath: 'inset(0px 10px 0px 0px)' }}
              className="flex items-end gap-0.5 absolute left-0 bottom-1.5"
            >
              {Array.from({ length: 3 }, (_, index) => (
                <div
                  key={`bars-${index}`}
                  style={{
                    height: `calc(3px * ${index + 2})`,
                    transition: 'background-color 0.3s ease',
                  }}
                  className="w-1 bg-green-500 rounded-full"
                ></div>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="pl-2 w-full overflow-hidden relative after:content-[''] after:absolute after:top-0 after:bottom-0 after:w-2 after:bg-gradient-to-l after:from-white after:to-transparent after:blur-sm after:-left-0.5">
          <AnimatePresence
            mode="popLayout"
            initial={false}
            custom={{ from: prevActive, to: active }}
          >
            <motion.span
              key={inputState[active]}
              variants={variants}
              custom={{ from: prevActive, to: active }}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`${
                active === 'weak' ? 'text-red-500 font-medium' : ''
              } ${
                active === 'strong' ? 'text-green-500 font-medium' : ''
              } text-gray-400 text-sm whitespace-nowrap inline-block`}
            >
              {inputState[active]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
}
