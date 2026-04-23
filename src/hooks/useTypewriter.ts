import { useEffect, useState } from "react";

export function useTypewriter(
  words: string[],
  opts: { typeSpeed?: number; deleteSpeed?: number; pause?: number } = {}
): string {
  const { typeSpeed = 58, deleteSpeed = 32, pause = 1800 } = opts;
  const [typed, setTyped] = useState("");
  const [idx, setIdx] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // Reset when word list changes (language switch)
  useEffect(() => {
    setTyped("");
    setIdx(0);
    setIsTyping(true);
  }, [words]);

  useEffect(() => {
    if (words.length === 0) return;
    const current = words[idx % words.length];
    if (isTyping) {
      if (typed.length < current.length) {
        const id = setTimeout(
          () => setTyped(current.slice(0, typed.length + 1)),
          typeSpeed
        );
        return () => clearTimeout(id);
      }
      const id = setTimeout(() => setIsTyping(false), pause);
      return () => clearTimeout(id);
    }
    if (typed.length > 0) {
      const id = setTimeout(() => setTyped((s) => s.slice(0, -1)), deleteSpeed);
      return () => clearTimeout(id);
    }
    setIdx((i) => (i + 1) % words.length);
    setIsTyping(true);
    return undefined;
  }, [typed, isTyping, idx, words, typeSpeed, deleteSpeed, pause]);

  return typed;
}
