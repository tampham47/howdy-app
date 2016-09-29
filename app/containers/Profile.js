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

class Profile extends Component {
  static fetchData({ store, params }) {
    return store.dispatch(loadChannels());
  }

  constructor(props) {
    super(props);
    this.state = {
      form: {}
    };
  }

  componentDidMount() {
    this.props.loadChannels();
  }

  handleChanged(prop, event) {
    var f = this.state.form;

    switch (prop) {
      case 'name':
        f[prop] = event.target.value;
        f.url = f[prop].toLowerCase().replace(new RegExp(' ', 'g'), '-');
        break;
      case 'url':
        f[prop] = event.target.value.toLowerCase().replace(new RegExp(' ', 'g'), '');
        break;
      default:
        f[prop] = event.target.value;
    }

    this.setState({ form: f });
  }

  handleSubmitButton() {}

  handleCancelButton() {}

  render() {
    let channelList = this.props.channelList;

    return (
      <div className="relm">
        <LeftMenu chanelList={this.props.channelList} />

        <main className="main-area">
          <div className="main-content">
            <HeaderBar title='My Profile' />
            <div className="main-content main-content--expand">
              <form className="add-room-form" onSubmit={()=>false}>

                <label for="fullName">Full Name</label>
                <input className="u-full-width" type="text" name="fullName"
                  placeholder="" id="fullName"
                  value={this.state.form.fullName}
                  onChange={this.handleChanged.bind(this, 'fullName')} />

                <label for="email">Email</label>
                <input className="u-full-width" type="text" name="email"
                  placeholder="optional" id="email"
                  value={this.state.form.email}
                  onChange={this.handleChanged.bind(this, 'email')} />

                <label for="username">Username <small>**/ That helps other people mention you in a message</small></label>
                <input className="u-full-width" type="text" name="username"
                  placeholder="optional" id="username"
                  value={this.state.form.username}
                  onChange={this.handleChanged.bind(this, 'username')} />

                <label for="appearinLink">Appearin Profile <small>**/ People can talk directly with you on appearin when you online from goingsunny</small></label>
                <input className="u-full-width" type="url" name="appearinLink"
                  placeholder="optional" id="appearinLink"
                  value={this.state.form.appearinLink}
                  onChange={this.handleChanged.bind(this, 'appearinLink')} />

                <label for="description">Bio</label>
                <textarea className="u-full-width"
                  placeholder="..." name="description" id="description"
                  value={this.state.form.description}
                  onChange={this.handleChanged.bind(this, 'description')} >
                </textarea>

                <div className="add-room-form__controls">
                  <input className="button button-primary" type="button" value="Submit"
                    onClick={this.handleSubmitButton.bind(this)}/>
                  <input className="button" type="button" value="Cancel"
                    onClick={this.handleCancelButton.bind(this)} />
                </div>
              </form>
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
  };
}

Profile.propTypes = {};
export { Profile };
export default connect(mapStateToProps, { loadChannels })(Profile);
