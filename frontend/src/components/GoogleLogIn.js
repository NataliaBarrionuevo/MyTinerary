import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import usersActions from '../redux/actions/usersActions';

import { toast } from 'react-toastify';

import {useNavigate} from 'react-router-dom';

export default function GoogleLogIn() {
    const dispatch = useDispatch();
    const navigate=useNavigate();

    async function handleCallBackResponse(response) {
        // console.log(response.credential);
        let userObject = jwt_decode(response.credential);
        // console.log(userObject);
        
        const res= await dispatch(usersActions.logInUser({
            
            email: userObject.email,
            password: userObject.sub,
            
            from: 'google'
        }))

            
      if(res.data.success){
        toast.success(res.data.message)
        navigate('/index')

      } else {
       toast.error(res.data.message)
       navigate('/signup')
      }
    }

    useEffect(() => {
        /* global google*/
        google.accounts.id.initialize({
            client_id: '573273820321-d8006j4a4oe343ttbicmtd3d8dn2n07e.apps.googleusercontent.com',
            callback: handleCallBackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { theme:'outline',size:'medium',shape:'pill',locale:'en', type: 'icon'}
            // {theme:'filled_black',size:'medium', locale:'en',shape:"pill"}
        )
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <div className="g_id_signin"
            id='buttonDiv'
                data-text="signup_with"
>
    <span className="icon"></span>
            </div>
        </div>
    )
}