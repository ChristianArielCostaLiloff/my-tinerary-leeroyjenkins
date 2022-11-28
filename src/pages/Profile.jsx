import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import apiUrl from '../url'

export default function Profile() {
    let { _id } = useSelector(store => store.userReducer)
    /* let { name, setName } = useState(null)
    let { name, setName } = useState(null)
    let { name, setName } = useState(null)
    let { name, setName } = useState(null)
    let { name, setName } = useState(null)
    let { name, setName } = useState(null) */
    let { user, setUser } = useState(null)

    useEffect(() => {
        axios.get(`${apiUrl}/api/auth/me/${_id}`).then(res => {
            let {name, lastName, age, photo, email, password} = res.data.response
             setUser({
                name, lastName, age, photo, email, password
             })
             console.log(user) 
            }).catch(error => console.log(error))
    }, [])
    return (
        <>{
            user &&
            <div className='base-cities profile-style'>
                <div className='box_edit'>
                    <img className="image_edit" src={user.photo} alt="img" />
                    <input className="input_edit" type="text" name="" placeholder="Name" />
                    <input className="input_edit" type="text" name="" placeholder="Last name" />
                    <input className="input_edit" type="text" name="" placeholder="Photo" />
                    <input className="input_edit" type="number" name="" placeholder="Age" />
                    <input className="input_edit" type="email" name="" placeholder="Email" />
                    <input className="input_edit" type="password" name="" placeholder="Password" />
                    <div className='buttons_edit'>
                        <button className="button_edit style_save">SAVE</button>
                    </div>
                </div>
            </div>
        }
        </>
    )
}
