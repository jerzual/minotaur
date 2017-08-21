import { h, Component } from "preact";

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
