import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Brain, Send, User, Bot, Lock, Globe, Instagram, Image, X, FileText, Paperclip, Camera, Upload, Copy, LogIn, History, Plus, Trash2 } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

interface Message {
  role: "user" | "assistant";
  content: string;
  images?: string[];
  file?: {
    name: string;
    content: string;
  };
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

const MAX_IMAGES = 3;

const AIPage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingMessage, setPendingMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [language, setLanguage] = useState<"ar" | "en">("ar");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<{ name: string; content: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [conversations, setConversations] = useState<{ id: string; firstMessage: string; date: string }[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const SECRET_PASSWORD = "Qusay_kali";

  // Fetch conversation history
  const fetchConversations = useCallback(async () => {
    if (!user) return;
    setLoadingHistory(true);
    try {
      const { data } = await supabase
        .from("ai_chat_logs")
        .select("conversation_id, message, created_at")
        .eq("user_id", user.id)
        .eq("ai_version", "v1")
        .order("created_at", { ascending: false });

      if (data) {
        const convMap = new Map<string, { firstMessage: string; date: string }>();
        // Group by conversation_id, keep the earliest message as title
        for (const log of data) {
          const cid = log.conversation_id;
          if (!cid) continue;
          if (!convMap.has(cid)) {
            convMap.set(cid, {
              firstMessage: log.message.slice(0, 60) + (log.message.length > 60 ? "..." : ""),
              date: log.created_at,
            });
          }
        }
        setConversations(
          Array.from(convMap.entries()).map(([id, v]) => ({ id, ...v }))
        );
      }
    } catch (err) {
      console.error("Failed to fetch conversations:", err);
    } finally {
      setLoadingHistory(false);
    }
  }, [user]);

  const loadConversation = async (cid: string) => {
    if (!user) return;
    try {
      const { data } = await supabase
        .from("ai_chat_logs")
        .select("message, response, created_at")
        .eq("conversation_id", cid)
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (data) {
        const loadedMessages: Message[] = [];
        for (const log of data) {
          loadedMessages.push({ role: "user", content: log.message });
          if (log.response) {
            loadedMessages.push({ role: "assistant", content: log.response });
          }
        }
        setMessages(loadedMessages);
        setConversationId(cid);
        setShowHistory(false);
      }
    } catch (err) {
      console.error("Failed to load conversation:", err);
    }
  };

  const startNewConversation = () => {
    setMessages([]);
    setConversationId(null);
    setShowHistory(false);
  };

  useEffect(() => {
    if (showHistory && user) {
      fetchConversations();
    }
  }, [showHistory, user, fetchConversations]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const isSensitiveQuery = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return sensitiveKeywords.some((keyword) => lowerText.includes(keyword.toLowerCase()));
  };

  const processImageFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const imageFiles = fileArray.filter(file => file.type.startsWith('image/'));
    const remainingSlots = MAX_IMAGES - selectedImages.length;
    const filesToProcess = imageFiles.slice(0, remainingSlots);

    filesToProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImages((prev) => {
          if (prev.length < MAX_IMAGES) {
            return [...prev, reader.result as string];
          }
          return prev;
        });
      };
      reader.readAsDataURL(file);
    });
  }, [selectedImages.length]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    processImageFiles(files);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    processImageFiles(files);
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processTextFile(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const processTextFile = (file: File) => {
    const allowedTypes = [
      'text/plain', 'text/html', 'text/css', 'text/javascript',
      'application/json', 'application/xml', 'text/xml', 'text/markdown', 'text/csv',
    ];
    const allowedExtensions = ['.txt', '.html', '.css', '.js', '.ts', '.jsx', '.tsx', '.json', '.xml', '.md', '.csv', '.py', '.java', '.c', '.cpp', '.h', '.php', '.rb', '.go', '.rs', '.swift', '.kt', '.sh', '.bash', '.zsh', '.yaml', '.yml', '.toml', '.ini', '.cfg', '.conf', '.log', '.sql'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    const isAllowedType = allowedTypes.includes(file.type) || allowedExtensions.includes(fileExtension);

    if (!isAllowedType) {
      alert(language === "ar" ? "يرجى اختيار ملف نصي فقط" : "Please select a text file only");
      return;
    }

    if (file.size > 500000) {
      alert(language === "ar" ? "حجم الملف كبير جداً (الحد الأقصى 500KB)" : "File size too large (max 500KB)");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFile({ name: file.name, content: reader.result as string });
    };
    reader.readAsText(file);
  };

  // Drag and Drop handlers
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget === dropZoneRef.current) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (!files.length) return;

    const imageFiles: File[] = [];
    let textFile: File | null = null;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        imageFiles.push(file);
      } else {
        if (!textFile) textFile = file;
      }
    });

    if (imageFiles.length > 0) {
      processImageFiles(imageFiles);
    }
    if (textFile && !selectedFile) {
      processTextFile(textFile);
    }
  }, [processImageFiles, selectedFile, language]);

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && selectedImages.length === 0 && !selectedFile) || isLoading) return;

    const userMessage = input.trim();

    if (isSensitiveQuery(userMessage) && !isAuthenticated) {
      setPendingMessage(userMessage);
      setShowPasswordModal(true);
      setInput("");
      return;
    }

    sendMessage(userMessage, selectedImages, selectedFile);
    setSelectedImages([]);
    setSelectedFile(null);
  };

  const sendMessage = async (
    userMessage: string,
    images?: string[],
    file?: { name: string; content: string } | null
  ) => {
    setInput("");
    const newMessage: Message = { role: "user", content: userMessage };
    if (images && images.length > 0) newMessage.images = images;
    if (file) newMessage.file = file;
    const newMessages: Message[] = [...messages, newMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const apiMessages = newMessages.map((m) => {
        const contentParts: any[] = [];
        let textContent = m.content || "";
        
        if (m.file) {
          textContent += `\n\n--- ${language === "ar" ? "محتوى الملف" : "File Content"}: ${m.file.name} ---\n${m.file.content}\n--- ${language === "ar" ? "نهاية الملف" : "End of File"} ---`;
        }
        
        if (textContent || (m.images && m.images.length > 0)) {
          contentParts.push({
            type: "text",
            text: textContent || (language === "ar" ? "ما هذه الصور؟" : "What are these images?"),
          });
        }

        if (m.images && m.images.length > 0) {
          m.images.forEach((img) => {
            contentParts.push({ type: "image_url", image_url: { url: img } });
          });
        }

        if (contentParts.length > 1 || (m.images && m.images.length > 0)) {
          return { role: m.role, content: contentParts };
        }
        return { role: m.role, content: textContent };
      });

      // Generate conversation ID if new conversation
      let currentConvId = conversationId;
      if (!currentConvId) {
        currentConvId = crypto.randomUUID();
        setConversationId(currentConvId);
      }

      const { data: { session } } = await supabase.auth.getSession();
      const accessToken = session?.access_token || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ messages: apiMessages, language, conversationId: currentConvId }),
        }
      );

      if (!response.ok) {
        let errorMessage = "Failed to get response";

        try {
          const errorData = await response.json();
          if (errorData?.error) errorMessage = errorData.error;
        } catch {
          // ignore non-JSON errors
        }

        if (response.status === 402) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                language === "ar"
                  ? "تم توقيف الذكاء الاصطناعي مؤقتاً. الرجاء زيارة هذا الموقع الذي فيه ذكاء اصطناعي صالح: https://qusaykali.netlify.app/"
                  : "AI is temporarily suspended. Please visit this website which has a working AI: https://qusaykali.netlify.app/",
            },
          ]);
          return;
        }

        if (response.status === 429) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                language === "ar"
                  ? "تم تجاوز حد الطلبات حالياً. انتظر قليلاً ثم جرّب مرة أخرى."
                  : "Rate limit exceeded. Please wait a moment and try again.",
            },
          ]);
          return;
        }

        throw new Error(errorMessage);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let assistantMessage = "";
      let buffer = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
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
            // Ignore parsing errors
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            language === "ar"
              ? `حدث خطأ: ${error instanceof Error ? error.message : "خطأ غير معروف"}.`
              : `Error: ${error instanceof Error ? error.message : "Unknown error"}.`,
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
    title: "Qusay AI",
    subtitle: language === "ar" ? "مساعدك الذكي في الأمن السيبراني" : "Your smart cybersecurity assistant",
    developer: language === "ar" ? "تطوير: Qusay_kali" : "Developed by: Qusay_kali",
    advancedMode: language === "ar" ? "وضع متقدم مفعّل" : "Advanced mode enabled",
    welcome: language === "ar" ? "مرحباً بك!" : "Welcome!",
    askAnything: language === "ar" ? "اسألني أي سؤال عن الأمن السيبراني" : "Ask me anything about cybersecurity",
    advancedTip: "",
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
    addImages: language === "ar" ? `صور (${selectedImages.length}/${MAX_IMAGES})` : `Images (${selectedImages.length}/${MAX_IMAGES})`,
    addFile: language === "ar" ? "ملف" : "File",
    camera: language === "ar" ? "كاميرا" : "Camera",
    supportedFormats: "",
    dropHere: language === "ar" ? "أفلت الملفات هنا" : "Drop files here",
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-8 flex flex-col">
        <div className="container mx-auto px-4 flex-1 flex flex-col max-w-4xl">
          {/* Header */}
          <div className="text-center mb-6">
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
              {user && (
                <>
                  <button
                    onClick={startNewConversation}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm hover:bg-primary/30 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    {language === "ar" ? "محادثة جديدة" : "New Chat"}
                  </button>
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-colors ${showHistory ? 'bg-primary text-primary-foreground' : 'bg-secondary border border-border/50 text-muted-foreground hover:border-primary/50'}`}
                  >
                    <History className="w-4 h-4" />
                    {language === "ar" ? "المحادثات السابقة" : "History"}
                  </button>
                </>
              )}
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

            {/* Chat History Panel */}
            {showHistory && (
              <div className="mt-4 max-h-64 overflow-y-auto rounded-xl border border-border/30 bg-card/80 backdrop-blur-sm">
                {loadingHistory ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : conversations.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8 text-sm">
                    {language === "ar" ? "لا توجد محادثات سابقة" : "No previous conversations"}
                  </p>
                ) : (
                  <div className="divide-y divide-border/20">
                    {conversations.map((conv) => (
                      <button
                        key={conv.id}
                        onClick={() => loadConversation(conv.id)}
                        className={`w-full text-right p-3 hover:bg-secondary/50 transition-colors flex items-center justify-between gap-3 ${conversationId === conv.id ? 'bg-primary/10 border-r-2 border-primary' : ''}`}
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-foreground truncate">{conv.firstMessage}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(conv.date).toLocaleDateString("ar", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Chat Container with Drop Zone */}
          <div 
            ref={dropZoneRef}
            className={`flex-1 cyber-card overflow-hidden flex flex-col relative transition-all duration-200 ${isDragging ? 'border-primary border-2 bg-primary/5' : ''}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {/* Drag Overlay */}
            {isDragging && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/90 backdrop-blur-sm">
                <div className="text-center">
                  <Upload className="w-16 h-16 text-primary mx-auto mb-4 animate-bounce" />
                  <p className="text-xl font-bold text-primary">{t.dropHere}</p>
                  <p className="text-sm text-muted-foreground mt-2">{t.supportedFormats}</p>
                </div>
              </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Bot className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">{t.welcome}</p>
                  <p className="text-sm">{t.askAnything}</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
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
                      {message.images && message.images.length > 0 && (
                        <div className={`grid gap-2 mb-3 ${message.images.length === 1 ? 'grid-cols-1' : message.images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                          {message.images.map((img, imgIndex) => (
                            <img
                              key={imgIndex}
                              src={img}
                              alt={`Uploaded ${imgIndex + 1}`}
                              className="w-full h-auto rounded-lg max-h-40 object-cover"
                            />
                          ))}
                        </div>
                      )}
                      {message.file && (
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/50 border border-border/30 mb-3">
                          <FileText className="w-4 h-4 text-primary" />
                          <span className="text-sm text-foreground">{message.file.name}</span>
                        </div>
                      )}
                      {message.content && (
                        <div className="text-foreground whitespace-pre-wrap leading-relaxed">
                          {message.content.split(/(```[\s\S]*?```)/g).map((part, partIndex) => {
                            if (part.startsWith("```") && part.endsWith("```")) {
                              const lines = part.slice(3, -3).split('\n');
                              const langLine = lines[0];
                              const codeContent = lines.slice(1).join('\n').trim();
                              return (
                                <div key={partIndex} className="my-3 rounded-lg overflow-hidden border border-border/50 bg-background/50">
                                  <div className="flex items-center justify-between px-4 py-2 bg-secondary/50 border-b border-border/30">
                                    <span className="text-xs text-muted-foreground font-mono">{langLine || "code"}</span>
                                    <button
                                      onClick={() => {
                                        navigator.clipboard.writeText(codeContent);
                                      }}
                                      className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                                    >
                                      <Copy className="w-3 h-3" />
                                      {language === "ar" ? "نسخ" : "Copy"}
                                    </button>
                                  </div>
                                  <pre className="p-4 overflow-x-auto text-sm">
                                    <code className="font-mono" dir="ltr">{codeContent}</code>
                                  </pre>
                                </div>
                              );
                            }
                            return <span key={partIndex}>{part}</span>;
                          })}
                        </div>
                      )}
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
              {/* Previews */}
              {(selectedImages.length > 0 || selectedFile) && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {selectedImages.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img}
                        alt={`Preview ${index + 1}`}
                        className="h-20 w-20 object-cover rounded-lg border border-border/50"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:opacity-80"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {selectedFile && (
                    <div className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary border border-border/50">
                      <FileText className="w-5 h-5 text-primary" />
                      <span className="text-sm text-foreground max-w-[150px] truncate">{selectedFile.name}</span>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:opacity-80"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              )}
              <div className="flex gap-2">
                {user ? (
                  <>
                    {/* Camera Capture */}
                    <input
                      type="file"
                      ref={cameraInputRef}
                      onChange={handleCameraCapture}
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => cameraInputRef.current?.click()}
                      disabled={selectedImages.length >= MAX_IMAGES}
                      className="px-3 py-3 rounded-xl bg-secondary border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      title={t.camera}
                    >
                      <Camera className="w-5 h-5" />
                    </button>
                    {/* Image Upload */}
                    <input
                      type="file"
                      ref={imageInputRef}
                      onChange={handleImageSelect}
                      accept="image/*"
                      multiple
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => imageInputRef.current?.click()}
                      disabled={selectedImages.length >= MAX_IMAGES}
                      className="px-3 py-3 rounded-xl bg-secondary border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      title={t.addImages}
                    >
                      <Image className="w-5 h-5" />
                    </button>
                    {/* File Upload */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept=".txt,.html,.css,.js,.ts,.jsx,.tsx,.json,.xml,.md,.csv,.py,.java,.c,.cpp,.h,.php,.rb,.go,.rs,.swift,.kt,.sh,.bash,.zsh,.yaml,.yml,.toml,.ini,.cfg,.conf,.log,.sql"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={!!selectedFile}
                      className="px-3 py-3 rounded-xl bg-secondary border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      title={t.addFile}
                    >
                      <Paperclip className="w-5 h-5" />
                    </button>
                    {/* Text Input */}
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
                      disabled={isLoading || (!input.trim() && selectedImages.length === 0 && !selectedFile)}
                      className="cyber-button-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <Link
                    to="/تسجيل-الدخول"
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>{language === "ar" ? "سجل دخول لاستخدام الذكاء الاصطناعي" : "Sign in to use the AI"}</span>
                  </Link>
                )}
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
                href="https://www.instagram.com/0oscp/"
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
