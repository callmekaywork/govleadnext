import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef, useState } from 'react';

const cards = [
  {
    id: 1,
    src: 'https://picsum.photos/seed/org1/400/500',
    rotation: -5,
    x: -20,
    y: -10,
  },
  {
    id: 2,
    src: 'https://picsum.photos/seed/org2/400/500',
    rotation: 3,
    x: 30,
    y: 20,
  },
  {
    id: 3,
    src: 'https://picsum.photos/seed/org3/400/500',
    rotation: -2,
    x: 10,
    y: -40,
  },
  {
    id: 4,
    src: 'https://picsum.photos/seed/org4/400/500',
    rotation: 6,
    x: -40,
    y: 30,
  },
];

export default function AboutOrganic() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const yProgress = useSpring(scrollYProgress, springConfig);

  return (
    <section
      ref={containerRef}
      className="py-32 px-6 bg-neutral-900 text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-16">
        <div className="max-w-3xl space-y-6">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-500"
          >
            02 / Our Culture
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl lg:text-8xl font-serif font-light leading-none"
            data-cursor="contrast"
          >
            Built by <span className="text-neutral-400 italic">curiosity</span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed"
          >
            We are a collective of thinkers, makers, and dreamers. Our studio is
            a playground for ideas where the only rule is to never stop asking
            "what if?"
          </motion.p>
        </div>

        <div
          className="relative w-full h-[500px] flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {cards.map((card, i) => {
            // Parallax effect based on scroll
            const yOffset = useTransform(
              yProgress,
              [0, 1],
              [100 * (i + 1), -100 * (i + 1)],
            );

            return (
              <motion.div
                key={card.id}
                style={{
                  y: yOffset,
                  zIndex: isHovered ? 10 + i : 5 - i,
                }}
                animate={{
                  rotate: isHovered ? card.rotation * 0.5 : card.rotation,
                  x: isHovered ? card.x * 4 : card.x,
                  y: isHovered ? card.y * 2 : 0,
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 20,
                }}
                className="absolute w-64 h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              >
                <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
                <img
                  src={card.src}
                  alt={`Culture ${i}`}
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity p-6 flex flex-end items-end">
                  <p className="text-xs font-mono uppercase tracking-widest">
                    Team Member {card.id}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {/* Floating background text */}
          <motion.div
            style={{ x: useTransform(yProgress, [0, 1], [-200, 200]) }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif font-black text-white/[0.03] whitespace-nowrap pointer-events-none select-none"
          >
            COLLECTIVE STUDIO
          </motion.div>
        </div>
      </div>
    </section>
  );
}
