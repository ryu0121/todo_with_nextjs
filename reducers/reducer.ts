export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'change': {
      return { ...state, text: action.text };
    }

    case 'filter': {
      return { ...state, filter: action.filter };
    }

    case 'submit': {
      if (state.text === '') return state;
      return { ...state, text: '' };
    }

    default: {
      return state;
    }
  }
};