import React,{useContext, useEffect, useHistory} from 'react'
import { Table, Button } from 'semantic-ui-react';
import { Link,useNavigate } from 'react-router-dom';
import { DataContext } from '../../contexts/DataContextProvider';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CityHome = () => {
    const navigate=useNavigate();

    const {cityStore,setCityStore,setCityData,setCityDataId,
       setStateSingle,setState,setStateId,
        setStateIdd,setStateData} = useContext(DataContext);
    // console.log(cityStore,'citydataaaaaaaaaaaaaaaaaaaaa')

const onEditHandler=(city_id)=>{
    // console.log("firstdata",city_id)
    console.log("city_id",city_id)
    const filteredit=cityStore.filter((el)=>el.city_id===city_id)
   console.log("filteredit",filteredit)
   setState(filteredit[0].master_state.master_country.country_name)
   setStateId(filteredit[0].master_state.master_country.country_id)
   setStateData(filteredit[0].master_state.state_name)
   setCityDataId(filteredit[0].city_id)
   setCityData(filteredit[0].city_name)
   setStateSingle(filteredit[0].master_state.state_name)
   setStateIdd(filteredit[0].master_state.state_id)
   //    setStateStore(filteredit)
   //setShow(true)
   //setUserss(filteredit)
// console.log("edit",filteredit)
// setCountryName(filteredit[0].country_name)
navigate(`/citycreate/${city_id}`)
}
const getData = async() => {
  // e.preventDefault();
  let data=await axios.get(`https://api.metaestate.ai/api/v1/city`)
      .then((getData) => {
        console.log(getData.data.data,"citydataaaa")
        setCityStore(getData.data.data);
      }).catch((error) => {
          console.log(error);
      })
}
useEffect(()=>{
  getData();
},[])

        // const onDelete=(id)=>{
        //   setData([...data.filter((item) => item.id !== id)])
       
        // }
        const onDelete =async (city_id) => {
          let data=await axios.delete(`https://api.metaestate.ai/api/v1/city/${city_id}`)
            .then(() => {
                getData();
            },toast.success(' data deleted successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                })
            ).catch((err) => {
                toast.error('🦄 error!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    },err)
            })
        }
    
  return (
    <div>
        <div className='d-flex justify-content-end px-2 ' ><button className='btn btn-info' onClick={()=>navigate('/citycreate')}>create</button></div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>Country Name</Table.HeaderCell>
                        <Table.HeaderCell>State Name</Table.HeaderCell>
                        <Table.HeaderCell>City Name</Table.HeaderCell>
                        {/* <Table.HeaderCell>Checkbox Value</Table.HeaderCell> */}
                        <Table.HeaderCell>Edit</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {cityStore.map((dataa,index) => {
                         //console.log("data",dataa)
                        return (
                            <Table.Row key={index}>
                                  <Table.Cell>{dataa.master_state.master_country.country_name}</Table.Cell>
                                <Table.Cell>{dataa.master_state.state_name}</Table.Cell>
                                <Table.Cell>{dataa.city_name}</Table.Cell>
                                <Table.Cell> 
                             
                                        <Button onClick={()=>onEditHandler(dataa.city_id)} title='Edit'>Edit</Button>
                                       
                                    </Table.Cell>
                              
                                <Table.Cell>
                                    <Button onClick={()=>onDelete(dataa.city_id)}>Delete</Button>
                                </Table.Cell>    
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
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
  )
}

export default CityHome;