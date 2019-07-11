import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {renderField} from "../form";
import {canWriteBlogPost} from "../apiUtils";
import {Redirect} from "react-router";
import {blogPostAdd, blogPostFormUnload, imageDelete} from "../actions/actions";
import ImageUpload from "./ImageUpload";
import {ImageBrowser} from "./ImageBrowser";


const mapStateToProps = state => ({
    userData: state.auth.userData,
    ...state.blogPostForm
});

const mapDispatchToProps = {
    blogPostAdd,
    blogPostFormUnload,
    imageDelete
};

class BlogPostForm extends React.Component {

    componentWillUnmount() {
        this.props.blogPostFormUnload();
    }

    onSubmit(values) {
        const {blogPostAdd, reset, history, images} = this.props;

        return blogPostAdd(values.title, values.content, images)
            .then(() => {
                reset();
                history.push('/');
            });
    }

render(){
    const {submitting, handleSubmit, error,images,imageReqInProgress,imageDelete } = this.props;

    if (!canWriteBlogPost(this.props.userData)) {
        return <Redirect to="/login"/>
    }
    return(
        <div className="card mt-3 mb-6 shadow-sm">
            <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field name="title" label="Title:" type="text" component={renderField}/>
                    <Field name="content" label="Content:" type="textarea" component={renderField}/>

                    <ImageUpload />
                    <ImageBrowser images={images}
                                  isLocked={imageReqInProgress}
                                  deleteHandler={imageDelete}/>


                    <button type="submit" className="btn btn-primary btn-big btn-block"
                            disabled={submitting || imageReqInProgress}>
                        Publish Now!
                    </button>
                </form>
            </div>
        </div>
    )
}
}
export default reduxForm({
    form: 'BlogPostForm'
})(connect(mapStateToProps, mapDispatchToProps)(BlogPostForm))