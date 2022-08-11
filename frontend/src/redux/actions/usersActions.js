import axios from 'axios';


let url ='http://localhost:4000/';

const usersActions = {
    signUpUser: (userData) => {
        // console.log(userData)
        return async (dispatch, getState) => {
          try{
            const res = await axios.post(url+'api/auth/signup', {userData})
            // console.log(res)  //para ver el array con los mensajes de error colocados en el validador.
            dispatch({
                type: 'MESSAGE',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success,
                    from: res.data.from
                }
            })
            return res 
         } catch(error){
            console.log(error)
         }
        }
    },
    logInUser: (logedUser) => {
        //console.log(userLogin)
        return async (dispatch, getState) => {
            const res = await axios.post(url+'api/auth/login', {logedUser})
            // console.log(res)
            if(res.data.success) {
            localStorage.setItem('token',res.data.response.token)
                dispatch({
                    type: 'USER',
                    payload: res.data.response.userData
                })
            } else {
                dispatch({
                    type: 'MESSAGE',
                    payload: {
                        view: true,
                        message: res.data.message,
                        success: res.data.success
                    },
                })
                
            } 
            return res
           
                
            }
        },

        LogOutUser: () => {
            //console.log(closeData)
            return (dispatch, getState) => {
                // await axios.post('http://localhost:4000/api/auth/logout',{closeData})
                
                localStorage.removeItem('token')
                dispatch({
                    type: 'USER',
                    payload: null
                })
            }   
        },

        verifyToken: (token) => {
            // console.log(token)
            return async (dispatch, getState) => {
              await axios.get('http://localhost:4000/api/auth/logintoken', {
                headers: { 'Authorization': 'Bearer ' + token }
              })
                .then(user => {
                    // console.log(user)
                  if (user.data.success) {
                    dispatch({ type: 'USER', payload: user.data.response });
                    dispatch({
                      type: 'MESSAGGE',
                      payload: { view: true, message: user.data.message, success: user.data.success }
                    });
                  } else { localStorage.removeItem('item') }
                }).catch(error => {
                  if (error.response.status === 401)
                    dispatch({
                      type: 'MESSAGGE',
                      payload: {
                        view: true,
                        message: 'Please Login again',
                        success: false
                      }
                    })
                  localStorage.removeItem('token')
                })
            }
          }

    }
    


export default usersActions;