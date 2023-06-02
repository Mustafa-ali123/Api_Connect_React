import React, { useEffect,useState } from 'react'
import { Delete, Get, GetByPage } from '../Config/ApiMethods'
import Spinner from '../Component/Spinner'
import Buttons from '../Component/Buttons'
import { useNavigate } from 'react-router-dom'

const Institute = () => {
  let navigate = useNavigate()
  const [data, setdata] = useState([])
  const [load, setload] = useState(true)
let Name = "institute"
  const getdata= () => {
    Get("institute").then((res)=>{
      setdata(res.data.data)
      // console.log(res.data.data)
      setload(false)    
    }).catch(e=>console.log(e))
  }
  useEffect(()=>{
    getdata()
  },[])
  const del= (x,id) => {
    Delete("institute",id).then(()=>{
      let updatedData =data.filter((x,i)=>x._id !== id)
      setdata(updatedData)
    }).catch(e=>console.log(e))
  }
  const edit= (x) => {
    navigate("/putdata", {
    state:{
      name:Name,
      editdata:x,
      data
    }
  })
}
 
  return (
    <div>
      <h1 className='text-center mt-3 '>Institute Posts</h1>
      <Buttons click={() =>navigate ("/postdata",{
        state:{
          name:Name,
          data
        }
      })} classes='leftbtn px-5' label="Post" color='primary' />
      <div  className='container mx-auto '>
        <div className='row'>
          {load?<Spinner/>:data.map((x,i)=>{
              return(
                <div key={i} className='mt-5 col-md-3 col-lg-3 col-sm-12 border shadow p-3 mb-5 bg-white rounded px-3 py-3 '>
                  <h3>Name : {x.name}</h3>
                <h5>Address : {x.address}</h5>
                <h5>Tel : {x.tel}</h5>
                <Buttons click={() => del(x, x._id)} classes='mt-2' label="Delete" color='error' />
                <Buttons click={() => edit(x)} classes='mx-2 mt-2' label="Edit" color='success' />
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Institute
