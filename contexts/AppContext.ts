import { createContext, Dispatch } from 'react';

export const AppContext = createContext(
  // <> はジェネリクス。
  // 型の決定を関数呼び出しまで遅らせるもの。
  // 意味のない文字列(例えばT)にするとそこには何でも入れることができて、
  // その関数内でのTはその型で固定される。
  // 今回は、<Action>にしているからAction型をTに指定している。
  {} as { state: State; dispatch: Dispatch<Action> }
);