/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PostInput } from "./../../../types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: CreatePost
// ====================================================

export interface CreatePost_createPost {
  __typename: "PostEntity";
  id: string;
  text: string;
}

export interface CreatePost {
  createPost: CreatePost_createPost;
}

export interface CreatePostVariables {
  input: PostInput;
}
