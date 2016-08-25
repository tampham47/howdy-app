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
          <HeaderBar title='Explore chanels' />

          <div className="main-content main-content--expand">
            <div className="row">
              <div className="columns four">
                <div className="room-item">
                  <div className="room-item__head">
                    <div className="room-item__head__icon">
                      <img src="http://place-hoff.com/50/50" alt=""/>
                    </div>
                    <h6 className="room-item__head__title">Goingsunny</h6>
                  </div>
                  <div className="room-item__body">
                    <p>Bài thơ đầu anh viết tặng em, là bài thơ kể về đôi dép, khi nỗi nhớ trong...</p>
                    <button>view</button>
                  </div>
                </div>
              </div>
              <div className="columns four">
                <div className="room-item">
                  <div className="room-item__head">
                    <div className="room-item__head__icon">
                      <img src="http://place-hoff.com/45/45" alt=""/>
                    </div>
                    <h6 className="room-item__head__title">English Town</h6>
                  </div>
                  <div className="room-item__body">
                    <p>Bài thơ đầu anh viết tặng em, là bài thơ kể về đôi dép, khi nỗi nhớ trong...</p>
                    <button>view</button>
                  </div>
                </div>
              </div>
              <div className="columns four">
                <div className="room-item">
                  <div className="room-item__head">
                    <div className="room-item__head__icon">
                      <img src="http://place-hoff.com/55/55" alt=""/>
                    </div>
                    <h6 className="room-item__head__title">Tiếng anh thật dễ</h6>
                  </div>
                  <div className="room-item__body">
                    <p>Bài thơ đầu anh viết tặng em, là bài thơ kể về đôi dép, khi nỗi nhớ trong...</p>
                    <button>view</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="columns four">
                <div className="room-item">
                  <div className="room-item__head">
                    <div className="room-item__head__icon">
                      <img src="http://place-hoff.com/41/41" alt=""/>
                    </div>
                    <h6 className="room-item__head__title">Tiếng anh cho người lớn</h6>
                  </div>
                  <div className="room-item__body">
                    <p>Bài thơ đầu anh viết tặng em, là bài thơ kể về đôi dép, khi nỗi nhớ trong...</p>
                    <button>view</button>
                  </div>
                </div>
              </div>
              <div className="columns four">
                <div className="room-item">
                  <div className="room-item__head">
                    <div className="room-item__head__icon">
                      <img src="http://place-hoff.com/52/52" alt=""/>
                    </div>
                    <h6 className="room-item__head__title">Topica Native</h6>
                  </div>
                  <div className="room-item__body">
                    <p>Bài thơ đầu anh viết tặng em, là bài thơ kể về đôi dép, khi nỗi nhớ trong...</p>
                    <button>view</button>
                  </div>
                </div>
              </div>
              <div className="columns four">
                <div className="room-item">
                  <div className="room-item__head">
                    <div className="room-item__head__icon">
                      <img src="http://place-hoff.com/53/53" alt=""/>
                    </div>
                    <h6 className="room-item__head__title">ABA English</h6>
                  </div>
                  <div className="room-item__body">
                    <p>Bài thơ đầu anh viết tặng em, là bài thơ kể về đôi dép, khi nỗi nhớ trong...</p>
                    <button>view</button>
                  </div>
                </div>
              </div>
            </div>
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
