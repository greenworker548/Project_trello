import { handleSubmitForm } from './handleSubmitForm.js'
import { buildToDoTemplate } from './buildToDoTemplate.js'
import { handleOpenClosePopup } from './handleOpenClosePopup.js'
import { handleCardDelete } from './handleCardDelete.js'
 
data = getData()

const headerWatchElement = document.querySelector('.header__watch') // watch
const templateCardElement = document.querySelector('#template__card') // card
const cardAddButtonElement = document.querySelector('.todo-button') // btn card add
const cardDeleteALLElement = document.querySelector('.done-button') // btn card delete

// Form build new card
const templatePopupCardElement = document.querySelector('.popup') // form build
const popupCloseBtnElement = document.querySelector('.popup__close') // close popup form build

const deletePopupCardElement = document.querySelector('.popup__delete') // popup warning delete
const closePopupDeleteElement = document.querySelector('.delete-close') // close popup warning delete
const confirmPopupDeleteElement = document.querySelector('.delete-confirm') // confirm delete all cards

const movingPopupElement = document.querySelector('.popup__moving') // popup moving
const closeMovingPopupElement = document.querySelector('.moving-close') // close popup moving

// Box cards
const contentTodoBoxElement = document.querySelector('.todo-content')
const contentProgressBoxElement = document.querySelector('.progress-content')
const contentDoneBoxElement = document.querySelector('.done-content')

const formElement = document.querySelector('.popup__content') // submit form
const inputCardTitleElement = document.querySelector('.title-input') // input add card
const textareaCardDescriptionElement = document.querySelector('.text-textarea') // textarea add card
const selectStatusCardElement = document.querySelector('.title-select') // select add card
const selectUserCardElement = document.querySelector('.popup__select') // select users add card

// Counters
const todoCounterElement = document.querySelector('.todo-counter')
const progressCounterElement = document.querySelector('.progress-counter')
const doneCounterElement = document.querySelector('.done-counter')

// Form edit
const popupEditCardElement = document.querySelector('.popup__edit')
const popupEditFormElement = document.querySelector('.edit__content')
const popupEditInputElement = document.querySelector('.title-input.edit')
const popupEditHiddenElement = document.querySelector('.title-hidden')
const popupEditTextareaElement = document.querySelector('.text-textarea.edit')
const popupEditSelectElement = document.querySelector('.edit__select')
const popupEditCloseElement = document.querySelector('.edit__close')

export { templateCardElement, inputCardTitleElement, textareaCardDescriptionElement, selectStatusCardElement, selectUserCardElement, formElement, templatePopupCardElement, render }

// Render
function render (data) {

    let htmlTodo = ''
    let htmlProgress = ''
    let htmlDone = ''
  
    data.forEach((item) => {

        if (item.selectorValue == 1) {
            const template = buildToDoTemplate(item)
            
            htmlTodo = htmlTodo + template
        }

        if (item.selectorValue == 2) {
            const template = buildToDoTemplate(item)
  
            htmlProgress = htmlProgress + template
        }

        if (item.selectorValue == 3) {
            const template = buildToDoTemplate(item)
  
            htmlDone = htmlDone + template
        }
    })

    getTodos('https://jsonplaceholder.typicode.com/users', 'GET')
        .then((todos) => printTodos(todos))
    .catch((error) => console.error(error))
  
    contentTodoBoxElement.innerHTML = htmlTodo
    contentProgressBoxElement.innerHTML = htmlProgress
    contentDoneBoxElement.innerHTML = htmlDone

    headerWatchElement.innerHTML = getWatchHeader()

    getCounterCard(data)

    setLocalStorage(data)
} 


// Edit card
function handleCardEdit (event) {

    const target = event.target

    const on = target.classList.contains('card-edit')

    if (on != true) return

    const id = target.parentElement.parentElement.parentElement.getAttribute('id')

    const toDo = data.find((item) => item.id == id)
    
    popupEditInputElement.setAttribute('value', toDo.cardTitle)
    popupEditHiddenElement.setAttribute('value', toDo.id)
    popupEditTextareaElement.innerHTML = toDo.cardDescription

    handleOpenCloseEditPopup()
}


//Edit content card and submit
function handleSubmitEditForm (event) {

    event.preventDefault()

    let id = popupEditHiddenElement.getAttribute('value')

    const toDo = data.find((item) => item.id == id)
    const index = data.indexOf(toDo)

    let editToDo = {
        ...toDo
    }

    editToDo.cardTitle = popupEditInputElement.value
    editToDo.cardDescription = popupEditTextareaElement.value
    editToDo.userName = popupEditSelectElement.value

    data.splice(index, 1, editToDo)

    popupEditFormElement.reset()

    handleOpenCloseEditPopup()

    render(data)
}


// Switch status card
function hundleSwitchStatusCard (event) {

    const target = event.target

    const on = target.classList.contains('card-select')

    if (on != true) return

    const id = target.parentElement.parentElement.getAttribute('id')

    const object = data.find((item) => item.id == id)

    if (target.value == 2 && (progressCounterElement.innerHTML >= '3')) {
        handleMovingPopupShow ()
        object.selectorValue = target.value
    } else {
        object.selectorValue = target.value
    }

    render(data)
}


// Open and close show edit popup
function handleOpenCloseEditPopup () {
    // console.log('da')

    popupEditCardElement.classList.toggle('show')
}


// Get time header
function getWatchHeader () {

    let watch = new Date()

    let hours
    let minutes
    let seconds

    if (watch.getHours() <= '9') {
        hours = '0' + watch.getHours()
    } else {
        hours = watch.getHours()
    }

    if (watch.getMinutes() <= '9') {
        minutes = '0' + watch.getMinutes()
    } else {
        minutes = watch.getMinutes()
    }

    if (watch.getSeconds() <= '9') {
        seconds = '0' + watch.getSeconds()
    } else {
        seconds = watch.getSeconds()
    }

    let timeWatch = hours + ':' + minutes + ':' + seconds

    return timeWatch
}

setInterval(() => {
    headerWatchElement.innerHTML = getWatchHeader()
}, 1000);


// Call popup delete cards 
function handleDeleteAllCards () {

    if (contentDoneBoxElement.innerHTML == 0) return

    deletePopupCardElement.classList.toggle('show')
}


// Close popup delete cards
function handleCLosePopupDelete () {

    deletePopupCardElement.classList.toggle('show')
}


// Delete done cards
function handleConfirmDeleteALLCards () {

    data = data.filter(item => item.selectorValue != 3)

    render(data)

    handleCLosePopupDelete ()
}


// Counter card
function getCounterCard (array) {

    let counterTodo
    let counterProgress
    let counterDone

    counterTodo = array.filter((item) => item.selectorValue == 1).length
    counterProgress = array.filter((item) => item.selectorValue == 2).length
    counterDone = array.filter((item) => item.selectorValue == 3).length

    todoCounterElement.innerHTML = counterTodo
    progressCounterElement.innerHTML = counterProgress
    doneCounterElement.innerHTML = counterDone
}


// Toggle class popup moving
function handleMovingPopupShow () {

    movingPopupElement.classList.toggle('show')
}


// Aditional function
function setLocalStorage (data) {
    let local = JSON.stringify(data)
    localStorage.setItem('data', local);
}

function getData () {
    const dataStorage = localStorage.getItem('data')
    const data = dataStorage ? JSON.parse(dataStorage) : []
    data.forEach(item => item.createAt = new Date(item.createAt))
  
    return data
}


// Get user select
function getTodos (url, method = 'GET') {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open(method, url)

        xhr.onload = function() {
            const todosData = JSON.parse(xhr.response)
            resolve(todosData)
        }

        xhr.onerror = function () {
            reject('Что-то пошло не так!')
        }
        xhr.send()
    })
}
function printTodos (todos) {

    let html = ''
    todos.forEach(({ name }) => {
        const option = `<option>${name}</option>`
        html += option
    })

    selectUserCardElement.innerHTML = html
    popupEditSelectElement.innerHTML = html
}


// Form one
formElement.addEventListener('submit', handleSubmitForm)

// Form two
popupEditFormElement.addEventListener('submit', handleSubmitEditForm)
popupEditCloseElement.addEventListener('click', handleOpenCloseEditPopup)

// Action with cards
document.addEventListener('click', handleCardDelete)
document.addEventListener('click', handleCardEdit)
document.addEventListener('change', hundleSwitchStatusCard)

cardAddButtonElement.addEventListener('click', handleOpenClosePopup)
popupCloseBtnElement.addEventListener('click', handleOpenClosePopup)

cardDeleteALLElement.addEventListener('click', handleDeleteAllCards)
closePopupDeleteElement.addEventListener('click', handleCLosePopupDelete)
confirmPopupDeleteElement.addEventListener('click', handleConfirmDeleteALLCards)

closeMovingPopupElement.addEventListener('click', handleMovingPopupShow)

// Reload website
document.addEventListener('DOMContentLoaded', render(data))