import axios from 'axios';

const commentsActions = {
    
    addComment: (comment) => {
        
        const token = localStorage.getItem('token')

        return async (dispatch, getState) => {

            if (comment.comment !== "") {
                const res = await axios.post('http://localhost:4000/api/allItineraries/comment', { comment }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                dispatch({
                    type: 'MESSAGE',
                    payload: {
                        view: true,
                        message: res.data.message,
                        success: res.data.success
                    }
                })
                return res
            }
            else {
                return  {
                    data:{
                        success: false,
                        message: "Enter a comment to save it",
    
                    }
                };
              
            }
        }
    },
    
    modifyComment: (comment) => {
        
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {

            if (comment.comment !== "") {
            const res = await axios.put('http://localhost:4000/api/allItineraries/comment', { comment }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        
            dispatch({
                type: 'MESSAGE',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })

            return res
        } else {
            return  {
                data:{
                    success: false,
                    message: "Write a comment",

                }
            };
        }
        }
    } ,
    removeComment: (id) => {

        const token = localStorage.getItem('token')
        //console.log(token)
        return async (dispatch, getState) => {
            const res = await axios.post(`http://localhost:4000/api/allItineraries/comment/${id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }

            })
            dispatch({
                type: 'MESSAGE',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })
            return res
        }
    },
}



export default commentsActions;