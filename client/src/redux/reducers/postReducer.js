import {
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE,
  } from '../actions/postActions';
  
  const initialState = {
    deleting: false,
    error: null,
    deletedPostId: null,
  };
  
  const postReducer = (state = initialState, action) => {
    switch (action.type) {
      case DELETE_POST_REQUEST:
        return {
          ...state,
          deleting: true,
          error: null,
        };
      case DELETE_POST_SUCCESS:
        return {
          ...state,
          deleting: false,
          error: null,
          deletedPostId: action.postId,
        };
      case DELETE_POST_FAILURE:
        return {
          ...state,
          deleting: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default postReducer;
  