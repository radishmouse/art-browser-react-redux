import {
    connect
} from 'react-redux';
import ArtSearch from '../components/ArtSearch';
import { 
    actionSearch, 
    actionResults,
    actionLoading,
} from '../actions';
import Axios from 'axios';


function mapDispatchToProps(dispatch) {
    return {
        handleClick: async () => {
            dispatch(actionLoading(true));
            const results = await Axios.get('https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers')                        

            dispatch(actionSearch('sunflowers'));
            dispatch(actionResults(results.data.objectIDs));
            dispatch(actionLoading(false));

            // Alternatively: don't do async/await. Just use the promise chain.
            // Axios.get('https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers')            
            //     .then(results => {
            //         dispatch(actionSearch('sunflowers'));
            //         dispatch(actionResults(results.data.objectIDs));
            //     })
            //     .catch()

        }
    }
}

const reduxConnector = connect(null, mapDispatchToProps);
export default reduxConnector(ArtSearch);