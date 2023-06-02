import React , {useEffect, useState} from 'react'
import { Post } from '../Config/ApiMethods';
import {useLocation, useNavigate} from 'react-router-dom'

function Add() {
    const[model,setmodel]=useState({});
    const[show,setshow]=useState(false);
    let navigate = useNavigate()
    let location = useLocation()
    let postName=(location.state.name)  
     let data = Object.keys(location.state.data[0])

    let postData=(e)=>{
        e.preventDefault(e)
        Post(postName,model).then(()=>{
          navigate(`/${postName}`)
        })
        .catch((e)=>console.log(e))
    }
    useEffect(()=>{
      
      if(data.length==6){
       setshow(true)
      }
    },[])
  return (
    <div>
               <div className='container mt-5 sign'>
        <div className=' row '>
          <div className='col-lg-12 md-12 col-sm-12 mt-4'>
            <div className='side mx-auto '>              
              <form className='py-5 px-4 '>
                <h2 className="text-center pb-2">Send the post</h2>
                
                <div className="mb-3">
                  <h4>{data[1]}</h4>
                  <input                  
                    type="text"
                    onChange={(e) =>
                      setmodel({ ...model,[data[1]]: e.target.value })
                    }
                    placeholder={data[1]}
                    className=" form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>

                <div className="mb-3">
                  <h4>{data[2]}</h4>
                  <input                  
                    type="text"
                    onChange={(e) =>
                      setmodel({ ...model, [data[2]]: e.target.value })
                    }
                    className="form-control"
                    placeholder={data[2]}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <h4>{data[3]}</h4>
                  <input                  
                    type="text"
                    onChange={(e) =>
                      setmodel({ ...model, [data[3]]: e.target.value })
                    }
                    placeholder={data[3]}
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>

      {    show && ( <div className="mb-3">
                  <h4>{data[4]}</h4>
                  <input                  
                    type="text"
                    onChange={(e) =>
                      setmodel({ ...model, [data[4]]: e.target.value })
                    }
                    placeholder={data[4]}
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>)
}
                <button
                  onClick={postData}
                  type="submit"
                  className="btn btn1 px-5  btn-primary"
                >
                  ADD POST
                </button>
              </form>
              </div>
              </div>
              </div>
              </div>

    </div>
  )
}

export default Add