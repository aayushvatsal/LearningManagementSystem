import React from 'react'

import GrowHeroSection from './GrowHeroSection'
import GrowNavbar from './GrowNavbar'
import TopCompaniesCard from './TopCompaniesCard'
import TopCompanies from './TopCompanies'
import HelpFounder from './HelpFounder'
import OurFormula from './OurFormula'
import StartUPFounder from './StartUPFounder'
import FounderIntrest from './FounderIntrest'
import Worth from './Worth'
import Community from './Community'
import LatestGrow from './LatestGrow'
import LearnMoreSection from './LearnMoreSection'
import Footer from '../Footer'

const GrowlandingPage = () => {
  return (
    <div>
        <GrowNavbar/>
        <GrowHeroSection/>
        <TopCompaniesCard/>
        <TopCompanies/>
        <HelpFounder/>
        <OurFormula/>
        <StartUPFounder/>
        <FounderIntrest/>
        <Worth/>
        <Community/>
        <LatestGrow/>
        <LearnMoreSection/>
        <Footer/>


    </div>
  )
}

export default GrowlandingPage