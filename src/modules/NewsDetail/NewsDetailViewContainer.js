import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import NewsDetailView from './NewsDetailView';

const mapStateToProps = (state, props) => ({
    loading : state.getIn(['appReducer','loading']),
});

const mapDispatchToProps = dispatch => ({
    navigate: bindActionCreators(NavigationActions.navigate, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetailView);