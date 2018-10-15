import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import SearchView from '../components/Search';

const mapStateToProps = (state, props) => ({
  loading: state.getIn(['appReducer', 'loading']),
  newsList: state.getIn(['newsReducer', 'newsList']),
  newsSources: state.getIn(['newsReducer', 'newsSources'])
});

const mapDispatchToProps = dispatch => ({
  navigate: bindActionCreators(NavigationActions.navigate, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);