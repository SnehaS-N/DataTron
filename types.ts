import type React from 'react';

export enum ToolId {
  BLOG_TITLE = 'BLOG_TITLE',
  BLOG_POST = 'BLOG_POST',
  CODE_BUILDER = 'CODE_BUILDER',
  INSTAGRAM_CAPTION = 'INSTAGRAM_CAPTION',
  CODE_DEBUGGER = 'CODE_DEBUGGER',
  GRAMMAR_CHECKER = 'GRAMMAR_CHECKER',
  PLAGIARISM_CHECKER = 'PLAGIARISM_CHECKER',
  HUMANIFY_CONTENT = 'HUMANIFY_CONTENT',
}

export interface Tool {
  id: ToolId;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  prompt: string;
  inputPlaceholder: string;
  isPremium?: boolean;
}

export type GroundingChunk = {
  web: {
    uri: string;
    title: string;
  };
};

export type GeminiResponse = {
  text: string;
  sources?: GroundingChunk[];
};