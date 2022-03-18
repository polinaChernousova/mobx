import React, { Component, createRef } from "react";
import { observer, inject } from "mobx-react";
import TodoList from "./TodoList";

class Todos extends Component {
  render() {
    const { todoStore } = this.props; // ! через store задаем компоненту пропсы

    this.todo = createRef();

    return (
      <div className="parent">
        <div className="block">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              todoStore.addTodo(this.todo.current.value);
              this.todo.current.value = "";
              // ! создали ref чтобы взять значения из value, и переотобразить экземпляр смонтированного компонента

              //! ref говорит переназначения(edit) в инпуте смотри, но те значения которые инпут получит первыми не будут наблюдаемы
            }}
          >
            <input
              className="input-add"
              ref={this.todo}
              placeholder="добавить..."
            />
            <button
              className="btn"
              style={{ marginLeft: "15px" }}
              type="submit"
            >
              Add
            </button>
          </form>

          <TodoList
            //
            removeTodo={todoStore.removeTodo}
            editTodo={todoStore.editTodo}
            todos={todoStore.todos}
          />
        </div>
      </div>
    );
  }
}
export default inject("todoStore")(observer(Todos));
