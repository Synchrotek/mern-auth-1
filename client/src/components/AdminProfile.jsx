import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import Layout from './Layout'
import { isAuth, getCookie, signout, updateUser } from './auth/helper'

const AdminProfile = () => {
    const navigate = useNavigate();
    const [updateMode, setUpdateMode] = useState(false);
    const [values, setValues] = useState({
        name: '',
        email: '',
        role: '',
        password: '',
        buttonText: 'Edit'
    });

    useEffect(() => {
        loadProfile();
    }, [])

    const loadProfile = async () => {
        const token = getCookie('token');
        const userId = isAuth()._id;
        await axios({
            method: 'GET',
            url: `${import.meta.env.VITE_BACKEND_ENDPOINT}/user/${userId}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log('USER PROFILE GET', response);
            const { role, name, email } = response.data;
            setValues({ ...values, role, name, email })
        }).catch(err => {
            console.log('USER PROFILE UPDATE ERROR', err.response);
            if (err.response.status === 401) {
                signout(() => {
                    navigate('/');
                });
            }
        })
    }

    const handleChange = (e, value) => {
        setValues({
            ...values,
            [value]: e.target.value
        });
    }

    const clickSubmit = async (e) => {
        e.preventDefault();
        const token = getCookie('token');
        if (!updateMode) {
            return setUpdateMode(true);
        }
        setValues({ ...values, buttonText: 'Updateing' })
        const dataToSend = { name: values.name, password: values.password }
        await axios({
            method: 'PUT',
            url: `${import.meta.env.VITE_BACKEND_ENDPOINT}/admin/update`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: dataToSend
        }).then(response => {
            console.log('USER PROFILE UPDATE SUCCESS', response);
            updateUser(response, () => {
                setValues(
                    { ...values, password: '', buttonText: 'Edit' }
                );
                toast.success('Profile updated Successfully');
                setUpdateMode(false);
            })
        }).catch(err => {
            console.log('USER PROFILE UPDATE ERROR', err.response.data);
            setValues({ ...values, buttonText: 'Edit' });
            toast.error(err.response.data.error);
        });
    }

    const updateUserForm = () => (
        <form>
            <div className="form-group">
                <label htmlFor="" className="text-muted">Name</label>
                <input type="text" className='form-control'
                    value={values.name}
                    disabled={!updateMode}
                    onChange={e => handleChange(e, 'name')}
                />
            </div>
            <div className="form-group">
                <label htmlFor="" className="text-muted">Email</label>
                <input type="email" className='form-control'
                    value={values.email}
                    disabled
                    onChange={e => handleChange(e, 'email')}
                />
            </div>
            <div className="form-group">
                <label htmlFor="" className="text-muted">Role</label>
                <input type="text" className='form-control'
                    value={values.role}
                    disabled
                />
            </div>
            <div className="form-group">
                <label htmlFor="" className="text-muted">Password</label>
                <input type="password" className='form-control'
                    value={values.password}
                    disabled={!updateMode}
                    onChange={e => handleChange(e, 'password')}
                />
            </div>

            <div>
                <button style={{ cursor: 'pointer' }}
                    className='btn, btn-primary' onClick={clickSubmit}>
                    {updateMode ? 'Update' : values.buttonText}
                </button>
            </div>
        </form>
    )

    return (
        <Layout>
            <div className="col-d-6 offset-md-1">
                <ToastContainer />
                {!isAuth() ? <Navigate to='/signin' /> : null}
                <h1 className='p-5 text-center'>Admin Profile</h1>
                {updateUserForm()}
            </div>
        </Layout>
    )
}

export default AdminProfile