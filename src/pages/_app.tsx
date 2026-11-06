import React from "react"

import Header from "../components/Header"
import { ContextTreeProvider } from "../contexts/ContextTree"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <ContextTreeProvider>
        <Header />
        <Component {...pageProps} />
      </ContextTreeProvider>
    </div>
  )
}

export default MyApp
