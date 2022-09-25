import { render } from './script.js'

// Delete card
function handleCardDelete (event) {

    const target = event.target

    const on = target.classList.contains('card-delete')

    if (on != true) return

    const id = target.parentElement.parentElement.parentElement.getAttribute('id')

    const toDo = data.find((item) => item.id == id)
    const index = data.indexOf(toDo)

    data.splice(index, 1)

    render(data)
}

export { handleCardDelete }