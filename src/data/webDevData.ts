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
];
