import type { JSX } from 'react'
import { Link } from "react-router";
import { FrownIcon } from "lucide-react";

const NotFoundPage = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-base-200 pt-52 px-8">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-primary">404</h1>
        <FrownIcon className="size-20 text-primary mx-auto mt-4" />
        <p className="text-2xl mt-4 mb-8">Oops! Route Does not Exist</p>
        <Link to="/" className="btn bg-primary text-primary-content dark:text-neutral hover:bg-secondary-content hover:text-primary dark:hover:bg-accent-content dark:hover:text-neutral border btn-sm rounded-md transition-colors duration-300">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
