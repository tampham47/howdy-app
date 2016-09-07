/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { showAddChannelComp, addChannel } from 'actions/chanels';
import listener from 'middleware/listener';
import * as ActionType from 'actions/chanels';

class AddRoom extends Component {

  constructor(props) {
    super(props);

    this.state = {
      form: {}
    };
  }

  handleCancelButton() {
    this.props.showAddChannelComp(false);
  }

  handleSubmitButton() {
    var u = this.props.currentUser.toJS();
    var f = this.state.form;
    f._user = u._id;

    this.props.addChannel(f);
  }

  handleChanged(prop, event) {
    var f = this.state.form;
    f[prop] = event.target.value;
    this.setState({ form: f });
  }

  componentDidMount() {
    listener.sub(ActionType.ADDED_CHANNEL.toString(), function(e) {
      this.props.showAddChannelComp(false);
      this.setState({ form: {} });
    }.bind(this));
  }

  render() {
    var isActive = this.props.isActive ? '_active' : '';

    return (
      <div className={`comp-add-room ${isActive}`}>
        <div className="comp-add-room__wrapper">
          <div className="container">
            <div className="columns six offset-by-three">
              <div className="comp-add-room__content">
                <form className="add-room-form" onSubmit={()=>false}>
                  <h5 className="add-room-form__title">Add channel</h5>

                  <label for="nameOfChannel">Name of channel</label>
                  <input className="u-full-width" type="text" name="nameOfChannel"
                    placeholder="Goingsunny" id="nameOfChannel"
                    value={this.state.form.name}
                    onChange={this.handleChanged.bind(this, 'name')} />

                  <label for="channelUrl">Channel URL</label>
                  <input className="u-full-width" type="text" name="channelUrl"
                    placeholder="goingsunny.com/channel/your-url" id="channelUrl"
                    value={this.state.form.url}
                    onChange={this.handleChanged.bind(this, 'url')} />

                  <label for="description">Description</label>
                  <textarea className="u-full-width"
                    placeholder="..." name="description" id="description"
                    value={this.state.form.description}
                    onChange={this.handleChanged.bind(this, 'description')} >
                  </textarea>

                  <label className="add-room-form__checkbox">
                    <input type="checkbox" name="isPrivate"
                      value={this.state.form.isPrivate}
                      onChange={this.handleChanged.bind(this, 'isPrivate')} />
                    <span>Is private</span>
                  </label>

                  <div className="add-room-form__controls">
                    <input className="button button-primary" type="button" value="Submit"
                      onClick={this.handleSubmitButton.bind(this)}/>
                    <input className="button" type="button" value="Cancel"
                      onClick={this.handleCancelButton.bind(this)} />
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}


AddRoom.propTypes = {};
export default connect(mapStateToProps, { showAddChannelComp, addChannel })(AddRoom);
