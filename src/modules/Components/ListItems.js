/* import libraries */
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';

import PropTypes from 'prop-types';

import { ICONS } from '../../shared/constants/common';

const { ic_check_box_outline_blank, ic_check_box } = ICONS;

export default class ListItems extends Component {

  static propTypes = {
    isCheckeboxEnabled: PropTypes.bool,
    isChecked: PropTypes.bool,
    isAddedInPlayList: PropTypes.bool,
    isDisabled: PropTypes.bool,
    customContainerCSS: PropTypes.object,
    isAccessible: PropTypes.bool
  }

  static defaultProps = {
    isCheckeboxEnabled: true,
    isDisabled: false,
    isChecked: false,
    isAddedInPlayList: false,
    customContainerCSS: {},
    name: '',
    isAccessible: true
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { titleText, name, isCheckeboxEnabled, isAccessible, isChecked, onCheck, customContainerCSS, isAddedInPlayList, isDisabled } = this.props;
    return (
      <View style={[styles.container, { paddingLeft: 0.1, paddingRight: 0.1 }, isAccessible === false ? { opacity: 0.5 } : {}, customContainerCSS]} pointerEvents={isAccessible ? 'auto' : 'none'} >
        <View style={[styles.soundTextView]}>
          {!!this.props.sources && <Text style={[styles.description]}> {this.props.sources.name} </Text>}
        </View>
        <View style={[styles.soundCheckboxView]}>
          {!!isCheckeboxEnabled && <TouchableOpacity style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => { onCheck(this.props.sources) }}
          >
            <Image source={isChecked ? ic_check_box : ic_check_box_outline_blank} />
          </TouchableOpacity>}
        </View>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    height: 85,
    width: '100%',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  soundImageView: {
    width: '13%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100%'
  },
  soundTextView: {
    width: '80%',
    padding: 15,
    paddingLeft: 1,
    height: '100%',
    justifyContent: 'center'
  },
  soundPlayListAddedImageView: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  soundCheckboxView: {
    width: '20%',
    padding: 15,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
})
