import { memo, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

// dispatch が変わるまでは再レンダリングされない
// dispatch が再宣言されることはないので、このコンポーネントは再レンダリングされることはない
export const Selector = memo(() => {
  const { dispatch } = useContext(AppContext);

  const handleOnFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'filter', filter: e.target.value as Filter });
  };

  return (
    <select
      defaultValue="all"
      onChange={handleOnFilter}
      className="form-select block px-3 py-1.5 text-base font-normal bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
    >
      <option value="all">すべてのタスク</option>
      <option value="checked">完了したタスク</option>
      <option value="unchecked">現在のタスク</option>
      <option value="removed">ごみ箱</option>
    </select>
  );
});

// React コンポーネントはデフォルトでいくつかのAPIを提供している
// displayNameもその一つで、これはデバッグ時に表示されるコンポーネント名を編集できる(デフォルトは、コンポーネントの変数名)
// React.memo() でラップしたコンポーネントは明示的にdisplayNameを指定してあげないとデバッグ時のコンポーネント名が変わってしまう
Selector.displayName = 'Selector';