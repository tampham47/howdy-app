/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import client from 'middleware/mqtt';

class App extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div className="relm">
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(App);
