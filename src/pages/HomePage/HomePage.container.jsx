import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUserToken } from '../../redux/user/user.selectors';
import { fetchPostsAsync } from '../../redux/gallery/gallery-thunk-actions/fetchPosts';

import HomePage from './HomePage';

const mapStateToProps = createStructuredSelector({
  userToken: selectCurrentUserToken,
});

const mapDispatchtoProps = (dispatch) => ({
  fetchPosts: (token) => dispatch(fetchPostsAsync(token)),
});

const HomePageContainer = connect(
  mapStateToProps,
  mapDispatchtoProps
)(HomePage);

export default HomePageContainer;
