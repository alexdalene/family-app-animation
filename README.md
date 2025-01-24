# Family App Password

## Introduction

This is an attemt to replicate an animation from the Family app, specifically the animation that happens when a user starts writing their password at the signup page.

It's made using Nextjs as the framework, and motion (previously Framer Motion) as the animation library.

## Solution

The animation seemed easy to achieve at first glance, but the closer I got to the end, the harder it got. The reason being that it's a different animation for the transition between 'Weak Password' -> 'Strong Password', than 'Password Strength' -> 'Weak Password'.

### Save previous value

```tsx
function usePrevious<T>(value: T) {
  const ref = useRef<T>(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
```

First we save the previous value of the 'active' state, which has the following enums: "idle", "weak", "strong".

### Pass the previous and current value

```tsx
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
    className={`${active === 'weak' ? 'text-red-500 font-medium' : ''} ${
      active === 'strong' ? 'text-green-500 font-medium' : ''
    } text-gray-400 text-sm whitespace-nowrap inline-block`}
  >
    {inputState[active]}
  </motion.span>
</AnimatePresence>
```

We then pass the previous value and the current as an object to the `custom` value of the `motion.span`.

### Set up the animation

```tsx
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
```

It's then used like this, which basically just sets up the logic for how to animate what and when.

![Preview](./public/preview.webp 'Preview')
