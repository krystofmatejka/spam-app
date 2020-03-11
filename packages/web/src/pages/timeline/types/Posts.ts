/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Posts
// ====================================================

export interface Posts_posts_edges_node {
  __typename: "PostEntity";
  id: string;
  text: string;
}

export interface Posts_posts_edges {
  __typename: "PostEdge";
  node: Posts_posts_edges_node;
}

export interface Posts_posts_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface Posts_posts {
  __typename: "PostConnection";
  edges: Posts_posts_edges[];
  pageInfo: Posts_posts_pageInfo;
}

export interface Posts {
  posts: Posts_posts;
}

export interface PostsVariables {
  cursor?: string | null;
  parent?: string | null;
}
