import { h, Component } from 'preact';

export default class MapView extends Component {
    data(){
        return {
            tiles:[],
            width:32,
            height:32,
            offset:{
                x:0,
                y:0
            }
        }
    }
    render(){
        return <canvas></canvas>;
    }
}

