import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
//external libraries
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GridView from 'react-native-super-grid';
//services
import * as NewsActions from '../../services/NewsService';
//custom component
import Spinner from '../Components/Spinner';
import CrossIcon from '../Components/CrossIcon';
import ModalBox from '../Components/ModalBox';
//common functions
import { ICONS } from '../../shared/constants/common'
import * as CommonFunc from '../../shared/utils/commonFunc';

const ITEMS_PER_PAGE = 10;

const { left_arrow_icon, filterIcon } = ICONS;

class SearchView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchby: "",
      newsList: [],
      currentPageIndex: 1,
      isModalPopupOpen: false,
      searchIdString: ''
    }
    this.renderLoadMoreItems = this.renderLoadMoreItems.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newsList && nextProps.newsList !== this.props.newsList && nextProps.newsList !== "" && nextProps.newsList !== 'undefined') {
      if (CommonFunc.isJson(nextProps.newsList)) {
        let newsArray = JSON.parse(nextProps.newsList);
        this.setState({ newsList: [...this.state.newsList, ...newsArray.articles] });
      }
    }
  }

  renderLoadMoreItems() {
    let newsProps = JSON.parse(this.props.newsList);
    let maxItems = newsProps.totalResults;

    if (this.state.searchby !== "" && this.state.searchby.length >= 2) {
      if (maxItems >= this.state.currentPageIndex * ITEMS_PER_PAGE) {
        this.props.dispatch(NewsActions.getNewsListBySearch(this.state.searchby, this.state.currentPageIndex + 1, ITEMS_PER_PAGE, this.state.searchIdString));
        this.setState({ currentPageIndex: this.state.currentPageIndex + 1 });
      }
    }
  }

  renderNewsItem = (item, index) => {
    let title = item.title.substring(0, 50) + "...";
    let image = item.urlToImage;
    return (
      <ImageBackground source={{ uri: image }} resizeMethod="resize" resizeMode="cover" style={[styles.itemContainer]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => { this.props.navigation.navigate("NewsDetail", { "detail": item }) }}
        >
          <Text style={styles.newsTitleStyle}>{title}</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  beginSearch(searchIdString) {
    this.setState({ isModalPopupOpen: false, currentPageIndex: 1, newsList: [], searchIdString });
    this.props.dispatch(NewsActions.getNewsListBySearch(this.state.searchby, 1, ITEMS_PER_PAGE, searchIdString));
  }

  newsSearchBy = (searchby) => {
    if (this.state.searchby !== "" && this.state.searchby.length >= 2) {
      this.setState({ currentPageIndex: 1, newsList: [] });
      this.props.dispatch(NewsActions.getNewsListBySearch(this.state.searchby, 1, 10, this.state.searchIdString));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', height: 65, width: '100%', justifyContent: 'space-between', borderBottomColor: '#dedfe0', borderBottomWidth: 0.8, paddingBottom: 5, paddingTop: 5 }}>
          <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <TouchableOpacity
              style={{ width: 28, height: 28, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => this.props.navigation.goBack()}
            >
              <Image
                style={[{ tintColor: '#000' }]}
                source={left_arrow_icon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.searchContainerStyle}>
            <View style={styles.rowStyle}>
              <View style={{ width: '85%', height: '95%', justifyContent: 'center' }}>
                <TextInput
                  autoFocus={true}
                  style={[styles.textField]}
                  placeholder={"Search for news & articles"}
                  onChangeText={(searchby) => this.setState({ searchby: searchby })}
                  value={this.state.searchby}
                  maxLength={50}
                  returnKeyType={'done'}
                  underlineColorAndroid="transparent"
                  onSubmitEditing={this.newsSearchBy}
                />
              </View>
              <View style={{ width: '10%', height: '95%', justifyContent: 'center', alignItems: 'center' }}>
                {this.state.searchby.length > 0 && (
                  <CrossIcon onPress={() => { this.setState({ searchby: "" }) }} />
                )}
              </View>
            </View>
          </View>
          <View style={{ width: '15%', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <TouchableOpacity
              style={{ width: 28, height: 28, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => { this.setState({ isModalPopupOpen: true }) }}
            >
              <Image
                style={[{ tintColor: '#000', width: 28, height: 28 }]}
                source={filterIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Spinner key={Math.random()} visible={this.props.loading} />

        {(this.state.newsList && this.state.newsList.length > 0) ?
          <GridView
            itemDimension={130}
            items={this.state.newsList}
            style={styles.gridStyle}
            renderItem={this.renderNewsItem}
            onEndReachedThreshold={0.2}
            onEndReached={this.renderLoadMoreItems}
          />
          :
          <Text style={styles.notFoundStyle}>
            {this.props.newsList && JSON.parse(this.props.newsList).totalResults == 0 ? 'News not found for the selected criteria' : ''}
          </Text>
        }
        <ModalBox
          isOpen={this.state.isModalPopupOpen}
          startOpen={false}
          isDisabled={false}
          headingText={'Alert'}
          customDescStyle={{ paddingLeft: '7%', paddingRight: '7%' }}
          textCustomDescStyle={{ fontSize: 14 }}
          numberOfButton={1}
          btnOkText={'Ok'}
          dataSource={this.props.newsSources ? JSON.parse(this.props.newsSources) : []}
          actionOk={() => { this.setState({ isModalPopupOpen: false }) }}
          description={'fdgfhdkfbkjfgdyis fdb'}
          actionCancel={() => { this.setState({ isModalPopupOpen: false }) }}
          doSearch={(searchIdString) => { this.beginSearch(searchIdString) }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: '#F5FCFF'
  },
  rowStyle: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between'
  },
  searchContainerStyle: {
    width: "72%",
    height: '100%',
    justifyContent: 'flex-start',
    borderRadius: 10,
    backgroundColor: "#dedfe0"
  },
  gridStyle: {
    paddingTop: 20
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 180,
    alignItems: "stretch",
    backgroundColor: 'gray'
  },
  newsTitleStyle: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
  },
  textField: {
    fontSize: 16,
    color: '#4A4A4A'
  },
  notFoundStyle: { fontSize: 15, padding: 10, alignSelf: 'center' }
});

export default connect()(SearchView);