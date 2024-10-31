import React,{useContext, useEffect, useHistory} from 'react'
import { Table, Button } from 'semantic-ui-react';
import { Link,useNavigate } from 'react-router-dom';
import { DataContext } from '../../contexts/DataContextProvider';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StateHome = () => {
    const navigate=useNavigate();

    const {stateStore,setStateStore,setStateData,setCountryId,setStateDataId,
        setState,setStateId} = useContext(DataContext);
    console.log(stateStore,'statedataaaaaaaaaaaaaaaaaaaaa')

const onEditHandler=(state_id)=>{
    console.log("firstdata",state_id)
    const filteredit=stateStore.filter((el)=>el.state_id===state_id)
   console.log("filteredit",filteredit)
   setState(filteredit[0].master_country.country_name)
   setStateId(filteredit[0].master_country.country_id)
   setStateData(filteredit[0].state_name)
   setStateDataId(filteredit[0].state_id)
   setCountryId(filteredit[0].master_country.country_id)
console.log("edit",filteredit)
// setCountryName(filteredit[0].country_name)
navigate(`/createstate/${state_id}`)
}
const getData = async() => {
  // e.preventDefault();
  let data=await axios.get(`https://api.metaestate.ai/api/v1/state`)
      .then((getData) => {
        setStateStore(getData.data.data);
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
        const onDelete =async (state_id) => {
          let data=await axios.delete(`https://api.metaestate.ai/api/v1/state/${state_id}`)
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
        <div className='d-flex justify-content-end px-2 ' ><button className='btn btn-info' onClick={()=>navigate('/createstate')}>create</button></div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>Country Name</Table.HeaderCell>
                        <Table.HeaderCell>State Name</Table.HeaderCell>
                      
                        {/* <Table.HeaderCell>Checkbox Value</Table.HeaderCell> */}
                        <Table.HeaderCell>Edit</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {stateStore.map((dataa,index) => {
                        console.log("data",dataa)
                        return (
                            <Table.Row key={index}>
                                 <Table.Cell>{dataa.master_country.country_name}</Table.Cell>
                                <Table.Cell>{dataa.state_name}</Table.Cell>
                                <Table.Cell> 
                             
                                        <Button onClick={()=>onEditHandler(dataa.state_id)} title='Edit'>Edit</Button>
                                       
                                    </Table.Cell>
                              
                                <Table.Cell>
                                    <Button onClick={()=>onDelete(dataa.state_id)}>Delete</Button>
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

export default StateHome;