import React, { useState } from 'react'
import { Link, redirect } from 'react-router-dom'
import Layout from '../Layout'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Singup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        buttonText: 'Sign up'
    });

    const handleChange = (e, value) => {
        setValues({
            ...values,
            [value]: e.target.value
        });
    }

    const clickSubmit = async (e) => {
        e.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' })
        // axios({method: 'POST', url: })


        const dataToSend = { name: values.name, email: values.email, password: values.password }
        await axios({
            method: 'POST',
            url: `${import.meta.env.VITE_BACKEND_ENDPOINT}/signup`,
            data: dataToSend
        }).then(response => {
            console.log('------------------------------ Debugger 2')
            console.log(response);
            console.log('------------------------------ Debugger 3')
            // console.log('SIGNU SUCCESS', response);
            setValues(
                { ...values, name: '', email: '', password: '', buttonText: 'Submitted' }
            );
            toast.success(response.data.message);
        }).catch(err => {
            // console.log('SIGNU ERROR', err.response.data);
            setValues({ ...values, buttonText: 'Submit' });
            toast.error(err.response.data.error);
        });


    }

    const signupForm = () => (
        <form>
            <div className="form-group">
                <label htmlFor="" className="text-muted">Name</label>
                <input type="text" className='form-control'
                    value={values.name}
                    onChange={e => handleChange(e, 'name')}
                />
            </div>
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
                <h1 className='p-5 text-center'>Signup</h1>
                {signupForm()}
            </div>
        </Layout>
    )
}

export default Singup