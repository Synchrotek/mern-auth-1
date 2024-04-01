import React, { useState } from 'react'
import { Link, redirect } from 'react-router-dom'
import Layout from '../Layout'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Singin = () => {
    const [values, setValues] = useState({
        email: 'biswajitswain348@gmail.com',
        password: '123456',
        buttonText: 'Sign in'
    });

    const handleChange = (e, value) => {
        setValues({
            ...values,
            [value]: e.target.value
        });
    }

    const clickSubmit = async (e) => {
        e.preventDefault();
        setValues({ ...values, buttonText: 'Processing...' })
        const dataToSend = { email: values.email, password: values.password }
        await axios({
            method: 'POST',
            url: `${import.meta.env.VITE_BACKEND_ENDPOINT}/signin`,
            data: dataToSend
        }).then(response => {
            console.log('SIGNIN SUCCESS', response);

            // save the response (user, token) localstorage/cookie
            setValues(
                { ...values, name: '', email: '', password: '', buttonText: 'signned in' }
            );
            toast.success(`Hey ${response.data.user.name}, Welcome back`);
        }).catch(err => {
            console.log('SIGNUP ERROR', err.response.data);
            setValues({ ...values, buttonText: 'Sign in' });
            toast.error(err.response.data.error);
        });
    }

    const signinForm = () => (
        <form>
            <div className="form-group">
                <label htmlFor="" className="text-muted">Email</label>
                <input type="email" className='form-control'
                    value={values.email}
                    onChange={e => handleChange(e, 'email')}
                />
            </div>
            <div className="form-group">
                <label htmlFor="" className="text-muted">Password</label>
                <input type="password" className='form-control'
                    value={values.password}
                    onChange={e => handleChange(e, 'password')}
                />
            </div>

            <div>
                <button className='btn, btn-primary' onClick={clickSubmit}>
                    {values.buttonText}
                </button>
            </div>
        </form>
    )

    return (
        <Layout>
            <div className="col-d-6 offset-md-1">
                <ToastContainer />
                <h1 className='p-5 text-center'>Signin</h1>
                {signinForm()}
            </div>
        </Layout>
    )
}

export default Singin