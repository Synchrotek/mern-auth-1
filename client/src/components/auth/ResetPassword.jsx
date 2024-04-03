import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { decodeToken } from 'react-jwt'
import axios from 'axios'
import Layout from '../Layout'

const ResetPassword = () => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        newPassword: '',
        buttonText: 'Reset password'
    });

    let { token } = useParams();

    useEffect(() => {
        let { name } = decodeToken(token);
        if (token) {
            setValues({ ...values, name, token })
        }
    }, [])

    const handleChange = (e) => {
        setValues({
            ...values, newPassword: e.target.value
        });
    }

    const clickSubmit = async (e) => {
        e.preventDefault();
        setValues({ ...values, buttonText: 'Resetting Password...' })
        await axios({
            method: 'PUT',
            url: `${import.meta.env.VITE_BACKEND_ENDPOINT}/reset-password`,
            data: { newPassword: values.newPassword, resetPasswordToken: token }
        }).then(response => {
            console.log('RESET PASSWORD SUCCESS', response);
            toast.success(response.data.message);
        }).catch(err => {
            console.log('RESET PASSWORD ERROR', err.response.data);
            toast.error(err.response.data.error);
        });
        setValues({ ...values, buttonText: 'Reset password' })
    }

    const resetPasswordForm = () => (
        <form>
            <div className="form-group">
                <label htmlFor="" className="text-muted">Email</label>
                <input type="password" className='form-control'
                    value={values.newPassword}
                    onChange={handleChange} required
                    placeholder='Type a new Password'
                />
            </div>

            <div>
                <button className='btn, btn-primary'
                    onClick={clickSubmit} style={{ cursor: 'pointer' }}
                >{values.buttonText}
                </button>
            </div>
        </form>
    )

    return (
        <Layout>
            <div className="col-d-6 offset-md-1">
                <ToastContainer />
                <h1 className='p-5 text-center'>Hey {values.name},
                    <br />Let's create a new password</h1>
                {resetPasswordForm()}
            </div>
        </Layout>
    )
}

export default ResetPassword