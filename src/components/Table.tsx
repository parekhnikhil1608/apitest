import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Table.css';
import Pagination from 'react-bootstrap/Pagination';





interface response {
  data: any
  totalRecords: any
}
export default function Table() {
  const [apiData, setApiData] = useState<response>()
  const [pageNo, setPageNo] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(6)
  const token = localStorage.getItem("token") as string
  const [active, setActive] = useState(1); const items: any = [];
  const [totalRecords, setTotalrecords] = useState<number>(3)
  const maxPageNumbers = 5; // Maximum number of page numbers to display
  const displayPages = [];
  // Calculate the range of page numbers to display
  let startPage = Math.max(1, active - Math.floor(maxPageNumbers / 2));
  let endPage = Math.min(Math.ceil(totalRecords / pageSize), startPage + maxPageNumbers - 1);

  // Adjust the startPage if necessary to always show maxPageNumbers
  if (endPage - startPage + 1 < maxPageNumbers) {
    startPage = Math.max(1, endPage - maxPageNumbers + 1);
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {  // check userlogin or not
      // window.location.href = "/";
      axios?.get(`http://10.37.55.216:5000/api/v1/Country/Search?Page=${pageNo}&PageSize=${pageSize}`, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      })?.then((res) => {
        setApiData(res?.data)
        setTotalrecords(res.data.totalRecords)

      })
    } else {
      window.location.href = '/login'
    }
    // render first time only

  }, [])
  useEffect(() => {                 // call based on change page number
    axios?.get(`http://10.37.55.216:5000/api/v1/Country/Search?Page=${pageNo}&PageSize=${pageSize}`, {
      headers: { Authorization: `Bearer ${JSON.parse(token)}` }
    })
      ?.then((res) => {
        setApiData(res?.data)
      })
  }, [pageNo])



  const prevData = async () => {     //call this for prev btn
    setPageNo(pageNo - 1)
    setActive(pageNo - 1);
  }

  const nextData = () => {            //call this for next btn
    setPageNo(pageNo + 1)
    setActive(pageNo + 1);
  }

  const handleDelete = (id: any) => {   // handle delete btn call
    axios.delete(`http://10.37.55.216:5000/api/v1/Country?id=${id}`, {
      headers: { Authorization: `Bearer ${JSON.parse(token)}` }
    })?.then((res) => {
      axios.get(`http://10.37.55.216:5000/api/v1/Country/Search?Page=${pageNo}&PageSize=${pageSize}`, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      })?.then((res) => { setApiData(res?.data) })
    })
  }

  function alertDelete(id: number, country: string) {             // Conformation alert 
    let text = `Are you sure you want to delete Country : ${country}?`;
    if (window.confirm(text) == true) {
      handleDelete(id)
    } else {
    }
  }
  const handlePageClick = (pageNumber: any) => {
    // You can add your logic here to handle the click event
    console.log(`Clicked on page ${pageNumber}`);
    setActive(pageNumber); // Update the active page
    setPageNo(pageNumber)
  };
  console.log(totalRecords)
  for (let number: number = 1; number <= Math.ceil(totalRecords / pageSize); number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={() => handlePageClick(number)}>
        {number}
      </Pagination.Item>
    );
  }
  // Create an array of page numbers to display
  for (let number = startPage; number <= endPage; number++) {
    displayPages.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => handlePageClick(number)}
      >
        {number}
      </Pagination.Item>
    );
  }


  const totalPage = Math.ceil(apiData?.totalRecords / pageSize)  // provide the total number of Page
  const PrevDisable = pageNo == 1 ? true : false // disable previous
  const NextDisable = pageNo < totalPage ? false : true // disable next

  return (
    <div className='mainDiv'>

      <h3>Country Table</h3>
      <div className='tableMain' >
        <button onClick={prevData} disabled={PrevDisable} className='btn'>
          <img className='btn btn-suceess' src={'prev.png'} alt="my-gif" />
        </button>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>pkId</th>
              <th>Country Name</th>
              <th>Delete Controls</th>
            </tr>
          </thead>
          <tbody>
            {apiData?.data.map((d: any) => {
              return <tr className='setTr' key={d.pkId}>
                <td className='setIdDel'>{d.pkId}</td>
                <td className='setName'>{d.countryName}</td>
                <td className='setIdDel'><button onClick={() => alertDelete(d.pkId, d.countryName)} className='btn'> <img src="delete.png" alt="" /> </button></td>
              </tr>
            })}
          </tbody>
        </table>
        <button onClick={nextData} className='btn' disabled={NextDisable}>
          <img src={'next.png'} alt="my-gif" />

        </button>
      </div>

      <div className='pagination'>
        <Pagination>
          <Pagination.First onClick={() => {
            setActive(1);
            setPageNo(1);
          }} />
          <Pagination.Prev onClick={prevData} disabled={PrevDisable} />
          {startPage > 1 && <Pagination.Ellipsis />}
          {displayPages}
          {endPage < Math.ceil(totalRecords / pageSize) && <Pagination.Ellipsis />}
          <Pagination.Next onClick={nextData} disabled={NextDisable} />
          <Pagination.Last onClick={() => {
            setActive(Math.ceil(totalRecords / pageSize));
            setPageNo(Math.ceil(totalRecords / pageSize));
          }} />
        </Pagination>
      </div>


    </div>
  )
}
