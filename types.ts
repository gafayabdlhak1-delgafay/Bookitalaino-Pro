/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Chapter {
  id: string;
  title: string;
  description: string;
  iconName: string; // lucide icon identifier
}

export interface Page {
  id: string;
  chapterId: string;
  title: string;
  contentHtml: string;
  isCustom?: boolean;
}

export interface Bookmark {
  pageId: string;
  bookmarkedAt: number;
}
