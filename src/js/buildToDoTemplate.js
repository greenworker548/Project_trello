import { templateCardElement } from './script.js'


// Templates
function buildToDoTemplate (object) {

    const date = object.createAt.getHours() + ':' + object.createAt.getMinutes()

    let template = templateCardElement.innerHTML
  
    const payload = {
      ... object,
      date
    }

    for (let key in payload) {
        template = template.replaceAll(`{{${key}}}`, payload[key])
    }

    if (payload.selectorValue == 1) {
        template = template.replaceAll(`{{one}}`, `selected`).replaceAll(`{{color}}`, 'one')
    }

    if (payload.selectorValue == 2) {
        template = template.replaceAll(`{{two}}`, `selected`).replaceAll(`{{color}}`, 'two')
    }

    if (payload.selectorValue == 3) {
        template = template.replaceAll(`{{three}}`, `selected`).replaceAll(`{{color}}`, 'three')
    }

    return template
}

export { buildToDoTemplate }