import React, {
  useState,
  createContext,
  Children,
  useContext,
  useEffect
} from "react";
import {
  CircularProgress,
  FormHelperText
} from "@mui/material";
import { useNavigate,useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DataContext } from '../../contexts/DataContextProvider';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

 const CreateCity = () => {
   const navigate = useNavigate();
   const params = useParams();
   console.log("params", params.id);

   const {stateStore,stateSingle,setStateStore,setStateData,stateData,state, setStateSingle,
    setCountryId,stateIdd, setStateIdd,setData,stateDataId,cityStore,setCityData,cityData,setCityDataId,
    cityDataId,setUserss,userss,show,setState,stateId,data } = useContext(DataContext)
   
    console.log("countryName",state,stateDataId,cityDataId)
    console.log("data",data,stateId,stateData,state,cityData)
    console.log("object",cityStore)
    console.log("userss",userss)
    console.log("stateSingle",stateSingle)
    console.log("stateStore",stateStore)
    console.log("cityStore",cityStore)

   
  const getData = async() => {
      let data=await axios.get(`https://api.metaestate.ai/api/v1/country`)
          .then((getData) => {
              setData(getData.data.data);
          }).catch((error) => {
              console.log(error);
          })
    }
  const getDataa =async()=> {
  
     let dataa= await axios.get(`https://api.metaestate.ai/api/v1/state`)
  
        .then((res) => {
          console.log("res",res)
          console.log(res.data.data)
          setStateStore(res.data.data)
          // setUsers(res.data.item);
        })
    }
 
    useEffect(()=>{
      getData();
      getDataa();
      //getStateByCountryId(formik.values.state);
      // setStateData(formik.values.state)
      //  const stateSingleFetch = stateSingle.find(state =>state.master_country.country_id==formik.values.state)
      // // // const stateSingleFetch = stateStore.filter((book, i) => book.master_country.country_id==stateData);
      //   console.log("stateSingleFetch",stateSingleFetch)
    },[])
    // console.log(formik.values.state,"///////////////////////");
  // console.log("stateData",stateSingle)


    // const getStateByCountryId = async (id) => {
    //   const response = await axios.get(
    //     `https://api.metaestate.ai/api/v1/state?country_id=${id}`
    //   );
    //   console.log("response",response.data.data)
    //   setStateSingle( response.data.data);
    //   return response.data.data;
     
     
    // };
  
   
  
   useEffect(()=>{
    if(cityDataId){
      var resultscity = stateStore.filter(state =>state.state_name==stateData)
      console.log("resultscity", resultscity)
      setUserss(resultscity)
    }
    // setState(formik.values.state)
    // var resultstate = stateStore.filter(stat => stat.master_country.country_id == state)
    // setUserss(resultstate)
    // console.log("resultstate",resultstate)
    
   },[stateStore])

  const [detail, setDetail] = useState({
    state: "",
    stateData:'',
    cityData:''
  });
  console.log("detailintial",detail)
  console.log("detail.state",detail.state)
  const validationSchema = Yup.object({
    state: Yup.string().required("This field is required"),
    stateData: Yup.string().required("This field is required"),
    cityData: Yup.string().required("This field is required"),
  });
  
  

  useEffect(() => {
    console.log("data", data);
    console.log("stateStore",stateStore);

    // const bookToEdit = data.find((book, i) => book.country_name==state);
    // const bookToEditt = stateStore.find((book, i) => book.state_id==stateIdd);
    const bookToEditCity = cityStore.find((book, i) => book.city_id==params.id);
    console.log("bookToEdit", bookToEditCity?.master_state?.master_country?.country_name,bookToEditCity?.master_state?.state_name,bookToEditCity?.city_name);
    console.log("22222");

    setDetail({
      state: bookToEditCity?.master_state.master_country.country_id,
      stateData:bookToEditCity?.master_state?.state_id,
      cityData:bookToEditCity?.city_name
    });
  }, [params.id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: detail,
    // validate,
    validationSchema: validationSchema,
    onSubmit: async(detail) => {
      console.log("detailsub",detail)
      if(cityDataId){
        try {
          if (detail.stateData || detail.cityData || cityDataId) {
            let dataa = await axios.put(`https://api.metaestate.ai/api/v1/city/${cityDataId}`, {
              //city_id:cityId !=0 ?cityId:stateData.city_id,
              //state_id:stateId!=0?stateId:stateData.state_id,
              // country_id:countryId !=''?countryId:stateData.master_country.country_id,
            //   country_name: countryName != '' ? countryName : stateData.master_country.country_name,
            //   state_name: countryStateName !=''?countryStateName : stateData.master_state.state_name,
            //   city_name: cityName != "" ? cityName : stateData.city_name
              //country_name:countryName !=''?countryName:stateData.master_country.country_name,
              //state_name:countryStateName != ""?countryStateName:stateData.state_name
            //   country_id:stateId,
            //   country_name:state,
            //   state_name:stateData,
            city_id:cityDataId,
            state_id:detail.stateData,
            city_name:detail.cityData
            }).then(() => {
                 setState('')
                 setStateData('')
                setCityDataId('')
                setCityData('')
              navigate('/cityhome')
            }, toast.success(' data updated successfully!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
            )
          } else {
            return (toast.error('🦄 error!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }))
          }
        }
        catch (err) {
          toast.error('🦄 error!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        }
      }
      else{
        try {
          if (detail.stateData || detail.cityData ) {
            let dataa = await axios.post(`https://api.metaestate.ai/api/v1/city`, {
              // country_id:countryId,
              state_id:detail.stateData,
              // country_name:countryName,
              // state_name:countryStateName,
              city_name:detail.cityData,
            //   city_name: city
            }).then(() => {
              setStateIdd('')
              setStateData('')
              setCityData('')
              navigate('/cityhome')
            },
              toast.success(' data added successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              })
            )
          } else {
    
          }
    
    
        }
        catch (err) {
          toast.error('🦄 error!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
          //console.error(err);
        }    
  }
    }
  });
  const stateSingleFetch = stateStore.filter(state =>state.master_country.country_id==formik.values.state)
      // // const stateSingleFetch = stateStore.filter((book, i) => book.master_country.country_id==stateData);
        console.log("stateSingleFetch",stateSingleFetch)
        //setStateSingle(stateSingleFetch)
        //const stateSingleFetchData = stateStore.find(state =>state.master_country.country_id==)
        // {(formik.values.state)? setStateSingle(stateSingleFetch):''}
        // console.log("stateSingleFetchData",stateSingleFetchData)
    
  console.log("form", formik.values.state);
  const handleClick = (event) => {
    event.preventDefault();
    setCityDataId('')
    navigate("/cityhome", { replace: true });
    //  window.location="/UserForm";
  };

  
  
  return (
    <>
    {/* <p>{formik.values.state}</p>
    <p>{stateSingleFetch?.state_name}</p> */}
      <div className="container ">
        <div className="row justify-content-center">
          <div className="card-header border-0 pt-5  d-flex justify-content-between">
            <h3 className="card-title align-items-start flex-column  ">
              <span className="card-label fw-bolder fs-3 mb-1">
                {" "}
                {/* <div className=" p-1">
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="btn btn-sm  btn-info fw-bolder"
                  >
                    Home
                  </button>
                </div> */}
              </span>
            </h3>
            <div
              className="card-toolbar"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-trigger="hover"
              title="Click to add a user"
            >
              <a onClick={handleClick} className="btn btn-sm btn-light-primary">
                {/* <KTSVG
                  path="media/icons/duotune/arrows/arr075.svg"
                  className="svg-icon-3"
                /> */}
                Go Back
              </a>
            </div>
          </div>
          <div className="card ">
            <div className="card-body">
              <h1 className="flex flex-col justify-center w-50 text-center ">
              City Form
              </h1>

              <form
                name="loginForm"
                noValidate
                className="flex flex-col justify-content-center w-50"
                onSubmit={formik.handleSubmit}
              >
                <div className="p-16 sm:p-24 max-w-2xl">
            <InputLabel id="demo-simple-select-label">Country Name</InputLabel>
            <FormControl
              fullWidth
              error={formik.errors.state && formik.touched.state}
            >
              <select
                labelId="demo-simple-select-error-label"
                id="demo-simple-select-error"
                label="state"
                name="state"
                displayEmpty
                 value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="outlined"
              >
                {/* selected={item.country_name===detail.state} */}
                <option   >Please Select Country</option>
                {data?.length>0 &&
                  data.map((item,i) => (
                    <option   key={i} value={item.country_id}>
                      {item.country_name}
                    </option>
                  ))}
                {/* {data?.length>0 && data.map(item =>{
                    console.log("itemcountstate",item)
                    return(<MenuItem selected={item.country_name===state}  key={item.country_id} defaultValue={item.country_id} >
                      {item.country_name}
                      </MenuItem>)
                  })} */}
              </select>
              {formik.errors.state && formik.touched.state ? (
                <FormHelperText>{formik.errors.state}</FormHelperText>
              ) : null}
            </FormControl>
          </div>
          <br/><br/>

                <div className="p-16 sm:p-24 max-w-2xl">
            <InputLabel id="demo-simple-select-label"> State Name</InputLabel>
            <FormControl
              fullWidth
              error={formik.errors.stateData && formik.touched.stateData}
            >
              <select
                labelId="demo-simple-select-error-label"
                id="demo-simple-select-error"
                label="stateData"
                name="stateData"
                displayEmpty
                 value={formik.values.stateData}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="outlined"
              >
                {/* selected={item.country_name===detail.state} */}
                <option   >Please Select State</option>
                {stateSingleFetch?.length>0 &&
                  stateSingleFetch.map((item,i) => (
                    <option   key={i} value={item.state_id}>
                      {item.state_name}
                    </option>
                  ))}
                {/* {data?.length>0 && data.map(item =>{
                    console.log("itemcountstate",item)
                    return(<MenuItem selected={item.country_name===state}  key={item.country_id} defaultValue={item.country_id} >
                      {item.country_name}
                      </MenuItem>)
                  })} */}
              </select>
              {formik.errors.stateData && formik.touched.stateData ? (
                <FormHelperText>{formik.errors.stateData}</FormHelperText>
              ) : null}
            </FormControl>
          </div>
          <br/><br/>
                <div className="p-16 sm:p-24 max-w-2xl">
                <InputLabel id="demo-simple-select-label">City Name</InputLabel>
                <FormControl
              fullWidth
              error={formik.errors.cityData && formik.touched.cityData}
            >
                  <input
                    className="mt-1 mb-2 "
                    //label="Country Name"
                    autoFocus
                    id="cityData"
                    name="cityData"
                    value={formik.values.cityData}
                    onChange={formik.handleChange }
                    onBlur={formik.handleBlur}
                    variant="outlined"
                    fullWidth
                  />
                   {formik.errors.cityData && formik.touched.cityData ? (
                <FormHelperText>{formik.errors.cityData}</FormHelperText>
              ) : null}
                        </FormControl>
                </div>

                <div className=" mx-15 p-1">
                  
                    <Button
                      className="whitespace-no-wrap normal-case btn-center btn btn-primary  text-center"
                      variant="contained"
                      type="submit"
                      // disabled={!formik.isValid}
                      // onClick={(stateId&&stateId>0)?updateAPIData:postData} 
                      >
                      {(cityDataId&&cityDataId>0)?'Update':'submit'}
                    </Button>
                </div>
              </form>
              <ToastContainer 
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateCity;

























// import React, { useContext,useEffect,useState } from 'react'
// import { Form} from 'semantic-ui-react'
// import { DataContext } from '../../contexts/DataContextProvider';
// import { useNavigate} from 'react-router-dom';
// import axios from 'axios';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


// const CreateCity = () => {
//   const navigate = useNavigate();
 
//     const {stateStore,stateSingle,setStateStore,setStateData,stateData,state,
//       setCountryId,stateIdd, setStateIdd,setData,stateDataId,cityStore,setCityData,cityData,setCityDataId,
//       cityDataId,setUserss,userss,show,setState,stateId,data } = useContext(DataContext)
//         // const [countryId, setCountryId] =useState(0)
        
        
//     console.log("countryName",state,stateDataId,cityDataId)
//     console.log("data",data,stateId,stateData,state,cityData)
//     console.log("object",cityStore)
//     console.log("userss",userss)
//     console.log("stateSingle",stateSingle)
//     console.log("stateStore",stateStore)
//     console.log("cityStore",cityStore)
//     console.log("show",show)
//    const handleChangeForm=(e)=>{
//  e.preventDefault();
//    }
//    const postData = async () => {
//     // e.preventDefault();
//     try {
//       if (stateIdd || cityData ) {
//         let data = await axios.post(`https://api.metaestate.ai/api/v1/city`, {
//           // country_id:countryId,
//           state_id: stateIdd,
//           // country_name:countryName,
//           // state_name:countryStateName,
//           city_name: cityData,
//         //   city_name: city
//         }).then(() => {
//           setStateIdd('')
//           setStateData('')
//           setCityData('')
//           navigate('/cityhome')
//         },
//           toast.success(' data added successfully!', {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//           })
//         )
//       } else {

//       }


//     }
//     catch (err) {
//       toast.error('🦄 error!', {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       })
//       //console.error(err);
//     }


//   }
// const getData = async() => {
//     let data=await axios.get(`https://api.metaestate.ai/api/v1/country`)
//         .then((getData) => {
//             setData(getData.data.data);
//         }).catch((error) => {
//             console.log(error);
//         })
//   }
// const getDataa =async()=> {

//    let dataa= axios.get(`https://api.metaestate.ai/api/v1/state`)

//       .then((res) => {
//         console.log("res",res)
//         console.log(res.data.data)
//         setStateStore(res.data.data)
//         // setUsers(res.data.item);
//       })
//   }
//   useEffect(()=>{
//     getData();
//     getDataa();
//   },[])

//   const updateAPIData = async () => {
//     // e.preventDefault();
//     //console.log(countryName,currencyName,currencyCode,"valueeee")
//     try {
//       if (stateIdd || cityData || cityDataId) {
//         let data = await axios.put(`https://api.metaestate.ai/api/v1/city/${cityDataId}`, {
//           //city_id:cityId !=0 ?cityId:stateData.city_id,
//           //state_id:stateId!=0?stateId:stateData.state_id,
//           // country_id:countryId !=''?countryId:stateData.master_country.country_id,
//         //   country_name: countryName != '' ? countryName : stateData.master_country.country_name,
//         //   state_name: countryStateName !=''?countryStateName : stateData.master_state.state_name,
//         //   city_name: cityName != "" ? cityName : stateData.city_name
//           //country_name:countryName !=''?countryName:stateData.master_country.country_name,
//           //state_name:countryStateName != ""?countryStateName:stateData.state_name
//         //   country_id:stateId,
//         //   country_name:state,
//         //   state_name:stateData,
//         city_id:cityDataId,
//         state_id:stateIdd,
//         city_name:cityData
//         }).then(() => {
//              setState('')
//              setStateData('')
//             setCityDataId('')
//             setCityData('')
//           navigate('/cityhome')
//         }, toast.success(' data updated successfully!', {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         })
//         )
//       } else {
//         return (toast.error('🦄 error!', {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         }))
//       }
//     }
//     catch (err) {
//       toast.error('🦄 error!', {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       })
//     }
//   }
// // const handleChangeCountry =(e)=>{
// //     console.log(JSON.stringify(e.target.value))
// //      var countryDetails =e.target.value;
// //      console.log(countryDetails,"countryDetails")
  
// //    setCountryId(e.target.value)
// //    var result = users.filter(country => country.country_id== e.target.value)
// //     setCountryName(result[0].country_name)
  
// //   console.log(result,"result")
// //   }

//  useEffect(()=>{
//   if(cityDataId){
//     var resultscity = stateStore.filter(state =>state.state_name==stateData)
//     console.log("resultscity", resultscity)
//     setUserss(resultscity)
//   }
//  },[stateStore])

// const handleChangeCountryy = (e) => {
//     console.log(JSON.stringify(e.target.value))
//     var countryDetails = e.target.value;
//     console.log(countryDetails, "countryDetails")

//     setCountryId(e.target.value)
//     var result = data.filter(country => country.country_id == e.target.value)
//     setState(result[0].country_name)
//     console.log(result, "result")
//     var resultstate = stateStore.filter(state => state.master_country.country_id == e.target.value)
//     setUserss(resultstate)
//     console.log("resultstate", resultstate)
    
//   }
//   const handleChangeStatee = (e) => {
//     console.log(JSON.stringify(e.target.value))
//     var stateDetails = e.target.value;
//     console.log(stateDetails, "stateDetails")

//     setStateIdd(e.target.value)
//     var resultt = stateStore.filter(state => state.state_id == e.target.value)
//     setStateData(resultt[0].state_name)
//     console.log(resultt, "resultstate")
//   }

//   return (
//     <div>
       
//          <Form className="create-form " onSubmit={handleChangeForm}>
//          <Form.Field className='d-flex justify-content-start px-2'>
//             <label className='d-flex justify-content-start px-1'>Country Name</label>
//             <select className="form-control text-align:center w-50" onChange={handleChangeCountryy}>
//               <option type="others" >Select a Country</option>
//               {/* selected={item.country_name === stateData.master_country.country_name} */}
//               {data?.length > 0 && data.map(item => {
//                 return (<option selected={item.country_name=== state} key={item.country_id} value={item.country_id} >
//                   {item.country_name}
//                 </option>)
//               })}
//             </select>
//           </Form.Field>&nbsp;&nbsp;
//           <Form.Field className='d-flex justify-content-start px-2'>
//             <label className='d-flex justify-content-start px-2'>State Name</label>&nbsp;&nbsp;&nbsp;
//             <select className="form-control text-align:center w-50"  onChange={handleChangeStatee}>
//               <option type="others" >Select a State</option>
//               {/* selected={item[0].state_name===stateData} */}
//           {userss?.length > 0 && userss.map(item => {
//             console.log("item",item)
//                 return (<option selected={item.state_name===stateData} key={item.state_id} value={item.state_id}  >
//                   {item.state_name}
//                 </option>)
//               })}
//             </select>
//           </Form.Field>&nbsp;&nbsp;
//           <Form.Field className='d-flex justify-content-start px-2' >
//             <label className='d-flex justify-content-start px-2'>City Name</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//             <input className="form-control text-align:center w-50"  placeholder='City Name' value={cityData} onChange={(e) => setCityData(e.target.value.trim())} />
//           </Form.Field><br /><br />
              
//         <button onClick={(cityDataId&&cityDataId>0)?updateAPIData:postData} className='btn btn-dark ' type="submit">{cityDataId?'Update':'Submit'}</button>
//         </Form>
//         <ToastContainer 
//  position="top-right"
//  autoClose={5000}
//  hideProgressBar={false}
//  newestOnTop={false}
//  closeOnClick
//  rtl={false}
//  pauseOnFocusLoss
//  draggable
//  pauseOnHover
//  theme="light"/>
//     </div>
//   )
// }

// export default CreateCity;