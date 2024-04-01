import React, { useState, useEffect } from 'react'
import { Link, redirect, useParams } from 'react-router-dom'
import Layout from '../Layout'
import axios from 'axios'
import { decodeToken, isExpired } from 'react-jwt'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Activate = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        show: true,
    });

    let { token } = useParams();

    useEffect(() => {
        let { name } = decodeToken(token);
        console.log(token);
        console.log(name);
        if (token) {
            setValues({ ...values, name, token })
        }
    }, [token])

    const clickSubmit = async (e) => {
        e.preventDefault();
        setValues({ ...values, buttonText: 'Processing...' })
        const dataToSend = { token: values.token }
        await axios({
            method: 'POST',
            url: `${import.meta.env.VITE_BACKEND_ENDPOINT}/account-activation`,
            data: dataToSend
        }).then(response => {
            console.log('ACCOUNT ACTIVATION SUCCESS', response);
            // save the response (user, token) localstorage/cookie
            setValues(
                { ...values, name: '', show: false }
            );
            toast.success(`${response.data.message}`);
        }).catch(err => {
            console.log('ACCOUNT ACTIVATION ERROR', err.response.data);
            toast.error(err.response.data.error);
        });
    }

    const activationLink = () => (
        <div className='text-center'>
            <h1 className='p-5'>
                Hey {values.name}, Ready to activate your account
                <br /><hr />
                <button className='btn btn-outline-primary'
                    onClick={clickSubmit}
                >Activate Account
                </button>
            </h1>
        </div>

    )

    return (
        <Layout>
            <div className="col-d-6 offset-md-1">
                <ToastContainer />
                {activationLink()}
            </div>
        </Layout>
    )
}

export default Activate