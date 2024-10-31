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

 const CreateState = () => {
   const navigate = useNavigate();
   const params = useParams();
   console.log("params", params.id);

   const {setCountryId,setStateStore,stateStore,countryId,setStateData,stateData,state,setStateDataId,setData,stateDataId,
    setState,stateId,data } = useContext(DataContext)
   
console.log("countryName",state,stateDataId)
console.log("data",data,stateId,stateData,state)
console.log("object",stateId,stateStore)
console.log('countryId',countryId)

// const handleChangeCountryy =(e)=>{
//   console.log(JSON.stringify(e.target.value))
//    var countryDetails =e.target.value;
//    console.log(countryDetails,"countryDetails")

//   //  setCountryId(e.target.value)
//  var result = data.filter(country => country.country_name== e.target.value)
//  setState(result[0].country_name)
//  setCountryId(result[0].country_id)
// console.log(result,"result")
// }



  const [detail, setDetail] = useState({
    state: "",
    stateData:'',
    // countryId:''
  });
  console.log("detailintial",detail)
  // useEffect(()=>{
  //   setDetail({
  //     state:state
  //   })
  // },[])
  // console.log(initialValues, "iniiiiiiiiiiiiiiiiiiiiii")
// const changeEditHandlers=(e:any)=>{
// setDetail({...detail,[e.target.companyName]:e.target.value})
// }
  const validationSchema = Yup.object({
    // companyName: Yup.string()
    //     .max(15, 'Must be 15 characters or less')
    //     .required('Required'),
    //     emailId: Yup.string().email('Invalid email address').required('Required'),
    //     phoneNumber: Yup.number()
    //     .typeError('Enter valid phone number And it must be 10 numbers or less')
    //     .required('Required'),
    state: Yup.string().required("This field is required"),
    stateData: Yup.string().required("This field is required"),
  //   phoneNumber: Yup.string()
  //     .min(10, "Phone Number Must Be 10 Digit")
  //     .matches(/^[0-9]{0,10}$/, "Phone Number Must Be 10 Digit")
  //     .required("This field is required"),
  //   faxNumber: Yup.string().required("This field is required"),
  //   emailId: Yup.string()
  //     .email("Invalid email format")
  //     // .matches(emailRegExp, 'Invalid email format')
  //     .required("This field is required"),
  //   webUrl: Yup.string().required("This field is required"),
  //   keyContactPersonName: Yup.string().required("This field is required"),
  //   keyContactPersonDesignation: Yup.string().required(
  //     "This field is required"
  //   ),
  //   workAddress: Yup.string().required("This field is required"),
  //   workPhoneNumber: Yup.string()
  //     .min(10, "Phone Number Must Be 10 Digit")
  //     .matches(/^[0-9]{0,10}$/, "Phone Number Must Be 10 Digit")
  //     .required("This field is required"),
  //   workFaxNumber: Yup.string().required("This field is required"),
  //   workEmailId: Yup.string()
  //     .email("Invalid email format")
  //     // .matches('Invalid email format')
  //     .required("This field is required"),
  //   branchAddress: Yup.string().required("This field is required"),
  //   natureOfCompany: Yup.string().required("This field is required"),
  //   statusOfCompany: Yup.string().required("This field is required")
  });
  
  const getData = async() => {
    let data=await axios.get(`https://api.metaestate.ai/api/v1/country`)
        .then((getData) => {
          setData(getData.data.data);
        }).catch((error) => {
            console.log(error);
        })
  }
  const getDataa = async() => {
    let data=await axios.get(`https://api.metaestate.ai/api/v1/state`)
        .then((getData) => {
          setStateStore(getData.data.data);
        }).catch((error) => {
            console.log(error);
        })
  }
  useEffect(()=>{
    getData();
    getDataa();
  },[])

  useEffect(() => {
    console.log("data", data);
    console.log("stateStore",stateStore);
    const bookToEdit = data.find((book, i) => book.country_name==state);
    const bookToEditt = stateStore.find((book, i) => book.state_id== params.id);
console.log("bookToEditt",bookToEditt);

    console.log("bookToEdit", bookToEdit?.country_name,bookToEditt);
    console.log("22222");
console.log("111111//",bookToEditt?.master_country?.country_name);
    setDetail({
      state: bookToEditt?.master_country?.country_id,      
      stateData:bookToEditt?.state_name
    });
  }, [params.id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: detail,
    // validate,
    validationSchema: validationSchema,
    onSubmit: async(detail) => {
      console.log("detailsub",detail)
      if(stateDataId){
        try{
          if (countryId||stateData){
   let dataa=await axios.put(`https://api.metaestate.ai/api/v1/state/${stateDataId}`, {
       // country_id:stateId !=0 ?stateId:stateData.country_id,
       //   //country_name:countryName !=''?countryName:stateData.master_country.country_name,
       //   state_name:countryStateName != ""?countryStateName:stateData.state_name,
       country_id:detail.state,
       //country_name:detail.state,
       state_name:detail.stateData
       // country_name:state,
      }).then(() => {
        setState('')
       setStateData('')
       setCountryId('')
       setStateDataId('')
          navigate('/statehome')
      },toast.success(' data updated successfully!', {
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
   }else{
   
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
    console.log(data,'data')
      
      }
      else{
        try{
          if (detail.stateData||detail.state){
        let dataa=await axios.post(`https://api.metaestate.ai/api/v1/state`, {
             country_id:detail.state,
          //country_name:detail.state,
          state_name:detail.stateData
      }).then(() => {
        setState('')
        setStateData('')
        setCountryId('')
          navigate('/statehome')
      },toast.success(' data added successfully!', {
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
  }
  } catch (err) { 
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
    }
  });

  console.log("form", formik);
  const handleClick = (event) => {
    event.preventDefault();
    setStateDataId('')
    navigate("/statehome", { replace: true });
    //  window.location="/UserForm";
  };

  
  
  return (
    <>
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
              State Form
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
              {/* <p>{formik.values.state}</p> */}
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
                <option>Please Select Country</option>
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
                <InputLabel id="demo-simple-select-label">State Name</InputLabel>
                <FormControl
              fullWidth
              error={formik.errors.stateData && formik.touched.stateData}
            >
                  <input
                    className="mt-1 mb-2 "
                    //label="Country Name"
                    autoFocus
                    id="stateData"
                    name="stateData"
                    value={formik.values.stateData}
                    onChange={formik.handleChange }
                    onBlur={formik.handleBlur}
                    variant="outlined"
                    fullWidth
                  />
                   {formik.errors.stateData && formik.touched.stateData ? (
                <FormHelperText>{formik.errors.stateData}</FormHelperText>
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
                      {(stateDataId&&stateDataId>0)?'Update':'submit'}
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
export default CreateState;




















// import React, { useContext,useEffect,useState } from 'react'
// import { Form} from 'semantic-ui-react'
// import { DataContext } from '../../contexts/DataContextProvider';
// import { useNavigate} from 'react-router-dom';
// import axios from 'axios';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


// const CreateState = () => {
//   const navigate = useNavigate();
 
//     const {setCountryId,countryId,setStateData,stateData,state,setStateDataId,setData,stateDataId,
//         setState,stateId,data } = useContext(DataContext)
       
//     console.log("countryName",state,stateDataId)
//     console.log("data",data,stateId,stateData,state)
//     console.log("object",stateId)
//     console.log('countryId',countryId)
//    const handleChangeForm=(e)=>{
//  e.preventDefault();
//    }
//    const postData = async() => {
//     try{
//         if (stateData||countryId){
//     let data=await axios.post(`https://api.metaestate.ai/api/v1/state`, {
//           country_id:countryId,
//         //country_name:countryId,
//         state_name:stateData
//     }).then(() => {
//       setState('')
//       setStateData('')
//       setCountryId('')
//         navigate('/statehome')
//     },toast.success(' data added successfully!', {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         })
//     )
// }
// } catch (err) { 
//     toast.error('🦄 error!', {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         })
//   }
// }
// const getData = async() => {
//     let data=await axios.get(`https://api.metaestate.ai/api/v1/country`)
//         .then((getData) => {
//           setData(getData.data.data);
//         }).catch((error) => {
//             console.log(error);
//         })
//   }
//   useEffect(()=>{
//     getData();
//   },[])

// const updateAPIData = async(e) => {
//     e.preventDefault();
//     try{
//        if (countryId||stateData){
//  let data=await axios.put(`https://api.metaestate.ai/api/v1/state/${stateDataId}`, {
//     // country_id:stateId !=0 ?stateId:stateData.country_id,
//     //   //country_name:countryName !=''?countryName:stateData.master_country.country_name,
//     //   state_name:countryStateName != ""?countryStateName:stateData.state_name,
//     country_id:countryId,
//     // country_id:stateId,
    
//     state_name:stateData,
//     // country_name:state,
//    }).then(() => {
//      setState('')
//     setStateData('')
//     setCountryId('')
//     setStateDataId('')
//        navigate('/statehome')
//    },toast.success(' data updated successfully!', {
//        position: "top-right",
//        autoClose: 5000,
//        hideProgressBar: false,
//        closeOnClick: true,
//        pauseOnHover: true,
//        draggable: true,
//        progress: undefined,
//        theme: "light",
//        })
//    )
// }else{

// }
// }
// catch (err) { 
//    toast.error('🦄 error!', {
//        position: "top-right",
//        autoClose: 5000,
//        hideProgressBar: false,
//        closeOnClick: true,
//        pauseOnHover: true,
//        draggable: true,
//        progress: undefined,
//        theme: "light",
//        })
//  }
//  console.log(data,'data')
// }
// // const handleChangeCountry =(e)=>{
// //     console.log(JSON.stringify(e.target.value))
// //      var countryDetails =e.target.value;
// //      console.log(countryDetails,"countryDetails")
  
// //    setCountryId(e.target.value)
// //    var result = users.filter(country => country.country_id== e.target.value)
// //     setCountryName(result[0].country_name)
  
// //   console.log(result,"result")
// //   }
//   const handleChangeCountryy =(e)=>{
//     console.log(JSON.stringify(e.target.value))
//      var countryDetails =e.target.value;
//      console.log(countryDetails,"countryDetails")
  
//     //  setCountryId(e.target.value)
//    var result = data.filter(country => country.country_name== e.target.value)
//    setState(result[0].country_name)
//    setCountryId(result[0].country_id)
//   console.log(result,"result")
//   }

//   return (
//     <div>
       
//          <Form className="create-form " onSubmit={handleChangeForm}>
//          <Form.Field className='d-flex justify-content-start px-2'>
//                     <label className='d-flex justify-content-start px-2'>Country Name</label>
//                     <select className="form-control text-align:center w-50" onChange={handleChangeCountryy}>
//                    <option type="others" >Select a Country</option>
//                    {data?.length>0 && data.map(item =>{
//                     console.log("itemcountstate",item)
//                        return(<option selected={item.country_name===state}  key={item.country_id} defaultValue={item.country_id} >
//                        {item.country_name}
//                        </option>)
//                    })}
//                </select>
//                 </Form.Field><br/><br/>
//                 <Form.Field className='d-flex justify-content-start px-2'>
//                     <label className='d-flex justify-content-start px-2'>State Name</label>&nbsp;&nbsp;&nbsp;&nbsp;
//                     <input className="form-control text-align:center w-50  " placeholder='State Name' defaultValue={stateData} onChange={(e) => setStateData(e.target.value.trim())}/>
//                 </Form.Field><br/>
              
//         <button onClick={(stateDataId&&stateDataId>0)?updateAPIData:postData} className='btn btn-dark ' type="submit">{stateDataId?'Update':'Submit'}</button>
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

// export default CreateState;