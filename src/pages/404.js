import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ location }) => (
  <Layout location={location}>
    <SEO title="404" />
    <h1>not found</h1>
  </Layout>
)

export default NotFoundPage
