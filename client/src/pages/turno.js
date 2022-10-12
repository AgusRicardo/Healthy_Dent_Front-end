import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createTurn } from '../api/auth';
import Layout from '../components/Layout';
import { deleteTurn, selectTurn } from '../redux/slices/turnSlice';
import { selectUser } from '../redux/slices/userSlice';

export const Turno = () => {
  const item = useSelector(selectUser)
  const turn = useSelector(selectTurn)
  const dispatch = useDispatch();
  console.log(item);
  console.log(turn);

  const [success, setSuccess] = useState(false)

  const [values, setValues] = useState({
    user_id: `${item[0].id}`,
    prof_id: `${turn[0]}`,
    prepaid_id: `${item[0].prepaid}`,
    place_id: "",
    payment_id: "",
    hour: "",
    date: "",
    treatment: "",
  })
  const [error, setError] = useState(false)


  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }


  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await createTurn(values)
      setError("")
      setSuccess(data.message)
      setValues({
        user_id: `${item[0].id}`,
        prof_id: `${turn[0]}`,
        prepaid_id: `${item[0].prepaid}`,
        place_id: "",
        payment_id: "",
        hour: "",
        date: "",
        treatment: "",
      })
      dispatch(deleteTurn())
    } catch (error) {
      setError(error.response.data.errors[0].msg);
    }
  }

  
  return (
    <Layout>
      <form onSubmit={(e) => onSubmit(e)} className='container col-md-6 offset-md-3'>
        <br />
        <h1 style={{ textAlign: 'center' }} >Sacá tu turno</h1>
        <br />
        <div className='row g-2 mb-3'>
        <div className="col-md">
            <div className="form-floating">
              <input
                onChange={(e) => onChange(e)}
                type='text'
                value={values.prepaid_id}
                className='form-control'
                id='prepaid_id'
                name='prepaid_id'
                placeholder='Prepaid'
                autoComplete='off'
                disabled
                required
              />
              <label htmlFor="floatingInputGrid" className='form-label'>
                Obra social
              </label>
            </div>
          </div>
          <div className="col-md">
            <div className="form-floating">
              <select defaultValue={'DEFAULT'} className="form-select" id="floatingSelectGrid" aria-label="Floating label select example" name="place_id" onChange={(e) => onChange(e)}>
                <option selected value="DEFAULT" disabled>Seleccione un lugar de atención...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <label htmlFor="floatingSelectGrid">Lugar de atención</label>
            </div>
          </div>
        </div>
        <div className='mb-3'>
          <div className="col-md">
            <div className="form-floating">
              <select defaultValue={'DEFAULT'} className="form-select" id="floatingSelectGrid" aria-label="Floating label select example" name="payment_id" onChange={(e) => onChange(e)}>
                <option selected value="DEFAULT" disabled>Seleccione un método de pago...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <label htmlFor="floatingSelectGrid">Método de pago</label>
            </div>
          </div>
        </div>
        <div className='row g-2 mb-3'>
          <div className="col-md">
            <div className="form-floating">
              <input
                onChange={(e) => onChange(e)}
                type='date'
                value={values.date}
                className='form-control'
                id='date'
                name='date'
                placeholder='Fecha'
                autoComplete='off'
                required
              />
              <label htmlFor="floatingInputGrid" className='form-label'>
                Fecha
              </label>
            </div>
          </div>
          <div className="col-md">
            <div className="form-floating">
              <select defaultValue={'DEFAULT'} className="form-select" id="floatingSelectGrid" aria-label="Floating label select example" name="hour" onChange={(e) => onChange(e)}>
                <option selected value="DEFAULT" disabled>Seleccione un horario...</option>
                <option value="1">12:00</option>
                <option value="2">12:20</option>
                <option value="3">12:30</option>
                <option value="4">12:45</option>
              </select>
              <label htmlFor="floatingSelectGrid">Horario</label>
            </div>
          </div>
        </div>
        <div className="col-md">
            <div className="form-floating">
              <input
                onChange={(e) => onChange(e)}
                type='text'
                value={values.treatment}
                className='form-control'
                id='treatment'
                name='treatment'
                placeholder='treatment'
                autoComplete='off'
                required
              />
              <label htmlFor="floatingInputGrid" className='form-label'>
                Tratamiento
              </label>
            </div>
          </div>
          <br/>
        {
          error && <div className="alert alert-danger" role="alert" style={{ color: 'red', margin: '8px 0', fontSize: '16px' }}>{error}</div>
        }
        {
          success && <div className="alert alert-success" role="alert" style={{ color: 'green', margin: '10px 0', fontSize: '18px' }}>{success}</div>
        }
        <button type='submit' className='btn btn-primary'>
          Solicitar
        </button>
      </form>
    </Layout>
  )
}
