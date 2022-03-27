import { action, extendObservable } from "mobx";

class Todos {
  constructor() {
    //! extendObservable принимает в себя target-this(то есть наблюдает за этими свойствами) и можно к ним закинуть новые данные но при этом не изменяя старые
    extendObservable(this, {
      todos: [],
      get getTodos() {
        return this.todos;
      },
      addTodo: action((newTodo) => {
        this.todos = this.todos.concat(newTodo);
      }),
      removeTodo: action((index) => {
        this.todos = [
          ...this.todos.slice(0, index), //! говорим копировать элемент под нулевы индексом и добавляем ему новый номер чтобы нумерация у элементов шла с нуля
          ...this.todos.slice(index + 1), //! так как элкмент удалился. Элементы нового массива должны начинатся с нуля
        ];
      }),
      editTodo: action(({ index, updatedText }) => {
        this.todos = [
          // ! используя метод slice говорим начать с первого элемента через спред оператор возвращаем новый изменненый массив со старыми копиями в аргументах.....
          ...this.todos.slice(0, index), //!  добавляем ему новый номер чтобы нумерация у элементов шла с нуля и после заменяем на обновленный элемент
          updatedText,
          ...this.todos.slice(index + 1), //! так как элемент изменился. Элементы нового массива должны начинатся с нуля
        ];
      }),
    });
  }
}
export default new Todos();

// если четный то лежит под четным индексом
