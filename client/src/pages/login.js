import { React, useState } from 'react'
import { onLogin } from '../api/auth'
import Layout from '../components/Layout'
import { useDispatch } from 'react-redux'
import { authenticateUser } from '../redux/slices/authSlice'



export const Login = () => {
  const [values, setValues] = useState({
    email_user: "",
    password: "",
  })
  const [error, setError] = useState(false)
  

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const dispatch = useDispatch()
  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const {data} = await onLogin(values)
      dispatch(authenticateUser(data.payload))
      // let user = {
      //   status: true,
      //   values
      // }
      localStorage.setItem('isAuth', 'true')
    } catch (error) {
      setError(error.response.data.errors[0].msg);
    }
  }
  return (
    <Layout>
      <form onSubmit={(e) => onSubmit(e)} className='container col-md-6 offset-md-3'>
      <br />
      <h1 style={{textAlign: 'center'}} >Login</h1>
      <br />
      <div className='mb-3'>
          <div className="form-floating">
            <input
              onChange={(e) => onChange(e)}
              type='email'
              value={values.email_user}
              className='form-control'
              id='email_user'
              name='email_user'
              placeholder='email_user'
              autoComplete='off'
              required
            />
            <label htmlFor="floatingInputGrid" className='form-label'>
              Email
            </label>
          </div>
        </div>

      <div className='mb-3'>
          <div className="form-floating">
            <input
              onChange={(e) => onChange(e)}
              type='password'
              value={values.password}
              className='form-control'
              id='password'
              name='password'
              placeholder='password'
              autoComplete='off'
              required
            />
            <label htmlFor="floatingInputGrid" className='form-label'>
              Password
            </label>
          </div>
        </div>
        {
          error && <div className="alert alert-danger" role="alert" style={{ color: 'red', margin: '8px 0', fontSize: '16px' }}>{error}</div>
        }

        <button type='submit' className='btn btn-primary'>
          Login
        </button>
      </form>
    </Layout>
  )
}
