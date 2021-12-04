const grid = document.querySelector('.grid')
const list_items = document.querySelectorAll('.list-item')

/**
 * Fetch data from a Json file
 * @param {String} type String
 */
function fetchData(type = 'daily') {
    fetch('../data.json')
        .then(res => res.json())
        .then(data => {
            type = type.toLowerCase();
            data.map(dt => displayCard(dt, type))
        })
        .catch(err => console.error(err.message));
}

fetchData()

/**
 * Display a card item for each getting data
 * @param {object} data Object
 * @param {string} type String
 */
function displayCard(data, type) {
    const card = document.createElement('div')
    const title = data.title.toString().replace(/[' ']/, '-')
    const times = data.timeframes[type]
    
    card.classList = `card ${title.toLowerCase()}`
    card.innerHTML = `<div class="card__header"></div>
        <div class="card__body">
            <div class="nav">
                <span class="title">${title}</span>
                <img src="./images/icon-ellipsis.svg" alt="...">
            </div>
            <div class="card__text">
                <h2 class="current">${times.current}hrs</h2>
                <p class="previous">Last Week - ${times.previous}hrs</p>
            </div>
        </div>`
    grid.appendChild(card)
}

list_items.forEach(item => {
    item.addEventListener('click', () => {
        // Toggle active class
        list_items.forEach(el => {
            if (el.classList.contains('active')) {
                el.classList.remove('active')
            }
        })
        item.classList.add('active')
        // Display fresh data
        grid.innerHTML = ''
        fetchData(item.innerHTML)
    })
})
