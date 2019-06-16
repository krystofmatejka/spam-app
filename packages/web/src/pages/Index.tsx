import React from 'react'
import Link from 'next/link'

export function Index () {
  return (
    <div>
      <h1>SPAM.app</h1>
      <Link as={'/posts'} href={'/Posts'}>
        <a>
          Posts
        </a>
      </Link>
    </div>
  )
}
