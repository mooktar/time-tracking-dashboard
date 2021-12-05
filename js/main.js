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
    const title = data.title.toString().toLowerCase().replace(/[' ']/, '-')
    const times = data.timeframes[type]
    const current_hrs = document.querySelector(`.${title} .current .hrs`)
    const previous_hrs = document.querySelector(`.${title} .previous .hrs`)

    current_hrs.innerHTML = times.current
    previous_hrs.innerHTML = times.previous
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
        fetchData(item.innerHTML)
    })
})
