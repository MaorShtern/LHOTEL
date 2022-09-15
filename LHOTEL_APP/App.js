import Router from './Pages/Navigation/Router'
import { LogBox } from 'react-native'
import ignoreWarnings from 'ignore-warnings';

import { useState} from "react";
import AppContext from './AppContext';


export default function App() {

  const [isUserExist, setIsUserExist] = useState(false);
  const [employee, setEmployee] = useState({});


  const setEmployeeDB = (obj) => {
   
    setEmployee(obj)
  }
  
//   const setEmployeeId = (id) => {
//     setEmployee((prev) => { return { ...prev, ...{id:id}}});
// }

//   const setEmployeePassword = (password) => {
//     setEmployee((prev) => { return { ...prev, ...{password:password}}});
//   };


  const userSettings = {
    employee:employee,
    isUserExist:isUserExist,
    setEmployeeDB,
    setIsUserExist
  };
  
  ignoreWarnings('warn', ['ViewPropTypes', '[react-native-gesture-handler]'])

  LogBox.ignoreLogs([
    'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\'.',
    'NativeBase: The contrast ratio of',
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  ])




  return (
    <AppContext.Provider value={userSettings}>
       <Router />
  </AppContext.Provider>

  );
}