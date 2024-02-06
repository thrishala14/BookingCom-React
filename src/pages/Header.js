import React from 'react'
import HeaderTop from '../components/HeaderTop'
import NavHeader from '../components/NavHeader'
import '../styles/MainHeader.css'

const Header = () => {
  return (
    <>
      <div className='main-header'>
          <HeaderTop/>
          <NavHeader/>
      </div>
    </>
  )
}

export default Header