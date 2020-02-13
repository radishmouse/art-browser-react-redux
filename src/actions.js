import Axios from 'axios';

export const SEARCH = 'SEARCH';
export const SELECT = 'SELECT';
export const RESULTS = 'RESULTS';
export const LOADING = 'LOADING';

export function asyncActionGetResults(query) {
    return (dispatch, getState) => {
        dispatch(actionSearch(query));
        Axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`)            
            .then(apiResults => {                
                const { results } = getState();
                if (apiResults.data.objectIDs.length > results.length) {
                    console.log(`Got ${apiResults.data.objectIDs.length} results`);
                    dispatch(actionResults(apiResults.data.objectIDs));
                }
            })
    }
}

export function actionLoading(isLoading) {
    return {
        type: LOADING,
        payload: {
            isLoading
        }
    }
}

export function actionResults(results) {
    return {
        type: RESULTS,
        payload: {
            results
        }
    }
}

export function actionSearch(query) {

    return {
        type: SEARCH,
        payload: {
            query
        }
    }
}

export function actionSelect(id) {
    return {
        type: SELECT,
        payload: {
            id
        }
    }
}