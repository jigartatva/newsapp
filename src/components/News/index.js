import React, { Component } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
} from 'react-native';
//external libraries
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GridView from 'react-native-super-grid';
//actions
import * as Actions from '../../actions';
//custom component
import Spinner from '../Spinner';
import ModalBox from '../ModalBox';
//common functions
import { ICONS, COLORS, ITEMS_PER_PAGE } from '../../shared/constants/common';
import * as CommonFunc from '../../shared/utils/commonFunc';
import commonStyle from '../../shared/styles/commonStyle';

const { filterIcon, seachIcon } = ICONS;

/**
 * Newsview componet class
 */
class NewsView extends Component {
    static displayName = "NewsView";

    static propTypes = {
        onPress: PropTypes.func,
        dispatch: PropTypes.func,
        navigation: PropTypes.any,
        newsList: PropTypes.string,
        loading: PropTypes.bool,
        newsSources: PropTypes.any
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
            <View style={commonStyle.navigationWarpper}>
                <TouchableOpacity
                    style={commonStyle.navigationTouch}
                    onPress={() => { navigation.navigation.push('Search') }}
                >
                    <Image
                        style={commonStyle.imageStyle}
                        source={seachIcon}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={commonStyle.navigationTouch}
                    onPress={() => navigation.navigation.state.params.handleModalPopupAction()}
                >
                    <Image
                        style={commonStyle.imageStyle}
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
        this.props.dispatch(Actions.getNewsList(currentPageIndex, ITEMS_PER_PAGE, this.state.searchIdString));
        this.props.dispatch(Actions.getNewsSources());

        this.props.navigation.setParams({
            handleModalPopupAction: this.onModalPopupActionHandler.bind(this),
        });
    }

    /**
      * DEFAULT : when component receive props 
      * @param nextProps 
    */
    UNSAFE_componentWillReceiveProps(nextProps) {
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
            this.props.dispatch(Actions.getNewsList(this.state.currentPageIndex + 1, ITEMS_PER_PAGE, this.state.searchIdString));
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
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => { this.props.navigation.navigate("NewsDetail", { "detail": item }) }}
            >
                <ImageBackground source={{ uri: image }} resizeMethod="resize" resizeMode="cover" style={[commonStyle.itemContainer]}>
                    <Text style={commonStyle.newsTitleStyle}>{title}</Text>
                </ImageBackground>
            </TouchableOpacity>
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
        this.props.dispatch(Actions.getNewsList(1, ITEMS_PER_PAGE, searchIdString));
    }

    render() {
        return (
            <View style={commonStyle.container}>
                <Spinner key={Math.random()} visible={this.props.loading} />

                {(this.state.newsList && this.state.newsList.length > 0) ?
                    <GridView
                        itemDimension={130}
                        items={this.state.newsList}
                        style={commonStyle.gridStyle}
                        renderItem={this.renderNewsItem}
                        onEndReachedThreshold={0.2}
                        onEndReached={this.renderLoadMoreItems}
                    />
                    :
                    <Text style={commonStyle.notFoundStyle}>News not available</Text>
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

export default connect()(NewsView);