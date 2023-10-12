import * as React from "react"
import {Layout, Flex, Cell, Paragraphs, Button, Link} from "../components/Layout";
import data from '../data/privacy-policy.json'
import {Section} from "../components/Section";

const PrivacyPolicyPage = () => {
    return (
      <Layout pageTitle="Classic Beatz" headerTitle={data.title}>
          <Flex>
              <Cell>
                  <Section paragraphs={data.text}/>
              </Cell>
              <Cell>
                  <Link url="/">
                      <Button >
                          Home
                      </Button>
                  </Link>
              </Cell>
      </Flex>
          </Layout>
  )
}


export default PrivacyPolicyPage

export const Head: HeadFC = () => <title>Not found</title>
