/**
 * Goingsunny 2016
 * Tw
 */

import client from 'middleware/mqtt';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { fetchChannelData } from 'actions/chanels';
import Lesson from 'components/Lesson';

class Howdy extends Component {

  static fetchData({ store, params, query }) {
    var d = query.d;
    return store.dispatch(fetchChannelData({
      targetDate: d,
    }));
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var d = this.props.location.query.d;
    this.props.fetchChannelData({
      targetDate: d,
    });
  }

  render() {
    var targetDate = this.props.location.query.d;
    var lesson = this.props.lesson;

    return (
      <section>
        <Helmet>
          <title>{lesson.metaTitle || lesson.name}</title>
          <meta property="og:type" content="article" />
          <meta property="og:url" content="goingsunny.com" />
          <meta property="og:image" content={lesson.metaImage || "https://goingsunny.com/android-chrome-512x512.png"} />
          <meta property="og:title" content={lesson.metaTitle || lesson.name} />
          <meta property="og:description" content={lesson.metaDescription || lesson.name} />
        </Helmet>

        <header>
          <div className="container header">
            <nav className="header__left">
              <h4 className="title">Howdy.chat</h4>
            </nav>
          </div>
        </header>

        <Lesson
          datacontext={this.props.lesson}
          targetDate={targetDate}
        />
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    lesson: state.chanels.toJS().currentLesson,
  };
}

var mapDispatchToProps = {
  fetchChannelData,
}

Howdy.propTypes = {};
Howdy.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Howdy);
