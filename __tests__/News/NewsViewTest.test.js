import React from 'react';
import NewsView from '../../src/components/News';
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


describe('NEWS VIEW ', () => {
  jest.mock('WebView');
  const props = {
    navigation: {
      setParams: jest.fn(),
      navigate: jest.fn()
    },
    newsList: '',
  };
  const newsData = {
    "status": "ok",
    "totalResults": 20,
    "articles": [
      {
        "source": {
          "id": "reuters",
          "name": "Reuters"
        },
        "author": null,
        "title": "Bodies of mother clutching baby found as Indonesia quake toll rises above 1500",
        "description": null,
        "url": "https://www.reuters.com/article/us-indonesia-quake/bodies-of-mother-clutching-baby-found-as-indonesia-quake-toll-rises-above-1500-idUSKCN1MD2JE",
        "urlToImage": null,
        "publishedAt": "2018-10-05T09:38:39Z",
        "content": null
      },
      {
        "source": {
          "id": null,
          "name": "Thestreet.com"
        },
        "author": "Joseph Woelfel",
        "title": "Jobs Report, Elon Musk, China Spy Chips and Costco - 5 Things You Must Know",
        "description": "U.S. stock futures fall while government bond yields edge higher as investors prepare for the U.S. jobs report; economists expect the U.S. to have added 183,000 jobs in September, down from 201,000 in August; a tweet from Elon Musk's official Twitter account …",
        "url": "https://www.thestreet.com/markets/5-things-you-must-know-before-the-market-opens-friday-14733681",
        "urlToImage": "http://s.thestreet.com/files/tsc/v2008/photos/contrib/uploads/d93762cc-c67c-11e8-b433-379a1f941450.jpg",
        "publishedAt": "2018-10-05T09:31:13Z",
        "content": "Here are five things you must know for Friday, Oct. 5: 1. -- Stocks Fall, Bond Yields Rise Ahead of Jobs Report U.S. stock futures were lower on Friday, Oct. 5, while government bond yields around the world continued to edge higher as investors prepared for t… [+4877 chars]"
      },
      {
        "source": {
          "id": "the-new-york-times",
          "name": "The New York Times"
        },
        "author": null,
        "title": "Nobel Peace Prize Awarded to Denis Mukwege and Nadia Murad for Fighting Sexual Violence",
        "description": "The Nobel Committee said the Congolese surgeon and former ISIS captive were rewarded “for their efforts to end the use of sexual violence as a weapon of war and armed conflict.”",
        "url": "https://www.nytimes.com/2018/10/05/world/nobel-peace-prize.html",
        "urlToImage": "https://static01.nyt.com/images/2018/10/05/world/europe/06nobel-combo/05us-ambriefing-nobel-facebookJumbo.jpg",
        "publishedAt": "2018-10-05T09:09:02Z",
        "content": "He spent more than two months in exile but decided that, in spite of the risk, he had to return. “To treat women for the first time, second time, and now I’m treating the children born after rape,” Dr. Mukwege said. “This is not acceptable.” Ms. Murad was abd… [+1363 chars]"
      },
      {
        "source": {
          "id": "the-washington-post",
          "name": "The Washington Post"
        },
        "author": null,
        "title": "Here's why confirming Kavanaugh could seriously undermine the Supreme Court's public standing",
        "description": "Along with Gorsuch, Kavanaugh would have been appointed by a president who lost the popular vote and confirmed by senators representing a minority of the U.S. population.",
        "url": "https://www.washingtonpost.com/news/monkey-cage/wp/2018/10/05/heres-why-confirming-kavanaugh-could-seriously-undermine-the-supreme-courts-public-standing/",
        "urlToImage": "https://www.washingtonpost.com/resizer/7ztoXaY4Z3MxKPzZtnjHG0HJITE=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/WXAR224CO4ZA3LIM6NS27ZNTJA.jpg",
        "publishedAt": "2018-10-05T09:02:23Z",
        "content": "Could Brett Kavanaugh’s nomination undermine the public standing of the Supreme Court? Observers like The Atlantic’s Ron Brownstein think so. “Every time [Chief Justice John] Roberts would lean on Kavanaugh to construct a majority,” Brownstein writes, “the ch… [+4407 chars]"
      },
    ]
  };
  const sorceData = [
    {
      "id": "abc-news",
      "name": "ABC News",
      "description": "Your trusted source for breaking news, analysis, exclusive interviews, headlines, and videos at ABCNews.com.",
      "url": "https://abcnews.go.com",
      "category": "general",
      "language": "en",
      "country": "us"
    },
    {
      "id": "abc-news-au",
      "name": "ABC News (AU)",
      "description": "Australia's most trusted source of local, national and world news. Comprehensive, independent, in-depth analysis, the latest business, sport, weather and more.",
      "url": "http://www.abc.net.au/news",
      "category": "general",
      "language": "en",
      "country": "au"
    },
    {
      "id": "aftenposten",
      "name": "Aftenposten",
      "description": "Norges ledende nettavis med alltid oppdaterte nyheter innenfor innenriks, utenriks, sport og kultur.",
      "url": "https://www.aftenposten.no",
      "category": "general",
      "language": "no",
      "country": "no"
    },
    {
      "id": "al-jazeera-english",
      "name": "Al Jazeera English",
      "description": "News, analysis from the Middle East and worldwide, multimedia and interactives, opinions, documentaries, podcasts, long reads and broadcast schedule.",
      "url": "http://www.aljazeera.com",
      "category": "general",
      "language": "en",
      "country": "us"
    },
    {
      "id": "ansa",
      "name": "ANSA.it",
      "description": "Agenzia ANSA: ultime notizie, foto, video e approfondimenti su: cronaca, politica, economia, regioni, mondo, sport, calcio, cultura e tecnologia.",
      "url": "http://www.ansa.it",
      "category": "general",
      "language": "it",
      "country": "it"
    },
    {
      "id": "argaam",
      "name": "Argaam",
      "description": "ارقام موقع متخصص في متابعة سوق الأسهم السعودي تداول - تاسي - مع تغطيه معمقة لشركات واسعار ومنتجات البتروكيماويات , تقارير مالية الاكتتابات الجديده ",
      "url": "http://www.argaam.com",
      "category": "business",
      "language": "ar",
      "country": "sa"
    },
    {
      "id": "ars-technica",
      "name": "Ars Technica",
      "description": "The PC enthusiast's resource. Power users and the tools they love, without computing religion.",
      "url": "http://arstechnica.com",
      "category": "technology",
      "language": "en",
      "country": "us"
    }]

  it('should render "NEWS VIEW"', () => {
    const tree = shallow(
      <NewsView {...props} dispatch={jest.fn} store={store} />
    );
    expect(tree.containsMatchingElement(<legend>NewsView</legend>));
  });

  it('should render "NEWS VIEW" with news data', () => {

    const tree = shallow(
      <NewsView
        {...props}
        newsList={''}
        dispatch={jest.fn}
        store={store}
      />
    );
    const wrapper = tree.dive();
    wrapper.setProps({ newsList: JSON.stringify(newsData) });
    wrapper.update();
    expect(wrapper.props().children[1].props.items.length).toEqual(4);
  });

  it('should render "NEWS VIEW" with news data and opens modal popup', () => {

    const tree = shallow(
      <NewsView
        {...props}
        newsList={''}
        dispatch={jest.fn}
        store={store}
      />
    );
    const wrapper = tree.dive();
    wrapper.setProps({ newsList: JSON.stringify(newsData) });
    wrapper.update();
    wrapper.instance().setState({ isModalPopupOpen: true });
    wrapper.update();
    expect(wrapper.props().children[2].props.isOpen).toEqual(true);
  });

  it('should render "NEWS VIEW" with news data opens modal and in ok click', () => {

    const tree = shallow(
      <NewsView
        {...props}
        newsList={''}
        dispatch={jest.fn}
        store={store}
      />
    );
    const wrapper = tree.dive();
    wrapper.setProps({ newsList: JSON.stringify(newsData) });
    wrapper.update();
    wrapper.instance().setState({ isModalPopupOpen: true });
    wrapper.update();
    wrapper.props().children[2].props.actionOk();
    expect(wrapper.props().children[2].props.isOpen).toEqual(false);
  });


  it('should render "NEWS VIEW" with news data opens modal and on cancel click', () => {

    const tree = shallow(
      <NewsView
        {...props}
        newsList={''}
        dispatch={jest.fn}
        store={store}
      />
    );
    const wrapper = tree.dive();
    wrapper.setProps({ newsList: JSON.stringify(newsData) });
    wrapper.update();
    wrapper.instance().setState({ isModalPopupOpen: true });
    wrapper.update();
    wrapper.props().children[2].props.actionCancel();
    expect(wrapper.props().children[2].props.isOpen).toEqual(false);
  });

  it('should render "NEWS VIEW" with news data and renders news list item', () => {

    const tree = shallow(
      <NewsView
        {...props}
        newsList={''}
        dispatch={jest.fn}
        store={store}
      />
    );
    const wrapper = tree.dive();
    wrapper.setProps({ newsList: JSON.stringify(newsData) });
    wrapper.update();
    const GridView = wrapper.props().children[1].props;
    GridView.renderItem(newsData.articles[0], 0);
    wrapper.update();
    expect(GridView.renderItem(newsData.articles[0], 0).props.children.props.children.props.children)
      .toEqual(newsData.articles[0].title.substring(0, 50) + "...");
  });

  it('should render "NEWS VIEW" with news data and renders news list item, and on news item click to view news details', () => {

    const tree = shallow(
      <NewsView
        {...props}
        newsList={''}
        dispatch={jest.fn}
        store={store}
      />
    );
    const wrapper = tree.dive();
    wrapper.setProps({ newsList: JSON.stringify(newsData) });
    wrapper.update();
    const GridView = wrapper.props().children[1].props;
    GridView.renderItem(newsData.articles[0], 0);
    wrapper.update();
    GridView.renderItem(newsData.articles[0], 0).props.onPress();
    expect(GridView.renderItem(newsData.articles[0], 0).props.onPress()).toBeUndefined();
  });

  it('should render "NEWS VIEW" with news data, opens modal popup and on search click with category ids', () => {

    const tree = shallow(
      <NewsView
        {...props}
        newsList={''}
        dispatch={jest.fn}
        store={store}
      />
    );
    const wrapper = tree.dive();
    wrapper.setProps({ newsList: JSON.stringify(newsData) });
    wrapper.update();
    wrapper.instance().setState({ isModalPopupOpen: true });
    wrapper.update();
    wrapper.props().children[2].props.doSearch('abc-news, argaam');
    expect(wrapper.props().children[2].props.isOpen).toEqual(false);
  });


  it('should render "NEWS VIEW" with sources data', () => {
    const tree = shallow(
      <NewsView
        {...props}
        store={store}
        newsList={JSON.stringify(newsData)}
        newsSources={JSON.stringify(sorceData)}
        dispatch={jest.fn}
      />
    );
    const wrapper = tree.dive();
    const ListView = shallow(wrapper.props().children[2]).props().children.props.children.props.children[1].props.children;
    const ListViewRender = shallow(ListView).props().children;
    expect(ListViewRender).toHaveLength(8);
  });

  it('should select sources using checkbox', () => {
    const tree = shallow(
      <NewsView
        {...props}
        newsList={''}
        newsSources={''}
        store={store}
        dispatch={jest.fn}

      />
    );
    const wrapper = tree.dive();
    wrapper.setProps({ newsList: JSON.stringify(newsData) });
    wrapper.update();
    wrapper.instance().setState({ isModalPopupOpen: true });
    wrapper.update();
    wrapper.setProps({ newsSources: JSON.stringify(sorceData) });
    wrapper.update();
    const ListView = shallow(wrapper.props().children[2]).props().children.props.children.props.children[1].props.children;
    const ListViewRender = shallow(ListView).props().children;

    shallow(ListViewRender[2]).props().onCheck(sorceData[0]);
    expect(shallow(ListViewRender[1]).props().isChecked).toEqual(true);

    shallow(ListViewRender[2]).props().onCheck(sorceData[1]);
    expect(shallow(ListViewRender[2]).props().isChecked).toEqual(true);

    shallow(ListViewRender[2]).props().onCheck(sorceData[0]);
    expect(shallow(ListViewRender[1]).props().isChecked).toEqual(false);

    shallow(ListViewRender[2]).props().onCheck(sorceData[0]);
    expect(shallow(ListViewRender[1]).props().isChecked).toEqual(true);

    shallow(shallow(shallow(ListViewRender[2]).dive().props().children[1]).props().children()).props().children.props.onPress();
    expect(shallow(ListViewRender[2]).props().isChecked).toEqual(false);

    shallow(shallow(shallow(ListViewRender[2]).dive().props().children[1]).props().children()).props().children.props.onPress();
    expect(shallow(ListViewRender[2]).props().isChecked).toEqual(true);

  });

  it('should select sources using checkbox and click on search', () => {
    const tree = shallow(
      <NewsView
        {...props}
        newsList={''}
        newsSources={''}
        store={store}
        dispatch={jest.fn}

      />
    );

    const wrapper = tree.dive();
    wrapper.setProps({ newsList: JSON.stringify(newsData) });
    wrapper.update();
    wrapper.instance().setState({ isModalPopupOpen: true });
    wrapper.update();
    wrapper.setProps({ newsSources: JSON.stringify(sorceData) });
    wrapper.update();
    const ListView = shallow(wrapper.props().children[2]).props().children.props.children.props.children[2].props.children;
    ListView.props.onPress()
    shallow(wrapper.props().children[2]).props().onRequestClose();
    expect(wrapper.props().children[2].props.isOpen).toEqual(false);
  });

});