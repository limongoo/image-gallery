import html from './grid.html';
import './grid.css';
import Template from '../Template';

const template = new Template(html);

export default class Grid {

  render() {
    const dom = template.clone();

    return dom;
  }
}