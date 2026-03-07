export interface WebDevTopic {
  title: string;
  content: string;
}

export interface WebDevCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  topics: WebDevTopic[];
}

export const webDevCategories: WebDevCategory[] = [
  {
    id: "html",
    title: "أساسيات HTML",
    icon: "FileCode",
    color: "text-orange-500",
    topics: [
      {
        title: "هيكل صفحة HTML",
        content: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>عنوان الصفحة</title>
    <meta name="description" content="وصف الصفحة">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <nav>قائمة التنقل</nav>
    </header>
    
    <main>
        <article>
            <h1>العنوان الرئيسي</h1>
            <p>محتوى الصفحة</p>
        </article>
    </main>
    
    <footer>
        <p>حقوق النشر © 2024</p>
    </footer>
    
    <script src="app.js"></script>
</body>
</html>

<!-- العناصر الأساسية -->
<!-- DOCTYPE: يحدد نوع المستند -->
<!-- html: العنصر الجذري -->
<!-- head: معلومات الصفحة (غير مرئية) -->
<!-- body: المحتوى المرئي -->
<!-- meta viewport: للتصميم المتجاوب -->`,
      },
      {
        title: "العناوين والفقرات",
        content: `<!-- العناوين من h1 إلى h6 -->
<h1>عنوان رئيسي - يستخدم مرة واحدة فقط</h1>
<h2>عنوان فرعي - للأقسام الرئيسية</h2>
<h3>عنوان ثالث - للأقسام الفرعية</h3>
<h4>عنوان رابع</h4>
<h5>عنوان خامس</h5>
<h6>عنوان سادس</h6>

<!-- الفقرات -->
<p>هذه فقرة عادية تحتوي على نص.</p>
<p>فقرة أخرى مع <strong>نص عريض</strong> و <em>نص مائل</em></p>

<!-- التنسيق النصي -->
<strong>نص عريض (مهم دلالياً)</strong>
<b>نص عريض (تنسيقي فقط)</b>
<em>نص مائل (تأكيد دلالي)</em>
<i>نص مائل (تنسيقي)</i>
<mark>نص مميز</mark>
<del>نص محذوف</del>
<ins>نص مُضاف</ins>
<sub>نص سفلي</sub>
<sup>نص علوي</sup>
<code>كود برمجي</code>
<pre>نص منسق مسبقاً</pre>

<!-- الفواصل -->
<br> <!-- سطر جديد -->
<hr> <!-- خط فاصل أفقي -->

<!-- الاقتباسات -->
<blockquote cite="https://example.com">
    اقتباس طويل من مصدر خارجي
</blockquote>
<q>اقتباس قصير داخل السطر</q>`,
      },
      {
        title: "الروابط والصور",
        content: `<!-- الروابط -->
<a href="https://example.com">رابط خارجي</a>
<a href="/about">رابط داخلي</a>
<a href="#section">رابط لقسم في نفس الصفحة</a>
<a href="mailto:email@example.com">رابط بريد</a>
<a href="tel:+123456789">رابط هاتف</a>
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
    فتح في نافذة جديدة
</a>
<a href="file.pdf" download>تحميل ملف</a>

<!-- الصور -->
<img src="image.jpg" alt="وصف الصورة" width="300" height="200">
<img src="image.webp" alt="صورة بتنسيق حديث" loading="lazy">

<!-- صورة متجاوبة -->
<picture>
    <source media="(min-width: 768px)" srcset="large.webp">
    <source media="(min-width: 480px)" srcset="medium.webp">
    <img src="small.webp" alt="صورة متجاوبة">
</picture>

<!-- صورة مع تعليق -->
<figure>
    <img src="photo.jpg" alt="صورة توضيحية">
    <figcaption>تعليق على الصورة</figcaption>
</figure>

<!-- خريطة صورة -->
<img src="map.jpg" alt="خريطة" usemap="#imagemap">
<map name="imagemap">
    <area shape="rect" coords="0,0,100,100" href="page1.html" alt="منطقة 1">
</map>`,
      },
      {
        title: "القوائم والجداول",
        content: `<!-- قائمة مرتبة -->
<ol>
    <li>العنصر الأول</li>
    <li>العنصر الثاني</li>
    <li>العنصر الثالث</li>
</ol>

<!-- قائمة غير مرتبة -->
<ul>
    <li>عنصر</li>
    <li>عنصر آخر
        <ul>
            <li>عنصر فرعي</li>
        </ul>
    </li>
</ul>

<!-- قائمة وصفية -->
<dl>
    <dt>HTML</dt>
    <dd>لغة ترميز النص الفائق</dd>
    <dt>CSS</dt>
    <dd>أوراق الأنماط المتتالية</dd>
</dl>

<!-- جدول كامل -->
<table>
    <caption>جدول البيانات</caption>
    <thead>
        <tr>
            <th scope="col">الاسم</th>
            <th scope="col">العمر</th>
            <th scope="col">المدينة</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>أحمد</td>
            <td>25</td>
            <td>الرياض</td>
        </tr>
        <tr>
            <td>سارة</td>
            <td>30</td>
            <td>جدة</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="3">نهاية الجدول</td>
        </tr>
    </tfoot>
</table>

<!-- دمج الخلايا -->
<td colspan="2">دمج عمودين</td>
<td rowspan="3">دمج 3 صفوف</td>`,
      },
      {
        title: "النماذج (Forms)",
        content: `<form action="/submit" method="POST" enctype="multipart/form-data">
    <!-- حقل نصي -->
    <label for="name">الاسم:</label>
    <input type="text" id="name" name="name" required placeholder="أدخل اسمك"
           minlength="2" maxlength="50" pattern="[ء-يa-zA-Z ]+">
    
    <!-- بريد إلكتروني -->
    <input type="email" name="email" required placeholder="email@example.com">
    
    <!-- كلمة مرور -->
    <input type="password" name="password" minlength="8" required>
    
    <!-- رقم -->
    <input type="number" name="age" min="18" max="100" step="1">
    
    <!-- نطاق -->
    <input type="range" name="volume" min="0" max="100" value="50">
    
    <!-- تاريخ ووقت -->
    <input type="date" name="birthdate">
    <input type="time" name="meeting">
    <input type="datetime-local" name="event">
    
    <!-- لون -->
    <input type="color" name="favcolor" value="#ff0000">
    
    <!-- ملف -->
    <input type="file" name="avatar" accept="image/*" multiple>
    
    <!-- مخفي -->
    <input type="hidden" name="token" value="abc123">
    
    <!-- منطقة نص -->
    <textarea name="message" rows="5" cols="40" placeholder="رسالتك..."></textarea>
    
    <!-- قائمة منسدلة -->
    <select name="country">
        <optgroup label="الشرق الأوسط">
            <option value="sa">السعودية</option>
            <option value="ae">الإمارات</option>
        </optgroup>
    </select>
    
    <!-- خانات اختيار -->
    <input type="checkbox" id="agree" name="agree" required>
    <label for="agree">أوافق على الشروط</label>
    
    <!-- أزرار راديو -->
    <input type="radio" id="male" name="gender" value="male">
    <label for="male">ذكر</label>
    <input type="radio" id="female" name="gender" value="female">
    <label for="female">أنثى</label>
    
    <!-- datalist -->
    <input list="browsers" name="browser">
    <datalist id="browsers">
        <option value="Chrome">
        <option value="Firefox">
        <option value="Safari">
    </datalist>
    
    <!-- أزرار -->
    <button type="submit">إرسال</button>
    <button type="reset">مسح</button>
    <button type="button" onclick="validate()">تحقق</button>
    
    <!-- fieldset -->
    <fieldset>
        <legend>معلومات شخصية</legend>
        <!-- حقول -->
    </fieldset>
</form>`,
      },
      {
        title: "Semantic HTML",
        content: `<!-- العناصر الدلالية الحديثة -->
<header>
    <!-- رأس الصفحة أو القسم -->
    <nav aria-label="القائمة الرئيسية">
        <ul>
            <li><a href="/">الرئيسية</a></li>
            <li><a href="/about">من نحن</a></li>
        </ul>
    </nav>
</header>

<main>
    <!-- المحتوى الرئيسي - مرة واحدة فقط -->
    
    <article>
        <!-- محتوى مستقل (مقال، تدوينة) -->
        <header>
            <h2>عنوان المقال</h2>
            <time datetime="2024-01-15">15 يناير 2024</time>
        </header>
        <p>محتوى المقال...</p>
    </article>
    
    <section>
        <!-- قسم مواضيعي -->
        <h2>عنوان القسم</h2>
    </section>
    
    <aside>
        <!-- محتوى جانبي مرتبط -->
        <h3>مقالات ذات صلة</h3>
    </aside>
</main>

<footer>
    <!-- تذييل الصفحة -->
    <address>
        تواصل معنا: <a href="mailto:info@site.com">info@site.com</a>
    </address>
</footer>

<!-- عناصر دلالية أخرى -->
<details>
    <summary>اضغط للمزيد</summary>
    <p>محتوى مخفي يظهر عند الضغط</p>
</details>

<dialog id="myDialog">
    <p>محتوى الحوار</p>
    <button onclick="this.closest('dialog').close()">إغلاق</button>
</dialog>

<progress value="70" max="100">70%</progress>
<meter value="0.7" min="0" max="1">70%</meter>

<!-- ARIA للوصول -->
<div role="alert" aria-live="polite">رسالة تنبيه</div>
<button aria-label="إغلاق" aria-expanded="false">×</button>
<nav aria-label="مسار التنقل">
    <ol>
        <li><a href="/">الرئيسية</a></li>
        <li aria-current="page">الصفحة الحالية</li>
    </ol>
</nav>`,
      },
      {
        title: "الوسائط المتعددة",
        content: `<!-- فيديو -->
<video controls width="640" height="360" poster="thumbnail.jpg" preload="metadata">
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    <track kind="subtitles" src="subs_ar.vtt" srclang="ar" label="العربية" default>
    متصفحك لا يدعم عنصر الفيديو.
</video>

<!-- فيديو بخصائص متقدمة -->
<video controls autoplay muted loop playsinline>
    <source src="bg-video.mp4" type="video/mp4">
</video>

<!-- صوت -->
<audio controls preload="none">
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    متصفحك لا يدعم عنصر الصوت.
</audio>

<!-- تضمين خارجي -->
<iframe src="https://www.youtube.com/embed/VIDEO_ID"
        width="560" height="315"
        allowfullscreen
        loading="lazy"
        title="عنوان الفيديو">
</iframe>

<!-- SVG مضمن -->
<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" fill="blue" stroke="black" stroke-width="2"/>
    <text x="50" y="55" text-anchor="middle" fill="white">SVG</text>
</svg>

<!-- Canvas -->
<canvas id="myCanvas" width="400" height="300">
    متصفحك لا يدعم Canvas
</canvas>
<script>
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0077ff';
    ctx.fillRect(10, 10, 150, 100);
    ctx.font = '20px Cairo';
    ctx.fillStyle = 'white';
    ctx.fillText('مرحباً!', 30, 60);
</script>

<!-- Object و Embed -->
<object data="document.pdf" type="application/pdf" width="600" height="400">
    <p>متصفحك لا يدعم PDF. <a href="document.pdf">حمل الملف</a></p>
</object>`,
      },
    ],
  },
  {
    id: "css",
    title: "CSS المتقدم",
    icon: "Palette",
    color: "text-blue-500",
    topics: [
      {
        title: "المحددات والخصوصية",
        content: `/* المحددات الأساسية */
element { }          /* محدد العنصر */
.class { }           /* محدد الكلاس */
#id { }              /* محدد المعرف */
* { }                /* المحدد العام */

/* المحددات المركبة */
div p { }            /* المنحدر (descendant) */
div > p { }          /* الابن المباشر */
div + p { }          /* الأخ التالي مباشرة */
div ~ p { }          /* جميع الإخوة التالين */

/* محددات الخصائص */
[attr] { }           /* له خاصية */
[attr="value"] { }   /* قيمة مطابقة */
[attr^="val"] { }    /* يبدأ بـ */
[attr$="val"] { }    /* ينتهي بـ */
[attr*="val"] { }    /* يحتوي على */

/* الأصناف الزائفة */
:hover { }           /* عند التمرير */
:focus { }           /* عند التركيز */
:active { }          /* عند الضغط */
:first-child { }     /* الابن الأول */
:last-child { }      /* الابن الأخير */
:nth-child(2n) { }   /* كل عنصر زوجي */
:nth-child(odd) { }  /* كل عنصر فردي */
:not(.class) { }     /* النفي */
:is(h1, h2, h3) { }  /* أي من */
:where(h1, h2) { }   /* مثل is لكن خصوصية 0 */
:has(.child) { }     /* يحتوي على */

/* العناصر الزائفة */
::before { content: "قبل"; }
::after { content: "بعد"; }
::first-line { }     /* السطر الأول */
::first-letter { }   /* الحرف الأول */
::selection { }      /* النص المحدد */
::placeholder { }    /* نص placeholder */

/* الخصوصية (Specificity) */
/* !important > inline > #id > .class > element */
/* 0,0,0,1 - element */
/* 0,0,1,0 - class */
/* 0,1,0,0 - id */
/* 1,0,0,0 - inline style */`,
      },
      {
        title: "Box Model و Layout",
        content: `/* Box Model */
.box {
    /* Content */
    width: 300px;
    height: 200px;
    
    /* Padding - المسافة الداخلية */
    padding: 20px;
    padding: 10px 20px;           /* عمودي أفقي */
    padding: 10px 20px 30px 40px; /* أعلى يمين أسفل يسار */
    
    /* Border - الحدود */
    border: 2px solid #333;
    border-radius: 10px;
    border-top: 3px dashed red;
    
    /* Margin - المسافة الخارجية */
    margin: 20px auto;  /* توسيط أفقي */
    margin-block: 20px; /* عمودي logical */
    margin-inline: auto; /* أفقي logical */
    
    /* Box Sizing */
    box-sizing: border-box; /* العرض يشمل padding و border */
}

/* Display */
.block { display: block; }
.inline { display: inline; }
.inline-block { display: inline-block; }
.none { display: none; }

/* Position */
.relative { position: relative; }
.absolute {
    position: absolute;
    top: 0; right: 0;
}
.fixed {
    position: fixed;
    bottom: 20px;
    left: 20px;
}
.sticky {
    position: sticky;
    top: 0;
    z-index: 100;
}

/* Overflow */
.overflow-hidden { overflow: hidden; }
.overflow-auto { overflow: auto; }
.overflow-scroll { overflow-y: scroll; }

/* Sizing */
.responsive {
    width: 100%;
    max-width: 1200px;
    min-height: 100vh;
    aspect-ratio: 16 / 9;
}`,
      },
      {
        title: "Flexbox",
        content: `/* الحاوية Flex */
.flex-container {
    display: flex;
    
    /* الاتجاه */
    flex-direction: row;          /* افتراضي - أفقي */
    flex-direction: row-reverse;  /* أفقي معكوس */
    flex-direction: column;       /* عمودي */
    flex-direction: column-reverse;
    
    /* الالتفاف */
    flex-wrap: nowrap;   /* بدون التفاف */
    flex-wrap: wrap;     /* التفاف */
    
    /* اختصار */
    flex-flow: row wrap;
    
    /* المحاذاة الأفقية */
    justify-content: flex-start;    /* البداية */
    justify-content: flex-end;      /* النهاية */
    justify-content: center;        /* الوسط */
    justify-content: space-between; /* توزيع متساوي */
    justify-content: space-around;  /* مسافات متساوية */
    justify-content: space-evenly;  /* مسافات متطابقة */
    
    /* المحاذاة العمودية */
    align-items: stretch;     /* تمدد (افتراضي) */
    align-items: flex-start;  /* الأعلى */
    align-items: flex-end;    /* الأسفل */
    align-items: center;      /* الوسط */
    align-items: baseline;    /* خط الأساس */
    
    /* محاذاة الصفوف المتعددة */
    align-content: center;
    
    /* فجوة */
    gap: 20px;
    row-gap: 10px;
    column-gap: 20px;
}

/* العناصر Flex Items */
.flex-item {
    flex-grow: 1;    /* نسبة التمدد */
    flex-shrink: 0;  /* منع الانكماش */
    flex-basis: 200px; /* الحجم الأساسي */
    
    /* اختصار */
    flex: 1;           /* grow:1 shrink:1 basis:0 */
    flex: 0 0 300px;   /* عرض ثابت */
    flex: 1 1 auto;    /* مرن */
    
    order: -1;         /* ترتيب العرض */
    align-self: center; /* محاذاة ذاتية */
}

/* أنماط شائعة */
.center-everything {
    display: flex;
    justify-content: center;
    align-items: center;
}

.sidebar-layout {
    display: flex;
}
.sidebar { flex: 0 0 250px; }
.main { flex: 1; }`,
      },
      {
        title: "CSS Grid",
        content: `/* الحاوية Grid */
.grid-container {
    display: grid;
    
    /* تحديد الأعمدة */
    grid-template-columns: 200px 1fr 200px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    
    /* تحديد الصفوف */
    grid-template-rows: auto 1fr auto;
    grid-auto-rows: minmax(100px, auto);
    
    /* الفجوات */
    gap: 20px;
    row-gap: 10px;
    column-gap: 20px;
    
    /* المناطق */
    grid-template-areas:
        "header header header"
        "sidebar main aside"
        "footer footer footer";
    
    /* المحاذاة */
    justify-items: center;
    align-items: center;
    place-items: center;
    
    justify-content: center;
    align-content: center;
}

/* العناصر */
.grid-item {
    /* موقع العنصر */
    grid-column: 1 / 3;        /* من عمود 1 إلى 3 */
    grid-column: span 2;       /* يمتد عمودين */
    grid-row: 1 / -1;          /* كل الصفوف */
    
    /* المنطقة */
    grid-area: header;
    
    /* محاذاة ذاتية */
    justify-self: end;
    align-self: center;
    place-self: center end;
}

/* تخطيط صفحة كامل */
.page-layout {
    display: grid;
    grid-template-areas:
        "nav nav"
        "sidebar content"
        "footer footer";
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}

.nav { grid-area: nav; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer { grid-area: footer; }

/* Subgrid */
.parent {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
.child {
    grid-column: span 3;
    display: grid;
    grid-template-columns: subgrid;
}`,
      },
      {
        title: "التصميم المتجاوب",
        content: `/* Media Queries */
/* Mobile First */
.container { width: 100%; padding: 16px; }

@media (min-width: 640px) {  /* sm */
    .container { max-width: 640px; margin: 0 auto; }
}

@media (min-width: 768px) {  /* md */
    .container { max-width: 768px; }
    .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) { /* lg */
    .container { max-width: 1024px; }
    .grid { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 1280px) { /* xl */
    .container { max-width: 1280px; }
}

/* وحدات متجاوبة */
.responsive-text {
    font-size: clamp(1rem, 2.5vw, 2rem);
    padding: clamp(1rem, 3vw, 3rem);
    width: min(90%, 1200px);
    height: max(300px, 50vh);
}

/* Container Queries */
.card-container {
    container-type: inline-size;
    container-name: card;
}

@container card (min-width: 400px) {
    .card { flex-direction: row; }
}

/* تفضيلات المستخدم */
@media (prefers-color-scheme: dark) {
    :root { --bg: #0a0a0a; --text: #fff; }
}

@media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important; }
}

@media (prefers-contrast: high) {
    .button { border: 2px solid; }
}

/* طباعة */
@media print {
    .no-print { display: none; }
    body { font-size: 12pt; color: black; }
}

/* Logical Properties للـ RTL */
.box {
    margin-inline-start: 20px;  /* بدل margin-left */
    padding-inline-end: 10px;   /* بدل padding-right */
    border-inline-start: 3px solid;
    text-align: start;          /* بدل left */
}`,
      },
      {
        title: "المتغيرات والألوان",
        content: `/* CSS Custom Properties */
:root {
    /* ألوان */
    --primary: #0077ff;
    --primary-light: #3399ff;
    --primary-dark: #0055cc;
    --secondary: #6c757d;
    --success: #28a745;
    --danger: #dc3545;
    --warning: #ffc107;
    
    /* HSL أفضل للتحكم */
    --hue: 210;
    --primary-hsl: hsl(var(--hue), 100%, 50%);
    --primary-10: hsl(var(--hue), 100%, 50%, 0.1);
    
    /* مسافات */
    --space-xs: 0.25rem;
    --space-sm: 0.5rem;
    --space-md: 1rem;
    --space-lg: 2rem;
    --space-xl: 4rem;
    
    /* خطوط */
    --font-sans: 'Cairo', sans-serif;
    --font-mono: 'Fira Code', monospace;
    --font-size-sm: clamp(0.8rem, 0.9vw, 0.9rem);
    --font-size-base: clamp(1rem, 1.1vw, 1.1rem);
    --font-size-lg: clamp(1.2rem, 1.5vw, 1.5rem);
    
    /* ظلال */
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
    --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
    --shadow-lg: 0 10px 30px rgba(0,0,0,0.15);
    
    /* حدود */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 16px;
    --radius-full: 9999px;
    
    /* انتقالات */
    --transition-fast: 150ms ease;
    --transition-normal: 300ms ease;
}

/* Dark mode */
.dark {
    --primary: #3399ff;
    --bg: #0a0a0a;
    --text: #e0e0e0;
}

/* استخدام المتغيرات */
.button {
    background: var(--primary);
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-md);
    font-family: var(--font-sans);
    box-shadow: var(--shadow-md);
    transition: all var(--transition-normal);
}

/* دوال الألوان الحديثة */
.modern-colors {
    color: oklch(0.7 0.15 210);
    background: color-mix(in srgb, var(--primary) 20%, transparent);
    border-color: light-dark(#333, #ccc);
}`,
      },
      {
        title: "الحركات والانتقالات",
        content: `/* Transitions */
.button {
    background: var(--primary);
    transform: scale(1);
    opacity: 1;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
.button:hover {
    background: var(--primary-dark);
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

/* Animations */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}

@keyframes typing {
    from { width: 0; }
    to { width: 100%; }
}

.animated {
    animation: fadeIn 0.6s ease-out forwards;
    animation-delay: 0.2s;
    animation-fill-mode: both;
}

/* تحكم بالحركة */
.element {
    animation: spin 2s linear infinite;
    animation-play-state: running;
    animation-direction: alternate;
    animation-iteration-count: 3;
}

.element:hover {
    animation-play-state: paused;
}

/* Scroll Animations */
@keyframes reveal {
    from { opacity: 0; transform: translateY(50px); }
    to { opacity: 1; transform: translateY(0); }
}

.reveal {
    animation: reveal linear both;
    animation-timeline: view();
    animation-range: entry 0% cover 40%;
}

/* View Transitions API */
::view-transition-old(root) {
    animation: fadeOut 0.3s ease;
}
::view-transition-new(root) {
    animation: fadeIn 0.3s ease;
}`,
      },
    ],
  },
  {
    id: "javascript",
    title: "أساسيات JavaScript",
    icon: "Zap",
    color: "text-yellow-500",
    topics: [
      {
        title: "المتغيرات وأنواع البيانات",
        content: `// المتغيرات
let name = "أحمد";          // قابل للتغيير
const PI = 3.14159;          // ثابت
var oldWay = "تجنبها";       // الطريقة القديمة

// أنواع البيانات الأساسية
let str = "نص";              // String
let num = 42;                // Number
let float = 3.14;            // Number
let bigInt = 9007199254740991n; // BigInt
let bool = true;             // Boolean
let nothing = null;          // Null
let notDefined;              // Undefined
let sym = Symbol("unique");  // Symbol

// التحقق من النوع
typeof str;    // "string"
typeof num;    // "number"
typeof bool;   // "boolean"
typeof null;   // "object" (خطأ تاريخي)

// تحويل الأنواع
String(42);          // "42"
Number("42");        // 42
Boolean(0);          // false
parseInt("42px");    // 42
parseFloat("3.14"); // 3.14

// Template Literals
let greeting = \`مرحباً \${name}، عمرك \${20 + 5} سنة\`;
let multiLine = \`
    السطر الأول
    السطر الثاني
\`;

// Destructuring
const [a, b, ...rest] = [1, 2, 3, 4, 5];
const { x, y, z = 0 } = { x: 10, y: 20 };

// Spread Operator
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
const obj1 = { a: 1 };
const obj2 = { ...obj1, b: 2 };

// Optional Chaining & Nullish Coalescing
const value = obj?.nested?.prop ?? "default";

// مقارنات
console.log(5 == "5");   // true (تحويل نوع)
console.log(5 === "5");  // false (مقارنة صارمة)
console.log(null == undefined); // true
console.log(NaN === NaN);      // false
console.log(Object.is(NaN, NaN)); // true`,
      },
      {
        title: "الدوال (Functions)",
        content: `// Function Declaration (ترفع - hoisted)
function greet(name) {
    return \`مرحباً \${name}\`;
}

// Function Expression
const greet2 = function(name) {
    return \`مرحباً \${name}\`;
};

// Arrow Function
const greet3 = (name) => \`مرحباً \${name}\`;
const add = (a, b) => a + b;
const getObj = () => ({ key: "value" });

// قيم افتراضية
function connect(host, port = 3000, protocol = "https") {
    return \`\${protocol}://\${host}:\${port}\`;
}

// Rest Parameters
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}

// Higher-Order Functions
function createMultiplier(factor) {
    return (number) => number * factor;
}
const double = createMultiplier(2);
console.log(double(5)); // 10

// IIFE
(function() {
    console.log("تنفيذ فوري");
})();

// Closures
function counter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count,
    };
}

// Callback
function fetchData(url, callback) {
    setTimeout(() => {
        callback({ data: "نتيجة" });
    }, 1000);
}

// Generator Function
function* fibonacci() {
    let [a, b] = [0, 1];
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

// Memoization
function memoize(fn) {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}`,
      },
      {
        title: "الشروط والحلقات",
        content: `// if / else if / else
if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else if (score >= 70) {
    grade = "C";
} else {
    grade = "F";
}

// Ternary
const status = age >= 18 ? "بالغ" : "قاصر";

// Switch
switch (day) {
    case "السبت":
    case "الأحد":
        console.log("عطلة");
        break;
    case "الاثنين":
        console.log("بداية الأسبوع");
        break;
    default:
        console.log("يوم عمل");
}

// For Loop
for (let i = 0; i < 10; i++) {
    console.log(i);
}

// For...of (القيم - Arrays, Strings)
for (const item of ["أحمد", "سارة", "محمد"]) {
    console.log(item);
}

// For...in (المفاتيح - Objects)
for (const key in { name: "أحمد", age: 25 }) {
    console.log(key);
}

// While
let count = 0;
while (count < 5) {
    console.log(count++);
}

// Do...While
do {
    console.log("مرة واحدة على الأقل");
} while (false);

// Array Methods
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// filter - تصفية
const evens = numbers.filter(n => n % 2 === 0);

// map - تحويل
const doubled = numbers.map(n => n * 2);

// reduce - تجميع
const sum = numbers.reduce((acc, n) => acc + n, 0);

// find - بحث
const found = numbers.find(n => n > 5);

// some / every
const hasNegative = numbers.some(n => n < 0);   // false
const allPositive = numbers.every(n => n > 0);   // true

// forEach
numbers.forEach((n, index) => {
    console.log(\`[\${index}]: \${n}\`);
});

// flatMap
const nested = [[1, 2], [3, 4]];
const flat = nested.flatMap(x => x); // [1, 2, 3, 4]

// Chaining
const result = numbers
    .filter(n => n % 2 === 0)
    .map(n => n ** 2)
    .reduce((sum, n) => sum + n, 0);`,
      },
      {
        title: "التعامل مع DOM",
        content: `// الوصول للعناصر
const el = document.getElementById("myId");
const els = document.querySelectorAll(".myClass");
const first = document.querySelector("div.card:first-child");
const byClass = document.getElementsByClassName("card");
const byTag = document.getElementsByTagName("p");

// إنشاء وإضافة عناصر
const div = document.createElement("div");
div.className = "card";
div.id = "newCard";
div.textContent = "محتوى جديد";
div.innerHTML = "<h2>عنوان</h2><p>فقرة</p>";
document.body.appendChild(div);

// إدراج في مواقع مختلفة
parent.prepend(child);           // أول ابن
parent.append(child);            // آخر ابن
element.before(newElement);      // قبل العنصر
element.after(newElement);       // بعد العنصر
parent.insertBefore(newEl, refEl);

// حذف عناصر
element.remove();
parent.removeChild(child);

// تعديل الخصائص
element.setAttribute("data-id", "123");
element.getAttribute("data-id");
element.removeAttribute("disabled");
element.dataset.id; // الوصول لـ data-*

// التعامل مع Classes
element.classList.add("active", "visible");
element.classList.remove("hidden");
element.classList.toggle("dark-mode");
element.classList.contains("active");
element.classList.replace("old", "new");

// الأنماط
element.style.backgroundColor = "#0077ff";
element.style.cssText = "color: red; font-size: 16px;";
getComputedStyle(element).color;

// الأحداث
element.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("clicked!", e.target);
});

// Event Delegation
document.querySelector(".list").addEventListener("click", (e) => {
    if (e.target.matches(".list-item")) {
        console.log("عنصر:", e.target.textContent);
    }
});

// MutationObserver
const observer = new MutationObserver((mutations) => {
    mutations.forEach(m => console.log(m));
});
observer.observe(element, { childList: true, subtree: true });

// IntersectionObserver
const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.5 });
io.observe(element);`,
      },
      {
        title: "Async/Await و Fetch",
        content: `// Promise
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = true;
        if (success) resolve("تم بنجاح!");
        else reject(new Error("فشل"));
    }, 1000);
});

myPromise
    .then(result => console.log(result))
    .catch(error => console.error(error))
    .finally(() => console.log("انتهى"));

// Async/Await
async function fetchUser(id) {
    try {
        const response = await fetch(\`/api/users/\${id}\`);
        if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
        const user = await response.json();
        return user;
    } catch (error) {
        console.error("خطأ:", error.message);
        throw error;
    }
}

// Fetch API - أمثلة شاملة
// GET
const getData = async () => {
    const res = await fetch("https://api.example.com/data");
    return res.json();
};

// POST
const postData = async (data) => {
    const res = await fetch("https://api.example.com/data", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer token123",
        },
        body: JSON.stringify(data),
    });
    return res.json();
};

// Upload File
const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/upload", {
        method: "POST",
        body: formData,
    });
    return res.json();
};

// Promise.all - تنفيذ متوازي
const [users, posts, comments] = await Promise.all([
    fetch("/api/users").then(r => r.json()),
    fetch("/api/posts").then(r => r.json()),
    fetch("/api/comments").then(r => r.json()),
]);

// Promise.race - أول نتيجة
const result = await Promise.race([
    fetch("/api/fast"),
    new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Timeout")), 5000)
    ),
]);

// Promise.allSettled
const results = await Promise.allSettled([
    fetch("/api/1"),
    fetch("/api/2"),
    fetch("/api/3"),
]);
results.forEach(r => {
    if (r.status === "fulfilled") console.log(r.value);
    else console.log("فشل:", r.reason);
});

// AbortController
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000);

const response = await fetch("/api/data", {
    signal: controller.signal,
});`,
      },
      {
        title: "Classes و OOP",
        content: `// Class
class Animal {
    #name;  // private field
    static count = 0;
    
    constructor(name, type) {
        this.#name = name;
        this.type = type;
        Animal.count++;
    }
    
    get name() { return this.#name; }
    set name(value) {
        if (value.length < 2) throw new Error("اسم قصير جداً");
        this.#name = value;
    }
    
    speak() {
        return \`\${this.#name} يصدر صوتاً\`;
    }
    
    static getCount() {
        return Animal.count;
    }
    
    toString() {
        return \`[\${this.type}] \${this.#name}\`;
    }
}

// Inheritance
class Dog extends Animal {
    #breed;
    
    constructor(name, breed) {
        super(name, "كلب");
        this.#breed = breed;
    }
    
    speak() {
        return \`\${this.name} ينبح! 🐕\`;
    }
    
    fetch(item) {
        return \`\${this.name} يحضر \${item}\`;
    }
}

// Usage
const dog = new Dog("بادي", "جولدن");
console.log(dog.speak());
console.log(Dog.getCount());

// Mixins
const Serializable = (Base) => class extends Base {
    toJSON() {
        return JSON.stringify(this);
    }
    static fromJSON(json) {
        return Object.assign(new this(), JSON.parse(json));
    }
};

// Design Patterns
// Singleton
class Database {
    static #instance;
    static getInstance() {
        if (!Database.#instance) {
            Database.#instance = new Database();
        }
        return Database.#instance;
    }
}

// Observer
class EventEmitter {
    #events = {};
    
    on(event, callback) {
        (this.#events[event] ??= []).push(callback);
        return this;
    }
    
    emit(event, ...args) {
        this.#events[event]?.forEach(cb => cb(...args));
    }
    
    off(event, callback) {
        this.#events[event] = this.#events[event]
            ?.filter(cb => cb !== callback);
    }
}`,
      },
      {
        title: "ES6+ و Modules",
        content: `// Modules
// math.js
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export default class Calculator { /* ... */ }

// app.js
import Calculator, { PI, add } from './math.js';
import * as MathUtils from './math.js';

// Dynamic Import
const module = await import('./heavy-module.js');

// Map
const userMap = new Map();
userMap.set("user1", { name: "أحمد", age: 25 });
userMap.get("user1");
userMap.has("user1");
userMap.delete("user1");
userMap.size;

// Set
const uniqueNums = new Set([1, 2, 2, 3, 3, 4]);
uniqueNums.add(5);
uniqueNums.has(3);
uniqueNums.delete(2);
// Array من Set
[...uniqueNums]; // [1, 2, 3, 4, 5]

// WeakMap & WeakRef
const weakMap = new WeakMap();
const weakRef = new WeakRef(heavyObject);

// Proxy
const handler = {
    get(target, prop) {
        console.log(\`Reading \${prop}\`);
        return target[prop];
    },
    set(target, prop, value) {
        console.log(\`Setting \${prop} = \${value}\`);
        target[prop] = value;
        return true;
    }
};
const proxy = new Proxy({}, handler);

// Symbol
const id = Symbol("id");
const obj = { [id]: 123, name: "test" };

// Iterator Protocol
class Range {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    [Symbol.iterator]() {
        let current = this.start;
        const end = this.end;
        return {
            next() {
                return current <= end
                    ? { value: current++, done: false }
                    : { done: true };
            }
        };
    }
}
for (const n of new Range(1, 5)) console.log(n);

// Structured Clone
const deepCopy = structuredClone(complexObject);

// at() method
const arr = [1, 2, 3, 4, 5];
arr.at(-1); // 5
arr.at(-2); // 4

// Object.groupBy (ES2024)
const grouped = Object.groupBy(users, user => user.role);`,
      },
      {
        title: "Error Handling والتخزين",
        content: `// Try/Catch/Finally
try {
    const data = JSON.parse(invalidJson);
    processData(data);
} catch (error) {
    if (error instanceof SyntaxError) {
        console.error("JSON غير صالح:", error.message);
    } else if (error instanceof TypeError) {
        console.error("خطأ في النوع:", error.message);
    } else {
        throw error; // إعادة رمي أخطاء غير متوقعة
    }
} finally {
    cleanup();
}

// Custom Error
class ValidationError extends Error {
    constructor(field, message) {
        super(message);
        this.name = "ValidationError";
        this.field = field;
    }
}

class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.name = "HttpError";
        this.status = status;
    }
}

// استخدام
function validateEmail(email) {
    if (!email.includes("@")) {
        throw new ValidationError("email", "بريد غير صالح");
    }
}

// Global Error Handler
window.addEventListener("error", (event) => {
    console.error("خطأ عام:", event.error);
});

window.addEventListener("unhandledrejection", (event) => {
    console.error("Promise مرفوض:", event.reason);
});

// ===== التخزين =====

// LocalStorage
localStorage.setItem("user", JSON.stringify({ name: "أحمد" }));
const user = JSON.parse(localStorage.getItem("user"));
localStorage.removeItem("user");
localStorage.clear();

// SessionStorage (ينتهي بإغلاق التبويب)
sessionStorage.setItem("token", "abc123");
sessionStorage.getItem("token");

// IndexedDB
const request = indexedDB.open("MyDB", 1);

request.onupgradeneeded = (event) => {
    const db = event.target.result;
    const store = db.createObjectStore("users", { keyPath: "id", autoIncrement: true });
    store.createIndex("email", "email", { unique: true });
};

request.onsuccess = (event) => {
    const db = event.target.result;
    
    // إضافة بيانات
    const tx = db.transaction("users", "readwrite");
    tx.objectStore("users").add({ name: "أحمد", email: "a@b.com" });
    
    // قراءة بيانات
    const readTx = db.transaction("users", "readonly");
    const getReq = readTx.objectStore("users").get(1);
    getReq.onsuccess = () => console.log(getReq.result);
};

// Cookies
document.cookie = "theme=dark; max-age=86400; path=/; SameSite=Strict";

function getCookie(name) {
    const match = document.cookie.match(new RegExp(\`(^| )\${name}=([^;]+)\`));
    return match ? match[2] : null;
}`,
      },
    ],
  },
  {
    id: "typescript",
    title: "TypeScript",
    icon: "FileType",
    color: "text-blue-600",
    topics: [
      {
        title: "الأنواع الأساسية",
        content: `// الأنواع البدائية
let name: string = "أحمد";
let age: number = 25;
let active: boolean = true;
let data: null = null;
let value: undefined = undefined;

// المصفوفات
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["أحمد", "سارة"];
let mixed: (string | number)[] = ["نص", 42];

// Tuple
let tuple: [string, number] = ["أحمد", 25];
let namedTuple: [name: string, age: number] = ["سارة", 30];

// Object Types
interface User {
    id: number;
    name: string;
    email: string;
    age?: number;              // اختياري
    readonly createdAt: Date;  // للقراءة فقط
}

// Type Alias
type Point = { x: number; y: number };
type ID = string | number;
type Status = "active" | "inactive" | "banned";

// Union & Intersection
type Shape = Circle | Rectangle;
type Circle = { kind: "circle"; radius: number };
type Rectangle = { kind: "rect"; width: number; height: number };

type Admin = User & { permissions: string[] };

// Function Types
type MathFn = (a: number, b: number) => number;
const add: MathFn = (a, b) => a + b;

function greet(name: string, greeting?: string): string {
    return \`\${greeting ?? "مرحباً"} \${name}\`;
}

// Type Assertion
const input = document.getElementById("name") as HTMLInputElement;
const value2 = <HTMLInputElement>document.getElementById("name");

// Literal Types
type Direction = "up" | "down" | "left" | "right";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// Template Literal Types
type EventName = \`on\${"Click" | "Hover" | "Focus"}\`;
// "onClick" | "onHover" | "onFocus"`,
      },
      {
        title: "Generics و Utility Types",
        content: `// Generics
function identity<T>(arg: T): T {
    return arg;
}
const num = identity<number>(42);
const str = identity("مرحباً"); // type inference

// Generic Interface
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
    timestamp: Date;
}

type UserResponse = ApiResponse<User>;
type UsersResponse = ApiResponse<User[]>;

// Generic Class
class Repository<T extends { id: number }> {
    private items: T[] = [];
    
    add(item: T): void { this.items.push(item); }
    findById(id: number): T | undefined {
        return this.items.find(item => item.id === id);
    }
    getAll(): T[] { return [...this.items]; }
}

// Generic Constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

// Utility Types
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

type PartialUser = Partial<User>;       // كل الحقول اختيارية
type RequiredUser = Required<User>;     // كل الحقول مطلوبة
type ReadonlyUser = Readonly<User>;     // للقراءة فقط
type UserPreview = Pick<User, "id" | "name">; // حقول محددة
type PublicUser = Omit<User, "password">;      // بدون حقول
type StringRecord = Record<string, number>;    // خريطة
type NonNullName = NonNullable<string | null>;  // بدون null
type FnReturn = ReturnType<typeof fetchUser>;   // نوع الإرجاع
type FnParams = Parameters<typeof fetchUser>;   // أنواع المعاملات

// Mapped Types
type Optional<T> = { [K in keyof T]?: T[K] };
type Nullable<T> = { [K in keyof T]: T[K] | null };

// Conditional Types
type IsString<T> = T extends string ? true : false;
type Extract<T, U> = T extends U ? T : never;

// infer
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type ArrayElement<T> = T extends (infer E)[] ? E : never;`,
      },
      {
        title: "Enums و Type Guards",
        content: `// Enum
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

enum HttpStatus {
    OK = 200,
    NotFound = 404,
    ServerError = 500,
}

// const enum (أفضل أداء)
const enum Color {
    Red = "#ff0000",
    Green = "#00ff00",
    Blue = "#0000ff",
}

// Type Guards
// typeof
function process(value: string | number) {
    if (typeof value === "string") {
        return value.toUpperCase();
    }
    return value * 2;
}

// instanceof
function handleError(error: unknown) {
    if (error instanceof TypeError) {
        console.error("TypeError:", error.message);
    } else if (error instanceof Error) {
        console.error("Error:", error.message);
    }
}

// in operator
interface Dog { bark(): void; breed: string; }
interface Cat { meow(): void; color: string; }

function makeSound(animal: Dog | Cat) {
    if ("bark" in animal) {
        animal.bark();
    } else {
        animal.meow();
    }
}

// Discriminated Union
type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "rect"; width: number; height: number }
    | { kind: "triangle"; base: number; height: number };

function area(shape: Shape): number {
    switch (shape.kind) {
        case "circle": return Math.PI * shape.radius ** 2;
        case "rect": return shape.width * shape.height;
        case "triangle": return (shape.base * shape.height) / 2;
    }
}

// Custom Type Guard
function isUser(obj: unknown): obj is User {
    return (
        typeof obj === "object" &&
        obj !== null &&
        "id" in obj &&
        "name" in obj
    );
}

// Assertion Function
function assertDefined<T>(
    value: T | null | undefined, 
    message?: string
): asserts value is T {
    if (value == null) {
        throw new Error(message ?? "Value is null or undefined");
    }
}

// satisfies (TS 5.0+)
const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
} satisfies Record<string, string | number[]>;`,
      },
    ],
  },
  {
    id: "react",
    title: "React",
    icon: "Atom",
    color: "text-cyan-500",
    topics: [
      {
        title: "المكونات و JSX",
        content: `// Function Component
import React from 'react';

interface ButtonProps {
    label: string;
    variant?: "primary" | "secondary" | "danger";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    onClick: () => void;
    children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
    label, 
    variant = "primary", 
    size = "md",
    disabled = false,
    onClick,
    children 
}) => {
    return (
        <button
            className={\`btn btn-\${variant} btn-\${size}\`}
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
        >
            {children ?? label}
        </button>
    );
};

// JSX Expressions
const UserCard = ({ user }) => (
    <div className="card">
        <h2>{user.name}</h2>
        {user.avatar && <img src={user.avatar} alt={user.name} />}
        
        {/* Conditional Rendering */}
        {user.isAdmin ? <Badge>مدير</Badge> : <Badge>مستخدم</Badge>}
        
        {/* Lists */}
        <ul>
            {user.skills.map((skill, index) => (
                <li key={skill.id ?? index}>{skill.name}</li>
            ))}
        </ul>
        
        {/* Inline Styles */}
        <div style={{ 
            backgroundColor: user.isOnline ? 'green' : 'gray',
            padding: '8px',
            borderRadius: '4px',
        }}>
            {user.isOnline ? "متصل" : "غير متصل"}
        </div>
    </div>
);

// Fragment
const List = () => (
    <>
        <h1>قائمة</h1>
        <ul>
            <li>عنصر 1</li>
            <li>عنصر 2</li>
        </ul>
    </>
);

// forwardRef
const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, ...props }, ref) => (
        <div>
            <label>{label}</label>
            <input ref={ref} {...props} />
        </div>
    )
);

// Lazy Loading
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));
const App = () => (
    <Suspense fallback={<div>جاري التحميل...</div>}>
        <HeavyComponent />
    </Suspense>
);`,
      },
      {
        title: "State و Hooks",
        content: `import { useState, useEffect, useRef, useMemo, useCallback, useReducer } from 'react';

// useState
function Counter() {
    const [count, setCount] = useState(0);
    const [user, setUser] = useState<User | null>(null);
    
    return (
        <div>
            <p>العدد: {count}</p>
            <button onClick={() => setCount(prev => prev + 1)}>+1</button>
            <button onClick={() => setCount(0)}>مسح</button>
        </div>
    );
}

// useEffect
function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        let cancelled = false;
        
        async function fetchUser() {
            setLoading(true);
            const res = await fetch(\`/api/users/\${userId}\`);
            const data = await res.json();
            if (!cancelled) {
                setUser(data);
                setLoading(false);
            }
        }
        
        fetchUser();
        
        return () => { cancelled = true; }; // Cleanup
    }, [userId]);
    
    if (loading) return <div>جاري التحميل...</div>;
    return <div>{user?.name}</div>;
}

// useRef
function TextInput() {
    const inputRef = useRef<HTMLInputElement>(null);
    const renderCount = useRef(0);
    
    useEffect(() => { renderCount.current++; });
    
    return (
        <div>
            <input ref={inputRef} />
            <button onClick={() => inputRef.current?.focus()}>
                تركيز
            </button>
            <p>عدد الرندر: {renderCount.current}</p>
        </div>
    );
}

// useMemo & useCallback
function ExpensiveList({ items, filter }) {
    const filtered = useMemo(() => 
        items.filter(item => item.name.includes(filter)),
        [items, filter]
    );
    
    const handleClick = useCallback((id: number) => {
        console.log("clicked", id);
    }, []);
    
    return filtered.map(item => (
        <Item key={item.id} onClick={() => handleClick(item.id)} />
    ));
}

// useReducer
type Action = 
    | { type: "increment" }
    | { type: "decrement" }
    | { type: "reset"; payload: number };

function reducer(state: number, action: Action): number {
    switch (action.type) {
        case "increment": return state + 1;
        case "decrement": return state - 1;
        case "reset": return action.payload;
    }
}

function Counter() {
    const [count, dispatch] = useReducer(reducer, 0);
    return (
        <div>
            <span>{count}</span>
            <button onClick={() => dispatch({ type: "increment" })}>+</button>
            <button onClick={() => dispatch({ type: "reset", payload: 0 })}>مسح</button>
        </div>
    );
}`,
      },
      {
        title: "Custom Hooks",
        content: `// useLocalStorage
function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    
    return [value, setValue] as const;
}

// useDebounce
function useDebounce<T>(value: T, delay: number): T {
    const [debounced, setDebounced] = useState(value);
    
    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    
    return debounced;
}

// useFetch
function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    
    useEffect(() => {
        const controller = new AbortController();
        
        fetch(url, { signal: controller.signal })
            .then(res => res.json())
            .then(setData)
            .catch(err => {
                if (err.name !== 'AbortError') setError(err);
            })
            .finally(() => setLoading(false));
        
        return () => controller.abort();
    }, [url]);
    
    return { data, loading, error };
}

// useMediaQuery
function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(
        () => window.matchMedia(query).matches
    );
    
    useEffect(() => {
        const mql = window.matchMedia(query);
        const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
    }, [query]);
    
    return matches;
}

// useOnClickOutside
function useOnClickOutside(
    ref: React.RefObject<HTMLElement>,
    handler: () => void
) {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (!ref.current?.contains(event.target as Node)) {
                handler();
            }
        };
        document.addEventListener("mousedown", listener);
        return () => document.removeEventListener("mousedown", listener);
    }, [ref, handler]);
}

// Usage
function SearchComponent() {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 300);
    const { data, loading } = useFetch(\`/api/search?q=\${debouncedQuery}\`);
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [theme, setTheme] = useLocalStorage("theme", "dark");
    
    return (
        <div className={theme}>
            <input value={query} onChange={e => setQuery(e.target.value)} />
            {loading ? "جاري البحث..." : <Results data={data} />}
        </div>
    );
}`,
      },
      {
        title: "React Router",
        content: `import { 
    BrowserRouter, Routes, Route, Link, NavLink, 
    useNavigate, useParams, useSearchParams,
    Navigate, Outlet 
} from 'react-router-dom';

// التوجيه الأساسي
function App() {
    return (
        <BrowserRouter>
            <nav>
                <NavLink to="/" className={({isActive}) => 
                    isActive ? "active" : ""
                }>الرئيسية</NavLink>
                <NavLink to="/about">من نحن</NavLink>
            </nav>
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/users" element={<UsersLayout />}>
                    <Route index element={<UsersList />} />
                    <Route path=":userId" element={<UserProfile />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

// Layout مع Outlet
function UsersLayout() {
    return (
        <div>
            <h1>المستخدمون</h1>
            <Outlet /> {/* يظهر هنا المكون الفرعي */}
        </div>
    );
}

// useParams
function UserProfile() {
    const { userId } = useParams<{ userId: string }>();
    return <div>ملف المستخدم: {userId}</div>;
}

// useNavigate
function LoginForm() {
    const navigate = useNavigate();
    
    const handleLogin = async () => {
        await login();
        navigate("/dashboard", { replace: true });
    };
    
    return <button onClick={handleLogin}>تسجيل الدخول</button>;
}

// useSearchParams
function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q") ?? "";
    
    return (
        <input 
            value={query}
            onChange={e => setSearchParams({ q: e.target.value })}
        />
    );
}

// Protected Route
function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    
    return <>{children}</>;
}

// استخدام
<Route path="/dashboard" element={
    <ProtectedRoute>
        <Dashboard />
    </ProtectedRoute>
} />`,
      },
    ],
  },
  {
    id: "git",
    title: "Git و التحكم بالإصدارات",
    icon: "GitBranch",
    color: "text-red-500",
    topics: [
      {
        title: "أوامر Git الأساسية",
        content: `# إعداد Git
git config --global user.name "اسمك"
git config --global user.email "email@example.com"
git config --global init.defaultBranch main

# إنشاء مستودع
git init                    # مستودع جديد
git clone <url>             # نسخ مستودع
git clone <url> --depth 1   # نسخ سطحي (أسرع)

# الحالة والتتبع
git status                  # حالة الملفات
git status -s               # حالة مختصرة
git diff                    # التغييرات غير المضافة
git diff --staged           # التغييرات المضافة

# إضافة ملفات
git add file.txt            # ملف محدد
git add .                   # كل الملفات
git add -p                  # إضافة تفاعلية (جزئية)

# Commit
git commit -m "وصف التغيير"
git commit -am "إضافة + commit"    # إضافة + commit
git commit --amend                  # تعديل آخر commit
git commit --amend --no-edit        # تعديل بدون تغيير الرسالة

# السجل
git log                     # سجل كامل
git log --oneline           # سطر واحد لكل commit
git log --graph --oneline   # رسم بياني
git log -5                  # آخر 5
git log --author="أحمد"     # حسب الكاتب
git log -- file.txt         # سجل ملف محدد

# التراجع
git checkout -- file.txt    # تراجع عن تغييرات ملف
git restore file.txt        # نفس الشيء (حديث)
git restore --staged file.txt # إزالة من staging
git reset HEAD~1            # تراجع عن آخر commit (يحتفظ بالتغييرات)
git reset --hard HEAD~1     # تراجع مع حذف التغييرات
git revert <commit>         # عكس commit محدد

# Stash
git stash                   # حفظ مؤقت
git stash list              # قائمة المحفوظات
git stash pop               # استعادة وحذف
git stash apply             # استعادة بدون حذف
git stash drop              # حذف آخر stash

# Remote
git remote add origin <url>
git push -u origin main
git push
git pull
git fetch`,
      },
      {
        title: "Branches و Merging",
        content: `# الفروع
git branch                  # قائمة الفروع
git branch -a               # كل الفروع (محلي + بعيد)
git branch feature/login    # إنشاء فرع
git checkout feature/login  # الانتقال لفرع
git checkout -b feature/new # إنشاء + انتقال
git switch feature/login    # انتقال (حديث)
git switch -c feature/new   # إنشاء + انتقال (حديث)

# حذف فرع
git branch -d feature/done  # حذف (بعد الدمج)
git branch -D feature/old   # حذف قسري
git push origin --delete feature/old  # حذف بعيد

# الدمج Merge
git checkout main
git merge feature/login     # دمج عادي
git merge --squash feature  # دمج مع ضغط commits
git merge --no-ff feature   # دمج مع commit merge

# حل التعارضات
# عند حدوث تعارض:
# 1. افتح الملف المتعارض
# 2. ابحث عن <<<<<<< و ======= و >>>>>>>
# 3. اختر التغييرات المناسبة
# 4. أزل علامات التعارض
git add file.txt
git merge --continue

# Rebase (بديل للـ merge)
git checkout feature
git rebase main             # إعادة بناء على main
git rebase -i HEAD~3        # تعديل تفاعلي لآخر 3 commits

# Rebase التفاعلي - خيارات:
# pick   - استخدام commit
# reword - تغيير الرسالة
# squash - دمج مع السابق
# drop   - حذف commit

# Cherry-pick
git cherry-pick <commit>    # نسخ commit محدد

# Tags
git tag v1.0.0
git tag -a v1.0.0 -m "الإصدار الأول"
git push origin v1.0.0
git push origin --tags

# سير عمل Git Flow
# main ← develop ← feature/xxx
# main ← hotfix/xxx
# develop ← release/x.x

# سير عمل GitHub
# main ← feature-branch → Pull Request → Review → Merge

# .gitignore
# node_modules/
# .env
# .env.local
# dist/
# *.log
# .DS_Store
# .vscode/
# coverage/`,
      },
    ],
  },
  {
    id: "nodejs",
    title: "Node.js و Backend",
    icon: "Server",
    color: "text-green-600",
    topics: [
      {
        title: "Express.js الأساسي",
        content: `// تثبيت
// npm init -y
// npm install express cors helmet morgan dotenv

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());               // أمان HTTP headers
app.use(cors());                  // السماح بالطلبات الخارجية
app.use(morgan('dev'));           // تسجيل الطلبات
app.use(express.json());          // تحليل JSON
app.use(express.urlencoded({ extended: true })); // تحليل form data
app.use(express.static('public')); // ملفات ثابتة

// Routes
app.get('/', (req, res) => {
    res.json({ message: "مرحباً بالـ API" });
});

app.get('/api/users', (req, res) => {
    const { page = 1, limit = 10, search } = req.query;
    // ... جلب البيانات
    res.json({ users: [], total: 0, page, limit });
});

app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    // ... جلب مستخدم
    res.json({ id, name: "أحمد" });
});

app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "الاسم والبريد مطلوبان" });
    }
    // ... إنشاء مستخدم
    res.status(201).json({ id: 1, name, email });
});

app.put('/api/users/:id', (req, res) => {
    // ... تحديث مستخدم
    res.json({ message: "تم التحديث" });
});

app.delete('/api/users/:id', (req, res) => {
    // ... حذف مستخدم
    res.status(204).send();
});

// Custom Middleware
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: "غير مصرح" });
    try {
        req.user = verifyToken(token);
        next();
    } catch {
        res.status(403).json({ error: "توكن غير صالح" });
    }
};

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "خطأ في الخادم" });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: "المسار غير موجود" });
});

app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});`,
      },
      {
        title: "REST API و Authentication",
        content: `// JWT Authentication
// npm install jsonwebtoken bcryptjs
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// تسجيل مستخدم جديد
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // التحقق
        if (!email || !password || password.length < 8) {
            return res.status(400).json({ error: "بيانات غير صالحة" });
        }
        
        // تشفير كلمة المرور
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // حفظ في قاعدة البيانات
        const user = await db.users.create({
            name, email, password: hashedPassword
        });
        
        // إنشاء Token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.status(201).json({ user: { id: user.id, name, email }, token });
    } catch (error) {
        if (error.code === 'DUPLICATE_EMAIL') {
            return res.status(409).json({ error: "البريد مستخدم" });
        }
        res.status(500).json({ error: "خطأ في الخادم" });
    }
});

// تسجيل الدخول
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    
    const user = await db.users.findByEmail(email);
    if (!user) return res.status(401).json({ error: "بيانات خاطئة" });
    
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "بيانات خاطئة" });
    
    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
    
    res.json({ token });
});

// Middleware للتحقق من الأدوار
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: "غير مسموح" });
        }
        next();
    };
};

// Route محمي
app.get('/api/admin/users', 
    authMiddleware, 
    authorize('admin'),
    async (req, res) => {
        const users = await db.users.findAll();
        res.json(users);
    }
);

// Rate Limiting
// npm install express-rate-limit
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 دقيقة
    max: 100,                  // 100 طلب
    message: { error: "طلبات كثيرة، حاول لاحقاً" },
});

app.use('/api/', apiLimiter);

// Input Validation مع Zod
const { z } = require('zod');

const userSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(100),
});

const validate = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).json({ errors: error.errors });
    }
};

app.post('/api/users', validate(userSchema), createUser);`,
      },
    ],
  },
  {
    id: "database",
    title: "قواعد البيانات",
    icon: "Database",
    color: "text-purple-500",
    topics: [
      {
        title: "SQL الأساسي",
        content: `-- إنشاء جدول
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INTEGER CHECK (age >= 18),
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول مع علاقة
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    author_id UUID REFERENCES users(id) ON DELETE CASCADE,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- إضافة بيانات
INSERT INTO users (name, email, age)
VALUES ('أحمد', 'ahmed@example.com', 25);

INSERT INTO users (name, email, age) VALUES
    ('سارة', 'sara@example.com', 30),
    ('محمد', 'mohammed@example.com', 28);

-- استعلام بسيط
SELECT * FROM users;
SELECT name, email FROM users WHERE age > 25;
SELECT * FROM users ORDER BY created_at DESC LIMIT 10;

-- استعلامات متقدمة
SELECT 
    u.name,
    COUNT(p.id) AS post_count,
    MAX(p.created_at) AS last_post
FROM users u
LEFT JOIN posts p ON u.id = p.author_id
WHERE u.role = 'user'
GROUP BY u.id, u.name
HAVING COUNT(p.id) > 5
ORDER BY post_count DESC;

-- تحديث
UPDATE users SET age = 26 WHERE email = 'ahmed@example.com';
UPDATE users SET role = 'admin' WHERE id = '...';

-- حذف
DELETE FROM users WHERE id = '...';

-- فهارس
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_author ON posts(author_id);

-- Views
CREATE VIEW active_users AS
SELECT * FROM users WHERE role != 'banned';

-- Functions
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_timestamp
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();`,
      },
      {
        title: "Row Level Security (RLS)",
        content: `-- تفعيل RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- سياسة القراءة: المنشورات المنشورة للجميع
CREATE POLICY "المنشورات المنشورة مرئية للجميع"
ON posts FOR SELECT
USING (published = true);

-- سياسة القراءة: المؤلف يرى كل منشوراته
CREATE POLICY "المؤلف يرى منشوراته"
ON posts FOR SELECT
TO authenticated
USING (author_id = auth.uid());

-- سياسة الإضافة: المستخدمون المسجلون فقط
CREATE POLICY "المسجلون يمكنهم النشر"
ON posts FOR INSERT
TO authenticated
WITH CHECK (author_id = auth.uid());

-- سياسة التحديث: المؤلف فقط
CREATE POLICY "المؤلف يعدل منشوراته"
ON posts FOR UPDATE
TO authenticated
USING (author_id = auth.uid())
WITH CHECK (author_id = auth.uid());

-- سياسة الحذف: المؤلف أو المدير
CREATE POLICY "المؤلف أو المدير يحذف"
ON posts FOR DELETE
TO authenticated
USING (
    author_id = auth.uid()
    OR public.has_role(auth.uid(), 'admin')
);

-- دالة التحقق من الأدوار (Security Definer)
CREATE OR REPLACE FUNCTION public.has_role(
    _user_id UUID, 
    _role TEXT
)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = _user_id AND role = _role
    );
$$;

-- جدول الأدوار
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'moderator', 'user')),
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Supabase مع JavaScript
import { supabase } from './client';

// استعلام مع RLS تلقائي
const { data, error } = await supabase
    .from('posts')
    .select('*, users(name, email)')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(10);

// إضافة
const { data, error } = await supabase
    .from('posts')
    .insert({ title: 'مقال جديد', content: '...' })
    .select()
    .single();`,
      },
    ],
  },
  {
    id: "security",
    title: "أمان الويب",
    icon: "ShieldCheck",
    color: "text-red-600",
    topics: [
      {
        title: "OWASP Top 10",
        content: `// ===== OWASP Top 10 - أهم ثغرات الويب =====

// 1. Injection (SQL, NoSQL, Command)
// ❌ خطأ
const query = "SELECT * FROM users WHERE name = '" + userInput + "'";

// ✅ صحيح - Parameterized Query
const { rows } = await pool.query(
    'SELECT * FROM users WHERE name = $1', 
    [userInput]
);

// 2. Broken Authentication
// ✅ أفضل الممارسات
- استخدم bcrypt مع salt rounds >= 12
- فعّل MFA (المصادقة الثنائية)
- حدد محاولات تسجيل الدخول (Rate Limiting)
- استخدم session timeout
- لا تكشف إذا كان البريد موجود أم لا

// 3. XSS (Cross-Site Scripting)
// ❌ خطأ
element.innerHTML = userInput;
dangerouslySetInnerHTML={{ __html: userInput }};

// ✅ صحيح
element.textContent = userInput;
// في React: يتم الهروب تلقائياً
<div>{userInput}</div>
// إذا لزم HTML: استخدم DOMPurify
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ 
    __html: DOMPurify.sanitize(userInput) 
}} />

// 4. CSRF (Cross-Site Request Forgery)
// ✅ الحماية
- استخدم CSRF Tokens
- SameSite=Strict في Cookies
- تحقق من Origin header

// 5. Security Misconfiguration
// ✅ Headers أمنية
app.use(helmet());
// Content-Security-Policy
// X-Content-Type-Options: nosniff
// X-Frame-Options: DENY
// Strict-Transport-Security

// 6. Insecure Data Exposure
// ✅ تشفير البيانات الحساسة
- HTTPS دائماً
- تشفير في الراحة (at rest)
- لا تخزن بيانات حساسة في localStorage
- لا تسجل بيانات حساسة في logs

// 7. Broken Access Control
// ✅ تحقق من الصلاحيات
- استخدم RLS في قاعدة البيانات
- تحقق server-side دائماً
- لا تعتمد على client-side فقط
- Principle of Least Privilege

// 8. SSRF (Server-Side Request Forgery)
// ✅ الحماية
- تحقق من URLs المدخلة
- استخدم allowlist للـ domains
- لا تسمح بالوصول لـ localhost

// 9. Components with Known Vulnerabilities
npm audit              # فحص الثغرات
npm audit fix          # إصلاح تلقائي
npx npm-check-updates  # تحديث الحزم

// 10. Insufficient Logging
// ✅ سجل:
- محاولات تسجيل الدخول الفاشلة
- تغييرات الصلاحيات
- الوصول لبيانات حساسة
- أخطاء النظام`,
      },
      {
        title: "تأمين Frontend",
        content: `// ===== أمان الواجهة الأمامية =====

// 1. Content Security Policy
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'nonce-abc123';
               style-src 'self' 'unsafe-inline';
               img-src 'self' data: https:;
               connect-src 'self' https://api.example.com;">

// 2. تنظيف المدخلات
function sanitizeInput(input: string): string {
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
}

// مع Zod
import { z } from 'zod';
const formSchema = z.object({
    name: z.string().min(2).max(100).trim(),
    email: z.string().email().max(255),
    message: z.string().min(10).max(1000),
    url: z.string().url().optional(),
});

// 3. تأمين التخزين المحلي
// ❌ لا تخزن tokens حساسة في localStorage
localStorage.setItem('authToken', token); // خطأ!

// ✅ استخدم httpOnly cookies
// يتم إعدادها من الـ server
Set-Cookie: token=abc123; HttpOnly; Secure; SameSite=Strict; Path=/

// 4. تأمين الطلبات
// CORS Configuration (Server)
app.use(cors({
    origin: ['https://myapp.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    maxAge: 86400,
}));

// 5. حماية من Clickjacking
// X-Frame-Options: DENY
// أو في CSP: frame-ancestors 'none'

// 6. Subresource Integrity
<script src="https://cdn.example.com/lib.js"
        integrity="sha384-oqVuAf..."
        crossorigin="anonymous"></script>

// 7. تأمين Forms
<form action="/submit" method="POST">
    <input type="hidden" name="_csrf" value="{{csrfToken}}">
    <input type="text" name="name" 
           autocomplete="off"
           maxlength="100"
           pattern="[^<>]*">
</form>

// 8. حماية API Keys
// ❌ خطأ
const API_KEY = "sk-secret-key-123";

// ✅ صحيح - استخدم Backend proxy
// Frontend
const data = await fetch('/api/proxy/openai', {
    method: 'POST',
    body: JSON.stringify({ prompt })
});

// Backend (Edge Function)
const response = await fetch('https://api.openai.com/v1/chat', {
    headers: { Authorization: \`Bearer \${Deno.env.get('OPENAI_KEY')}\` },
    body: req.body,
});

// 9. Security Headers Checklist
✅ Strict-Transport-Security
✅ Content-Security-Policy
✅ X-Content-Type-Options: nosniff
✅ X-Frame-Options: DENY
✅ Referrer-Policy: strict-origin
✅ Permissions-Policy
✅ X-XSS-Protection: 0 (CSP أفضل)`,
      },
    ],
  },
  {
    id: "devtools",
    title: "أدوات التطوير",
    icon: "Wrench",
    color: "text-gray-500",
    topics: [
      {
        title: "npm و إدارة الحزم",
        content: `# إنشاء مشروع
npm init -y
npm init vite@latest my-app -- --template react-ts

# تثبيت حزم
npm install express              # production dependency
npm install -D typescript        # dev dependency
npm install -g nodemon           # global

# إدارة الحزم
npm list                         # قائمة الحزم
npm list --depth=0               # المستوى الأول فقط
npm outdated                     # حزم قديمة
npm update                       # تحديث
npm uninstall package-name       # حذف

# Scripts في package.json
{
    "scripts": {
        "dev": "vite",
        "build": "tsc && vite build",
        "preview": "vite preview",
        "lint": "eslint src/",
        "test": "vitest",
        "test:coverage": "vitest --coverage",
        "format": "prettier --write src/"
    }
}

# تشغيل Scripts
npm run dev
npm run build
npm test                    # اختصار لـ npm run test
npm start                   # اختصار لـ npm run start

# npx - تشغيل بدون تثبيت
npx create-react-app my-app
npx tailwindcss init
npx prettier --write .

# package.json مهم
{
    "name": "my-app",
    "version": "1.0.0",
    "type": "module",           // ESM
    "engines": {
        "node": ">=18.0.0"
    },
    "dependencies": { },
    "devDependencies": { },
    "peerDependencies": { }
}

# .npmrc
save-exact=true
engine-strict=true

# بدائل npm
# pnpm (أسرع، أقل مساحة)
pnpm install
pnpm add express

# bun (أسرع بكثير)
bun install
bun add express
bun run dev`,
      },
      {
        title: "Tailwind CSS",
        content: `<!-- Tailwind CSS - أهم الكلاسات -->

<!-- Layout -->
<div class="container mx-auto px-4">
<div class="flex items-center justify-between gap-4">
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<!-- Spacing -->
<div class="p-4 m-2 px-6 py-3 mt-8 mb-4 space-y-4">

<!-- Typography -->
<h1 class="text-4xl font-bold text-gray-900 dark:text-white">
<p class="text-sm text-muted-foreground leading-relaxed">
<span class="text-lg font-semibold tracking-tight truncate">

<!-- Colors -->
<div class="bg-primary text-primary-foreground">
<div class="bg-card border border-border rounded-lg shadow-md">
<div class="text-destructive bg-destructive/10">

<!-- Sizing -->
<div class="w-full max-w-md h-screen min-h-[400px]">
<img class="w-12 h-12 rounded-full object-cover">

<!-- Borders & Radius -->
<div class="border-2 border-primary rounded-xl">
<div class="border-b border-border/50 rounded-none">

<!-- Flexbox -->
<div class="flex flex-col md:flex-row items-center justify-center gap-4">
<div class="flex-1 flex-shrink-0 flex-grow">

<!-- Grid -->
<div class="grid grid-cols-12 gap-4">
<div class="col-span-8 md:col-span-6">

<!-- Responsive -->
<div class="hidden md:block">          <!-- مخفي على الموبايل -->
<div class="block md:hidden">          <!-- مرئي على الموبايل فقط -->
<div class="text-sm md:text-base lg:text-lg">

<!-- Dark Mode -->
<div class="bg-white dark:bg-gray-900 text-black dark:text-white">

<!-- Transitions & Animations -->
<button class="transition-all duration-300 hover:scale-105 hover:shadow-lg">
<div class="animate-pulse animate-spin animate-bounce">

<!-- Backdrop & Filters -->
<div class="backdrop-blur-sm bg-background/80">
<div class="blur-sm grayscale opacity-50">

<!-- Overflow & Scroll -->
<div class="overflow-hidden overflow-y-auto scrollbar-thin">
<div class="truncate line-clamp-3">

<!-- Tailwind Config -->
// tailwind.config.ts
export default {
    theme: {
        extend: {
            colors: {
                primary: "hsl(var(--primary))",
                background: "hsl(var(--background))",
            },
            fontFamily: {
                cairo: ['Cairo', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('tailwindcss-animate'),
    ],
};`,
      },
    ],
  },
  {
    id: "docker",
    title: "Docker و Containers",
    icon: "Box",
    color: "text-blue-400",
    topics: [
      {
        title: "أساسيات Docker",
        content: `# أوامر Docker الأساسية

# الصور (Images)
docker images                     # قائمة الصور
docker pull node:20-alpine        # تحميل صورة
docker rmi image_name             # حذف صورة
docker image prune                # حذف الصور غير المستخدمة

# الحاويات (Containers)
docker ps                         # الحاويات النشطة
docker ps -a                      # كل الحاويات
docker run -d --name myapp node:20  # تشغيل حاوية
docker run -it ubuntu bash        # تشغيل تفاعلي
docker stop myapp                 # إيقاف
docker start myapp                # تشغيل
docker restart myapp              # إعادة تشغيل
docker rm myapp                   # حذف
docker logs myapp                 # السجلات
docker logs -f myapp              # متابعة السجلات
docker exec -it myapp bash        # الدخول للحاوية

# المنافذ والحجم
docker run -d \\
    --name webapp \\
    -p 3000:3000 \\               # ربط المنافذ
    -v ./data:/app/data \\        # ربط المجلدات
    -e NODE_ENV=production \\     # متغيرات بيئية
    --restart unless-stopped \\   # إعادة تشغيل تلقائي
    my-image:latest

# الشبكات
docker network create mynet
docker network ls
docker run --network mynet ...

# التنظيف
docker system prune               # حذف كل شيء غير مستخدم
docker system prune -a             # + الصور
docker volume prune                # حذف الأحجام`,
      },
      {
        title: "Dockerfile و البناء",
        content: `# ===== Dockerfile لتطبيق Node.js =====

# Multi-stage build
FROM node:20-alpine AS builder

# مجلد العمل
WORKDIR /app

# نسخ ملفات الحزم أولاً (للكاش)
COPY package*.json ./
RUN npm ci --only=production

# نسخ باقي الملفات
COPY . .

# بناء التطبيق
RUN npm run build

# ===== مرحلة الإنتاج =====
FROM node:20-alpine AS production

WORKDIR /app

# مستخدم غير root (أمان)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# نسخ من مرحلة البناء
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# تعيين المستخدم
USER appuser

# المنفذ
EXPOSE 3000

# فحص الصحة
HEALTHCHECK --interval=30s --timeout=3s \\
    CMD wget --no-verbose --tries=1 \\
    --spider http://localhost:3000/health || exit 1

# أمر التشغيل
CMD ["node", "dist/index.js"]


# ===== Dockerfile لتطبيق React =====

FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# .dockerignore
node_modules
.git
.env
dist
coverage
*.log
.DS_Store
Dockerfile
docker-compose*.yml


# بناء وتشغيل
docker build -t myapp:latest .
docker build -t myapp:v1.0 --no-cache .
docker run -d -p 3000:3000 myapp:latest`,
      },
      {
        title: "Docker Compose",
        content: `# docker-compose.yml
version: '3.8'

services:
  # تطبيق الويب
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
      - REDIS_URL=redis://cache:6379
    depends_on:
      db:
        condition: service_healthy
      cache:
        condition: service_started
    volumes:
      - ./uploads:/app/uploads
    networks:
      - app-network
    restart: unless-stopped

  # قاعدة البيانات
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d mydb"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - app-network

  # Redis للتخزين المؤقت
  cache:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes
    networks:
      - app-network

  # Nginx كـ Reverse Proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./certs:/etc/ssl/certs
    depends_on:
      - app
    networks:
      - app-network

volumes:
  postgres_data:
  redis_data:

networks:
  app-network:
    driver: bridge


# أوامر Docker Compose
docker compose up -d          # تشغيل
docker compose down           # إيقاف
docker compose logs -f app    # سجلات
docker compose exec app sh    # الدخول
docker compose build          # إعادة بناء
docker compose ps             # الحالة
docker compose restart app    # إعادة تشغيل خدمة`,
      },
    ],
  },
  {
    id: "cicd",
    title: "CI/CD و DevOps",
    icon: "Workflow",
    color: "text-orange-600",
    topics: [
      {
        title: "GitHub Actions",
        content: `# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'

jobs:
  # فحص الكود
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check

  # الاختبارات
  test:
    runs-on: ubuntu-latest
    needs: lint
    
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: test
          POSTGRES_DB: testdb
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - run: npm ci
      - run: npm test -- --coverage
      
      - name: Upload Coverage
        uses: codecov/codecov-action@v3
        with:
          token: \${{ secrets.CODECOV_TOKEN }}

  # البناء والنشر
  deploy:
    runs-on: ubuntu-latest
    needs: [lint, test]
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      
      - name: Deploy to Production
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.ORG_ID }}
          vercel-project-id: \${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'`,
      },
      {
        title: "أساسيات CI/CD",
        content: `# ===== مفاهيم CI/CD =====

# CI (Continuous Integration) - التكامل المستمر
# ✅ كل push يُفعّل:
# 1. Lint - فحص جودة الكود
# 2. Test - تشغيل الاختبارات
# 3. Build - بناء المشروع
# 4. Security Scan - فحص أمني

# CD (Continuous Deployment) - النشر المستمر
# ✅ بعد نجاح CI:
# 1. Deploy to Staging - نشر تجريبي
# 2. Integration Tests - اختبارات تكامل
# 3. Deploy to Production - نشر إنتاجي
# 4. Monitor - مراقبة

# ===== استراتيجيات النشر =====

# 1. Blue-Green Deployment
# - نسختان متطابقتان (Blue و Green)
# - التبديل الفوري بينهما
# - تراجع سريع

# 2. Canary Deployment
# - نشر تدريجي (1% → 10% → 50% → 100%)
# - مراقبة الأخطاء في كل مرحلة

# 3. Rolling Update
# - تحديث الحاويات واحدة تلو الأخرى
# - بدون توقف الخدمة

# ===== Environment Variables =====

# .env.example (مرجع)
DATABASE_URL=postgresql://user:pass@localhost:5432/db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-here
API_KEY=your-api-key

# في GitHub Actions
# Settings → Secrets → Actions → New repository secret

# استخدام في workflow
env:
  DATABASE_URL: \${{ secrets.DATABASE_URL }}

# ===== أدوات مفيدة =====

# Husky - Git Hooks
# npm install -D husky lint-staged
# package.json:
{
    "lint-staged": {
        "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
        "*.{css,md}": "prettier --write"
    }
}

# Commitlint - رسائل commit موحدة
# feat: ميزة جديدة
# fix: إصلاح خطأ
# docs: تحديث التوثيق
# style: تنسيق الكود
# refactor: إعادة هيكلة
# test: إضافة اختبارات
# chore: مهام صيانة

# Semantic Versioning
# MAJOR.MINOR.PATCH
# 1.0.0 → 1.0.1 (fix)
# 1.0.0 → 1.1.0 (feature)
# 1.0.0 → 2.0.0 (breaking change)`,
      },
    ],
  },
  {
    id: "api-design",
    title: "تصميم APIs",
    icon: "Globe",
    color: "text-indigo-500",
    topics: [
      {
        title: "RESTful API Design",
        content: `// ===== تصميم REST API =====

// المبادئ الأساسية:
// 1. استخدم الأسماء (nouns) وليس الأفعال
// ✅ GET /api/users
// ❌ GET /api/getUsers

// 2. استخدم الجمع
// ✅ /api/users
// ❌ /api/user

// 3. HTTP Methods
// GET    /api/users          → جلب القائمة
// GET    /api/users/:id      → جلب واحد
// POST   /api/users          → إنشاء
// PUT    /api/users/:id      → تحديث كامل
// PATCH  /api/users/:id      → تحديث جزئي
// DELETE /api/users/:id      → حذف

// 4. العلاقات المتداخلة
// GET /api/users/:id/posts          → منشورات المستخدم
// GET /api/users/:id/posts/:postId  → منشور محدد
// POST /api/users/:id/posts         → إنشاء منشور

// 5. Query Parameters
// GET /api/users?page=1&limit=20
// GET /api/users?sort=name&order=asc
// GET /api/users?search=أحمد&role=admin
// GET /api/users?fields=id,name,email

// 6. أكواد الحالة (Status Codes)
// 200 OK                → نجاح
// 201 Created           → تم الإنشاء
// 204 No Content        → نجاح بدون محتوى (delete)
// 400 Bad Request       → خطأ في الطلب
// 401 Unauthorized      → غير مصادق
// 403 Forbidden         → غير مصرح
// 404 Not Found         → غير موجود
// 409 Conflict          → تعارض (duplicate)
// 422 Unprocessable     → بيانات غير صالحة
// 429 Too Many Requests → طلبات كثيرة
// 500 Server Error      → خطأ الخادم

// 7. شكل الاستجابة
// نجاح
{
    "data": { "id": 1, "name": "أحمد" },
    "meta": {
        "page": 1,
        "limit": 20,
        "total": 100,
        "totalPages": 5
    }
}

// خطأ
{
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "بيانات غير صالحة",
        "details": [
            { "field": "email", "message": "بريد غير صالح" }
        ]
    }
}

// 8. HATEOAS (روابط)
{
    "data": { "id": 1, "name": "أحمد" },
    "links": {
        "self": "/api/users/1",
        "posts": "/api/users/1/posts",
        "avatar": "/api/users/1/avatar"
    }
}`,
      },
      {
        title: "API Rate Limiting و Versioning",
        content: `// ===== Rate Limiting =====
const rateLimit = require('express-rate-limit');

// عام
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 دقيقة
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: {
            code: "RATE_LIMIT_EXCEEDED",
            message: "تجاوزت الحد المسموح. حاول بعد 15 دقيقة",
            retryAfter: 900,
        }
    },
});

// تسجيل الدخول (أكثر صرامة)
const loginLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,  // ساعة
    max: 5,
    skipSuccessfulRequests: true,
    message: { error: "محاولات كثيرة. حاول لاحقاً" },
});

app.use('/api/', generalLimiter);
app.use('/api/auth/login', loginLimiter);

// ===== API Versioning =====

// 1. URL Path (الأكثر شيوعاً)
app.use('/api/v1/users', v1UsersRouter);
app.use('/api/v2/users', v2UsersRouter);

// 2. Header
app.use('/api/users', (req, res, next) => {
    const version = req.headers['api-version'] || '1';
    req.apiVersion = version;
    next();
});

// 3. Query Parameter
// GET /api/users?version=2

// ===== Documentation (Swagger/OpenAPI) =====
/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: جلب قائمة المستخدمين
 *     tags: [Users]
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: قائمة المستخدمين
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */

// ===== Pagination =====
// Offset-based
// GET /api/users?page=2&limit=20

// Cursor-based (أفضل للأداء)
// GET /api/users?cursor=abc123&limit=20
{
    "data": [...],
    "pagination": {
        "nextCursor": "xyz789",
        "hasMore": true
    }
}

// ===== Caching =====
// ETags
app.get('/api/users/:id', (req, res) => {
    const user = getUser(req.params.id);
    const etag = generateETag(user);
    
    if (req.headers['if-none-match'] === etag) {
        return res.status(304).end();
    }
    
    res.set('ETag', etag);
    res.set('Cache-Control', 'private, max-age=300');
    res.json(user);
});`,
      },
    ],
  },
  {
    id: "testing",
    title: "الاختبارات (Testing)",
    icon: "TestTube",
    color: "text-green-500",
    topics: [
      {
        title: "Unit Testing مع Vitest",
        content: `// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html'],
        },
    },
});

// ===== اختبارات أساسية =====

// math.ts
export function add(a: number, b: number): number {
    return a + b;
}

export function divide(a: number, b: number): number {
    if (b === 0) throw new Error("لا يمكن القسمة على صفر");
    return a / b;
}

// math.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { add, divide } from './math';

describe('Math Utils', () => {
    describe('add', () => {
        it('يجمع رقمين بشكل صحيح', () => {
            expect(add(2, 3)).toBe(5);
        });
        
        it('يتعامل مع الأرقام السالبة', () => {
            expect(add(-1, -2)).toBe(-3);
        });
        
        it('يتعامل مع الصفر', () => {
            expect(add(5, 0)).toBe(5);
        });
    });
    
    describe('divide', () => {
        it('يقسم بشكل صحيح', () => {
            expect(divide(10, 2)).toBe(5);
        });
        
        it('يرمي خطأ عند القسمة على صفر', () => {
            expect(() => divide(10, 0)).toThrow("لا يمكن القسمة على صفر");
        });
    });
});

// ===== Mocking =====
// Mock function
const mockFn = vi.fn();
mockFn.mockReturnValue(42);
mockFn.mockResolvedValue({ data: 'test' });

// Mock module
vi.mock('./api', () => ({
    fetchUser: vi.fn().mockResolvedValue({ id: 1, name: 'أحمد' }),
}));

// Spy
const consoleSpy = vi.spyOn(console, 'log');
// ...
expect(consoleSpy).toHaveBeenCalledWith('مرحباً');

// Timer mocks
vi.useFakeTimers();
setTimeout(() => callback(), 1000);
vi.advanceTimersByTime(1000);
expect(callback).toHaveBeenCalled();
vi.useRealTimers();

// ===== Matchers =====
expect(value).toBe(5);                // ===
expect(value).toEqual({ a: 1 });      // deep equal
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeDefined();
expect(value).toContain('text');
expect(array).toHaveLength(3);
expect(value).toBeGreaterThan(5);
expect(value).toMatch(/regex/);
expect(fn).toHaveBeenCalledTimes(2);
expect(fn).toHaveBeenCalledWith('arg');`,
      },
      {
        title: "Component Testing",
        content: `// setup.ts
import '@testing-library/jest-dom';

// ===== React Testing Library =====
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Button.test.tsx
describe('Button Component', () => {
    it('يعرض النص بشكل صحيح', () => {
        render(<Button>اضغط هنا</Button>);
        expect(screen.getByText('اضغط هنا')).toBeInTheDocument();
    });
    
    it('يستدعي onClick عند الضغط', async () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>اضغط</Button>);
        
        await userEvent.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
    
    it('يكون معطلاً عند disabled', () => {
        render(<Button disabled>معطل</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
    });
});

// Form.test.tsx
describe('Login Form', () => {
    it('يتحقق من المدخلات', async () => {
        const user = userEvent.setup();
        render(<LoginForm onSubmit={vi.fn()} />);
        
        // محاولة إرسال فارغ
        await user.click(screen.getByRole('button', { name: /تسجيل/ }));
        expect(screen.getByText(/البريد مطلوب/)).toBeInTheDocument();
        
        // ملء النموذج
        await user.type(screen.getByLabelText(/البريد/), 'test@test.com');
        await user.type(screen.getByLabelText(/كلمة المرور/), '12345678');
        await user.click(screen.getByRole('button', { name: /تسجيل/ }));
        
        await waitFor(() => {
            expect(screen.queryByText(/البريد مطلوب/)).not.toBeInTheDocument();
        });
    });
});

// Async Component
describe('UserProfile', () => {
    it('يعرض بيانات المستخدم بعد التحميل', async () => {
        render(<UserProfile userId="1" />);
        
        // حالة التحميل
        expect(screen.getByText(/جاري التحميل/)).toBeInTheDocument();
        
        // انتظار البيانات
        await waitFor(() => {
            expect(screen.getByText('أحمد')).toBeInTheDocument();
        });
    });
});

// طرق البحث (Queries)
screen.getByRole('button', { name: /إرسال/ });
screen.getByText(/مرحباً/);
screen.getByLabelText(/البريد/);
screen.getByPlaceholderText(/ابحث/);
screen.getByTestId('submit-btn');
screen.queryByText(/خطأ/);   // null إذا لم يوجد
screen.findByText(/نتيجة/);  // async - ينتظر`,
      },
      {
        title: "E2E Testing",
        content: `// ===== Playwright E2E Testing =====

// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    retries: 2,
    workers: '50%',
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },
    projects: [
        { name: 'chromium', use: { browserName: 'chromium' } },
        { name: 'firefox', use: { browserName: 'firefox' } },
        { name: 'mobile', use: { ...devices['iPhone 13'] } },
    ],
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: true,
    },
});

// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('المصادقة', () => {
    test('تسجيل الدخول بنجاح', async ({ page }) => {
        await page.goto('/login');
        
        // ملء النموذج
        await page.fill('[name="email"]', 'user@test.com');
        await page.fill('[name="password"]', 'password123');
        await page.click('button[type="submit"]');
        
        // التحقق من التوجيه
        await expect(page).toHaveURL('/dashboard');
        await expect(page.locator('h1')).toContainText('لوحة التحكم');
    });
    
    test('رفض بيانات خاطئة', async ({ page }) => {
        await page.goto('/login');
        
        await page.fill('[name="email"]', 'wrong@test.com');
        await page.fill('[name="password"]', 'wrong');
        await page.click('button[type="submit"]');
        
        await expect(page.locator('.error')).toBeVisible();
        await expect(page).toHaveURL('/login');
    });
});

test.describe('CRUD Operations', () => {
    test.beforeEach(async ({ page }) => {
        // تسجيل الدخول قبل كل اختبار
        await page.goto('/login');
        await page.fill('[name="email"]', 'admin@test.com');
        await page.fill('[name="password"]', 'admin123');
        await page.click('button[type="submit"]');
        await page.waitForURL('/dashboard');
    });
    
    test('إنشاء عنصر جديد', async ({ page }) => {
        await page.click('text=إضافة جديد');
        await page.fill('[name="title"]', 'عنصر تجريبي');
        await page.click('text=حفظ');
        
        await expect(page.locator('text=عنصر تجريبي')).toBeVisible();
    });
});

// أوامر التشغيل
// npx playwright test              # تشغيل الكل
// npx playwright test auth.spec.ts # ملف محدد
// npx playwright test --headed     # مع المتصفح
// npx playwright show-report       # التقرير
// npx playwright codegen           # تسجيل تلقائي`,
      },
    ],
  },
  {
    id: "nextjs",
    title: "Next.js",
    icon: "Layers",
    color: "text-white",
    topics: [
      {
        title: "أساسيات Next.js",
        content: `// ===== إنشاء مشروع =====
// npx create-next-app@latest my-app --typescript --tailwind --app

// ===== بنية المجلدات (App Router) =====
// app/
// ├── layout.tsx          ← التخطيط الرئيسي
// ├── page.tsx            ← الصفحة الرئيسية (/)
// ├── loading.tsx         ← حالة التحميل
// ├── error.tsx           ← معالجة الأخطاء
// ├── not-found.tsx       ← صفحة 404
// ├── about/
// │   └── page.tsx        ← /about
// ├── blog/
// │   ├── page.tsx        ← /blog
// │   └── [slug]/
// │       └── page.tsx    ← /blog/:slug
// └── api/
//     └── users/
//         └── route.ts    ← API endpoint

// ===== Layout =====
// app/layout.tsx
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ar" dir="rtl">
            <body>
                <nav>التنقل</nav>
                <main>{children}</main>
                <footer>التذييل</footer>
            </body>
        </html>
    );
}

// ===== Page =====
// app/page.tsx
export const metadata = {
    title: 'الرئيسية | موقعي',
    description: 'وصف الصفحة الرئيسية',
};

export default function HomePage() {
    return (
        <div>
            <h1>مرحباً</h1>
        </div>
    );
}

// ===== Dynamic Routes =====
// app/blog/[slug]/page.tsx
interface PageProps {
    params: { slug: string };
    searchParams: { [key: string]: string };
}

export async function generateMetadata({ params }: PageProps) {
    const post = await getPost(params.slug);
    return { title: post.title };
}

export default async function BlogPost({ params }: PageProps) {
    const post = await getPost(params.slug);
    return <article>{post.content}</article>;
}

// ===== Loading & Error =====
// app/loading.tsx
export default function Loading() {
    return <div>جاري التحميل...</div>;
}

// app/error.tsx
'use client';
export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div>
            <h2>حدث خطأ!</h2>
            <button onClick={reset}>حاول مرة أخرى</button>
        </div>
    );
}

// ===== API Routes =====
// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const users = await db.users.findAll();
    return NextResponse.json(users);
}

export async function POST(request: Request) {
    const body = await request.json();
    const user = await db.users.create(body);
    return NextResponse.json(user, { status: 201 });
}`,
      },
      {
        title: "Server Components و Data Fetching",
        content: `// ===== Server Components (افتراضي) =====
// يتم تنفيذها على الخادم فقط
// لا يُرسل JavaScript للمتصفح

// app/users/page.tsx
async function UsersPage() {
    // يمكن الوصول مباشرة لقاعدة البيانات
    const users = await db.users.findAll();
    
    return (
        <div>
            <h1>المستخدمون</h1>
            {users.map(user => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    );
}

// ===== Client Components =====
'use client';  // يجب إضافة هذا السطر

import { useState, useEffect } from 'react';

function SearchBar() {
    const [query, setQuery] = useState('');
    
    return (
        <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="ابحث..."
        />
    );
}

// ===== Data Fetching =====

// 1. Server Component (مفضل)
async function PostsPage() {
    const res = await fetch('https://api.example.com/posts', {
        next: { revalidate: 3600 }, // ISR - كل ساعة
    });
    const posts = await res.json();
    return <PostsList posts={posts} />;
}

// 2. Static (SSG)
async function StaticPage() {
    const res = await fetch('https://api.example.com/data', {
        cache: 'force-cache', // ثابت
    });
    return <div>{/* ... */}</div>;
}

// 3. Dynamic (SSR)
async function DynamicPage() {
    const res = await fetch('https://api.example.com/data', {
        cache: 'no-store', // دائماً جديد
    });
    return <div>{/* ... */}</div>;
}

// 4. generateStaticParams (بديل getStaticPaths)
export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map(post => ({
        slug: post.slug,
    }));
}

// ===== Server Actions =====
// app/actions.ts
'use server';

export async function createPost(formData: FormData) {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    
    await db.posts.create({ title, content });
    revalidatePath('/posts');
    redirect('/posts');
}

// استخدام في Component
function NewPostForm() {
    return (
        <form action={createPost}>
            <input name="title" required />
            <textarea name="content" required />
            <button type="submit">نشر</button>
        </form>
    );
}

// ===== Caching =====
import { unstable_cache } from 'next/cache';

const getCachedPosts = unstable_cache(
    async () => db.posts.findAll(),
    ['posts'],
    { revalidate: 3600, tags: ['posts'] }
);`,
      },
      {
        title: "Middleware و Authentication",
        content: `// ===== Middleware =====
// middleware.ts (في جذر المشروع)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('auth-token')?.value;
    
    // حماية المسارات
    if (pathname.startsWith('/dashboard') && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // إعادة توجيه المسجلين
    if (pathname === '/login' && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    // إضافة headers
    const response = NextResponse.next();
    response.headers.set('X-Custom-Header', 'value');
    
    // تسجيل
    console.log(\`[\${request.method}] \${pathname}\`);
    
    return response;
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/api/:path*'],
};

// ===== Authentication مع NextAuth.js =====
// npm install next-auth

// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "البريد", type: "email" },
                password: { label: "كلمة المرور", type: "password" },
            },
            async authorize(credentials) {
                const user = await db.users.findByEmail(credentials?.email);
                if (!user) return null;
                
                const valid = await bcrypt.compare(
                    credentials?.password ?? '', 
                    user.password
                );
                if (!valid) return null;
                
                return { id: user.id, name: user.name, email: user.email };
            },
        }),
    ],
    session: { strategy: 'jwt' },
    pages: {
        signIn: '/login',
        error: '/auth/error',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = user.role;
            return token;
        },
        async session({ session, token }) {
            session.user.role = token.role;
            return session;
        },
    },
});

export { handler as GET, handler as POST };

// استخدام في Server Component
import { getServerSession } from 'next-auth';

async function DashboardPage() {
    const session = await getServerSession();
    
    if (!session) redirect('/login');
    
    return <div>مرحباً {session.user.name}</div>;
}

// استخدام في Client Component
'use client';
import { useSession, signIn, signOut } from 'next-auth/react';

function UserMenu() {
    const { data: session, status } = useSession();
    
    if (status === 'loading') return <div>جاري التحميل...</div>;
    
    if (!session) {
        return <button onClick={() => signIn()}>تسجيل الدخول</button>;
    }
    
    return (
        <div>
            <span>{session.user.name}</span>
            <button onClick={() => signOut()}>تسجيل الخروج</button>
        </div>
    );
}`,
      },
    ],
  },
  {
    id: "python",
    title: "Python للويب",
    icon: "Server",
    color: "text-yellow-500",
    topics: [
      {
        title: "أساسيات Python",
        content: `# المتغيرات وأنواع البيانات
name = "أحمد"          # str
age = 25               # int
height = 1.75          # float
is_active = True       # bool
skills = ["Python", "JS", "SQL"]  # list
info = {"name": "أحمد", "age": 25}  # dict
coordinates = (10, 20)  # tuple
unique = {1, 2, 3}     # set

# التحقق من النوع
print(type(name))  # <class 'str'>
isinstance(age, int)  # True

# تحويل الأنواع
str(25)      # "25"
int("25")    # 25
float("3.14") # 3.14
list("abc")  # ['a', 'b', 'c']

# String Methods
text = "Hello World"
text.lower()        # "hello world"
text.upper()        # "HELLO WORLD"
text.strip()        # إزالة المسافات
text.split(" ")     # ['Hello', 'World']
text.replace("World", "Python")
f"اسمي {name} وعمري {age}"  # f-strings
"، ".join(skills)   # "Python، JS، SQL"

# List Methods
skills.append("React")
skills.insert(0, "HTML")
skills.remove("JS")
skills.pop()         # يحذف الأخير
skills.sort()
skills.reverse()
len(skills)
"Python" in skills   # True

# Dictionary Methods
info.keys()          # dict_keys(['name', 'age'])
info.values()        # dict_values(['أحمد', 25])
info.items()         # dict_items([...])
info.get("name", "غير معروف")
info.update({"email": "a@b.com"})
del info["age"]

# List Comprehension
squares = [x**2 for x in range(10)]
even = [x for x in range(20) if x % 2 == 0]
matrix = [[i*j for j in range(5)] for i in range(5)]

# Dict Comprehension
squared = {x: x**2 for x in range(5)}

# الشروط
if age >= 18:
    print("بالغ")
elif age >= 13:
    print("مراهق")
else:
    print("طفل")

# Ternary
status = "بالغ" if age >= 18 else "قاصر"

# الحلقات
for skill in skills:
    print(skill)

for i, skill in enumerate(skills):
    print(f"{i}: {skill}")

for key, value in info.items():
    print(f"{key}: {value}")

while age > 0:
    age -= 1

# الدوال
def greet(name: str, greeting: str = "مرحباً") -> str:
    """دالة الترحيب"""
    return f"{greeting}، {name}!"

# Lambda
square = lambda x: x ** 2
add = lambda a, b: a + b

# *args و **kwargs
def flexible(*args, **kwargs):
    print(args)    # tuple
    print(kwargs)  # dict

# Decorators
def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"استغرق {time.time() - start:.4f} ثانية")
        return result
    return wrapper

@timer
def slow_function():
    import time
    time.sleep(1)

# Classes
class User:
    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email
        self._password = None
    
    @property
    def password(self):
        raise AttributeError("لا يمكن قراءة كلمة المرور")
    
    @password.setter
    def password(self, value):
        import hashlib
        self._password = hashlib.sha256(value.encode()).hexdigest()
    
    def __str__(self):
        return f"User({self.name})"
    
    def __repr__(self):
        return f"User(name='{self.name}', email='{self.email}')"

# Error Handling
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"خطأ: {e}")
except Exception as e:
    print(f"خطأ عام: {e}")
finally:
    print("تم التنفيذ")

# Context Managers
with open("file.txt", "r", encoding="utf-8") as f:
    content = f.read()

# Generators
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

for num in fibonacci(10):
    print(num)`,
      },
      {
        title: "Flask Framework",
        content: `# تثبيت Flask
# pip install flask flask-cors flask-sqlalchemy

from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from functools import wraps
import jwt
import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
CORS(app)
db = SQLAlchemy(app)

# ============ Models ============
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    posts = db.relationship('Post', backref='author', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at.isoformat()
        }

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

# ============ Auth Middleware ============
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        if not token:
            return jsonify({'error': 'Token مطلوب'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = User.query.get(data['user_id'])
        except:
            return jsonify({'error': 'Token غير صالح'}), 401
        return f(current_user, *args, **kwargs)
    return decorated

# ============ Routes ============
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'البريد مستخدم'}), 400
    
    from werkzeug.security import generate_password_hash
    user = User(
        username=data['username'],
        email=data['email'],
        password=generate_password_hash(data['password'])
    )
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': 'تم التسجيل بنجاح', 'user': user.to_dict()}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    from werkzeug.security import check_password_hash
    if user and check_password_hash(user.password, data['password']):
        token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, app.config['SECRET_KEY'])
        return jsonify({'token': token, 'user': user.to_dict()})
    
    return jsonify({'error': 'بيانات خاطئة'}), 401

@app.route('/api/posts', methods=['GET'])
def get_posts():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    posts = Post.query.order_by(Post.created_at.desc())\\
                      .paginate(page=page, per_page=per_page)
    
    return jsonify({
        'posts': [{'id': p.id, 'title': p.title, 'content': p.content} for p in posts.items],
        'total': posts.total,
        'pages': posts.pages,
        'current_page': posts.page
    })

@app.route('/api/posts', methods=['POST'])
@token_required
def create_post(current_user):
    data = request.get_json()
    post = Post(title=data['title'], content=data['content'], user_id=current_user.id)
    db.session.add(post)
    db.session.commit()
    return jsonify({'message': 'تم إنشاء المقال'}), 201

# Error Handlers
@app.errorhandler(404)
def not_found(e):
    return jsonify({'error': 'غير موجود'}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({'error': 'خطأ في الخادم'}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)`,
      },
      {
        title: "Django Framework",
        content: `# تثبيت Django
# pip install django djangorestframework django-cors-headers

# ============ models.py ============
from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True)
    
    class Meta:
        verbose_name = 'مستخدم'
        verbose_name_plural = 'مستخدمون'

class Article(models.Model):
    title = models.CharField(max_length=200, verbose_name='العنوان')
    slug = models.SlugField(unique=True)
    content = models.TextField(verbose_name='المحتوى')
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='articles')
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True)
    tags = models.ManyToManyField('Tag', blank=True)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'مقال'
    
    def __str__(self):
        return self.title

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    
    class Meta:
        verbose_name_plural = 'التصنيفات'

class Tag(models.Model):
    name = models.CharField(max_length=50)

# ============ serializers.py ============
from rest_framework import serializers

class ArticleSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    
    class Meta:
        model = Article
        fields = ['id', 'title', 'slug', 'content', 'author', 'author_name',
                  'category', 'tags', 'is_published', 'created_at']
        read_only_fields = ['author']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'bio', 'avatar']

# ============ views.py ============
from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.select_related('author', 'category')
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'is_published']
    search_fields = ['title', 'content']
    ordering_fields = ['created_at', 'title']
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
    
    @action(detail=False, methods=['get'])
    def published(self, request):
        articles = self.queryset.filter(is_published=True)
        serializer = self.get_serializer(articles, many=True)
        return Response(serializer.data)

# ============ urls.py ============
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'articles', ArticleViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/auth/', include('rest_framework.urls')),
]

# ============ settings.py (المهم) ============
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'rest_framework',
    'corsheaders',
    'django_filters',
    'myapp',
]

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:5173",
]`,
      },
      {
        title: "FastAPI Framework",
        content: `# تثبيت FastAPI
# pip install fastapi uvicorn sqlalchemy pydantic python-jose passlib

from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr, validator
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional, List

# ============ Database Setup ============
SQLALCHEMY_DATABASE_URL = "sqlite:///./app.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ============ Models ============
class UserDB(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    email = Column(String(100), unique=True, index=True)
    hashed_password = Column(String(200))
    created_at = Column(DateTime, default=datetime.utcnow)
    posts = relationship("PostDB", back_populates="author")

class PostDB(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200))
    content = Column(Text)
    author_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    author = relationship("UserDB", back_populates="posts")

Base.metadata.create_all(bind=engine)

# ============ Schemas (Pydantic) ============
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    
    @validator('password')
    def password_strength(cls, v):
        if len(v) < 8:
            raise ValueError('كلمة المرور يجب أن تكون 8 أحرف على الأقل')
        return v

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class PostCreate(BaseModel):
    title: str
    content: str

class PostResponse(BaseModel):
    id: int
    title: str
    content: str
    author_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# ============ Auth ============
SECRET_KEY = "your-secret-key-here"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI(title="My API", version="1.0.0", docs_url="/docs")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_token(data: dict) -> str:
    expires = datetime.utcnow() + timedelta(hours=24)
    return jwt.encode({**data, "exp": expires}, SECRET_KEY, algorithm="HS256")

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user = db.query(UserDB).filter(UserDB.id == payload.get("sub")).first()
        if not user:
            raise HTTPException(status_code=401, detail="مستخدم غير موجود")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Token غير صالح")

# ============ Endpoints ============
@app.post("/register", response_model=UserResponse, status_code=201)
def register(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(UserDB).filter(UserDB.email == user.email).first():
        raise HTTPException(400, "البريد مستخدم مسبقاً")
    
    db_user = UserDB(
        username=user.username,
        email=user.email,
        hashed_password=pwd_context.hash(user.password)
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/token")
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(UserDB).filter(UserDB.username == form.username).first()
    if not user or not pwd_context.verify(form.password, user.hashed_password):
        raise HTTPException(401, "بيانات خاطئة")
    return {"access_token": create_token({"sub": user.id}), "token_type": "bearer"}

@app.get("/posts", response_model=List[PostResponse])
def get_posts(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(PostDB).offset(skip).limit(limit).all()

@app.post("/posts", response_model=PostResponse, status_code=201)
def create_post(post: PostCreate, user: UserDB = Depends(get_current_user), db: Session = Depends(get_db)):
    db_post = PostDB(**post.dict(), author_id=user.id)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@app.delete("/posts/{post_id}", status_code=204)
def delete_post(post_id: int, user: UserDB = Depends(get_current_user), db: Session = Depends(get_db)):
    post = db.query(PostDB).filter(PostDB.id == post_id, PostDB.author_id == user.id).first()
    if not post:
        raise HTTPException(404, "غير موجود")
    db.delete(post)
    db.commit()

# تشغيل: uvicorn main:app --reload`,
      },
    ],
  },
  {
    id: "php",
    title: "PHP و Laravel",
    icon: "Server",
    color: "text-indigo-500",
    topics: [
      {
        title: "أساسيات PHP",
        content: `<?php
// ============ المتغيرات والأنواع ============
$name = "أحمد";          // string
$age = 25;               // integer
$height = 1.75;          // float
$isActive = true;        // boolean
$skills = ["PHP", "JS"]; // array
$info = null;            // null

// الثوابت
define("APP_NAME", "موقعي");
const VERSION = "1.0.0";

// ============ المصفوفات ============
// مصفوفة مرقمة
$colors = ["أحمر", "أخضر", "أزرق"];

// مصفوفة ترابطية
$user = [
    "name" => "أحمد",
    "age" => 25,
    "email" => "ahmed@example.com"
];

// دوال المصفوفات
array_push($colors, "أصفر");
array_pop($colors);
array_merge($colors, ["برتقالي"]);
in_array("أحمر", $colors);  // true
count($colors);
sort($colors);
array_map(fn($c) => strtoupper($c), $colors);
array_filter($colors, fn($c) => strlen($c) > 3);
array_reduce($colors, fn($carry, $c) => $carry . $c, "");

// ============ الدوال ============
function greet(string $name, string $greeting = "مرحباً"): string {
    return "{$greeting}، {$name}!";
}

// Arrow Functions (PHP 7.4+)
$square = fn($x) => $x ** 2;

// Variadic Functions
function sum(int ...$numbers): int {
    return array_sum($numbers);
}

// ============ OOP ============
class User {
    private string $name;
    private string $email;
    protected ?string $password = null;
    
    public function __construct(string $name, string $email) {
        $this->name = $name;
        $this->email = $email;
    }
    
    public function getName(): string {
        return $this->name;
    }
    
    public function setPassword(string $password): void {
        $this->password = password_hash($password, PASSWORD_BCRYPT);
    }
    
    public function verifyPassword(string $password): bool {
        return password_verify($password, $this->password);
    }
    
    public function __toString(): string {
        return "User: {$this->name}";
    }
}

// الوراثة
class Admin extends User {
    private array $permissions;
    
    public function __construct(string $name, string $email, array $permissions = []) {
        parent::__construct($name, $email);
        $this->permissions = $permissions;
    }
    
    public function hasPermission(string $permission): bool {
        return in_array($permission, $this->permissions);
    }
}

// Interfaces
interface Authenticatable {
    public function login(string $email, string $password): bool;
    public function logout(): void;
}

// Traits
trait HasTimestamps {
    public DateTime $createdAt;
    public DateTime $updatedAt;
    
    public function touch(): void {
        $this->updatedAt = new DateTime();
    }
}

// ============ Error Handling ============
try {
    $result = someRiskyOperation();
} catch (InvalidArgumentException $e) {
    echo "خطأ في المدخلات: " . $e->getMessage();
} catch (Exception $e) {
    error_log($e->getMessage());
    echo "حدث خطأ غير متوقع";
} finally {
    // تنفذ دائماً
}

// ============ File Operations ============
// قراءة ملف
$content = file_get_contents("data.txt");
$lines = file("data.txt", FILE_IGNORE_NEW_LINES);

// كتابة ملف
file_put_contents("output.txt", "محتوى جديد");
file_put_contents("log.txt", "سطر جديد\\n", FILE_APPEND);

// JSON
$json = json_encode($user, JSON_UNESCAPED_UNICODE);
$data = json_decode($json, true);

// ============ PDO Database ============
$pdo = new PDO(
    "mysql:host=localhost;dbname=mydb;charset=utf8mb4",
    "root", "password",
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);

// Prepared Statements (آمن من SQL Injection)
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
$stmt->execute(['email' => $email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// Insert
$stmt = $pdo->prepare("INSERT INTO users (name, email) VALUES (:name, :email)");
$stmt->execute(['name' => $name, 'email' => $email]);
$lastId = $pdo->lastInsertId();

// Transaction
$pdo->beginTransaction();
try {
    $pdo->exec("UPDATE accounts SET balance = balance - 100 WHERE id = 1");
    $pdo->exec("UPDATE accounts SET balance = balance + 100 WHERE id = 2");
    $pdo->commit();
} catch (Exception $e) {
    $pdo->rollBack();
    throw $e;
}
?>`,
      },
      {
        title: "Laravel الأساسي",
        content: `// تثبيت Laravel
// composer create-project laravel/laravel myproject
// php artisan serve

// ============ Routes (routes/api.php) ============
use App\\Http\\Controllers\\PostController;
use App\\Http\\Controllers\\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('posts', PostController::class);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', fn(Request $request) => $request->user());
});

// ============ Model (app/Models/Post.php) ============
namespace App\\Models;
use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Relations\\BelongsTo;
use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;

class Post extends Model {
    use HasFactory;
    
    protected $fillable = ['title', 'content', 'slug', 'is_published'];
    protected $casts = ['is_published' => 'boolean', 'created_at' => 'datetime'];
    protected $hidden = ['updated_at'];
    
    // العلاقات
    public function author(): BelongsTo {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    public function tags() {
        return $this->belongsToMany(Tag::class);
    }
    
    // Scopes
    public function scopePublished($query) {
        return $query->where('is_published', true);
    }
    
    public function scopeByAuthor($query, $userId) {
        return $query->where('user_id', $userId);
    }
    
    // Accessors
    public function getExcerptAttribute(): string {
        return Str::limit($this->content, 150);
    }
    
    // Route Model Binding
    public function getRouteKeyName(): string {
        return 'slug';
    }
}

// ============ Migration ============
// php artisan make:migration create_posts_table
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('slug')->unique();
    $table->text('content');
    $table->foreignId('user_id')->constrained()->cascadeOnDelete();
    $table->boolean('is_published')->default(false);
    $table->timestamps();
    $table->index(['user_id', 'is_published']);
});

// ============ Controller ============
namespace App\\Http\\Controllers;
use App\\Models\\Post;
use App\\Http\\Requests\\PostRequest;
use Illuminate\\Http\\JsonResponse;

class PostController extends Controller {
    public function index(): JsonResponse {
        $posts = Post::with('author:id,name')
            ->published()
            ->latest()
            ->paginate(15);
        
        return response()->json($posts);
    }
    
    public function store(PostRequest $request): JsonResponse {
        $post = $request->user()->posts()->create(
            $request->validated()
        );
        
        return response()->json($post, 201);
    }
    
    public function show(Post $post): JsonResponse {
        return response()->json($post->load('author', 'tags'));
    }
    
    public function update(PostRequest $request, Post $post): JsonResponse {
        $this->authorize('update', $post);
        $post->update($request->validated());
        return response()->json($post);
    }
    
    public function destroy(Post $post): JsonResponse {
        $this->authorize('delete', $post);
        $post->delete();
        return response()->json(null, 204);
    }
}

// ============ Form Request ============
namespace App\\Http\\Requests;
use Illuminate\\Foundation\\Http\\FormRequest;

class PostRequest extends FormRequest {
    public function rules(): array {
        return [
            'title' => 'required|string|max:200',
            'content' => 'required|string',
            'slug' => 'required|string|unique:posts,slug,' . $this->post?->id,
            'is_published' => 'boolean',
        ];
    }
    
    public function messages(): array {
        return [
            'title.required' => 'العنوان مطلوب',
            'content.required' => 'المحتوى مطلوب',
        ];
    }
}

// ============ Middleware ============
namespace App\\Http\\Middleware;

class AdminOnly {
    public function handle($request, $next) {
        if (!$request->user()?->is_admin) {
            return response()->json(['error' => 'غير مصرح'], 403);
        }
        return $next($request);
    }
}

// ============ Eloquent Queries ============
// جلب البيانات
Post::all();
Post::find(1);
Post::findOrFail(1);
Post::where('is_published', true)->get();
Post::where('title', 'like', '%بحث%')->first();
Post::whereIn('id', [1, 2, 3])->get();
Post::whereBetween('created_at', [$start, $end])->count();

// Eager Loading (تجنب N+1)
Post::with(['author', 'tags'])->get();
Post::withCount('comments')->get();

// Aggregation
Post::count();
Post::max('views');
Post::avg('rating');
Post::sum('views');

// Chunking (للبيانات الكبيرة)
Post::chunk(100, function ($posts) {
    foreach ($posts as $post) {
        // معالجة
    }
});`,
      },
      {
        title: "PHP Security و APIs",
        content: `<?php
// ============ تأمين PHP ============

// 1. منع SQL Injection - استخدم Prepared Statements دائماً
// خطأ ❌
$query = "SELECT * FROM users WHERE id = " . $_GET['id'];

// صحيح ✅
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$_GET['id']]);

// 2. منع XSS
// خطأ ❌
echo $_GET['name'];

// صحيح ✅
echo htmlspecialchars($_GET['name'], ENT_QUOTES, 'UTF-8');

// 3. CSRF Protection
session_start();
$token = bin2hex(random_bytes(32));
$_SESSION['csrf_token'] = $token;
// في النموذج: <input type="hidden" name="csrf_token" value="<?= $token ?>">

// التحقق
if (!hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
    die('CSRF token invalid');
}

// 4. تأمين رفع الملفات
function secureUpload(array $file): string {
    $allowed = ['image/jpeg', 'image/png', 'image/webp'];
    $maxSize = 5 * 1024 * 1024; // 5MB
    
    if ($file['error'] !== UPLOAD_ERR_OK) {
        throw new Exception('خطأ في الرفع');
    }
    
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->file($file['tmp_name']);
    
    if (!in_array($mime, $allowed)) {
        throw new Exception('نوع ملف غير مسموح');
    }
    
    if ($file['size'] > $maxSize) {
        throw new Exception('حجم الملف كبير');
    }
    
    $ext = match($mime) {
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/webp' => 'webp',
    };
    
    $filename = bin2hex(random_bytes(16)) . '.' . $ext;
    $path = 'uploads/' . $filename;
    
    if (!move_uploaded_file($file['tmp_name'], $path)) {
        throw new Exception('فشل في حفظ الملف');
    }
    
    return $path;
}

// 5. Rate Limiting بسيط
function checkRateLimit(string $ip, int $maxRequests = 60, int $window = 60): bool {
    $key = "rate_limit:{$ip}";
    $redis = new Redis();
    $redis->connect('127.0.0.1');
    
    $current = $redis->incr($key);
    if ($current === 1) {
        $redis->expire($key, $window);
    }
    
    return $current <= $maxRequests;
}

// 6. Password Hashing
$hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
$isValid = password_verify($inputPassword, $hash);

// تحقق إذا كان الهاش يحتاج تحديث
if (password_needs_rehash($hash, PASSWORD_BCRYPT, ['cost' => 12])) {
    $newHash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
    // حدث في قاعدة البيانات
}

// ============ بناء REST API بسيط ============
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$segments = explode('/', trim($path, '/'));

// Simple Router
switch ("{$method} {$segments[1]}") {
    case 'GET users':
        $stmt = $pdo->query("SELECT id, name, email FROM users LIMIT 50");
        echo json_encode(['data' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
        break;
    
    case 'POST users':
        $input = json_decode(file_get_contents('php://input'), true);
        // validation و insert...
        http_response_code(201);
        echo json_encode(['message' => 'تم الإنشاء']);
        break;
    
    case 'PUT users':
        $id = $segments[2] ?? null;
        if (!$id) { http_response_code(400); break; }
        // update...
        echo json_encode(['message' => 'تم التحديث']);
        break;
    
    case 'DELETE users':
        $id = $segments[2] ?? null;
        // delete...
        http_response_code(204);
        break;
    
    default:
        http_response_code(404);
        echo json_encode(['error' => 'غير موجود']);
}
?>`,
      },
    ],
  },
  {
    id: "graphql",
    title: "GraphQL",
    icon: "Globe",
    color: "text-pink-500",
    topics: [
      {
        title: "أساسيات GraphQL",
        content: `// ============ GraphQL Schema ============
// schema.graphql

# الأنواع الأساسية
type User {
  id: ID!
  username: String!
  email: String!
  avatar: String
  posts: [Post!]!
  followers: [User!]!
  followersCount: Int!
  createdAt: DateTime!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  comments: [Comment!]!
  tags: [String!]!
  likes: Int!
  isPublished: Boolean!
  createdAt: DateTime!
}

type Comment {
  id: ID!
  text: String!
  author: User!
  post: Post!
  createdAt: DateTime!
}

# Input Types
input CreatePostInput {
  title: String!
  content: String!
  tags: [String!]
  isPublished: Boolean = false
}

input UpdatePostInput {
  title: String
  content: String
  tags: [String!]
  isPublished: Boolean
}

input PaginationInput {
  page: Int = 1
  limit: Int = 10
}

# Response Types
type PostsResponse {
  posts: [Post!]!
  total: Int!
  hasMore: Boolean!
}

type AuthPayload {
  token: String!
  user: User!
}

# Queries
type Query {
  me: User
  user(id: ID!): User
  users(pagination: PaginationInput): [User!]!
  post(id: ID!): Post
  posts(pagination: PaginationInput, search: String): PostsResponse!
  postsByTag(tag: String!): [Post!]!
}

# Mutations
type Mutation {
  register(username: String!, email: String!, password: String!): AuthPayload!
  login(email: String!, password: String!): AuthPayload!
  createPost(input: CreatePostInput!): Post!
  updatePost(id: ID!, input: UpdatePostInput!): Post!
  deletePost(id: ID!): Boolean!
  likePost(id: ID!): Post!
  addComment(postId: ID!, text: String!): Comment!
  followUser(userId: ID!): User!
}

# Subscriptions (Real-time)
type Subscription {
  postCreated: Post!
  commentAdded(postId: ID!): Comment!
}

scalar DateTime`,
      },
      {
        title: "GraphQL مع Apollo Server",
        content: `// npm install @apollo/server graphql
// npm install @apollo/client (للعميل)

// ============ Server Setup ============
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = \`#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }
  
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
  }
  
  type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
  }
  
  type Mutation {
    createUser(name: String!, email: String!): User!
    createPost(title: String!, content: String!, authorId: ID!): Post!
  }
\`;

// ============ Resolvers ============
const resolvers = {
  Query: {
    users: async (_, __, { dataSources }) => {
      return dataSources.userAPI.getAll();
    },
    user: async (_, { id }, { dataSources }) => {
      return dataSources.userAPI.getById(id);
    },
    posts: async (_, __, { dataSources }) => {
      return dataSources.postAPI.getAll();
    },
  },
  
  Mutation: {
    createUser: async (_, { name, email }, { dataSources }) => {
      return dataSources.userAPI.create({ name, email });
    },
    createPost: async (_, args, { dataSources, user }) => {
      if (!user) throw new Error('يجب تسجيل الدخول');
      return dataSources.postAPI.create(args);
    },
  },
  
  // Field Resolvers
  User: {
    posts: async (parent, _, { dataSources }) => {
      return dataSources.postAPI.getByAuthor(parent.id);
    },
  },
  
  Post: {
    author: async (parent, _, { dataSources }) => {
      return dataSources.userAPI.getById(parent.authorId);
    },
  },
};

// ============ Start Server ============
const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const user = await verifyToken(token);
    return { user, dataSources: { userAPI: new UserAPI(), postAPI: new PostAPI() } };
  },
});

console.log(\`Server ready at \${url}\`);

// ============ Client (React + Apollo) ============
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery, useMutation } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  headers: { Authorization: \`Bearer \${token}\` },
});

// App wrapper
<ApolloProvider client={client}>
  <App />
</ApolloProvider>

// Query Hook
const GET_POSTS = gql\`
  query GetPosts($page: Int, $limit: Int) {
    posts(pagination: { page: $page, limit: $limit }) {
      posts {
        id
        title
        content
        author { name }
        createdAt
      }
      total
      hasMore
    }
  }
\`;

function PostList() {
  const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
    variables: { page: 1, limit: 10 },
  });
  
  if (loading) return <p>جاري التحميل...</p>;
  if (error) return <p>خطأ: {error.message}</p>;
  
  return (
    <div>
      {data.posts.posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>بواسطة {post.author.name}</p>
        </div>
      ))}
      {data.posts.hasMore && (
        <button onClick={() => fetchMore({ variables: { page: 2 } })}>
          تحميل المزيد
        </button>
      )}
    </div>
  );
}

// Mutation Hook
const CREATE_POST = gql\`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
    }
  }
\`;

function CreatePostForm() {
  const [createPost, { loading }] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
    onCompleted: () => alert('تم إنشاء المقال!'),
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    createPost({
      variables: { input: { title, content, isPublished: true } },
    });
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}`,
      },
    ],
  },
  {
    id: "websockets",
    title: "WebSockets و Real-time",
    icon: "Zap",
    color: "text-amber-500",
    topics: [
      {
        title: "WebSocket API",
        content: `// ============ WebSocket الأساسي (المتصفح) ============
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
  console.log('متصل بالخادم');
  ws.send(JSON.stringify({ type: 'join', room: 'general' }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('رسالة:', data);
  
  switch (data.type) {
    case 'message':
      displayMessage(data);
      break;
    case 'notification':
      showNotification(data);
      break;
    case 'typing':
      showTypingIndicator(data.user);
      break;
  }
};

ws.onerror = (error) => {
  console.error('خطأ WebSocket:', error);
};

ws.onclose = (event) => {
  console.log(\`انقطع الاتصال: \${event.code} - \${event.reason}\`);
  // إعادة الاتصال تلقائياً
  setTimeout(() => reconnect(), 3000);
};

// إرسال رسالة
function sendMessage(text) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({
      type: 'message',
      text,
      timestamp: Date.now()
    }));
  }
}

// ============ WebSocket Server (Node.js) ============
// npm install ws
import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
const rooms = new Map(); // room -> Set<WebSocket>

wss.on('connection', (ws, req) => {
  const ip = req.socket.remoteAddress;
  console.log(\`اتصال جديد من \${ip}\`);
  
  ws.isAlive = true;
  ws.on('pong', () => { ws.isAlive = true; });
  
  ws.on('message', (raw) => {
    try {
      const data = JSON.parse(raw);
      
      switch (data.type) {
        case 'join':
          joinRoom(ws, data.room);
          break;
          
        case 'message':
          broadcastToRoom(ws.room, {
            type: 'message',
            user: ws.username,
            text: data.text,
            timestamp: Date.now()
          }, ws);
          break;
          
        case 'typing':
          broadcastToRoom(ws.room, {
            type: 'typing',
            user: ws.username
          }, ws);
          break;
      }
    } catch (e) {
      ws.send(JSON.stringify({ type: 'error', message: 'رسالة غير صالحة' }));
    }
  });
  
  ws.on('close', () => {
    leaveRoom(ws);
    console.log('اتصال مغلق');
  });
});

function joinRoom(ws, roomName) {
  if (!rooms.has(roomName)) {
    rooms.set(roomName, new Set());
  }
  rooms.get(roomName).add(ws);
  ws.room = roomName;
  
  broadcastToRoom(roomName, {
    type: 'notification',
    text: \`\${ws.username} انضم للغرفة\`
  });
}

function broadcastToRoom(roomName, data, exclude = null) {
  const room = rooms.get(roomName);
  if (!room) return;
  
  const message = JSON.stringify(data);
  room.forEach(client => {
    if (client !== exclude && client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Heartbeat - كشف الاتصالات الميتة
const interval = setInterval(() => {
  wss.clients.forEach(ws => {
    if (!ws.isAlive) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on('close', () => clearInterval(interval));`,
      },
      {
        title: "Socket.IO و تطبيق Chat",
        content: `// npm install socket.io (server)
// npm install socket.io-client (client)

// ============ Server ============
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] }
});

// Middleware للتحقق
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const user = verifyToken(token);
    socket.user = user;
    next();
  } catch (err) {
    next(new Error('غير مصرح'));
  }
});

// إدارة الغرف والمستخدمين
const onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log(\`\${socket.user.name} متصل\`);
  onlineUsers.set(socket.user.id, socket.id);
  
  // إرسال المستخدمين المتصلين
  io.emit('users:online', Array.from(onlineUsers.keys()));
  
  // الانضمام لغرفة
  socket.on('room:join', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('room:joined', {
      user: socket.user.name,
      roomId
    });
  });
  
  // إرسال رسالة
  socket.on('message:send', async (data) => {
    const message = {
      id: generateId(),
      text: data.text,
      sender: socket.user,
      roomId: data.roomId,
      timestamp: new Date(),
    };
    
    // حفظ في قاعدة البيانات
    await saveMessage(message);
    
    // إرسال للغرفة
    io.to(data.roomId).emit('message:new', message);
  });
  
  // مؤشر الكتابة
  socket.on('typing:start', (roomId) => {
    socket.to(roomId).emit('typing:show', socket.user.name);
  });
  
  socket.on('typing:stop', (roomId) => {
    socket.to(roomId).emit('typing:hide', socket.user.name);
  });
  
  // رسالة خاصة
  socket.on('message:private', (data) => {
    const targetSocketId = onlineUsers.get(data.targetUserId);
    if (targetSocketId) {
      io.to(targetSocketId).emit('message:private', {
        from: socket.user,
        text: data.text
      });
    }
  });
  
  // قطع الاتصال
  socket.on('disconnect', () => {
    onlineUsers.delete(socket.user.id);
    io.emit('users:online', Array.from(onlineUsers.keys()));
  });
});

httpServer.listen(3001, () => console.log('Socket server on :3001'));

// ============ Client (React) ============
import { io } from 'socket.io-client';
import { useEffect, useState, useCallback } from 'react';

// Custom Hook
function useSocket(token) {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    const s = io('http://localhost:3001', {
      auth: { token },
      reconnection: true,
      reconnectionDelay: 1000,
    });

    s.on('connect', () => setConnected(true));
    s.on('disconnect', () => setConnected(false));
    s.on('message:new', (msg) => setMessages(prev => [...prev, msg]));
    s.on('users:online', (users) => setOnlineUsers(users));
    s.on('typing:show', (user) => setTypingUsers(prev => [...prev, user]));
    s.on('typing:hide', (user) => setTypingUsers(prev => prev.filter(u => u !== user)));

    setSocket(s);
    return () => s.disconnect();
  }, [token]);

  const sendMessage = useCallback((text, roomId) => {
    socket?.emit('message:send', { text, roomId });
  }, [socket]);

  const joinRoom = useCallback((roomId) => {
    socket?.emit('room:join', roomId);
  }, [socket]);

  return { connected, messages, onlineUsers, typingUsers, sendMessage, joinRoom };
}

// استخدام في Component
function ChatRoom({ roomId }) {
  const { connected, messages, typingUsers, sendMessage, joinRoom } = useSocket(token);
  const [text, setText] = useState('');
  
  useEffect(() => { joinRoom(roomId); }, [roomId]);
  
  const handleSend = () => {
    if (text.trim()) {
      sendMessage(text, roomId);
      setText('');
    }
  };
  
  return (
    <div>
      <div>{connected ? '🟢 متصل' : '🔴 غير متصل'}</div>
      <div>
        {messages.map(m => (
          <div key={m.id}>
            <b>{m.sender.name}:</b> {m.text}
          </div>
        ))}
        {typingUsers.length > 0 && (
          <div>{typingUsers.join(', ')} يكتب...</div>
        )}
      </div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleSend}>إرسال</button>
    </div>
  );
}`,
      },
    ],
  },
  {
    id: "performance",
    title: "أداء الويب (Performance)",
    icon: "Zap",
    color: "text-lime-500",
    topics: [
      {
        title: "تحسين الأداء",
        content: `// ============ Core Web Vitals ============
// LCP (Largest Contentful Paint) < 2.5s
// FID (First Input Delay) < 100ms  
// CLS (Cumulative Layout Shift) < 0.1
// INP (Interaction to Next Paint) < 200ms

// ============ JavaScript Performance ============

// 1. Debounce & Throttle
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function throttle(fn, limit) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// استخدام
const handleSearch = debounce((query) => {
  fetch(\`/api/search?q=\${query}\`);
}, 300);

const handleScroll = throttle(() => {
  // تحديث الموضع
}, 100);

// 2. Virtual Scrolling (للقوائم الطويلة)
function VirtualList({ items, itemHeight, containerHeight }) {
  const [scrollTop, setScrollTop] = useState(0);
  
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );
  
  const visibleItems = items.slice(startIndex, endIndex);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;
  
  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: \`translateY(\${offsetY}px)\` }}>
          {visibleItems.map((item, i) => (
            <div key={startIndex + i} style={{ height: itemHeight }}>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 3. Lazy Loading
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Skeleton />}>
      <HeavyComponent />
    </Suspense>
  );
}

// 4. Memoization
const ExpensiveList = React.memo(({ items }) => {
  return items.map(item => <Item key={item.id} {...item} />);
});

const memoizedValue = useMemo(() => {
  return heavyComputation(data);
}, [data]);

const memoizedCallback = useCallback((id) => {
  deleteItem(id);
}, [deleteItem]);

// 5. Web Workers (عمليات ثقيلة في خيط منفصل)
// worker.js
self.onmessage = (e) => {
  const result = heavyComputation(e.data);
  self.postMessage(result);
};

// main.js
const worker = new Worker('worker.js');
worker.postMessage(largeData);
worker.onmessage = (e) => {
  console.log('النتيجة:', e.data);
};

// 6. Intersection Observer (Lazy Loading)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
}, { rootMargin: '100px' });

document.querySelectorAll('img[data-src]').forEach(img => {
  observer.observe(img);
});

// 7. تقليل Bundle Size
// Dynamic imports
const AdminPanel = () => import('./AdminPanel');

// Tree Shaking - استورد ما تحتاجه فقط
import { debounce } from 'lodash-es'; // ✅
// import _ from 'lodash'; // ❌ يجلب المكتبة كاملة

// 8. Caching Strategies
// Service Worker
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        const clone = response.clone();
        caches.open('v1').then(cache => cache.put(event.request, clone));
        return response;
      });
    })
  );
});

// React Query Caching
const { data } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  staleTime: 5 * 60 * 1000, // 5 دقائق
  cacheTime: 30 * 60 * 1000, // 30 دقيقة
  refetchOnWindowFocus: false,
});`,
      },
      {
        title: "تحسين CSS و الصور",
        content: `/* ============ CSS Performance ============ */

/* 1. استخدم will-change للعناصر المتحركة */
.animated-element {
  will-change: transform, opacity;
  /* أزله بعد انتهاء الحركة */
}

/* 2. استخدم transform بدل top/left للحركات */
/* بطيء ❌ */
.move-bad { left: 100px; top: 50px; }

/* سريع ✅ */
.move-good { transform: translate(100px, 50px); }

/* 3. تجنب Layout Thrashing */
/* بطيء ❌ - يسبب reflow متكرر */
/*
elements.forEach(el => {
  const height = el.offsetHeight; // قراءة
  el.style.height = height + 10 + 'px'; // كتابة
});
*/

/* سريع ✅ - اقرأ أولاً ثم اكتب */
/*
const heights = elements.map(el => el.offsetHeight);
elements.forEach((el, i) => {
  el.style.height = heights[i] + 10 + 'px';
});
*/

/* 4. Container Queries */
@container (min-width: 400px) {
  .card { flex-direction: row; }
}

/* 5. Content Visibility */
.offscreen-section {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px;
}

/* 6. CSS Layers */
@layer base, components, utilities;

@layer base {
  * { box-sizing: border-box; }
}

/* 7. خطوط محسّنة */
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap; /* يظهر نص بديل أثناء التحميل */
  unicode-range: U+0600-06FF; /* عربي فقط */
}

/* ============ تحسين الصور ============ */

/* في HTML */
/*
<!-- صور متجاوبة -->
<img
  src="image-800.webp"
  srcset="image-400.webp 400w,
          image-800.webp 800w,
          image-1200.webp 1200w"
  sizes="(max-width: 600px) 400px,
         (max-width: 900px) 800px,
         1200px"
  alt="وصف الصورة"
  loading="lazy"
  decoding="async"
  width="800"
  height="600"
>

<!-- صورة حديثة مع fallback -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="وصف" loading="lazy">
</picture>
*/

/* ============ Lighthouse Tips ============ */
/*
1. ضغط الصور: استخدم WebP/AVIF بدل JPEG/PNG
2. ضغط النصوص: Gzip/Brotli على الخادم
3. CDN: استخدم شبكة توزيع المحتوى
4. HTTP/2 أو HTTP/3: لتحميل متوازي
5. Preload الموارد المهمة:
   <link rel="preload" href="font.woff2" as="font" crossorigin>
   <link rel="preload" href="hero.webp" as="image">
   <link rel="preconnect" href="https://api.example.com">
   <link rel="dns-prefetch" href="https://cdn.example.com">
6. أزل CSS/JS غير المستخدم
7. كسّر الكود (Code Splitting)
8. استخدم Service Workers للتخزين المؤقت
*/`,
      },
    ],
  },
  {
    id: "state-management",
    title: "إدارة الحالة (State Management)",
    icon: "Layers",
    color: "text-violet-500",
    topics: [
      {
        title: "Zustand و Jotai و Redux Toolkit",
        content: `// ============ Zustand (خفيف وبسيط) ============
// npm install zustand
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        total: 0,
        
        addItem: (item) => set((state) => {
          const existing = state.items.find(i => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map(i =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
              total: state.total + item.price,
            };
          }
          return {
            items: [...state.items, { ...item, quantity: 1 }],
            total: state.total + item.price,
          };
        }),
        
        removeItem: (id) => set((state) => {
          const item = state.items.find(i => i.id === id);
          return {
            items: state.items.filter(i => i.id !== id),
            total: state.total - (item ? item.price * item.quantity : 0),
          };
        }),
        
        updateQuantity: (id, quantity) => set((state) => {
          const item = state.items.find(i => i.id === id);
          if (!item) return state;
          const diff = (quantity - item.quantity) * item.price;
          return {
            items: state.items.map(i =>
              i.id === id ? { ...i, quantity } : i
            ),
            total: state.total + diff,
          };
        }),
        
        clearCart: () => set({ items: [], total: 0 }),
      }),
      { name: 'cart-storage' }
    )
  )
);

// استخدام في Component
function Cart() {
  const { items, total, removeItem } = useCartStore();
  // Selector لأداء أفضل
  const itemCount = useCartStore(state => state.items.length);
  
  return (
    <div>
      <h2>السلة ({itemCount})</h2>
      {items.map(item => (
        <div key={item.id}>
          {item.name} x{item.quantity} - {item.price * item.quantity}
          <button onClick={() => removeItem(item.id)}>حذف</button>
        </div>
      ))}
      <p>المجموع: {total}</p>
    </div>
  );
}

// ============ Redux Toolkit ============
// npm install @reduxjs/toolkit react-redux
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

// Async Thunk
const fetchPosts = createAsyncThunk('posts/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch('/api/posts');
    if (!res.ok) throw new Error('فشل الجلب');
    return res.json();
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: { items: [], loading: false, error: null },
  reducers: {
    addPost: (state, action) => { state.items.push(action.payload); },
    removePost: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => { state.loading = true; })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const store = configureStore({
  reducer: { posts: postsSlice.reducer },
});

// استخدام
function PostList() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(state => state.posts);
  
  useEffect(() => { dispatch(fetchPosts()); }, []);
  
  if (loading) return <p>جاري التحميل...</p>;
  return items.map(p => <div key={p.id}>{p.title}</div>);
}`,
      },
    ],
  },
  {
    id: "tailwind-advanced",
    title: "Tailwind CSS المتقدم",
    icon: "Palette",
    color: "text-sky-500",
    topics: [
      {
        title: "التخصيص والإعدادات",
        content: `// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-up': 'fadeUp 0.5s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px)',
      },
      screens: {
        'xs': '475px',
        '3xl': '1920px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
} satisfies Config;`,
      },
      {
        title: "أنماط مخصصة ومكونات",
        content: `<!-- أنماط Tailwind المتقدمة -->

<!-- Gradient Text -->
<h1 class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
           bg-clip-text text-transparent text-5xl font-bold">
  عنوان متدرج الألوان
</h1>

<!-- Glass Morphism -->
<div class="bg-white/10 backdrop-blur-lg border border-white/20 
            rounded-2xl p-6 shadow-xl">
  بطاقة زجاجية
</div>

<!-- Neon Glow Effect -->
<button class="px-6 py-3 bg-cyan-500 text-black font-bold rounded-lg
               shadow-[0_0_20px_rgba(0,255,255,0.5)]
               hover:shadow-[0_0_40px_rgba(0,255,255,0.8)]
               transition-shadow duration-300">
  زر متوهج
</button>

<!-- Animated Border -->
<div class="relative p-[2px] rounded-xl bg-gradient-to-r 
            from-blue-500 via-purple-500 to-pink-500
            animate-[spin_3s_linear_infinite]">
  <div class="bg-gray-900 rounded-xl p-6">
    محتوى مع حدود متحركة
  </div>
</div>

<!-- Responsive Grid Layout -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            gap-4 md:gap-6 lg:gap-8">
  <div class="col-span-1 sm:col-span-2 lg:col-span-1">عنصر</div>
</div>

<!-- Dark Mode Support -->
<div class="bg-white dark:bg-gray-900 
            text-gray-900 dark:text-white
            border border-gray-200 dark:border-gray-700
            transition-colors duration-300">
  يتغير مع الوضع المظلم
</div>

<!-- Group & Peer Modifiers -->
<div class="group cursor-pointer">
  <img class="group-hover:scale-110 transition-transform" />
  <p class="group-hover:text-blue-500">نص يتغير عند hover على الأب</p>
</div>

<input class="peer" type="checkbox" />
<label class="peer-checked:text-green-500">يتغير حسب checkbox</label>

<!-- Container Queries -->
<div class="@container">
  <div class="@lg:flex @lg:gap-4">
    <div class="@lg:w-1/2">عنصر</div>
  </div>
</div>

<!-- Arbitrary Values -->
<div class="top-[117px] w-[calc(100%-2rem)] bg-[#1a1b2e]
            grid-cols-[1fr_2fr_1fr] text-[clamp(1rem,2vw,2rem)]">
  قيم مخصصة
</div>`,
      },
    ],
  },
  {
    id: "auth-patterns",
    title: "أنماط المصادقة (Authentication)",
    icon: "ShieldCheck",
    color: "text-emerald-500",
    topics: [
      {
        title: "JWT Authentication",
        content: `// ============ JWT Authentication كامل ============

// --- Server Side (Node.js/Express) ---
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// توليد Tokens
function generateTokens(userId) {
  const accessToken = jwt.sign(
    { userId, type: 'access' },
    JWT_SECRET,
    { expiresIn: '15m' }
  );
  
  const refreshToken = jwt.sign(
    { userId, type: 'refresh' },
    JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
  
  return { accessToken, refreshToken };
}

// تسجيل حساب جديد
app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body;
  
  // التحقق من عدم وجود المستخدم
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ error: 'البريد مستخدم' });
  
  // تشفير كلمة المرور
  const hashedPassword = await bcrypt.hash(password, 12);
  
  // إنشاء المستخدم
  const user = await User.create({ email, password: hashedPassword, name });
  
  // توليد Tokens
  const tokens = generateTokens(user.id);
  
  // حفظ Refresh Token في HttpOnly Cookie
  res.cookie('refreshToken', tokens.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 أيام
  });
  
  res.json({ accessToken: tokens.accessToken, user: { id: user.id, name, email } });
});

// تسجيل الدخول
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'بيانات غير صحيحة' });
  
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).json({ error: 'بيانات غير صحيحة' });
  
  const tokens = generateTokens(user.id);
  
  res.cookie('refreshToken', tokens.refreshToken, {
    httpOnly: true, secure: true, sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  
  res.json({ accessToken: tokens.accessToken });
});

// تجديد Access Token
app.post('/api/auth/refresh', async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.status(401).json({ error: 'غير مصرح' });
  
  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const tokens = generateTokens(decoded.userId);
    
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true, secure: true, sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    res.json({ accessToken: tokens.accessToken });
  } catch (err) {
    res.status(403).json({ error: 'Token غير صالح' });
  }
});

// Middleware للحماية
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'غير مصرح' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Token منتهي أو غير صالح' });
  }
}

// --- Client Side (React) ---
// useAuth Hook
function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  
  const login = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setToken(data.accessToken);
    localStorage.setItem('accessToken', data.accessToken);
  };
  
  const refreshToken = async () => {
    const res = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    });
    const data = await res.json();
    setToken(data.accessToken);
    localStorage.setItem('accessToken', data.accessToken);
  };
  
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('accessToken');
  };
  
  return { user, token, login, logout, refreshToken };
}`,
      },
      {
        title: "OAuth 2.0 و Social Login",
        content: `// ============ OAuth 2.0 مع Google ============

// --- Server (Express + Passport) ---
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          avatar: profile.photos[0].value,
        });
      }
      
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

// Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = generateTokens(req.user.id);
    res.redirect(\`/auth/success?token=\${token.accessToken}\`);
  }
);

// --- Client (React) ---
function SocialLogin() {
  const handleGoogleLogin = () => {
    window.location.href = '/auth/google';
  };
  
  const handleGitHubLogin = () => {
    window.location.href = '/auth/github';
  };
  
  return (
    <div className="space-y-3">
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 
                   border rounded-lg hover:bg-gray-50 transition"
      >
        <GoogleIcon />
        <span>تسجيل بواسطة Google</span>
      </button>
      
      <button
        onClick={handleGitHubLogin}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 
                   bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
      >
        <GitHubIcon />
        <span>تسجيل بواسطة GitHub</span>
      </button>
    </div>
  );
}

// Protected Route Component
function ProtectedRoute({ children }) {
  const { token, refreshToken } = useAuth();
  const [isValid, setIsValid] = useState(null);
  
  useEffect(() => {
    async function verify() {
      if (!token) {
        setIsValid(false);
        return;
      }
      try {
        const res = await fetch('/api/auth/verify', {
          headers: { Authorization: \`Bearer \${token}\` },
        });
        if (res.ok) {
          setIsValid(true);
        } else {
          await refreshToken();
          setIsValid(true);
        }
      } catch {
        setIsValid(false);
      }
    }
    verify();
  }, [token]);
  
  if (isValid === null) return <LoadingSpinner />;
  if (!isValid) return <Navigate to="/login" />;
  return children;
}`,
      },
    ],
  },
  {
    id: "deployment",
    title: "النشر والاستضافة (Deployment)",
    icon: "Globe",
    color: "text-teal-500",
    topics: [
      {
        title: "Vercel و Netlify و Railway",
        content: `// ============ Vercel Deployment ============

// vercel.json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "no-cache" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ],
  "env": {
    "DATABASE_URL": "@database-url",
    "JWT_SECRET": "@jwt-secret"
  }
}

// الأوامر
// npm i -g vercel
// vercel            # نشر preview
// vercel --prod     # نشر production

// ============ Netlify ============

// netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[build.environment]
  NODE_VERSION = "20"

// Netlify Functions (Serverless)
// netlify/functions/api.ts
export default async (req, context) => {
  const { name } = await req.json();
  return new Response(JSON.stringify({ message: \`مرحباً \${name}\` }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

// ============ Docker Deployment ============

# Dockerfile (Multi-stage)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# nginx.conf
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /assets {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    gzip on;
    gzip_types text/css application/javascript application/json;
}

# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
  
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  pgdata:`,
      },
      {
        title: "CI/CD Pipeline كامل",
        content: `# ============ GitHub Actions CI/CD ============

# .github/workflows/deploy.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'

jobs:
  # 1. فحص الكود
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check

  # 2. الاختبارات
  test:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npm run test -- --coverage
      - uses: actions/upload-artifact@v4
        with:
          name: coverage
          path: coverage/

  # 3. البناء
  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: build
          path: dist/

  # 4. النشر
  deploy:
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: build
          path: dist/
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: ./

  # 5. إشعار بالنتيجة
  notify:
    runs-on: ubuntu-latest
    needs: deploy
    if: always()
    steps:
      - name: Notify Success
        if: needs.deploy.result == 'success'
        run: echo "✅ تم النشر بنجاح"
      - name: Notify Failure
        if: needs.deploy.result == 'failure'
        run: echo "❌ فشل النشر"`,
      },
    ],
  },
  {
    id: "database-advanced",
    title: "قواعد البيانات المتقدمة",
    icon: "Database",
    color: "text-amber-500",
    topics: [
      {
        title: "PostgreSQL المتقدم",
        content: `-- ============ PostgreSQL المتقدم ============

-- إنشاء جدول مع أعمدة متقدمة
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price > 0),
    tags TEXT[] DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'active' 
        CHECK (status IN ('active', 'inactive', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    search_vector TSVECTOR
);

-- فهارس متقدمة
CREATE INDEX idx_products_tags ON products USING GIN (tags);
CREATE INDEX idx_products_metadata ON products USING GIN (metadata jsonb_path_ops);
CREATE INDEX idx_products_search ON products USING GIN (search_vector);
CREATE INDEX idx_products_price ON products (price) WHERE status = 'active';

-- Trigger لتحديث updated_at
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Full Text Search
UPDATE products SET search_vector = 
    to_tsvector('arabic', coalesce(name, '') || ' ' || coalesce(description, ''));

-- بحث نصي كامل
SELECT * FROM products 
WHERE search_vector @@ to_tsquery('arabic', 'هاتف & ذكي');

-- JSONB Queries
SELECT * FROM products 
WHERE metadata->>'brand' = 'Apple'
AND (metadata->'specs'->>'ram')::int >= 8;

-- Array Operations
SELECT * FROM products WHERE 'electronics' = ANY(tags);
INSERT INTO products (name, tags) VALUES ('Phone', ARRAY['electronics', 'mobile']);

-- Window Functions
SELECT 
    name, price,
    RANK() OVER (ORDER BY price DESC) as price_rank,
    AVG(price) OVER () as avg_price,
    price - LAG(price) OVER (ORDER BY price) as price_diff
FROM products;

-- CTE (Common Table Expressions)
WITH ranked_products AS (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY status ORDER BY price DESC) as rn
    FROM products
)
SELECT * FROM ranked_products WHERE rn <= 5;

-- Recursive CTE (شجرة التصنيفات)
WITH RECURSIVE category_tree AS (
    SELECT id, name, parent_id, 1 as depth
    FROM categories WHERE parent_id IS NULL
    UNION ALL
    SELECT c.id, c.name, c.parent_id, ct.depth + 1
    FROM categories c
    JOIN category_tree ct ON c.parent_id = ct.id
)
SELECT * FROM category_tree ORDER BY depth;

-- Materialized Views
CREATE MATERIALIZED VIEW product_stats AS
SELECT 
    status,
    COUNT(*) as count,
    AVG(price) as avg_price,
    MAX(price) as max_price
FROM products
GROUP BY status;

REFRESH MATERIALIZED VIEW CONCURRENTLY product_stats;`,
      },
      {
        title: "Prisma ORM",
        content: `// ============ Prisma ORM ============
// npm install prisma @prisma/client
// npx prisma init

// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  password  String
  role      Role     @default(USER)
  posts     Post[]
  profile   Profile?
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("users")
  @@index([email])
}

model Post {
  id        String     @id @default(uuid())
  title     String
  content   String?
  published Boolean    @default(false)
  author    User       @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorId  String     @map("author_id")
  tags      Tag[]
  comments  Comment[]
  createdAt DateTime   @default(now())

  @@map("posts")
  @@index([authorId])
}

model Profile {
  id     String  @id @default(uuid())
  bio    String?
  avatar String?
  user   User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId String  @unique @map("user_id")
}

model Tag {
  id    String @id @default(uuid())
  name  String @unique
  posts Post[]
}

model Comment {
  id       String   @id @default(uuid())
  text     String
  post     Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  postId   String
  authorId String
  createdAt DateTime @default(now())
}

enum Role {
  USER
  ADMIN
  MODERATOR
}

// --- استخدام Prisma Client ---
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// إنشاء مستخدم مع بروفايل
const user = await prisma.user.create({
  data: {
    email: 'ahmed@example.com',
    name: 'أحمد',
    password: hashedPassword,
    profile: {
      create: { bio: 'مطور ويب' },
    },
  },
  include: { profile: true },
});

// بحث متقدم
const posts = await prisma.post.findMany({
  where: {
    AND: [
      { published: true },
      { author: { role: 'ADMIN' } },
      { tags: { some: { name: 'javascript' } } },
    ],
  },
  include: {
    author: { select: { name: true, email: true } },
    tags: true,
    _count: { select: { comments: true } },
  },
  orderBy: { createdAt: 'desc' },
  take: 10,
  skip: 0,
});

// Transaction
const [post, notification] = await prisma.$transaction([
  prisma.post.create({ data: { title: 'مقال جديد', authorId: userId } }),
  prisma.notification.create({ data: { userId, message: 'تم نشر مقال' } }),
]);

// Aggregation
const stats = await prisma.post.aggregate({
  _count: true,
  _avg: { likes: true },
  where: { published: true },
});

// الأوامر:
// npx prisma migrate dev --name init
// npx prisma generate
// npx prisma studio
// npx prisma db seed`,
      },
    ],
  },
  {
    id: "accessibility",
    title: "الوصولية (Accessibility)",
    icon: "Globe",
    color: "text-indigo-500",
    topics: [
      {
        title: "WCAG و ARIA",
        content: `<!-- ============ أساسيات الوصولية ============ -->

<!-- 1. Semantic HTML (الأساس) -->
<header role="banner">
  <nav aria-label="القائمة الرئيسية">
    <ul>
      <li><a href="/" aria-current="page">الرئيسية</a></li>
      <li><a href="/about">عن الموقع</a></li>
    </ul>
  </nav>
</header>

<main role="main">
  <article>
    <h1>عنوان المقال</h1>
    <p>المحتوى...</p>
  </article>
</main>

<!-- 2. الصور -->
<img src="logo.png" alt="شعار الشركة">
<img src="decoration.png" alt="" role="presentation"> <!-- صورة زخرفية -->

<!-- 3. النماذج -->
<form>
  <div>
    <label for="email">البريد الإلكتروني *</label>
    <input 
      type="email" 
      id="email" 
      name="email"
      required
      aria-required="true"
      aria-describedby="email-help email-error"
    >
    <span id="email-help" class="help-text">سنستخدمه للتواصل معك</span>
    <span id="email-error" class="error" role="alert" aria-live="polite">
      <!-- رسالة الخطأ -->
    </span>
  </div>
</form>

<!-- 4. أزرار -->
<button 
  aria-label="إغلاق القائمة"
  aria-expanded="false"
  aria-controls="mobile-menu"
>
  <svg aria-hidden="true"><!-- أيقونة --></svg>
</button>

<!-- 5. Modals -->
<dialog 
  role="dialog" 
  aria-modal="true"
  aria-labelledby="dialog-title"
>
  <h2 id="dialog-title">عنوان النافذة</h2>
  <p>المحتوى</p>
  <button autofocus>إغلاق</button>
</dialog>

<!-- 6. Live Regions (تحديثات ديناميكية) -->
<div aria-live="polite" aria-atomic="true">
  <!-- المحتوى المتغير ديناميكياً -->
  تم حفظ التغييرات بنجاح
</div>

<div role="alert">
  خطأ: لم يتم الحفظ
</div>

<div role="status">
  جاري التحميل...
</div>

<!-- 7. Skip Links -->
<a href="#main-content" class="sr-only focus:not-sr-only 
   focus:absolute focus:top-4 focus:right-4 
   focus:bg-blue-600 focus:text-white focus:p-4 
   focus:z-50 focus:rounded-lg">
  انتقل إلى المحتوى الرئيسي
</a>

<!-- 8. Focus Management -->
<style>
/* Focus Visible */
:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 2px;
}

/* Screen Reader Only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* تباين الألوان - نسبة 4.5:1 للنص العادي */
/* نسبة 3:1 للنص الكبير (18px+) */
.good-contrast { color: #1a1a1a; background: #ffffff; }
.bad-contrast { color: #999999; background: #ffffff; } /* ❌ */

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Forced Colors (High Contrast Mode) */
@media (forced-colors: active) {
  .button { border: 2px solid ButtonText; }
}
</style>

<!-- WCAG 2.1 المستويات -->
<!-- A: الحد الأدنى (مطلوب) -->
<!-- AA: الموصى به (معيار الصناعة) -->
<!-- AAA: الأعلى (مثالي) -->`,
      },
    ],
  },
  {
    id: "security-advanced",
    title: "أمان الويب المتقدم",
    icon: "ShieldCheck",
    color: "text-red-600",
    topics: [
      {
        title: "حماية Frontend و Backend",
        content: `// ============ أمان الويب المتقدم ============

// 1. Content Security Policy (CSP)
// في Express
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' 'nonce-abc123'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "connect-src 'self' https://api.example.com",
    "font-src 'self' https://fonts.googleapis.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '));
  next();
});

// 2. Security Headers
app.use(helmet({
  contentSecurityPolicy: true,
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: { policy: 'same-site' },
  dnsPrefetchControl: true,
  frameguard: { action: 'deny' },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xssFilter: true,
}));

// 3. Rate Limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 100, // 100 طلب
  message: { error: 'عدد الطلبات كثير. حاول لاحقاً' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Login Rate Limiting (أكثر صرامة)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 محاولات فقط
  skipSuccessfulRequests: true,
});
app.use('/api/auth/login', loginLimiter);

// 4. Input Validation (Zod)
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email('بريد غير صالح'),
  password: z.string()
    .min(8, 'كلمة المرور قصيرة')
    .regex(/[A-Z]/, 'يجب أن تحتوي على حرف كبير')
    .regex(/[0-9]/, 'يجب أن تحتوي على رقم')
    .regex(/[^a-zA-Z0-9]/, 'يجب أن تحتوي على رمز'),
  name: z.string().min(2).max(50).regex(/^[\\u0600-\\u06FFa-zA-Z ]+$/),
});

app.post('/api/register', (req, res) => {
  const result = userSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.flatten() });
  }
  // ... المتابعة
});

// 5. SQL Injection Prevention
// ❌ خطير
// db.query(\`SELECT * FROM users WHERE id = \${req.params.id}\`);

// ✅ آمن - Parameterized Queries
// db.query('SELECT * FROM users WHERE id = $1', [req.params.id]);

// 6. XSS Prevention في React
// React يحمي تلقائياً من XSS في JSX
// لكن احذر من:
// ❌ dangerouslySetInnerHTML={{ __html: userInput }}
// ✅ استخدم DOMPurify إذا كنت تحتاج HTML
import DOMPurify from 'dompurify';
const cleanHTML = DOMPurify.sanitize(userInput);

// 7. CSRF Protection
const csrf = require('csurf');
app.use(csrf({ cookie: { httpOnly: true, secure: true } }));

app.get('/form', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// 8. Secrets Management
// لا تخزن الأسرار في الكود أبداً!
// استخدم environment variables
// .env (لا ترفعها لـ Git!)
DATABASE_URL=postgresql://user:pass@localhost:5432/db
JWT_SECRET=super-secret-key-here
API_KEY=your-api-key

// .gitignore
.env
.env.local
.env.production`,
      },
    ],
  },
  {
    id: "react-patterns",
    title: "React Patterns المتقدمة",
    icon: "Atom",
    color: "text-cyan-400",
    topics: [
      {
        title: "Custom Hooks و Patterns",
        content: `// ============ React Patterns المتقدمة ============

// 1. Custom Hook - useLocalStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue] as const;
}

// 2. Custom Hook - useDebounce
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}

// 3. Custom Hook - useFetch
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        const json = await res.json();
        setData(json);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

// 4. Compound Components Pattern
const Tabs = ({ children, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
};

Tabs.List = ({ children }) => (
  <div className="flex gap-2">{children}</div>
);

Tabs.Tab = ({ value, children }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  return (
    <button
      className={activeTab === value ? 'active' : ''}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};

Tabs.Panel = ({ value, children }) => {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== value) return null;
  return <div>{children}</div>;
};

// استخدام
<Tabs defaultTab="tab1">
  <Tabs.List>
    <Tabs.Tab value="tab1">التبويب 1</Tabs.Tab>
    <Tabs.Tab value="tab2">التبويب 2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="tab1">محتوى 1</Tabs.Panel>
  <Tabs.Panel value="tab2">محتوى 2</Tabs.Panel>
</Tabs>

// 5. Render Props Pattern
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  
  return render(position);
}

// استخدام
<MouseTracker render={({ x, y }) => (
  <div>الماوس في: {x}, {y}</div>
)} />

// 6. Error Boundary
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
    // إرسال للتتبع
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page">
          <h2>حدث خطأ</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            حاول مرة أخرى
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}`,
      },
      {
        title: "React Query و Data Fetching",
        content: `// ============ TanStack React Query ============
// npm install @tanstack/react-query

import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

// إعداد QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

// في App
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

// --- جلب البيانات ---
function PostList() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await fetch('/api/posts');
      if (!res.ok) throw new Error('فشل الجلب');
      return res.json();
    },
    select: (data) => data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  });

  if (isLoading) return <Skeleton count={5} />;
  if (error) return <ErrorMessage message={error.message} retry={refetch} />;

  return data.map(post => <PostCard key={post.id} post={post} />);
}

// --- بحث مع Pagination ---
function SearchPosts() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebounce(query, 300);

  const { data, isFetching } = useQuery({
    queryKey: ['posts', 'search', debouncedQuery, page],
    queryFn: () => fetch(\`/api/posts?q=\${debouncedQuery}&page=\${page}\`).then(r => r.json()),
    keepPreviousData: true,
    enabled: debouncedQuery.length > 0,
  });

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="بحث..." />
      {isFetching && <Spinner />}
      {data?.posts.map(p => <PostCard key={p.id} post={p} />)}
      <Pagination page={page} totalPages={data?.totalPages} onPageChange={setPage} />
    </div>
  );
}

// --- Mutations ---
function CreatePost() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (newPost) => fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    }).then(r => r.json()),
    
    // Optimistic Update
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      const previousPosts = queryClient.getQueryData(['posts']);
      
      queryClient.setQueryData(['posts'], (old) => [
        { ...newPost, id: Date.now(), createdAt: new Date() },
        ...old,
      ]);
      
      return { previousPosts };
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(['posts'], context.previousPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {mutation.isLoading && <p>جاري الإرسال...</p>}
      {mutation.isError && <p>خطأ: {mutation.error.message}</p>}
      {mutation.isSuccess && <p>تم النشر!</p>}
    </form>
  );
}

// --- Infinite Scroll ---
function InfinitePostList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    queryFn: ({ pageParam = 1 }) => 
      fetch(\`/api/posts?page=\${pageParam}&limit=20\`).then(r => r.json()),
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });

  return (
    <div>
      {data?.pages.map(page =>
        page.posts.map(post => <PostCard key={post.id} post={post} />)
      )}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'جاري التحميل...' : 'تحميل المزيد'}
        </button>
      )}
    </div>
  );
}`,
      },
    ],
  },
  {
    id: "css-animations",
    title: "CSS Animations و Transitions",
    icon: "Palette",
    color: "text-pink-500",
    topics: [
      {
        title: "أساسيات Transitions",
        content: `/* === CSS Transitions ===
   التحولات تسمح بتغيير القيم بسلاسة خلال فترة زمنية محددة
*/

/* --- transition الأساسي --- */
.button {
    background-color: #3498db;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.button:hover {
    background-color: #2980b9;
}

/* --- عدة خصائص --- */
.card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    transform: translateY(0);
    transition: transform 0.3s ease,
                box-shadow 0.3s ease,
                background-color 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

/* --- أنواع الحركة (Timing Functions) --- */
.ease        { transition-timing-function: ease; }
.ease-in     { transition-timing-function: ease-in; }
.ease-out    { transition-timing-function: ease-out; }
.ease-in-out { transition-timing-function: ease-in-out; }
.linear      { transition-timing-function: linear; }

/* --- cubic-bezier مخصص --- */
.custom-ease {
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* --- أمثلة عملية --- */

/* تأثير التلاشي */
.fade-element {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}
.fade-element.visible {
    opacity: 1;
    visibility: visible;
}

/* شريط تقدم متحرك */
.progress-bar {
    width: 0%;
    height: 8px;
    background: linear-gradient(90deg, #3498db, #2ecc71);
    border-radius: 4px;
    transition: width 1s ease-out;
}
.progress-bar.complete {
    width: 100%;
}

/* قائمة منسدلة */
.dropdown-menu {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease;
}
.dropdown.open .dropdown-menu {
    max-height: 500px;
}`,
      },
      {
        title: "Keyframe Animations",
        content: `/* === @keyframes ===
   تعريف حركات مخصصة بالكامل
*/

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.element {
    animation: fadeIn 0.6s ease-out forwards;
}

/* حركة متعددة المراحل */
@keyframes bounce {
    0%   { transform: translateY(0); }
    25%  { transform: translateY(-30px); }
    50%  { transform: translateY(0); }
    75%  { transform: translateY(-15px); }
    100% { transform: translateY(0); }
}

.bouncing {
    animation: bounce 1s ease infinite;
}

/* حركة دوران */
@keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #eee;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

/* حركة كتابة */
@keyframes typing {
    from { width: 0; }
    to   { width: 100%; }
}

@keyframes blink {
    50% { border-color: transparent; }
}

.typing-text {
    overflow: hidden;
    white-space: nowrap;
    border-right: 3px solid;
    animation: typing 3s steps(30) forwards,
               blink 0.7s step-end infinite;
}

/* خصائص animation الكاملة */
.animated {
    animation-name: fadeIn;
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-delay: 0.5s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: forwards;
    animation-play-state: running;
    /* أو بسطر واحد */
    animation: fadeIn 1s ease 0.5s 1 normal forwards running;
}

/* حركة تموج */
@keyframes ripple {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(4); opacity: 0; }
}

/* حركة Morphing */
@keyframes morph {
    0%   { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    50%  { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
    100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
}

.morphing-shape {
    width: 200px;
    height: 200px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    animation: morph 8s ease-in-out infinite;
}

/* تقليل الحركة */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}`,
      },
      {
        title: "Transform و 3D",
        content: `/* === CSS Transform === */

/* Transform 2D */
.move    { transform: translate(50px, 100px); }
.rotate  { transform: rotate(45deg); }
.scale   { transform: scale(1.5); }
.skew    { transform: skew(10deg, 5deg); }

/* دمج عدة تحويلات */
.combined {
    transform: translateX(50px) rotate(45deg) scale(1.2);
}

/* Transform Origin */
.element {
    transform-origin: center center;
    transform-origin: top left;
}

/* Transform 3D */
.container-3d {
    perspective: 1000px;
}

.card-3d {
    transform-style: preserve-3d;
    transition: transform 0.6s;
}

.card-3d:hover {
    transform: rotateY(180deg);
}

/* بطاقة قابلة للقلب (Flip Card) */
.flip-card {
    width: 300px;
    height: 200px;
    perspective: 1000px;
}

.flip-card-inner {
    width: 100%;
    height: 100%;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    position: relative;
}

.flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 12px;
}

.flip-card-back {
    transform: rotateY(180deg);
}

/* تأثير 3D Tilt */
.tilt-card {
    transform: perspective(1000px) rotateX(0) rotateY(0);
    transition: transform 0.3s ease;
}

.tilt-card:hover {
    transform: perspective(1000px) rotateX(5deg) rotateY(-5deg);
}

/* تأثير العمق المتحرك */
@keyframes float3D {
    0%, 100% {
        transform: perspective(1000px) translateZ(0) rotateX(0);
    }
    50% {
        transform: perspective(1000px) translateZ(30px) rotateX(2deg);
    }
}

.floating-3d {
    animation: float3D 4s ease-in-out infinite;
}`,
      },
    ],
  },
  {
    id: "responsive-design",
    title: "التصميم المتجاوب (Responsive)",
    icon: "Layers",
    color: "text-teal-500",
    topics: [
      {
        title: "Media Queries",
        content: `/* === Media Queries === */

/* Mobile First - الافتراضي للموبايل */
.container {
    padding: 16px;
    font-size: 14px;
}

/* أجهزة لوحية (768px+) */
@media (min-width: 768px) {
    .container {
        padding: 24px;
        font-size: 16px;
        max-width: 720px;
        margin: 0 auto;
    }
}

/* لابتوب (1024px+) */
@media (min-width: 1024px) {
    .container {
        padding: 32px;
        max-width: 960px;
    }
}

/* شاشات كبيرة (1280px+) */
@media (min-width: 1280px) {
    .container { max-width: 1200px; }
}

/* استعلامات متقدمة */
@media (orientation: landscape) {
    .hero { height: 100vh; }
}

@media (prefers-color-scheme: dark) {
    :root { --bg: #1a1a1a; --text: #fff; }
}

@media print {
    .no-print { display: none; }
    body { color: black; background: white; }
}

/* Container Queries (جديد) */
.card-container {
    container-type: inline-size;
    container-name: card;
}

@container card (min-width: 400px) {
    .card-content {
        display: grid;
        grid-template-columns: 1fr 2fr;
    }
}`,
      },
      {
        title: "Grid و Flexbox المتجاوب",
        content: `/* === Responsive Grid === */

/* شبكة متجاوبة بدون Media Queries */
.auto-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
}

/* شبكة مع breakpoints */
.product-grid {
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr;
}

@media (min-width: 640px) {
    .product-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
    .product-grid { grid-template-columns: repeat(3, 1fr); gap: 24px; }
}

@media (min-width: 1280px) {
    .product-grid { grid-template-columns: repeat(4, 1fr); }
}

/* Layout كامل متجاوب */
.page-layout {
    display: grid;
    min-height: 100vh;
    grid-template-areas: "header" "main" "footer";
    grid-template-rows: auto 1fr auto;
}

@media (min-width: 768px) {
    .page-layout {
        grid-template-areas:
            "header header"
            "sidebar main"
            "footer footer";
        grid-template-columns: 250px 1fr;
    }
}

/* Flexbox متجاوب */
.flex-responsive {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.flex-responsive > * {
    flex: 1 1 300px;
}

/* خطوط متجاوبة (clamp) */
h1 { font-size: clamp(1.5rem, 5vw, 3rem); }
p  { font-size: clamp(0.875rem, 2vw, 1.125rem); }

/* مسافات متجاوبة */
section {
    padding: clamp(2rem, 5vw, 6rem) clamp(1rem, 3vw, 4rem);
}

/* صور متجاوبة */
img {
    max-width: 100%;
    height: auto;
    display: block;
}`,
      },
    ],
  },
  {
    id: "sass-preprocessor",
    title: "Sass/SCSS",
    icon: "Palette",
    color: "text-rose-500",
    topics: [
      {
        title: "أساسيات SCSS",
        content: `// === SCSS - مُعالج CSS المتقدم ===

// --- المتغيرات ---
$primary-color: #3498db;
$font-size-base: 16px;
$spacing: 8px;

// --- التداخل (Nesting) ---
.navbar {
    background: white;
    padding: 16px;
    
    .logo {
        font-size: 24px;
        font-weight: bold;
    }
    
    .nav-links {
        display: flex;
        gap: 16px;
        
        a {
            color: #333;
            &:hover { color: $primary-color; }
            &.active { font-weight: bold; }
        }
    }
    
    // & لبناء أسماء BEM
    &__item { padding: $spacing; }
    &--dark { background: #333; }
}

// --- الحسابات ---
.container {
    width: 100% - 40px;
    padding: $spacing * 2;
    font-size: $font-size-base * 1.5;
}

// --- Interpolation ---
$property: 'color';
$side: 'top';
.element {
    #{$property}: red;
    margin-#{$side}: 10px;
}`,
      },
      {
        title: "Mixins و Functions و الحلقات",
        content: `// === Mixins ===

@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.hero { @include flex-center; min-height: 100vh; }

// Mixin مع معاملات
@mixin button($bg, $text: white, $radius: 8px) {
    background-color: $bg;
    color: $text;
    border: none;
    border-radius: $radius;
    padding: 12px 24px;
    &:hover { background-color: darken($bg, 10%); }
}

.btn-primary { @include button(#3498db); }
.btn-danger  { @include button(#e74c3c, white, 12px); }

// Mixin للـ Responsive
@mixin respond-to($bp) {
    @if $bp == 'mobile'  { @media (max-width: 767px) { @content; } }
    @else if $bp == 'tablet'  { @media (min-width: 768px) { @content; } }
    @else if $bp == 'desktop' { @media (min-width: 1024px) { @content; } }
}

.grid {
    grid-template-columns: 1fr;
    @include respond-to('tablet')  { grid-template-columns: repeat(2, 1fr); }
    @include respond-to('desktop') { grid-template-columns: repeat(3, 1fr); }
}

// === Functions ===
@function rem($px) { @return $px / 16 * 1rem; }
.element { font-size: rem(24); padding: rem(16); }

// === الحلقات ===
@for $i from 1 through 5 {
    .mt-#{$i} { margin-top: $i * 8px; }
}

$colors: ('primary': #3498db, 'success': #2ecc71, 'danger': #e74c3c);
@each $name, $color in $colors {
    .text-#{$name} { color: $color; }
    .bg-#{$name}   { background-color: $color; }
    .btn-#{$name}  {
        background-color: $color;
        &:hover { background-color: darken($color, 10%); }
    }
}

// نظام Grid كامل
$grid-columns: 12;
@for $i from 1 through $grid-columns {
    .col-#{$i} {
        flex: 0 0 percentage($i / $grid-columns);
        max-width: percentage($i / $grid-columns);
    }
}

// الشروط
@mixin theme($mode) {
    @if $mode == 'dark' { background: #1a1a1a; color: #fff; }
    @else { background: #fff; color: #333; }
}

// @extend
%card-base {
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.product-card { @extend %card-base; border: 1px solid #eee; }
.user-card    { @extend %card-base; border: 2px solid #3498db; }`,
      },
    ],
  },
  {
    id: "regex",
    title: "التعبيرات النمطية (Regex)",
    icon: "Wrench",
    color: "text-amber-500",
    topics: [
      {
        title: "أساسيات Regex",
        content: `// === التعبيرات النمطية (Regular Expressions) ===

// إنشاء Regex
const regex1 = /pattern/flags;
const regex2 = new RegExp('pattern', 'flags');

// الأعلام
/pattern/g   // بحث شامل
/pattern/i   // تجاهل حالة الأحرف
/pattern/m   // متعدد الأسطر

// المحارف الخاصة
.     // أي محرف
\\d    // رقم [0-9]
\\w    // حرف أو رقم أو _
\\s    // مسافة بيضاء
\\b    // حد الكلمة
^     // بداية النص
$     // نهاية النص

// المحددات الكمية
*      // 0 أو أكثر
+      // 1 أو أكثر
?      // 0 أو 1
{3}    // بالضبط 3
{2,5}  // من 2 إلى 5

// === أمثلة عملية ===

// التحقق من البريد
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
emailRegex.test('user@example.com'); // true

// التحقق من رقم الهاتف
const phoneRegex = /^(\\+?\\d{1,3})?[-.\\s]?\\d{3}[-.\\s]?\\d{3}[-.\\s]?\\d{4}$/;

// استخراج أرقام
const numbers = 'العمر 25 والطول 180'.match(/\\d+/g);
// ['25', '180']

// استبدال
const cleaned = '  Hello   World  '.replace(/\\s+/g, ' ').trim();
// 'Hello World'

// كلمة مرور قوية (8+ أحرف، حرف كبير، صغير، رقم، رمز)
const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;

// مجموعات الالتقاط
const dateRegex = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;
const match = '2024-01-15'.match(dateRegex);
console.log(match.groups.year);  // '2024'

// Lookahead
const priceRegex = /\\d+(?=\\$)/g;
'100$ و 200$'.match(priceRegex); // ['100', '200']

// تنسيق أرقام بفواصل
function formatNumber(num) {
    return num.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');
}
formatNumber(1234567); // '1,234,567'

// تحويل camelCase لـ kebab-case
function toKebab(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
toKebab('backgroundColor'); // 'background-color'

// إزالة HTML tags
function stripHTML(html) {
    return html.replace(/<[^>]*>/g, '');
}`,
      },
    ],
  },
  {
    id: "npm-packages",
    title: "مكتبات NPM الأساسية",
    icon: "Box",
    color: "text-red-500",
    topics: [
      {
        title: "إدارة المشاريع مع NPM",
        content: `// === NPM - مدير حزم Node.js ===

// أوامر أساسية
// npm init -y                    إنشاء مشروع
// npm install package-name       تثبيت حزمة
// npm i package-name --save-dev  تطوير فقط
// npm i -g package-name          عالمي
// npm uninstall package-name     إلغاء تثبيت
// npm update                     تحديث الحزم
// npm outdated                   عرض الحزم القديمة
// npm run dev                    تشغيل سكربت

// === package.json ===
/*
{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --fix",
    "test": "vitest"
  },
  "dependencies": {
    "react": "^18.2.0",      // ^ = minor + patch
    "axios": "~1.6.0"        // ~ = patch فقط
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "eslint": "^8.0.0"
  }
}
*/

// أنواع الإصدارات
// ^1.2.3 → يقبل 1.x.x
// ~1.2.3 → يقبل 1.2.x
// 1.2.3  → الإصدار المحدد فقط

// بدائل NPM
// yarn add package-name
// pnpm add package-name
// bun add package-name`,
      },
      {
        title: "مكتبات شائعة ومفيدة",
        content: `// === مكتبات NPM الأكثر استخداماً ===

// --- 1. Axios - HTTP Client ---
import axios from 'axios';

const response = await axios.get('/api/users');
await axios.post('/api/users', { name: 'أحمد' });

const api = axios.create({
    baseURL: 'https://api.example.com',
    timeout: 10000,
    headers: { 'Authorization': 'Bearer token' }
});

// Interceptors
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// --- 2. date-fns ---
import { format, addDays, differenceInDays } from 'date-fns';
import { ar } from 'date-fns/locale';

format(new Date(), 'yyyy-MM-dd');
format(new Date(), 'EEEE d MMMM yyyy', { locale: ar });
addDays(new Date(), 7);

// --- 3. Zod - التحقق من البيانات ---
import { z } from 'zod';

const UserSchema = z.object({
    name: z.string().min(2, 'الاسم قصير جداً'),
    email: z.string().email('بريد غير صالح'),
    age: z.number().min(18, 'يجب أن يكون 18+'),
    role: z.enum(['admin', 'user', 'moderator']),
});

type User = z.infer<typeof UserSchema>;

const result = UserSchema.safeParse(data);
if (result.success) {
    console.log(result.data);
} else {
    console.log(result.error.errors);
}

// --- 4. Lodash ---
import { debounce, throttle, cloneDeep, groupBy } from 'lodash';

const search = debounce((query) => fetchResults(query), 300);
const handleScroll = throttle(() => checkPosition(), 100);
const copy = cloneDeep(originalObject);
const grouped = groupBy(users, 'role');

// --- 5. uuid ---
import { v4 as uuidv4 } from 'uuid';
const id = uuidv4(); // 'a1b2c3d4-...'`,
      },
    ],
  },
  {
    id: "web-apis",
    title: "واجهات المتصفح (Web APIs)",
    icon: "Globe",
    color: "text-indigo-500",
    topics: [
      {
        title: "Fetch API و DOM",
        content: `// === Fetch API ===

// GET
const response = await fetch('https://api.example.com/data');
const data = await response.json();

// POST
await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'أحمد' })
});

// Upload ملف
const formData = new FormData();
formData.append('file', fileInput.files[0]);
await fetch('/api/upload', { method: 'POST', body: formData });

// === DOM API ===

// اختيار العناصر
document.getElementById('myId');
document.querySelector('.my-class');
document.querySelectorAll('.items');

// إنشاء وتعديل
const div = document.createElement('div');
div.textContent = 'محتوى جديد';
div.className = 'card';
parent.appendChild(div);

// الأحداث
button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
});

// Event Delegation
document.querySelector('.list').addEventListener('click', (e) => {
    if (e.target.matches('.list-item')) {
        console.log('تم النقر على:', e.target.textContent);
    }
});`,
      },
      {
        title: "LocalStorage و APIs حديثة",
        content: `// === Web Storage ===

// LocalStorage - تخزين دائم
localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme');
localStorage.removeItem('theme');

// تخزين كائنات
localStorage.setItem('user', JSON.stringify({ name: 'أحمد' }));
const user = JSON.parse(localStorage.getItem('user'));

// SessionStorage - تخزين مؤقت
sessionStorage.setItem('token', 'abc123');

// === Intersection Observer ===
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// === Clipboard API ===
async function copyToClipboard(text) {
    await navigator.clipboard.writeText(text);
}

// === Geolocation API ===
navigator.geolocation.getCurrentPosition(
    (pos) => console.log(pos.coords.latitude, pos.coords.longitude),
    (err) => console.error(err.message)
);

// === Notification API ===
async function sendNotification(title, body) {
    if (Notification.permission !== 'granted') {
        await Notification.requestPermission();
    }
    if (Notification.permission === 'granted') {
        new Notification(title, { body });
    }
}

// === URLSearchParams ===
const params = new URLSearchParams(window.location.search);
const page = params.get('page');
params.set('sort', 'date');
const newURL = \`?\${params.toString()}\`;`,
      },
    ],
  },
  {
    id: "error-handling",
    title: "معالجة الأخطاء (Error Handling)",
    icon: "ShieldCheck",
    color: "text-red-400",
    topics: [
      {
        title: "أنماط معالجة الأخطاء",
        content: `// === معالجة الأخطاء في JavaScript ===

// try...catch...finally
try {
    const data = JSON.parse(invalidJSON);
} catch (error) {
    if (error instanceof SyntaxError) {
        console.error('خطأ في JSON:', error.message);
    } else if (error instanceof TypeError) {
        console.error('خطأ في النوع:', error.message);
    }
} finally {
    cleanup();
}

// أخطاء مخصصة
class AppError extends Error {
    constructor(message, statusCode, code) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        this.code = code;
    }
}

class NotFoundError extends AppError {
    constructor(resource) {
        super(\`\${resource} غير موجود\`, 404, 'NOT_FOUND');
    }
}

// معالجة Async/Await
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new AppError('فشل الجلب', response.status, 'FETCH_ERROR');
        }
        return await response.json();
    } catch (error) {
        if (error instanceof TypeError) {
            showErrorMessage('لا يوجد اتصال');
        } else {
            showErrorMessage('حدث خطأ');
        }
        return null;
    }
}

// Error Boundary في React
class ErrorBoundary extends React.Component {
    state = { hasError: false, error: null };
    
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    
    componentDidCatch(error, info) {
        logErrorToService(error, info);
    }
    
    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h2>حدث خطأ!</h2>
                    <button onClick={() => this.setState({ hasError: false })}>
                        حاول مرة أخرى
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

// نمط Result (بدون throw)
function divide(a, b) {
    if (b === 0) return { success: false, error: 'لا يمكن القسمة على صفر' };
    return { success: true, data: a / b };
}`,
      },
    ],
  },
  },
  {
    id: "vuejs",
    title: "Vue.js",
    icon: "Atom",
    color: "text-emerald-500",
    topics: [
      {
        title: "إنشاء مشروع Vue.js",
        content: `// تثبيت Vue.js
// npm create vue@latest my-app
// cd my-app && npm install && npm run dev

// ملف main.js - نقطة البداية
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')

// هيكل المشروع:
// src/
//   main.js        - نقطة الدخول
//   App.vue        - المكون الرئيسي
//   components/    - المكونات
//   views/         - الصفحات
//   router/        - التوجيه
//   stores/        - Pinia stores
//   assets/        - الملفات الثابتة`,
      },
      {
        title: "المكونات (Components)",
        content: `<!-- مكون Vue بسيط -->
<template>
  <div class="card">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <button @click="handleClick">{{ buttonText }}</button>
    <span>عدد النقرات: {{ count }}</span>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// الخصائص (Props)
const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, default: 'لا يوجد وصف' }
})

// الأحداث (Emits)
const emit = defineEmits(['clicked'])

// البيانات التفاعلية
const count = ref(0)

// الخصائص المحسوبة
const buttonText = computed(() => {
  return count.value > 0 ? 'اضغط مرة أخرى' : 'اضغط هنا'
})

// الدوال
function handleClick() {
  count.value++
  emit('clicked', count.value)
}
</script>

<style scoped>
.card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>`,
      },
      {
        title: "التوجيه (Vue Router)",
        content: `// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/user/:id',
    name: 'user',
    component: () => import('../views/UserView.vue'),
    props: true  // تمرير المعاملات كـ props
  },
  {
    path: '/dashboard',
    component: () => import('../views/Dashboard.vue'),
    // حماية المسار
    beforeEnter: (to, from) => {
      const isAuth = localStorage.getItem('token')
      if (!isAuth) return { name: 'login' }
    },
    children: [
      { path: '', component: () => import('../views/DashHome.vue') },
      { path: 'settings', component: () => import('../views/Settings.vue') }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// حارس التنقل العام
router.beforeEach((to, from) => {
  document.title = to.meta.title || 'تطبيقي'
})

export default router`,
      },
      {
        title: "إدارة الحالة (Pinia)",
        content: `// stores/counter.js - مخزن Pinia
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// طريقة Composition API
export const useCounterStore = defineStore('counter', () => {
  // الحالة
  const count = ref(0)
  const name = ref('مستخدم')

  // Getters
  const doubleCount = computed(() => count.value * 2)
  const greeting = computed(() => 'مرحباً ' + name.value)

  // Actions
  function increment() {
    count.value++
  }

  function decrement() {
    if (count.value > 0) count.value--
  }

  async function fetchData() {
    const res = await fetch('/api/data')
    const data = await res.json()
    count.value = data.count
  }

  return { count, name, doubleCount, greeting, increment, decrement, fetchData }
})

// الاستخدام في مكون:
// <script setup>
// import { useCounterStore } from '@/stores/counter'
// const store = useCounterStore()
// store.increment()
// console.log(store.doubleCount)
// </script>`,
      },
      {
        title: "التوجيهات (Directives)",
        content: `<!-- التوجيهات المدمجة -->
<template>
  <!-- v-if / v-else-if / v-else - عرض شرطي -->
  <div v-if="status === 'loading'">جاري التحميل...</div>
  <div v-else-if="status === 'error'">حدث خطأ</div>
  <div v-else>تم التحميل بنجاح</div>

  <!-- v-show - إظهار/إخفاء بـ CSS -->
  <div v-show="isVisible">هذا يظهر ويختفي</div>

  <!-- v-for - حلقة تكرار -->
  <ul>
    <li v-for="(item, index) in items" :key="item.id">
      {{ index + 1 }}. {{ item.name }}
    </li>
  </ul>

  <!-- v-model - ربط ثنائي -->
  <input v-model="username" placeholder="اسم المستخدم" />
  <input v-model.number="age" type="number" />
  <input v-model.trim="email" />
  <textarea v-model.lazy="message"></textarea>

  <!-- v-bind - ربط الخصائص -->
  <img :src="imageUrl" :alt="imageAlt" />
  <div :class="{ active: isActive, 'text-bold': isBold }"></div>
  <div :style="{ color: textColor, fontSize: size + 'px' }"></div>

  <!-- v-on - الأحداث -->
  <button @click="handleClick">اضغط</button>
  <button @click.prevent="submit">إرسال</button>
  <input @keyup.enter="search" />
  <div @click.stop="innerClick">منع الانتشار</div>

  <!-- v-html - عرض HTML -->
  <div v-html="rawHtml"></div>

  <!-- v-memo - تحسين الأداء -->
  <div v-memo="[valueA, valueB]">محتوى مخزن مؤقتاً</div>
</template>`,
      },
      {
        title: "Composables (دوال مخصصة)",
        content: `// composables/useFetch.js
import { ref, watchEffect } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(true)

  async function fetchData() {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(url.value || url)
      if (!res.ok) throw new Error('فشل في جلب البيانات')
      data.value = await res.json()
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  watchEffect(fetchData)

  return { data, error, loading, refetch: fetchData }
}

// composables/useLocalStorage.js
export function useLocalStorage(key, defaultValue) {
  const stored = localStorage.getItem(key)
  const data = ref(stored ? JSON.parse(stored) : defaultValue)

  watch(data, (newVal) => {
    localStorage.setItem(key, JSON.stringify(newVal))
  }, { deep: true })

  return data
}

// composables/useMousePosition.js
export function useMousePosition() {
  const x = ref(0)
  const y = ref(0)

  function update(e) {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}`,
      },
      {
        title: "Watchers و Lifecycle",
        content: `<script setup>
import { ref, watch, watchEffect, onMounted, onUnmounted, onUpdated } from 'vue'

const searchQuery = ref('')
const results = ref([])
const count = ref(0)

// مراقب بسيط
watch(searchQuery, (newVal, oldVal) => {
  console.log('تغير البحث من', oldVal, 'إلى', newVal)
})

// مراقب مع خيارات
watch(searchQuery, async (query) => {
  if (query.length < 3) return
  const res = await fetch('/api/search?q=' + query)
  results.value = await res.json()
}, {
  debounce: 300,    // تأخير
  immediate: false  // لا تنفذ فوراً
})

// مراقبة عدة قيم
watch([searchQuery, count], ([newQuery, newCount]) => {
  console.log('تغير:', newQuery, newCount)
})

// مراقبة عميقة للكائنات
const user = ref({ name: '', settings: { theme: 'dark' } })
watch(user, (newUser) => {
  console.log('تغير المستخدم:', newUser)
}, { deep: true })

// watchEffect - يتتبع تلقائياً
watchEffect(() => {
  console.log('القيمة الحالية:', searchQuery.value)
  document.title = searchQuery.value || 'الرئيسية'
})

// دورة الحياة
onMounted(() => {
  console.log('تم تحميل المكون')
  fetchInitialData()
})

onUpdated(() => {
  console.log('تم تحديث المكون')
})

onUnmounted(() => {
  console.log('تم إزالة المكون')
  // تنظيف المؤقتات والمستمعين
})
</script>`,
      },
      {
        title: "الانتقالات والحركات",
        content: `<!-- انتقالات Vue المدمجة -->
<template>
  <button @click="show = !show">تبديل</button>

  <!-- انتقال عنصر واحد -->
  <Transition name="fade">
    <div v-if="show" class="box">محتوى متحرك</div>
  </Transition>

  <!-- انتقال مع JavaScript hooks -->
  <Transition
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @leave="onLeave"
  >
    <div v-if="show">محتوى</div>
  </Transition>

  <!-- انتقال قائمة -->
  <TransitionGroup name="list" tag="ul">
    <li v-for="item in items" :key="item.id">
      {{ item.text }}
    </li>
  </TransitionGroup>
</template>

<script setup>
import { ref } from 'vue'
const show = ref(true)

function onBeforeEnter(el) {
  el.style.opacity = 0
  el.style.transform = 'translateY(20px)'
}

function onEnter(el, done) {
  el.offsetHeight // trigger reflow
  el.style.transition = 'all 0.5s ease'
  el.style.opacity = 1
  el.style.transform = 'translateY(0)'
  el.addEventListener('transitionend', done)
}

function onLeave(el, done) {
  el.style.transition = 'all 0.3s ease'
  el.style.opacity = 0
  el.style.transform = 'translateY(-20px)'
  el.addEventListener('transitionend', done)
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.list-enter-active, .list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-move {
  transition: transform 0.5s ease;
}
</style>`,
      },
    ],
  },
  {
    id: "angular",
    title: "Angular",
    icon: "Atom",
    color: "text-red-500",
    topics: [
      {
        title: "إنشاء مشروع Angular",
        content: `// تثبيت Angular CLI
// npm install -g @angular/cli
// ng new my-app --routing --style=scss
// cd my-app && ng serve

// هيكل المشروع:
// src/
//   app/
//     app.component.ts    - المكون الرئيسي
//     app.module.ts       - الوحدة الرئيسية
//     app-routing.module.ts - التوجيه
//   assets/               - ملفات ثابتة
//   environments/         - إعدادات البيئة

// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }`,
      },
      {
        title: "المكونات (Components)",
        content: `// إنشاء مكون: ng generate component user-card

// user-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-card',
  template: \`
    <div class="card" [class.active]="isActive">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
      <p>العمر: {{ user.age }}</p>
      <button (click)="onSelect()">اختيار</button>
      <button (click)="toggleActive()">
        {{ isActive ? 'نشط' : 'غير نشط' }}
      </button>
    </div>
  \`,
  styles: [\`
    .card { padding: 16px; border: 1px solid #ccc; border-radius: 8px; }
    .active { border-color: #4CAF50; background: #f0fff0; }
  \`]
})
export class UserCardComponent {
  @Input() user: { name: string; email: string; age: number } = {
    name: '', email: '', age: 0
  };
  @Output() selected = new EventEmitter<string>();

  isActive = false;

  onSelect() {
    this.selected.emit(this.user.name);
  }

  toggleActive() {
    this.isActive = !this.isActive;
  }
}

// الاستخدام في القالب الأب:
// <app-user-card
//   [user]="currentUser"
//   (selected)="handleSelect($event)">
// </app-user-card>`,
      },
      {
        title: "الخدمات (Services)",
        content: `// إنشاء خدمة: ng generate service services/api

// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'https://api.example.com';

  constructor(private http: HttpClient) {}

  // جلب جميع المستخدمين
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/users').pipe(
      catchError(error => {
        console.error('خطأ:', error);
        return of([]);
      })
    );
  }

  // جلب مستخدم واحد
  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/users/' + id);
  }

  // إضافة مستخدم
  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.baseUrl + '/users', user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // تحديث مستخدم
  updateUser(id: number, data: Partial<User>): Observable<User> {
    return this.http.put<User>(this.baseUrl + '/users/' + id, data);
  }

  // حذف مستخدم
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/users/' + id);
  }
}

// الاستخدام في مكون:
// constructor(private apiService: ApiService) {}
// ngOnInit() {
//   this.apiService.getUsers().subscribe(users => {
//     this.users = users;
//   });
// }`,
      },
      {
        title: "التوجيه (Routing)",
        content: `// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'user/:id',
    component: UserComponent,
    // حماية المسار
    canActivate: [AuthGuard]
  },
  {
    // التحميل الكسول
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      { path: ':id', component: ProductDetailComponent },
      { path: ':id/reviews', component: ReviewsComponent }
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}`,
      },
      {
        title: "النماذج التفاعلية (Reactive Forms)",
        content: `// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  template: \`
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <div>
        <label>البريد الإلكتروني</label>
        <input formControlName="email" type="email" />
        <span *ngIf="loginForm.get('email')?.errors?.['required']
              && loginForm.get('email')?.touched">
          البريد مطلوب
        </span>
        <span *ngIf="loginForm.get('email')?.errors?.['email']">
          صيغة غير صحيحة
        </span>
      </div>

      <div>
        <label>كلمة المرور</label>
        <input formControlName="password" type="password" />
        <span *ngIf="loginForm.get('password')?.errors?.['minlength']">
          كلمة المرور يجب أن تكون 8 أحرف على الأقل
        </span>
      </div>

      <button [disabled]="loginForm.invalid" type="submit">
        تسجيل الدخول
      </button>
    </form>
  \`
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('بيانات النموذج:', this.loginForm.value);
    }
  }
}`,
      },
      {
        title: "Pipes (المرشحات)",
        content: `// الـ Pipes المدمجة
// {{ value | pipe:arg1:arg2 }}

// أمثلة:
// {{ 'مرحبا' | uppercase }}         => 'مرحبا' (لا يؤثر على العربية)
// {{ 1234.5 | number:'1.2-2' }}     => 1,234.50
// {{ 0.75 | percent }}              => 75%
// {{ 1500 | currency:'SAR' }}       => SAR 1,500.00
// {{ today | date:'fullDate' }}     => الجمعة، 7 مارس 2026
// {{ today | date:'yyyy/MM/dd' }}   => 2026/03/07
// {{ obj | json }}                  => عرض ككائن JSON
// {{ items | slice:0:5 }}           => أول 5 عناصر
// {{ text | titlecase }}            => كل كلمة تبدأ بحرف كبير

// إنشاء Pipe مخصص: ng generate pipe pipes/time-ago

// time-ago.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timeAgo' })
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string): string {
    const date = new Date(value);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'الآن';
    if (seconds < 3600) return Math.floor(seconds / 60) + ' دقيقة';
    if (seconds < 86400) return Math.floor(seconds / 3600) + ' ساعة';
    if (seconds < 2592000) return Math.floor(seconds / 86400) + ' يوم';
    return Math.floor(seconds / 2592000) + ' شهر';
  }
}

// الاستخدام: {{ createdAt | timeAgo }}`,
      },
      {
        title: "RxJS والبرمجة التفاعلية",
        content: `import { Observable, Subject, BehaviorSubject, of, from, interval } from 'rxjs';
import {
  map, filter, switchMap, debounceTime, distinctUntilChanged,
  catchError, takeUntil, tap, mergeMap, retry
} from 'rxjs/operators';

// مثال: بحث تفاعلي مع debounce
export class SearchComponent {
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();
  results: any[] = [];

  constructor(private http: HttpClient) {
    this.searchSubject.pipe(
      debounceTime(300),          // انتظر 300ms بعد التوقف
      distinctUntilChanged(),     // تجاهل القيم المتكررة
      filter(q => q.length >= 2), // حد أدنى حرفين
      switchMap(query =>          // إلغاء الطلب السابق
        this.http.get('/api/search?q=' + query).pipe(
          catchError(() => of([]))  // معالجة الأخطاء
        )
      ),
      takeUntil(this.destroy$)    // إلغاء عند التدمير
    ).subscribe(results => {
      this.results = results;
    });
  }

  onSearch(query: string) {
    this.searchSubject.next(query);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

// BehaviorSubject - مخزن بسيط
export class StateService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  setUser(user: User) {
    this.userSubject.next(user);
  }

  getUser(): User | null {
    return this.userSubject.getValue();
  }
}`,
      },
    ],
  },
  {
    id: "mongodb",
    title: "MongoDB",
    icon: "Database",
    color: "text-green-600",
    topics: [
      {
        title: "أساسيات MongoDB",
        content: `// MongoDB - قاعدة بيانات NoSQL تعتمد على المستندات (Documents)
// التثبيت: npm install mongodb mongoose

// الاتصال بقاعدة البيانات
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connect() {
  await client.connect();
  console.log('تم الاتصال بقاعدة البيانات');
  const db = client.db('myDatabase');
  return db;
}

// العمليات الأساسية (CRUD)

// إضافة مستند واحد
const result = await db.collection('users').insertOne({
  name: 'أحمد',
  email: 'ahmed@example.com',
  age: 25,
  createdAt: new Date()
});

// إضافة عدة مستندات
await db.collection('users').insertMany([
  { name: 'سارة', age: 30 },
  { name: 'محمد', age: 22 },
  { name: 'فاطمة', age: 28 }
]);

// القراءة
const user = await db.collection('users').findOne({ name: 'أحمد' });
const allUsers = await db.collection('users').find({}).toArray();
const adults = await db.collection('users').find({ age: { $gte: 18 } }).toArray();`,
      },
      {
        title: "الاستعلامات المتقدمة",
        content: `// عوامل المقارنة
db.collection('products').find({
  price: { $gt: 100 },     // أكبر من
  stock: { $gte: 10 },     // أكبر من أو يساوي
  discount: { $lt: 50 },   // أقل من
  rating: { $lte: 5 },     // أقل من أو يساوي
  status: { $ne: 'deleted' }, // لا يساوي
  category: { $in: ['electronics', 'books'] }, // ضمن القائمة
  tags: { $nin: ['sale'] }  // ليس ضمن القائمة
});

// عوامل منطقية
db.collection('users').find({
  $and: [
    { age: { $gte: 18 } },
    { age: { $lte: 65 } }
  ]
});

db.collection('products').find({
  $or: [
    { category: 'electronics' },
    { price: { $lt: 50 } }
  ]
});

// البحث في النصوص
db.collection('articles').createIndex({ title: 'text', content: 'text' });
db.collection('articles').find({ $text: { $search: 'جافاسكريبت' } });

// الفرز والتحديد والتخطي
const results = await db.collection('products')
  .find({ category: 'electronics' })
  .sort({ price: -1 })   // ترتيب تنازلي
  .skip(10)               // تخطي 10 نتائج
  .limit(5)               // عرض 5 فقط
  .project({ name: 1, price: 1, _id: 0 }) // الحقول المطلوبة
  .toArray();

// التحديث
await db.collection('users').updateOne(
  { _id: userId },
  {
    $set: { name: 'اسم جديد' },
    $inc: { loginCount: 1 },
    $push: { tags: 'premium' },
    $currentDate: { updatedAt: true }
  }
);

// الحذف
await db.collection('users').deleteOne({ _id: userId });
await db.collection('logs').deleteMany({ date: { $lt: new Date('2024-01-01') } });`,
      },
      {
        title: "Mongoose (ORM)",
        content: `// تعريف Schema و Model مع Mongoose
const mongoose = require('mongoose');

// الاتصال
mongoose.connect('mongodb://localhost:27017/myapp');

// تعريف المخطط
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'الاسم مطلوب'],
    trim: true,
    minlength: [2, 'الاسم قصير جداً'],
    maxlength: [50, 'الاسم طويل جداً']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\\S+@\\S+\\.\\S+$/, 'بريد إلكتروني غير صالح']
  },
  password: { type: String, required: true, select: false },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  age: { type: Number, min: 13, max: 120 },
  isActive: { type: Boolean, default: true },
  tags: [String],
  profile: {
    bio: String,
    avatar: String,
    social: {
      twitter: String,
      github: String
    }
  }
}, {
  timestamps: true,  // createdAt, updatedAt
  toJSON: { virtuals: true }
});

// حقل افتراضي
userSchema.virtual('displayName').get(function() {
  return this.name + ' (' + this.role + ')';
});

// Middleware
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// طرق مخصصة
userSchema.methods.comparePassword = async function(candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

const User = mongoose.model('User', userSchema);

// الاستخدام
const user = await User.create({ name: 'أحمد', email: 'a@b.com', password: '123456' });
const users = await User.find({ isActive: true }).sort('-createdAt').limit(10);
await User.findByIdAndUpdate(id, { name: 'اسم جديد' }, { new: true });`,
      },
      {
        title: "التجميع (Aggregation Pipeline)",
        content: `// Aggregation - عمليات متقدمة على البيانات
const results = await db.collection('orders').aggregate([
  // المرحلة 1: التصفية
  { $match: {
    status: 'completed',
    createdAt: { $gte: new Date('2024-01-01') }
  }},

  // المرحلة 2: الربط مع جدول آخر
  { $lookup: {
    from: 'users',
    localField: 'userId',
    foreignField: '_id',
    as: 'user'
  }},

  // المرحلة 3: فك المصفوفة
  { $unwind: '$user' },

  // المرحلة 4: التجميع
  { $group: {
    _id: '$user.name',
    totalOrders: { $sum: 1 },
    totalSpent: { $sum: '$total' },
    avgOrder: { $avg: '$total' },
    maxOrder: { $max: '$total' },
    products: { $push: '$productName' }
  }},

  // المرحلة 5: إضافة حقول محسوبة
  { $addFields: {
    avgFormatted: { $round: ['$avgOrder', 2] },
    isVIP: { $gte: ['$totalSpent', 1000] }
  }},

  // المرحلة 6: الفرز
  { $sort: { totalSpent: -1 } },

  // المرحلة 7: التحديد
  { $limit: 10 },

  // المرحلة 8: إعادة تشكيل النتيجة
  { $project: {
    customerName: '$_id',
    totalOrders: 1,
    totalSpent: 1,
    avgFormatted: 1,
    isVIP: 1,
    _id: 0
  }}
]).toArray();

// مثال: إحصائيات يومية
const dailyStats = await db.collection('visits').aggregate([
  { $group: {
    _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
    visitors: { $addToSet: '$userId' },
    pageViews: { $sum: 1 }
  }},
  { $addFields: { uniqueVisitors: { $size: '$visitors' } } },
  { $sort: { _id: -1 } }
]).toArray();`,
      },
      {
        title: "الفهارس والأداء",
        content: `// الفهارس - تسريع الاستعلامات
// فهرس بسيط
db.collection('users').createIndex({ email: 1 });  // تصاعدي
db.collection('users').createIndex({ age: -1 });    // تنازلي

// فهرس فريد
db.collection('users').createIndex(
  { email: 1 },
  { unique: true }
);

// فهرس مركب
db.collection('orders').createIndex(
  { userId: 1, createdAt: -1 }
);

// فهرس نصي للبحث
db.collection('articles').createIndex(
  { title: 'text', content: 'text' },
  { weights: { title: 10, content: 5 }, default_language: 'arabic' }
);

// فهرس TTL - حذف تلقائي
db.collection('sessions').createIndex(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }  // يحذف عندما يصل التاريخ
);

// فهرس جزئي
db.collection('users').createIndex(
  { email: 1 },
  { partialFilterExpression: { isActive: true } }
);

// تحليل أداء الاستعلام
const explain = await db.collection('users')
  .find({ age: { $gt: 25 } })
  .explain('executionStats');

console.log('مدة التنفيذ:', explain.executionStats.executionTimeMillis, 'ms');
console.log('المستندات الممسوحة:', explain.executionStats.totalDocsExamined);
console.log('استخدم فهرس:', explain.executionStats.executionStages.stage);

// عرض جميع الفهارس
const indexes = await db.collection('users').indexes();
console.log(indexes);`,
      },
      {
        title: "العلاقات والمراجع",
        content: `// طريقة 1: التضمين (Embedding) - للبيانات المرتبطة بقوة
const orderSchema = new mongoose.Schema({
  orderNumber: String,
  customer: {
    name: String,
    email: String,
    address: {
      street: String,
      city: String,
      country: String
    }
  },
  items: [{
    productName: String,
    quantity: Number,
    price: Number
  }],
  total: Number
});

// طريقة 2: المراجع (References) - للبيانات المستقلة
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }]
});

// جلب مع populate
const post = await Post.findById(postId)
  .populate('author', 'name email avatar')  // اسم وبريد فقط
  .populate({
    path: 'comments',
    populate: { path: 'user', select: 'name' }, // populate متداخل
    options: { sort: { createdAt: -1 }, limit: 10 }
  })
  .populate('tags', 'name color');

// متى تستخدم التضمين ومتى المراجع؟
// التضمين: بيانات لا تتغير كثيراً، تُقرأ مع الأب دائماً
// المراجع: بيانات مستقلة، تتغير باستمرار، تُستخدم في أماكن متعددة`,
      },
    ],
  },
  {
    id: "redis",
    title: "Redis",
    icon: "Database",
    color: "text-red-600",
    topics: [
      {
        title: "أساسيات Redis",
        content: `// Redis - قاعدة بيانات في الذاكرة (In-Memory)
// سريعة جداً - تُستخدم للتخزين المؤقت والجلسات وقوائم الانتظار
// التثبيت: npm install redis ioredis

// الاتصال بـ Redis
const Redis = require('ioredis');
const redis = new Redis({
  host: 'localhost',
  port: 6379,
  password: 'your-password',  // اختياري
  db: 0                        // رقم قاعدة البيانات
});

// === أنواع البيانات الأساسية ===

// 1. النصوص (Strings)
await redis.set('name', 'أحمد');
await redis.set('counter', 0);
const name = await redis.get('name');    // 'أحمد'
await redis.incr('counter');              // 1
await redis.incrby('counter', 5);         // 6
await redis.decr('counter');              // 5

// مع انتهاء الصلاحية
await redis.set('token', 'abc123', 'EX', 3600);  // ينتهي بعد ساعة
await redis.setex('session', 1800, 'data');       // ينتهي بعد 30 دقيقة

// التحقق من الوجود
const exists = await redis.exists('name');  // 1 (موجود) أو 0
const ttl = await redis.ttl('token');       // الوقت المتبقي بالثواني

// حذف
await redis.del('name');
await redis.del('key1', 'key2', 'key3');  // حذف متعدد`,
      },
      {
        title: "هياكل البيانات المتقدمة",
        content: `// 2. القوائم (Lists) - مرتبة، تسمح بالتكرار
await redis.lpush('tasks', 'مهمة 1', 'مهمة 2');  // إضافة من اليسار
await redis.rpush('tasks', 'مهمة 3');              // إضافة من اليمين
const tasks = await redis.lrange('tasks', 0, -1);  // جلب الكل
await redis.lpop('tasks');   // إزالة من اليسار
await redis.rpop('tasks');   // إزالة من اليمين
const len = await redis.llen('tasks');  // طول القائمة

// 3. المجموعات (Sets) - فريدة، غير مرتبة
await redis.sadd('tags', 'javascript', 'python', 'rust');
await redis.sadd('tags', 'javascript');  // لن يُضاف (موجود)
const tags = await redis.smembers('tags');  // كل العناصر
const isMember = await redis.sismember('tags', 'python');  // 1
await redis.srem('tags', 'rust');  // حذف عنصر

// عمليات المجموعات
await redis.sadd('set1', 'a', 'b', 'c');
await redis.sadd('set2', 'b', 'c', 'd');
const union = await redis.sunion('set1', 'set2');       // a,b,c,d
const inter = await redis.sinter('set1', 'set2');       // b,c
const diff = await redis.sdiff('set1', 'set2');          // a

// 4. المجموعات المرتبة (Sorted Sets)
await redis.zadd('leaderboard', 100, 'player1');
await redis.zadd('leaderboard', 250, 'player2');
await redis.zadd('leaderboard', 180, 'player3');
const top = await redis.zrevrange('leaderboard', 0, 2, 'WITHSCORES');
await redis.zincrby('leaderboard', 10, 'player1');  // زيادة النقاط

// 5. الهاش (Hashes) - كائنات
await redis.hset('user:1', 'name', 'أحمد', 'age', '25', 'email', 'a@b.com');
const userName = await redis.hget('user:1', 'name');
const user = await redis.hgetall('user:1');  // كل الحقول
await redis.hincrby('user:1', 'age', 1);    // زيادة العمر`,
      },
      {
        title: "التخزين المؤقت (Caching)",
        content: `// نمط Cache-Aside الشائع
async function getUser(userId) {
  const cacheKey = 'user:' + userId;

  // 1. تحقق من الكاش أولاً
  const cached = await redis.get(cacheKey);
  if (cached) {
    console.log('من الكاش');
    return JSON.parse(cached);
  }

  // 2. إذا غير موجود، اجلب من قاعدة البيانات
  const user = await db.collection('users').findOne({ _id: userId });

  // 3. خزّن في الكاش
  if (user) {
    await redis.setex(cacheKey, 3600, JSON.stringify(user));  // ساعة
  }

  return user;
}

// إبطال الكاش عند التحديث
async function updateUser(userId, data) {
  await db.collection('users').updateOne({ _id: userId }, { $set: data });
  await redis.del('user:' + userId);  // حذف الكاش القديم
}

// نمط Write-Through
async function createProduct(product) {
  const result = await db.collection('products').insertOne(product);
  // خزّن فوراً في الكاش
  await redis.setex(
    'product:' + result.insertedId,
    7200,
    JSON.stringify(product)
  );
  // أبطل كاش القائمة
  await redis.del('products:list');
  return result;
}

// كاش لنتائج API
const express = require('express');
const app = express();

function cacheMiddleware(duration) {
  return async (req, res, next) => {
    const key = 'api:' + req.originalUrl;
    const cached = await redis.get(key);
    if (cached) {
      return res.json(JSON.parse(cached));
    }
    // احفظ الدالة الأصلية
    const originalJson = res.json.bind(res);
    res.json = async (data) => {
      await redis.setex(key, duration, JSON.stringify(data));
      return originalJson(data);
    };
    next();
  };
}

app.get('/api/products', cacheMiddleware(300), async (req, res) => {
  const products = await db.collection('products').find().toArray();
  res.json(products);
});`,
      },
      {
        title: "الجلسات وتحديد المعدل",
        content: `// إدارة الجلسات مع Redis
const session = require('express-session');
const RedisStore = require('connect-redis').default;

app.use(session({
  store: new RedisStore({ client: redis }),
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000  // يوم واحد
  }
}));

// تحديد المعدل (Rate Limiting)
async function rateLimiter(req, res, next) {
  const ip = req.ip;
  const key = 'ratelimit:' + ip;
  const limit = 100;       // 100 طلب
  const window = 60;       // في 60 ثانية

  const current = await redis.incr(key);

  if (current === 1) {
    await redis.expire(key, window);
  }

  if (current > limit) {
    return res.status(429).json({
      error: 'تجاوزت الحد المسموح. حاول بعد قليل',
      retryAfter: await redis.ttl(key)
    });
  }

  res.setHeader('X-RateLimit-Limit', limit);
  res.setHeader('X-RateLimit-Remaining', Math.max(0, limit - current));
  next();
}

app.use('/api/', rateLimiter);

// نظام تحديد معدل متقدم (Sliding Window)
async function slidingWindowLimiter(userId, action, limit, windowSec) {
  const key = 'limit:' + action + ':' + userId;
  const now = Date.now();
  const windowStart = now - (windowSec * 1000);

  // أزل الطلبات القديمة
  await redis.zremrangebyscore(key, 0, windowStart);
  // عدّ الطلبات الحالية
  const count = await redis.zcard(key);

  if (count >= limit) return false;

  // أضف الطلب الجديد
  await redis.zadd(key, now, now.toString());
  await redis.expire(key, windowSec);
  return true;
}`,
      },
      {
        title: "Pub/Sub والإشعارات الفورية",
        content: `// Pub/Sub - نظام النشر والاشتراك
// مفيد للإشعارات الفورية والتواصل بين الخدمات

// الناشر (Publisher)
const publisher = new Redis();

async function publishNotification(channel, message) {
  await publisher.publish(channel, JSON.stringify(message));
}

// أمثلة على النشر
publishNotification('notifications', {
  type: 'new_message',
  userId: 'user123',
  content: 'لديك رسالة جديدة'
});

publishNotification('orders', {
  type: 'order_placed',
  orderId: 'ORD-001',
  total: 150.00
});

// المشترك (Subscriber)
const subscriber = new Redis();

subscriber.subscribe('notifications', 'orders');

subscriber.on('message', (channel, message) => {
  const data = JSON.parse(message);
  console.log('قناة:', channel);
  console.log('رسالة:', data);

  switch (channel) {
    case 'notifications':
      sendPushNotification(data);
      break;
    case 'orders':
      processOrder(data);
      break;
  }
});

// Pattern Subscribe - الاشتراك بنمط
subscriber.psubscribe('user:*:events');

subscriber.on('pmessage', (pattern, channel, message) => {
  // channel مثلاً: user:123:events
  const userId = channel.split(':')[1];
  console.log('حدث للمستخدم', userId, ':', message);
});

// استخدام مع WebSocket
const io = require('socket.io')(server);

subscriber.subscribe('chat');
subscriber.on('message', (channel, message) => {
  if (channel === 'chat') {
    io.emit('new_message', JSON.parse(message));
  }
});`,
      },
      {
        title: "قوائم الانتظار (Job Queues)",
        content: `// قوائم الانتظار مع Bull (مبني على Redis)
// npm install bull

const Queue = require('bull');

// إنشاء قائمة
const emailQueue = new Queue('email', {
  redis: { host: 'localhost', port: 6379 }
});

// إضافة مهمة
await emailQueue.add('send-welcome', {
  to: 'user@example.com',
  subject: 'مرحباً بك',
  template: 'welcome'
}, {
  attempts: 3,           // محاولات إعادة
  backoff: {
    type: 'exponential',
    delay: 2000           // تأخير متزايد
  },
  priority: 1,           // أولوية عالية
  delay: 5000,           // تأخير 5 ثوان
  removeOnComplete: true
});

// إضافة مهمة متكررة
await emailQueue.add('daily-report', { type: 'daily' }, {
  repeat: { cron: '0 9 * * *' }  // كل يوم الساعة 9
});

// معالجة المهام
emailQueue.process('send-welcome', async (job) => {
  console.log('إرسال بريد إلى:', job.data.to);
  await sendEmail(job.data);
  return { sent: true };
});

// أحداث القائمة
emailQueue.on('completed', (job, result) => {
  console.log('تم إكمال المهمة:', job.id);
});

emailQueue.on('failed', (job, err) => {
  console.error('فشلت المهمة:', job.id, err.message);
});

// لوحة تحكم المهام
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');

const serverAdapter = new ExpressAdapter();
createBullBoard({
  queues: [new BullAdapter(emailQueue)],
  serverAdapter
});
app.use('/admin/queues', serverAdapter.getRouter());`,
      },
    ],
  },
  {
    id: "design-patterns",
    title: "أنماط التصميم (Design Patterns)",
    icon: "Workflow",
    color: "text-violet-500",
    topics: [
      {
        title: "Singleton Pattern",
        content: `// نمط المفرد - كائن واحد فقط في التطبيق بالكامل
// يُستخدم لـ: إعدادات التطبيق، اتصال قاعدة البيانات، Logger

// JavaScript
class Database {
  static instance = null;

  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.connection = null;
    Database.instance = this;
  }

  async connect(uri) {
    if (!this.connection) {
      this.connection = await createConnection(uri);
      console.log('تم الاتصال بقاعدة البيانات');
    }
    return this.connection;
  }

  getConnection() {
    if (!this.connection) {
      throw new Error('لم يتم الاتصال بعد');
    }
    return this.connection;
  }
}

// الاستخدام - نفس الكائن دائماً
const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2);  // true

// TypeScript مع أمان أكثر
class AppConfig {
  private static instance: AppConfig;
  private settings: Map<string, any> = new Map();

  private constructor() {}  // منع الإنشاء الخارجي

  static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }

  set(key: string, value: any) {
    this.settings.set(key, value);
  }

  get(key: string) {
    return this.settings.get(key);
  }
}

const config = AppConfig.getInstance();
config.set('theme', 'dark');`,
      },
      {
        title: "Observer Pattern",
        content: `// نمط المراقب - إشعار عدة مستمعين عند حدوث تغيير
// يُستخدم لـ: أحداث UI، الإشعارات، تحديثات البيانات

class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  // الاشتراك في حدث
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    // إرجاع دالة إلغاء الاشتراك
    return () => this.off(event, callback);
  }

  // إلغاء الاشتراك
  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event]
        .filter(cb => cb !== callback);
    }
  }

  // الاشتراك مرة واحدة فقط
  once(event, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }

  // إطلاق الحدث
  emit(event, ...args) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(...args));
    }
  }
}

// مثال عملي: نظام إشعارات
const notifications = new EventEmitter();

// مشتركون
notifications.on('new_order', (order) => {
  console.log('إرسال بريد للعميل:', order.email);
});

notifications.on('new_order', (order) => {
  console.log('تحديث المخزون:', order.productId);
});

notifications.on('new_order', (order) => {
  console.log('إرسال إشعار للإدارة');
});

// إطلاق الحدث
notifications.emit('new_order', {
  id: 'ORD-001',
  email: 'user@example.com',
  productId: 'P-100',
  total: 250
});`,
      },
      {
        title: "Factory Pattern",
        content: `// نمط المصنع - إنشاء كائنات بدون تحديد الكلاس مباشرة
// يُستخدم لـ: إنشاء كائنات مختلفة بناءً على شروط

// مصنع بسيط
class NotificationFactory {
  static create(type, message) {
    switch (type) {
      case 'email':
        return new EmailNotification(message);
      case 'sms':
        return new SMSNotification(message);
      case 'push':
        return new PushNotification(message);
      default:
        throw new Error('نوع إشعار غير معروف: ' + type);
    }
  }
}

class EmailNotification {
  constructor(message) {
    this.message = message;
    this.type = 'email';
  }
  send(to) {
    console.log('إرسال بريد إلى ' + to + ': ' + this.message);
  }
}

class SMSNotification {
  constructor(message) {
    this.message = message;
    this.type = 'sms';
  }
  send(to) {
    console.log('إرسال رسالة نصية إلى ' + to + ': ' + this.message);
  }
}

class PushNotification {
  constructor(message) {
    this.message = message;
    this.type = 'push';
  }
  send(to) {
    console.log('إرسال إشعار فوري إلى ' + to + ': ' + this.message);
  }
}

// الاستخدام
const notification = NotificationFactory.create('email', 'مرحباً بك!');
notification.send('user@example.com');

// مصنع مع تسجيل ديناميكي
class PaymentFactory {
  static providers = new Map();

  static register(name, ProviderClass) {
    this.providers.set(name, ProviderClass);
  }

  static create(name, config) {
    const Provider = this.providers.get(name);
    if (!Provider) throw new Error('مزود دفع غير مسجل: ' + name);
    return new Provider(config);
  }
}

// تسجيل مزودي الدفع
PaymentFactory.register('stripe', StripePayment);
PaymentFactory.register('paypal', PayPalPayment);

// إنشاء
const payment = PaymentFactory.create('stripe', { key: 'sk_...' });`,
      },
      {
        title: "Strategy Pattern",
        content: `// نمط الاستراتيجية - تبديل الخوارزميات في وقت التشغيل
// يُستخدم لـ: طرق الدفع، خوارزميات الفرز، التحقق

// تعريف الاستراتيجيات
const sortStrategies = {
  bubble: (arr) => {
    const result = [...arr];
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result.length - i - 1; j++) {
        if (result[j] > result[j + 1]) {
          [result[j], result[j + 1]] = [result[j + 1], result[j]];
        }
      }
    }
    return result;
  },
  quick: (arr) => {
    if (arr.length <= 1) return arr;
    const pivot = arr[0];
    const left = arr.slice(1).filter(x => x <= pivot);
    const right = arr.slice(1).filter(x => x > pivot);
    return [...sortStrategies.quick(left), pivot, ...sortStrategies.quick(right)];
  },
  merge: (arr) => {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = sortStrategies.merge(arr.slice(0, mid));
    const right = sortStrategies.merge(arr.slice(mid));
    return mergeSorted(left, right);
  }
};

// سياق الاستخدام
class Sorter {
  constructor(strategy = 'quick') {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  sort(data) {
    console.log('الفرز بـ:', this.strategy);
    return sortStrategies[this.strategy](data);
  }
}

// مثال عملي: التحقق من البيانات
const validators = {
  email: (value) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value),
  phone: (value) => /^\\+?[0-9]{10,15}$/.test(value),
  url: (value) => {
    try { new URL(value); return true; } catch { return false; }
  },
  password: (value) => value.length >= 8 && /[A-Z]/.test(value) && /[0-9]/.test(value)
};

function validate(value, type) {
  const validator = validators[type];
  if (!validator) throw new Error('نوع تحقق غير معروف');
  return validator(value);
}

console.log(validate('test@email.com', 'email'));  // true
console.log(validate('MyPass123', 'password'));    // true`,
      },
      {
        title: "Middleware Pattern",
        content: `// نمط الوسيط - سلسلة من العمليات تمر عبرها البيانات
// يُستخدم في: Express.js، Redux، معالجة الطلبات

// تطبيق بسيط للـ Middleware
class Pipeline {
  constructor() {
    this.middlewares = [];
  }

  use(fn) {
    this.middlewares.push(fn);
    return this;  // للتسلسل
  }

  async execute(context) {
    let index = 0;

    const next = async () => {
      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index++];
        await middleware(context, next);
      }
    };

    await next();
    return context;
  }
}

// مثال: معالجة طلب HTTP
const pipeline = new Pipeline();

// 1. تسجيل الطلب
pipeline.use(async (ctx, next) => {
  console.log('بداية:', ctx.method, ctx.url);
  const start = Date.now();
  await next();
  console.log('المدة:', Date.now() - start, 'ms');
});

// 2. التحقق من المصادقة
pipeline.use(async (ctx, next) => {
  const token = ctx.headers.authorization;
  if (!token) {
    ctx.status = 401;
    ctx.body = { error: 'غير مصرح' };
    return;  // لا تكمل
  }
  ctx.user = verifyToken(token);
  await next();
});

// 3. التحقق من الصلاحيات
pipeline.use(async (ctx, next) => {
  if (ctx.user.role !== 'admin') {
    ctx.status = 403;
    ctx.body = { error: 'لا تملك الصلاحية' };
    return;
  }
  await next();
});

// 4. المعالجة
pipeline.use(async (ctx, next) => {
  ctx.body = { data: 'نتيجة العملية' };
  ctx.status = 200;
});

// التنفيذ
const result = await pipeline.execute({
  method: 'GET',
  url: '/api/admin/users',
  headers: { authorization: 'Bearer token123' }
});`,
      },
      {
        title: "Decorator Pattern",
        content: `// نمط المزخرف - إضافة سلوك جديد لكائن بدون تعديله
// يُستخدم لـ: التسجيل، التخزين المؤقت، التحقق

// دوال مزخرفة
function withLogging(fn) {
  return function(...args) {
    console.log('استدعاء:', fn.name, 'بالمعاملات:', args);
    const result = fn.apply(this, args);
    console.log('النتيجة:', result);
    return result;
  };
}

function withCache(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log('من الكاش');
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

function withRetry(fn, maxRetries = 3) {
  return async function(...args) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn.apply(this, args);
      } catch (error) {
        console.log('محاولة', i + 1, 'فشلت:', error.message);
        if (i === maxRetries - 1) throw error;
        await new Promise(r => setTimeout(r, 1000 * (i + 1)));
      }
    }
  };
}

// الاستخدام
function calculatePrice(quantity, unitPrice) {
  return quantity * unitPrice;
}

const loggedCalculate = withLogging(calculatePrice);
const cachedCalculate = withCache(calculatePrice);

loggedCalculate(5, 100);
// استدعاء: calculatePrice بالمعاملات: [5, 100]
// النتيجة: 500

// مع async
const fetchData = withRetry(async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('فشل الطلب');
  return res.json();
}, 3);

// TypeScript Decorators (تجريبي)
function Log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log('استدعاء ' + key);
    return original.apply(this, args);
  };
}

class UserService {
  @Log
  getUser(id: string) {
    return { id, name: 'أحمد' };
  }
}`,
      },
      {
        title: "Repository Pattern",
        content: `// نمط المستودع - فصل منطق الوصول للبيانات عن منطق الأعمال
// يُستخدم لـ: تنظيم الكود، سهولة الاختبار، تبديل قاعدة البيانات

// واجهة المستودع
class BaseRepository {
  async findAll(filters = {}) { throw new Error('يجب تنفيذها'); }
  async findById(id) { throw new Error('يجب تنفيذها'); }
  async create(data) { throw new Error('يجب تنفيذها'); }
  async update(id, data) { throw new Error('يجب تنفيذها'); }
  async delete(id) { throw new Error('يجب تنفيذها'); }
}

// تنفيذ MongoDB
class MongoUserRepository extends BaseRepository {
  constructor(db) {
    super();
    this.collection = db.collection('users');
  }

  async findAll(filters = {}) {
    return this.collection.find(filters).toArray();
  }

  async findById(id) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async findByEmail(email) {
    return this.collection.findOne({ email });
  }

  async create(data) {
    const result = await this.collection.insertOne({
      ...data,
      createdAt: new Date()
    });
    return { id: result.insertedId, ...data };
  }

  async update(id, data) {
    await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...data, updatedAt: new Date() } }
    );
    return this.findById(id);
  }

  async delete(id) {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
  }
}

// خدمة الأعمال - لا تعرف نوع قاعدة البيانات
class UserService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async registerUser(data) {
    // منطق الأعمال
    const existing = await this.userRepo.findByEmail(data.email);
    if (existing) throw new Error('البريد مسجل مسبقاً');

    data.password = await hashPassword(data.password);
    return this.userRepo.create(data);
  }

  async getUserProfile(id) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new Error('المستخدم غير موجود');
    delete user.password;
    return user;
  }
}

// الاستخدام
const userRepo = new MongoUserRepository(db);
const userService = new UserService(userRepo);
const user = await userService.registerUser({
  name: 'أحمد', email: 'a@b.com', password: '123456'
});`,
      },
      {
        title: "Module Pattern و SOLID",
        content: `// نمط الوحدة - تنظيم الكود في وحدات مستقلة
// مبادئ SOLID في JavaScript

// S - مبدأ المسؤولية الواحدة
// كل كلاس يقوم بمهمة واحدة فقط

// خطأ: كلاس يفعل كل شيء
class BadUserManager {
  createUser() { /* ... */ }
  sendEmail() { /* ... */ }
  generateReport() { /* ... */ }
  validateData() { /* ... */ }
}

// صحيح: كل كلاس مسؤول عن شيء واحد
class UserService { createUser() { /* ... */ } }
class EmailService { sendEmail() { /* ... */ } }
class ReportService { generateReport() { /* ... */ } }
class ValidationService { validateData() { /* ... */ } }

// O - مبدأ الفتح/الإغلاق
// مفتوح للتوسيع، مغلق للتعديل

// خطأ: تعديل الكلاس لكل نوع جديد
class BadPriceCalculator {
  calculate(type, amount) {
    if (type === 'regular') return amount;
    if (type === 'premium') return amount * 0.9;
    if (type === 'vip') return amount * 0.8;
    // لكل نوع جديد نعدل الكود!
  }
}

// صحيح: التوسيع بدون تعديل
const discountStrategies = {
  regular: (amount) => amount,
  premium: (amount) => amount * 0.9,
  vip: (amount) => amount * 0.8,
};

function calculatePrice(type, amount) {
  const strategy = discountStrategies[type];
  if (!strategy) throw new Error('نوع غير معروف');
  return strategy(amount);
}

// إضافة نوع جديد بدون تعديل:
discountStrategies.enterprise = (amount) => amount * 0.7;

// D - مبدأ عكس الاعتماد
// الاعتماد على التجريد وليس التفاصيل

// خطأ: اعتماد مباشر
class OrderService {
  constructor() {
    this.db = new MySQLDatabase();  // مرتبط بـ MySQL
  }
}

// صحيح: حقن الاعتماد
class OrderService {
  constructor(database) {
    this.db = database;  // أي قاعدة بيانات
  }
}

// يمكن استخدام أي تنفيذ
const service1 = new OrderService(new MySQLDatabase());
const service2 = new OrderService(new MongoDatabase());
const service3 = new OrderService(new InMemoryDatabase());  // للاختبار`,
      },
    ],
  },
];

