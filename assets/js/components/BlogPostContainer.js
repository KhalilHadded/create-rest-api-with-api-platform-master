import React from 'react';
import BlogPostList from "./BlogPostList";
import {blogPostListFetch, blogPostAdd} from "../actions/actions";
import {connect} from "react-redux";
import {requests} from "../agent";

const mapeStateToProps = state => ({
  ...state.blogPostList
});

const mapDispatchToProps = {
  blogPostListFetch,
  blogPostAdd
};

class BlogPostContainer extends React.Component {

  componentDidMount() {

    this.props.blogPostListFetch();
  }

  render() {
    const {posts, isFetching} = this.props;
    return (
        <BlogPostList posts={posts} isFetching={isFetching}/>
    )
  }
}

export default connect(mapeStateToProps, mapDispatchToProps)(BlogPostContainer);
