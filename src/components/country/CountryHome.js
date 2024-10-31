import React,{useContext, useEffect} from 'react'
import { Table, Button } from 'semantic-ui-react';
import { Link,useNavigate } from 'react-router-dom';
import { DataContext } from '../../contexts/DataContextProvider';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CountryHome = () => {
    const navigate=useNavigate();

    const {data,setData,setState,setStateId,detail, setDetail} = useContext(DataContext);
    console.log(data,'dataaaaaaaaaaaaaaaaaaaaa')

const onEditHandler=(country_id)=>{
    console.log("firstdata",country_id)
    const filteredit=data.filter((el)=>el.country_id===country_id)
   console.log("filteredit",filteredit)
setState(filteredit[0].country_name)
setStateId(filteredit[0].country_id)
// setDetail(filteredit)
console.log("edit",filteredit)
// setCountryName(filteredit[0].country_name)
navigate(`/createcountry/${country_id}`)
}
const getData = async() => {
  // e.preventDefault();
  let data=await axios.get(`https://api.metaestate.ai/api/v1/country`)
      .then((getData) => {
        setData(getData.data.data);
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
        const onDelete =async (country_id) => {
          let data=await axios.delete(`https://api.metaestate.ai/api/v1/country/${country_id}`)
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
        const avigation=()=>{
            // stateId('')
            navigate('/createcountry')
        }
    
  return (
    <div>
        <div className='d-flex justify-content-end px-2 ' ><button className='btn btn-info' onClick={avigation}>create</button></div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Country Name</Table.HeaderCell>
                      
                        {/* <Table.HeaderCell>Checkbox Value</Table.HeaderCell> */}
                        <Table.HeaderCell>Edit</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {data.map((dataa,index) => {
                        console.log("data",dataa)
                        return (
                            <Table.Row key={index}>
                                <Table.Cell>{dataa.country_name}</Table.Cell>
                                <Table.Cell> 
                             
                                        <Button onClick={()=>onEditHandler(dataa.country_id)} title='Edit'>Edit</Button>
                                       
                                    </Table.Cell>
                              
                                <Table.Cell>
                                    <Button onClick={()=>onDelete(dataa.country_id)}>Delete</Button>
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

export default CountryHome;