import createStore from './createStore'
import reducer from './reducer'
import createListItem from './createListItem'

let init = []
if (localStorage.getItem('bookmarks')) {
    init = JSON.parse(localStorage.getItem('bookmarks'))
}

export const store = createStore(reducer, init)

console.log(store)

window.onload = function () {
    const urlInput = document.getElementById('urlInput')
    const favBookMarks = document.getElementById('favBookMarks')
    const allBookMarks = document.getElementById('allBookMarks')

    urlInput.onkeypress = function(event) {
        if(event.key === 'Enter') {
            const url = event.target.value
            const name = nameFromUrl(url)
            const isFav = false
            const id = UUID()

            store.dispatach({
                type: 'ADD_BOOKMARKS',
                payload: {
                    url, name, isFav, id
                }
            })
            event.target.value = ''
        }
    }
}

    store.subscribe(() => {
        allBookMarks.innerHTML = null
        store.getState().forEach(bookmark => {
            let li = createListItem(bookmark)
            allBookMarks.appendChild(li)
        })
    })

    store.subscribe(() => {
        favBookMarks.innerHTML = null
        store.getState().forEach(bookmark => {
            if(bookmark.isFav) {
                let li = createListItem(bookmark)
                favBookMarks.appendChild(li)
            }
        })
    })


function nameFromUrl(url) {
    return url.match(/:\/\/(.[^/]+)/)[1]
}
function UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
