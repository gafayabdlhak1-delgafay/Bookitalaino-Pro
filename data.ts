/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Chapter, Page } from "./types";

export const INITIAL_CHAPTERS: Chapter[] = [
  {
    id: "ch-basics",
    title: "الأساسيات والترحيب والتعارف",
    description: "تعلم التحيات والوداع وكيفية تقديم نفسك باللغة الإيطالية مع النطق التفاعلي.",
    iconName: "MessageCircle"
  },
  {
    id: "ch-grammar",
    title: "القواعد والضمائر الأساسية",
    description: "فهم أساسيات القواعد الإيطالية، الضمائر الشخصية وأهم الأفعال (Essere & Avere).",
    iconName: "BookOpen"
  },
  {
    id: "ch-daily",
    title: "المحادثات والمواقف اليومية",
    description: "كيف تطلب قهوة في المقهى الإيطالي أو تسأل عن الاتجاهات بشكل مبسط.",
    iconName: "Coffee"
  }
];

export const INITIAL_PAGES: Page[] = [
  // Chapter 1
  {
    id: "p-greetings",
    chapterId: "ch-basics",
    title: "الترحيب والتعارف الأساسي",
    contentHtml: `
<div class="space-y-6">
  <div class="bg-emerald-50 border-r-4 border-emerald-600 p-4 rounded-l-md">
    <p class="text-emerald-800 font-medium">مرحباً بك في درسك الأول! 🇮🇹</p>
    <p class="text-sm text-emerald-700 mt-1">انقر على أي عبارة باللغة الإيطالية لسماع نطقها الصحيح بصوت بشري تفاعلي.</p>
  </div>

  <h3 class="text-xl font-bold text-slate-800 border-b pb-2">1. تحيات الصباح والمساء (I Saluti)</h3>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- Card 1 -->
    <div class="bg-white border border-slate-100 p-4 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer flex justify-between items-center group active:scale-98" data-speak="Ciao">
      <div>
        <span class="text-xs text-emerald-600 font-bold block">مرحباً / وداعاً</span>
        <span class="text-lg font-bold text-slate-800 font-mono group-hover:text-emerald-600">Ciao!</span>
      </div>
      <div class="bg-emerald-100 text-emerald-700 p-2.5 rounded-full group-hover:bg-emerald-600 group-hover:text-white transition-colors">
        🔊
      </div>
    </div>

    <!-- Card 2 -->
    <div class="bg-white border border-slate-100 p-4 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer flex justify-between items-center group active:scale-98" data-speak="Buongiorno">
      <div>
        <span class="text-xs text-emerald-600 font-bold block">صباح الخير / يوم سعيد</span>
        <span class="text-lg font-bold text-slate-800 font-mono group-hover:text-emerald-600">Buongiorno!</span>
      </div>
      <div class="bg-emerald-100 text-emerald-700 p-2.5 rounded-full group-hover:bg-emerald-600 group-hover:text-white transition-colors">
        🔊
      </div>
    </div>

    <!-- Card 3 -->
    <div class="bg-white border border-slate-100 p-4 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer flex justify-between items-center group active:scale-98" data-speak="Buonasera">
      <div>
        <span class="text-xs text-emerald-600 font-bold block">مساء الخير</span>
        <span class="text-lg font-bold text-slate-800 font-mono group-hover:text-emerald-600">Buonasera!</span>
      </div>
      <div class="bg-emerald-100 text-emerald-700 p-2.5 rounded-full group-hover:bg-emerald-600 group-hover:text-white transition-colors">
        🔊
      </div>
    </div>

    <!-- Card 4 -->
    <div class="bg-white border border-slate-100 p-4 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer flex justify-between items-center group active:scale-98" data-speak="Arrivederci">
      <div>
        <span class="text-xs text-emerald-600 font-bold block">إلى اللقاء</span>
        <span class="text-lg font-bold text-slate-800 font-mono group-hover:text-emerald-600">Arrivederci!</span>
      </div>
      <div class="bg-emerald-100 text-emerald-700 p-2.5 rounded-full group-hover:bg-emerald-600 group-hover:text-white transition-colors">
        🔊
      </div>
    </div>
  </div>

  <h3 class="text-xl font-bold text-slate-800 border-b pb-2 mt-8">2. التعارف والسؤال عن الحال</h3>
  
  <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
    <div class="flex items-start gap-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-emerald-50 transition-colors" data-speak="Come ti chiami?">
      <div class="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold mt-1">سؤال</div>
      <div>
        <p class="font-semibold text-slate-800 font-mono">Come ti chiami? <span class="text-xs text-slate-400">🔊 انقر للنطق</span></p>
        <p class="text-sm text-slate-600 mt-1">ما اسمك؟</p>
      </div>
    </div>

    <div class="flex items-start gap-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-emerald-50 transition-colors" data-speak="Mi chiamo Omar. E tu?">
      <div class="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold mt-1">جواب</div>
      <div>
        <p class="font-semibold text-slate-800 font-mono">Mi chiamo Omar. E tu? <span class="text-xs text-slate-400">🔊</span></p>
        <p class="text-sm text-slate-600 mt-1">اسمي عمر. وأنت؟</p>
      </div>
    </div>

    <div class="flex items-start gap-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-emerald-50 transition-colors" data-speak="Piacere di conoscerti!">
      <div class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold mt-1">عبارة</div>
      <div>
        <p class="font-semibold text-slate-800 font-mono">Piacere di conoscerti! <span class="text-xs text-slate-400">🔊</span></p>
        <p class="text-sm text-slate-600 mt-1">تشرفت بلقائك!</p>
      </div>
    </div>
  </div>

  <!-- Interactive Quiz Box -->
  <div class="bg-amber-50 border border-amber-200 rounded-xl p-5 mt-6">
    <div class="flex items-center gap-2 mb-3">
      <span class="text-xl">💡</span>
      <h4 class="font-bold text-amber-900">اختبر معلوماتك السريعة:</h4>
    </div>
    <p class="text-amber-800 mb-4 text-sm">ما هي العبارة الإيطالية التي تعني "صباح الخير"؟</p>
    
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
      <button class="py-2.5 px-4 bg-white hover:bg-red-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 transition-colors cursor-pointer active:scale-95" data-quiz-option="wrong" data-feedback="خطأ! Arrivederci تعني إلى اللقاء.">
        Arrivederci
      </button>
      <button class="py-2.5 px-4 bg-white hover:bg-emerald-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 transition-colors cursor-pointer active:scale-95" data-quiz-option="correct" data-feedback="أحسنت! Buongiorno هي صباح الخير!">
        Buongiorno
      </button>
      <button class="py-2.5 px-4 bg-white hover:bg-red-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 transition-colors cursor-pointer active:scale-95" data-quiz-option="wrong" data-feedback="خطأ! Buonasera تعني مساء الخير.">
        Buonasera
      </button>
    </div>
    
    <!-- Quiz feedback placeholder -->
    <div id="quiz-feedback" class="mt-3 text-sm font-bold text-emerald-800 hidden text-center bg-white/60 py-2 rounded"></div>
  </div>

  <!-- Internal Link Button to Next Page -->
  <div class="flex justify-center mt-8">
    <button class="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2 cursor-pointer shadow-sm active:scale-95" data-nav-page="p-pronouns">
      <span>انتقل لدرس الضمائر الشخصية</span>
      <span>←</span>
    </button>
  </div>
</div>
    `
  },
  {
    id: "p-pronouns",
    chapterId: "ch-basics",
    title: "الضمائر الشخصية والأعداد",
    contentHtml: `
<div class="space-y-6">
  <div class="bg-red-50 border-r-4 border-red-600 p-4 rounded-l-md">
    <p class="text-red-800 font-medium">الضمائر الشخصية (I Pronomi Personali) 🇮🇹</p>
    <p class="text-sm text-red-700 mt-1">الضمائر هي أساس تكوين أي جملة. انقر على الضمير لتسمع نطق الإيطالية الفصيح.</p>
  </div>

  <div class="overflow-hidden border border-slate-150 rounded-xl bg-white shadow-xs">
    <table class="w-full text-right border-collapse">
      <thead>
        <tr class="bg-slate-50 text-slate-700 border-b">
          <th class="p-4 font-bold text-sm">الضمير بالإيطالية</th>
          <th class="p-4 font-bold text-sm text-left">المعنى بالعربية</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100 text-slate-800">
        <tr class="hover:bg-slate-50 cursor-pointer transition-colors" data-speak="Io">
          <td class="p-4 font-bold font-mono text-emerald-600">Io <span class="text-xs text-slate-400 font-normal">🔊</span></td>
          <td class="p-4 text-left">أنا</td>
        </tr>
        <tr class="hover:bg-slate-50 cursor-pointer transition-colors" data-speak="Tu">
          <td class="p-4 font-bold font-mono text-emerald-600">Tu <span class="text-xs text-slate-400 font-normal">🔊</span></td>
          <td class="p-4 text-left">أنتَ / أنتِ</td>
        </tr>
        <tr class="hover:bg-slate-50 cursor-pointer transition-colors" data-speak="Lui">
          <td class="p-4 font-bold font-mono text-emerald-600">Lui <span class="text-xs text-slate-400 font-normal">🔊</span></td>
          <td class="p-4 text-left">هو</td>
        </tr>
        <tr class="hover:bg-slate-50 cursor-pointer transition-colors" data-speak="Lei">
          <td class="p-4 font-bold font-mono text-emerald-600">Lei <span class="text-xs text-slate-400 font-normal">🔊</span></td>
          <td class="p-4 text-left">هي / صيغة الاحترام (حضرتك)</td>
        </tr>
        <tr class="hover:bg-slate-50 cursor-pointer transition-colors" data-speak="Noi">
          <td class="p-4 font-bold font-mono text-emerald-600">Noi <span class="text-xs text-slate-400 font-normal">🔊</span></td>
          <td class="p-4 text-left">نحن</td>
        </tr>
        <tr class="hover:bg-slate-50 cursor-pointer transition-colors" data-speak="Voi">
          <td class="p-4 font-bold font-mono text-emerald-600">Voi <span class="text-xs text-slate-400 font-normal">🔊</span></td>
          <td class="p-4 text-left">أنتم / أنتنّ</td>
        </tr>
        <tr class="hover:bg-slate-50 cursor-pointer transition-colors" data-speak="Loro">
          <td class="p-4 font-bold font-mono text-emerald-600">Loro <span class="text-xs text-slate-400 font-normal">🔊</span></td>
          <td class="p-4 text-left">هم / هنّ</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 class="text-xl font-bold text-slate-800 border-b pb-2 mt-8">الأرقام الأساسية من 1 إلى 5 (I Numeri)</h3>
  
  <div class="grid grid-cols-5 gap-2 mt-4 text-center">
    <div class="bg-slate-50 p-3 rounded-lg border border-slate-100 cursor-pointer hover:bg-emerald-50 active:scale-95" data-speak="Uno">
      <span class="text-2xl font-bold text-slate-800 block">1</span>
      <span class="font-bold text-emerald-600 font-mono">Uno</span>
      <span class="text-xs text-slate-500 block mt-1">واحد</span>
    </div>
    <div class="bg-slate-50 p-3 rounded-lg border border-slate-100 cursor-pointer hover:bg-emerald-50 active:scale-95" data-speak="Due">
      <span class="text-2xl font-bold text-slate-800 block">2</span>
      <span class="font-bold text-emerald-600 font-mono">Due</span>
      <span class="text-xs text-slate-500 block mt-1">اثنان</span>
    </div>
    <div class="bg-slate-50 p-3 rounded-lg border border-slate-100 cursor-pointer hover:bg-emerald-50 active:scale-95" data-speak="Tre">
      <span class="text-2xl font-bold text-slate-800 block">3</span>
      <span class="font-bold text-emerald-600 font-mono">Tre</span>
      <span class="text-xs text-slate-500 block mt-1">ثلاثة</span>
    </div>
    <div class="bg-slate-50 p-3 rounded-lg border border-slate-100 cursor-pointer hover:bg-emerald-50 active:scale-95" data-speak="Quattro">
      <span class="text-2xl font-bold text-slate-800 block">4</span>
      <span class="font-bold text-emerald-600 font-mono">Quattro</span>
      <span class="text-xs text-slate-500 block mt-1">أربعة</span>
    </div>
    <div class="bg-slate-50 p-3 rounded-lg border border-slate-100 cursor-pointer hover:bg-emerald-50 active:scale-95" data-speak="Cinque">
      <span class="text-2xl font-bold text-slate-800 block">5</span>
      <span class="font-bold text-emerald-600 font-mono">Cinque</span>
      <span class="text-xs text-slate-500 block mt-1">خمسة</span>
    </div>
  </div>

  <!-- Navigation Buttons Inside Book -->
  <div class="flex justify-between items-center mt-12 pt-6 border-t">
    <button class="px-4 py-2 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1 cursor-pointer" data-nav-page="p-greetings">
      <span>→ السابق</span>
    </button>
    <button class="px-5 py-2.5 text-sm bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1 cursor-pointer" data-nav-page="p-verb-essere">
      <span>درس فعل الكينونة التالي ←</span>
    </button>
  </div>
</div>
    `
  },

  // Chapter 2
  {
    id: "p-verb-essere",
    chapterId: "ch-grammar",
    title: "فعل الكينونة (Verbo Essere)",
    contentHtml: `
<div class="space-y-6">
  <div class="bg-blue-50 border-r-4 border-blue-600 p-4 rounded-l-md">
    <p class="text-blue-800 font-medium">فعل الكينونة: Essere (To be) 🇮🇹</p>
    <p class="text-sm text-blue-700 mt-1">يعتبر من أهم الأفعال في اللغة الإيطالية ويستخدم لتعريف الهوية، الجنسية، الحالة، والموقع.</p>
  </div>

  <h3 class="text-xl font-bold text-slate-800 border-b pb-2">تصريف الفعل مع الضمائر (Coniugazione)</h3>
  
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
    <!-- Io sono -->
    <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex justify-between items-center cursor-pointer hover:border-blue-500 group" data-speak="Io sono italiano">
      <div>
        <span class="text-xs text-slate-400 block font-bold">أنا أكون (إيطالي)</span>
        <span class="text-lg font-bold text-slate-800 font-mono"><span class="text-blue-600">Io sono</span> italiano</span>
      </div>
      <span class="text-xl group-hover:scale-110 transition-transform">🔊</span>
    </div>

    <!-- Tu sei -->
    <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex justify-between items-center cursor-pointer hover:border-blue-500 group" data-speak="Tu sei felice">
      <div>
        <span class="text-xs text-slate-400 block font-bold">أنت تكون (سعيد)</span>
        <span class="text-lg font-bold text-slate-800 font-mono"><span class="text-blue-600">Tu sei</span> felice</span>
      </div>
      <span class="text-xl group-hover:scale-110 transition-transform">🔊</span>
    </div>

    <!-- Lui/Lei è -->
    <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex justify-between items-center cursor-pointer hover:border-blue-500 group" data-speak="Lui è stanco">
      <div>
        <span class="text-xs text-slate-400 block font-bold">هو يكون (تعبان)</span>
        <span class="text-lg font-bold text-slate-800 font-mono"><span class="text-blue-600">Lui è</span> stanco</span>
      </div>
      <span class="text-xl group-hover:scale-110 transition-transform">🔊</span>
    </div>

    <!-- Noi siamo -->
    <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex justify-between items-center cursor-pointer hover:border-blue-500 group" data-speak="Noi siamo pronti">
      <div>
        <span class="text-xs text-slate-400 block font-bold">نحن نكون (جاهزون)</span>
        <span class="text-lg font-bold text-slate-800 font-mono"><span class="text-blue-600">Noi siamo</span> pronti</span>
      </div>
      <span class="text-xl group-hover:scale-110 transition-transform">🔊</span>
    </div>
  </div>

  <!-- Practice activity inside the page -->
  <div class="bg-emerald-50 border border-emerald-200 p-5 rounded-xl mt-6">
    <h4 class="font-bold text-emerald-900 mb-2">✏️ تمرين تفاعلي سريع:</h4>
    <p class="text-sm text-emerald-800 mb-3">اختر التصريف الصحيح: <span class="font-mono font-bold text-slate-900">"Noi ______ studenti"</span> (نحن نكون طلاب)</p>
    
    <div class="flex gap-2">
      <button class="py-2 px-4 bg-white border border-slate-200 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors cursor-pointer active:scale-95" data-quiz-option="wrong" data-feedback="خطأ! 'sei' تستخدم مع الضمير Tu (أنت).">
        sei
      </button>
      <button class="py-2 px-4 bg-white border border-slate-200 rounded-lg text-sm font-semibold hover:bg-emerald-100 transition-colors cursor-pointer active:scale-95" data-quiz-option="correct" data-feedback="صحيح جداً! 'Noi siamo' هي الإجابة الصحيحة.">
        siamo
      </button>
      <button class="py-2 px-4 bg-white border border-slate-200 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors cursor-pointer active:scale-95" data-quiz-option="wrong" data-feedback="خطأ! 'sono' تستخدم مع Io أو Loro.">
        sono
      </button>
    </div>
    
    <div id="quiz-feedback-2" class="mt-3 text-sm font-bold text-emerald-800 hidden text-center bg-white/60 py-2 rounded"></div>
  </div>

  <!-- Navigation Buttons Inside Book -->
  <div class="flex justify-between items-center mt-12 pt-6 border-t">
    <button class="px-4 py-2 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1 cursor-pointer" data-nav-page="p-pronouns">
      <span>→ درس الضمائر السابق</span>
    </button>
    <button class="px-5 py-2.5 text-sm bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1 cursor-pointer" data-nav-page="p-verb-avere">
      <span>درس فعل الملكية التالي ←</span>
    </button>
  </div>
</div>
    `
  },
  {
    id: "p-verb-avere",
    chapterId: "ch-grammar",
    title: "فعل الملكية (Verbo Avere)",
    contentHtml: `
<div class="space-y-6">
  <div class="bg-amber-50 border-r-4 border-amber-600 p-4 rounded-l-md">
    <p class="text-amber-800 font-medium">فعل الملكية: Avere (To have) 🇮🇹</p>
    <p class="text-sm text-amber-700 mt-1">يستخدم للتعبير عن امتلاك الأشياء، وكذلك للتعبير عن الإحساس (الجوع، العطش، البرد، السن).</p>
  </div>

  <h3 class="text-xl font-bold text-slate-800 border-b pb-2">تصريف الفعل مع الضمائر (Coniugazione)</h3>
  
  <div class="space-y-2">
    <!-- Io ho -->
    <div class="flex justify-between items-center p-3 bg-white border border-slate-100 rounded-lg cursor-pointer hover:bg-amber-50 transition-colors" data-speak="Io ho una macchina">
      <div>
        <p class="font-bold text-slate-800 font-mono"><span class="text-amber-600">Io ho</span> una macchina <span class="text-xs text-slate-400 font-normal">🔊</span></p>
        <p class="text-xs text-slate-500 mt-0.5">أنا أملك سيارة (حرف H صامت دائماً في الإيطالية، ينطق: إيو أُو)</p>
      </div>
    </div>

    <!-- Tu hai -->
    <div class="flex justify-between items-center p-3 bg-white border border-slate-100 rounded-lg cursor-pointer hover:bg-amber-50 transition-colors" data-speak="Tu hai fame">
      <div>
        <p class="font-bold text-slate-800 font-mono"><span class="text-amber-600">Tu hai</span> fame <span class="text-xs text-slate-400 font-normal">🔊</span></p>
        <p class="text-xs text-slate-500 mt-0.5">أنت جائع (حرفياً: تملك جوعاً، ينطق: تو آي)</p>
      </div>
    </div>

    <!-- Lui/Lei ha -->
    <div class="flex justify-between items-center p-3 bg-white border border-slate-100 rounded-lg cursor-pointer hover:bg-amber-50 transition-colors" data-speak="Lui ha caldo">
      <div>
        <p class="font-bold text-slate-800 font-mono"><span class="text-amber-600">Lui ha</span> caldo <span class="text-xs text-slate-400 font-normal">🔊</span></p>
        <p class="text-xs text-slate-500 mt-0.5">هو يشعر بالحرارة (حرفياً: يملك حرّاً، ينطق: لوي آ)</p>
      </div>
    </div>

    <!-- Noi abbiamo -->
    <div class="flex justify-between items-center p-3 bg-white border border-slate-100 rounded-lg cursor-pointer hover:bg-amber-50 transition-colors" data-speak="Noi abbiamo tempo">
      <div>
        <p class="font-bold text-slate-800 font-mono"><span class="text-amber-600">Noi abbiamo</span> tempo <span class="text-xs text-slate-400 font-normal">🔊</span></p>
        <p class="text-xs text-slate-500 mt-0.5">نحن نملك الوقت (ينطق: نوي أبيامو)</p>
      </div>
    </div>
  </div>

  <h3 class="text-xl font-bold text-slate-800 border-b pb-2 mt-8">ملاحظة ذهبية 💡</h3>
  <p class="text-slate-700 leading-relaxed text-sm">
    في اللغة الإيطالية، الحرف <span class="font-bold text-red-600 font-mono">H</span> في بداية الكلمات يكون **صامتاً تماماً** ولا يُلفظ. لذلك كلمة <span class="font-bold text-emerald-600 font-mono">ho</span> تلفظ "أو"، وكلمة <span class="font-bold text-emerald-600 font-mono">hai</span> تلفظ "آي".
  </p>

  <!-- Navigation Buttons Inside Book -->
  <div class="flex justify-between items-center mt-12 pt-6 border-t">
    <button class="px-4 py-2 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1 cursor-pointer" data-nav-page="p-verb-essere">
      <span>→ فعل الكينونة السابق</span>
    </button>
    <button class="px-5 py-2.5 text-sm bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1 cursor-pointer" data-nav-page="p-cafe">
      <span>محادثة في المقهى التالية ←</span>
    </button>
  </div>
</div>
    `
  },

  // Chapter 3
  {
    id: "p-cafe",
    chapterId: "ch-daily",
    title: "محادثة في المقهى (Al Caffè)",
    contentHtml: `
<div class="space-y-6">
  <div class="bg-emerald-50 border-r-4 border-emerald-600 p-4 rounded-l-md">
    <p class="text-emerald-800 font-medium">محادثة واقعية في المقهى الإيطالي ☕🇮🇹</p>
    <p class="text-sm text-emerald-700 mt-1">اضغط على أي جملة لتستمع إلى نطق الحوار الحقيقي بصوت إيطالي طبيعي.</p>
  </div>

  <div class="space-y-4 my-6">
    <!-- Bubble 1: Waiter -->
    <div class="flex items-start gap-3 cursor-pointer hover:bg-slate-50 p-2.5 rounded-lg transition-colors" data-speak="Buongiorno! Cosa desidera?">
      <div class="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 text-sm">C</div>
      <div class="bg-slate-100 p-3 rounded-2xl rounded-tr-none text-right grow">
        <span class="text-xs text-slate-500 block font-bold mb-1">الندل (Cameriere):</span>
        <p class="font-bold text-slate-800 font-mono">Buongiorno! Cosa desidera? <span class="text-xs text-slate-400">🔊</span></p>
        <p class="text-sm text-slate-600 mt-0.5">صباح الخير! ماذا تفضل؟</p>
      </div>
    </div>

    <!-- Bubble 2: Customer -->
    <div class="flex items-start gap-3 flex-row-reverse cursor-pointer hover:bg-slate-50 p-2.5 rounded-lg transition-colors" data-speak="Un caffè espresso e un cornetto, per favore.">
      <div class="bg-emerald-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 text-sm">O</div>
      <div class="bg-emerald-50 p-3 rounded-2xl rounded-tl-none text-right grow">
        <span class="text-xs text-emerald-700 block font-bold mb-1">الزبون (Omar):</span>
        <p class="font-bold text-slate-800 font-mono">Un caffè espresso e un cornetto, per favore. <span class="text-xs text-slate-400">🔊</span></p>
        <p class="text-sm text-slate-600 mt-0.5">قهوة إسبريسو وكرواسون (كورنيتو)، لو سمحت.</p>
      </div>
    </div>

    <!-- Bubble 3: Waiter -->
    <div class="flex items-start gap-3 cursor-pointer hover:bg-slate-50 p-2.5 rounded-lg transition-colors" data-speak="Certamente. Altro?">
      <div class="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 text-sm">C</div>
      <div class="bg-slate-100 p-3 rounded-2xl rounded-tr-none text-right grow">
        <span class="text-xs text-slate-500 block font-bold mb-1">الندل (Cameriere):</span>
        <p class="font-bold text-slate-800 font-mono">Certamente. Altro? <span class="text-xs text-slate-400">🔊</span></p>
        <p class="text-sm text-slate-600 mt-0.5">بالتأكيد. أي شيء آخر؟</p>
      </div>
    </div>

    <!-- Bubble 4: Customer -->
    <div class="flex items-start gap-3 flex-row-reverse cursor-pointer hover:bg-slate-50 p-2.5 rounded-lg transition-colors" data-speak="No, grazie. Quant'è?">
      <div class="bg-emerald-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 text-sm">O</div>
      <div class="bg-emerald-50 p-3 rounded-2xl rounded-tl-none text-right grow">
        <span class="text-xs text-emerald-700 block font-bold mb-1">الزبون (Omar):</span>
        <p class="font-bold text-slate-800 font-mono">No, grazie. Quant'è? <span class="text-xs text-slate-400">🔊</span></p>
        <p class="text-sm text-slate-600 mt-0.5">لا، شكراً لك. كم الحساب؟</p>
      </div>
    </div>

    <!-- Bubble 5: Waiter -->
    <div class="flex items-start gap-3 cursor-pointer hover:bg-slate-50 p-2.5 rounded-lg transition-colors" data-speak="Sono tre euro e cinquanta centesimi.">
      <div class="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 text-sm">C</div>
      <div class="bg-slate-100 p-3 rounded-2xl rounded-tr-none text-right grow">
        <span class="text-xs text-slate-500 block font-bold mb-1">الندل (Cameriere):</span>
        <p class="font-bold text-slate-800 font-mono">Sono tre euro e cinquanta centesimi. <span class="text-xs text-slate-400">🔊</span></p>
        <p class="text-sm text-slate-600 mt-0.5">الحساب ثلاثة يورو وخمسين سنتاً.</p>
      </div>
    </div>
  </div>

  <!-- Interactive Vocab Grid -->
  <h4 class="font-bold text-slate-800 border-b pb-2 mt-6">المفردات الرئيسية في الدرس:</h4>
  <div class="grid grid-cols-2 gap-3">
    <div class="bg-slate-50 p-3 rounded-lg border text-center cursor-pointer hover:bg-emerald-50" data-speak="Un caffè">
      <span class="font-mono font-bold text-slate-800 block">Un caffè <span class="text-xs">🔊</span></span>
      <span class="text-xs text-slate-500">قهوة</span>
    </div>
    <div class="bg-slate-50 p-3 rounded-lg border text-center cursor-pointer hover:bg-emerald-50" data-speak="Un cornetto">
      <span class="font-mono font-bold text-slate-800 block">Un cornetto <span class="text-xs">🔊</span></span>
      <span class="text-xs text-slate-500">كرواسون</span>
    </div>
    <div class="bg-slate-50 p-3 rounded-lg border text-center cursor-pointer hover:bg-emerald-50" data-speak="Per favore">
      <span class="font-mono font-bold text-slate-800 block">Per favore <span class="text-xs">🔊</span></span>
      <span class="text-xs text-slate-500">من فضلك</span>
    </div>
    <div class="bg-slate-50 p-3 rounded-lg border text-center cursor-pointer hover:bg-emerald-50" data-speak="Grazie">
      <span class="font-mono font-bold text-slate-800 block">Grazie <span class="text-xs">🔊</span></span>
      <span class="text-xs text-slate-500">شكراً</span>
    </div>
  </div>

  <!-- Navigation Buttons Inside Book -->
  <div class="flex justify-between items-center mt-12 pt-6 border-t">
    <button class="px-4 py-2 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1 cursor-pointer" data-nav-page="p-verb-avere">
      <span>→ فعل الملكية السابق</span>
    </button>
    <button class="px-5 py-2.5 text-sm bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1 cursor-pointer" data-nav-page="p-directions">
      <span>درس الاتجاهات التالي ←</span>
    </button>
  </div>
</div>
    `
  },
  {
    id: "p-directions",
    chapterId: "ch-daily",
    title: "السؤال عن الاتجاهات (Chiedere Indicazioni)",
    contentHtml: `
<div class="space-y-6">
  <div class="bg-slate-50 border-r-4 border-slate-600 p-4 rounded-l-md">
    <p class="text-slate-800 font-medium">السؤال عن الاتجاهات والأماكن 🗺️🇮🇹</p>
    <p class="text-sm text-slate-600 mt-1">تعبيرات هامة جداً لأي مسافر يريد التنقل في إيطاليا.</p>
  </div>

  <div class="space-y-4">
    <!-- Phrases -->
    <div class="p-3 bg-white border border-slate-100 rounded-xl shadow-xs hover:border-emerald-500 cursor-pointer transition-all" data-speak="Dov'è il Colosseo?">
      <div class="flex justify-between items-center">
        <span class="font-mono font-bold text-emerald-600">Dov'è il Colosseo? <span class="text-xs text-slate-400">🔊</span></span>
        <span class="text-xs text-slate-400">أين يقع الكولوسيوم؟</span>
      </div>
    </div>

    <div class="p-3 bg-white border border-slate-100 rounded-xl shadow-xs hover:border-emerald-500 cursor-pointer transition-all" data-speak="Dov'è la stazione ferroviaria?">
      <div class="flex justify-between items-center">
        <span class="font-mono font-bold text-emerald-600">Dov'è la stazione ferroviaria? <span class="text-xs text-slate-400">🔊</span></span>
        <span class="text-xs text-slate-400">أين تقع محطة القطار؟</span>
      </div>
    </div>

    <div class="p-3 bg-white border border-slate-100 rounded-xl shadow-xs hover:border-emerald-500 cursor-pointer transition-all" data-speak="Scusi, c'è un ristorante qui vicino?">
      <div class="flex justify-between items-center">
        <span class="font-mono font-bold text-emerald-600">Scusi, c'è un ristorante qui vicino? <span class="text-xs text-slate-400">🔊</span></span>
        <span class="text-xs text-slate-400">لو سمحت، هل يوجد مطعم هنا بالقرب؟</span>
      </div>
    </div>
  </div>

  <h3 class="text-lg font-bold text-slate-800 border-b pb-2 mt-6">كلمات الاتجاهات الأساسية:</h3>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
    <div class="bg-slate-50 p-3 rounded-lg border text-center cursor-pointer hover:bg-emerald-50" data-speak="A destra">
      <span class="font-mono font-bold text-slate-800 block">A destra <span class="text-xs">🔊</span></span>
      <span class="text-xs text-slate-500">على اليمين</span>
    </div>
    <div class="bg-slate-50 p-3 rounded-lg border text-center cursor-pointer hover:bg-emerald-50" data-speak="A sinistra">
      <span class="font-mono font-bold text-slate-800 block">A sinistra <span class="text-xs">🔊</span></span>
      <span class="text-xs text-slate-500">على اليسار</span>
    </div>
    <div class="bg-slate-50 p-3 rounded-lg border text-center cursor-pointer hover:bg-emerald-50" data-speak="Dritto">
      <span class="font-mono font-bold text-slate-800 block">Dritto <span class="text-xs">🔊</span></span>
      <span class="text-xs text-slate-500">مباشرة إلى الأمام</span>
    </div>
  </div>

  <!-- End of Book placeholder visual message -->
  <div class="bg-emerald-600 text-white text-center p-6 rounded-2xl shadow-md mt-8">
    <span class="text-3xl">🎉</span>
    <h4 class="font-bold text-lg mt-2">لقد أكملت جميع الدروس الافتراضية!</h4>
    <p class="text-xs text-emerald-100 mt-1">بصفتك مديراً للكتاب، يمكنك النقر على أيقونة الملف الشخصي بالأعلى وإدخال كلمة المرور (admin) لفتح لوحة التحكم وإضافة فصول وصفحات مخصصة جديدة مذهلة!</p>
  </div>

  <!-- Navigation Buttons Inside Book -->
  <div class="flex justify-between items-center mt-12 pt-6 border-t">
    <button class="px-4 py-2 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1 cursor-pointer" data-nav-page="p-cafe">
      <span>→ محادثة المقهى السابق</span>
    </button>
  </div>
</div>
    `
  }
];

export const PRESET_HTML_TEMPLATES = [
  {
    name: "بطاقة درس مخصصة مع نطق صوتي",
    description: "قالب بسيط لبطاقات تحتوي على عبارات باللغة الإيطالية وترجمتها بالعربية مع أيقونة السماع المباشر.",
    html: `<div class="space-y-6">
  <div class="bg-emerald-50 border-r-4 border-emerald-600 p-4 rounded-l-md">
    <p class="text-emerald-800 font-medium">عنوان الدرس الجديد 🇮🇹</p>
    <p class="text-sm text-emerald-700 mt-1">اضغط على أي بطاقة لسماع النطق الإيطالي الصحيح.</p>
  </div>

  <h3 class="text-xl font-bold text-slate-800 border-b pb-2">قائمة الكلمات والعبارات الجديدة</h3>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- عنصر 1 -->
    <div class="bg-white border border-slate-100 p-4 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer flex justify-between items-center group active:scale-98" data-speak="Grazie mille">
      <div>
        <span class="text-xs text-emerald-600 font-bold block">شكراً جزيلاً</span>
        <span class="text-lg font-bold text-slate-800 font-mono group-hover:text-emerald-600">Grazie mille!</span>
      </div>
      <div class="bg-emerald-100 text-emerald-700 p-2 rounded-full">🔊</div>
    </div>

    <!-- عنصر 2 -->
    <div class="bg-white border border-slate-100 p-4 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer flex justify-between items-center group active:scale-98" data-speak="Prego">
      <div>
        <span class="text-xs text-emerald-600 font-bold block">على الرحب والسعة / عفواً</span>
        <span class="text-lg font-bold text-slate-800 font-mono group-hover:text-emerald-600">Prego!</span>
      </div>
      <div class="bg-emerald-100 text-emerald-700 p-2 rounded-full">🔊</div>
    </div>
  </div>
</div>`
  },
  {
    name: "محادثة حوارية تفاعلية ثنائية",
    description: "قالب مخصص للمحادثات والقصص بين شخصين (مثل النادل والزبون، أو الصديقين) مع فقاعات حوار رائعة.",
    html: `<div class="space-y-6">
  <div class="bg-slate-50 border-r-4 border-slate-600 p-4 rounded-l-md">
    <p class="text-slate-800 font-medium">محادثة حوارية جديدة 🗣️</p>
    <p class="text-sm text-slate-600 mt-1">انقر على الفقاعة لسماع الصوت الفوري.</p>
  </div>

  <div class="space-y-4 my-6">
    <!-- الشخص الأول -->
    <div class="flex items-start gap-3 cursor-pointer hover:bg-slate-50 p-2.5 rounded-lg transition-colors" data-speak="Come stai oggi?">
      <div class="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0">A</div>
      <div class="bg-slate-100 p-3 rounded-2xl rounded-tr-none text-right grow">
        <span class="text-xs text-slate-500 block font-bold mb-1">أحمد (Ahmed):</span>
        <p class="font-bold text-slate-800 font-mono">Come stai oggi? 🔊</p>
        <p class="text-sm text-slate-600 mt-0.5">كيف حالك اليوم؟</p>
      </div>
    </div>

    <!-- الشخص الثاني -->
    <div class="flex items-start gap-3 flex-row-reverse cursor-pointer hover:bg-slate-50 p-2.5 rounded-lg transition-colors" data-speak="Sto molto bene, grazie! E tu?">
      <div class="bg-emerald-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0">G</div>
      <div class="bg-emerald-50 p-3 rounded-2xl rounded-tl-none text-right grow">
        <span class="text-xs text-emerald-700 block font-bold mb-1">جوفاني (Giovanni):</span>
        <p class="font-bold text-slate-800 font-mono">Sto molto bene, grazie! E tu? 🔊</p>
        <p class="text-sm text-slate-600 mt-0.5">أنا بخير جداً، شكراً! وأنت؟</p>
      </div>
    </div>
  </div>
</div>`
  },
  {
    name: "اختبار تفاعلي من متعدد الخيارات",
    description: "قالب لإنشاء اختبارات أسئلة سريعة مع تغذية راجعة فورية تظهر للطالب عند النقر.",
    html: `<div class="bg-amber-50 border border-amber-200 rounded-xl p-5">
  <div class="flex items-center gap-2 mb-3">
    <span class="text-xl">💡</span>
    <h4 class="font-bold text-amber-900">سؤال تقييمي جديد:</h4>
  </div>
  <p class="text-amber-800 mb-4 text-sm">ما معنى الكلمة الإيطالية "Grazie"؟</p>
  
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
    <button class="py-2.5 px-4 bg-white hover:bg-red-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 transition-colors cursor-pointer active:scale-95" data-quiz-option="wrong" data-feedback="خطأ! الكلمة تعني شكراً.">
      نعم
    </button>
    <button class="py-2.5 px-4 bg-white hover:bg-emerald-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 transition-colors cursor-pointer active:scale-95" data-quiz-option="correct" data-feedback="رائع جداً! الإجابة صحيحة، Grazie تعني شكراً لك!">
      شكراً
    </button>
    <button class="py-2.5 px-4 bg-white hover:bg-red-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 transition-colors cursor-pointer active:scale-95" data-quiz-option="wrong" data-feedback="خطأ! Prego هي التي تعني عفواً.">
      عفواً
    </button>
  </div>
  
  <!-- صندوق التغذية الراجعة يمتلئ ديناميكياً -->
  <div id="quiz-feedback-new" class="mt-3 text-sm font-bold text-slate-800 hidden text-center bg-white/60 py-2 rounded"></div>
</div>`
  }
];
