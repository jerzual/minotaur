import React, { Component } from "react";

import { Link } from 'react-router/match';

import style from './Scene.scss';

export default class Scene extends Component {

  render({camera, lights, objects}) {
    return (<canvas></canvas>);
  }
}