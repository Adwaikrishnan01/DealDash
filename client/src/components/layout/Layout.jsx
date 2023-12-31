import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Helmet from 'react-helmet'


const Layout = ({ children, title }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
     
      </Helmet>
      <Header />
      <main style={{ minHeight: '80vh' }}>
        {children}</main>
      <Footer />
    </>

  )
}

export default Layout