import PlaceFinder from './PlaceFinder'
import { searchBusinessList } from "../../../store/actions"
import {connect} from 'react-redux';

const mapDispatchToProps = dispatch => {
    return {
        searchBusinessList: () => dispatch(searchBusinessList()),
    }
};

export default connect(() => {}, mapDispatchToProps)(PlaceFinder);