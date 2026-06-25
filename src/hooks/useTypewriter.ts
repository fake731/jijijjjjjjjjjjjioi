import { useEffect, useState } from "react";

export const useTypewriter = (text: string, speed = 45, startDelay = 250) => {
  const [out, setOut] = useState("");

  useEffect(() => {
    setOut("");
    let i = 0;
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) clearInterval(id);
      }, speed);
    }, startDelay);
    return () => clearTimeout(start);
  }, [text, speed, startDelay]);

  return out;
};