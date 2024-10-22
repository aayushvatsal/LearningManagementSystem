import React from 'react'

import Hero from './Hero'
import PowerfulFeature from './PowerfulFeatures'
import Nav from './Navbar'
import OurAchievements from './WhyKavishala'
// import Course from './Courses'
import FeaturesSection from './FeaturesSection'
import Testimonials from './Testimonial'
import PricingPlans from './PricingPlans'
import Instructors from './Instructors'
import HowItWorks from './HowItWorks'
import WhyChooseUs from './WhyChooseUs'
import FAQSection from './FAQ'
import CTASection from './CTASection'
import BlogOrResources from './BlogOrResources'
import NewsletterSubscription from './NewsletterSubscription'
import Footer from './Footer'


const LandingPage = () => {
  return (
    <div>
        
        <Nav/>
        <Hero/>
        <PowerfulFeature/>
        <PricingPlans/>
        <Instructors/>
        {/* <Course/> */}
        <FeaturesSection/>
        <HowItWorks/>
        <OurAchievements/>
        <Testimonials/>
        <WhyChooseUs/>
        <FAQSection/>
        <CTASection/>
        <BlogOrResources/>
        <NewsletterSubscription/>
        <Footer/>


        
    
    </div>
   
  )
}

export default LandingPage