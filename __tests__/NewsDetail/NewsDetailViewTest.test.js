import React from 'react';
import { NavigationActions } from 'react-navigation';
import NewsDetailView from '../../src/components/NewsDetail';
import { Provider } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import configureStore from '../../src/redux/store';
import { shallow, configure } from 'enzyme';
import { TouchableOpacity, ModalBox } from 'react-native';

// fix Enzyme to work with React 16 as per https://github.com/airbnb/enzyme#installation
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

const store = configureStore();

import renderer from 'react-test-renderer';


describe('NEWS DETAIL VIEW ', () => {
  jest.mock('WebView');
  const props = {
    navigation: {
      setParams: jest.fn(),
      navigate: jest.fn(),
      getParam: jest.fn()
    }
  };

  it('should render "NEWS DETAIL VIEW"', () => {
    const tree = shallow(
      <NewsDetailView {...props} dispatch={jest.fn} store={store} />
    );
    expect(tree.containsMatchingElement(<legend>NewsDetailView</legend>));
  });


});