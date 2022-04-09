import axios from 'axios';
const postTodo = async (payload: object) => {
  const host = process.env.NEXT_PUBLIC_HOST;
  await axios.post(
    `${host}/todos`,
    { ...payload, checked: false, removed: false }
  );
}

export default postTodo;