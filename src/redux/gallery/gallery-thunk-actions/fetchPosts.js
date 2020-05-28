import GalleryActionTypes from '../gallery.types';
import { stokkApi as api, queryString } from '../../../utils/api';

export const fetchPostsStarted = () => ({
  type: GalleryActionTypes.FETCH_POSTS_START,
});

export const fetchPostsSuccess = (posts, queryResponse) => ({
  type: GalleryActionTypes.FETCH_POSTS_SUCCESS,
  payload: { posts, queryResponse },
});

export const fetchPostsFailure = (error) => ({
  type: GalleryActionTypes.FETCH_POSTS_FALIURE,
  payload: error,
});

const defaultParams = {
  page: 1,
  limit: 5,
  orderBy: 'id',
  order: 'asc',
  q: '',
};
export const fetchPostsAsync = (token, params = defaultParams) => {
  return async (dispatch) => {
    dispatch(fetchPostsStarted());
    const queryParams = queryString(params);
    const response = await api(`api/posts?${queryParams}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.error) dispatch(fetchPostsFailure(response.error));
    else {
      const { data, ...queryResponse } = response;
      dispatch(fetchPostsSuccess(data, queryResponse));
    }
  };
};
