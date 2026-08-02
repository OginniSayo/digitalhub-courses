import type { JSX } from 'react'
import Hero from '../components/Hero'
import DigitalCourses from '../components/DigitalCourses'

const HomePage = (): JSX.Element => {
  return (
    <>
      <Hero />
      <DigitalCourses />
    </>
  )
}

export default HomePage
