import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Modal, ActivityIndicator } from 'react-native';
import { COLORS } from '../shared/constants/common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colorTransparent,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  spinnerWrapper: {
    backgroundColor: COLORS.colorTransparentWhite,
    height: 100,
    borderRadius: 10,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center'
  },
  indicatorStyle: {
    flex: 1,
    position: 'absolute',
    top: 20
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.colorTransparentWhite
  },
  textContainer: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  textContent: {
    top: 25,
    color: COLORS.colorWhite,
    fontSize: 20
  }
});

const ANIMATION = ['none', 'slide', 'fade'];
const SIZES = ['small', 'normal', 'large'];

/**
 * Spinner componet class
 */
export default class Spinner extends Component {

  static propTypes = {
    visible: PropTypes.bool,
    cancelable: PropTypes.bool,
    textContent: PropTypes.string,
    animation: PropTypes.oneOf(ANIMATION),
    color: PropTypes.string,
    size: PropTypes.oneOf(SIZES),
    overlayColor: PropTypes.string
  };

  /**
    * Initialize default props 
  */
  static defaultProps = {
    visible: false,
    cancelable: false,
    textContent: '',
    animation: 'none',
    color: 'white',
    size: 'large', // 'normal',
    overlayColor: 'rgba(0, 0, 0, 0.5186966)'
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      textContent: this.props.textContent
    };
  }

  /**
    * DEFAULT : component will recieve props 
    * @param nextProps 
  */
  componentWillReceiveProps(nextProps) {
    const { visible, textContent } = nextProps;
    this.setState({ visible, textContent });
  }

  /**
    * when close 
  */
  close() {
    this.setState({ visible: false });
  }

  /**
    * when request to close 
  */
  _handleOnRequestClose() {
    if (this.props.cancelable) {
      this.close();
    }
  }

  /**
    * Render defualt content 
    * @return View component
  */
  _renderDefaultContent() {
    return (
      <View style={styles.background}>
        <View
          style={styles.spinnerWrapper}
        >
          <ActivityIndicator
            color='white'
            size={this.props.size}
            style={styles.indicatorStyle}
          />
          <View style={styles.textContainer}>
            <Text style={[styles.textContent, this.props.textStyle]}>
              Loading...
            </Text>
          </View>
        </View>
      </View>
    );
  }

  /**
    * Render spinner 
    * @return Modal component
  */
  _renderSpinner() {
    const { visible } = this.state;

    if (!visible) { return null; }

    const spinner = (
      <View
        style={[styles.container, { backgroundColor: this.props.overlayColor }]}
        key={`spinner_${Date.now()}`}
      >
        {this.props.children
          ? this.props.children
          : this._renderDefaultContent()}
      </View>
    );

    return (
      <Modal
        animationType={this.props.animation}
        onRequestClose={() => this._handleOnRequestClose()}
        supportedOrientations={['landscape', 'portrait']}
        transparent
        visible={visible}
      >
        {spinner}
      </Modal>
    );
  }

  render() {
    return this._renderSpinner();
  }
}
