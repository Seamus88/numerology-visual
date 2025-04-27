
"use client";
import { Hepta_Slab, Ruge_Boogie } from "next/font/google";
import React, { useState } from "react";


export default function Home() {
  const [dates, setDates] = useState({fromDate: "", toDate: "", dateArray: [], show: false});
  
  function makeTable() {
    const fromDate = new Date(dates.fromDate);
    const toDate = new Date(dates.toDate);
    const datesArrayTemp = [];
    let holdYear = 0;
    let holdMonth = 0;
    
    if (!dates.fromDate || !dates.toDate) {
      alert("Please select both dates.");
      return;
    } else if (fromDate > toDate) {
      alert("Please select choices in chronological order.");
      return;
    } 
    
    for (let i = fromDate; i <= toDate; i.setDate(i.getDate() + 1)) {
      const year = i.getFullYear();
      const month = i.getMonth() + 1;

      if (holdYear !== year && holdMonth !== month) {
        holdYear = year;
        holdMonth = month;
        datesArrayTemp.push([0, 0]);
        datesArrayTemp.push([year, month]);
      } else if (holdYear === year && holdMonth !== month) {
        holdMonth = month;
        datesArrayTemp.push([year, month]);
      } else if (holdYear === year && holdMonth === month) {
        continue;
      }
    }

    setDates((prevState) => ({
      ...prevState,
      dateArray: [...datesArrayTemp],
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
  const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-600">
        <thead>
          <tr>
            <th className="border border-gray-600 p-2" colSpan="33">{dates.fromDate} to {dates.toDate}</th>
          </tr>
          <tr>
            <th className="border border-gray-600 p-2">Year</th>
            <th className="border border-gray-600 p-2">Month</th>
            {days.map((day) => (
              <th key={day} className="border border-gray-600 p-2">{day}</th>
            ))}
          </tr>
        </thead>
        <TBody dateArray={dates.dateArray} />
      </table>
    </div>
  );
}

function TBody({dateArray}) {
  const datesToMonths = {"0": 31, "1": 31, "2": 28, "3": 31, "4": 30, "5": 31, "6": 30, "7": 31, "8": 31, "9": 30, "10": 31, "11": 30, "12": 31};  

  return (
    <tbody>
      {dateArray.map((yearAndMonth, index) => {
        return (
          <TR key={index} date={yearAndMonth} datesToMonths={datesToMonths[yearAndMonth[1].toString()]} />
        )
      })}
    
    </tbody>
  )
}

function TR({date, datesToMonths}) {
  const daysInMonth = [];
  for(let i = 1; i <= datesToMonths; i++) {
    daysInMonth.push(i);
  }
  

  return (
    <tr>
      {date[0] === 0? <td className="border border-gray-600">Year</td> : <td className="border border-gray-600 p-2">{date[0]}</td>}
      {date[1] === 0? <td className="border border-gray-600">Month</td> : <td className="border border-gray-600 p-2">{date[1]}</td>}
      {daysInMonth.map((day) => {
        return (
          <TD key={day} year={date[0]} month={date[1]} day={day} />
        )
      })}
    </tr>
  )
}

function TD({year,month,day}) {
  if (year === 0) {
    return (
      <td className="border border-gray-600 p-2">{day}</td>
    )
  }
  let yearReduced = year.toString().split("");
  yearReduced = yearReduced.map((num) => {
    return parseInt(num);
  }); 
  const llNumber = yearReduced[0] + yearReduced[1] + yearReduced[2] + yearReduced[3] + month + day;
  let llNumberReduced = llNumber.toString().split("");
  llNumberReduced = llNumberReduced.map((num) => {
    return parseInt(num);
  });
  while (llNumberReduced.length > 1) {
    let sum = 0;
    llNumberReduced.forEach((num) => {
      sum += num;
    });
    llNumberReduced = sum.toString().split("");
    llNumberReduced = llNumberReduced.map((num) => {
      return parseInt(num);
    });
  }
  const llNumbRed = llNumberReduced[0];
  return (
    <td className="border border-gray-600 p-2" style={{backgroundColor: "hsl("+llNumber+", "+(llNumbRed*10)+"%, 50%)"}}>{llNumber}/{llNumbRed}</td>
  )
}  