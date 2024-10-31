import React, { createContext, useState } from 'react';

export const DataContext = createContext();


const DataContextProvider = ({ children }) => {
// const[show,setShow]=useState(false);
  const [data, setData] = useState([]);
  const[stateStore,setStateStore]=useState([]);
  const[cityStore,setCityStore]=useState([]);
  const [userss, setUserss] = useState([]);
  const[stateSingle,setStateSingle]= useState([])
  const[state,setState]=useState('');
  const[stateData,setStateData]=useState('');
  const[cityData,setCityData]=useState('');
  const[stateId,setStateId]=useState(0)
  const[stateDataId,setStateDataId]=useState(0)
  const[cityDataId,setCityDataId]=useState(0)
  const [countryId, setCountryId] =useState(0)
  const [stateIdd, setStateIdd] = useState(0)
  console.log("stateId",stateId)
  // const [detail, setDetail] = useState({
  //   state: '',
  //   stateId:'',
  
  // });
  // const[countryName,setCountryName]=useState('')
  // const  initialValues= {
  //   name: '',
  //   email: '',
  //   mobileNo: '',
  // }
  // const addToData=(values)=>{
  //   setData([...data,{values}])
  // }
  const value = {
    data,
    setData,
    state,
    setState,
    stateId,
    setStateId,
    stateStore,
    setStateStore,
    stateData,
    setStateData,
    stateDataId,
    setStateDataId,
    cityStore,
    setCityStore,
    setCityData,
    cityData,
    setCityDataId,
    cityDataId,
    setUserss,
    userss,
    setStateSingle,
    stateSingle,
    countryId,
     setCountryId,
     stateIdd, 
     setStateIdd,
    //  detail, 
    //  setDetail
    //  show,
    //  setShow
    // countryName,
    // setCountryName,
    // addToData
    // initialValues
    
  }
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>

  )
}

export default DataContextProvider
