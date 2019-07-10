/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PostById
// ====================================================

export interface PostById_getPost {
  __typename: "PostEntity";
  text: string;
}

export interface PostById {
  getPost: PostById_getPost;
}

export interface PostByIdVariables {
  postId: string;
}
