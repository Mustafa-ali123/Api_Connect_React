import { useEffect, useState } from "react"
import { Delete, Get,GetByPage } from "../Config/ApiMethods"
import Spinner from "../Component/Spinner"
import Buttons from "../Component/Buttons"
import { useNavigate } from "react-router-dom"

const Course = () => {
  const [load, setload] = useState(true)
  const [page, setpage] = useState(0)
  const [data, setdata] = useState([])
  let Name = "course"
  let navigate = useNavigate()
  const getdata = () => {
    GetByPage("course",page).then((res) => {
      setload(false)
      setdata(res.data.data)
    }).catch((e) => console.log(e))
  }
  useEffect(() => {
    getdata()
  }, [page])
  const del = (x,id) => {
  Delete("course", id).then((res)=>{
let updatedData = data.filter((x,i)=> x._id!==id)
setdata(updatedData)
  }).catch((e)=>console.log(e))
  }
  const edit = (x) => {
    navigate("/putdata", {
      state:{
        name:Name,
        editdata:x,
        data
      }
    })
  }
  
  const getval = (x) => {
    setpage(x)
  }
  return (
    <div>
      <h1 className='text-center mt-3 '>Course Posts</h1>
      <Buttons click={() => navigate("/postdata",{
         state:{
          name:Name,
          data
        }
      })} classes='leftbtn px-5' label="Post" color='primary' />
      <div className='container mx-auto '>
        <div className='row'>
          {
            load ? <Spinner /> : data.map((x, i) => {
              return (
                <div key={i} className="mt-5 col-md-3 col-lg-3 col-sm-12 border shadow p-3 mb-5 bg-white rounded px-3 py-3">
                  <h3>Name : {x.name}</h3>
                  <h5>duration: {x.duration}</h5>
                  <h5>Fee: {x.fee}</h5>                  
                <Buttons click={() => del(x, x._id)} classes='mt-2' label="Delete" color='error' />
                <Buttons click={() => edit(x)} classes='mx-2 mt-2' label="Edit" color='success' />
                </div>
              )
            })

          }

        </div>
      </div>
      <ul className='mybtn mt-5'>
        <li><button onClick={() => getval(1)} >1</button></li>
        <li><button onClick={() => getval(2)} >2</button></li>
        <li><button onClick={() => getval(3)} >3</button></li>
        <li><button onClick={() => getval(4)} >4</button></li>
      </ul>
    </div>
  )
}

export default Course
