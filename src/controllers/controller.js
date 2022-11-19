class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    this.view.bindToggleStartStop(this.handleToggleStartStop)
    this.view.bindAdd(this.handleAdd)
    this.view.bindRemove(this.handleRemove)
  }

  handleToggleStartStop = () => {
    const state = this.model.stopGame()
    return { state }
  }

  handleAdd = () => {
    const item = this.model.addItem()
    const state = this.model.state
    const callback = () => this.model.updateOnMoveUp(item)
    return { item, state, callback }
  }

  handleRemove = () => {
    const item = this.model.removeItem()
    const state = this.model.state

    return { item, state }
  }

  handleUpdateCounter = () => {
    const counter = this.model.updateCounter()
    return { counter }
  }
}

export default Controller
