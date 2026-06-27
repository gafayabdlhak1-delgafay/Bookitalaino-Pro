/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronLeft, Volume2, BookOpen, BookMarked, HelpCircle, Play, Pause, Square } from "lucide-react";
import { Page, Chapter } from "../types";
import Quiz from "./Quiz";

interface BookViewerProps {
  activePage: Page;
  activeChapter: Chapter | undefined;
  pagesInChapter: Page[];
  onNextPage: () => void;
  onPrevPage: () => void;
  onSelectPage: (pageId: string) => void;
  isFirstPage: boolean;
  isLastPage: boolean;
}

export default function BookViewer({
  activePage,
  activeChapter,
  pagesInChapter,
  onNextPage,
  onPrevPage,
  onSelectPage,
  isFirstPage,
  isLastPage,
}: BookViewerProps) {
  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const [animationDirection, setAnimationDirection] = useState<"next" | "prev">("next");
  const contentRef = useRef<HTMLDivElement>(null);

  // Text to Speech states
  const [speechRate, setSpeechRate] = useState<number>(() => {
    const saved = localStorage.getItem("italiano_speech_rate");
    return saved ? parseFloat(saved) : 1.0;
  });
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [isPausedAll, setIsPausedAll] = useState(false);
  const [currentSpeakingIndex, setCurrentSpeakingIndex] = useState<number>(-1);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  const elementsRef = useRef<HTMLElement[]>([]);
  const currentIndexRef = useRef<number>(-1);
  const isPlayingRef = useRef<boolean>(false);

  // Listen for voices loaded asynchronously
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const handleVoicesChanged = () => {
        setVoicesLoaded(prev => !prev);
      };
      window.speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged);
      return () => {
        window.speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged);
      };
    }
  }, []);

  // Save speech rate to localStorage
  useEffect(() => {
    localStorage.setItem("italiano_speech_rate", speechRate.toString());
  }, [speechRate]);

  // Clean up and stop speech if page changes or component unmounts
  useEffect(() => {
    stopAll();
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activePage.id]);

  const stopAll = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    // Remove highlights from the currently active speech element
    if (currentIndexRef.current >= 0 && elementsRef.current[currentIndexRef.current]) {
      const el = elementsRef.current[currentIndexRef.current];
      const classesToInject = ["ring-4", "ring-emerald-500/60", "bg-emerald-50/80", "scale-[1.015]", "shadow-sm", "transition-all", "duration-300"];
      classesToInject.forEach(cls => el.classList.remove(cls));
    }
    setIsPlayingAll(false);
    setIsPausedAll(false);
    setCurrentSpeakingIndex(-1);
    currentIndexRef.current = -1;
    isPlayingRef.current = false;
    setSpeakingText(null);
  };

  const pauseAll = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.pause();
      setIsPausedAll(true);
    }
  };

  const resumeAll = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.resume();
      setIsPausedAll(false);
    }
  };

  const getSpeakableElements = (): HTMLElement[] => {
    if (!contentRef.current) return [];
    
    // First try finding elements with data-speak attribute
    const speakEls = Array.from(contentRef.current.querySelectorAll("[data-speak]")) as HTMLElement[];
    if (speakEls.length > 0) {
      return speakEls;
    }
    
    // Fallback: collect paragraphs or lists containing content
    const textEls = Array.from(contentRef.current.querySelectorAll("p, li, h2, h3, h4")) as HTMLElement[];
    return textEls.filter(el => {
      const text = el.innerText?.trim();
      if (!text) return false;
      // Exclude elements inside quiz block or nav buttons
      if (el.closest("[data-quiz-option]") || el.closest("[data-nav-page]") || el.closest(".bg-amber-50")) {
        return false;
      }
      return true;
    });
  };

  const speakElementAtIndex = (index: number) => {
    if (index < 0 || index >= elementsRef.current.length) {
      // Finished reading the entire page
      stopAll();
      return;
    }

    // Remove highlight from previous
    if (currentIndexRef.current >= 0 && elementsRef.current[currentIndexRef.current]) {
      const prevEl = elementsRef.current[currentIndexRef.current];
      const classesToInject = ["ring-4", "ring-emerald-500/60", "bg-emerald-50/80", "scale-[1.015]", "shadow-sm", "transition-all", "duration-300"];
      classesToInject.forEach(cls => prevEl.classList.remove(cls));
    }

    setCurrentSpeakingIndex(index);
    currentIndexRef.current = index;

    const el = elementsRef.current[index];
    if (!el) return;

    // Scroll element smoothly into view
    el.scrollIntoView({ behavior: "smooth", block: "center" });

    // Add highlight classes
    const classesToInject = ["ring-4", "ring-emerald-500/60", "bg-emerald-50/80", "scale-[1.015]", "shadow-sm", "transition-all", "duration-300"];
    classesToInject.forEach(cls => el.classList.add(cls));

    // Get the text to speak
    let text = el.getAttribute("data-speak") || el.innerText || "";
    // Strip emojis and helper tags
    text = text.replace(/🔊/g, "").replace(/انقر للنطق/g, "").trim();

    setSpeakingText(text);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "it-IT";
    utterance.rate = speechRate;

    // Use Italian voice
    const voices = window.speechSynthesis.getVoices();
    const italianVoice = voices.find(v => v.lang.toLowerCase() === "it-it") || 
                       voices.find(v => v.lang.startsWith("it"));
    if (italianVoice) {
      utterance.voice = italianVoice;
    }

    utterance.onend = () => {
      if (isPlayingRef.current) {
        speakElementAtIndex(index + 1);
      }
    };

    utterance.onerror = (err) => {
      if (err.error !== "interrupted" && err.error !== "canceled") {
        console.warn("Speech Synthesis Warning/Error:", err.error);
      }
      if (isPlayingRef.current) {
        speakElementAtIndex(index + 1);
      } else {
        stopAll();
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const startPlayAll = () => {
    if (!("speechSynthesis" in window)) {
      alert("عذراً، متصفحك لا يدعم قراءة النصوص صوتياً.");
      return;
    }

    stopAll();

    const speakableEls = getSpeakableElements();
    if (speakableEls.length === 0) {
      alert("لا توجد نصوص قابلة للقراءة التلقائية في هذه الصفحة.");
      return;
    }

    elementsRef.current = speakableEls;
    setIsPlayingAll(true);
    isPlayingRef.current = true;
    setIsPausedAll(false);
    
    speakElementAtIndex(0);
  };

  // Handle TTS
  const speakItalian = (text: string) => {
    if ("speechSynthesis" in window) {
      // If we are auto-reading, stop it first
      if (isPlayingRef.current) {
        stopAll();
      }

      window.speechSynthesis.cancel();
      setSpeakingText(text);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "it-IT";
      utterance.rate = speechRate;

      const voices = window.speechSynthesis.getVoices();
      const italianVoice = voices.find(v => v.lang.toLowerCase() === "it-it") || 
                         voices.find(v => v.lang.startsWith("it"));
      if (italianVoice) {
        utterance.voice = italianVoice;
      }

      utterance.onend = () => {
        setSpeakingText(null);
      };

      utterance.onerror = () => {
        setSpeakingText(null);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      alert("عذراً، متصفحك لا يدعم قراءة النصوص صوتياً.");
    }
  };

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

    // Find and render all .react-quiz elements in contentRef
    if (contentRef.current) {
      const quizContainers = contentRef.current.querySelectorAll(".react-quiz");
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
          console.error("Error rendering Quiz inside container:", err);
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
  }, [activePage.id, activePage.contentHtml]);

  // Delegated click handler inside rendered page content HTML
  const handlePageContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    // 1. Voice Speech [data-speak]
    const speakEl = target.closest("[data-speak]");
    if (speakEl) {
      const text = speakEl.getAttribute("data-speak");
      if (text) {
        speakItalian(text);
      }
      return;
    }

    // 2. Page Navigation [data-nav-page]
    const navEl = target.closest("[data-nav-page]");
    if (navEl) {
      const pageId = navEl.getAttribute("data-nav-page");
      if (pageId) {
        onSelectPage(pageId);
      }
      return;
    }

    // 3. Quiz Buttons [data-quiz-option]
    const quizEl = target.closest("[data-quiz-option]");
    if (quizEl) {
      const option = quizEl.getAttribute("data-quiz-option");
      const feedback = quizEl.getAttribute("data-feedback") || "";
      
      const parentBlock = quizEl.parentElement?.parentElement;
      if (parentBlock) {
        const feedbackDiv = parentBlock.querySelector('[id^="quiz-feedback"]') as HTMLElement;
        if (feedbackDiv) {
          feedbackDiv.innerHTML = feedback;
          feedbackDiv.classList.remove("hidden");
          feedbackDiv.classList.add("block");
          if (option === "correct") {
            feedbackDiv.className = "mt-3 text-sm font-bold text-emerald-800 block text-center bg-emerald-100/90 py-2.5 rounded-lg border border-emerald-300 animate-pulse";
          } else {
            feedbackDiv.className = "mt-3 text-sm font-bold text-red-800 block text-center bg-red-100/90 py-2.5 rounded-lg border border-red-300";
          }
        }
      }
    }
  };

  // Drag Gesture (RTL drag: dragging left goes next, dragging right goes prev)
  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 60;
    if (info.offset.x > swipeThreshold) {
      setAnimationDirection("prev");
      onPrevPage();
    } else if (info.offset.x < -swipeThreshold) {
      setAnimationDirection("next");
      onNextPage();
    }
  };

  const handleNextClick = () => {
    setAnimationDirection("next");
    onNextPage();
  };

  const handlePrevClick = () => {
    setAnimationDirection("prev");
    onPrevPage();
  };

  // Determine current page index in chapter
  const indexInChapter = pagesInChapter.findIndex(p => p.id === activePage.id);
  const totalInChapter = pagesInChapter.length;

  return (
    <div className="flex-1 bg-slate-100 flex flex-col items-center justify-center py-6 px-4 md:px-8 relative overflow-hidden" dir="rtl">
      {/* Speaking Indicator overlay banner */}
      {speakingText && (
        <div className="absolute top-4 bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-20 animate-bounce">
          <Volume2 size={14} className="animate-pulse" />
          <span>ينطق الإيطالية الآن: "{speakingText}"</span>
          <div className="flex gap-0.5 items-center">
            <span className="w-1 h-3 bg-white rounded-full animate-pulse"></span>
            <span className="w-1 h-4.5 bg-white rounded-full animate-pulse delay-75"></span>
            <span className="w-1 h-2 bg-white rounded-full animate-pulse delay-150"></span>
          </div>
        </div>
      )}

      {/* Manual Drag Turning Hint */}
      <p className="text-[10px] text-slate-400 mb-2 select-none pointer-events-none hidden md:block">
        💡 يمكنك سحب الورقة لليمين أو اليسار بيدك لتمرير الصفحة تفاعلياً، أو استخدام الأزرار الجانبية.
      </p>

      {/* Main Open Book Mockup */}
      <div className="w-full max-w-3xl relative">
        
        {/* Left & Right navigation triggers (Floating arrows) */}
        <div className="absolute -right-4 md:-right-14 top-1/2 -translate-y-1/2 z-10">
          <button
            onClick={handlePrevClick}
            disabled={isFirstPage}
            className={`p-3 rounded-full shadow-md bg-white border border-slate-200 text-slate-700 transition-all cursor-pointer ${
              isFirstPage ? "opacity-30 cursor-not-allowed" : "hover:bg-slate-50 hover:text-emerald-600 hover:scale-110 active:scale-95"
            }`}
            title="الصفحة السابقة"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="absolute -left-4 md:-left-14 top-1/2 -translate-y-1/2 z-10">
          <button
            onClick={handleNextClick}
            disabled={isLastPage}
            className={`p-3 rounded-full shadow-md bg-white border border-slate-200 text-slate-700 transition-all cursor-pointer ${
              isLastPage ? "opacity-30 cursor-not-allowed" : "hover:bg-slate-50 hover:text-emerald-600 hover:scale-110 active:scale-95"
            }`}
            title="الصفحة التالية"
          >
            <ChevronLeft size={22} />
          </button>
        </div>

        {/* Book Container with elegant cream color and binding edge shadow */}
        <div className="bg-[#FAF6EE] min-h-[550px] rounded-2xl shadow-xl border border-amber-900/10 flex flex-col relative overflow-hidden ring-4 ring-amber-950/5">
          {/* Decorative Binder Spine (الفاصل بين الصفحات في الكتاب) */}
          <div className="absolute right-0 left-0 top-0 bottom-0 pointer-events-none flex justify-center z-15">
            <div className="w-1 h-full bg-gradient-to-r from-amber-950/5 via-amber-950/15 to-transparent"></div>
            <div className="w-[1px] h-full bg-amber-950/20"></div>
            <div className="w-1 h-full bg-gradient-to-l from-amber-950/5 via-amber-950/15 to-transparent"></div>
          </div>

          {/* Book Header info */}
          <div className="p-4 md:px-6 md:py-4 bg-[#FAF6EE] border-b border-amber-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none z-10">
            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
              <div className="flex items-center gap-2">
                <span className="text-emerald-700 text-xs font-bold font-mono">🇮🇹 {activeChapter?.title}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-amber-900/60 font-bold sm:hidden">
                <BookOpen size={13} />
                <span>{activePage.title}</span>
              </div>
            </div>

            {/* Smart Reading & Speech Controls */}
            <div className="flex items-center gap-3 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-amber-900/10 shadow-xs self-center sm:self-auto w-full sm:w-auto justify-between sm:justify-start">
              {/* Reading Speed Controls */}
              <div className="flex items-center gap-2 border-l border-amber-900/10 pl-3 shrink-0" dir="rtl">
                <span className="text-[10px] md:text-xs text-amber-900/70 font-bold">سرعة القراءة:</span>
                <select
                  value={speechRate}
                  onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                  className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-[11px] font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="0.5">0.5x (بطيء جداً)</option>
                  <option value="0.75">0.75x (بطيء)</option>
                  <option value="1.0">1.0x (طبيعي)</option>
                  <option value="1.25">1.25x (سريع)</option>
                  <option value="1.5">1.5x (سريع جداً)</option>
                  <option value="2.0">2.0x (مضاعف)</option>
                </select>
              </div>

              {/* Player control buttons */}
              <div className="flex items-center gap-2 shrink-0">
                {isPlayingAll ? (
                  <div className="flex items-center gap-1.5">
                    {isPausedAll ? (
                      <button
                        onClick={resumeAll}
                        className="p-1.5 bg-emerald-50 hover:bg-emerald-100 rounded-full text-emerald-600 transition-colors cursor-pointer flex items-center justify-center"
                        title="استئناف القراءة"
                      >
                        <Play size={14} fill="currentColor" />
                      </button>
                    ) : (
                      <button
                        onClick={pauseAll}
                        className="p-1.5 bg-amber-50 hover:bg-amber-100 rounded-full text-amber-600 transition-colors cursor-pointer flex items-center justify-center"
                        title="إيقاف مؤقت"
                      >
                        <Pause size={14} fill="currentColor" />
                      </button>
                    )}
                    <button
                      onClick={stopAll}
                      className="p-1.5 bg-red-50 hover:bg-red-100 rounded-full text-red-600 transition-colors cursor-pointer flex items-center justify-center"
                      title="إنهاء القراءة"
                    >
                      <Square size={14} fill="currentColor" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={startPlayAll}
                    className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-[10px] md:text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-xs"
                    title="استمع للدرس كاملاً بصوت إيطالي تفاعلي"
                  >
                    <Volume2 size={13} className="shrink-0 animate-pulse" />
                    <span>تشغيل القراءة التلقائية</span>
                  </button>
                )}
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-amber-900/60 font-bold shrink-0">
              <BookOpen size={13} />
              <span>{activePage.title}</span>
            </div>
          </div>

          {/* Animating page contents */}
          <div className="flex-1 flex flex-col p-6 md:p-10 relative overflow-hidden">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={activePage.id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                initial={{
                  opacity: 0,
                  x: animationDirection === "next" ? -200 : 200,
                  rotate: animationDirection === "next" ? -2 : 2
                }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                exit={{
                  opacity: 0,
                  x: animationDirection === "next" ? 200 : -200,
                  rotate: animationDirection === "next" ? 2 : -2
                }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                className="flex-1 flex flex-col cursor-grab active:cursor-grabbing select-text text-right"
                id="book-page-viewport"
              >
                {/* Italian Flag ribbon accent */}
                <div className="flex h-1.5 w-16 mb-4 rounded-full overflow-hidden self-start">
                  <div className="w-1/3 bg-[#009246]"></div>
                  <div className="w-1/3 bg-[#F1F2F1]"></div>
                  <div className="w-1/3 bg-[#CE2B37]"></div>
                </div>

                {/* Actual Lesson Title */}
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight mb-6 flex items-center gap-2">
                  <span className="bg-slate-900 text-white text-xs font-mono font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    {indexInChapter !== -1 ? indexInChapter + 1 : "★"}
                  </span>
                  <span>{activePage.title}</span>
                </h2>

                {/* Render HTML content containing tables, cards, quiz */}
                <div
                  ref={contentRef}
                  onClick={handlePageContentClick}
                  dangerouslySetInnerHTML={{ __html: activePage.contentHtml }}
                  className="prose max-w-none text-slate-800 leading-relaxed text-sm md:text-base space-y-4 font-sans select-text flex-1"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Book Footer (Page Numbers) */}
          <div className="p-4 bg-[#FAF6EE] border-t border-amber-900/5 flex items-center justify-between text-xs text-amber-900/60 font-semibold select-none z-10">
            <div>
              {indexInChapter !== -1 && (
                <span>الدرس {indexInChapter + 1} من {totalInChapter} في هذا الفصل</span>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              <span className="font-mono font-bold bg-amber-900/5 px-2 py-0.5 rounded-full">
                صفحة {pagesInChapter.findIndex(p => p.id === activePage.id) !== -1 ? pagesInChapter.findIndex(p => p.id === activePage.id) + 1 : "?"}
              </span>
            </div>
          </div>
        </div>

        {/* Realistic Book Spine/3D depth effect (3 layers) */}
        <div className="absolute right-3 left-3 h-2 bg-[#EADCC3] rounded-b-xl shadow-xs border-t border-amber-950/10 -bottom-2 z-[-1]"></div>
        <div className="absolute right-6 left-6 h-2 bg-[#DDCBB1] rounded-b-xl shadow-xs border-t border-amber-950/10 -bottom-4 z-[-2]"></div>
        <div className="absolute right-10 left-10 h-2 bg-[#D1BC9E] rounded-b-xl shadow-md border-t border-amber-950/10 -bottom-6 z-[-3]"></div>
      </div>
    </div>
  );
}
