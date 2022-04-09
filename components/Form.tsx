import { memo, useContext } from 'react';
import { useSWRConfig } from 'swr';
import { AppContext } from '../contexts/AppContext';
import postTodo from '../cruds/todos/post';
import useTodo from '../hooks/todos/useTodo';

export const Form = memo(() => {
  const { state, dispatch } = useContext(AppContext);
  const { mutate } = useSWRConfig();
  const { todos }: {
    todos: Todo[];
  } = useTodo('todos');

  const handleOnSubmit = async (payload: any) => {
    const newTodo = {
      id: todos.length + 1,
      content: payload.content,
      checked: false,
      removed: false
    }
    const host = process.env.NEXT_PUBLIC_HOST;
    mutate(`${host}/todos`, [...todos, newTodo], false);
    await postTodo(payload);
    mutate(`${host}/todos`);
    dispatch({ type: 'submit' });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'change', text: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit({ content: state.text });
      }}
      className="mb-2"
    >
      <input
        type="text"
        disabled={state.filter === 'checked'}
        value={state.text}
        onChange={handleOnChange}
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username"
      />
      <input
        type="submit"
        disabled={state.filter === 'checked'}
        value="追加"
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white ml-2 py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      />
    </form>
  );
});

Form.displayName = 'Form';