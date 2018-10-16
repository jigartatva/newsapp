import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import commonStyle from '../shared/styles/commonStyle';

/**
 * CrossIcon componet class
 */
export default class CrossIcon extends Component {
    static propTypes = {
        onPress: PropTypes.func,
    }

    /**
      * Initialize default props 
    */
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
                style={commonStyle.croosIconStyle}
                onPress={onPress}
            >
                <Image
                    style={commonStyle.crossImageStyle}
                    source={require('../../assets/crossIcon.png')}
                />
            </TouchableOpacity>
        );
    }
}