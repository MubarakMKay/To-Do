import NavBar from "./NavBar";
import New from "./New";
import Item from "./Item";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

function App() {
  const [ toDo, setToDo ] = useState(JSON.parse(localStorage.getItem("toDo")) || [])
  const [ newToDo, setNewToDo ] = useState(
    {
      body: '',
      id: '',
      done: false,
      reOrder: false,
      deletee: false
    }
  )
  const items = toDo.map(toDo => {
    return <Item 
              key={toDo.id}
              id={toDo.id}
              body={toDo.body} 
              done={toDo.done}
              reOrder={toDo.reOrder}
              deletee={toDo.deletee}
              handleClick={() => handleClick(toDo.id)} 
              handleDelete={(event) => handleDelete(event, toDo.id)} 
              handleChange={(event) => handleChange(event, toDo.id)}
              handleSave={() => handleSave(toDo.id)}
              showDelete={() => showDelete(toDo.id)} 
              hideDelete={() => hideDelete(toDo.id)} 
            />
  })

  function handleNew(event) {
    const {name, value } = event.target
    setNewToDo( prevToDo => ({
      ...prevToDo,
      [name]: value,
      id: nanoid(),
      done: newToDo.done,
      reOrder: newToDo.reOrder
    }))
  }

  function addToDo() {
    if (newToDo.body === '') {
      setToDo(prevToDo => [
        ...prevToDo
      ])
    } else {
      setToDo(prevToDo => [
        newToDo,
        ...prevToDo
      ])
    }
  }

  function handleClick(id) {
    setToDo(prevToDo => prevToDo.map(toDo => {
      return toDo.id === id ? {...toDo, done: !toDo.done} : toDo
    }))
  }

  function handleDelete(event, id) {
    event.stopPropagation()
    setToDo(prevToDo => prevToDo.filter(toDo => toDo.id !== id))
  }

  function handleChange(event, id) {
    const name = event.target.name
    const value = event.target.value
    setToDo(prevToDo => prevToDo.map(toDo => {
      return toDo.id === id ? {...toDo, [name]: value, reOrder: true} : toDo
    }))
  }

  function handleSave(id) {
    setToDo(prevToDo => {
      const rearrangedToDo = []
      for ( let i = 0; i < prevToDo.length; i++) {
        if (prevToDo[i].id === id) {
          rearrangedToDo.unshift({...prevToDo[i], done: false, reOrder: false, deletee: false})
        } else {
          rearrangedToDo.push(prevToDo[i])
        }
      }
      return rearrangedToDo
    })
  }

  function showDelete(id) {
    setToDo(prevToDo => prevToDo.map(toDo => {
      return toDo.id === id ? {...toDo, deletee: true} : toDo
    }))
  }

  function hideDelete(id) {
    setToDo(prevToDo => prevToDo.map(toDo => {
      return toDo.id === id ? {...toDo, deletee: false} : toDo
    }))
  }


  useEffect(() => {
    localStorage.setItem("toDo", JSON.stringify(toDo))
  }, [toDo])
  
  return (
    <div id="everything">
      <NavBar />
      <New newToDo={newToDo} handleNew={handleNew} addToDo={addToDo}/>
      { toDo.length === 0 && <h6 className="toDoEmpty">To do list is empty</h6>}
      {items}
    </div>
  )
}

export default App;
