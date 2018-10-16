/* import libraries */
import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';

import PropTypes from 'prop-types';

import { ICONS } from '../shared/constants/common';
import commonStyle from '../shared/styles/commonStyle';

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
            <View style={[commonStyle.listItemContainer, customContainerCSS]} pointerEvents={'auto'} >
                <View style={[commonStyle.categoryTextView]}>
                    {!!sources && <Text style={[commonStyle.description]}> {sources.name} </Text>}
                </View>
                <View style={[commonStyle.soundCheckboxView]}>
                    {!!isCheckeboxEnabled && <TouchableOpacity style={[commonStyle.checkBoxTouch]}
                        onPress={() => { onCheck(sources) }}
                    >
                        <Image source={isChecked ? ic_check_box : ic_check_box_outline_blank} />
                    </TouchableOpacity>}
                </View>
            </View >
        )
    }
}
