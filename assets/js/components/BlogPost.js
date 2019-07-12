import React from 'react';
import timeago from 'timeago.js';
import {Message} from "./Message";

export default class BlogPost extends React.Component {
    render() {
        const {post} = this.props;

        if (null === post) {
            return (<Message message="Blog post does not exist"/>);
        }

        return (
            <div>
                <div className="card mb-3 mt-3 shadow-sm">

                    <div className="card-body">
                        <h2>{post.title}</h2>
                        <p className="card-text">{post.content}</p>
                        <p className="card-text border-top">
                            <small className="text-muted">
                                {timeago().format(post.published)} by&nbsp;
                                {post.author.name}
                            </small>
                        </p>
                    </div>
                </div>

                {
                    post.images.length !== 0 && post.images.map(image => {
                        return (
                            <div className="row mt-4 mb-4" key={image.id}>
                                <div className="col-md-6 col-lg-4">
                                    <div className="mt-2 mb-2">
                                        <img src={`http://localhost:8000${image.url}`}
                                             className="img-fluid"/>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                }

            </div>

        )
    }
}

