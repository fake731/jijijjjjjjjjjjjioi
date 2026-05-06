import { MessageCircle } from "lucide-react";

// Pinned WhatsApp FAB (replaces Instagram pin). Direct contact with the developer.
const InstagramFab = () => {
  const phone = "962782945976";
  const text = encodeURIComponent("مرحبا قصي، تواصلت معك من الموقع.");
  return (
    <a
      href={`https://wa.me/${phone}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      title="واتساب — تواصل مع المطور"
      className="fixed bottom-5 right-5 z-[55] w-12 h-12 rounded-2xl flex items-center justify-center
                 bg-card/30 backdrop-blur-2xl border border-emerald-400/40
                 shadow-[0_8px_30px_-6px_hsl(145_80%_50%/0.5)]
                 hover:scale-110 hover:bg-emerald-500/15 transition-all duration-300 group"
    >
      <MessageCircle className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
      <span className="absolute inset-0 rounded-2xl ring-2 ring-emerald-400/0 group-hover:ring-emerald-400/40 transition-all" />
    </a>
  );
};

export default InstagramFab;