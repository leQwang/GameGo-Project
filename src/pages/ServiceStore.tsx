import React from 'react'
import { SelectedGenreProvider } from '../components/Provider/SelectedGenreProvider'
import CTA from '../components/CTA/CTA'
import Header from '../components/Header/Header'
import Sidenav from '../components/Sidenav/Sidenav'
import StoreMain from '../components/Store/StoreMain'
import Footer from '../components/Footer/Footer'
import { NavbarSimple } from '../components/Navbar/Navbar'

function ServiceStore() {
  return (
    <div className="bg-custom-radial-gradient overflow-hidden">
    <div className="w-full">
      <SelectedGenreProvider>
        <Header />
        <div className="relative flex">
          <Sidenav />
          <StoreMain />
        </div>
        <Footer />
      </SelectedGenreProvider>
    </div>
  </div>
  )
}

export default ServiceStore