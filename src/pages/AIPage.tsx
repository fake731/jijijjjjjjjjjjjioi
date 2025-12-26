import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Brain, Send, User, Bot, Lock, AlertTriangle } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const sensitiveKeywords = [
  "اختراق",
  "هاك",
  "hack",
  "exploit",
  "ثغرة",
  "password",
  "كلمة مرور",
  "سرقة",
  "ddos",
  "attack",
  "هجوم",
  "malware",
  "فيروس",
  "ransomware",
  "backdoor",
  "payload",
  "shell",
  "root",
  "admin",
  "injection",
  "حقن",
  "bypass",
  "تجاوز",
  "brute",
  "crack",
  "كسر",
  "decrypt",
  "فك تشفير",
  "wifi",
  "واي فاي",
  "network",
  "شبكة",
  "server",
  "سيرفر",
  "database",
  "قاعدة بيانات",
  "sql",
  "xss",
  "csrf",
  "phishing",
  "تصيد",
  "spoof",
  "انتحال",
  "keylogger",
  "trojan",
  "rat",
  "botnet",
  "reverse",
  "meterpreter",
  "metasploit",
  "nmap",
  "kali",
  "penetration",
  "pentest",
  "vulnerability",
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    // Simulate AI response (since we don't have backend yet)
    setTimeout(() => {
      const responses = [
        "مرحباً! أنا مساعدك في الأمن السيبراني. كيف يمكنني مساعدتك اليوم؟",
        "هذا سؤال رائع! دعني أشرح لك...",
        "بالنسبة لهذا الموضوع، من المهم أن تفهم الأساسيات أولاً.",
        "يمكنني مساعدتك في فهم هذا المفهوم بشكل أفضل.",
        "تذكر دائماً أن تستخدم هذه المعرفة بشكل أخلاقي وقانوني.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `${randomResponse}\n\n⚠️ ملاحظة: هذه نسخة تجريبية. للحصول على ذكاء اصطناعي حقيقي، يحتاج الموقع لتفعيل Lovable Cloud.`,
        },
      ]);
      setIsLoading(false);
    }, 1500);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // The password is on Instagram: qusay_kali1
    if (password === "qusay123" || password === "Qusay123") {
      setIsAuthenticated(true);
      setShowPasswordModal(false);
      setPasswordError("");
      if (pendingMessage) {
        sendMessage(pendingMessage);
        setPendingMessage("");
      }
    } else {
      setPasswordError("كلمة السر غير صحيحة. تجدها في الانستغرام @qusay_kali1");
    }
    setPassword("");
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
              الذكاء الاصطناعي
            </h1>
            <p className="text-muted-foreground">
              مساعدك الذكي في الأمن السيبراني
            </p>
            {isAuthenticated && (
              <span className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">
                <Lock className="w-4 h-4" />
                وضع متقدم مفعّل
              </span>
            )}
          </div>

          {/* Chat Container */}
          <div className="flex-1 cyber-card overflow-hidden flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Bot className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">مرحباً بك!</p>
                  <p className="text-sm">اسألني أي سؤال عن الأمن السيبراني</p>
                  <p className="text-xs mt-4 text-muted-foreground/70">
                    💡 للأسئلة المتقدمة، ستحتاج كلمة السر من الانستغرام
                  </p>
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
                      <p className="text-foreground whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
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
                  placeholder="اكتب سؤالك هنا..."
                  className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                  disabled={isLoading}
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
              <h2 className="text-2xl font-bold text-primary mb-2">طلب متقدم</h2>
              <p className="text-muted-foreground text-sm">
                هذا السؤال يتطلب صلاحيات متقدمة. أدخل كلمة السر للمتابعة.
              </p>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 mb-6">
              <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                كلمة السر موجودة في حساب الانستغرام{" "}
                <a
                  href="https://www.instagram.com/qusay_kali1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  @qusay_kali1
                </a>
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة السر..."
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all mb-4"
                autoFocus
              />
              {passwordError && (
                <p className="text-destructive text-sm mb-4">{passwordError}</p>
              )}
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
                  إلغاء
                </button>
                <button type="submit" className="flex-1 cyber-button-primary">
                  تأكيد
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
