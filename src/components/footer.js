import React from "react"
import { siteMetadata } from "../../gatsby-config"

const Footer = () => (
  <footer>
    <p>
      <small>
        © {new Date().getFullYear()} {siteMetadata.title}
      </small>
    </p>
  </footer>
)

export default Footer
