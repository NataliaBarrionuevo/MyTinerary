import React, {useEffect} from 'react';
import jwt_decode from 'jwt-decode';
import {useDispatch} from 'react-redux';
import usersActions from '../redux/actions/usersActions';

import { toast } from 'react-toastify';


export default function GoogleSignUp(props){
    // console.log(props)
    const dispatch=useDispatch();

    async function handleCallBackResponse(response){
        // console.log(response.credential);
        let userObject=jwt_decode(response.credential);
        // console.log(userObject);

        const res= await dispatch (usersActions.signUpUser({
            firstName: userObject.given_name ,
            lastName: userObject.family_name ,
            email: userObject.email ,
            password: userObject.sub ,
            userPhoto: userObject.picture ,
            country: props.country,
            from: 'google' 
        }))

        const errorValidator=res.data.message; //para acceder directamente al array con mensajes del validador y simplificar el forEach.

    //Condicionales según el from

    if(res.data.from === 'validator'){
      errorValidator.forEach(elem=>{
        toast.error(elem.message)
      })
    }

    else{
       if(res.data.success){
        toast.success(res.data.message)
       } else {
        toast.error(res.data.message)
       }
    }
    }

    useEffect(()=>{
        /*global google*/
        google.accounts.id.initialize({
            client_id:'573273820321-d8006j4a4oe343ttbicmtd3d8dn2n07e.apps.googleusercontent.com',
            callback: handleCallBackResponse
            

        });

        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            {theme:'outline',size:'medium',shape:'pill',locale:'en', type: 'icon'}
        )
    });

    return (
        <div>
            <div id='buttonDiv'></div>
        </div>
    )
}
