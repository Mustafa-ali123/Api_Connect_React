import React, { useEffect, useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import { Delete, Get } from '../Config/ApiMethods'
import Spinner from '../Component/Spinner'
import Buttons from '../Component/Buttons'
import axios from 'axios'

const Teacher = (props) => {
  let navigate = useNavigate()
  let location = useLocation()
  const [data, setdata] = useState([])
  const [load, setload] = useState(true)
  let Name ="teacher"

  const getData = () => {
    Get("teacher").then((res) => {
      setdata(res.data.data)
      // console.log(res.data.data)
      setload(false)
    }).catch((err) => console.log(err))

  }
  const del = (x, id) => {
    Delete("teacher",id)
      .then((res) => {
        console.log("User deleted:", res.data);
        // Remove the deleted user from the state
        const updatedData = data.filter((user) => user._id !== id);
        setdata(updatedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const edit = (x, i) => {
    navigate("/putdata", {
      state:{
        name:Name,
        editdata:x,
        data
      }
    })
  }
  useEffect(() => {
    getData();
  }, [])

  return (
    <div>
      <h1 className='text-center mt-3 '>Teacher Posts</h1>
      <Buttons click={() => navigate("/postdata",{
        state:{
          name:Name,
          data
        }
      })} classes='leftbtn px-5' label="Post" color='primary' />

      <div className='container mx-auto '>
        <div className='row'>

          {load ? <Spinner /> : data.map((x, i) => {
            return (
              <div key={i} className="mt-5 col-md-3 col-lg-3 col-sm-12 border shadow p-3 mb-5 bg-white rounded px-3 py-3 ">
                <h3>Name : {x.name}</h3>
                <h5>Course : {x.course}</h5>
                <h5>Contact : {x.contact}</h5>
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

export default Teacher