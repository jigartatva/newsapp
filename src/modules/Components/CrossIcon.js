import React, { Component } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { COLORS } from '../../shared/constants/common';

export default class CrossIcon extends Component {
  static propTypes = {
    onPress: PropTypes.func,
  }
  // initialize default props
  static defaultProps = {
    onPress: () => { }
  }

  constructor(props) {
    super(props);
  }
  render() {
    const { onPress } = this.props;

    return (
      <TouchableOpacity
        style={styles.croosIconStyle}
        onPress={onPress}
      >
        <Image
          style={styles.crossImageStyle}
          source={require('../../../assets/crossIcon.png')}
        />
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  croosIconStyle: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  crossImageStyle: {
    resizeMode: 'contain',
    tintColor: COLORS.colorBlack
  }
});