import type { LucideIcon } from "lucide-react";

export type Course = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  price: number;
};

export type PaymentMethod = 'crypto' | 'local-currency';

export type LocationState = { courseId: string };