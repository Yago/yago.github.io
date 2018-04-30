import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle }) => (
  <header>
    <a href="/">
      <img className="logo" src="/build/svg/yago-logo.svg" alt="Yago logotype" />
    </a>

    <button type="button" className="console-toggle">
      <span className="sr-only">Toggle console</span>
      <span></span>
      <span></span>
    </button>    
    
    <button type="button" className="menu-toggle">
      <span className="sr-only">Toggle navigation</span>
      <span></span>
      <span></span>
      <span></span>
    </button>
  </header>
)

export default Header
