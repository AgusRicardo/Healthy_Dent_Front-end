import { React, useState } from 'react'
import { onRegistration } from '../api/auth'
import Layout from '../components/Layout'

export const Register = () => {
  const [values, setValues] = useState({
    dni: "",
    name: "",
    last_name: "",
    date_birth: "",
    address_user: "",
    email_user: "",
    telephone: "",
    password: "",
    prepaid_id: "",
  })
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await onRegistration(values)
      setError('')
      setSuccess(data.message)
      setValues({ 
      dni: "",
      name: "",
      last_name: "",
      date_birth: "",
      address_user: "",
      email_user: "",
      telephone: "",
      password: "",
      prepaid_id: "DEFAULT",
    })
    } catch (error) {
      setError(error.response.data.errors[0].msg)
      setSuccess('')
    }
  }

  return (
    <Layout>
      <form onSubmit={(e) => onSubmit(e)} className='container col-md-6 offset-md-12'>
        <br />
        <h1 style={{textAlign: 'center'}} >Registro</h1>
        <br />
        <h5>Personal</h5>
        <div className="row g-2 mb-3">
          <div className='col-md'>
            <div className="form-floating">
              <input
                onChange={(e) => onChange(e)}
                type='text'
                value={values.name}
                className='form-control'
                id='name'
                name='name'
                placeholder='name'
                autoComplete='off'
                required
              />
              <label className='form-label' htmlFor="floatingInputGrid">
                Nombre
              </label>
            </div>
          </div>
          <div className='col-md'>
            <div className="form-floating">
              <input
                onChange={(e) => onChange(e)}
                type='text'
                value={values.last_name}
                className='form-control'
                id='last_name'
                name='last_name'
                placeholder='last_name'
                autoComplete='off'
                required
              />
              <label className='form-label' htmlFor="floatingInputGrid">
                Apellido
              </label>
            </div>
          </div>
        </div>

        <div className='mb-3'>
          <div className="form-floating">
            <input
              onChange={(e) => onChange(e)}
              type='email'
              className='form-control'
              id='email'
              name='email_user'
              value={values.email_user}
              placeholder='test@gmail.com'
              autoComplete='off'
              required
            />
            <label className='form-label' htmlFor="floatingInputGrid">
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

        <div className='row g-2 mb-3'>
          <div className='col-md'>
            <div className="form-floating">
              <input
                onChange={(e) => onChange(e)}
                type='text'
                value={values.dni}
                className='form-control'
                id='dni'
                name='dni'
                placeholder='DNI'
                autoComplete='off'
                required
              />
              <label htmlFor="floatingInputGrid" className='form-label'>
                DNI
              </label>
            </div>
          </div>

            <div className="col-md">
              <div className="form-floating">
                <select defaultValue={'DEFAULT'} className="form-select" id="floatingSelectGrid" aria-label="Floating label select example" name="prepaid_id" onChange={(e) => onChange(e)}>
                  <option selected value="DEFAULT" disabled>Seleccione su obra social ...</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                <label htmlFor="floatingSelectGrid">Obra social</label>
              </div>
            </div>
        </div>

        <div className='mb-3'>
          <div className="form-floating">
            <input
              onChange={(e) => onChange(e)}
              type='date'
              value={values.date_birth}
              className='form-control'
              id='date_birth'
              name='date_birth'
              placeholder='date_birth'
              autoComplete='off'
              required
            />
            <label className='form-label' htmlFor="floatingSelectGrid">
              Fecha de nacimiento
            </label>
          </div>
        </div>
        <br />
        <hr />
        <br />
        <h5>Contacto</h5>
        <div className='row g-2 mb-3'>
          <div className='col-md'>
            <div className="form-floating">
            <input
              onChange={(e) => onChange(e)}
              type='text'
              value={values.address_user}
              className='form-control'
              id='address_user'
              name='address_user'
              placeholder='address_user'
              autoComplete='off'
              required
            />
            <label className='form-label' htmlFor="floatingSelectGrid">
              Direccion
            </label>
            </div>
          </div>

          <div className='col-md'>
            <div className="form-floating">
              <input
                onChange={(e) => onChange(e)}
                type='number'
                value={values.telephone}
                className='form-control'
                id='telephone'
                name='telephone'
                placeholder='telephone'
                autoComplete='off'
                required
              />
              <label className='form-label' htmlFor="floatingSelectGrid">
                Telefono
              </label>
            </div>
          </div>
        </div>
        <br />
        {
          error && <div className="alert alert-danger" role="alert" style={{ color: 'red', margin: '10px 0', fontSize: '18px' }}>{error}</div>
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
