import React from 'react';
import { connect } from 'react-redux'

import * as Actions from '../redux/actions'

const Comment= ({username, comment, date, imagePath, fbId, viewImage}) => {
    return (
        <div className="panel panel-default">
    		<div className="panel-body">
                {
                    (() => {
                        if (imagePath) {
                            return (
                                <a href='#' onClick={() => viewImage("รูปภาพขยาย", imagePath)}>
                                    <img src={imagePath} className="comment-image"/>
                                </a>
                            )
                        }
                    })()
                }
                <span className="detail-comment">{comment}</span>
            </div>
            <div className="panel-footer">
                <span className="detail-small pull-right">{date}</span>
                <span className="detail-profile">โดย <img src={"//graph.facebook.com/" + fbId + "/picture"}/> {username}</span>
            </div>
        </div>
    )
}

const CommentContainerPresentational = ({comments, host, viewImage}) => {
    return (
        <div>
            <p>
                <button className="btn btn-default" data-toggle="collapse" data-target="#comments">
                    View Comments <span id="toggleIcon" className="glyphicon glyphicon-chevron-down"/>
                </button>
            </p>
            <div id="comments" className="collapse">
                {comments.map(function(comment) {
                    if (comment.imagePath) {
                        return <Comment key={comment.commentId}
                            username={comment.username}
                            comment={comment.comment}
                            date={comment.created}
                            imagePath={host + '/' + comment.imagePath}
                            fbId={comment.fbId}
                            viewImage={viewImage} />
                    }
                    else {
                        return <Comment key={comment.commentId}
                            username={comment.username}
                            comment={comment.comment}
                            date={comment.created}
                            fbId={comment.fbId}
                            viewImage={viewImage} />
                    }
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        comments: state.action.comments,
        host: state.host
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        viewImage: (title, path) => {
            dispatch(Actions.showPictureModal(title, path))
        }
    }
}

const CommentContainer = connect(mapStateToProps, mapDispatchToProps)(CommentContainerPresentational);

export default CommentContainer;
