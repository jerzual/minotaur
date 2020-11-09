import React, { Component } from "react";
import style from './Slider.scss';

export default class Slider extends Component {
    render() {
        return (<input type="text" style={style.slider}></input>)
    }
}