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
  return (
    <Layout>
        <section className="container_agenda">
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
                onViewChange={null}
                prevLabel={null} 
                nextLabel={null} 
                next2Label={null} 
                prev2Label={null}
                showNavigation={null}
                selectRange={false}
                navegaciónAriaLabel={null}
                navegaciónAriaLive={null}
                navigationLabel={null}
                locale={"es"}
                returnValue={"start"}
                showNeighboringMonth={false}
                minDetalle={"year"}
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
