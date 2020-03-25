/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: NewPost
// ====================================================

export interface NewPost_newPosts {
  __typename: "PostEntity";
  id: string;
  text: string;
}

export interface NewPost {
  newPosts: NewPost_newPosts;
}
