import './assets/styles/main.scss'
import Controller from './controllers/controller'
import Model from './models/model'
import View from './views/view'

const app = new Controller(new Model(), new View())
