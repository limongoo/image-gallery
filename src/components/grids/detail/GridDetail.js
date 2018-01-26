import html from './grid-detail.html';
import './grid-detail.css';
import Template from '../../Template';
import Upload from './Upload';
import { db } from '../../../services/firebase';

const template = new Template(html);
const grids = db.ref('grids');

export default class GridDetail {
  constructor(key) {
    this.key = key;
    this.grid = grids.child(key);
  }

  render() {
    const dom = template.clone();

    const header = dom.querySelector('h2');
    const name = dom.querySelector('.name');

    this.onValue = this.grid.on('value', data => {
      const grid = data.val();
      header.textContent = `${grid.name} the ${grid.type}`;
      name.textContent = grid.name;
    });

    this.images = new Upload(this.key);
    dom.querySelector('section.images').append(this.images.render());

    return dom;
  }

  unrender() {
    grids.child(this.key).off('value', this.onValue);
    this.images.unrender();
  }
}