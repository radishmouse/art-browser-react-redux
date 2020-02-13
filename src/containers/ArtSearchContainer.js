import {
    connect
} from 'react-redux';
import ArtSearch from '../components/ArtSearch';
import { 
    actionSearch, 
    actionResults,
    actionLoading,
    asyncActionGetResults
} from '../actions';

function mapDispatchToProps(dispatch) {
    return {
        handleClick: () => {
            dispatch(asyncActionGetResults('bunnies'))
        }
        // handleClick: async () => {
        //     dispatch(actionLoading(true));
        //     const results = await Axios.get('https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers')                        

        //     dispatch(actionSearch('sunflowers'));
        //     dispatch(actionResults(results.data.objectIDs));
        //     dispatch(actionLoading(false));
        // }
    }
}

const reduxConnector = connect(null, mapDispatchToProps);
export default reduxConnector(ArtSearch);