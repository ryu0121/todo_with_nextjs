import { useReducer } from 'react';

import { reducer } from '../reducers/reducer';
import { initialState } from '../initialState';

import { Form } from '../components/Form';
import { Selector } from '../components/Selector';
import { FilteredTodos } from '../components/FilteredTodos';

import { AppContext } from '../contexts/AppContext';
import useTodo from '../hooks/todos/useTodo';

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, isError } = useTodo('todos');

  if (isError) {
    return <div>Failed To Load</div>
  }

  if (isLoading) {
    return <div>Now Loading ...</div>
  }

  return (
    // App 直下のコンポーネントは全てReact.memo() でラップしてある
    // こうすることで、dispatchが再宣言されてもコンポーネントが再レンダリングされなくなる
    // 再レンダリングされるのは、stateが変わった時だけ
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="bg-slate-200 h-screen">
        <Selector />
        <Form />
        <FilteredTodos />
      </div>
    </AppContext.Provider>
  );
}

export default Home;