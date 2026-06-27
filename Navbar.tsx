/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Search, Bookmark, User, BookOpen, Menu, BookmarkCheck, ChevronLeft, X } from "lucide-react";
import { Page, Bookmark as BookmarkType } from "../types";

interface NavbarProps {
  pages: Page[];
  bookmarks: BookmarkType[];
  currentPageId: string;
  onSelectPage: (pageId: string) => void;
  onToggleBookmark: (pageId: string) => void;
  onOpenAdmin: () => void;
  onToggleSidebar: () => void;
  isAdmin: boolean;
}

export default function Navbar({
  pages,
  bookmarks,
  currentPageId,
  onSelectPage,
  onToggleBookmark,
  onOpenAdmin,
  onToggleSidebar,
  isAdmin
}: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showBookmarksDropdown, setShowBookmarksDropdown] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const isCurrentBookmarked = bookmarks.some((b) => b.pageId === currentPageId);

  // Search logic across page title and content
  const filteredPages = searchQuery.trim()
    ? pages.filter(
        (page) =>
          page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          page.contentHtml.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchItemClick = (pageId: string) => {
    onSelectPage(pageId);
    setSearchQuery("");
    setShowSearchResults(false);
    setIsMobileSearchOpen(false);
  };

  const bookmarkedPages = pages.filter((p) =>
    bookmarks.some((b) => b.pageId === p.id)
  );

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-40 shadow-md border-b-2 border-emerald-600" id="app-navbar">
      {isMobileSearchOpen ? (
        /* Full-Width Mobile Search Bar Overlay */
        <div className="max-w-7xl mx-auto px-3 h-16 flex items-center gap-2" dir="rtl">
          <button
            onClick={() => {
              setIsMobileSearchOpen(false);
              setSearchQuery("");
              setShowSearchResults(false);
            }}
            className="p-2 hover:bg-slate-800 text-slate-300 rounded-lg cursor-pointer shrink-0"
            title="إلغاء البحث"
            id="close-mobile-search-btn"
          >
            <ChevronLeft size={20} className="rotate-180" />
          </button>
          
          <div className="relative flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن كلمة، قاعدة، درس..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
                className="w-full bg-slate-800 text-white text-xs pl-3 pr-9 py-2 rounded-full border border-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-right"
                dir="rtl"
                id="search-input-mobile"
                autoFocus
              />
              <Search className="absolute right-3 top-2.5 text-slate-400" size={15} />
            </div>

            {/* Mobile Search Results Dropdown */}
            {showSearchResults && searchQuery && (
              <div className="absolute right-0 left-0 mt-2 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-100 max-h-72 overflow-y-auto z-50 text-right">
                <div className="p-2 border-b bg-slate-50 text-slate-500 text-xs font-bold">
                  نتائج البحث ({filteredPages.length})
                </div>
                {filteredPages.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {filteredPages.map((page) => (
                      <button
                        key={page.id}
                        onClick={() => handleSearchItemClick(page.id)}
                        className="w-full p-3 hover:bg-emerald-50 flex items-center justify-between text-right cursor-pointer"
                      >
                        <ChevronLeft size={14} className="text-slate-400" />
                        <div>
                          <div className="font-semibold text-xs text-slate-950">{page.title}</div>
                          <div className="text-[11px] text-slate-500 truncate max-w-[200px] mt-0.5">
                            {page.contentHtml.replace(/<[^>]*>/g, "").slice(0, 45)}...
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-slate-400 text-xs">
                    لا توجد نتائج مطابقة لـ "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Normal Layout with Sidebar toggle, Brand Title, Search Icon, Bookmarks and Login button */
        <div className="max-w-7xl mx-auto px-3 sm:px-4 h-16 flex items-center justify-between">
          {/* Right Side: Toggle & Title (RTL Arabic app) */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              onClick={onToggleSidebar}
              className="p-2 hover:bg-slate-800 rounded-lg lg:hidden text-emerald-400 cursor-pointer"
              aria-label="قائمة الفصول"
              id="sidebar-toggle-btn"
            >
              <Menu size={20} className="sm:w-[24px] sm:h-[24px]" />
            </button>
            
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="bg-emerald-600 text-white p-1 sm:p-1.5 rounded-lg shrink-0">
                <BookOpen size={16} className="sm:w-[20px] sm:h-[20px] animate-pulse" />
              </div>
              <div>
                <h1 className="font-bold text-sm sm:text-base md:text-lg tracking-tight font-sans flex items-center gap-1">
                  <span>إيطاليانو</span>
                  <span className="bg-emerald-500/20 text-emerald-400 text-[9px] sm:text-xs font-mono border border-emerald-500/30 px-1 rounded">IT</span>
                </h1>
                <p className="text-[9px] text-slate-400 hidden md:block">الكتاب التفاعلي لتعلم اللغة الإيطالية</p>
              </div>
            </div>
          </div>

          {/* Center: Search input (Visible on sm/md and above) */}
          <div className="relative max-w-xs md:max-w-sm w-full mx-4 hidden sm:block">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن كلمة، قاعدة، درس..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
                className="w-full bg-slate-800 text-white text-xs md:text-sm pl-3 pr-9 py-2 rounded-full border border-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-right"
                dir="rtl"
                id="search-input"
              />
              <Search className="absolute right-3 top-2.5 text-slate-400" size={16} />
            </div>

            {/* Desktop Search Results Dropdown */}
            {showSearchResults && searchQuery && (
              <div className="absolute right-0 left-0 mt-2 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-100 max-h-60 overflow-y-auto z-50 text-right">
                <div className="p-2 border-b bg-slate-50 text-slate-500 text-xs font-bold">
                  نتائج البحث ({filteredPages.length})
                </div>
                {filteredPages.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {filteredPages.map((page) => (
                      <button
                        key={page.id}
                        onClick={() => handleSearchItemClick(page.id)}
                        className="w-full p-3 hover:bg-emerald-50 flex items-center justify-between text-right cursor-pointer"
                      >
                        <ChevronLeft size={14} className="text-slate-400" />
                        <div>
                          <div className="font-semibold text-xs md:text-sm text-slate-950">{page.title}</div>
                          <div className="text-[11px] text-slate-500 truncate max-w-[200px] mt-0.5">
                            {page.contentHtml.replace(/<[^>]*>/g, "").slice(0, 45)}...
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-slate-400 text-xs">
                    لا توجد نتائج مطابقة لـ "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Left Side: Bookmarks, Profile/Admin */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mobile Search Toggle Button (Visible only on mobile) */}
            <button
              onClick={() => {
                setIsMobileSearchOpen(true);
                setShowBookmarksDropdown(false);
              }}
              className="p-1.5 sm:p-2 hover:bg-slate-800 rounded-lg text-slate-300 sm:hidden cursor-pointer shrink-0"
              title="بحث"
              id="mobile-search-toggle-btn"
            >
              <Search size={18} />
            </button>

            {/* Bookmark Toggle current page */}
            <button
              onClick={() => onToggleBookmark(currentPageId)}
              className={`p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer shrink-0 ${
                isCurrentBookmarked
                  ? "bg-amber-500/10 text-amber-500"
                  : "hover:bg-slate-800 text-slate-400"
              }`}
              title="حفظ الصفحة كإشارة مرجعية"
              id="toggle-bookmark-btn"
            >
              <Bookmark size={18} className="sm:w-[20px] sm:h-[20px]" fill={isCurrentBookmarked ? "currentColor" : "none"} />
            </button>

            {/* Bookmarks Dropdown Selector */}
            <div className="relative shrink-0">
              <button
                onClick={() => {
                  setShowBookmarksDropdown(!showBookmarksDropdown);
                  setShowSearchResults(false);
                }}
                className="p-1.5 sm:p-2 hover:bg-slate-800 rounded-lg text-slate-300 relative cursor-pointer"
                title="المرجع المحفوظ"
                id="bookmarks-list-btn"
              >
                <BookmarkCheck size={18} className="sm:w-[20px] sm:h-[20px]" />
                {bookmarks.length > 0 && (
                  <span className="absolute top-1 right-1 bg-amber-500 text-slate-950 text-[9px] font-black rounded-full w-4 h-4 sm:w-4.5 sm:h-4.5 flex items-center justify-center border border-slate-900">
                    {bookmarks.length}
                  </span>
                )}
              </button>

              {/* Bookmarks list menu */}
              {showBookmarksDropdown && (
                <div className="absolute left-0 mt-2 w-52 sm:w-56 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-100 z-50 text-right">
                  <div className="p-3 border-b bg-slate-50 text-slate-700 font-bold text-xs">
                    الإشارات المرجعية المحفوظة
                  </div>
                  {bookmarkedPages.length > 0 ? (
                    <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto">
                      {bookmarkedPages.map((page) => (
                        <button
                          key={page.id}
                          onClick={() => {
                            onSelectPage(page.id);
                            setShowBookmarksDropdown(false);
                          }}
                          className="w-full p-2.5 hover:bg-slate-50 text-right text-xs font-semibold block truncate text-slate-700 cursor-pointer"
                        >
                          🔖 {page.title}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-slate-400 text-xs">
                      لم تحفظ أي صفحة بعد. انقر على أيقونة الإشارة المرجعية لحفظ الدرس.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Separator */}
            <div className="h-5 sm:h-6 w-[1px] bg-slate-700 mx-0.5 sm:mx-1 shrink-0"></div>

            {/* Profile / Admin Login Button */}
            <button
              onClick={onOpenAdmin}
              className={`px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-lg flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs transition-all cursor-pointer shrink-0 ${
                isAdmin
                  ? "bg-red-600/20 text-red-400 border border-red-500/30"
                  : "bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm"
              }`}
              title="دخول لوحة التحكم (للمعلم/المدير)"
              id="admin-login-btn"
            >
              <User size={13} className="sm:w-[15px] sm:h-[15px]" />
              <span className="font-extrabold tracking-wide">
                {isAdmin ? "التحكم" : "المدير"}
              </span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
