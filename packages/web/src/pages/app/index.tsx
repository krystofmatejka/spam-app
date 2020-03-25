import React from 'react'
import {NextPageContext} from 'next'
import {Nested} from './nested'
import {Root} from './root'

interface NextContextWithQuery extends NextPageContext {
  query: {
    id: string
  }
}

interface Props {
  id: string
}

const App = ({id}: Props) => {
  if (!id) {
    return <Root/>
  } else {
    return <Nested id={id}/>
  }
}

App.getInitialProps = async ({query: {id = ''}}: NextContextWithQuery) => ({id})

export default App
