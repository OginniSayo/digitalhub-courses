import type { JSX } from "react";
import { Link } from "react-router-dom";
import { courses } from "../data/courses";

const DigitalCourses = (): JSX.Element => {
  return (
    <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto" id={"courses"}>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-base-content">
          Our <span className="text-secondary-content dark:text-primary">Courses</span>
        </h2>
        <p className="mt-3 text-base-content/70 max-w-2xl mx-auto">
          Practical, step-by-step courses built to get you real results — no
          fluff, just what you need to know.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const Icon = course.icon;
          return (
            <div
              key={course.id}
              className="card bg-base-200/60 hover:bg-base-200/80 border border-base-300 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="card-body gap-3">
                <div className="w-12 h-12 rounded-btn bg-primary/10 flex items-center justify-center">
                  <Icon className="text-primary size-6" />
                </div>

                <h3 className="card-title text-lg leading-snug text-neutral dark:text-accent-content">
                  {course.title}
                </h3>

                <p className="text-base-content/70 text-sm leading-relaxed">
                  {course.description}
                </p>

                <p>
                  <span className="font-bold text-neutral dark:text-accent-content text-sm">
                    Price: ${course.price}
                  </span>
                </p>

                <div className="card-actions mt-2">
                  <Link
                    to={`/payment/${course.id}`}
                    className="btn bg-primary text-primary-content dark:text-neutral hover:bg-secondary-content hover:text-primary dark:hover:bg-accent-content dark:hover:text-neutral border btn-sm rounded-md transition-colors duration-300"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DigitalCourses;
