import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { registerProfessional } from '../api/auth'
import Layout from '../components/Layout'

const RegisterProfessional = () => {
  const { isAuth } = useSelector((state) => state.authh)
  const [values, setValues] = useState({
    user_id: `${isAuth.values.payload.id}`,
    n_matric: "",
    specialization: "",
  })
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await registerProfessional(values)
      setError('')
      setSuccess(data.message)
      setValues({
        user_id: `${isAuth.values.payload.id}`,
        n_matric: "",
        specialization: "",
      })
    } catch (error) {
      setError(error.response.data.errors[0].msg);
      setSuccess('')
    }
  }
  return (
    <Layout>
      <form onSubmit={(e) => onSubmit(e)} className='container col-md-6 offset-md-3'>
      <br />
      <h1 style={{textAlign: 'center'}} >Registrarse como profesional</h1>
      <br />
      <div className='mb-3'>
          <div className="form-floating">
            <input
              onChange={(e) => onChange(e)}
              type='text'
              value={values.email_user}
              className='form-control'
              id='n_matric'
              name='n_matric'
              placeholder='n_matric'
              autoComplete='off'
              required
            />
            <label htmlFor="floatingInputGrid" className='form-label'>
              Número de matrícula
            </label>
          </div>
        </div>

      <div className='mb-3'>
          <div className="form-floating">
            <input
              onChange={(e) => onChange(e)}
              type='text'
              value={values.password}
              className='form-control'
              id='specialization'
              name='specialization'
              placeholder='specialization'
              autoComplete='off'
              required
            />
            <label htmlFor="floatingInputGrid" className='form-label'>
              Especialización
            </label>
          </div>
        </div>
        {
          error && <div className="alert alert-danger" role="alert" style={{ color: 'red', margin: '8px 0', fontSize: '16px' }}>{error}</div>
        }
        {
          success && <div className="alert alert-success" role="alert" style={{ color: 'green', margin: '10px 0', fontSize: '18px' }}>{success}</div>
        }

        <button type='submit' className='btn btn-primary'>
          Registrarse
        </button>
      </form>
    </Layout>
  )
}

export default RegisterProfessional