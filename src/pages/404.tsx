import * as React from "react"
import {Layout, Flex, Cell, Paragraphs, Button, Link} from "../components/Layout";
import data from '../data/404.json'

const NotFoundPage = () => {
    return (




      <Layout pageTitle="Classic Beatz" headerTitle={data.title}>
          <Flex>
              <Cell>
                  <Paragraphs paragraphs={data.text} classNames="firstBold"/>
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


export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
