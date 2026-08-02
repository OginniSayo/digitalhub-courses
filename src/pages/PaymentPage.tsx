import type { JSX } from "react";
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom';
import { assets } from "../assets/assets";
import { courses, USD_TO_NGN_RATE } from '../data/courses';
import type { Course, PaymentMethod } from "../types/types";
import type { LucideIcon } from 'lucide-react';
import type { IconType } from "react-icons/lib";
import type React from "react";

const paymentIcons: Record<PaymentMethod, { icon: string | IconType | LucideIcon, alt?: string }[]> = {
  'crypto': [
    { icon: assets.EthereumIcon },
    { icon: assets.BitcoinIcon },
    { icon: assets.TetherIcon },
    { icon: assets.CircleDollarSignIcon },
  ], 
  "local-currency": [
    { icon: assets.verveLogo, alt: 'Verve card logo' },
    { icon: assets.mastercardLogo, alt: 'Mastercard logo' },
    { icon: assets.visaLogo, alt: 'Visa card logo' },
  ]
}

const PaymentPage = (): JSX.Element => {

  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const course = courses.find((course : Course): boolean => course.id === courseId);

  if (!course) {
    return <Navigate to="/" replace />;
  }

  const nairaPrice = Math.round(course.price * USD_TO_NGN_RATE).toLocaleString('en-NG');

  const handlePayment = (event: React.SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const paymentMethod = formData.get('payment') as PaymentMethod | null;

    if (!paymentMethod) {
      alert('Please select a payment method to continue.');
      return;
    }

    navigate(`/payment/${paymentMethod}`, { state: { courseId : course.id} })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-28">
      
      <main className="w-full max-w-lg bg-base-100 border border-base-300 rounded-box shadow-sm p-6 sm:p-8">
        <p className="text-sm text-primary font-medium mb-1">Checkout</p>
        <h2 className="text-2xl font-bold text-neutral dark:text-accent-content">{course.title}</h2>
        <p className="mt-2 text-base-content/70 text-sm leading-relaxed">{course.description}</p>

        <div className="divider my-6" />
        <p className="text-base-content/70 mb-4">Choose your preferred payment method</p>

        <form onSubmit={handlePayment} className="flex flex-col gap-4">
          <label className="cursor-pointer">

            <input type="radio" name="payment" value="crypto" className="peer sr-only" />

            <div className="rounded-box card bg-base-200/40 hover:bg-base-200/80 border-2 border-base-300 peer-checked:border-primary peer-checked:bg-primary/5 transition-colors p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <assets.Coins className="text-primary size-5" />
                  <span className="font-medium text-neutral dark:text-accent-content">Pay with Crypto</span>
                </div>
                <span className="font-semibold text-primary">${course.price}</span>
              </div>

              <div className="flex items-center gap-3 mt-3">
                {paymentIcons.crypto.map((paymentIcon) => (
                  <span key={paymentIcon.icon.toString()} className="size-6">
                    {typeof paymentIcon.icon === 'string' ? (
                      <img src={paymentIcon.icon} alt={paymentIcon.alt} height={24} width={24} />
                    ) : (
                      <paymentIcon.icon className="size-5 text-primary dark:text-base-content" />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </label>

          <label className="cursor-pointer">
            <input type="radio" name="payment" value="local-currency" className="peer sr-only" />
            <div className="rounded-box bg-base-200/40 hover:bg-base-200/80 border-2 border-base-300 peer-checked:border-primary peer-checked:bg-primary/5 transition-colors p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <assets.CreditCard className="text-primary size-5" />
                  <span className="font-medium text-neutral dark:text-accent-content">Pay with Local Currency</span>
                </div>
                <span className="font-semibold text-primary">${course.price} (₦{nairaPrice})</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                {paymentIcons['local-currency'].map((paymentIcon) => (
                  (typeof paymentIcon.icon === 'string') ? (
                    <img key={paymentIcon.alt} src={paymentIcon.icon} alt={paymentIcon.alt} height={24} width={24} />
                  ) : null
                ))}
              </div>
            </div>
          </label>

          <button type="submit" className="btn bg-primary text-primary-content dark:text-neutral hover:bg-secondary-content hover:text-primary dark:hover:bg-accent-content dark:hover:text-neutral border rounded-md transition-colors duration-300 rounded-btn mt-2">Continue</button>
          <Link to="/" className="btn btn-ghost btn-sm rounded-btn self-center">Back to courses</Link>
        </form>
      </main>
    </div>
  );
};

export default PaymentPage;
