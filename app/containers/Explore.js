/**
 * gsun2016
 * tw
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import LeftMenu from 'components/LeftMenu';
import HeaderBar from 'components/HeaderBar';
// import { loadExploreDetail } from 'actions/Explores';

class Explore extends Component {
  // static fetchData({ store, params }) {
  //   let { id } = params
  //   return store.dispatch(loadExploreDetail({ id }))
  // }

  componentDidMount() {
    // let { id } = this.props.params;
    // this.props.loadExploreDetail({ id });
  }

  render() {
    // let { Explore } = this.props;

    return (
      <div className="relm">
        <LeftMenu/>

        <main className="main-area">
          <HeaderBar title='Explore' />

          <div className="main-content main-content--expand">
            <p>main</p>
          </div>
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

Explore.propTypes = {
};

export { Explore };
export default connect(mapStateToProps)(Explore);
