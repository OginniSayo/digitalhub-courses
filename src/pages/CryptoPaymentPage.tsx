import  { type JSX, useState, useRef } from 'react'
import { useLocation, Navigate, Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import { courses } from '../data/courses';
import type { Course, LocationState } from '../types/types';

const walletAddress = "0xb331dd433a026c6684efb9c6df0d55124b4cab5d";
const network = "BEP20";
const whatsappNumber = "2349071258045";

const CryptoPaymentPage = (): JSX.Element => {
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

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `I have paid for ${course.title} Course. Here is my proof of payment below.`
  )}`;

  const copyAddress = (): void => {
    navigator.clipboard
      .writeText(walletAddress)
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
          <p className="text-primary font-bold text-lg mt-1">${course.price}</p>
        </div>

        <h2 className="text-xl font-bold text-neutral dark:text-accent-content">Pay with Crypto</h2>
        <p className="mt-1 text-base-content/70 text-sm">
          Send the equivalent of{' '}
          <span className="font-medium text-base-content">${course.price}</span> to the
          address below, then send your payment proof to confirm access.
        </p>

        <div className="rounded-box bg-base-200/30 border border-base-300 p-4 mt-6 flex flex-col items-center gap-4">
          <img
            src={assets.cryptoAddress}
            alt="Wallet address QR code"
            className="max-w-85 w-full rounded-md border border-base-300"
          />

          <div className="w-full flex items-center gap-2 bg-base-200 rounded-btn px-3 py-2">
            <code id={'walletAddress'} className="text-xs text-base-content/80 truncate">{walletAddress}</code>
            <button
              type="button"
              onClick={copyAddress}
              aria-label="Copy wallet address"
              className="btn btn-ghost btn-xs btn-circle ml-auto shrink-0"
            >
                {copied ? <assets.CheckIcon className="size-5 text-primary" /> : <assets.CopyIcon className="size-3.5" />}
            </button>
          </div>

          <p className="text-sm text-base-content/80 self-start pl-3">Network: {network}</p>
        </div>

        <div className="divider my-6" />
        <a 
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="btn h-auto py-4 bg-primary text-primary-content dark:text-neutral hover:bg-secondary-content hover:text-primary dark:hover:bg-accent-content dark:hover:text-neutral border rounded-btn w-full transition-colors duration-300"
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

export default CryptoPaymentPage