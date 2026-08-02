import  { type JSX, useState, useRef } from 'react'
import { useLocation, Navigate, Link } from 'react-router-dom';
import { courses, USD_TO_NGN_RATE } from '../data/courses';
import { assets } from '../assets/assets';
import type { Course, LocationState } from '../types/types';

const accountNumber = "1027386856";
const accountName = "OJWORLD GLOBAL SERVICES";
const bankName = "UBA";
const whatsappNumber = "2349071258045";

const LocalPaymentPage = (): JSX.Element => {

  const [copied, setCopied] = useState<boolean>(false);
  const copiedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const location = useLocation();
  const state = location.state as LocationState | null;
  const course = state?.courseId
  ? courses.find((course: Course) => course.id === state.courseId)
  : undefined;
  
  if (!course) {
    return <Navigate to="/" replace />;
  }
  
  const nairaPrice = Math.round(course.price * USD_TO_NGN_RATE).toLocaleString('en-NG');

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `I have paid for ${course.title} Course. Here is my proof of payment below.`
  )}`;
  
  const copyAccount = (): void => {
    navigator.clipboard
      .writeText(accountNumber)
      .then(() => {
        setCopied(true);
        if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current);
        copiedTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy address: ", err));
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-28">
      <div className="w-full max-w-lg bg-base-100 border border-base-300 rounded-box shadow-sm p-6 sm:p-8">
        <div className="bg-primary/5 border border-primary/20 rounded-box p-4 mb-6">
          <p className="text-sm text-base-content/70">You're purchasing</p>
          <p className="font-semibold text-neutral dark:text-accent-content">{course.title}</p>
          <p className="text-primary font-bold text-md mt-1">
            ${course.price}{' '}
            <span className="text-base-content/60 text-sm font-normal">
              (₦{nairaPrice})
            </span>
          </p>
        </div>

        <h2 className="text-xl font-bold text-neutral dark:text-accent-content">Pay with Local Currency</h2>
        <p className="mt-1 text-base-content/70 text-sm">
          Transfer <span className="font-medium text-base-content">₦{nairaPrice}</span> to the
          account below, then send your payment proof to confirm access.
        </p>

        <div className="rounded-box border border-base-300 p-4 mt-6 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-base-content/70">Bank</span>
            <span className="text-sm font-medium text-neutral dark:text-accent-content">{bankName}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-base-content/70">Account Name</span>
            <span className="text-sm font-medium text-neutral dark:text-accent-content">{accountName}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-base-content/70">Account Number</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral dark:text-accent-content">{accountNumber}</span>
              <button
                type="button"
                onClick={copyAccount}
                aria-label="Copy account number"
                className="btn btn-ghost btn-xs btn-circle"
              >
               {copied ? <assets.CheckIcon className="size-5 text-primary" /> : <assets.CopyIcon className="size-3.5" />}
              </button>
            </div>
          </div>
        </div>

        <div className="divider my-6" />
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="btn h-auto py-2 bg-primary text-primary-content dark:text-neutral hover:bg-secondary-content hover:text-primary dark:hover:bg-accent-content dark:hover:text-neutral border rounded-md transition-colors duration-300 rounded-btn w-full"
        >
          Send Payment Proof on WhatsApp
        </a>

        <Link to="/" className="btn btn-ghost btn-sm rounded-btn self-center mt-3 w-full">
          Back to courses
        </Link>
      </div>
    </main>
  );
};

export default LocalPaymentPage