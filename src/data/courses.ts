import type { Course } from '../types/types';
import { assets } from '../assets/assets'

export const USD_TO_NGN_RATE = 1390;

export const courses: Course[] = [
  {
    id: 'cac-registration',
    title: 'CAC Registration Guide',
    description:
      'A step-by-step walkthrough of registering your business with the Corporate Affairs Commission — from name reservation to certificate issuance, without the usual back-and-forth.',
    icon: assets.Building2,
    price: 20
  },
  {
    id: 'passport-registration',
    title: 'International Passport Registration Guide',
    description:
      'Everything you need to apply for or renew your international passport correctly the first time, including documentation, common rejection reasons, and how to avoid delays.',
    icon: assets.BookOpenCheck,
    price: 20
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing: Complete Step-by-Step Guide',
    description:
      'A full walkthrough of digital marketing fundamentals — social media, content, ads, and funnels — built for beginners who want a real, practical starting point.',
    icon: assets.TrendingUp,
    price: 20
  },
  {
    id: 'forex-crypto',
    title: 'Forex and Crypto',
    description:
      'Everything you need to know about the financial markets, covering forex and cryptocurrency trading basics, market analysis, and risk management.',
    icon: assets.LineChart,
    price: 20
  },
  {
    id: 'web-development',
    title: 'Web Development (Advanced)',
    description:
      'An advanced course covering HTML, CSS, and JavaScript, plus Python and the Django framework — for those ready to move past the basics into full-stack development.',
    icon: assets.Code2,
    price: 20
  },
  {
    id: 'online-surveys',
    title: "Online Surveys: Earn in Pounds and Dollars",
    description:
      'Learn how to take paid online surveys and get paid in pounds and dollars, including which platforms are legitimate and how to maximize your earnings.',
    icon: assets.ClipboardList,
    price: 20
  },
  {
    id: 'recharge-card',
    title: 'Recharge Card Printing',
    description:
      'A practical guide to starting a recharge card printing business, covering setup, software, sourcing, and how to turn it into a steady income stream.',
    icon: assets.Printer,
    price: 20
  },
  {
    id: 'ai-prompting',
    title: 'AI Prompting and Automation',
    description:
      'Learn how to write effective AI prompts and set up automations that save time, covering practical use cases across work, business, and content creation.',
    icon: assets.Bot,
    price: 20
  },
  {
    id: 'storytelling-community',
    title: 'Storytelling and Community Building',
    description:
      'A step-by-step guide for Web3 and affiliate marketers on using storytelling to build an engaged community and turn that community into consistent sales.',
    icon: assets.Users,
    price: 20
  },
  {
    id: 'digital-products',
    title: 'Create and Market Digital Products',
    description:
      'Learn how to create your own digital products from scratch and market them effectively, from idea validation to your first sale.',
    icon: assets.PackageSearch,
    price: 20
  },
];