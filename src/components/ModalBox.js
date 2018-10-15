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

import { ICONS, COLORS } from '../shared/constants/common';

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
    modalImage: PropTypes.string
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
        <View style={[styles.modalContainer]}>
          <View style={[styles.modal]}>
            <View style={[styles.imageWrapper]}>
              <TouchableOpacity
                style={[styles.crossImageTouch]}
                onPress={this.props.actionCancel}
              >
                <Image
                  style={[styles.crossImage]}
                  source={cross_mark_icon_without_cover}
                />
              </TouchableOpacity>
            </View>
            <View style={[styles.listWrapper]}>
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
            <View style={[styles.imageWrapperButton]}>
              <TouchableOpacity
                style={[styles.searchTouch]}
                onPress={() => {
                  this.props.doSearch(this.state.searchIdString)
                }}
              >
                <Text style={styles.searchText}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.colorMoreTransparentWhite
  },
  imageWrapper: {
    justifyContent: 'center',
    width: '100%',
    height: 50,
    alignItems: 'flex-end'
  },
  imageWrapperButton: {
    justifyContent: 'center',
    width: '100%',
    height: 50,
    alignItems: 'center'
  },
  crossImage: {
    width: 24,
    height: 24
  },
  crossImageTouch: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchTouch: {
    width: '95%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.colorGray
  },
  listWrapper: {
    margin: 5,
    backgroundColor: COLORS.colorMoreCreamWhite,
    height: '85%'
  },
  modal: {
    height: '90%',
    opacity: 1,
    borderRadius: 10,
    width: '90%',
    zIndex: 9,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.colorWhite,
    marginTop: '10%',
    padding: 5,
    justifyContent: 'space-between'
  },
  searchText: {
    color: COLORS.colorWhite
  }
});
