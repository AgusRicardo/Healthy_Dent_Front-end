import Calendar from "react-calendar";
import Layout from "../components/Layout";
import "../styles/agenda.css";
import "react-calendar/dist/Calendar.css"
import { useEffect, useState } from "react";

export const Agenda = () => {
  const [date, setDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState('');
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

  return (
    <Layout>
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
            Turnos del día de hoy:
          </div>
        </section>
    </Layout>
  );
};
