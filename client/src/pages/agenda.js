import Calendar from "react-calendar";
import Layout from "../components/Layout";
import "../styles/agenda.css";
import "react-calendar/dist/Calendar.css"
import { useEffect, useState } from "react";
import { url } from '../api/auth';
import { selectUser } from "../redux/slices/userSlice";
import { useSelector } from "react-redux";
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
  const item = useSelector(selectUser);
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
    fetch(`${url}/calendar/${item[0].prof_id}`)
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
  }, [isLoading]);

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
    fetch(`${url}/allturnos/${item[0].prof_id}`)
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
              <button className="btn btn-outline-primary btn_reset" onClick={handleReset} type="button">Reset</button>
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
                                <td>{turn.hour}hs</td>
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
            <button className="btn-vtodos" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleButtonClick}>Ver Todos</button>
            </div>
          </div>
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog sin-padding modal-dialog-scrollable modal-dialog-centered">
            <div class="modal-content sin-padding">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Todos los turnos</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body box-modal">
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
                            {/* <th scope="row" key={turn.turn_id}>
                              {index + 1}
                                </th> */}
                              <td>
                                {turn.name}, {turn.last_name}
                              </td>
                              <td>{turn.date.slice(0, -14)}</td>
                              <td>{turn.hour}</td>
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
          
        </section>
        )
      }
    </Layout>
  );
};
