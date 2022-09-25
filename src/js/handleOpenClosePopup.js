import { formElement, templatePopupCardElement } from './script.js'

// Open and close show popup
function handleOpenClosePopup () {
    
    formElement.reset()
    templatePopupCardElement.classList.toggle('show')
}

export { handleOpenClosePopup }