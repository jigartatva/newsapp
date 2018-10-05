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
import { ICONS, COLORS } from '../../shared/constants/common'
import * as CommonFunc from '../../shared/utils/commonFunc';

const { filterIcon, seachIcon } = ICONS;
const ITEMS_PER_PAGE = 10;

/**
 * Newsview componet class
 */
class NewsView extends Component {
  static displayName = "NewsView";

  static propTypes = {
    onPress: PropTypes.func,
  }

  /**
    * Navigation options 
    * @param navigation 
    * @return View component
  */
  static navigationOptions = (navigation) => ({
    title: "Top Headlines",
    tabBarLabel: null,
    headerRight: (
      <View style={styles.navigationWarpper}>
        <TouchableOpacity
          style={styles.navigationTouch}
          onPress={() => { navigation.navigation.push('Search') }}
        >
          <Image
            style={styles.imageStyle}
            source={seachIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationTouch}
          onPress={() => navigation.navigation.state.params.handleModalPopupAction()}
        >
          <Image
            style={styles.imageStyle}
            source={filterIcon}
          />
        </TouchableOpacity>
      </View>
    )
  });

  /**
    * Initialize default props 
  */
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

  /**
    * DEFULT : when component mount to DOM 
  */
  componentDidMount() {
    const { currentPageIndex } = this.state;
    this.props.dispatch(NewsActions.getNewsList(currentPageIndex, ITEMS_PER_PAGE, this.state.searchIdString));
    this.props.dispatch(NewsActions.getNewsSources());

    this.props.navigation.setParams({
      handleModalPopupAction: this.onModalPopupActionHandler.bind(this),
    });
  }

  /**
    * DEFAULT : when component receive props 
    * @param nextProps 
  */
  componentWillReceiveProps(nextProps) {
    if (nextProps.newsList && nextProps.newsList !== this.props.newsList && nextProps.newsList !== "" && nextProps.newsList !== 'undefined') {
      if (CommonFunc.isJson(nextProps.newsList)) {
        let newsArray = JSON.parse(nextProps.newsList);
        this.setState({ newsList: [...this.state.newsList, ...newsArray.articles] });
      }
    }
  }

  /**
    * Render load more items 
  */
  renderLoadMoreItems() {
    let newsProps = JSON.parse(this.props.newsList);
    let maxItems = newsProps.totalResults;
    if (maxItems >= this.state.currentPageIndex * ITEMS_PER_PAGE) {
      this.props.dispatch(NewsActions.getNewsList(this.state.currentPageIndex + 1, ITEMS_PER_PAGE, this.state.searchIdString));
      this.setState({ currentPageIndex: this.state.currentPageIndex + 1 });
    }
  }

  /**
    * Render news item 
    * @param item
    * @param index
    * @return Image background component
  */
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

  /**
    * when modal popup action fired 
  */
  onModalPopupActionHandler() {
    this.setState({ isModalPopupOpen: true });
  }

  /**
    * when search begin 
    * @param searchIdString 
  */
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
          numberOfButton={1}
          btnOkText={'Ok'}
          dataSource={this.props.newsSources ? JSON.parse(this.props.newsSources) : []}
          actionOk={() => { this.setState({ isModalPopupOpen: false }) }}
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
    backgroundColor: COLORS.colorCreamWhite,
    paddingBottom: 20
  },
  navigationWarpper: {
    flexDirection: 'row',
    height: '100%'
  },
  navigationTouch: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    width: 28,
    height: 28
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
    backgroundColor: COLORS.colorGray
  },
  newsTitleStyle: {
    fontSize: 15,
    color: COLORS.colorWhite,
    fontWeight: '600',
  },
  notFoundStyle: { fontSize: 15, padding: 10 }
});

export default connect()(NewsView);