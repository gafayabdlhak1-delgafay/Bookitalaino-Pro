/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import * as Icons from "lucide-react";
import { Chapter, Page } from "../types";

interface SidebarProps {
  chapters: Chapter[];
  pages: Page[];
  currentPageId: string;
  onSelectPage: (pageId: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onResetData?: () => void;
}

export default function Sidebar({
  chapters,
  pages,
  currentPageId,
  onSelectPage,
  isOpen,
  onClose,
  onResetData
}: SidebarProps) {
  // Track expanded chapters (all open by default for easier exploration)
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({
    "ch-basics": true,
    "ch-grammar": true,
    "ch-daily": true
  });

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  // Helper to render Lucide Icons dynamically by name string
  const renderIcon = (name: string) => {
    const IconComponent = (Icons as any)[name];
    if (IconComponent) {
      return <IconComponent size={18} className="text-emerald-600 shrink-0" />;
    }
    return <Icons.BookOpen size={18} className="text-emerald-600 shrink-0" />;
  };

  return (
    <>
      {/* Mobile Sidebar Overlay Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* Sidebar Container (Floated Right for RTL layout) */}
      <aside
        className={`fixed top-16 bottom-0 right-0 w-72 bg-slate-50 border-l border-slate-200 z-45 transition-transform duration-300 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
        dir="rtl"
        id="book-sidebar"
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-900 text-sm md:text-base flex items-center gap-1.5">
              <span>فهرس فصول الكتاب</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {chapters.length} وحدات
              </span>
            </h2>
            <p className="text-[10px] text-slate-500 mt-1">اختر الفصل والوحدة لبدء التعلم</p>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 hover:bg-slate-100 rounded text-slate-500"
            aria-label="إغلاق القائمة"
          >
            <Icons.X size={18} />
          </button>
        </div>

        {/* Chapters & Pages Lists */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
          {chapters.map((chapter) => {
            const isExpanded = expandedChapters[chapter.id];
            const chapterPages = pages.filter((page) => page.chapterId === chapter.id);

            return (
              <div
                key={chapter.id}
                className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-xs hover:border-slate-300 transition-all"
              >
                {/* Chapter Title Trigger */}
                <button
                  onClick={() => toggleChapter(chapter.id)}
                  className="w-full p-3.5 flex items-center justify-between text-right font-bold text-slate-800 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    {renderIcon(chapter.iconName)}
                    <div>
                      <span className="text-xs md:text-sm text-slate-900 block font-semibold leading-tight">{chapter.title}</span>
                      <span className="text-[10px] text-slate-400 font-normal mt-0.5 block line-clamp-1">
                        {chapter.description}
                      </span>
                    </div>
                  </div>
                  {isExpanded ? (
                    <Icons.ChevronDown size={16} className="text-slate-400" />
                  ) : (
                    <Icons.ChevronLeft size={16} className="text-slate-400" />
                  )}
                </button>

                {/* Pages sub-menu */}
                {isExpanded && (
                  <div className="bg-white px-2 py-1.5 divide-y divide-slate-100">
                    {chapterPages.length > 0 ? (
                      chapterPages.map((page, index) => {
                        const isActive = page.id === currentPageId;
                        return (
                          <button
                            key={page.id}
                            onClick={() => {
                              onSelectPage(page.id);
                              // close sidebar on mobile after clicking
                              if (window.innerWidth < 1024) {
                                onClose();
                              }
                            }}
                            className={`w-full py-2 px-3 my-0.5 rounded-lg text-right text-xs md:text-sm font-medium flex items-center gap-2 transition-all cursor-pointer ${
                              isActive
                                ? "bg-emerald-600 text-white shadow-xs font-bold"
                                : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
                            }`}
                          >
                            <span className={`text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold ${
                              isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                            }`}>
                              {index + 1}
                            </span>
                            <span className="truncate leading-none">{page.title}</span>
                            {page.isCustom && (
                              <span className="text-[9px] bg-amber-500 text-slate-950 px-1 py-0.2 rounded font-extrabold leading-none mr-auto">
                                مخصص
                              </span>
                            )}
                          </button>
                        );
                      })
                    ) : (
                      <div className="p-3 text-center text-slate-400 text-xs">
                        لا توجد صفحات في هذا الفصل بعد.
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sidebar Footer with Reset */}
        {onResetData && (
          <div className="p-3 bg-white border-t border-slate-200 mt-auto">
            <button
              onClick={onResetData}
              className="w-full py-2 px-3 text-xs text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 font-bold rounded-lg border border-red-200/50 transition-colors cursor-pointer flex items-center justify-center gap-1"
            >
              <Icons.RotateCcw size={13} />
              <span>إعادة تهيئة الكتاب الافتراضي</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
