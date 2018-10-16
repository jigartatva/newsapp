import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    Modal,
    ListView
} from 'react-native';
import PropTypes from 'prop-types';
import ListItems from './ListItems';

import { ICONS } from '../shared/constants/common';
import commonStyle from '../shared/styles/commonStyle';

const { cross_mark_icon_without_cover } = ICONS;

/**
 * ModalBox componet class
 */
export default class ModalBox extends Component {
    static propTypes = {
        isDisabled: PropTypes.bool,
        isOpen: PropTypes.bool,
        headingText: PropTypes.string,
        btnOkText: PropTypes.string,
        btnCancelText: PropTypes.string,
        actionOk: PropTypes.func,
        actionCancel: PropTypes.func,
        actionRequestClose: PropTypes.func,
        numberOfButton: PropTypes.number,
        modalImage: PropTypes.string,
        dataSource: PropTypes.any,
        doSearch: PropTypes.func
    };

    /**
      * Initialize default props 
    */
    static defaultProps = {
        isDisabled: false,
        isOpen: false,
        startOpen: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            dimensions: '',
            selectedIds: [],
            searchIdString: ''
        };
        this.addFilterItem = this.addFilterItem.bind(this);
    }

    /**
      * Get list items 
      * @return clone with rows
    */
    getListItems() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        try {
            if (this.props.dataSource) {
                return (ds.cloneWithRows(this.props.dataSource));
            } else {
                return (ds.cloneWithRows([]));
            }
        } catch (error) {
            return ds;
        }
    }

    /**
      * Add filter item 
      * @param dataItem 
    */
    addFilterItem(dataItem) {
        if (this.state.selectedIds.includes(dataItem.id)) {
            var data = this.state.selectedIds;
            var index = data.indexOf(dataItem.id);
            data.splice(index, 1);
            this.setState({ selectedIds: data, searchIdString: data.join(',') })
        } else {
            var addData = this.state.selectedIds;
            addData.push(dataItem.id);
            this.setState({ selectedIds: addData, searchIdString: addData.join(',') })
        }
    }

    render() {
        const { selectedIds } = this.state;
        return (
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={this.props.isOpen}
                onRequestClose={() => { console.log('') }}
            >
                <View style={[commonStyle.modalContainer]}>
                    <View style={[commonStyle.modal]}>
                        <View style={[commonStyle.modelImageWrapper]}>
                            <TouchableOpacity
                                style={[commonStyle.crossImageTouch]}
                                onPress={this.props.actionCancel}
                            >
                                <Image
                                    style={[commonStyle.crossImage]}
                                    source={cross_mark_icon_without_cover}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={[commonStyle.listWrapper]}>
                            <ListView
                                dataSource={this.getListItems()}
                                renderRow={(rowData, rowID) => {
                                    return (
                                        <ListItems sources={rowData}
                                            isChecked={selectedIds.includes(rowData.id)}
                                            onCheck={(dataItem) => {
                                                this.addFilterItem(dataItem)
                                            }}></ListItems>
                                    )
                                }}
                            />
                        </View>
                        <View style={[commonStyle.imageWrapperButton]}>
                            <TouchableOpacity
                                style={[commonStyle.searchTouch]}
                                onPress={() => {
                                    this.props.doSearch(this.state.searchIdString)
                                }}
                            >
                                <Text style={commonStyle.searchText}>Search</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}
