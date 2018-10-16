import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, StyleSheet } from 'react-native';
import commonStyle from "../../shared/styles/commonStyle";
import { COLORS } from '../../shared/constants/common';

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
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: newsDetail.urlToImage }} style={styles.featureImage} />
        </View>
        <View style={styles.newsDescription}>
          <Text style={styles.newsTitle}>{newsDetail.title}</Text>
          <Text style={styles.newsAuthor}>Author: {newsDetail.author}</Text>
          <Text style={styles.newsContent}>{newsDetail.content}</Text>
        </View>
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
  },
  imageContainer: {
    width: '100%',
    height: '40%'
  },
  featureImage: {
    width: '100%',
    height: '100%'
  },
  newsDescription: {
    paddingLeft: 20,
    paddingRight: 20
  },
  newsTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  newsAuthor: {
    fontSize: 12
  },
  newsContent: {
    fontSize: 12,
    marginTop: 10
  }
});

export default connect()(NewsDetailView);