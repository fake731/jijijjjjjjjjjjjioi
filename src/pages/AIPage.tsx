import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Brain, Send, User, Bot, Lock, Globe, Instagram } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const sensitiveKeywords = [
  "اختراق", "هاك", "hack", "exploit", "ثغرة", "password", "كلمة مرور",
  "سرقة", "ddos", "attack", "هجوم", "malware", "فيروس", "ransomware",
  "backdoor", "payload", "shell", "root", "admin", "injection", "حقن",
  "bypass", "تجاوز", "brute", "crack", "كسر", "decrypt", "فك تشفير",
  "wifi", "واي فاي", "network", "شبكة", "server", "سيرفر", "database",
  "قاعدة بيانات", "sql", "xss", "csrf", "phishing", "تصيد", "spoof",
  "انتحال", "keylogger", "trojan", "rat", "botnet", "reverse",
  "meterpreter", "metasploit", "nmap", "kali", "penetration", "pentest",
  "vulnerability", "استغلال", "تجسس", "spy", "sniff", "intercept",
  "mitm", "man in the middle", "zero day", "0day", "buffer overflow",
  "privilege escalation", "تصعيد صلاحيات", "lateral movement", "persistence",
  "c2", "command and control", "exfiltration", "تسريب", "dump", "hash",
  "rainbow table", "wordlist", "dictionary attack", "social engineering",
  "reconnaissance", "footprinting", "enumeration", "scanning", "exploitation",
];

const AIPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingMessage, setPendingMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [language, setLanguage] = useState<"ar" | "en">("ar");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // The secret password - not shown to users
  const SECRET_PASSWORD = "Qusay_kali";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const isSensitiveQuery = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return sensitiveKeywords.some((keyword) => lowerText.includes(keyword.toLowerCase()));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();

    // Check if query is sensitive and user is not authenticated
    if (isSensitiveQuery(userMessage) && !isAuthenticated) {
      setPendingMessage(userMessage);
      setShowPasswordModal(true);
      setInput("");
      return;
    }

    sendMessage(userMessage);
  };

  const sendMessage = async (userMessage: string) => {
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
            language,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let assistantMessage = "";
      let buffer = "";

      // Add empty assistant message
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Process complete lines
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") continue;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantMessage += content;
              setMessages((prev) => {
                const newMsgs = [...prev];
                newMsgs[newMsgs.length - 1] = { role: "assistant", content: assistantMessage };
                return newMsgs;
              });
            }
          } catch {
            // Ignore parsing errors for incomplete JSON
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: language === "ar" 
            ? `❌ حدث خطأ: ${error instanceof Error ? error.message : "خطأ غير معروف"}. حاول مرة أخرى.`
            : `❌ Error: ${error instanceof Error ? error.message : "Unknown error"}. Please try again.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SECRET_PASSWORD || password.toLowerCase() === SECRET_PASSWORD.toLowerCase()) {
      setIsAuthenticated(true);
      setShowPasswordModal(false);
      setPasswordError("");
      if (pendingMessage) {
        sendMessage(pendingMessage);
        setPendingMessage("");
      }
    } else {
      setPasswordError(
        language === "ar"
          ? "كلمة السر غير صحيحة. تواصل مع المطور على انستغرام للحصول عليها."
          : "Incorrect password. Contact the developer on Instagram to get it."
      );
    }
    setPassword("");
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const t = {
    title: language === "ar" ? "Qusay AI" : "Qusay AI",
    subtitle: language === "ar" ? "مساعدك الذكي في الأمن السيبراني" : "Your smart cybersecurity assistant",
    developer: language === "ar" ? "تطوير: Qusay_kali" : "Developed by: Qusay_kali",
    advancedMode: language === "ar" ? "وضع متقدم مفعّل" : "Advanced mode enabled",
    welcome: language === "ar" ? "مرحباً بك!" : "Welcome!",
    askAnything: language === "ar" ? "اسألني أي سؤال عن الأمن السيبراني" : "Ask me anything about cybersecurity",
    advancedTip: language === "ar" 
      ? "للأسئلة المتقدمة، تواصل مع المطور على انستغرام للحصول على كلمة السر" 
      : "For advanced questions, contact the developer on Instagram to get the password",
    typePlaceholder: language === "ar" ? "اكتب سؤالك هنا..." : "Type your question here...",
    advancedRequest: language === "ar" ? "طلب متقدم" : "Advanced Request",
    advancedDesc: language === "ar" 
      ? "هذا السؤال يتطلب صلاحيات متقدمة. أدخل كلمة السر للمتابعة." 
      : "This question requires advanced permissions. Enter the password to continue.",
    passwordHint: language === "ar" 
      ? "للحصول على كلمة السر، تواصل مع المطور على انستغرام" 
      : "To get the password, contact the developer on Instagram",
    enterPassword: language === "ar" ? "أدخل كلمة السر..." : "Enter password...",
    cancel: language === "ar" ? "إلغاء" : "Cancel",
    confirm: language === "ar" ? "تأكيد" : "Confirm",
    contactInstagram: language === "ar" ? "تواصل على انستغرام" : "Contact on Instagram",
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-8 flex flex-col">
        <div className="container mx-auto px-4 flex-1 flex flex-col max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="cyber-icon-box w-16 h-16">
                <Brain className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary text-glow mb-2">
              {t.title}
            </h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
            <p className="text-xs text-primary/70 mt-1">{t.developer}</p>
            <div className="flex items-center justify-center gap-3 mt-4">
              {isAuthenticated && (
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">
                  <Lock className="w-4 h-4" />
                  {t.advancedMode}
                </span>
              )}
              <button
                onClick={toggleLanguage}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border/50 text-muted-foreground text-sm hover:border-primary/50 transition-colors"
              >
                <Globe className="w-4 h-4" />
                {language === "ar" ? "English" : "العربية"}
              </button>
            </div>
          </div>

          {/* Chat Container */}
          <div className="flex-1 cyber-card overflow-hidden flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Bot className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">{t.welcome}</p>
                  <p className="text-sm">{t.askAnything}</p>
                  <div className="mt-6 flex flex-col items-center gap-3">
                    <p className="text-xs text-muted-foreground/70 max-w-md">💡 {t.advancedTip}</p>
                    <a
                      href="https://www.instagram.com/qusay_kali"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      <Instagram className="w-4 h-4" />
                      {t.contactInstagram}
                    </a>
                  </div>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 ${
                      message.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        message.role === "user"
                          ? "bg-primary/20 border border-primary/30"
                          : "bg-secondary border border-border/50"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="w-5 h-5 text-primary" />
                      ) : (
                        <Bot className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        message.role === "user"
                          ? "bg-primary/20 border border-primary/30"
                          : "bg-secondary border border-border/50"
                      }`}
                    >
                      <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))
              )}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary border border-border/50 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="bg-secondary border border-border/50 rounded-2xl p-4">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-border/30">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.typePlaceholder}
                  className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                  disabled={isLoading}
                  dir={language === "ar" ? "rtl" : "ltr"}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="cyber-button-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="cyber-card p-8 max-w-md w-full mx-4 animate-scale-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-2">{t.advancedRequest}</h2>
              <p className="text-muted-foreground text-sm">{t.advancedDesc}</p>
            </div>

            <div className="flex flex-col items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 mb-6">
              <p className="text-sm text-muted-foreground text-center">{t.passwordHint}</p>
              <a
                href="https://www.instagram.com/qusay_kali"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Instagram className="w-4 h-4" />
                @qusay_kali
              </a>
            </div>

            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.enterPassword}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all mb-4"
                autoFocus
              />
              {passwordError && <p className="text-destructive text-sm mb-4 text-center">{passwordError}</p>}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPendingMessage("");
                    setPasswordError("");
                  }}
                  className="flex-1 px-6 py-3 rounded-xl border border-border/50 text-muted-foreground hover:bg-secondary transition-colors"
                >
                  {t.cancel}
                </button>
                <button type="submit" className="flex-1 cyber-button-primary">
                  {t.confirm}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPage;