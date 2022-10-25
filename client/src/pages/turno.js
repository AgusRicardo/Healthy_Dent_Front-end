import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createTurn, url } from '../api/auth';
import Layout from '../components/Layout';
import { Loading } from '../components/Loading';
import { deleteTurn, selectTurn } from '../redux/slices/turnSlice';
import { selectUser } from '../redux/slices/userSlice';
import "../styles/turno.css";

export const Turno = () => {
  const item = useSelector(selectUser)
  const turn = useSelector(selectTurn)
  const dispatch = useDispatch();

  const [isLoadingPrepaid, setIsLoadingPrepaid] = useState(true);
  const [isLiadingPlace, setIsLiadingPlace] = useState(true)
  const [prepaid, setPrepaid] = useState()
  const [place, setPlace] = useState()
  const [success, setSuccess] = useState(false)
  const [values, setValues] = useState({
    user_id: `${item[0].id}`,
    prof_id: `${turn}`,
    prepaid_id: `${item[0].prepaid}`,
    place_id: "",
    payment_id: "",
    hour: "",
    date: "",
    treatment: "",
  })
  const [error, setError] = useState(false)


  useEffect(() => {
    fetch(`${url}/user/prepaid/${item[0].id}`)
    .then((response) => response.json())
    .then((res) => {
      setPrepaid(res);
      setIsLoadingPrepaid(false); 
    });
  }, []);

useEffect(() => {
  fetch(`${url}/placeProfessional/${turn}`)
  .then((response) => response.json())
  .then((res) => {
    setPlace(res)
    setIsLiadingPlace(false)
  })
}, [])

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
        prof_id: `${turn}`,
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
      {isLoadingPrepaid && setIsLiadingPlace ? (
        <Loading/>
      ) : (
        <div className="container-login container regcontainer" id="container">
          <div>
          <form onSubmit={(e) => onSubmit(e)} className='container'>
        <br />
        <h1 style={{ textAlign: 'center' }} >Sacá tu turno</h1>
        <br />
        <h5 className='subtitleform'>Datos del turno</h5>
          <hr className='separador sepreg'></hr>
        <div className='row g-2 mb-3'>
        <div className="col-md">
            <div className="form-floating">
              <input
                onChange={(e) => onChange(e)}
                type='text'
                value={prepaid.detail}
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
                {
                  !place || place.message ?
                  <option value="2">Grupo Oroño</option>
                  :
                  place.map((site) => (
                    <option key={site.place_id} value={site.place_id}>{site.address}</option>
                  ))
                }
              </select>
              <label htmlFor="floatingSelectGrid">Lugar de atención</label>
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
                min="2022-11-01" 
                max="2023-12-31"
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
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
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
          <br></br>
          <h5 className='subtitleform'>Formas de pago</h5>
          <hr className='separador sepreg'></hr>
          <div className='mb-3'>
          <div className="col-md">
            <div className="form-floating">
              <select defaultValue={'DEFAULT'} className="form-select" id="floatingSelectGrid" aria-label="Floating label select example" name="payment_id" onChange={(e) => onChange(e)}>
                <option selected value="DEFAULT" disabled>Seleccione un método de pago...</option>
                <option value="1">Efectivo</option>
                <option value="2">Débito Marstercard</option>
                <option value="3">Crédito Mastercard</option>
                <option value="4">Mercado Pago</option>
                <option value="5">Crédito Santa Fe</option>
                <option value="6">Crédito Santander</option>
                <option value="7">Débito Santander</option>
                <option value="8">Crédito Visa</option>
                <option value="9">Débito Visa</option>
              </select>
              <label htmlFor="floatingSelectGrid">Método de pago</label>
            </div>
          </div>
        </div>
          <br/>
        {
          error && <div className="alert alert-danger" role="alert" style={{ color: 'red', margin: '8px 0', fontSize: '16px' }}>{error}</div>
        }
        {
          success && <div className="alert alert-success" role="alert" style={{ color: 'green', margin: '10px 0', fontSize: '18px' }}>{success}</div>
        }
        <div className='containerbuttonregprof divbuttonturn'>
        <button type='submit' className='btn btn-primary soliturnbutton '>
          Solicitar turno
        </button>
        </div>
      </form>
          </div>
        </div>

      
      )}
    </Layout>
  )
}
