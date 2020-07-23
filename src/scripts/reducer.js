const init = [
    {
        url: 'https://facebook.com',
        name: 'facebook.com',
        isFav: false,
        id: 's12'
    }
]

const reducer = (state = init, action) => {
    switch (action.type) {
        case 'ADD_BOOKMARKS' : {
            return state.concat(action.payload)
        }
        case 'REMOVE_BOOKMARKS': {
            return state.filter(bookmarks => bookmarks.id !== action.payload)
        }
        case 'TOGGLE_FAVORITE' : {
            return state.map(bookmark => {
                if(bookmark.id === action.payload) {
                    bookmark.isFav =! bookmark.isFav
                }
                return bookmark
            })
        }
        default: return state 
    }
}
export default reducer