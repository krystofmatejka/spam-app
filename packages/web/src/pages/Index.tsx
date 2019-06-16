import React from 'react'
import Link from 'next/link'
import { ROUTES } from '../constants'

export function Index () {
  return (
    <div>
      <h1>SPAM.app</h1>
      <Link as={ROUTES.POSTS.path} href={ROUTES.POSTS.page}>
        <a>
          Posts
        </a>
      </Link>
    </div>
  )
}
