/* import libraries */
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';

import PropTypes from 'prop-types';

import { ICONS } from '../shared/constants/common';

const { ic_check_box_outline_blank, ic_check_box } = ICONS;

/**
 * ListItems componet class
 */
export default class ListItems extends Component {

  static propTypes = {
    isCheckeboxEnabled: PropTypes.bool,
    isChecked: PropTypes.bool,
    isAddedInPlayList: PropTypes.bool,
    isDisabled: PropTypes.bool,
    customContainerCSS: PropTypes.object,
    isAccessible: PropTypes.bool,
    onCheck: PropTypes.func,
    sources: PropTypes.object
  }

  /**
    * Initiazlie defalt props 
  */
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
    const { sources, isCheckeboxEnabled, isAccessible, isChecked, onCheck, customContainerCSS, isAddedInPlayList, isDisabled } = this.props;
    return (
      <View style={[styles.container, customContainerCSS]} pointerEvents={'auto'} >
        <View style={[styles.categoryTextView]}>
          {!!sources && <Text style={[styles.description]}> {sources.name} </Text>}
        </View>
        <View style={[styles.soundCheckboxView]}>
          {!!isCheckeboxEnabled && <TouchableOpacity style={[styles.checkBoxTouch]}
            onPress={() => { onCheck(sources) }}
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
    paddingLeft: 0.1,
    paddingRight: 0.1
  },
  description: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  categoryTextView: {
    width: '80%',
    padding: 15,
    paddingLeft: 1,
    height: '100%',
    justifyContent: 'center'
  },
  checkBoxTouch: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  soundCheckboxView: {
    width: '20%',
    padding: 15,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
})
