import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Image, Text } from 'react-native';
import commonStyle from "../../shared/styles/commonStyle";

/**
 * News Deatil componet class
 */
class NewsDetailView extends Component {
    static displayName = "News Detail";

    static propTypes = {
        navigation: PropTypes.any
    }

    static navigationOptions = ({ navigation }) => ({
        title: "News Detail",
        headerStyle: commonStyle.navigationHeader,
        headerTitleStyle: commonStyle.navigationHeaderTitle
    });

    constructor(props) {
        super(props);
    }

    render() {
        const navigator = this.props.navigation;
        let newsDetail = navigator.getParam("detail");
        return (
            <View style={commonStyle.container}>
                <View style={commonStyle.imageContainer}>
                    <Image source={{ uri: newsDetail.urlToImage }} style={commonStyle.featureImage} />
                </View>
                <View style={commonStyle.newsDescription}>
                    <Text style={commonStyle.newsTitle}>{newsDetail.title}</Text>
                    <Text style={commonStyle.newsAuthor}>Author: {newsDetail.author}</Text>
                    <Text style={commonStyle.newsContent}>{newsDetail.content}</Text>
                </View>
            </View>
        );
    }
}

export default connect()(NewsDetailView);