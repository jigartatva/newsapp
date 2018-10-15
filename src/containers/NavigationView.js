import { createStackNavigator } from 'react-navigation';
import NewsViewContainer from './NewsViewContainer';
import NewsDetailViewContainer from './NewsDetailViewContainer';
import SearchViewContainer from './SearchViewContainer';
const AppNavigator = createStackNavigator(
  {
    News: { screen: NewsViewContainer, navigationOptions: { gesturesEnabled: false } },
    NewsDetail: { screen: NewsDetailViewContainer, navigationOptions: { gesturesEnabled: false } },
    Search: { screen: SearchViewContainer, navigationOptions: { header: null, gesturesEnabled: false } }
  },
  {
    initialRouteName: 'News',
  }
);

export default AppNavigator;
