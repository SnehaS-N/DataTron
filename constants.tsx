import React from 'react';
import { Tool, ToolId } from './types';
import TitleIcon from './components/icons/TitleIcon';
import PostIcon from './components/icons/PostIcon';
import CodeIcon from './components/icons/CodeIcon';
import InstagramIcon from './components/icons/InstagramIcon';
import BugIcon from './components/icons/BugIcon';
import GrammarIcon from './components/icons/GrammarIcon';
import PlagiarismIcon from './components/icons/PlagiarismIcon';
import HumanifyIcon from './components/icons/HumanifyIcon';

export const TOOLS: Tool[] = [
  {
    id: ToolId.BLOG_TITLE,
    name: 'Blog Title Generator',
    description: 'Generate catchy, SEO-friendly titles for your blog.',
    icon: TitleIcon,
    prompt: 'Generate 5 catchy and SEO-friendly blog titles for a post about: [USER_INPUT].',
    inputPlaceholder: 'Enter your blog topic, e.g., "The future of renewable energy".',
  },
  {
    id: ToolId.BLOG_POST,
    name: 'Blog Post Writer',
    description: 'Create a full, well-structured blog post from a topic.',
    icon: PostIcon,
    prompt: 'Write a comprehensive, engaging, and well-structured blog post about: [USER_INPUT]. The post should have an introduction, multiple sections with headings, and a conclusion.',
    inputPlaceholder: 'Enter a blog title or topic to write about.',
  },
  {
    id: ToolId.CODE_BUILDER,
    name: 'Code Builder',
    description: 'Generate code snippets in any language.',
    icon: CodeIcon,
    prompt: 'Write a code snippet for the following task: [USER_INPUT]. Provide only the code, with clear comments explaining each part. Format the response as a markdown code block.',
    inputPlaceholder: 'e.g., "A python function to reverse a string" or "A React component for a login form".',
  },
  {
    id: ToolId.INSTAGRAM_CAPTION,
    name: 'Instagram Caption Generator',
    description: 'Create engaging captions for your Instagram posts.',
    icon: InstagramIcon,
    prompt: 'Generate 3 creative and engaging Instagram captions for a post about: [USER_INPUT]. Include relevant hashtags.',
    inputPlaceholder: 'Describe your photo or video, e.g., "A beautiful sunset over the ocean".',
  },
  {
    id: ToolId.CODE_DEBUGGER,
    name: 'Code Debugger',
    description: 'Find and fix bugs in your code snippets.',
    icon: BugIcon,
    prompt: 'Debug the following code snippet. Identify any errors or potential issues and provide a corrected version with explanations for the changes. Format your response clearly.\n\nCode:\n```\n[USER_INPUT]\n```',
    inputPlaceholder: 'Paste your code snippet here to find and fix bugs.',
  },
  {
    id: ToolId.GRAMMAR_CHECKER,
    name: 'Grammar Checker',
    description: 'Correct grammar and spelling mistakes in your text.',
    icon: GrammarIcon,
    prompt: 'Correct any grammatical errors, spelling mistakes, and punctuation issues in the following text. Provide only the corrected version.\n\nText:\n"[USER_INPUT]"',
    inputPlaceholder: 'Enter the text you want to check for errors.',
  },
  {
    id: ToolId.PLAGIARISM_CHECKER,
    name: 'Plagiarism Checker',
    description: 'Find sources on the web with similar content.',
    icon: PlagiarismIcon,
    prompt: 'Analyze the following text and find sources on the web that contain similar phrasing or content. List the URLs of any potential sources found.\n\nText:\n"[USER_INPUT]"',
    inputPlaceholder: 'Enter the text you want to check for potential plagiarism.',
    isPremium: true,
  },
  {
    id: ToolId.HUMANIFY_CONTENT,
    name: 'Humanify Content',
    description: 'Make AI-generated text sound more natural.',
    icon: HumanifyIcon,
    prompt: 'Rewrite the following text to make it sound more natural, conversational, and human-like. Avoid jargon and overly complex sentences.\n\nText:\n"[USER_INPUT]"',
    inputPlaceholder: 'Paste AI-generated or formal text to make it sound more human.',
    isPremium: true,
  },
];