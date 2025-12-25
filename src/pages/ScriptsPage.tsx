import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Code, Copy, Check } from "lucide-react";
import { useState } from "react";

const scripts = [
  {
    name: "Port Scanner",
    description: "سكربت بسيط لفحص المنافذ المفتوحة",
    language: "Python",
    code: `import socket

def scan_ports(target, ports):
    for port in ports:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex((target, port))
        if result == 0:
            print(f"Port {port} is open")
        sock.close()`,
  },
  {
    name: "Hash Checker",
    description: "سكربت للتحقق من الهاش",
    language: "Python",
    code: `import hashlib

def check_hash(text, hash_type='md5'):
    if hash_type == 'md5':
        return hashlib.md5(text.encode()).hexdigest()
    elif hash_type == 'sha256':
        return hashlib.sha256(text.encode()).hexdigest()`,
  },
  {
    name: "Subdomain Finder",
    description: "سكربت لاكتشاف النطاقات الفرعية",
    language: "Python",
    code: `import requests

subdomains = ['www', 'mail', 'ftp', 'admin', 'blog']

def find_subdomains(domain):
    for sub in subdomains:
        url = f"http://{sub}.{domain}"
        try:
            requests.get(url, timeout=2)
            print(f"Found: {url}")
        except:
            pass`,
  },
];

const ScriptsPage = () => {
  const [copied, setCopied] = useState<number | null>(null);

  const copyToClipboard = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="cyber-icon-box">
                <Code className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary text-glow mb-4">
              السكربتات الجاهزة
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              سكربتات بسيطة للأمن السيبراني
            </p>
          </div>

          {/* Scripts List */}
          <div className="max-w-4xl mx-auto space-y-6">
            {scripts.map((script, index) => (
              <div key={index} className="cyber-card overflow-hidden">
                <div className="p-6 border-b border-border/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-1">{script.name}</h3>
                      <p className="text-muted-foreground text-sm">{script.description}</p>
                    </div>
                    <span className="px-3 py-1 rounded-lg bg-primary/20 text-primary text-sm font-medium">
                      {script.language}
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={() => copyToClipboard(script.code, index)}
                    className="absolute top-4 left-4 p-2 rounded-lg bg-secondary border border-border/50 hover:border-primary/50 transition-all"
                  >
                    {copied === index ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                  <pre className="p-6 overflow-x-auto text-sm text-muted-foreground bg-secondary/50" dir="ltr">
                    <code>{script.code}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ScriptsPage;
