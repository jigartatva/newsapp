import React, { Component } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class CrossIcon extends Component {
  static propTypes = {
    onPress: PropTypes.func,
  }
  // initialize default props
  static defaultProps = {
    onPress : () => {}
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
          style={{ resizeMode: 'contain', tintColor:'#000' }}
          source={require('../../../assets/crossIcon.png')}
        />
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  croosIconStyle: {
    alignItems:'flex-end',
    justifyContent: 'center',
  }
});