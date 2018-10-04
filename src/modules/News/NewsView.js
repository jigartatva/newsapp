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
import ModalBox from '../Components/ModalBox';
//common functions
import { ICONS } from '../../shared/constants/common'
import * as CommonFunc from '../../shared/utils/commonFunc';

const { filterIcon, seachIcon } = ICONS;
const ITEMS_PER_PAGE = 10;

class NewsView extends Component {
  static displayName = "NewsView";

  static propTypes = {
    onPress: PropTypes.func,
  }

  static navigationOptions = (navigation) => ({
    title: "Top Headlines",
    tabBarLabel: null,
    headerRight: (
      <View style={{ flexDirection: 'row', height: '100%' }}>
        <TouchableOpacity
          style={{ width: 50, height: '100%', justifyContent: 'center', alignItems: 'center' }}
          onPress={() => { navigation.navigation.push('Search') }}
        >
          <Image
            style={{ width: 28, height: 28 }}
            source={seachIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 50, height: '100%', justifyContent: 'center', alignItems: 'center' }}
          onPress={() => navigation.navigation.state.params.handleModalPopupAction()}
        >
          <Image
            style={{ width: 28, height: 28 }}
            source={filterIcon}
          />
        </TouchableOpacity>
      </View>
    )
  });

  // initialize default props
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      searchby: "",
      newsList: [],
      isModalPopupOpen: false,
      currentPageIndex: 1,
      searchIdString: ''
    }
    this.renderLoadMoreItems = this.renderLoadMoreItems.bind(this);
    this.onModalPopupActionHandler = this.onModalPopupActionHandler.bind(this);
  }


  componentWillMount() {

  }

  componentDidMount() {
    const { currentPageIndex } = this.state;
    this.props.dispatch(NewsActions.getNewsList(currentPageIndex, ITEMS_PER_PAGE, this.state.searchIdString));
    this.props.dispatch(NewsActions.getNewsSources());

    this.props.navigation.setParams({
      handleModalPopupAction: this.onModalPopupActionHandler.bind(this),
    });
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
    if (maxItems >= this.state.currentPageIndex * ITEMS_PER_PAGE) {
      this.props.dispatch(NewsActions.getNewsList(this.state.currentPageIndex + 1, ITEMS_PER_PAGE, this.state.searchIdString));
      this.setState({ currentPageIndex: this.state.currentPageIndex + 1 });
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

  onModalPopupActionHandler() {
    this.setState({ isModalPopupOpen: true });
  }

  beginSearch(searchIdString) {
    this.setState({ isModalPopupOpen: false, currentPageIndex: 1, newsList: [], searchIdString });
    this.props.dispatch(NewsActions.getNewsList(1, ITEMS_PER_PAGE, searchIdString));
  }

  render() {
    return (
      <View style={styles.container}>
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
          <Text style={styles.notFoundStyle}>News not available</Text>
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
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingBottom: 20
  },
  rowStyle: {
    flexDirection: 'row'
  },
  searchContainerStyle: {
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    backgroundColor: "#1FB18A"
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
    color: '#4A4A4A',
    width: "100%"
  },
  notFoundStyle: { fontSize: 15, padding: 10 }
});

export default connect()(NewsView);