import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Modal, ActivityIndicator } from 'react-native';
import commonStyle from '../shared/styles/commonStyle';

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
        overlayColor: PropTypes.string,
        textStyle: PropTypes.object,
        children: PropTypes.any
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
    UNSAFE_componentWillReceiveProps(nextProps) {
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
            <View style={commonStyle.background}>
                <View
                    style={commonStyle.spinnerWrapper}
                >
                    <ActivityIndicator
                        color='white'
                        size={this.props.size}
                        style={commonStyle.indicatorStyle}
                    />
                    <View style={commonStyle.textContainer}>
                        <Text style={[commonStyle.textContent, this.props.textStyle]}>
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
                style={[commonStyle.spinnerContainer, { backgroundColor: this.props.overlayColor }]}
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
