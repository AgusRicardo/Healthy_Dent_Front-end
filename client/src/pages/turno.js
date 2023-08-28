import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createTurn, url } from '../api/auth';
import Layout from '../components/Layout';
import { Loading } from '../components/Loading';
import { deleteTurn, selectTurn } from '../redux/slices/turnSlice';
import "../styles/turno.css";
import { useNavigate } from 'react-router-dom';

export const Turno = () => {
  const turn = useSelector(selectTurn)
  const user_id = localStorage.getItem("user_id");
  const dispatch = useDispatch();
  const [isLoadingPrepaid, setIsLoadingPrepaid] = useState(true);
  const [isLoadingPlace, setIsLoadingPlace] = useState(true)
  const [prepaid, setPrepaid] = useState()
  const [place, setPlace] = useState()
  const [success, setSuccess] = useState(false)
  const [noHora, setNoHora] = useState(false)
  const [noPlaceId, setNoPlaceId] = useState(false)

  const [values, setValues] = useState({
    user_id: `${user_id}`,
    prof_id: `${turn}`,
    prepaid_id: "",
    place_id: "",
    hour: "",
    date: "",
    treatment: "",
  })
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const currentDate = new Date().toISOString().split('T')[0];

  if (!turn || prepaid === undefined) {
    navigate('/search');
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prepaidResponse = await fetch(`${url}/user/prepaid/${user_id}`);
        const prepaidData = await prepaidResponse.json();
  
        const placeResponse = await fetch(`${url}/placeProfessional/${turn}`);
        const placeData = await placeResponse.json();
  
        setPrepaid(prepaidData);
        setPlace(placeData);
        setIsLoadingPrepaid(false);
        setIsLoadingPlace(false);
      } catch (error) {
        setError(error.response.data.errors[0].msg);
      }
    };
  
    fetchData();
  }, []);
  
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (values.hour === "") {
      setNoHora(true);
      return;
    }

    if (values.place_id === "") {
      setNoPlaceId(true);
      return;
    }
    try {
      values.prepaid_id = prepaid.prepaid_id
      setNoPlaceId(false);
      setNoHora(false);
      const { data } = await createTurn(values)
      setError("")
      setSuccess(data.message)
      setValues({
        user_id: `${user_id}`,
        prof_id: `${turn}`,
        prepaid_id: `${prepaid.prepaid_id}`,
        place_id: "",
        hour: "",
        date: "",
        treatment: "",
      })
      dispatch(deleteTurn())
    } catch (error) {
      setError(error.response.data.errors[0].msg);
    }
  }
  
  const maxCharacterCount = 50;
  return (
    <Layout>
      {isLoadingPrepaid && isLoadingPlace ? (
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
              <span className="error-text">
                {noPlaceId && "El campo ingresado es inválido"}
              </span>
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
                min={currentDate} 
                max="2024-12-31"
                required
              />
              <label htmlFor="floatingInputGrid" className='form-label'>
                Fecha
              </label>
            </div>
          </div>
          <div className="col-md">
            <div className="form-floating">
              <select defaultValue={'DEFAULT'} className="form-select" id="floatingSelectGrid" aria-label="Floating label select example" name="hour" onChange={(e) => onChange(e)} required>
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
            <span className="error-text">
              {noHora && "El campo ingresado es inválido"}
            </span>
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
                maxLength={maxCharacterCount}
                placeholder='treatment'
                autoComplete='off'
                required
              />
              <label htmlFor="floatingInputGrid" className='form-label'>
                Motivo de consulta
              </label>
            </div>
              <small className="text-muted">
                {maxCharacterCount - values.treatment.length} caracteres restantes
              </small>
          </div>
          <br></br>
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
