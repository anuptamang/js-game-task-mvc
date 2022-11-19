import { UI_CONSTANTS } from '../data/constants'

class View {
  constructor() {
    this.gameBox = document.querySelector(`[${UI_CONSTANTS.gameBox}]`)
    this.gameBoxScreenHolder = this.gameBox?.querySelector(
      `[${UI_CONSTANTS.gameScreenHolder}]`
    )
    this.playBtns = this.gameBox?.querySelectorAll(
      `[${UI_CONSTANTS.gameControllerBtn}]`
    )
    this.counterBtns = this.gameBox?.querySelectorAll(
      `[${UI_CONSTANTS.gameCounterBtn}]`
    )
    this.counterDisplay = this.gameBox?.querySelector(
      `[${UI_CONSTANTS.gameCounterDisplay}]`
    )
  }

  _disableCounter() {
    this.counterBtns?.forEach((btn) =>
      btn.classList.add(UI_CONSTANTS.disabledClass)
    )
  }

  _enableCounter() {
    this.counterBtns?.forEach((btn) =>
      btn.classList.remove(UI_CONSTANTS.disabledClass)
    )
  }

  _itemIncrement(handler) {
    const { item, state, callback } = handler()

    if (state.counter < state.data.length) {
      this._addItem(item, state, callback)
      this._updateCounter(state)
    }
  }

  _itemDecrement(handler) {
    const { item, state } = handler()

    if (item) {
      this._removeItem(item, state)
      this._updateCounter(state)
    }
  }

  _addItem(item, state, callback) {
    this._moveShapeView(item, this._createImageView(item), state, callback)
    this._updateCounter(state)
  }

  _removeItem(item, state) {
    console.log(item)
    this._itemRemoveFromDomView(item.id)
    this._updateCounter(state)
  }

  _itemRemoveFromDomView(id) {
    document.getElementById(id)?.remove()
  }

  _moveShapeView(item, shape, state, callback) {
    let position = 0

    const frame = () => {
      if (
        position ===
        this.gameBoxScreenHolder?.clientHeight - shape.offsetHeight
      ) {
        clearInterval(id)
        shape.remove()
        callback()
        this._updateCounter(state)
      } else {
        position++
        shape.style.bottom = position + 'px'
      }
    }
    let id = setInterval(frame, 15)
  }

  _createImageView(item) {
    if (item) {
      const type = item.figure
      const typeArr = type?.split(' ')
      const randomVal = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min

      const div = document.createElement('div')
      if (typeArr) {
        typeArr?.length > 1 && typeArr?.length < 3
          ? div.classList.add('figure', `figure-${typeArr[0]}`, `${typeArr[1]}`)
          : typeArr?.length > 2
          ? div.classList.add(
              'figure',
              `figure-${typeArr[0]}`,
              `${typeArr[1]}`,
              `${typeArr[2]}`
            )
          : div.classList.add('figure', `figure-${typeArr[0]}`)
      }
      div.setAttribute('id', item.id)
      div.style.left = `${randomVal(0, 80)}%`
      this.gameBoxScreenHolder?.appendChild(div)

      document.getElementById(`${item.id}`)?.classList.add('out')
      setTimeout(() =>
        document.getElementById(`${item.id}`)?.classList.add('in')
      )

      return div
    }
  }

  _updateCounter(state) {
    if (this.counterDisplay) {
      this.counterDisplay.innerHTML = `Counts: ${state.counter}`
    }
  }

  bindToggleStartStop(handler) {
    this._disableCounter()

    this.playBtns?.forEach((btn) => {
      btn?.addEventListener('click', () => {
        if (
          btn?.getAttribute(UI_CONSTANTS.controllerBtnAttr)?.toUpperCase() ===
          UI_CONSTANTS.START
        ) {
          this._enableCounter()
        } else {
          this.gameBoxScreenHolder.innerHTML = ''
          this._disableCounter()
          const { state } = handler()
          this._updateCounter(state)
        }
      })
    })
  }

  bindAdd(handler) {
    this.counterBtns?.forEach((btn) => {
      btn.addEventListener(
        'click',
        () =>
          btn?.getAttribute(UI_CONSTANTS.counterBtnAttr)?.toUpperCase() ===
            UI_CONSTANTS.INCREMENT && this._itemIncrement(handler)
      )
    })
  }

  bindRemove(handler) {
    this.counterBtns?.forEach((btn) => {
      btn.addEventListener(
        'click',
        () =>
          btn?.getAttribute(UI_CONSTANTS.counterBtnAttr)?.toUpperCase() ===
            UI_CONSTANTS.DECREMENT && this._itemDecrement(handler)
      )
    })
  }
}

export default View
