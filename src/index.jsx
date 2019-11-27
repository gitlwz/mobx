// import {observable,action} from 'mobx';
// import React,{Component} from 'react';
// import ReactDom from 'react-dom';
// import PropTypes from 'prop-types';
// import { observer, PropTypes as ObservablePropTypes} from 'mobx-react'
//
//
// class  Store  {
//    @observable cache = {
//         queue:[]
//    }
//    @action.bound refresh(){
//        this.cache.queue.push(1);
//    }
// }
//
// const store = new Store();
//
// @observer
// class Bar extends Component{
//     static propTypes = {
//         queue: ObservablePropTypes.observableArray
//     };
//      render(){
//          const queue = this.props.queue;
//
//          return <span>{queue.length}</span>
//      }
//
// }
//
// class Foo  extends Component{
//     static propTypes = {
//         cache:ObservablePropTypes.observableObject
//     };
//
//     render(){
//         console.log('hshhs');
//
//         const cache = this.props.cache;
//         return <div><button onClick={this.props.refresh}>refresh</button><Bar queue={cache.queue}>hhh</Bar></div>
//     }
// }
//
//
// ReactDom.render(<Foo cache={store.cache} refresh={store.refresh}/>,document.querySelector('#root'));
//
//
//
//



import { observable, observer } from './mobx/index.js';
import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom';


class Store {
    @observable str = "";
    @observable obj = {
        name: "123"
    }
}

var store = new Store();


@observer
class TodoList extends Component {

    onClick = () => {
        this.props.store.str = "123"
        this.props.store.obj.name = "456"
    }
    render() {
        let store = this.props.store
        return <div className="todo-list">
            <button onClick={this.onClick}>修改</button>
            <div>
                show:{store.str}
            </div>
            <div>
                show:{store.obj.name}
            </div>
        </div>
    }
}
ReactDom.render(< TodoList store={store} />, document.querySelector('#root'));