
"use client";
import React, { useState } from "react";


export default function Home() {
  const [dates, setDates] = useState({fromDate: 0, toDate: 0, dateArray: [], show: false});
  
  function makeTable() {
    const fromDate = new Date(dates.fromDate);
    const toDate = new Date(dates.toDate);

    if (!dates.fromDate || !dates.toDate) {
      alert("Please select both dates.");
      return;
    } else if (fromDate > toDate) {
      alert("The 'From Date' must be before the 'To Date'.");
      return;
    } else if (fromDate - toDate > 600) {
      alert("The date range is too large. Please select a smaller range.");
      return;
    }


    const dateArray = [];
    for (let i = fromDate; i <= toDate; i.setDate(i.getDate() + 1)) {
      dateArray.push(new Date(i));
    }
    console.log(dateArray)
    setDates((prevState) => ({
      ...prevState,
      show: !prevState.show,
    }));
  }
  

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start"> 
        <h1 className="text-4xl font-bold text-center">Numerology Visualizer</h1>        
        <div id="datesInput" className="flex flex-row nowrap justify-evenly gap-5">
            <div className="flex flex-col gap-4">
              <label htmlFor="birthday">From Date</label>
              <input
                type="date"
                id="fromDate"
                name="fromDate"
                className="p-2 border border-gray-300 rounded-md"
                onChange={(e) => setDates((prevState) => ({
                  fromDate: e.target.value,
                  toDate: prevState.toDate,
                  dateArray: [],
                  show: false}))}/>
              </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="birthday">To Date</label>
              <input
                type="date"
                id="toDate"
                name="toDate"
                className="p-2 border border-gray-300 rounded-md"
                onChange={(e) => setDates((prevState) => ({
                  fromDate: prevState.fromDate,
                  toDate: e.target.value,
                  dateArray: [],
                  show: false}))}/>
            </div>
        </div>
        <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out" onClick={() => makeTable()}>Toggle Table</button>
        <div className="flex flex-col gap-4">
          {dates.show ? <CreateTable dates={dates} /> : <p className="text-center">No dates selected.</p>}
        
        </div>
      
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}

function CreateTable({dates}) {
  const monthsAndDays = {"January": 31, "February": 28, "March": 31, "April": 30, "May": 31, "June": 30, "July": 31, "August": 31, "September": 30, "October": 31, "November": 30, "December": 31};
  const monthNames = Object.keys(monthsAndDays);
  const monthDays = [1,2,3,4,5,5,6,7,8,9,10,11,12, 13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  const datesArray = [];
  


  function calculateLifeLesson(date) {
    const dateArray = date.split("-");
    const year = dateArray[0].split("");
    let yearSum = 0;
    year.forEach((num) => yearSum += parseInt(num));
    const month = parseInt(dateArray[1]);
    const day = parseInt(dateArray[2]);
    return yearSum + month + day;   
  }
  
  return (
  <div className="flex flex-col gap-4 justify-center  items-center">
      <h1 className="p-2">{dates.fromDate} - {dates.toDate}</h1>
      <table className="border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2" colSpan="1"></th>
            <th className="border border-gray-300 p-2" colSpan="32">Days</th>
          </tr>
          <tr>
            <th className="border border-gray-300 p-2">Month</th>
            {monthDays.map((day, index) => <th key={index} className="border-gray-300 p-2">{day}</th>)}
          </tr>
        </thead>
        <tbody>
            
        </tbody>
      </table>
    </div>

  )
}
