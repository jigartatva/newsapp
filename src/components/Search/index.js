import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Image
} from 'react-native';
//external libraries
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GridView from 'react-native-super-grid';
//services
import * as Actions from '../../actions';
//custom component
import Spinner from '../Spinner';
import CrossIcon from '../CrossIcon';
import ModalBox from '../ModalBox';
//common functions
import { ICONS, COLORS, ITEMS_PER_PAGE } from '../../shared/constants/common';
import * as CommonFunc from '../../shared/utils/commonFunc';
import commonStyle from "../../shared/styles/commonStyle";
const { left_arrow_icon, filterIcon } = ICONS;

/**
 * Search view componet class
 */
class SearchView extends Component {
    static displayName = "Search View";

    static propTypes = {
        dispatch: PropTypes.func,
        navigation: PropTypes.any,
        newsList: PropTypes.string,
        loading: PropTypes.bool,
        newsSources: PropTypes.any
    }


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

    /**
      * DEFAULT : when component will receive props 
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

        if (this.state.searchby !== "" && this.state.searchby.length >= 2) {
            if (maxItems >= this.state.currentPageIndex * ITEMS_PER_PAGE) {
                this.props.dispatch(Actions.getNewsListBySearch(this.state.searchby, this.state.currentPageIndex + 1, ITEMS_PER_PAGE, this.state.searchIdString));
                this.setState({ currentPageIndex: this.state.currentPageIndex + 1 });
            }
        }
    }

    /**
      * Render news items 
      * @param item 
      * @param index 
      * @return ImageBackground component
    */
    renderNewsItem = (item, index) => {
        let title = item.title.substring(0, 50) + "...";
        let image = item.urlToImage;
        return (
            <ImageBackground source={{ uri: image }} resizeMethod="resize" resizeMode="cover" style={[commonStyle.itemContainer]}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { this.props.navigation.navigate("NewsDetail", { "detail": item }) }}
                >
                    <Text style={commonStyle.newsTitleStyle}>{title}</Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }

    /**
      * when search begin 
      * @param searchIdString 
    */
    beginSearch(searchIdString) {
        this.setState({ isModalPopupOpen: false, currentPageIndex: 1, newsList: [], searchIdString });
        this.props.dispatch(Actions.getNewsListBySearch(this.state.searchby, 1, ITEMS_PER_PAGE, searchIdString));
    }

    /**
      * News search by passing items (searchby) 
      * @param searchby 
    */
    newsSearchBy = (searchby) => {
        if (this.state.searchby !== "" && this.state.searchby.length >= 2) {
            this.setState({ currentPageIndex: 1, newsList: [] });
            this.props.dispatch(Actions.getNewsListBySearch(this.state.searchby, 1, 10, this.state.searchIdString));
        }
    }

    render() {
        return (
            <View style={commonStyle.container}>
                <View style={commonStyle.innerContainer}>
                    <View style={commonStyle.imageWrapper}>
                        <TouchableOpacity
                            style={commonStyle.imageTouch}
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Image
                                style={[commonStyle.imageTintColor]}
                                source={left_arrow_icon}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={commonStyle.searchContainerStyle}>
                        <View style={commonStyle.rowStyle}>
                            <View style={commonStyle.textInputWrapper}>
                                <TextInput
                                    autoFocus={true}
                                    style={[commonStyle.textField]}
                                    placeholder={"Search for news & articles"}
                                    onChangeText={(searchby) => this.setState({ searchby: searchby })}
                                    value={this.state.searchby}
                                    maxLength={50}
                                    returnKeyType={'done'}
                                    underlineColorAndroid="transparent"
                                    onSubmitEditing={this.newsSearchBy}
                                />
                            </View>
                            <View style={commonStyle.crossIconWrapper}>
                                {this.state.searchby.length > 0 && (
                                    <CrossIcon onPress={() => { this.setState({ searchby: "" }) }} />
                                )}
                            </View>
                        </View>
                    </View>
                    <View style={commonStyle.filterIconWrapper}>
                        <TouchableOpacity
                            style={commonStyle.imageTouch}
                            onPress={() => { this.setState({ isModalPopupOpen: true }) }}
                        >
                            <Image
                                style={[commonStyle.filterIconStyle]}
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
                        style={commonStyle.gridStyle}
                        renderItem={this.renderNewsItem}
                        onEndReachedThreshold={0.2}
                        onEndReached={this.renderLoadMoreItems}
                    />
                    :
                    <Text style={commonStyle.notFoundStyle}>
                        {this.props.newsList && JSON.parse(this.props.newsList).totalResults == 0 ? 'News not found for the selected criteria' : ''}
                    </Text>
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

export default connect()(SearchView);