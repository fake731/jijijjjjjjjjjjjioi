import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Download, Monitor, HardDrive, Smartphone, Terminal, ExternalLink, ChevronDown, ChevronUp, Globe, CheckCircle, AlertCircle, Info, Usb, Settings, Shield, Wifi, Users, Laptop, Server, Cloud, Package, Code, Cpu, HardDriveDownload, FolderOpen, Play, RotateCcw, Zap, Clock, FileText, Command, Wrench, Box, Layers, MonitorSmartphone, TabletSmartphone, Lock } from "lucide-react";
import { useState } from "react";

interface DownloadOption {
  name: { ar: string; en: string };
  description: { ar: string; en: string };
  icon: typeof Monitor;
  size: string;
  link: string;
  category: "desktop" | "mobile" | "termux" | "vm" | "live" | "arm";
}

const downloads: DownloadOption[] = [
  // Desktop
  {
    name: { ar: "Kali Linux Installer", en: "Kali Linux Installer" },
    description: { ar: "النسخة الكاملة للتثبيت على الجهاز مع واجهة رسومية", en: "Full version for PC installation with GUI" },
    icon: Monitor,
    size: "3.5 GB",
    link: "https://www.kali.org/get-kali/#kali-installer-images",
    category: "desktop",
  },
  {
    name: { ar: "Kali Everything ISO", en: "Kali Everything ISO" },
    description: { ar: "نسخة كاملة مع جميع الأدوات مسبقاً", en: "Complete version with all tools pre-installed" },
    icon: Package,
    size: "9.5 GB",
    link: "https://www.kali.org/get-kali/#kali-installer-images",
    category: "desktop",
  },
  {
    name: { ar: "Kali NetInstaller", en: "Kali NetInstaller" },
    description: { ar: "نسخة خفيفة للتحميل من الإنترنت أثناء التثبيت", en: "Minimal version that downloads during install" },
    icon: Cloud,
    size: "500 MB",
    link: "https://www.kali.org/get-kali/#kali-installer-images",
    category: "desktop",
  },
  // Live Boot
  {
    name: { ar: "Kali Live Boot", en: "Kali Live Boot" },
    description: { ar: "التشغيل مباشرة من USB بدون تثبيت", en: "Boot directly from USB without installation" },
    icon: Usb,
    size: "3.5 GB",
    link: "https://www.kali.org/get-kali/#kali-live",
    category: "live",
  },
  {
    name: { ar: "Kali with Persistence", en: "Kali with Persistence" },
    description: { ar: "Live مع حفظ البيانات على USB", en: "Live boot with data persistence on USB" },
    icon: HardDriveDownload,
    size: "3.5 GB",
    link: "https://www.kali.org/docs/usb/usb-persistence-encryption/",
    category: "live",
  },
  // Virtual Machines
  {
    name: { ar: "Kali VMware", en: "Kali VMware" },
    description: { ar: "صورة جاهزة لبرنامج VMware", en: "Pre-built image for VMware" },
    icon: HardDrive,
    size: "3.2 GB",
    link: "https://www.kali.org/get-kali/#kali-virtual-machines",
    category: "vm",
  },
  {
    name: { ar: "Kali VirtualBox", en: "Kali VirtualBox" },
    description: { ar: "صورة جاهزة لبرنامج VirtualBox", en: "Pre-built image for VirtualBox" },
    icon: Box,
    size: "3.2 GB",
    link: "https://www.kali.org/get-kali/#kali-virtual-machines",
    category: "vm",
  },
  {
    name: { ar: "Kali Hyper-V", en: "Kali Hyper-V" },
    description: { ar: "صورة جاهزة لـ Windows Hyper-V", en: "Pre-built image for Windows Hyper-V" },
    icon: Layers,
    size: "3.2 GB",
    link: "https://www.kali.org/get-kali/#kali-virtual-machines",
    category: "vm",
  },
  {
    name: { ar: "Kali QEMU", en: "Kali QEMU" },
    description: { ar: "صورة جاهزة لـ QEMU/KVM", en: "Pre-built image for QEMU/KVM" },
    icon: Server,
    size: "3.2 GB",
    link: "https://www.kali.org/get-kali/#kali-virtual-machines",
    category: "vm",
  },
  // ARM Devices
  {
    name: { ar: "Kali Raspberry Pi", en: "Kali Raspberry Pi" },
    description: { ar: "نسخة لأجهزة Raspberry Pi", en: "Version for Raspberry Pi devices" },
    icon: Cpu,
    size: "2.5 GB",
    link: "https://www.kali.org/get-kali/#kali-arm",
    category: "arm",
  },
  {
    name: { ar: "Kali PineBook", en: "Kali PineBook" },
    description: { ar: "نسخة لأجهزة PineBook", en: "Version for PineBook devices" },
    icon: Laptop,
    size: "2.5 GB",
    link: "https://www.kali.org/get-kali/#kali-arm",
    category: "arm",
  },
  // Mobile
  {
    name: { ar: "Kali NetHunter (Rootless)", en: "Kali NetHunter (Rootless)" },
    description: { ar: "نسخة للأندرويد بدون روت", en: "Android version without root" },
    icon: Smartphone,
    size: "1.2 GB",
    link: "https://www.kali.org/get-kali/#kali-mobile",
    category: "mobile",
  },
  {
    name: { ar: "Kali NetHunter (Root)", en: "Kali NetHunter (Root)" },
    description: { ar: "النسخة الكاملة للأجهزة المروتة", en: "Full version for rooted devices" },
    icon: Shield,
    size: "1.8 GB",
    link: "https://www.kali.org/get-kali/#kali-mobile",
    category: "mobile",
  },
  {
    name: { ar: "iSH Shell (iOS)", en: "iSH Shell (iOS)" },
    description: { ar: "محاكي لينكس للآيفون والآيباد", en: "Linux emulator for iPhone/iPad" },
    icon: TabletSmartphone,
    size: "50 MB",
    link: "https://apps.apple.com/app/ish-shell/id1436902243",
    category: "mobile",
  },
  // Termux
  {
    name: { ar: "Termux (F-Droid)", en: "Termux (F-Droid)" },
    description: { ar: "محاكي لينكس للأندرويد - النسخة الرسمية", en: "Linux emulator for Android - Official version" },
    icon: Terminal,
    size: "100 MB",
    link: "https://f-droid.org/packages/com.termux/",
    category: "termux",
  },
  {
    name: { ar: "Termux:API", en: "Termux:API" },
    description: { ar: "إضافة للوصول لميزات الهاتف", en: "Add-on for phone features access" },
    icon: MonitorSmartphone,
    size: "5 MB",
    link: "https://f-droid.org/packages/com.termux.api/",
    category: "termux",
  },
];

interface DetailedGuide {
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  requirements: { ar: string[]; en: string[] };
  steps: {
    title: { ar: string; en: string };
    description: { ar: string; en: string };
    commands?: string[];
    warnings?: { ar: string; en: string }[];
    tips?: { ar: string; en: string }[];
  }[];
  troubleshooting: {
    problem: { ar: string; en: string };
    solution: { ar: string; en: string };
  }[];
}

const detailedGuides: Record<string, DetailedGuide> = {
  desktop: {
    title: { ar: "تثبيت كالي لينكس على الكمبيوتر (دليل شامل)", en: "Install Kali Linux on PC (Complete Guide)" },
    description: { 
      ar: "دليل مفصل خطوة بخطوة لتثبيت كالي لينكس على جهاز الكمبيوتر كنظام أساسي أو بجانب Windows",
      en: "Detailed step-by-step guide to install Kali Linux as primary OS or dual boot with Windows"
    },
    requirements: {
      ar: [
        "معالج 64-bit (AMD64/x86-64)",
        "ذاكرة RAM: 2GB كحد أدنى (4GB مستحسن، 8GB للأداء الأفضل)",
        "مساحة القرص: 20GB كحد أدنى (50GB مستحسن)",
        "فلاشة USB سعة 8GB أو أكثر",
        "اتصال إنترنت (مستحسن)",
        "برنامج Rufus أو Etcher لحرق الـ ISO"
      ],
      en: [
        "64-bit processor (AMD64/x86-64)",
        "RAM: 2GB minimum (4GB recommended, 8GB for best performance)",
        "Disk space: 20GB minimum (50GB recommended)",
        "USB drive 8GB or larger",
        "Internet connection (recommended)",
        "Rufus or Etcher for burning ISO"
      ]
    },
    steps: [
      {
        title: { ar: "تحميل ملف ISO", en: "Download ISO File" },
        description: { ar: "توجه للموقع الرسمي وحمّل النسخة المناسبة", en: "Go to official website and download appropriate version" },
        tips: [
          { ar: "اختر Installer للتثبيت الكامل أو Live للتجربة أولاً", en: "Choose Installer for full install or Live to try first" },
          { ar: "تحقق من الـ Hash للتأكد من سلامة الملف", en: "Verify hash to ensure file integrity" }
        ]
      },
      {
        title: { ar: "إنشاء USB قابل للإقلاع باستخدام Rufus", en: "Create Bootable USB with Rufus" },
        description: { ar: "حرق ملف ISO على الفلاشة", en: "Burn ISO file to USB drive" },
        tips: [
          { ar: "اختر GPT إذا كان جهازك يدعم UEFI", en: "Select GPT if your system supports UEFI" },
          { ar: "اختر MBR للأجهزة القديمة مع BIOS", en: "Select MBR for older systems with BIOS" },
          { ar: "اختر DD mode إذا لم يعمل ISO mode", en: "Choose DD mode if ISO mode doesn't work" }
        ],
        warnings: [
          { ar: "سيتم مسح جميع البيانات على الفلاشة!", en: "All data on USB will be erased!" }
        ]
      },
      {
        title: { ar: "الدخول لإعدادات BIOS/UEFI", en: "Enter BIOS/UEFI Settings" },
        description: { ar: "تغيير ترتيب الإقلاع للإقلاع من USB", en: "Change boot order to boot from USB" },
        tips: [
          { ar: "اضغط F2, F12, Del, أو Esc عند بدء التشغيل (يختلف حسب الشركة المصنعة)", en: "Press F2, F12, Del, or Esc at startup (varies by manufacturer)" },
          { ar: "عطّل Secure Boot إذا لم يظهر USB", en: "Disable Secure Boot if USB doesn't appear" },
          { ar: "فعّل Legacy Boot للأجهزة القديمة", en: "Enable Legacy Boot for older systems" }
        ]
      },
      {
        title: { ar: "بدء التثبيت", en: "Start Installation" },
        description: { ar: "اختر Graphical Install للتثبيت السهل", en: "Select Graphical Install for easy installation" },
        tips: [
          { ar: "اختر اللغة والموقع الجغرافي", en: "Select language and location" },
          { ar: "اختر لوحة المفاتيح المناسبة", en: "Choose appropriate keyboard layout" }
        ]
      },
      {
        title: { ar: "إعداد الشبكة", en: "Network Setup" },
        description: { ar: "اتصل بالإنترنت للحصول على آخر التحديثات", en: "Connect to internet for latest updates" },
        tips: [
          { ar: "يمكنك تخطي هذه الخطوة والاتصال لاحقاً", en: "You can skip this step and connect later" }
        ]
      },
      {
        title: { ar: "إنشاء المستخدم", en: "Create User" },
        description: { ar: "أنشئ اسم المستخدم وكلمة المرور", en: "Create username and password" },
        warnings: [
          { ar: "لا تستخدم root كاسم مستخدم (محظور في الإصدارات الحديثة)", en: "Don't use root as username (blocked in recent versions)" },
          { ar: "اختر كلمة مرور قوية!", en: "Choose a strong password!" }
        ]
      },
      {
        title: { ar: "تقسيم القرص", en: "Partition Disk" },
        description: { ar: "اختر طريقة تقسيم القرص", en: "Choose disk partitioning method" },
        tips: [
          { ar: "Guided - use entire disk: للمبتدئين (يمسح كل شيء)", en: "Guided - use entire disk: for beginners (erases everything)" },
          { ar: "Manual: للمستخدمين المتقدمين أو Dual Boot", en: "Manual: for advanced users or Dual Boot" },
          { ar: "للـ Dual Boot: أنشئ partition جديد من المساحة الفارغة", en: "For Dual Boot: create new partition from free space" }
        ],
        warnings: [
          { ar: "احتفظ بنسخة احتياطية قبل التقسيم!", en: "Backup your data before partitioning!" }
        ]
      },
      {
        title: { ar: "تثبيت النظام", en: "System Installation" },
        description: { ar: "انتظر اكتمال نسخ الملفات", en: "Wait for file copying to complete" },
        tips: [
          { ar: "قد يستغرق 20-45 دقيقة حسب سرعة الجهاز", en: "May take 20-45 minutes depending on system speed" }
        ]
      },
      {
        title: { ar: "تثبيت GRUB", en: "Install GRUB" },
        description: { ar: "تثبيت محمل الإقلاع", en: "Install boot loader" },
        tips: [
          { ar: "اختر القرص الرئيسي (عادة /dev/sda)", en: "Select primary disk (usually /dev/sda)" },
          { ar: "للـ Dual Boot: سيكتشف Windows تلقائياً", en: "For Dual Boot: it will detect Windows automatically" }
        ]
      },
      {
        title: { ar: "إعادة التشغيل والتحديث", en: "Reboot and Update" },
        description: { ar: "أعد التشغيل وحدّث النظام", en: "Reboot and update the system" },
        commands: [
          "sudo apt update",
          "sudo apt full-upgrade -y",
          "sudo apt autoremove -y"
        ]
      }
    ],
    troubleshooting: [
      {
        problem: { ar: "لا يظهر USB في قائمة الإقلاع", en: "USB doesn't appear in boot menu" },
        solution: { ar: "عطّل Secure Boot وفعّل Legacy Boot في BIOS", en: "Disable Secure Boot and enable Legacy Boot in BIOS" }
      },
      {
        problem: { ar: "شاشة سوداء بعد التثبيت", en: "Black screen after installation" },
        solution: { ar: "أضف nomodeset لخيارات GRUB أو حدّث تعريف كرت الشاشة", en: "Add nomodeset to GRUB options or update graphics driver" }
      },
      {
        problem: { ar: "WiFi لا يعمل", en: "WiFi not working" },
        solution: { ar: "شغّل: sudo apt install firmware-iwlwifi ثم أعد التشغيل", en: "Run: sudo apt install firmware-iwlwifi then reboot" }
      },
      {
        problem: { ar: "الصوت لا يعمل", en: "Sound not working" },
        solution: { ar: "شغّل: sudo apt install pulseaudio pavucontrol", en: "Run: sudo apt install pulseaudio pavucontrol" }
      }
    ]
  },
  vm: {
    title: { ar: "تثبيت كالي على Virtual Machine", en: "Install Kali on Virtual Machine" },
    description: { 
      ar: "الطريقة الأسهل والأكثر أماناً لتشغيل كالي لينكس بجانب نظامك الحالي",
      en: "The easiest and safest way to run Kali Linux alongside your current OS"
    },
    requirements: {
      ar: [
        "VirtualBox أو VMware (مجاني)",
        "ذاكرة RAM: 4GB متاحة على الأقل للـ VM",
        "مساحة قرص: 50GB على الأقل",
        "معالج يدعم Virtualization (VT-x/AMD-V)"
      ],
      en: [
        "VirtualBox or VMware (free)",
        "RAM: At least 4GB available for VM",
        "Disk space: At least 50GB",
        "Processor supporting Virtualization (VT-x/AMD-V)"
      ]
    },
    steps: [
      {
        title: { ar: "تفعيل Virtualization في BIOS", en: "Enable Virtualization in BIOS" },
        description: { ar: "تأكد من تفعيل VT-x/AMD-V", en: "Make sure VT-x/AMD-V is enabled" },
        tips: [
          { ar: "ابحث عن Intel VT-x أو AMD-V أو SVM في إعدادات BIOS", en: "Look for Intel VT-x or AMD-V or SVM in BIOS settings" }
        ]
      },
      {
        title: { ar: "تحميل وتثبيت VirtualBox", en: "Download and Install VirtualBox" },
        description: { ar: "حمّل من الموقع الرسمي", en: "Download from official website" },
        commands: [
          "# Windows: حمّل من virtualbox.org",
          "# Linux: sudo apt install virtualbox"
        ]
      },
      {
        title: { ar: "تحميل صورة Kali الجاهزة", en: "Download Pre-built Kali Image" },
        description: { ar: "حمّل ملف .ova أو .vbox من الموقع الرسمي", en: "Download .ova or .vbox file from official site" },
        tips: [
          { ar: "الصور الجاهزة أسهل من التثبيت من ISO", en: "Pre-built images are easier than installing from ISO" }
        ]
      },
      {
        title: { ar: "استيراد الصورة", en: "Import Image" },
        description: { ar: "File → Import Appliance", en: "File → Import Appliance" },
        tips: [
          { ar: "يمكنك تغيير الإعدادات قبل الاستيراد", en: "You can modify settings before importing" }
        ]
      },
      {
        title: { ar: "ضبط الإعدادات", en: "Configure Settings" },
        description: { ar: "اضبط RAM والمعالج", en: "Adjust RAM and CPU" },
        tips: [
          { ar: "خصص 4GB RAM و 2 cores على الأقل", en: "Allocate at least 4GB RAM and 2 cores" },
          { ar: "فعّل 3D Acceleration للأداء الأفضل", en: "Enable 3D Acceleration for better performance" },
          { ar: "فعّل Bidirectional clipboard", en: "Enable Bidirectional clipboard" }
        ]
      },
      {
        title: { ar: "تشغيل الـ VM", en: "Start VM" },
        description: { ar: "ابدأ الآلة الافتراضية", en: "Start the virtual machine" },
        tips: [
          { ar: "بيانات الدخول الافتراضية: kali/kali", en: "Default credentials: kali/kali" },
          { ar: "غيّر كلمة المرور فوراً!", en: "Change password immediately!" }
        ],
        commands: [
          "passwd  # لتغيير كلمة المرور"
        ]
      },
      {
        title: { ar: "تثبيت Guest Additions", en: "Install Guest Additions" },
        description: { ar: "لتحسين الأداء والتكامل", en: "For better performance and integration" },
        commands: [
          "sudo apt update",
          "sudo apt install -y virtualbox-guest-x11",
          "sudo reboot"
        ]
      }
    ],
    troubleshooting: [
      {
        problem: { ar: "خطأ VT-x is disabled", en: "VT-x is disabled error" },
        solution: { ar: "فعّل Virtualization من إعدادات BIOS", en: "Enable Virtualization in BIOS settings" }
      },
      {
        problem: { ar: "الشاشة صغيرة جداً", en: "Screen too small" },
        solution: { ar: "ثبّت Guest Additions وأعد التشغيل", en: "Install Guest Additions and reboot" }
      },
      {
        problem: { ar: "الأداء بطيء", en: "Performance is slow" },
        solution: { ar: "زد RAM والـ cores، وفعّل 3D Acceleration", en: "Increase RAM and cores, enable 3D Acceleration" }
      }
    ]
  },
  iphone: {
    title: { ar: "تثبيت أدوات الاختراق على iPhone/iPad", en: "Install Hacking Tools on iPhone/iPad" },
    description: { 
      ar: "استخدام iSH Shell لتشغيل بيئة لينكس على iOS بدون Jailbreak",
      en: "Using iSH Shell to run Linux environment on iOS without Jailbreak"
    },
    requirements: {
      ar: [
        "iPhone/iPad يعمل بـ iOS 11 أو أحدث",
        "مساحة تخزين 500MB على الأقل",
        "اتصال إنترنت"
      ],
      en: [
        "iPhone/iPad running iOS 11 or later",
        "At least 500MB storage space",
        "Internet connection"
      ]
    },
    steps: [
      {
        title: { ar: "تحميل iSH Shell", en: "Download iSH Shell" },
        description: { ar: "حمّل التطبيق من App Store مجاناً", en: "Download the app from App Store for free" }
      },
      {
        title: { ar: "فتح التطبيق", en: "Open the App" },
        description: { ar: "افتح iSH Shell وانتظر التحميل الأولي", en: "Open iSH Shell and wait for initial setup" },
        tips: [
          { ar: "التحميل الأول قد يستغرق دقيقة", en: "First load may take a minute" }
        ]
      },
      {
        title: { ar: "تحديث الحزم", en: "Update Packages" },
        description: { ar: "حدّث مدير الحزم", en: "Update package manager" },
        commands: [
          "apk update",
          "apk upgrade"
        ]
      },
      {
        title: { ar: "تثبيت الأدوات الأساسية", en: "Install Basic Tools" },
        description: { ar: "ثبّت الأدوات المطلوبة", en: "Install required tools" },
        commands: [
          "apk add python3 python3-dev py3-pip",
          "apk add git curl wget",
          "apk add nmap openssh",
          "apk add nano vim"
        ]
      },
      {
        title: { ar: "تثبيت مكتبات Python", en: "Install Python Libraries" },
        description: { ar: "ثبّت المكتبات المفيدة", en: "Install useful libraries" },
        commands: [
          "pip3 install requests",
          "pip3 install beautifulsoup4",
          "pip3 install paramiko",
          "pip3 install scapy"
        ]
      },
      {
        title: { ar: "استنساخ أدوات من GitHub", en: "Clone Tools from GitHub" },
        description: { ar: "حمّل أدوات إضافية", en: "Download additional tools" },
        commands: [
          "git clone https://github.com/example/tool.git",
          "cd tool && python3 setup.py install"
        ],
        tips: [
          { ar: "ابحث عن أدوات تعمل مع Alpine Linux", en: "Look for tools compatible with Alpine Linux" }
        ]
      }
    ],
    troubleshooting: [
      {
        problem: { ar: "التطبيق يتوقف فجأة", en: "App crashes suddenly" },
        solution: { ar: "أغلق التطبيقات الأخرى لتوفير الذاكرة", en: "Close other apps to free memory" }
      },
      {
        problem: { ar: "خطأ عند تثبيت حزمة", en: "Error installing package" },
        solution: { ar: "شغّل apk update ثم حاول مرة أخرى", en: "Run apk update then try again" }
      }
    ]
  },
  termux: {
    title: { ar: "تثبيت أدوات الاختراق على Termux (Android)", en: "Install Hacking Tools on Termux (Android)" },
    description: { 
      ar: "تحويل هاتف الأندرويد إلى منصة اختبار اختراق كاملة",
      en: "Turn your Android phone into a full penetration testing platform"
    },
    requirements: {
      ar: [
        "هاتف Android 7.0 أو أحدث",
        "مساحة تخزين 2GB على الأقل",
        "اتصال إنترنت",
        "تحميل Termux من F-Droid (ليس Play Store!)"
      ],
      en: [
        "Android 7.0 or later",
        "At least 2GB storage space",
        "Internet connection",
        "Download Termux from F-Droid (not Play Store!)"
      ]
    },
    steps: [
      {
        title: { ar: "تحميل Termux من F-Droid", en: "Download Termux from F-Droid" },
        description: { ar: "لا تستخدم Play Store - النسخة قديمة!", en: "Don't use Play Store - version is outdated!" },
        warnings: [
          { ar: "نسخة Play Store لم تعد تعمل!", en: "Play Store version no longer works!" }
        ]
      },
      {
        title: { ar: "منح الصلاحيات", en: "Grant Permissions" },
        description: { ar: "السماح بالوصول للتخزين", en: "Allow storage access" },
        commands: [
          "termux-setup-storage"
        ],
        tips: [
          { ar: "اضغط Allow عند ظهور الرسالة", en: "Press Allow when prompted" }
        ]
      },
      {
        title: { ar: "تحديث الحزم", en: "Update Packages" },
        description: { ar: "حدّث جميع الحزم", en: "Update all packages" },
        commands: [
          "pkg update -y",
          "pkg upgrade -y"
        ]
      },
      {
        title: { ar: "تثبيت الأساسيات", en: "Install Basics" },
        description: { ar: "ثبّت الأدوات الأساسية", en: "Install basic tools" },
        commands: [
          "pkg install python git curl wget -y",
          "pkg install nmap hydra sqlmap -y",
          "pkg install net-tools dnsutils -y",
          "pkg install openssl openssh -y"
        ]
      },
      {
        title: { ar: "تثبيت Metasploit", en: "Install Metasploit" },
        description: { ar: "إطار عمل اختبار الاختراق", en: "Penetration testing framework" },
        commands: [
          "pkg install unstable-repo -y",
          "pkg install metasploit -y",
          "msfconsole  # لتشغيل Metasploit"
        ],
        tips: [
          { ar: "التثبيت قد يستغرق 15-30 دقيقة", en: "Installation may take 15-30 minutes" }
        ]
      },
      {
        title: { ar: "تثبيت أدوات WiFi", en: "Install WiFi Tools" },
        description: { ar: "أدوات فحص الشبكات اللاسلكية", en: "Wireless network scanning tools" },
        commands: [
          "pkg install aircrack-ng -y",
          "pkg install wifite2 -y"
        ],
        warnings: [
          { ar: "بعض الميزات تحتاج Root!", en: "Some features require Root!" }
        ]
      },
      {
        title: { ar: "تثبيت أدوات الويب", en: "Install Web Tools" },
        description: { ar: "أدوات اختبار تطبيقات الويب", en: "Web application testing tools" },
        commands: [
          "pip install sqlmap",
          "pip install dirsearch",
          "git clone https://github.com/maurosoria/dirsearch.git"
        ]
      },
      {
        title: { ar: "تثبيت مكتبات Python", en: "Install Python Libraries" },
        description: { ar: "مكتبات مفيدة للبرمجة", en: "Useful programming libraries" },
        commands: [
          "pip install requests beautifulsoup4",
          "pip install paramiko scapy",
          "pip install pwntools"
        ]
      },
      {
        title: { ar: "إنشاء اختصارات", en: "Create Shortcuts" },
        description: { ar: "اختصارات للأوامر المتكررة", en: "Shortcuts for common commands" },
        commands: [
          "echo 'alias update=\"pkg update && pkg upgrade\"' >> ~/.bashrc",
          "echo 'alias msf=\"msfconsole\"' >> ~/.bashrc",
          "source ~/.bashrc"
        ]
      },
      {
        title: { ar: "تثبيت Kali NetHunter (اختياري)", en: "Install Kali NetHunter (Optional)" },
        description: { ar: "تثبيت بيئة كالي كاملة", en: "Install full Kali environment" },
        commands: [
          "pkg install wget -y",
          "wget -O install-nethunter-termux https://offs.ec/2MceZWr",
          "chmod +x install-nethunter-termux",
          "./install-nethunter-termux"
        ],
        tips: [
          { ar: "يحتاج مساحة كبيرة (~4GB)", en: "Requires large space (~4GB)" }
        ]
      }
    ],
    troubleshooting: [
      {
        problem: { ar: "خطأ: Unable to locate package", en: "Error: Unable to locate package" },
        solution: { ar: "شغّل pkg update ثم حاول مرة أخرى", en: "Run pkg update then try again" }
      },
      {
        problem: { ar: "Termux لا يعمل بعد التحديث", en: "Termux not working after update" },
        solution: { ar: "احذف التطبيق وحمّله من F-Droid", en: "Uninstall and download from F-Droid" }
      },
      {
        problem: { ar: "خطأ في الصلاحيات", en: "Permission error" },
        solution: { ar: "شغّل termux-setup-storage", en: "Run termux-setup-storage" }
      },
      {
        problem: { ar: "الأدوات لا تعمل كما يجب", en: "Tools not working properly" },
        solution: { ar: "بعض الأدوات تحتاج Root - استخدم NetHunter Rootless", en: "Some tools need Root - use NetHunter Rootless" }
      }
    ]
  },
  nethunter: {
    title: { ar: "تثبيت Kali NetHunter على Android", en: "Install Kali NetHunter on Android" },
    description: { 
      ar: "منصة كالي لينكس المحمولة للهواتف الذكية مع دعم كامل لأدوات الاختراق",
      en: "Mobile Kali Linux platform for smartphones with full hacking tools support"
    },
    requirements: {
      ar: [
        "هاتف Android 7.0 أو أحدث",
        "مساحة تخزين 4GB على الأقل",
        "Termux من F-Droid",
        "Root (للنسخة الكاملة - اختياري)"
      ],
      en: [
        "Android 7.0 or later",
        "At least 4GB storage space",
        "Termux from F-Droid",
        "Root (for full version - optional)"
      ]
    },
    steps: [
      {
        title: { ar: "تثبيت NetHunter Rootless", en: "Install NetHunter Rootless" },
        description: { ar: "النسخة التي تعمل بدون Root", en: "Version that works without Root" },
        commands: [
          "pkg install wget -y",
          "wget -O install-nethunter-termux https://offs.ec/2MceZWr",
          "chmod +x install-nethunter-termux",
          "./install-nethunter-termux"
        ],
        tips: [
          { ar: "اختر الحجم المناسب: minimal أو full", en: "Choose appropriate size: minimal or full" }
        ]
      },
      {
        title: { ar: "تشغيل NetHunter", en: "Start NetHunter" },
        description: { ar: "ابدأ بيئة كالي", en: "Start Kali environment" },
        commands: [
          "nethunter",
          "# أو للواجهة الرسومية:",
          "nethunter kex &"
        ]
      },
      {
        title: { ar: "الاتصال بالواجهة الرسومية", en: "Connect to GUI" },
        description: { ar: "استخدم VNC للوصول لسطح المكتب", en: "Use VNC to access desktop" },
        commands: [
          "# ثبّت NetHunter KeX من Play Store",
          "# أو استخدم أي VNC client",
          "# Server: localhost:1",
          "# Password: changeme"
        ]
      },
      {
        title: { ar: "تحديث الأدوات", en: "Update Tools" },
        description: { ar: "حدّث جميع الأدوات", en: "Update all tools" },
        commands: [
          "nethunter",
          "sudo apt update && sudo apt upgrade -y"
        ]
      }
    ],
    troubleshooting: [
      {
        problem: { ar: "خطأ عند التثبيت", en: "Installation error" },
        solution: { ar: "تأكد من تحديث Termux أولاً", en: "Make sure Termux is updated first" }
      },
      {
        problem: { ar: "الواجهة الرسومية لا تعمل", en: "GUI not working" },
        solution: { ar: "شغّل nethunter kex passwd لتعيين كلمة مرور", en: "Run nethunter kex passwd to set password" }
      }
    ]
  }
};

const DownloadPage = () => {
  const [expandedGuide, setExpandedGuide] = useState<string | null>("desktop");
  const [language, setLanguage] = useState<"ar" | "en">("ar");

  const t = {
    title: language === "ar" ? "تنزيل أدوات الاختراق" : "Download Hacking Tools",
    subtitle: language === "ar" 
      ? "روابط تنزيل مباشرة لجميع المنصات مع شروحات تفصيلية" 
      : "Direct download links for all platforms with detailed guides",
    desktopSection: language === "ar" ? "للكمبيوتر (Installer)" : "For PC (Installer)",
    liveSection: language === "ar" ? "Live Boot (USB)" : "Live Boot (USB)",
    vmSection: language === "ar" ? "Virtual Machines" : "Virtual Machines",
    armSection: language === "ar" ? "أجهزة ARM" : "ARM Devices",
    mobileSection: language === "ar" ? "للهواتف" : "For Mobile",
    termuxSection: language === "ar" ? "Termux (Android)" : "Termux (Android)",
    installGuides: language === "ar" ? "دليل التثبيت الشامل" : "Complete Installation Guides",
    requirements: language === "ar" ? "المتطلبات" : "Requirements",
    steps: language === "ar" ? "الخطوات" : "Steps",
    troubleshooting: language === "ar" ? "حل المشاكل" : "Troubleshooting",
    problem: language === "ar" ? "المشكلة" : "Problem",
    solution: language === "ar" ? "الحل" : "Solution",
    tip: language === "ar" ? "نصيحة" : "Tip",
    warning: language === "ar" ? "تحذير" : "Warning",
  };

  const renderDownloadSection = (title: string, icon: typeof Monitor, items: DownloadOption[]) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
        {React.createElement(icon, { className: "w-6 h-6" })}
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="cyber-card p-5 group hover:border-primary/50 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:box-glow-sm transition-all flex-shrink-0">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-primary mb-1 truncate">
                  {language === "ar" ? item.name.ar : item.name.en}
                </h3>
                <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                  {language === "ar" ? item.description.ar : item.description.en}
                </p>
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <span className="bg-secondary px-2 py-0.5 rounded">{item.size}</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );

  const desktopDownloads = downloads.filter(d => d.category === "desktop");
  const liveDownloads = downloads.filter(d => d.category === "live");
  const vmDownloads = downloads.filter(d => d.category === "vm");
  const armDownloads = downloads.filter(d => d.category === "arm");
  const mobileDownloads = downloads.filter(d => d.category === "mobile");
  const termuxDownloads = downloads.filter(d => d.category === "termux");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="cyber-icon-box">
                <Download className="w-10 h-10 text-primary" />
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

          {/* Download Sections */}
          <div className="max-w-6xl mx-auto">
            {renderDownloadSection(t.desktopSection, Monitor, desktopDownloads)}
            {renderDownloadSection(t.liveSection, Usb, liveDownloads)}
            {renderDownloadSection(t.vmSection, HardDrive, vmDownloads)}
            {renderDownloadSection(t.armSection, Cpu, armDownloads)}
            {renderDownloadSection(t.mobileSection, Smartphone, mobileDownloads)}
            {renderDownloadSection(t.termuxSection, Terminal, termuxDownloads)}
          </div>

          {/* Detailed Installation Guides */}
          <div className="max-w-5xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">{t.installGuides}</h2>
            <div className="space-y-4">
              {Object.entries(detailedGuides).map(([key, guide]) => (
                <div key={key} className="cyber-card overflow-hidden">
                  <button
                    onClick={() => setExpandedGuide(expandedGuide === key ? null : key)}
                    className="w-full p-5 flex items-center justify-between hover:bg-primary/5 transition-colors"
                  >
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-primary">
                        {language === "ar" ? guide.title.ar : guide.title.en}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {language === "ar" ? guide.description.ar : guide.description.en}
                      </p>
                    </div>
                    {expandedGuide === key ? (
                      <ChevronUp className="w-6 h-6 text-primary flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>

                  {expandedGuide === key && (
                    <div className="border-t border-border/30 p-6 animate-fade-in space-y-8">
                      {/* Requirements */}
                      <div>
                        <h4 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                          <Settings className="w-5 h-5" />
                          {t.requirements}
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {(language === "ar" ? guide.requirements.ar : guide.requirements.en).map((req, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-muted-foreground text-sm">
                              <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Steps */}
                      <div>
                        <h4 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                          <Play className="w-5 h-5" />
                          {t.steps}
                        </h4>
                        <div className="space-y-6">
                          {guide.steps.map((step, idx) => (
                            <div key={idx} className="flex gap-4">
                              <span className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center font-bold flex-shrink-0">
                                {idx + 1}
                              </span>
                              <div className="flex-1 space-y-3">
                                <div>
                                  <h5 className="font-bold text-foreground">
                                    {language === "ar" ? step.title.ar : step.title.en}
                                  </h5>
                                  <p className="text-muted-foreground text-sm">
                                    {language === "ar" ? step.description.ar : step.description.en}
                                  </p>
                                </div>
                                
                                {/* Commands */}
                                {step.commands && step.commands.length > 0 && (
                                  <div className="bg-background rounded-lg p-3 border border-border/50">
                                    <code className="text-sm text-primary font-mono whitespace-pre-wrap">
                                      {step.commands.join('\n')}
                                    </code>
                                  </div>
                                )}
                                
                                {/* Tips */}
                                {step.tips && step.tips.length > 0 && (
                                  <div className="space-y-2">
                                    {step.tips.map((tip, tipIdx) => (
                                      <div key={tipIdx} className="flex items-start gap-2 text-sm p-2 rounded-lg bg-primary/5 border border-primary/20">
                                        <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                        <span className="text-muted-foreground">
                                          {language === "ar" ? tip.ar : tip.en}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                
                                {/* Warnings */}
                                {step.warnings && step.warnings.length > 0 && (
                                  <div className="space-y-2">
                                    {step.warnings.map((warning, warnIdx) => (
                                      <div key={warnIdx} className="flex items-start gap-2 text-sm p-2 rounded-lg bg-destructive/10 border border-destructive/30">
                                        <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                                        <span className="text-destructive">
                                          {language === "ar" ? warning.ar : warning.en}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Troubleshooting */}
                      {guide.troubleshooting.length > 0 && (
                        <div>
                          <h4 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                            <Wrench className="w-5 h-5" />
                            {t.troubleshooting}
                          </h4>
                          <div className="space-y-3">
                            {guide.troubleshooting.map((item, idx) => (
                              <div key={idx} className="p-4 rounded-lg bg-secondary border border-border/50">
                                <div className="flex items-start gap-2 mb-2">
                                  <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                  <span className="font-medium text-foreground">
                                    {language === "ar" ? item.problem.ar : item.problem.en}
                                  </span>
                                </div>
                                <div className="flex items-start gap-2 mr-6">
                                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                  <span className="text-muted-foreground text-sm">
                                    {language === "ar" ? item.solution.ar : item.solution.en}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DownloadPage;
