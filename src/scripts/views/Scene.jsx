import { h, Component } from 'preact';
import { Link } from 'preact-router/match';

import style from './Scene.scss';

export default class Scene extends Component {

  render({camera, lights, objects}) {
    return (<canvas></canvas>);
  }
}