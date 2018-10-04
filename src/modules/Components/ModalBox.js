import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Modal,
  ListView
} from 'react-native';
import PropTypes from 'prop-types';
import ListItems from './ListItems';

import * as commonFunctions from '../../shared/utils/commonFunc';

import { ICONS } from '../../shared/constants/common';

const { cross_mark_icon_without_cover } = ICONS;

class ModalBox extends Component {
  static propTypes = {
    isDisabled: PropTypes.bool,
    isOpen: PropTypes.bool,
    description: PropTypes.string,
    headingText: PropTypes.string,
    btnOkText: PropTypes.string,
    btnCancelText: PropTypes.string,
    actionOk: PropTypes.func,
    actionCancel: PropTypes.func,
    actionRequestClose: PropTypes.func,
    numberOfButton: PropTypes.number,
    modalImage: PropTypes.string
  };

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
    const { customDescStyle, textCustomDescStyle } = this.props;
    const { selectedIds } = this.state;
    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={this.props.isOpen}
        onRequestClose={() => { console.log('') }}
      >
        <View style={[{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
          <View style={[styles.modal, { justifyContent: 'space-between' }]}>
            <View style={{ justifyContent: 'center', width: '100%', height: 50, alignItems: 'flex-end' }}>
              <TouchableOpacity
                style={{ width: 50, height: '100%', justifyContent: 'center', alignItems: 'center' }}
                onPress={this.props.actionCancel}
              >
                <Image
                  style={{ width: 24, height: 24 }}
                  source={cross_mark_icon_without_cover}
                />
              </TouchableOpacity>
            </View>
            <View style={{ margin: 5, backgroundColor: '#ededed', height: '85%' }}>
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
            <View style={{ justifyContent: 'center', width: '100%', height: 50, alignItems: 'center' }}>
              <TouchableOpacity
                style={{ width: '95%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray' }}
                onPress={() => {
                  this.props.doSearch(this.state.searchIdString)
                }}
              >
                <Text style={{ color: 'white' }}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  okCancelBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '5%',
    marginTop: '4%',
    marginBottom: '4%',
    paddingRight: '5%'
  },
  bgbutton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: commonFunctions.screenHeight(8, 0),
    width: commonFunctions.screenWidth(62, 0),
    borderRadius: 8
  },
  cancelModal: {
    paddingLeft: '17%',
    paddingRight: '17%'
  },
  descriptionStyle: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center'
  },
  modal: {
    height: '90%',
    opacity: 1,
    borderRadius: 10,
    width: '90%',
    zIndex: 9,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    marginTop: '10%',
    padding: 5
  },
  modalHeader: {
    height: 45,
    width: '100%',
    justifyContent: 'flex-start'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center'
  },
  buttonStyle: {
    height: 50,
    width: '47%'
  }
});
module.exports = ModalBox;
