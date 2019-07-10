import React from 'react';
import BlogPost from "./BlogPost"
import {blogPostFetch, blogPostUnload} from "../actions/actions";
import {connect} from "react-redux";
import BlogPostList from "./BlogPostList";
import {Spinner} from "./Spinner";
import CommentListContainer from "./CommentListContainer";

const mapeStateToProps = state => ({
  ...state.blogPost
});

const mapDispatchToProps = {
  blogPostFetch,
  blogPostUnload
};

class BlogPostContainer extends React.Component {

  componentDidMount() {
    this.props.blogPostFetch(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.blogPostUnload();
  }

  render() {
    const {post, isFetching} = this.props;

    if (isFetching){
      return (
          <Spinner/>
      );
    }

    return (
        <div>
          <BlogPost post={post}/>
          {post && <CommentListContainer blogPostId={this.props.match.params.id}/>}
        </div>

    )
  }
}

export default connect(mapeStateToProps, mapDispatchToProps)(BlogPostContainer);
