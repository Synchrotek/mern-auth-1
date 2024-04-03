import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import Layout from '../Layout'


const ForgotPassword = () => {
    const [values, setValues] = useState({
        email: '',
        buttonText: 'Get Password reset Link'
    });

    const handleChange = (e, value) => {
        setValues({
            ...values,
            [value]: e.target.value
        });
    }

    const clickSubmit = async (e) => {
        e.preventDefault();
        setValues({ ...values, buttonText: 'Sending...' })
        await axios({
            method: 'PUT',
            url: `${import.meta.env.VITE_BACKEND_ENDPOINT}/forgot-password`,
            data: { email: values.email }
        }).then(response => {
            console.log('FORGOT PASSWORD SUCCESS', response);
            toast.success(response.data.message);
        }).catch(err => {
            console.log('FORGOT PASSWORD ERROR', err.response.data);
            toast.error(err.response.data.error);
        });
        setValues({ ...values, buttonText: 'Get Password reset Link' })
    }

    const forgotPasswordForm = () => (
        <form>
            <div className="form-group">
                <label htmlFor="" className="text-muted">Email</label>
                <input type="email" className='form-control'
                    value={values.email}
                    onChange={e => handleChange(e, 'email')}
                />
            </div>

            <button className='btn, btn-primary'
                onClick={clickSubmit} style={{ cursor: 'pointer' }}
            >{values.buttonText}
            </button>
        </form>
    )

    return (
        <Layout>
            <div className="col-d-6 offset-md-1">
                <ToastContainer />
                <h1 className='p-5 text-center'>Forgot Password ?</h1>
                {forgotPasswordForm()}
            </div>
        </Layout>
    )
}

export default ForgotPassword