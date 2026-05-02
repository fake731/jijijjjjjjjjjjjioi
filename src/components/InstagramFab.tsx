import { Instagram } from "lucide-react";

const InstagramFab = () => {
  return (
    <a
      href="https://www.instagram.com/0oscp/"
      target="_blank"
      rel="noopener noreferrer"
      title="انستغرام — تواصل مع المطور"
      className="fixed bottom-5 right-5 z-[55] w-12 h-12 rounded-2xl flex items-center justify-center
                 bg-card/40 backdrop-blur-2xl border border-primary/30
                 shadow-[0_8px_30px_-6px_hsl(var(--primary)/0.4)]
                 hover:scale-110 hover:bg-primary/15 transition-all duration-300 group"
    >
      <Instagram className="w-5 h-5 text-primary group-hover:text-primary transition-colors" />
      <span className="absolute inset-0 rounded-2xl ring-2 ring-primary/0 group-hover:ring-primary/40 transition-all" />
    </a>
  );
};

export default InstagramFab;