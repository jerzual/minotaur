import { h, Component } from "preact";
import style from './Field.scss';

export default class Field {
  render({ label, children }) {
    return (
      <div class={style.field}>
        <label>
          {label}
        </label>
        {children}
      </div>
    );
  }
  handleFocused() {}
}
