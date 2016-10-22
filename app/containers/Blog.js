/**
 * gsun2016
 * tw
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import LeftMenu from 'components/LeftMenu';
import HeaderBar from 'components/HeaderBar';
import { loadDataForBlog } from 'actions/chanels';
import listener from 'middleware/listener';
import * as ApplicationType from 'actions/application';


class Feedback extends Component {
  static fetchData({ store, params }) {
    var slug = params.slug;
    return store.dispatch(loadDataForBlog({ slug }));
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var slug = this.props.params.slug;
    this.props.loadDataForBlog({ slug });
  }

  componentWillUnmount() {
  }

  render() {
    let channelList = this.props.channelList;

    return (
      <div className="relm">
        <LeftMenu chanelList={this.props.channelList} />

        <main className="main-area">
          <div className="main-content main-content--full-height">
            <HeaderBar title={this.props.currentPost.title || 'Post'} />

            <div className="main-content__wrapper">
              <div id='content-scroller' className="main-content__scroller">
                <div className="lesson-section"
                  dangerouslySetInnerHTML={{
                    __html: this.props.currentPost.content ? this.props.currentPost.content.extended : ''
                  }}>
                </div>
              </div>
            </div>
          </div>

          <div className="room-panel"></div>
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    channelList: state.chanels.toJS().chanelList,
    currentUser: state.currentUser.toJS(),
    currentPost: state.appState.toJS().currentPost
  };
}

Feedback.propTypes = {};
export { Feedback };
export default connect(mapStateToProps, { loadDataForBlog })(Feedback);
