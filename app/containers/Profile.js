/**
 * gsun2016
 * tw
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import LeftMenu from 'components/LeftMenu';
import HeaderBar from 'components/HeaderBar';
import ChannelHeader from 'components/ChannelHeader';

import { loadChannels } from 'actions/chanels';
import { updateProfile } from 'actions/application';
import listener from 'middleware/listener';
import * as ApplicationType from 'actions/application';

class Profile extends Component {
  static fetchData({ store, params }) {
    return store.dispatch(loadChannels());
  }

  constructor(props) {
    super(props);
    var profile = props.currentUser;

    this.state = {
      form: profile
    };
  }

  componentDidMount() {
    this.props.loadChannels();

    listener.sub(ApplicationType.UPDATED_PROFILE.toString(), function(event) {
      alert('Your profile has been updated.');
    }.bind(this));
  }

  componentWillUnmount() {
    listener.unsub(ApplicationType.UPDATED_PROFILE.toString());
  }

  handleChanged(prop, event) {
    var f = this.state.form;

    switch (prop) {
      default:
        f[prop] = event.target.value;
    }

    this.setState({ form: f });
  }

  handleSubmitButton() {
    var profile = this.state.form;
    this.props.updateProfile(profile);
  }

  handleCancelButton() {}

  render() {
    let channelList = this.props.channelList;

    return (
      <div className="wave-wrapper-02">
        <main className="main-area">
          <ChannelHeader title={'My Profile'} icon={'fa-chevron-left'} />
          <div className="main-content main-content--expand">
            <div className="columns eight offset-by-two">
              <form className="add-room-form" onSubmit={()=>false}>

                <label htmlFor="displayName">Full Name</label>
                <input className="u-full-width" type="text" name="displayName"
                  placeholder="" id="displayName"
                  value={this.state.form.displayName}
                  onChange={this.handleChanged.bind(this, 'displayName')} />

                <label htmlFor="email">Email</label>
                <input className="u-full-width" type="text" name="email"
                  placeholder="optional" id="email"
                  value={this.state.form.email}
                  onChange={this.handleChanged.bind(this, 'email')} />

                <label htmlFor="username">Username</label>
                <small>That helps other people mention you in a message</small>
                <input className="u-full-width" type="text" name="username"
                  placeholder="optional" id="username"
                  value={this.state.form.username}
                  onChange={this.handleChanged.bind(this, 'username')} />

                <label htmlFor="appearinLink">Appearin Profile</label>
                <small>People can talk directly with you on appearin when you online from goingsunny</small>
                <input className="u-full-width" type="url" name="appearinLink"
                  placeholder="optional" id="appearinLink"
                  value={this.state.form.appearinLink}
                  onChange={this.handleChanged.bind(this, 'appearinLink')} />

                <label htmlFor="bio">Bio</label>
                <textarea className="u-full-width"
                  placeholder="..." name="bio" id="bio"
                  value={this.state.form.bio}
                  onChange={this.handleChanged.bind(this, 'bio')} >
                </textarea>

                <div className="add-room-form__controls">
                  <input className="button button-primary" type="button" value="Submit"
                    onClick={this.handleSubmitButton.bind(this)}/>
                </div>
              </form>
            </div>
          </div>
        </main>

        <footer>
          <div className="wave"></div>
        </footer>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    channelList: state.chanels.toJS().chanelList,
    currentUser: state.currentUser.toJS(),
  };
}

Profile.propTypes = {};
export { Profile };
export default connect(mapStateToProps, { loadChannels, updateProfile })(Profile);
