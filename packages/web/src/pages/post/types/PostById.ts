/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PostById
// ====================================================

export interface PostById_post {
  __typename: "PostEntity";
  text: string;
}

export interface PostById {
  post: PostById_post;
}

export interface PostByIdVariables {
  postId: string;
}
