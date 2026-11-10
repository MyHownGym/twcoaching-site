import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const offsetMap = {
  up: { axis: 'y', value: 24 },
  down: { axis: 'y', value: -24 },
  left: { axis: 'x', value: -48 },
  right: { axis: 'x', value: 48 },
};

const Reveal = ({ children, delay = 0, y = 24, direction, className = '', as = 'div', once = true, ...rest }) => {
    const reduceMotion = useReducedMotion();
    const MotionTag = motion[as] || motion.div;
    // `delay` is in seconds (framer-motion's unit), but callers often pass the
    // milliseconds they'd use with a CSS transition. No reveal waits 10s, so a
    // value that large is milliseconds — convert rather than hang the content.
    const delaySeconds = delay > 10 ? delay / 1000 : delay;

    let initialOffset = { y: reduceMotion ? 0 : y };
    if (direction && offsetMap[direction]) {
      const { axis, value } = offsetMap[direction];
      initialOffset = reduceMotion ? { [axis]: 0 } : { [axis]: value };
    }

    return (
        <MotionTag
            className={className}
            initial={{ opacity: 0, ...initialOffset }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once, margin: '-60px' }}
            transition={{ duration: 0.6, delay: delaySeconds, ease: [0.22, 1, 0.36, 1] }}
            {...rest}
        >
            {children}
        </MotionTag>
    );
}

export default Reveal;

export { Reveal };
