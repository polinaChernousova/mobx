import React, { Component } from "react";
import { observer } from "mobx-react";
import TodoItem from "./TodoItem";

class TodoList extends Component {
  render() {
    // ! функция рендер говрит о том что нужно отрисовать
    return (
      <div style={{ marginTop: "20px" }}>
        <h2>TodoList</h2>
        <ul style={{ marginTop: "20px" }}>
          {/* ! пропсы получил от родит компонента */}
          {this.props.todos.map((todoItem, index) => (
            //! map`им наши тудушки в компоненту todoItem, вместе с ними передаем в нее готовые функции
            <TodoItem
              removeTodo={this.props.removeTodo}
              editTodo={this.props.editTodo}
              todoItem={todoItem}
              key={index}
              index={index}
            />
          ))}
        </ul>
      </div>
    );
  }
}
export default observer(TodoList);
