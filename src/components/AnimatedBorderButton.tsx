import type { JSX } from 'react'
import type { ReactNode } from 'react'

const AnimatedBorderButton = ({ children }: { children : ReactNode}): JSX.Element => {

  const classes: string = 
    ["animated-border-btn relative inline-flex items-center justify-center",
    "bg-primary/5 text-primary border border-primary/30 rounded-full font-medium",
    "transition-colors duration-300 hover:bg-primary/10",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-100",
    "disabled:opacity-50 disabled:cursor-not-allowed"].join(' ')

  return (
    <button className={`px-10 py-2 text-base gap-2 ${classes}`}>
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  )
}

export {AnimatedBorderButton};
