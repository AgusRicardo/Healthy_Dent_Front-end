import Calendar from "react-calendar";
import Layout from "../components/Layout";
import "../styles/agenda.css";
import "react-calendar/dist/Calendar.css"
import { useEffect, useState } from "react";
import { postDateProf, postHoursProf, url } from '../api/auth';
import { Loading } from "../components/Loading";

export const Agenda = () => {
  const [date, setDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [turns, setTurns] = useState(true);
  const [fiveTurns, setFiveTurns] = useState({});
  const [noTurns, setNoTurns] = useState()
  const [popUpLoading, PopUpLoading] = useState(true)
  const [popUpSinTurnos, setPopUpSinTurnos] = useState()
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [fecha, setFecha] = useState('');
  const [error, setError] = useState('');
  const [isConfirmationVisible, setConfirmationVisible] = useState(true);
  const [saveBtnVisible, setSaveBtnVisible] = useState(false)
  const prof_id = localStorage.getItem("prof_id");
  const today = date.getDate();
  const year = date.getFullYear();

  useEffect(() => {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const monthIndex = date.getMonth();
    const currentMonthName = months[monthIndex];
    setCurrentMonth(currentMonthName.toUpperCase());
    
  }, [date]);

  useEffect(() => {
    fetch(`${url}/calendar/${prof_id}`)
      .then((response) => response.json())
      .then((res) => {
        if (res.message) {
          let noHayTurnos = "No hay turnos para mostrar el día de hoy.";
          setNoTurns(noHayTurnos)
        }else {
          setFiveTurns(res);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
      getCurrentDate();
  }, [isLoading]);

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0'); 
    setFecha(`${year}-${month}-${day}`)
  }
  const handlePrevMonth = () => {
    setDate((prevDate) => {
      const prevMonth = prevDate.getMonth() - 1;
      return new Date(prevDate.getFullYear(), prevMonth, today);
    });
  };
  const handleNextMonth = () => {
    setDate((prevDate) => {
      const prevMonth = prevDate.getMonth() + 1;
      return new Date(prevDate.getFullYear(), prevMonth, today);
    });
  };
  const handleReset = () => {
    setDate(new Date());
  };
  const handleButtonClick = () => {
    fetch(`${url}/allturnos/${prof_id}`)
      .then((response) => response.json())
      .then((res) => {
        if (res.message) {
          let noHayTurnos = "No hay turnos para mostrar el día de hoy.";
          setPopUpSinTurnos(noHayTurnos)
        }else {
          setTurns(res);
        }
        PopUpLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        PopUpLoading(false);
      });
  };

  const handleStartTimeChange = (e) => {
    const newStartTime = e.target.value;
    setStartTime(e.target.value);
    const startHour = parseInt(newStartTime.substring(0, 2), 10);
    const endHour = startHour + 8;
    
    setEndTime(`${endHour.toString().padStart(2, '0')}:${newStartTime.substring(3)}`);
  };

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  };
  const handleEndDate = (e) => {
    const selectedEndDate = e.target.value;
    setEndDate(selectedEndDate);
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(selectedEndDate);
    const sevenDaysLater = new Date(startDateObj);
    sevenDaysLater.setDate(startDateObj.getDate() + 7);

    if (endDateObj > sevenDaysLater) {
      setError('El rango entre fechas no puede ser mayor a 7 días');
    } else {
      setError('');
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const dataDateProf = {
      "day_start": startDate,
      "day_end": endDate,
      "prof_id": prof_id
    }
    const dataHourProf = {
      "hour_start": startTime,
      "hour_end": endTime,
      "prof_id": prof_id
    }
    try {
      const resHour = await postHoursProf(dataHourProf);
      const resDate = await postDateProf(dataDateProf);
      if ((resHour.status) == 201 && (resDate.status) == 201) {
        setConfirmationVisible(false);
        setSaveBtnVisible(true)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleModalConfirm = async (e) => {
    try {
      console.log('se ejecuta el sp y se cierra el modal');
    } catch (error) {
      console.log(error);
    }
  }
  const openModal = () => {
    setConfirmationVisible(true);
    setStartDate('');
    setEndDate('');
    setStartTime('');
    setEndTime('');
  }
  return (
    <Layout>
      {
        isLoading ? (
          <Loading/>
        ): (
          <section className="container_agenda">
          <div className="calendario style_container">
            <div className="dia">
              <div className="dia_arrows_num">
                <i className="fa-solid fa-chevron-left dia_arrow" onClick={handlePrevMonth}></i>
                <p className='dia_numero bold'>
                  {today}
                </p>
                <i className="fa-solid fa-chevron-right dia_arrow" onClick={handleNextMonth}></i>
              </div>
              <p className='text-center bold dia_mes'>
                {currentMonth} - {year}
              </p>
              <button className="btn btn-outline-primary btn_reset" onClick={handleReset} type="button">Reiniciar</button>
            </div>
              <div className="calendario_completo">
                <Calendar
                  onChange={setDate} 
                  value={date} 
                  onViewChange={null}
                  prevLabel={null} 
                  nextLabel={null} 
                  next2Label={null} 
                  prev2Label={null}
                  showNavigation={null}
                  selectRange={false}
                  navegaciónAriaLabel={null}
                  navegaciónAriaLive={null}
                  navigationLabel={({ label }) => <div>{label}</div>}
                  locale={"es"}
                  //returnValue={"start"}
                  showNeighboringMonth={false}
                  minDetalle={"year"}
                  // onClickDay={handleDayClick}
                  tileDisabled={() => true}
                  tileClassName="custom-tile"
                  calendarClassName="custom-calendar"
                  />
                  <div className="container_btn_mis_horarios">
                    <i className="fa-solid fa-gear btn_mis_horarios" data-bs-toggle="modal" data-bs-target="#detalleHorario" onClick={openModal}></i>
                  </div>
              </div>
          </div>
          <div className="ult_turnos style_container">
            <div className="titulo-turnos">Turnos del dia de hoy:</div>
            <div className="turnos-hoy">
              {
                Object.keys(fiveTurns).length === 0 ? (
                  <div className="no-hay-turnos">
                    <i>{noTurns}</i>
                  </div>
                  ): (
                    <table className="table table-striped mb-0">
                      <thead className="marcosuo">
                        <tr>
                          <th className="th-table" scope="col">Nombre</th>
                          <th className="th-table" scope="col">Apellido</th>
                          <th className="th-table" scope="col">Hora</th>
                          <th className="th-table" scope="col">Tratamiento</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                            fiveTurns.map((turn, index) => (
                              <tr key={index}>
                                <td>
                                  {turn.name}
                                </td>
                                <td>{turn.last_name}</td>
                                <td>{turn.hour.slice(0, -3)}hs</td>
                                <td>{turn.treatment}</td>
                              </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  )
              }
            </div>
            <div className="box-vtodos">
              {
                fiveTurns.length >= 5 && <button className="btn-vtodos" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleButtonClick}>Ver todos</button>
              }
            </div>
          </div>
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog sin-padding modal-dialog-scrollable modal-dialog-centered">
            <div className="modal-content sin-padding">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Todos los turnos</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body box-modal">
                <table className="table table-striped mb-0">
                  <thead className="marcosuo">
                    <tr>
                      {/* <th scope="col">#</th> */}
                      <th scope="col">Nombre y apellido</th>
                      <th scope="col">Fecha</th>
                      <th scope="col">Hora</th>
                      <th scope="col">Tratamiento</th>
                    </tr>
                  </thead>
                    {
                      popUpLoading ? (
                      <p>Cargando...</p>
                      ):(
                      <tbody>
                      {
                        Object.keys(turns).length === 0 ? (
                          <div className="no-hay-turnos">
                            <i>{popUpSinTurnos}</i>
                          </div>
                          ): (
                            turns.map((turn, index) => (
                            <tr key={index}>
                              <td>
                                {turn.name}, {turn.last_name}
                              </td>
                              <td>{new Date(turn.date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                              <td>{turn.hour.slice(0, -3)}hs</td>
                              <td>{turn.treatment}</td>
                            </tr>
                            )))
                      }
                      </tbody>
                      )
                    }
                </table>
                </div>
            </div>
          </div>
          </div>
          {/* Pop Up Detalles horarios */}
          <div className="modal fade" id="detalleHorario" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Detalle Horario</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={(e) => onSubmit(e)}>
                  <div className="modal-body">
                  <p className="jornada_descipcion">(*) Solución para gestión de jornada laboral</p>
                  <div className="row g-2 container_modal_fecha">
                    <h6>Fecha:</h6>
                    <div className="col-md">
                      <div className="form-floating">
                        <input type="date" className="form-control" id="floatingInputGrid" min={fecha} max="2024-10-02" value={startDate} onChange={handleStartDate} required/>
                        <label htmlFor="floatingInputGrid">Fecha Inicio</label>
                      </div>
                    </div>
                    <div className="col-md">
                      <div className="form-floating">
                        <input type="date" className="form-control" id="floatingInputGrid" value={endDate} min={startDate} max="2024-10-02" onChange={handleEndDate} required/>
                        <label htmlFor="floatingInputGrid">Fecha Fin</label>
                      </div>
                    </div>
                    {endDate < startDate && (
                    <p className="text-danger">Fecha Fin debe ser posterior a Fecha Inicio</p>
                      )}
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                  <div className="row g-2 container_modal_fecha">
                    <h6>Hora:</h6>
                    <div className="col-md">
                      <div className="form-floating">
                        <input type="time" className="form-control" id="floatingInputGrid" list="" min="06:00" max="18:00" value={startTime} onChange={handleStartTimeChange} required/>
                        <label htmlFor="floatingInputGrid">Hora Inicio</label>
                      </div>
                    </div>
                    <div className="col-md">
                      <div className="form-floating">
                        <input type="time" className="form-control" id="floatingInputGrid" value={endTime} disabled />
                        <label htmlFor="floatingInputGrid">Hora Fin</label>
                      </div>
                    </div>
                  </div>
                  {endTime < startTime && (
                    <p className="text-danger">Hora Fin debe ser mayor que Hora Inicio</p>
                  )}
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary" /*data-bs-dismiss="modal"*/ disabled={saveBtnVisible}>Guardar</button>
                    <button type="button" className="btn btn-success" disabled={isConfirmationVisible} onClick={handleModalConfirm}>Confirmar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        )
      }
    </Layout>
  );
};
