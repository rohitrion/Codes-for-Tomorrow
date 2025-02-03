
import { useEffect, useState } from 'react';
import './App.css';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Form from './Form';

function App() {


  let [data, setdata] = useState([])

  let [loading, setloading] = useState(false)


  let [toggle, settoggle] = useState(false)


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(0);

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  async function api() {
    setloading(true)
    let apires = await fetch(' https://jsonplaceholder.typicode.com/posts')

    let res = await apires.json()
    console.log(res)
    setdata(res)
    setloading(false)

  }


  function handeldel(index) {
    let del = data.filter((item, ind) => index != ind)
    setdata(del)
  }



  const lastpaitent = currentPage * itemsPerPage;    //5
  const indexOfFirstPatient = lastpaitent - itemsPerPage;   //5-5 
  const datatoshow = data.slice(indexOfFirstPatient, lastpaitent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  useEffect(() => {
    const newTotalPages = Math.ceil(data.length / itemsPerPage);
    setTotalPages(newTotalPages);

    // Ensure the current page is within bounds
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages || 1);
    }
  }, [data, itemsPerPage, currentPage]);


  useEffect(() => {

    api()
  }, [])


  return (
    <div className="App">

      <div className="main" >
        <div className="sidebar" >
          <div className='box1'>
            <div className='inside'>
              <h4>hi redears</h4>
              <p>Here is ur news</p>
            </div>

            <div className='inside'>
              <h4>View toggle</h4>

              <div onClick={() => settoggle(!toggle)} className='btngrp'>


                <div className={toggle ? "btn1" : ""}   >📰</div>
                <div className={toggle ? "btn1" : ""}    >📃</div>
              </div>
            </div>


            <div >
              <h4>have feedback </h4>
              <p className='inside3' onClick={onOpenModal} >we are listenning ?</p>
            </div>
          </div>
        </div>

        <div className="left">

          {loading ? <h3>"still loadig....:"</h3> : null}

          <div className={toggle ? 'card' : "nocard"}>

            {
              datatoshow.map((item, index) => (

                <div className='title' >{item.id}-- {item.title.slice(1, 25)}


                  <p>{item.body.slice(1, 40)}</p>

                  <button onClick={() => handeldel(index)} >❌</button>
                </div>


              ))

            }

          </div>



        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-l-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            Previous
          </button>
          <span className="px-4 py-2">{currentPage} of {totalPages}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>


      <Modal open={open} onClose={onCloseModal} center>
        <Form setOpen={setOpen} />
      </Modal>


    </div>
  );
}

export default App;
