import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronDown, ChevronUp, Copy, Check, Search, Download, LayoutGrid, List, Terminal, Globe, Lock } from "lucide-react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tools, toolIcons, Tool } from "@/data/toolsData";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

// Color mapping for tool icons based on tool category/type
const toolColors: Record<string, string> = {
  "Nmap": "text-cyan-400",
  "Metasploit": "text-red-500",
  "Burp Suite": "text-orange-500",
  "Wireshark": "text-blue-400",
  "John the Ripper": "text-yellow-500",
  "Hydra": "text-green-400",
  "SQLMap": "text-red-400",
  "Aircrack-ng": "text-sky-400",
  "Nikto": "text-lime-400",
  "Hashcat": "text-amber-500",
  "Gobuster": "text-emerald-400",
  "Netcat": "text-violet-400",
  "Enum4linux": "text-indigo-400",
  "Dirb": "text-teal-400",
  "Wfuzz": "text-rose-400",
  "theHarvester": "text-green-500",
  "Maltego": "text-blue-500",
  "Responder": "text-red-400",
  "Recon-ng": "text-purple-400",
  "CrackMapExec": "text-orange-400",
  "Sn1per": "text-red-500",
  "Wpscan": "text-cyan-500",
  "Ffuf": "text-pink-400",
  "Feroxbuster": "text-amber-400",
  "Impacket": "text-yellow-400",
  "BeEF": "text-red-500",
  "SET": "text-rose-500",
  "Mimikatz": "text-yellow-500",
  "BloodHound": "text-red-400",
  "Amass": "text-blue-400",
  "Nuclei": "text-purple-500",
  "Subfinder": "text-teal-500",
  "Masscan": "text-cyan-400",
  "LinPEAS": "text-yellow-400",
  "CamPhish": "text-pink-500",
  "HiddenEye": "text-violet-500",
  "Seeker": "text-green-400",
  "SocialFish": "text-blue-400",
  "Hound": "text-amber-500",
  "PhoneInfoga": "text-emerald-500",
  "Sherlock": "text-indigo-400",
  "SpiderFoot": "text-orange-400",
  "ReconDog": "text-amber-400",
  "Ghost Phisher": "text-slate-400",
  "Zphisher": "text-sky-400",
  "BlackEye": "text-rose-500",
  "Osintgram": "text-pink-400",
  "IPinfo": "text-blue-500",
  "Curl": "text-green-400",
  "Wget": "text-teal-400",
  "DNSRecon": "text-cyan-500",
  "Whois": "text-indigo-400",
  "Traceroute": "text-violet-400",
  "Netstat": "text-sky-400",
  "ifconfig": "text-emerald-400",
  "SSH": "text-yellow-500",
  "OpenSSL": "text-green-500",
  "Nslookup": "text-blue-400",
  "Dig": "text-teal-400",
  "Ping": "text-lime-400",
  "ARP": "text-cyan-400",
  "Route": "text-indigo-400",
  "TCPDump": "text-purple-400",
  "IP": "text-sky-400",
  "Ettercap": "text-red-400",
  "Arpspoof": "text-orange-400",
  "Bettercap": "text-rose-400",
  "Fierce": "text-amber-500",
  "DNSEnum": "text-blue-400",
  "Hping3": "text-cyan-400",
  "Medusa": "text-red-500",
  "Patator": "text-orange-500",
  "CeWL": "text-yellow-400",
  "Crunch": "text-amber-400",
  "RSMangler": "text-lime-400",
  "Searchsploit": "text-green-400",
  "Exploit-DB": "text-red-400",
  "WinPEAS": "text-yellow-500",
  "PEAS-ng": "text-amber-500",
  "GTFOBins": "text-emerald-400",
  "PayloadsAllTheThings": "text-violet-400",
  "SecLists": "text-teal-400",
  "Commix": "text-rose-500",
  "XXEinjector": "text-purple-500",
  "Maltego CE": "text-blue-500",
  "OWASP ZAP": "text-orange-500",
  "Tshark": "text-cyan-400",
  "Greenbone/OpenVAS": "text-green-500",
  "Shodan CLI": "text-red-400",
  "Spiderfoot": "text-orange-400",
  "Censys": "text-indigo-400",
  "Snort": "text-pink-500",
  "Suricata": "text-amber-400",
  "Zeek": "text-sky-400",
};

const ToolsPage = () => {
  const { user } = useAuth();
  const [expandedTool, setExpandedTool] = useState<number | null>(0);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState<"ar" | "en">("ar");
  const [viewMode, setViewMode] = useState<"expanded" | "compact">("expanded");

  const requireAuth = (action: () => void) => {
    if (!user) {
      toast.error("سجل دخول أولاً لاستخدام هذه الميزة");
      return;
    }
    action();
  };

  const copyCommand = (command: string) => {
    requireAuth(() => {
      navigator.clipboard.writeText(command);
      setCopiedCommand(command);
      setTimeout(() => setCopiedCommand(null), 2000);
    });
  };

  const downloadTool = (tool: Tool) => {
    requireAuth(() => {
      const watermark = `# ═══════════════════════════════════════════════════════════════
# Tool: ${tool.name}
# By: Qusay_kali
# Instagram: @0oscp
# Website: https://qusaykali.netlify.app/
# ═══════════════════════════════════════════════════════════════

# ${language === "ar" ? tool.description.ar : tool.description.en}

# ═══════════════════════════════════════════════════════════════
# ${language === "ar" ? "خطوات التثبيت والاستخدام" : "Installation & Usage Steps"}
# ═══════════════════════════════════════════════════════════════

`;
      const commands = tool.commands.map((cmd, i) => 
        `# ${language === "ar" ? "الخطوة" : "Step"} ${i + 1}: ${language === "ar" ? cmd.description.ar : cmd.description.en}\n${cmd.command}\n`
      ).join('\n');
      
      const content = watermark + commands;
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${tool.name.toLowerCase().replace(/\s+/g, '-')}-commands.sh`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return tools;
    const query = searchQuery.toLowerCase();
    return tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.ar.includes(searchQuery) ||
        tool.description.en.toLowerCase().includes(query) ||
        tool.commands.some(
          (cmd) =>
            cmd.command.toLowerCase().includes(query) ||
            cmd.description.ar.includes(searchQuery) ||
            cmd.description.en.toLowerCase().includes(query)
        )
    );
  }, [searchQuery]);

  const totalCommands = tools.reduce((acc, tool) => acc + tool.commands.length, 0);

  const t = {
    title: language === "ar" ? "أدوات كالي لينكس" : "Kali Linux Tools",
    subtitle: language === "ar" 
      ? "استكشف أدوات اختبار الاختراق الاحترافية" 
      : "Explore professional penetration testing tools",
    search: language === "ar" ? "ابحث عن أداة أو أمر..." : "Search for a tool or command...",
    commands: language === "ar" ? "أمر" : "commands",
    expandedView: language === "ar" ? "عرض موسع" : "Expanded",
    compactView: language === "ar" ? "عرض مضغوط" : "Compact",
    legalWarning: language === "ar" 
      ? "⚠️ تحذير قانوني: هذه الأدوات مخصصة للأغراض التعليمية واختبار الاختراق الأخلاقي فقط. استخدم هذه الأدوات فقط على أنظمتك الخاصة أو بتصريح كتابي من المالك. الاستخدام غير المصرح به يعد جريمة يعاقب عليها القانون."
      : "⚠️ Legal Warning: These tools are for educational purposes and ethical penetration testing only. Use only on systems you own or have written authorization. Unauthorized use is illegal.",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <div className="cyber-icon-box">
                <Terminal className="w-10 h-10 text-primary" />
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-primary text-glow">
                {t.title}
              </h1>
              <button
                onClick={() => setLanguage(prev => prev === "ar" ? "en" : "ar")}
                className="p-2 rounded-lg bg-secondary border border-border/50 hover:border-primary/50 transition-colors"
              >
                <Globe className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.subtitle}</p>
            
            {/* Legal Warning Banner */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 max-w-4xl mx-auto p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 backdrop-blur-sm"
            >
              <p className={`text-yellow-400 text-sm md:text-base font-medium ${language === "ar" ? "text-right" : "text-left"}`} dir={language === "ar" ? "rtl" : "ltr"}>
                {t.legalWarning}
              </p>
            </motion.div>
          </motion.div>

          {/* Search & View Toggle */}
          <div className="max-w-4xl mx-auto mb-10 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.search}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                dir={language === "ar" ? "rtl" : "ltr"}
              />
            </div>
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-secondary rounded-xl p-1 border border-border/50">
              <button
                onClick={() => setViewMode("expanded")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  viewMode === "expanded"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">{t.expandedView}</span>
              </button>
              <button
                onClick={() => setViewMode("compact")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  viewMode === "compact"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <List className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">{t.compactView}</span>
              </button>
            </div>
          </div>

          {/* Tools Grid */}
          <motion.div 
            layout
            className={`max-w-6xl mx-auto ${viewMode === "compact" ? "space-y-2" : "space-y-4"}`}
          >
            {filteredTools.map((tool, index) => (
              <motion.div 
                key={index} 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                className={`cyber-card overflow-hidden ${viewMode === "compact" ? "p-0" : ""}`}
              >
                <button
                  onClick={() => setExpandedTool(expandedTool === index ? null : index)}
                  className={`w-full flex items-center justify-between hover:bg-primary/5 transition-colors ${
                    viewMode === "compact" ? "p-3" : "p-5"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center ${
                      viewMode === "compact" ? "w-10 h-10" : "w-16 h-16"
                    }`}>
                      {(() => {
                        const IconComponent = toolIcons[tool.name] || Terminal;
                        const iconColor = toolColors[tool.name] || "text-primary";
                        return <IconComponent className={`${viewMode === "compact" ? "w-5 h-5" : "w-8 h-8"} ${iconColor}`} />;
                      })()}
                    </div>
                    <div className={language === "ar" ? "text-right" : "text-left"}>
                      <h3 className={`font-bold text-primary ${viewMode === "compact" ? "text-lg" : "text-2xl"}`}>
                        {tool.name}
                      </h3>
                      {viewMode === "expanded" && (
                        <p className="text-muted-foreground text-base mt-1">
                          {language === "ar" ? tool.description.ar : tool.description.en}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-lg bg-primary/10 text-primary font-medium ${
                      viewMode === "compact" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
                    }`}>
                      {tool.commands.length} {t.commands}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadTool(tool);
                      }}
                      className={`rounded-lg bg-primary/20 hover:bg-primary/30 transition-colors ${
                        viewMode === "compact" ? "p-1.5" : "p-2"
                      }`}
                      title={language === "ar" ? "تحميل الأوامر" : "Download Commands"}
                    >
                      <Download className={viewMode === "compact" ? "w-4 h-4 text-primary" : "w-5 h-5 text-primary"} />
                    </button>
                    {expandedTool === index ? (
                      <ChevronUp className={viewMode === "compact" ? "w-5 h-5 text-primary" : "w-6 h-6 text-primary"} />
                    ) : (
                      <ChevronDown className={viewMode === "compact" ? "w-5 h-5 text-muted-foreground" : "w-6 h-6 text-muted-foreground"} />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {expandedTool === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className={`border-t border-border/30 grid grid-cols-1 md:grid-cols-2 gap-3 ${
                        viewMode === "compact" ? "p-3" : "p-4"
                      }`}>
                        {tool.commands.map((cmd, cmdIndex) => (
                          <div
                            key={cmdIndex}
                            className={`flex items-start gap-3 rounded-xl bg-secondary/50 hover:bg-secondary/80 transition-colors group ${
                              viewMode === "compact" ? "p-2" : "p-3"
                            }`}
                          >
                            <span className={`rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold flex-shrink-0 ${
                              viewMode === "compact" ? "w-6 h-6 text-xs" : "w-7 h-7 text-xs"
                            }`}>
                              {cmdIndex + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <code className="text-primary text-xs font-mono bg-background/50 px-2 py-0.5 rounded break-all" dir="ltr">
                                  {cmd.command}
                                </code>
                                <button
                                  onClick={() => copyCommand(cmd.command)}
                                  className="p-1 rounded hover:bg-primary/20 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                                >
                                  {copiedCommand === cmd.command ? (
                                    <Check className="w-3 h-3 text-primary" />
                                  ) : (
                                    <Copy className="w-3 h-3 text-muted-foreground" />
                                  )}
                                </button>
                              </div>
                              <p className="text-muted-foreground text-xs">
                                {language === "ar" ? cmd.description.ar : cmd.description.en}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ToolsPage;
