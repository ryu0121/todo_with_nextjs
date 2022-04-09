import axios from 'axios';
const deleteTodo = async (todo: Todo) => {
  const host = process.env.NEXT_PUBLIC_HOST;
  await axios.delete(
    `${host}/todos/${todo.id}`
  );
}

export default deleteTodo;