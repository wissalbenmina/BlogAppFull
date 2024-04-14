export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

export const deletePostRequest = () => ({
  type: DELETE_POST_REQUEST,
});

export const deletePostSuccess = () => ({
  type: DELETE_POST_SUCCESS,
});

export const deletePostFailure = (error) => ({
  type: DELETE_POST_FAILURE,
  error,
});
