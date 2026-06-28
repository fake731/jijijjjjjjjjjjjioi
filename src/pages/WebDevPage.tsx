import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { webDevCategories, WebDevCategory, WebDevTopic } from "@/data/webDevData";
import { Copy, Check, ChevronDown, ChevronUp, Code, FileCode, Zap, FileType, GitBranch, Server, Database, Shield, Wrench, Box, Workflow, Globe, TestTube, Layers, Atom, Palette, ShieldCheck, Lock, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";

const iconMap: Record<string, React.ElementType> = {
  FileCode, Palette, Zap, FileType, Atom, GitBranch, Server, Database, ShieldCheck, Wrench, Box, Workflow, Globe, TestTube, Layers,
};

const WebDevPage = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return webDevCategories;
    const q = searchQuery.toLowerCase();
    return webDevCategories
      .map((cat) => {
        const matchedTopics = cat.topics.filter(
          (t) => t.title.toLowerCase().includes(q) || t.content.toLowerCase().includes(q)
        );
        if (cat.title.toLowerCase().includes(q)) return cat;
        if (matchedTopics.length > 0) return { ...cat, topics: matchedTopics };
        return null;
      })
      .filter(Boolean) as WebDevCategory[];
  }, [searchQuery]);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleCategory = (id: string) => {
    setOpenCategory(prev => prev === id ? null : id);
    setOpenTopic(null);
  };

  const toggleTopic = (id: string) => {
    setOpenTopic(prev => prev === id ? null : id);
  };

  const totalTopics = webDevCategories.reduce((a, c) => a + c.topics.length, 0);

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-3 sm:px-6 max-w-[1700px]">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="glow-orbit float-soft w-20 h-20 rounded-3xl bg-primary/10 border border-primary/30 backdrop-blur-2xl flex items-center justify-center">
                <Code className="w-10 h-10 text-blue-400" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-5 leading-[1] text-holographic">
              تطوير الويب
            </h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              مرجع شامل — من HTML/CSS إلى React والخوادم والأمن.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto mb-8">
              <div className="glass prism-border rounded-2xl p-4 hover-lift">
                <div className="text-2xl md:text-3xl font-extrabold stat-num">{webDevCategories.length}</div>
                <div className="text-xs text-muted-foreground mt-1">قسم</div>
              </div>
              <div className="glass prism-border rounded-2xl p-4 hover-lift">
                <div className="text-2xl md:text-3xl font-extrabold stat-num">{totalTopics}</div>
                <div className="text-xs text-muted-foreground mt-1">موضوع</div>
              </div>
              <div className="glass prism-border rounded-2xl p-4 hover-lift">
                <div className="text-2xl md:text-3xl font-extrabold stat-num">∞</div>
                <div className="text-xs text-muted-foreground mt-1">أمثلة</div>
              </div>
            </div>

            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن موضوع..."
                className="pr-12 h-14 text-base bg-card/15 backdrop-blur-2xl border-primary/20 rounded-2xl"
              />
            </div>
            <div className="section-divider" />
          </div>

          {/* Categories */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 gap-4">
            {filteredCategories.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                لا توجد نتائج لـ "{searchQuery}"
              </div>
            )}
            {filteredCategories.map((category) => {
              const IconComp = iconMap[category.icon] || Code;
              const isOpen = openCategory === category.id;

              return (
                <div key={category.id} className="glass-strong shimmer-sweep hover-lift overflow-hidden transform-gpu will-change-transform">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between p-5 sm:p-7 hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="glow-orbit w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 border border-primary/30 backdrop-blur-2xl flex items-center justify-center">
                        <IconComp className={`w-7 h-7 sm:w-8 sm:h-8 ${category.color}`} />
                      </div>
                      <div className="text-right">
                        <h2 className="text-2xl sm:text-3xl font-bold text-primary">{category.title}</h2>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">{category.topics.length} موضوع</p>
                      </div>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-7 h-7 text-primary" />
                    ) : (
                      <ChevronDown className="w-7 h-7 text-muted-foreground" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-primary/15 p-3 sm:p-5 grid grid-cols-1 lg:grid-cols-2 gap-3">
                          {category.topics.map((topic, tIdx) => {
                            const topicId = `${category.id}-${tIdx}`;
                            const isTopicOpen = openTopic === topicId;

                            return (
                              <div key={topicId} className="glass hover-lift overflow-hidden rounded-2xl">
                                <button
                                  onClick={() => toggleTopic(topicId)}
                                  className="w-full flex items-center justify-between px-4 sm:px-5 py-4 hover:bg-primary/5 transition-colors text-right"
                                >
                                  <span className="font-semibold text-foreground flex items-center gap-2 text-base sm:text-lg">
                                    <span className="w-7 h-7 rounded-lg bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
                                      {tIdx + 1}
                                    </span>
                                    {topic.title}
                                  </span>
                                  {isTopicOpen ? (
                                    <ChevronUp className="w-5 h-5 text-primary" />
                                  ) : (
                                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                  )}
                                </button>

                                <AnimatePresence>
                                  {isTopicOpen && (
                                    <motion.div
                                      initial={{ height: 0 }}
                                      animate={{ height: "auto" }}
                                      exit={{ height: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="relative border-t border-primary/10">
                                        <button
                                          onClick={() => copyCode(topic.content, topicId)}
                                          className="absolute top-3 left-3 z-10 p-2 rounded-lg glass hover:border-primary/60 transition-all"
                                          title="نسخ الكود"
                                        >
                                          {copied === topicId ? (
                                            <Check className="w-4 h-4 text-primary" />
                                          ) : (
                                            <Copy className="w-4 h-4 text-muted-foreground" />
                                          )}
                                        </button>
                                        <pre className="p-4 sm:p-5 pt-14 overflow-x-auto bg-background/40 backdrop-blur-2xl text-xs sm:text-sm max-h-[600px]">
                                          <code className="text-foreground font-mono whitespace-pre" dir="ltr">
                                            {topic.content}
                                          </code>
                                        </pre>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WebDevPage;
