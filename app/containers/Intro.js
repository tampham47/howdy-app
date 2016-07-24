import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Intro extends Component {
  render() {
    return (
      <div className="container">
        <h3>Intro Page</h3>
        <Link to="/questions">to question</Link>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Intro);
