import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import commonStyle from "../../shared/styles/commonStyle";
import { COLORS } from '../../shared/constants/common';

/**
 * News Deatil componet class
 */
class NewsDetailView extends Component {
  static displayName = "News Detail";
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
        <Text>News Detail</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.colorCreamWhite,
  }
});

export default connect()(NewsDetailView);