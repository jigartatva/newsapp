import { createStackNavigator } from 'react-navigation';
import NewsViewContainer from '../News/NewsViewContainer';
import NewsDetailViewContainer from '../NewsDetail/NewsDetailViewContainer';
import SearchViewContainer from '../Search/SearchViewContainer';
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
