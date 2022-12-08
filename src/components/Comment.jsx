import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import commentActions from '../redux/actions/commentActions'
import apiUrl from '../url'

export default function Comment({ comment }) {
    const dispatch = useDispatch()
    let [commentData, setCommentData] = useState(comment)
    let { _id } = useSelector((store) => store.userReducer);



    const handleClickEditComment = async () => {

        Swal.fire({
            input: 'textarea',
            inputLabel: 'Edit comment',
            inputPlaceholder: 'Edit comment here...',
            inputAttributes: {
                'aria-label': 'Edit comment here'
            },
            showCancelButton: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                let data = {
                    comment: result.value,
                    date: commentData.date
                }
                let token = JSON.parse(localStorage.getItem("token"));
                let headers = { headers: { Authorization: `Bearer ${token.token.user}` } };
                const res = await axios.put(`${apiUrl}/api/comment/${commentData._id}`, data, headers)
                setCommentData(res.data.response)
            }
        })
    }

    const handleClickDeleteComment = (commentId) => {
        dispatch(commentActions.deleteComment(commentId))
    }
    return (

        <div className="comment-box">
            <img src={commentData.userId.photo} alt="" />
            <div className='comment-data'><p className="comment-name">{commentData.userId.name}</p><p className="comment-content">{commentData.comment}</p>
            </div>
            {commentData.userId._id === _id && <div className="container-btn-comment">
                <button
                    onClick={() => handleClickDeleteComment(commentData._id)}
                    className="btn-comment img_delete"
                >
                    <div className="editMode-img-container background-delete" />
                </button>

                <button
                    onClick={() => handleClickEditComment()}
                    className="btn-comment img_edit"
                >
                    <div className="editMode-img-container background-edit" />
                </button>
            </div>}
        </div>
    )
}
