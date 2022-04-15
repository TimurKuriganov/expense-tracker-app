import { useReducer } from 'react';
import { reducer, initState, GlobalContext } from './AppReducer';

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GlobalContext.Provider>
  )
}
 