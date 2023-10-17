import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { assignTurn, createTurn, getAllDates, getAllHours, url } from '../api/auth';
import Layout from '../components/Layout';
import { Loading } from '../components/Loading';
import { deleteTurn, selectTurn } from '../redux/slices/turnSlice';
import "../styles/turno.css";
import { useNavigate } from 'react-router-dom';
import { ToastError } from '../components/ToastError';
import { ToastSuccess } from '../components/ToastSuccess';

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
  const [infoProf, setInfoProf] = useState("")
  const [isSelectDisabled, setIsSelectDisabled] = useState(true);
  const [getHours, setGetHours] = useState({
    prof_id: `${turn}`,
    date: ""
  });
  const [hours, setHours] = useState()
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
  const [sinDisponibilidad, setSinDisponibilidad] = useState(false)
  const navigate = useNavigate()

  if (!turn || prepaid === undefined) {
    navigate('/search');
  }
  function formatearFecha(fechaOriginal) {
    const fecha = new Date(fechaOriginal);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; 
    const anio = fecha.getFullYear();
    const fechaFormateada = `${dia}/${mes}/${anio}`;

    return fechaFormateada;
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const prepaidResponse = await fetch(`${url}/user/prepaid/${user_id}`);
        const prepaidData = await prepaidResponse.json();
        const placeResponse = await fetch(`${url}/placeProfessional/${turn}`);
        const placeData = await placeResponse.json();
        const hourTurn = await getAllDates(turn);

        if (!hourTurn.data.message) {
          setInfoProf(hourTurn.data);
        }else {
          setSinDisponibilidad(true)
        }

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
  
  useEffect(() => {
    if (values.date !== "") {
      setIsSelectDisabled(false);
    }else{
      setIsSelectDisabled(true);
    }
    fetchData()
  }, [values.date])

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    if (e.target.name === "date") {
      setGetHours({ ...getHours, [e.target.name]: e.target.value });
      fetchData();
    }
  }
  
  const fetchData = async (e) => {
    try {
      const getHoursAvailable = await getAllHours(getHours);
      setHours(getHoursAvailable.data);
    } catch (error) {
      setError(error.response.data.errors[0].msg);
    }
  };

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
      const { data } = await assignTurn(values)
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
      setTimeout(() => {
        dispatch(deleteTurn())
      }, 2100);
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
        <h1 style={{ textAlign: 'center' }} >Solicitar Turno</h1>
        <br />
        <h5 className='subtitleform'>Datos del turno</h5>
          <hr className='separador sepreg'></hr>
        <div className='row g-2 mb-3 w-100'>
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
              <select defaultValue={'DEFAULT'} className="form-select" id="floatingSelectGrid" aria-label="Floating label select example" disabled={sinDisponibilidad} name="place_id" onChange={(e) => onChange(e)} required>
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
        <div className='row g-2 mb-3 w-100'>
        <div className="col-md">
            <div className="form-floating">
              <select defaultValue={'DEFAULT'} className="form-select" disabled={sinDisponibilidad} id="floatingSelectGrid" aria-label="Floating label select example" name="date" onChange={(e) => onChange(e)} required>
                <option selected value="DEFAULT" disabled>Seleccione un día...</option>
                {
                  infoProf == "" ? <p>No se encontraron horarios disponibles</p>
                  :
                  infoProf.map ((date, index) => (
                    <option key={index} value={(new Date(date.date)).toISOString().split('T')[0]}>{formatearFecha(date.date)}</option>
                    ) 
                  )
                }
              </select>
              <label htmlFor="floatingSelectGrid">Fecha</label>
            </div>
          </div>
          <div className="col-md">
            <div className="form-floating">
              <select defaultValue={'DEFAULT'} className="form-select" id="floatingSelectGrid" aria-label="Floating label select example" name="hour" disabled={isSelectDisabled} onChange={(e) => onChange(e)} required>
                <option selected value="DEFAULT" disabled>Seleccione un horario...</option>
                {
                  hours == undefined || hours == [] ? <p>No se encontraron horarios disponibles</p>
                  :
                  hours.map ((hour, index) => (
                    <option key={index} value={hour.hour}>{hour.hour.slice(0, -3)}hs</option>
                    ) 
                  )
                }
              </select>
              <label htmlFor="floatingSelectGrid">Horario</label>
            </div>
            <span className="error-text">
              {noHora && "El campo ingresado es inválido"}
            </span>
          </div>
        </div>
        <hr />
        <div className="col-md w-100">
            <div className="form-floating">
              <textarea
                onChange={(e) => onChange(e)}
                type='text'
                value={values.treatment}
                className='form-control'
                id='treatment'
                name='treatment'
                maxLength={maxCharacterCount}
                placeholder='treatment'
                autoComplete='off'
                disabled={sinDisponibilidad}
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
          error && <ToastError titulo='Hubo un error' descripcion={error}/>
        }
        {
          success && <ToastSuccess titulo='Turno agendado con exito' descripcion={success}/>
        }
        {
          sinDisponibilidad && <ToastError titulo='Sin turnos disponibles!' descripcion={error}/>
        }
        {
          sinDisponibilidad && <div class="alert alert-danger" role="alert">Sin turnos disponibles!</div>
        }
        <div className='containerbuttonregprof divbuttonturn'>
        <button type='submit' className='btn btn-primary soliturnbutton' disabled={sinDisponibilidad}>
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
