import {QUERY_GET_POSTS} from '../queries'

const makePostEdge = (post) => ({
  node: post,
  __typename: 'PostEdge'
})

const mergeEdges = (meta, firstEdges, secondEdges) => ({
  posts: {
    ...meta,
    edges: firstEdges.concat(secondEdges)
  }
})

export const updateCacheAfterMutation = (cache, data, parent?) => {
  const cachedData: any = cache.readQuery({
    query: QUERY_GET_POSTS,
    variables: {
      parent
    }
  })
  const {
    posts,
    posts: {
      edges
    }
  } = cachedData
  const exists = edges.find((edge) => edge.node.id === data.createPost.id)

  if (!exists) {
    const edge = makePostEdge(data.createPost)

    cache.writeQuery({
      query: QUERY_GET_POSTS,
      variables: {
        parent
      },
      data: mergeEdges(posts, [edge], edges)
    })
  }
}

export const updateCacheAfterSubscription = (previousData, subscriptionData) => {
  const {
    posts,
    posts: {
      edges
    }
  } = previousData
  const {
    data: {
      newPosts: newPost
    }
  } = subscriptionData

  const exists = edges.find((edge) => edge.node.id === newPost.id)
  if (!subscriptionData.data || exists) {
    return previousData
  }

  const edge = makePostEdge(newPost)
  return mergeEdges(posts, [edge], edges)
}

export const updateCacheAfterLoadMore = (previousData, newData) => {
  const {
    posts,
    posts: {
      edges: newEdges
    }
  } = newData
  const {
    posts: {
      edges: previousEdges
    }
  } = previousData

  return mergeEdges(posts, previousEdges, newEdges)
}
