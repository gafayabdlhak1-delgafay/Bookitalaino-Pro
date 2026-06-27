/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { 
  Plus, Trash2, Eye, Code, BookOpen, Sparkles, CheckCircle, 
  AlertCircle, X, Save, FileText, Layout, Play, RotateCcw, HelpCircle,
  Volume2, HelpCircle as HelpIcon, PlusCircle, Check
} from "lucide-react";
import { Chapter, Page } from "../types";
import { PRESET_HTML_TEMPLATES } from "../data";
import Quiz from "./Quiz";

interface AdminDashboardProps {
  chapters: Chapter[];
  pages: Page[];
  onAddChapter: (chapter: Omit<Chapter, "id">) => void;
  onAddPage: (page: Omit<Page, "id">) => void;
  onDeletePage: (pageId: string) => void;
  onClose: () => void;
}

export default function AdminDashboard({
  chapters,
  pages,
  onAddChapter,
  onAddPage,
  onDeletePage,
  onClose,
}: AdminDashboardProps) {
  // Stats
  const customPages = pages.filter((p) => p.isCustom);
  const totalChapters = chapters.length;
  const totalPages = pages.length;

  // Form State: Chapter
  const [newChTitle, setNewChTitle] = useState("");
  const [newChDesc, setNewChDesc] = useState("");
  const [newChIcon, setNewChIcon] = useState("BookOpen");
  const [chSuccessMsg, setChSuccessMsg] = useState("");

  // Form State: Page
  const [newPgTitle, setNewPgTitle] = useState("");
  const [newPgChapterId, setNewPgChapterId] = useState(chapters[0]?.id || "");
  const [newPgHtml, setNewPgHtml] = useState(PRESET_HTML_TEMPLATES[0].html);
  const [pgSuccessMsg, setPgSuccessMsg] = useState("");
  const [previewActive, setPreviewActive] = useState(true);

  // Quiz Builder States
  const [quizQuestion, setQuizQuestion] = useState("");
  const [quizChoice1, setQuizChoice1] = useState("");
  const [quizChoice2, setQuizChoice2] = useState("");
  const [quizChoice3, setQuizChoice3] = useState("");
  const [quizChoice4, setQuizChoice4] = useState("");
  const [quizCorrectIndex, setQuizCorrectIndex] = useState(0);
  const [quizFeedbackCorrect, setQuizFeedbackCorrect] = useState("");
  const [quizFeedbackWrong, setQuizFeedbackWrong] = useState("");
  const [quizSpeakOptions, setQuizSpeakOptions] = useState(false);
  const [quizBuilderSuccessMsg, setQuizBuilderSuccessMsg] = useState("");

  // Available beautiful Lucide icons for chapters
  const availableIcons = [
    { name: "BookOpen", label: "كتاب" },
    { name: "MessageCircle", label: "محادثة" },
    { name: "Coffee", label: "مقهى" },
    { name: "Sparkles", label: "ذكاء وتألق" },
    { name: "Award", label: "جائزة/تقدم" },
    { name: "HelpCircle", label: "سؤال وجواب" },
    { name: "GraduationCap", label: "تعليم" },
    { name: "Music", label: "صوتيات" }
  ];

  // TTS Helper for Preview
  const [previewSpeakingText, setPreviewSpeakingText] = useState<string | null>(null);

  const speakItalian = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setPreviewSpeakingText(text);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "it-IT";

      const voices = window.speechSynthesis.getVoices();
      const italianVoice = voices.find((v) => v.lang.startsWith("it"));
      if (italianVoice) {
        utterance.voice = italianVoice;
      }

      utterance.onend = () => setPreviewSpeakingText(null);
      utterance.onerror = () => setPreviewSpeakingText(null);

      window.speechSynthesis.speak(utterance);
    }
  };

  const previewContentRef = useRef<HTMLDivElement>(null);
  const quizRootsRef = useRef<any[]>([]);

  useEffect(() => {
    // Clean up previous quiz roots asynchronously
    const rootsToCleanup = [...quizRootsRef.current];
    quizRootsRef.current = [];
    if (rootsToCleanup.length > 0) {
      setTimeout(() => {
        rootsToCleanup.forEach(root => {
          try {
            root.unmount();
          } catch (err) {
            // ignore
          }
        });
      }, 0);
    }

    // Find and render all .react-quiz elements in previewContentRef
    if (previewContentRef.current) {
      const quizContainers = previewContentRef.current.querySelectorAll(".react-quiz");
      quizContainers.forEach((container) => {
        const question = container.getAttribute("data-question") || "سؤال تفاعلي جديد";
        const choicesStr = container.getAttribute("data-choices") || "";
        const choices = choicesStr.split("|").map(s => s.trim()).filter(Boolean);
        const correctIndex = parseInt(container.getAttribute("data-correct") || "0", 10);
        const feedbackCorrect = container.getAttribute("data-feedback-correct") || undefined;
        const feedbackWrong = container.getAttribute("data-feedback-wrong") || undefined;
        const speakOptions = container.getAttribute("data-speak-options") === "true";

        try {
          const root = createRoot(container);
          root.render(
            <Quiz
              question={question}
              choices={choices}
              correctIndex={correctIndex}
              feedbackCorrect={feedbackCorrect}
              feedbackWrong={feedbackWrong}
              speakOptions={speakOptions}
              onSpeak={speakItalian}
            />
          );
          quizRootsRef.current.push(root);
        } catch (err) {
          console.error("Error rendering preview Quiz inside container:", err);
        }
      });
    }

    return () => {
      const rootsToUnmount = [...quizRootsRef.current];
      quizRootsRef.current = [];
      if (rootsToUnmount.length > 0) {
        setTimeout(() => {
          rootsToUnmount.forEach(root => {
            try {
              root.unmount();
            } catch (err) {
              // ignore
            }
          });
        }, 0);
      }
    };
  }, [newPgHtml]);

  // Click handler inside Live HTML Preview
  const handlePreviewClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    // Speak helper
    const speakEl = target.closest("[data-speak]");
    if (speakEl) {
      const text = speakEl.getAttribute("data-speak");
      if (text) {
        speakItalian(text);
      }
      return;
    }

    // Quiz action simulation
    const quizEl = target.closest("[data-quiz-option]");
    if (quizEl) {
      const option = quizEl.getAttribute("data-quiz-option");
      const feedback = quizEl.getAttribute("data-feedback") || "";
      const parentBlock = quizEl.parentElement?.parentElement;
      if (parentBlock) {
        const feedbackDiv = parentBlock.querySelector('[id^="quiz-feedback"]') as HTMLElement;
        if (feedbackDiv) {
          feedbackDiv.innerHTML = `معاينة الاختبار: ${feedback}`;
          feedbackDiv.classList.remove("hidden");
          feedbackDiv.classList.add("block");
          if (option === "correct") {
            feedbackDiv.className = "mt-3 text-sm font-bold text-emerald-800 block text-center bg-emerald-100/90 py-2 rounded-lg border border-emerald-300";
          } else {
            feedbackDiv.className = "mt-3 text-sm font-bold text-red-800 block text-center bg-red-100/90 py-2 rounded-lg border border-red-300";
          }
        }
      }
    }
  };

  const submitChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChTitle.trim() || !newChDesc.trim()) return;

    onAddChapter({
      title: newChTitle,
      description: newChDesc,
      iconName: newChIcon,
    });

    setNewChTitle("");
    setNewChDesc("");
    setChSuccessMsg("تم إضافة الفصل الجديد بنجاح إلى فهرس الكتاب! 🎉");
    setTimeout(() => setChSuccessMsg(""), 4000);
  };

  const submitPage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPgTitle.trim() || !newPgHtml.trim()) return;

    onAddPage({
      chapterId: newPgChapterId,
      title: newPgTitle,
      contentHtml: newPgHtml,
      isCustom: true,
    });

    setNewPgTitle("");
    setPgSuccessMsg("تم إضافة الدرس/الصفحة التفاعلية الجديدة بنجاح! 📖");
    setTimeout(() => setPgSuccessMsg(""), 4000);
  };

  const insertTemplate = (htmlCode: string) => {
    setNewPgHtml(htmlCode);
  };

  const handleInsertQuizToEditor = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!quizQuestion.trim() || !quizChoice1.trim() || !quizChoice2.trim()) {
      alert("الرجاء إدخال السؤال والخيارات الأساسية (الخيار الأول والثاني على الأقل) لإنشاء الاختبار.");
      return;
    }

    // Build options list
    const choices = [quizChoice1.trim(), quizChoice2.trim()];
    if (quizChoice3.trim()) choices.push(quizChoice3.trim());
    if (quizChoice4.trim()) choices.push(quizChoice4.trim());

    // Validate correct choice
    if (quizCorrectIndex >= choices.length) {
      alert("الخيار المختار كإجابة صحيحة غير موجود! الرجاء التأكد من اختيار أحد الخيارات المدخلة.");
      return;
    }

    const choicesStr = choices.join("|");
    const feedbackCorrect = quizFeedbackCorrect.trim() || "رائع جداً! إجابة صحيحة وممتازة. 🎉";
    const feedbackWrong = quizFeedbackWrong.trim() || "إجابة غير صحيحة، حاول مجدداً! 🤔";

    // Generate HTML container for the react-quiz
    const quizHtmlElement = `\n<!-- Interactive Multiple Choice Quiz -->
<div class="react-quiz" 
     data-question="${quizQuestion.replace(/"/g, "&quot;")}" 
     data-choices="${choicesStr.replace(/"/g, "&quot;")}" 
     data-correct="${quizCorrectIndex}" 
     data-feedback-correct="${feedbackCorrect.replace(/"/g, "&quot;")}" 
     data-feedback-wrong="${feedbackWrong.replace(/"/g, "&quot;")}" 
     data-speak-options="${quizSpeakOptions}">
</div>\n`;

    // Append to existing HTML page content
    setNewPgHtml(prev => prev + quizHtmlElement);

    // Reset Quiz state variables
    setQuizQuestion("");
    setQuizChoice1("");
    setQuizChoice2("");
    setQuizChoice3("");
    setQuizChoice4("");
    setQuizCorrectIndex(0);
    setQuizFeedbackCorrect("");
    setQuizFeedbackWrong("");
    setQuizSpeakOptions(false);

    setQuizBuilderSuccessMsg("تم توليد كود الاختبار بنجاح وإدراجه في أسفل محرر الصفحة! 📝✨");
    setTimeout(() => setQuizBuilderSuccessMsg(""), 5000);
  };

  // Set default chapter ID when chapters array changes
  useEffect(() => {
    if (chapters.length > 0 && !newPgChapterId) {
      setNewPgChapterId(chapters[0].id);
    }
  }, [chapters]);

  return (
    <div className="flex-1 bg-slate-950 text-slate-100 min-h-[calc(100vh-4rem)] flex flex-col" dir="rtl">
      {/* Dashboard Top Header */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 md:p-6 sticky top-0 z-30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white flex items-center gap-2">
            <span className="p-1.5 bg-red-600 rounded-lg text-white font-mono animate-pulse">ADMIN</span>
            <span>لوحة تحكم معلم اللغة الإيطالية المتطورة</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            أضف فصولاً جديدة، اكتب صفحات تفاعلية بلغة HTML مخصصة، واصنع بطاقات نطق واختبارات لطلابك.
          </p>
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold text-xs md:text-sm rounded-lg flex items-center gap-1.5 cursor-pointer self-stretch sm:self-auto justify-center transition-colors"
          id="exit-admin-btn"
        >
          <X size={16} />
          <span>الرجوع للكتاب التفاعلي</span>
        </button>
      </div>

      {/* Dashboard Grid Container */}
      <div className="p-4 md:p-6 space-y-8 flex-1 overflow-y-auto">
        
        {/* STATS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="admin-stats-panel">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
            <div className="bg-emerald-600/10 text-emerald-500 p-3 rounded-xl">
              <Layout size={24} />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-bold block">إجمالي الفصول المتاحة</span>
              <span className="text-2xl font-black text-white">{totalChapters}</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
            <div className="bg-blue-600/10 text-blue-500 p-3 rounded-xl">
              <FileText size={24} />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-bold block">إجمالي الصفحات والدروس</span>
              <span className="text-2xl font-black text-white">{totalPages}</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
            <div className="bg-amber-600/10 text-amber-500 p-3 rounded-xl">
              <Sparkles size={24} />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-bold block">الدروس المخصصة المضافة</span>
              <span className="text-2xl font-black text-white">{customPages.length}</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: ADD CHAPTER (إضافة فصل) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6" id="add-chapter-section">
          <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
            <Plus size={18} className="text-red-500" />
            <span>إضافة فصل جديد إلى فهرس الكتاب</span>
          </h3>

          <form onSubmit={submitChapter} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 font-bold block mb-1">اسم الفصل (العنوان بالعربية)</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: الفصل الرابع - السفر والمطارات"
                  value={newChTitle}
                  onChange={(e) => setNewChTitle(e.target.value)}
                  className="w-full bg-slate-950 text-white rounded-lg border border-slate-800 focus:outline-none focus:border-red-500 p-2.5 text-xs md:text-sm text-right"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-bold block mb-1">وصف الفصل المقتضب</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: يركز هذا الفصل على تعبيرات الطيران، تذاكر السفر والحديث مع موظف الجمارك."
                  value={newChDesc}
                  onChange={(e) => setNewChDesc(e.target.value)}
                  className="w-full bg-slate-950 text-white rounded-lg border border-slate-800 focus:outline-none focus:border-red-500 p-2.5 text-xs md:text-sm text-right"
                />
              </div>
            </div>

            {/* Icon Selector Grid */}
            <div>
              <label className="text-xs text-slate-400 font-bold block mb-1.5">اختر أيقونة الفصل التوضيحية</label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {availableIcons.map((ic) => (
                  <button
                    key={ic.name}
                    type="button"
                    onClick={() => setNewChIcon(ic.name)}
                    className={`p-2 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      newChIcon === ic.name
                        ? "bg-red-600/20 border-red-500 text-white font-bold"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <span className="text-xs">{ic.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs md:text-sm rounded-lg shadow-md hover:shadow-red-900/30 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus size={16} />
                <span>إضافة هذا الفصل للكتب</span>
              </button>

              {chSuccessMsg && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold animate-pulse">
                  <CheckCircle size={15} />
                  <span>{chSuccessMsg}</span>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* SECTION 2: SOPHISTICATED HTML PAGE EDITOR & LIVE SIDE-BY-SIDE PREVIEW */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6" id="add-page-editor-section">
          <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
            <Code size={18} className="text-emerald-500" />
            <span>محرر أكواد HTML الذكي لإنشاء درس تفاعلي</span>
          </h3>

          <form onSubmit={submitPage} className="space-y-6">
            {/* Title & Chapter selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 font-bold block mb-1">اسم الصفحة / عنوان الدرس</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: الدرس 4 - محادثة سيارة الأجرة"
                  value={newPgTitle}
                  onChange={(e) => setNewPgTitle(e.target.value)}
                  className="w-full bg-slate-950 text-white rounded-lg border border-slate-800 focus:outline-none focus:border-emerald-500 p-2.5 text-xs md:text-sm text-right"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-bold block mb-1">أضف هذه الصفحة تحت أي فصل؟</label>
                <select
                  value={newPgChapterId}
                  onChange={(e) => setNewPgChapterId(e.target.value)}
                  className="w-full bg-slate-950 text-white rounded-lg border border-slate-800 focus:outline-none focus:border-emerald-500 p-2.5 text-xs md:text-sm text-right"
                >
                  {chapters.map((ch) => (
                    <option key={ch.id} value={ch.id} className="text-slate-900">
                      {ch.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Smart Presets Widgets */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-300 font-bold block mb-2 flex items-center gap-1 text-emerald-400">
                <Sparkles size={13} />
                <span>المساعد السريع: اختر نموذج كود تفاعلي جاهز للتعديل عليه</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PRESET_HTML_TEMPLATES.map((tmpl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => insertTemplate(tmpl.html)}
                    className="p-3 bg-slate-900 border border-slate-800 hover:border-emerald-500 rounded-xl text-right transition-all cursor-pointer group hover:scale-99"
                  >
                    <span className="text-xs md:text-sm font-bold text-white block group-hover:text-emerald-400">{tmpl.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal mt-1 block leading-normal">{tmpl.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* INTERACTIVE QUIZ BUILDER PANEL */}
            <div className="bg-slate-950 p-4 md:p-5 rounded-xl border border-slate-800 space-y-4">
              <span className="text-xs text-slate-300 font-bold block mb-1 flex items-center gap-1.5 text-amber-400">
                <HelpIcon size={14} className="text-amber-500" />
                <span>أداة بناء وإنشاء اختبار تفاعلي (Quiz Builder)</span>
              </span>
              <p className="text-[11px] text-slate-400 leading-normal">
                املأ الفراغات أدناه لتوليد اختبار اختيار من متعدد احترافي بشكل تلقائي، ثم اضغط على زر الإدراج ليتم حقن كود الاختبار التفاعلي مباشرة في محرر الصفحة!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {/* Question */}
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold block">نص السؤال</label>
                  <input
                    type="text"
                    placeholder="مثال: ما معنى كلمة 'Grazie' في اللغة الإيطالية؟"
                    value={quizQuestion}
                    onChange={(e) => setQuizQuestion(e.target.value)}
                    className="w-full bg-slate-900 text-white rounded-lg border border-slate-800 focus:outline-none focus:border-amber-500 p-2.5 text-xs text-right"
                  />
                </div>

                {/* Speech Toggle */}
                <div className="flex items-center gap-2.5 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 justify-between self-end h-[38px]">
                  <span className="text-[10px] text-slate-300 font-semibold block">تمكين نطق الخيارات صوتياً عند الضغط عليها؟</span>
                  <input
                    type="checkbox"
                    checked={quizSpeakOptions}
                    onChange={(e) => setQuizSpeakOptions(e.target.checked)}
                    className="w-4 h-4 text-amber-500 bg-slate-950 rounded border-slate-800 focus:ring-amber-500 focus:ring-1"
                  />
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold block flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    <span>الخيار الأول (مطلوب)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: شكراً لك"
                    value={quizChoice1}
                    onChange={(e) => setQuizChoice1(e.target.value)}
                    className="w-full bg-slate-900 text-white rounded-lg border border-slate-800 focus:outline-none focus:border-amber-500 p-2.5 text-xs text-right"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold block flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    <span>الخيار الثاني (مطلوب)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: من فضلك"
                    value={quizChoice2}
                    onChange={(e) => setQuizChoice2(e.target.value)}
                    className="w-full bg-slate-900 text-white rounded-lg border border-slate-800 focus:outline-none focus:border-amber-500 p-2.5 text-xs text-right"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold block">الخيار الثالث (اختياري)</label>
                  <input
                    type="text"
                    placeholder="مثال: مرحباً"
                    value={quizChoice3}
                    onChange={(e) => setQuizChoice3(e.target.value)}
                    className="w-full bg-slate-900 text-white rounded-lg border border-slate-800 focus:outline-none focus:border-amber-500 p-2.5 text-xs text-right"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold block">الخيار الرابع (اختياري)</label>
                  <input
                    type="text"
                    placeholder="مثال: مع السلامة"
                    value={quizChoice4}
                    onChange={(e) => setQuizChoice4(e.target.value)}
                    className="w-full bg-slate-900 text-white rounded-lg border border-slate-800 focus:outline-none focus:border-amber-500 p-2.5 text-xs text-right"
                  />
                </div>
              </div>

              {/* Correct answer index & Feedback */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                {/* Correct Choice Radio Grid */}
                <div>
                  <label className="text-[10px] text-slate-400 font-bold block mb-1.5">حدد الإجابة الصحيحة:</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[0, 1, 2, 3].map((idx) => {
                      const isDisabled = (idx === 2 && !quizChoice3.trim()) || (idx === 3 && !quizChoice4.trim());
                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={isDisabled}
                          onClick={() => setQuizCorrectIndex(idx)}
                          className={`py-1.5 text-center text-xs font-bold rounded-lg border transition-all ${
                            isDisabled
                              ? "bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed"
                              : quizCorrectIndex === idx
                              ? "bg-emerald-600/20 border-emerald-500 text-emerald-400"
                              : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                          }`}
                        >
                          خيار {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Positive feedback */}
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold block">رسالة تظهر عند الإجابة الصحيحة</label>
                  <input
                    type="text"
                    placeholder="مثال: رائع! Grazie تعني شكراً لك. 🌟"
                    value={quizFeedbackCorrect}
                    onChange={(e) => setQuizFeedbackCorrect(e.target.value)}
                    className="w-full bg-slate-900 text-white rounded-lg border border-slate-800 focus:outline-none focus:border-amber-500 p-2.5 text-xs text-right"
                  />
                </div>

                {/* Negative feedback */}
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold block">رسالة تظهر عند الإجابة الخاطئة</label>
                  <input
                    type="text"
                    placeholder="مثال: خطأ، حاول مجدداً! تذكر أن Prego هي من فضلك."
                    value={quizFeedbackWrong}
                    onChange={(e) => setQuizFeedbackWrong(e.target.value)}
                    className="w-full bg-slate-900 text-white rounded-lg border border-slate-800 focus:outline-none focus:border-amber-500 p-2.5 text-xs text-right"
                  />
                </div>
              </div>

              {/* Action and success message */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleInsertQuizToEditor}
                  className="w-full sm:w-auto px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-98 cursor-pointer"
                >
                  <PlusCircle size={15} />
                  <span>توليد كود الاختبار وإدراجه في المحرر</span>
                </button>

                {quizBuilderSuccessMsg && (
                  <span className="text-[11px] text-emerald-400 font-bold animate-pulse">
                    {quizBuilderSuccessMsg}
                  </span>
                )}
              </div>
            </div>

            {/* Dual Panel Workspace: Editor and Real-time Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* HTML Editor Panel */}
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold px-1 mb-1">
                  <span>اكتب كود HTML المخصص لصفحة الدرس</span>
                  <span className="font-mono text-[10px] text-emerald-500">&lt;HTML Editor&gt;</span>
                </div>
                <div className="relative flex-1">
                  <textarea
                    required
                    rows={16}
                    value={newPgHtml}
                    onChange={(e) => setNewPgHtml(e.target.value)}
                    className="w-full bg-slate-950 text-emerald-400 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 p-4 text-xs font-mono text-left leading-relaxed whitespace-pre"
                    style={{ direction: "ltr" }}
                    placeholder="اكتب كود HTML تفاعلي هنا..."
                  />
                  <div className="absolute bottom-2 right-2 text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-2 py-1 rounded font-mono select-none">
                    {newPgHtml.length} حرف
                  </div>
                </div>
              </div>

              {/* LIVE SIDE-BY-SIDE PREVIEW */}
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold px-1 mb-1">
                  <span className="flex items-center gap-1 text-amber-500">
                    <Eye size={13} />
                    <span>معاينة كود الصفحة الحية التفاعلية (Live Preview)</span>
                  </span>
                  {previewSpeakingText && (
                    <span className="text-[10px] text-emerald-400 animate-pulse font-mono flex items-center gap-1">
                      🗣️ ينطق: {previewSpeakingText}
                    </span>
                  )}
                </div>

                {/* Simulated Paper Book Preview Frame */}
                <div 
                  className="flex-1 bg-[#FAF6EE] text-slate-800 p-5 rounded-xl border border-amber-900/10 min-h-[350px] shadow-inner overflow-y-auto max-h-[384px] text-right"
                  dir="rtl"
                >
                  {/* Decorative preview flag */}
                  <div className="text-[10px] bg-amber-900/5 text-amber-900 border border-amber-950/10 px-2 py-1 rounded-full inline-flex items-center gap-1 font-bold mb-4">
                    <Play size={10} className="text-emerald-600 animate-pulse" />
                    <span>وضع المعاينة النشطة (اضغط لتجربة نطق العبارات أو حل الأسئلة!)</span>
                  </div>

                  {/* Header Title */}
                  <h2 className="text-xl md:text-2xl font-black text-slate-950 mb-4">{newPgTitle || "عنوان الدرس المباشر سيظهر هنا"}</h2>

                  {/* HTML Container */}
                  <div
                    ref={previewContentRef}
                    onClick={handlePreviewClick}
                    dangerouslySetInnerHTML={{ __html: newPgHtml || "<p class='text-slate-400 text-center py-10'>الكود فارغ حالياً، اكتب كود HTML أو اختر قالباً جاهزاً من الأعلى.</p>" }}
                    className="prose max-w-none text-slate-800 leading-relaxed text-xs md:text-sm space-y-3 font-sans select-none"
                  />
                </div>
              </div>
            </div>

            {/* Form actions */}
            <div className="flex justify-between items-center pt-3 border-t border-slate-800">
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs md:text-sm rounded-xl shadow-lg hover:shadow-emerald-950/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Save size={16} />
                <span>حفظ ونشر الصفحة داخل الكتاب التفاعلي</span>
              </button>

              {pgSuccessMsg && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold animate-pulse">
                  <CheckCircle size={15} />
                  <span>{pgSuccessMsg}</span>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* SECTION 3: MANAGE CUSTOM CREATED PAGES */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 animate-fade-in" id="manage-custom-pages">
          <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
            <Trash2 size={18} className="text-amber-500" />
            <span>إدارة الدروس المخصصة التي تمت إضافتها</span>
          </h3>

          {customPages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customPages.map((page) => {
                const parentChapter = chapters.find((ch) => ch.id === page.chapterId);
                return (
                  <div
                    key={page.id}
                    className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[10px] bg-slate-900 border border-slate-800 text-emerald-500 px-2 py-0.5 rounded font-bold">
                        {parentChapter?.title || "فصل غير معروف"}
                      </span>
                      <h4 className="font-bold text-white text-xs md:text-sm mt-1">{page.title}</h4>
                      <p className="text-[10px] text-slate-500 font-mono mt-1">ID: {page.id}</p>
                    </div>

                    <button
                      onClick={() => onDeletePage(page.id)}
                      className="p-2.5 bg-red-600/10 hover:bg-red-600 hover:text-white text-red-500 rounded-lg transition-all cursor-pointer"
                      title="حذف هذه الصفحة بشكل نهائي"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 text-xs md:text-sm border border-dashed border-slate-800 rounded-xl bg-slate-950/40">
              <AlertCircle size={22} className="mx-auto text-slate-600 mb-2" />
              <p>لا توجد أي صفحات مخصصة مضافة حالياً في الكتاب.</p>
              <p className="text-xs text-slate-600 mt-1">الدروس الحالية هي الدروس الافتراضية للغة الإيطالية المدمجة مسبقاً.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
