import { h, Component } from "preact";
import { Link } from "preact-router";
import style from "./Menu.scss";

export default class MenuView extends Component {
  render() {
    return (
      <div style={style.menu}>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/profile">Me</Link>
          <Link href="/profile/john">John</Link>
        </nav>
      </div>
    );
  }
}
