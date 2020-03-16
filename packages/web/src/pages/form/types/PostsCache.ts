/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PostsCache
// ====================================================

export interface PostsCache_posts_edges_node {
  __typename: "PostEntity";
  id: string;
  text: string;
}

export interface PostsCache_posts_edges {
  __typename: "PostEdge";
  node: PostsCache_posts_edges_node;
}

export interface PostsCache_posts_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface PostsCache_posts {
  __typename: "PostConnection";
  edges: PostsCache_posts_edges[];
  pageInfo: PostsCache_posts_pageInfo;
}

export interface PostsCache {
  posts: PostsCache_posts;
}

export interface PostsCacheVariables {
  cursor?: string | null;
  parent?: string | null;
}
