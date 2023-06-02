import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Delete, Get, GetByPage } from '../Config/ApiMethods'
import Spinner from '../Component/Spinner'
import Buttons from '../Component/Buttons'
import axios from 'axios'
import { TablePagination } from '@mui/material';

const Post = (props) => {
  let navigate = useNavigate()
  let location = useLocation()
  const [data, setdata] = useState([])
  const [page, setpage] = useState(1)
  const [last, setlast] = useState(false)
  const [load, setload] = useState(true)
  let Name = "student"

  const getData = () => {
    GetByPage("student", page).then((res) => {
      setdata(res.data.data)
      setload(false)
    }).catch((err) => console.log(err))
  }
  const del = (x, id) => {
    Delete("student", id)
      .then((res) => {
        console.log("User deleted:", res.data);
        // Remove the deleted user from the state
        const updatedData = data.filter((user) => user._id !== id);
        setdata(updatedData);
      })
      .catch((err) => {
        alert(err);
      });
  }
  const edit = (x, i) => {
    navigate("/putdata", {
      state: {
        name: Name,
        editdata: x,
        data
      }
    })
  }
  useEffect(() => {
    getData();
  }, [page])

  const getval = (x) => {
    setpage(x)
  }

  return (
    <div>
      <h1 className='text-center mt-3 '>Student Posts</h1>
      <Buttons click={() => navigate("/postdata", {
        state: {
          name: Name,
          data
        }
      }
      )} classes='leftbtn px-5' label="Post" color='primary' />

      <div className='container mx-auto '>
        <div className='row'>

          {load ? <Spinner /> : last ? <h1 className='text-center mt-5 pt-5 my-5'>Data Not Available</h1> : data.map((x, i) => {
            return (
              <div key={i} className="mt-5 col-md-3 col-lg-3 col-sm-12 border shadow p-3 mb-5 bg-white rounded px-3 py-3 ">
                <h3>Name : {x.firstName}</h3>
                <h5>Father Name : {x.lastName}</h5>
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
      <ul className='mybtn mt-5'>
        <li><button onClick={() => {
          if (page == 0) {
            setpage((prev) => prev)
          } else {
            setpage((prev) => prev - 1)
            setlast(false)           
          }
        }
        }>Prev</button></li>
        <li><button onClick={() => getval(1)} >1</button></li>
        <li><button onClick={() => getval(2)} >2</button></li>
        <li><button onClick={() => getval(3)} >3</button></li>
        <li><button onClick={() => getval(4)} >4</button></li>
        <li><button onClick={() => {
          if (data.length == 0) {
            setlast(true)
          } else {
            setlast(false)            
          }
          setpage((prev) => prev + 1)
        }}>Next</button></li>
      </ul>



    </div>
  )
}

export default Post


// const handleDelete = (e) => {
//   Delete("/student", e._id)
//       .then(res => {
//           setMessage("Student Deleted Successfully")
//           setShowMessage(true)
//           console.log(res)
//       })
//       .catch(error => {
//           console.log(error)
//           setMessage(error.message)
//           setShowMessage(true)
//       })
// }


// const handleDeleteUser = (userId) => {
//   Delete(`/student/${userId}`)
//     .then((res) => {
//       console.log("User deleted:", res.data);
//       // Remove the deleted user from the state
//       const updatedData = data.filter((user) => user.id !== userId);
//       setData(updatedData);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };