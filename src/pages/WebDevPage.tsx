import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PasswordStrengthChecker from "@/components/PasswordStrengthChecker";
import { webDevCategories, WebDevCategory, WebDevTopic } from "@/data/webDevData";
import { Copy, Check, ChevronDown, ChevronUp, Code, FileCode, Zap, FileType, GitBranch, Server, Database, Shield, Wrench, Box, Workflow, Globe, TestTube, Layers, Atom, Palette, ShieldCheck, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const iconMap: Record<string, React.ElementType> = {
  FileCode, Palette, Zap, FileType, Atom, GitBranch, Server, Database, ShieldCheck, Wrench, Box, Workflow, Globe, TestTube, Layers,
};

const WebDevPage = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="cyber-icon-box">
                <Code className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary text-glow mb-4">
              تطوير الويب
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              دليل شامل لتعلم تطوير الويب من الصفر إلى الاحتراف - {webDevCategories.length} قسم و {webDevCategories.reduce((a, c) => a + c.topics.length, 0)} موضوع
            </p>
          </div>

          {/* Password Strength Checker */}
          <div className="mb-16">
            <PasswordStrengthChecker />
          </div>

          {/* Categories */}
          <div className="max-w-5xl mx-auto space-y-4">
            {webDevCategories.map((category) => {
              const IconComp = iconMap[category.icon] || Code;
              const isOpen = openCategory === category.id;

              return (
                <div key={category.id} className="cyber-card overflow-hidden">
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between p-6 hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                        <IconComp className={`w-6 h-6 ${category.color}`} />
                      </div>
                      <div className="text-right">
                        <h2 className="text-xl font-bold text-primary">{category.title}</h2>
                        <p className="text-sm text-muted-foreground">{category.topics.length} موضوع</p>
                      </div>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-6 h-6 text-primary" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-muted-foreground" />
                    )}
                  </button>

                  {/* Topics */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border/30 p-4 space-y-2">
                          {category.topics.map((topic, tIdx) => {
                            const topicId = `${category.id}-${tIdx}`;
                            const isTopicOpen = openTopic === topicId;

                            return (
                              <div key={topicId} className="rounded-xl border border-border/30 overflow-hidden">
                                <button
                                  onClick={() => toggleTopic(topicId)}
                                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-primary/5 transition-colors"
                                >
                                  <span className="font-semibold text-foreground flex items-center gap-2">
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
                                      <div className="relative border-t border-border/20">
                                        <button
                                          onClick={() => copyCode(topic.content, topicId)}
                                          className="absolute top-3 left-3 z-10 p-2 rounded-lg bg-secondary border border-border/50 hover:border-primary/50 transition-all"
                                          title="نسخ الكود"
                                        >
                                          {copied === topicId ? (
                                            <Check className="w-4 h-4 text-primary" />
                                          ) : (
                                            <Copy className="w-4 h-4 text-muted-foreground" />
                                          )}
                                        </button>
                                        <pre className="p-5 pt-14 overflow-x-auto bg-background/50 text-sm max-h-[600px]">
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
