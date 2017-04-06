"use strict"

import React from 'react';
import StatusUpdate from './statusupdate';
import CommentThread from './commentthread';
import Comment from './comment';
import {getFeedData, postStatusUpdate, postComment} from '../server';

export default class FeedItem extends React.Component {
  constructor(props) {
    super(props);
    // The FeedItem's initial state is what the Feed passed to us.
    this.state = props.data;
  }

  handleCommentPost(commentText) {
    // Post a comment as user ID 4, which is our mock user!
    postComment(this.state._id, 4, commentText, (updatedFeedItem) => {
      // Update our state to trigger a re-render.
      this.setState(updatedFeedItem);
    });
  }
  render() {
  var data = this.state;
  var contents;
  switch(data.type) {
    case "statusUpdate":
      // Create a StatusUpdate. Dynamically created React component: needs a key.
      // Keys only need to be unique among *siblings*, so we can re-use the
      // same key as the FeedItem.
      contents = (
        <StatusUpdate key={data._id} author={data.contents.author} postDate={data.contents.postDate} location={data.contents.location}>
          {data.contents.contents}
        </StatusUpdate>
      );
      break;
    default:
      throw new Error("Unknown FeedItem: " + data.type);
  }

  return (
    <div className="fb-status-update panel panel-default">
      <div className="panel-body">
        {contents}
        <hr />
        <div className="row">
          <div className="col-md-12">
            <ul className="list-inline">
              <li>
              <a href="#"><span className="glyphicon glyphicon-thumbs-up"></span> Like</a>
              </li>
              <li>
              <a href="#"><span className="glyphicon glyphicon-comment"></span> Comment</a>
              </li>
              <li>
              <a href="#"><span className="glyphicon glyphicon-share-alt"></span> Share</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="panel-footer">
        <div className="row">
          <div className="col-md-12">
            <a href="#">{data.likeCounter.length} people</a> like this
          </div>
        </div>
        <hr />
        <CommentThread  onPost={(commentText) => this.handleCommentPost(commentText)}>
          {
data.comments.map((comment, i) => {
  // i is comment's index in comments array
  return (
    <Comment key={i} author={comment.author} postDate={comment.postDate}>{comment.contents}</Comment>
  );
})
}
        </CommentThread>
      </div>
    </div>
  )
}
}