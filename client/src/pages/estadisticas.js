import Calendar from "react-calendar";
import Layout from "../components/Layout";
import "../styles/estadisticas.css";
import "react-calendar/dist/Calendar.css"
import { useEffect, useState } from "react";

export const Estadisticas = () => {
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
  return (
    <Layout>
        <section className="container_estadisticas">
          <div className="calendario style_container">
            <div className="dia">
              <p className='dia_numero bold'>
                {today}
              </p>
              <p className='text-center bold'>
                {currentMonth} - {year}
                </p>
            </div>
            <div className="calendario_completo">
                <Calendar
                onChange={setDate} 
                value={date} 
                prevLabel={null} 
                nextLabel={null} 
                next2Label={null} 
                prev2Label={null}
                showNavigation={null}
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
