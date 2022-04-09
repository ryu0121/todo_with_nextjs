import { memo, useContext } from 'react';
import { mutate } from 'swr';
import { AppContext } from '../contexts/AppContext';
import putTodo from '../cruds/todos/put';
import deleteTodo from '../cruds/todos/delete';
import useTodo from '../hooks/todos/useTodo';

export const FilteredTodos = memo(() => {
  const { state } = useContext(AppContext);
  const { todos }: {
    todos: Todo[];
  } = useTodo('todos');

  const handleOnRemove = async (todo: Todo) => {
    const host = process.env.NEXT_PUBLIC_HOST;
    const newTodos = todos.map(t => t.id === todo.id ? { ...t, removed: !todo.removed } : t);
    // false を指定しているとここでは再検証されない
    // Refetch Mutation を使用すると、useSWR のキャッシュをローカルで更新できる
    mutate(`${host}/todos`, newTodos, false);
    await putTodo(todo, { removed: !todo.removed });
    // key のみを指定することで、このkeyに対応するデータの状態をfetchしにいく
    mutate(`${host}/todos`);
  };

  const handleOnRemoveForever = async (todo: Todo) => {
    const host = process.env.NEXT_PUBLIC_HOST;
    const newTodos = todos.filter(t => t.id !== todo.id);
    mutate(`${host}/todos`, newTodos, false);
    await deleteTodo(todo);
    mutate(`${host}/todos`);
  }

  const filteredTodos = todos.filter((todo) => {
    switch (state.filter) {
      case 'all':
        return !todo.removed;
      case 'checked':
        return !todo.removed && todo.checked;
      case 'unchecked':
        return !todo.removed && !todo.checked;
      case 'removed':
        return todo.removed;
      default:
        return todo;
    }
  });

  return (
    <ul>
      {filteredTodos.map((todo) => {
        return (
          <li key={todo.id}>
            <span>{todo.content}</span>
            <button onClick={() => handleOnRemove(todo)} className={"bg-transparent font-semibold hover:text-white mr-` ml-2 mb-2 px-2 border hover:border-transparent rounded " + (todo.removed ? "hover:bg-blue-500 text-blue-700 border-blue-500" : "hover:bg-red-500 text-red-700 border-red-500") }>
              {todo.removed ? '復元' : '削除'}
            </button>
            {
              todo.removed ? <button onClick={() => handleOnRemoveForever(todo)} className="bg-transparent font-semibold hover:text-white mx-2 mb-2 px-2 border hover:border-transparent rounded hover:bg-red-500 text-red-700 border-red-500">完全消去</button> : null
            }
          </li>
        );
      })}
    </ul>
  );
});

FilteredTodos.displayName = 'FilteredTodos';