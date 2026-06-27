/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import BookViewer from "./components/BookViewer";
import AdminDashboard from "./components/AdminDashboard";
import { Chapter, Page, Bookmark } from "./types";
import { INITIAL_CHAPTERS, INITIAL_PAGES } from "./data";
import { Lock, AlertCircle, X, Check } from "lucide-react";

export default function App() {
  // ---------------------------------------------
  // State Initialization from localStorage
  // ---------------------------------------------
  const [chapters, setChapters] = useState<Chapter[]>(() => {
    const saved = localStorage.getItem("italiano_chapters");
    return saved ? JSON.parse(saved) : INITIAL_CHAPTERS;
  });

  const [pages, setPages] = useState<Page[]>(() => {
    const saved = localStorage.getItem("italiano_pages");
    return saved ? JSON.parse(saved) : INITIAL_PAGES;
  });

  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const saved = localStorage.getItem("italiano_bookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentPageId, setCurrentPageId] = useState<string>(() => {
    const saved = localStorage.getItem("italiano_current_page_id");
    return saved || "p-greetings";
  });

  // App layouts
  const [isAdmin, setIsAdmin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  // Save states to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("italiano_chapters", JSON.stringify(chapters));
  }, [chapters]);

  useEffect(() => {
    localStorage.setItem("italiano_pages", JSON.stringify(pages));
  }, [pages]);

  useEffect(() => {
    localStorage.setItem("italiano_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem("italiano_current_page_id", currentPageId);
  }, [currentPageId]);

  // Ensure current page ID actually exists, else fall back to first page
  useEffect(() => {
    if (pages.length > 0 && !pages.some((p) => p.id === currentPageId)) {
      setCurrentPageId(pages[0].id);
    }
  }, [pages, currentPageId]);

  // ---------------------------------------------
  // Navigation & Page flip Calculations
  // ---------------------------------------------
  const currentPageIndex = pages.findIndex((p) => p.id === currentPageId);
  const isFirstPage = currentPageIndex === 0;
  const isLastPage = currentPageIndex === pages.length - 1;

  const handleNextPage = () => {
    if (!isLastPage) {
      setCurrentPageId(pages[currentPageIndex + 1].id);
    }
  };

  const handlePrevPage = () => {
    if (!isFirstPage) {
      setCurrentPageId(pages[currentPageIndex - 1].id);
    }
  };

  const handleSelectPage = (pageId: string) => {
    const exists = pages.some((p) => p.id === pageId);
    if (exists) {
      setCurrentPageId(pageId);
    }
  };

  const handleToggleBookmark = (pageId: string) => {
    setBookmarks((prev) => {
      const isBookmarked = prev.some((b) => b.pageId === pageId);
      if (isBookmarked) {
        return prev.filter((b) => b.pageId !== pageId);
      } else {
        return [...prev, { pageId, bookmarkedAt: Date.now() }];
      }
    });
  };

  // ---------------------------------------------
  // Admin Operations
  // ---------------------------------------------
  const handleAddChapter = (newCh: Omit<Chapter, "id">) => {
    const id = `ch-${Date.now()}`;
    const chapterWithId: Chapter = { ...newCh, id };
    setChapters((prev) => [...prev, chapterWithId]);
  };

  const handleAddPage = (newPg: Omit<Page, "id">) => {
    const id = `p-${Date.now()}`;
    const pageWithId: Page = { ...newPg, id };
    setPages((prev) => [...prev, pageWithId]);
  };

  const handleDeletePage = (pageId: string) => {
    setPages((prev) => prev.filter((p) => p.id !== pageId));
    // If deleted page was the current active page, point to the first page
    if (currentPageId === pageId) {
      const remaining = pages.filter((p) => p.id !== pageId);
      if (remaining.length > 0) {
        setCurrentPageId(remaining[0].id);
      }
    }
    // Also remove from bookmarks
    setBookmarks((prev) => prev.filter((b) => b.pageId !== pageId));
  };

  const handleResetToDefault = () => {
    if (window.confirm("هل أنت متأكد من رغبتك في إعادة تهيئة محتوى الكتاب التفاعلي وحذف الفصول والصفحات المخصصة؟")) {
      setChapters(INITIAL_CHAPTERS);
      setPages(INITIAL_PAGES);
      setBookmarks([]);
      setCurrentPageId("p-greetings");
      setIsAdmin(false);
      alert("تمت إعادة تهيئة الكتاب إلى حالته الافتراضية بنجاح! 🇮🇹");
    }
  };

  // ---------------------------------------------
  // Admin Login Security Handlers
  // ---------------------------------------------
  const handleOpenAdminClick = () => {
    if (isAdmin) {
      // Toggle back to user view if already logged in
      setIsAdmin(false);
    } else {
      setShowLoginModal(true);
      setPasswordInput("");
      setLoginError("");
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Prompt requested: عند ضغط عليا ادخال كلمة مرور دخول الى داش بور متطور
    // Let's use 'admin' as default password, and also allow '123456' for simplicity!
    if (passwordInput === "admin" || passwordInput === "123456" || passwordInput === "إيطاليا") {
      setIsAdmin(true);
      setShowLoginModal(false);
      setLoginError("");
    } else {
      setLoginError("كلمة المرور غير صحيحة! جرب كلمة 'admin' للدخول.");
    }
  };

  // ---------------------------------------------
  // Computed variables for viewer
  // ---------------------------------------------
  const activePage = pages.find((p) => p.id === currentPageId) || pages[0];
  const activeChapter = activePage ? chapters.find((ch) => ch.id === activePage.chapterId) : undefined;
  const pagesInActiveChapter = activeChapter ? pages.filter((p) => p.chapterId === activeChapter.id) : [];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none overflow-x-hidden">
      {/* Dynamic Navbar */}
      <Navbar
        pages={pages}
        bookmarks={bookmarks}
        currentPageId={currentPageId}
        onSelectPage={handleSelectPage}
        onToggleBookmark={handleToggleBookmark}
        onOpenAdmin={handleOpenAdminClick}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isAdmin={isAdmin}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:flex-row relative">
        {isAdmin ? (
          /* Advanced Admin Dashboard Workspace */
          <AdminDashboard
            chapters={chapters}
            pages={pages}
            onAddChapter={handleAddChapter}
            onAddPage={handleAddPage}
            onDeletePage={handleDeletePage}
            onClose={() => setIsAdmin(false)}
          />
        ) : (
          /* Book Viewer and Reader Workspace */
          <div className="flex-1 flex flex-col lg:flex-row w-full">
            {/* Index/Sidebar for chapters & pages (Right-aligned in RTL) */}
            <Sidebar
              chapters={chapters}
              pages={pages}
              currentPageId={currentPageId}
              onSelectPage={handleSelectPage}
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              onResetData={handleResetToDefault}
            />

            {/* Core textbook page viewer */}
            {activePage ? (
              <BookViewer
                activePage={activePage}
                activeChapter={activeChapter}
                pagesInChapter={pagesInActiveChapter}
                onNextPage={handleNextPage}
                onPrevPage={handlePrevPage}
                onSelectPage={handleSelectPage}
                isFirstPage={isFirstPage}
                isLastPage={isLastPage}
              />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-100">
                <AlertCircle className="text-red-500 w-12 h-12 mb-3" />
                <h3 className="font-bold text-lg text-slate-800">لا توجد صفحات مضافة في هذا الكتاب</h3>
                <p className="text-xs text-slate-500 mt-1">اضغط على زر "دخول المدير" بالأعلى لإضافة فصول وصفحات جديدة.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Password Authorization Admin Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-slate-950/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs" dir="rtl" id="login-modal">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-red-600 rounded-lg">
                  <Lock size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-sm md:text-base">تأكيد صلاحية الدخول للوحة التحكم</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">خاصة بمعلم المادة أو منشئ المحتوى</p>
                </div>
              </div>
              <button
                onClick={() => setShowLoginModal(false)}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                الرجاء إدخال كلمة المرور السرية لفتح لوحة التحكم المتقدمة. تتيح لك لوحة التحكم إضافة فصول جديدة وتعديل صفحات الكتاب ومحرر الأكواد.
              </p>

              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-xl text-xs flex items-center gap-2 font-semibold">
                <Check size={14} className="text-amber-700 shrink-0" />
                <span>كلمة المرور الافتراضية للتجربة هي: <strong className="font-mono bg-white px-1.5 py-0.5 rounded border border-amber-300">admin</strong></span>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">كلمة المرور</label>
                <input
                  type="password"
                  required
                  autoFocus
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 border border-slate-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-lg p-2.5 text-center font-mono text-sm tracking-widest"
                />
              </div>

              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2 font-bold animate-shake">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs md:text-sm rounded-lg shadow-sm transition-all cursor-pointer active:scale-98"
                >
                  تأكيد الدخول
                </button>
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs md:text-sm rounded-lg transition-all cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
