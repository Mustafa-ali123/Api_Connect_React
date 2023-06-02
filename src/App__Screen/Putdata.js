import React, { useState } from 'react'
import { Post, Put } from '../Config/ApiMethods';
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react';

function Add() {
  const [model, setmodel] = useState({});
  const [data, setdata] = useState([]);
  const [show, setshow] = useState(true);
  let navigate = useNavigate()
  let location = useLocation()
  const uid = location.state.editdata._id
  const Name = location.state.name
  const Data = Object.keys(location.state.data[0]);

  useEffect(() => {
    if (Data.length == 5) {
      setshow(false)
    }
    setmodel(location.state.editdata)
  }, [])

  let postData = (e) => {
    e.preventDefault(e)
    Put(Name, uid, model).then((res) => {
      navigate(`/${Name}`)
    }).catch(err => console.log(err))

  }
  return (
    <div>
      <div className='container mt-5 sign'>
        <div className=' row '>
          <div className='col-lg-12 md-12 col-sm-12 mt-4'>
            <div className='side mx-auto '>              
              <form className='py-5 px-4 '>
                <h2 className="text-center pb-3">Edit the Post</h2>

                <div className="mb-3">
                  <h4>{Data[1]}:</h4>
                  <input
                    defaultValue={model[Data[1]]}
                    type="text"
                    onChange={(e) =>
                      setmodel({ ...model, [Data[1]]: e.target.value })
                    }
                    placeholder={Data[1]}
                    className=" form-control"
                    id="exampleInputEmail1 "
                    aria-describedby="emailHelp"
                  />
                </div>

                <div className="mb-3">
                  <h4>{Data[2]} :</h4>
                  <input
                    defaultValue={model[Data[2]]}
                    type="text"
                    onChange={(e) =>
                      setmodel({ ...model, [Data[2]]: e.target.value })
                    }
                    className="form-control"
                    placeholder={Data[2]}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <h4>{Data[3]} :</h4>
                  <input
                    defaultValue={model[Data[3]]}
                    type="text"
                    onChange={(e) =>
                      setmodel({ ...model, [Data[3]]: e.target.value })
                    }
                    placeholder={Data[3]}
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                {

                  show && (<div className="mb-3">
                    <h4>{Data[4]} :</h4>
                    <input
                      type="text"
                      defaultValue={model[Data[4]]}
                      onChange={(e) =>
                        setmodel({ ...model, [Data[4]]: e.target.value })
                      }
                      placeholder={Data[4]}
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
                  Edit The Data
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

