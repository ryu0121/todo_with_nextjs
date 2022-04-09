import axios from 'axios';
const putTodo = async (todo: Todo, payload: any) => {
  const host = process.env.NEXT_PUBLIC_HOST;
  await axios.put(
    `${host}/todos/${todo.id}`,
    { ...todo, removed: payload.removed }
  );
}

export default putTodo;