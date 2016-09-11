/**
 * gsun2016
 * tw
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import LeftMenu from 'components/LeftMenu';
import HeaderBar from 'components/HeaderBar';
import { loadChannels } from 'actions/chanels';

class Explore extends Component {
  static fetchData({ store, params }) {
    return store.dispatch(loadChannels());
  }

  componentDidMount() {
    this.props.loadChannels();
  }

  render() {
    let channelList = this.props.channelList;

    return (
      <div className="relm">
        <LeftMenu chanelList={this.props.channelList} />

        <main className="main-area">
          <HeaderBar title='Explore chanels' />

          <div className="main-content main-content--expand">
            <div className="row explore-channel">
            {this.props.channelList.map(function(i) {
              return (
                <div className="columns six">
                  <div className="room-item">
                    <div className="room-item__head">
                      <div className="room-item__head__icon">
                        <img src="http://place-hoff.com/50/50" alt=""/>
                      </div>
                      <Link to={`/channel/${i.url}`} className="room-item__head__title">{i.name}</Link>
                      <p>{i.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>

          </div>
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    channelList: state.chanels.toJS().chanelList,
  };
}

Explore.propTypes = {
};

export { Explore };
export default connect(mapStateToProps, { loadChannels })(Explore);
