import React, {useState} from 'react'
import {NextPageContext} from 'next'
import {Form} from './form'
import {Post} from './post'
import {Timeline} from './timeline'

interface NextContextWithQuery extends NextPageContext {
  query: {
    id: string
  }
}

interface Props {
  id: string
}

const App = ({id}: Props) => {
  const [isPostLoaded, setPostLoaded] = useState(!id)

  return (
    <div>
      {id && <Post id={id} handleIsLoaded={setPostLoaded}/>}
      <div>
        <Form parent={id} disabled={!isPostLoaded}/>
      </div>
      <div>
        <Timeline parent={id}/>
      </div>
    </div>
  )
}

App.getInitialProps = async ({query: {id = ''}}: NextContextWithQuery) => ({id})

export default App
