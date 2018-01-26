import Template from '../Template';
import html from './app.html';
import './app.css';
import Header from '../header/Header';
import Grid from '../grid/Grid';
import Resources from '../resources/Resources';
import Footer from '../footer/Footer.js';
import { removeChildren } from '../dom';

const template = new Template(html);

// Hash Navigation
const map = new Map();
map.set('#grid/add', Resources);

export default class App {

  constructor() {
    this.hashChange = () => this.setPage();
    window.addEventListener('hashchange', this.hashChange);
  }

  setPage() {
    const routes = window.location.hash.split('/');
    const page = routes[0];
    if(page === this.page) return;

    if(this.pageComponent) this.pageComponent.unrender();
    this.page = page;
    const Component = map.get(this.page) || Grid;
    this.pageComponent = new Component();
    removeChildren(this.main);
    this.main.appendChild(this.pageComponent.render());
  }

  render() {
    const dom = template.clone();   
      
    dom.querySelector('header').appendChild(new Header().render());
    dom.querySelector('footer').appendChild(new Footer().render());

    this.main = dom.querySelector('main');
    this.setPage();

    return dom;
  }

  unrender() {
    window.removeEventListener('hashchange', this.hashChange);
  }
}