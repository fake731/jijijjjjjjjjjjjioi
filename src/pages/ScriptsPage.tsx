import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Code, Copy, Check } from "lucide-react";
import { useState } from "react";

interface Script {
  name: string;
  description: string;
  language: "Python" | "C++" | "Bash";
  code: string;
}

const scripts: Script[] = [
  // Python Scripts
  {
    name: "Port Scanner",
    description: "ماسح منافذ بسيط وسريع",
    language: "Python",
    code: `import socket
from concurrent.futures import ThreadPoolExecutor

def scan_port(target, port):
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex((target, port))
        if result == 0:
            print(f"[+] Port {port} is OPEN")
        sock.close()
    except:
        pass

def main():
    target = input("Enter target IP: ")
    print(f"\\nScanning {target}...\\n")
    
    with ThreadPoolExecutor(max_workers=100) as executor:
        for port in range(1, 1025):
            executor.submit(scan_port, target, port)

if __name__ == "__main__":
    main()`,
  },
  {
    name: "Hash Cracker",
    description: "أداة لكسر الهاش باستخدام قائمة كلمات",
    language: "Python",
    code: `import hashlib

def crack_hash(target_hash, wordlist, hash_type="md5"):
    hash_funcs = {
        "md5": hashlib.md5,
        "sha1": hashlib.sha1,
        "sha256": hashlib.sha256
    }
    
    if hash_type not in hash_funcs:
        print("Unsupported hash type")
        return None
    
    with open(wordlist, "r", encoding="utf-8", errors="ignore") as f:
        for word in f:
            word = word.strip()
            hashed = hash_funcs[hash_type](word.encode()).hexdigest()
            if hashed == target_hash:
                print(f"[+] Found: {word}")
                return word
    
    print("[-] Password not found")
    return None

# Usage
# crack_hash("5d41402abc4b2a76b9719d911017c592", "rockyou.txt", "md5")`,
  },
  {
    name: "Subdomain Finder",
    description: "اكتشاف النطاقات الفرعية",
    language: "Python",
    code: `import requests
import concurrent.futures

subdomains = [
    "www", "mail", "ftp", "admin", "blog", "shop", "api",
    "dev", "test", "staging", "app", "mobile", "cdn", "vpn",
    "portal", "secure", "login", "dashboard", "panel", "cpanel"
]

def check_subdomain(subdomain, domain):
    url = f"http://{subdomain}.{domain}"
    try:
        response = requests.get(url, timeout=3)
        print(f"[+] Found: {url} ({response.status_code})")
        return url
    except:
        return None

def find_subdomains(domain):
    print(f"\\nScanning subdomains for {domain}...\\n")
    found = []
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        futures = {executor.submit(check_subdomain, sub, domain): sub for sub in subdomains}
        for future in concurrent.futures.as_completed(futures):
            result = future.result()
            if result:
                found.append(result)
    
    print(f"\\n[*] Found {len(found)} subdomains")
    return found

# Usage: find_subdomains("example.com")`,
  },
  {
    name: "Network Scanner",
    description: "مسح الأجهزة في الشبكة المحلية",
    language: "Python",
    code: `from scapy.all import ARP, Ether, srp
import sys

def scan_network(ip_range):
    print(f"\\nScanning network: {ip_range}\\n")
    print("-" * 50)
    print(f"{'IP Address':<20} {'MAC Address':<20}")
    print("-" * 50)
    
    # Create ARP request
    arp = ARP(pdst=ip_range)
    ether = Ether(dst="ff:ff:ff:ff:ff:ff")
    packet = ether/arp
    
    # Send and receive
    result = srp(packet, timeout=3, verbose=0)[0]
    
    devices = []
    for sent, received in result:
        devices.append({
            'ip': received.psrc,
            'mac': received.hwsrc
        })
        print(f"{received.psrc:<20} {received.hwsrc:<20}")
    
    print("-" * 50)
    print(f"\\n[*] Found {len(devices)} devices")
    return devices

# Usage: scan_network("192.168.1.0/24")`,
  },
  {
    name: "Keylogger Detector",
    description: "كشف برامج التجسس على لوحة المفاتيح",
    language: "Python",
    code: `import psutil
import os

suspicious_names = [
    "keylogger", "logger", "hook", "capture", "spy",
    "monitor", "record", "keystroke", "input"
]

def detect_keyloggers():
    print("\\n[*] Scanning for suspicious processes...\\n")
    
    suspicious = []
    for proc in psutil.process_iter(['pid', 'name', 'exe']):
        try:
            name = proc.info['name'].lower()
            for keyword in suspicious_names:
                if keyword in name:
                    suspicious.append({
                        'pid': proc.info['pid'],
                        'name': proc.info['name'],
                        'path': proc.info['exe']
                    })
                    break
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            continue
    
    if suspicious:
        print("[!] Suspicious processes found:")
        for proc in suspicious:
            print(f"  PID: {proc['pid']}, Name: {proc['name']}")
            print(f"  Path: {proc['path']}\\n")
    else:
        print("[+] No suspicious keylogger processes detected")
    
    return suspicious

detect_keyloggers()`,
  },
  // C++ Scripts
  {
    name: "Port Scanner (C++)",
    description: "ماسح منافذ سريع بلغة C++",
    language: "C++",
    code: `#include <iostream>
#include <winsock2.h>
#include <ws2tcpip.h>
#include <thread>
#include <vector>

#pragma comment(lib, "ws2_32.lib")

void scan_port(const char* ip, int port) {
    SOCKET sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock == INVALID_SOCKET) return;
    
    sockaddr_in addr;
    addr.sin_family = AF_INET;
    addr.sin_port = htons(port);
    inet_pton(AF_INET, ip, &addr.sin_addr);
    
    // Set timeout
    DWORD timeout = 1000;
    setsockopt(sock, SOL_SOCKET, SO_RCVTIMEO, (char*)&timeout, sizeof(timeout));
    
    if (connect(sock, (sockaddr*)&addr, sizeof(addr)) == 0) {
        std::cout << "[+] Port " << port << " is OPEN" << std::endl;
    }
    closesocket(sock);
}

int main() {
    WSADATA wsa;
    WSAStartup(MAKEWORD(2, 2), &wsa);
    
    std::string target;
    std::cout << "Enter target IP: ";
    std::cin >> target;
    
    std::cout << "\\nScanning " << target << "...\\n" << std::endl;
    
    std::vector<std::thread> threads;
    for (int port = 1; port <= 1024; port++) {
        threads.emplace_back(scan_port, target.c_str(), port);
    }
    
    for (auto& t : threads) t.join();
    
    WSACleanup();
    return 0;
}`,
  },
  {
    name: "Password Generator",
    description: "مولد كلمات مرور قوية",
    language: "C++",
    code: `#include <iostream>
#include <string>
#include <random>
#include <ctime>

std::string generate_password(int length, bool upper, bool lower, 
                               bool digits, bool special) {
    std::string charset = "";
    if (upper)   charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lower)   charset += "abcdefghijklmnopqrstuvwxyz";
    if (digits)  charset += "0123456789";
    if (special) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    
    if (charset.empty()) {
        return "Error: No character set selected";
    }
    
    std::mt19937 rng(std::time(nullptr));
    std::uniform_int_distribution<int> dist(0, charset.length() - 1);
    
    std::string password = "";
    for (int i = 0; i < length; i++) {
        password += charset[dist(rng)];
    }
    
    return password;
}

int main() {
    int length;
    std::cout << "Password length: ";
    std::cin >> length;
    
    std::cout << "\\nGenerated passwords:\\n" << std::endl;
    
    for (int i = 0; i < 5; i++) {
        std::string pwd = generate_password(length, true, true, true, true);
        std::cout << "  " << i+1 << ". " << pwd << std::endl;
    }
    
    return 0;
}`,
  },
  {
    name: "File Encryptor",
    description: "تشفير الملفات باستخدام XOR",
    language: "C++",
    code: `#include <iostream>
#include <fstream>
#include <string>
#include <vector>

void xor_encrypt(const std::string& input_file, 
                 const std::string& output_file,
                 const std::string& key) {
    std::ifstream in(input_file, std::ios::binary);
    std::ofstream out(output_file, std::ios::binary);
    
    if (!in.is_open() || !out.is_open()) {
        std::cerr << "Error opening files!" << std::endl;
        return;
    }
    
    char byte;
    size_t key_index = 0;
    
    while (in.get(byte)) {
        byte ^= key[key_index % key.length()];
        out.put(byte);
        key_index++;
    }
    
    in.close();
    out.close();
    
    std::cout << "[+] File encrypted successfully!" << std::endl;
    std::cout << "[*] Output: " << output_file << std::endl;
}

int main() {
    std::string input, output, key;
    
    std::cout << "Input file: ";
    std::cin >> input;
    
    std::cout << "Output file: ";
    std::cin >> output;
    
    std::cout << "Encryption key: ";
    std::cin >> key;
    
    xor_encrypt(input, output, key);
    
    return 0;
}`,
  },
  // Bash Scripts
  {
    name: "System Info Collector",
    description: "جمع معلومات النظام",
    language: "Bash",
    code: `#!/bin/bash

echo "========================================="
echo "       SYSTEM INFORMATION COLLECTOR      "
echo "========================================="
echo ""

echo "[+] Hostname: $(hostname)"
echo "[+] User: $(whoami)"
echo "[+] OS: $(uname -a)"
echo ""

echo "[+] Network Interfaces:"
ip addr | grep -E "inet " | awk '{print "    " $2}'
echo ""

echo "[+] Open Ports:"
netstat -tuln 2>/dev/null | grep LISTEN | awk '{print "    " $4}'
echo ""

echo "[+] Running Services:"
systemctl list-units --type=service --state=running | head -20
echo ""

echo "[+] Last 5 Logins:"
last -5
echo ""

echo "[+] Disk Usage:"
df -h | grep -E "^/dev"
echo ""

echo "========================================="
echo "          Scan Complete                  "
echo "========================================="`,
  },
  {
    name: "Firewall Rules Backup",
    description: "نسخ احتياطي لقواعد الجدار الناري",
    language: "Bash",
    code: `#!/bin/bash

BACKUP_DIR="/backup/firewall"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/iptables_backup_$DATE.rules"

# Create backup directory
mkdir -p $BACKUP_DIR

echo "[*] Creating firewall rules backup..."

# Backup iptables rules
iptables-save > $BACKUP_FILE

if [ $? -eq 0 ]; then
    echo "[+] Backup created: $BACKUP_FILE"
    echo "[+] File size: $(ls -lh $BACKUP_FILE | awk '{print $5}')"
    
    # Keep only last 10 backups
    cd $BACKUP_DIR
    ls -t | tail -n +11 | xargs -r rm --
    echo "[+] Old backups cleaned"
else
    echo "[-] Backup failed!"
    exit 1
fi

echo ""
echo "[*] Current rules count:"
echo "    IPv4: $(iptables -L -n | grep -c '^')"
echo "    IPv6: $(ip6tables -L -n | grep -c '^')"`,
  },
];

const ScriptsPage = () => {
  const [copied, setCopied] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "Python" | "C++" | "Bash">("all");

  const copyToClipboard = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const filteredScripts = filter === "all" 
    ? scripts 
    : scripts.filter(s => s.language === filter);

  const getLanguageColor = (lang: string) => {
    switch (lang) {
      case "Python": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "C++": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Bash": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-primary/20 text-primary border-primary/30";
    }
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
              السكربتات الجاهزة
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              مجموعة سكربتات مفيدة بلغات Python و C++ و Bash
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {["all", "Python", "C++", "Bash"].map((lang) => (
              <button
                key={lang}
                onClick={() => setFilter(lang as typeof filter)}
                className={`px-6 py-2 rounded-xl transition-all ${
                  filter === lang
                    ? "bg-primary/20 text-primary border border-primary/50"
                    : "bg-secondary text-muted-foreground border border-border/50 hover:border-primary/30"
                }`}
              >
                {lang === "all" ? "الكل" : lang}
              </button>
            ))}
          </div>

          {/* Scripts List */}
          <div className="max-w-4xl mx-auto space-y-6">
            {filteredScripts.map((script, index) => (
              <div key={index} className="cyber-card overflow-hidden">
                <div className="p-6 border-b border-border/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-1">{script.name}</h3>
                      <p className="text-muted-foreground text-sm">{script.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getLanguageColor(script.language)}`}>
                      {script.language}
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={() => copyToClipboard(script.code, index)}
                    className="absolute top-4 left-4 p-2 rounded-lg bg-secondary border border-border/50 hover:border-primary/50 transition-all z-10"
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
