import { inputCardTitleElement, textareaCardDescriptionElement, selectStatusCardElement, selectUserCardElement, formElement } from './script.js'
import { handleOpenClosePopup } from './handleOpenClosePopup.js'
import { render } from './script.js'

// Get data form
function handleSubmitForm (event) {

    event.preventDefault()

    const cardTitle = inputCardTitleElement.value
    const cardDescription = textareaCardDescriptionElement.value
    const selectorValue = selectStatusCardElement.value
    const createAt = new Date()
    const userName = selectUserCardElement.value

    const toDo = {
        cardTitle,
        cardDescription,
        createAt,
        id: createAt.getTime(),
        selectorValue,
        userName
    }
    
    data.push(toDo)
    formElement.reset()
    handleOpenClosePopup()

    render(data)
}

export { handleSubmitForm }