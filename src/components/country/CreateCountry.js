import React, {
    useState,
    createContext,
    Children,
    useContext,
    useEffect
  } from "react";
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
  
   const CreateCountry = () => {
     const navigate = useNavigate();
     const params = useParams();
     console.log("params", params.id);
    const { state,data, setState,setStateId,stateId } = useContext(DataContext)
    console.log("countryName",state,stateId)
 
  



    const [detail, setDetail] = useState({
      state: "",
      // stateId:''
    
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
    //   address: Yup.string().required("This field is required"),
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
    
  
    useEffect(() => {
      console.log("data", data);
      console.log();
  
      const bookToEdit = data.find((book, i) => book.country_id== params.id);
      console.log("bookToEdit", bookToEdit);
      console.log("22222");
  
      setDetail({
        state: bookToEdit?.country_name,
       
      });
    }, [params.id]);
  
    const formik = useFormik({
      enableReinitialize: true,
      initialValues: detail,
      // validate,
      validationSchema: validationSchema,
      onSubmit: async(detail) => {
        console.log("detailsub",detail)
        if(stateId){
            try{
               if (detail.state){
        let dataa=await axios.put(`https://api.metaestate.ai/api/v1/country/${stateId}`, {
               country_name:detail.state
           }).then(() => {
            setState('')
            setStateId('')
               navigate('/countryhome')
            
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
            if (detail.state){
       let dataa=await axios.post(`https://api.metaestate.ai/api/v1/country`, {
            country_name:detail.state,
       
        }).then(() => {
            setState('')
            navigate('/countryhome')
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
      setStateId('')
      navigate("/countryhome", { replace: true });
      //  window.location="/UserForm";
    };
  
    // const handleEdit = async (item, index) => {
    //   //setDetail(e.target.value)
    //   // if(!params.id ? setDetail(el.map((l:any, i:any) => i === index )):""){
    //   //     setStatus(true)
    //   // }else{
    //   //     setStatus(false)
    //   // }
    //   setData(
    //     data.map((item, i) => {
    //       console.log(item, i, index, "i");
    //       if (i === index) {
    //         return { ...item };
    //       } else {
    //         return item;
    //       }
    //     })
    //   );
  
      // const filteredBooks = data.filter((book:any,i:any) => i!==params.id);
      // console.log('filteredBooks',filteredBooks)
      // setData(!filteredBooks?.onsubmit)
      // setData([...data, ...filteredBooks]);
      // navigate("/app/mainsidebarcomponents/usermanagement");
      // console.log(data, "elllllllllllllindexxxxxxxxxx")
      // //  await updateDoc(doc(db, "todos", id), { text:addText,completed: true });
      // //await updateDoc(doc(db, "todos", id), { text: addText, completed: false });
      // // setAddText(addText)
      // setData("");
      // setStatus(false);
    
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
                 Country Form
                </h1>
  
                <form
                  name="loginForm"
                  noValidate
                  className="flex flex-col justify-content-center w-50"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="p-16 sm:p-24 max-w-2xl">
                    <input
                      className="mt-1 mb-2 "
                      required
                      //label="Country Name"
                      autoFocus
                      id="state"
                      name="state"
                      value={formik.values.state}
                      onChange={formik.handleChange }
                      onBlur={formik.handleBlur}
                      variant="outlined"
                      fullWidth
                    />
                    {formik.touched.state && formik.errors.state && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert" style={{ color: "red" }}>
                            {formik.errors.state}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
  
                  <div className=" mx-15 p-1">
                    
                      <Button
                        className="whitespace-no-wrap normal-case btn-center btn btn-primary  text-center"
                        variant="contained"
                        type="submit"
                        // disabled={!formik.isValid}
                        // onClick={(stateId&&stateId>0)?updateAPIData:postData} 
                        >
                        {(stateId&&stateId>0)?'Update':'submit'}
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
  export default CreateCountry;
  
  









// import React, { useContext } from 'react'
// import { Form} from 'semantic-ui-react'
// import { DataContext } from '../../contexts/DataContextProvider';
// import { useNavigate} from 'react-router-dom';
// import axios from 'axios';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


// const CreateCountry = () => {
//   const navigate = useNavigate();
 
//     const { state,data, setState,setStateId,stateId } = useContext(DataContext)
//     console.log("countryName",state,stateId)
//    const handleChangeForm=(e)=>{
// e.preventDefault();
//    }
//    const postData = () => {
//     try{
//         if (state){
//     axios.post(`https://api.metaestate.ai/api/v1/country`, {
//         country_name:state,
   
//     }).then(() => {
//         setState('')
//         navigate('/countryhome')
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
// const updateAPIData = async(e) => {
//     e.preventDefault();
//     try{
//        if (state){
//  let data=await axios.put(`https://api.metaestate.ai/api/v1/country/${stateId}`, {
//        country_name:state
//    }).then(() => {
//     setState('')
//     setStateId('')
//        navigate('/countryhome')
    
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
// // useEffect(()=>{
// //     // var data = localStorage.getItem('ID')
// //     // console.log("JSON.parse(data)",JSON.parse(data));
// //     // console.log(JSON.parse(data))
// //     //  stateData = JSON.parse(data);
// //       setState(state)
   
// // },[])



//   return (
//     <div>
       
//          <Form className="create-form" onSubmit={handleChangeForm}>
//          <Form.Field>
//         <label>Enter Country Name</label>&nbsp;&nbsp;
//             <input  type="text" value={state} onChange={(e)=>{setState(e.target.value.trim())}}/><br/>
//         </Form.Field>&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//             <button onClick={(stateId&&stateId>0)?updateAPIData:postData} className='btn btn-dark' type="submit">{stateId?'Update':'Submit'}</button>
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

// export default CreateCountry;