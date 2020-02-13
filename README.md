# Making Ajax requests from React + Redux 

Summary: Use option #1 unless you need to compare to existing state.

## Option #1: async/await in `mapDispatchToProps`

```js
function mapDispatchToProps(dispatch) {
    return {
        handleClick: async (query) => {
            dispatch(actionLoading(true));
            dispatch(actionSearch(query));

            const results = await Axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`);

            dispatch(actionResults(results.data.objectIDs));
            dispatch(actionLoading(false));
        }
    }
}
```

## Option #2: `redux-thunk`

Install the `redux-thunk` node module:

```sh
npm i redux-thunk
```

Update `App.js` (or wherever you create your store)

```
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { art } from './reducers';
//...
const store = createStore(art, applyMiddleware(ReduxThunk));
```

Create an action creator that returns a function:

```js
export function asyncActionGetResults(query) {
    return (dispatch, getState) => {
        dispatch(actionLoading(true));
        dispatch(actionSearch(query));
        Axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`)            
        .then(apiResults => {                
            const { results } = getState();
            
            // Contrived example using a made-up function to compare arrays:
            if (!areSame(results, apiResults.data.objectIDs)) {
                dispatch(actionResults(apiResults.data.objectIDs));
            }
            dispatch(actionLoading(false));
        })
    }
```

Your `mapDispatchToProps` goes back to the non-async version:

```js
function mapDispatchToProps(dispatch) {
    return {
        handleClick: (query) => {
            dispatch(asyncActionGetResults(query))
        }       
    }
}
```

# Met art API URLs

## example URL for search
https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers


## example URL for a single work of art
https://collectionapi.metmuseum.org/public/collection/v1/objects/436524