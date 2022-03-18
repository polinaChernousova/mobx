import React, { Component, createRef } from "react";
import { observer } from "mobx-react";
import { extendObservable, action } from "mobx";

class TodoItem extends Component {
  constructor() {
    super(); //! вызвали родительский конструктор (TodoList)
    this.todoItemLocalState = extendObservable(this, {
      // ! через this определяем какие значения будут в нашем объекте todoItemLocalState
      // ! и говорим что свойства этого обьекта будут наблюдаемы
      isEditing: false,
      // ! isEditing это наш value, изначльно false потому что еще не вызван
      toggleEditing: action((value) => {
        // ! в toggleEditing объявили наш action
        this.isEditing = value;
      }),
    });

    this.editInput = createRef();
    // ! создали ref чтобы взять значения из value, и переотобразить экземпляр смонтированного компонента
  }
  //
  //
  //
  // ! props получили из TodoList, а он из {todostore}
  renderItem = () => {
    // ! рендерим наш компонент
    return (
      <li>
        <span className="item">{this.props.todoItem}</span>
        <button
          className="btn"
          onClick={() => {
            // ! вызываем функцию с пропсами, чтобы он получил те же данные которые добавились
            this.props.removeTodo(this.props.index);
          }}
        >
          delete
        </button>
        <button
          className="btn"
          onClick={() => {
            // ! вызвали наш объект и его action,   true потому что экшен обновился
            this.todoItemLocalState.toggleEditing(true);
          }}
        >
          edit
        </button>
      </li>
    );
  };

  renderForm = () => {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.props.editTodo({
            index: this.props.index,
            updatedText: this.editInput.current.value,
          });
          this.editInput.current.value = "";
          this.todoItemLocalState.toggleEditing(false);
        }}
      >
        <input
          className="input-edit"
          defaultValue={this.props.todoItem}
          ref={this.editInput}
        />
        <button className="btn" type="submit">
          edit todo
        </button>
      </form>
    );
  };

  render() {
    // ! 1 условие истинно потому что данные еще не пришли
    // ! 2 и выражение срабатывает; renderForm сработал потому что функция была вызвана(onClick) и после чего стал false
    // ! false в условии случился; и так как условие ложно срабатывает renderItem то есть отрисовывает новые данные
    return (
      <div>
        {this.todoItemLocalState.isEditing
          ? this.renderForm()
          : this.renderItem()}
      </div>
    );
  }
}
export default observer(TodoItem);
