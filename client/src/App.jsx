import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [array, setArray] = useState([])
  const [task, setTask] = useState('')

  useEffect(() => {
    const taskList = JSON.parse(localStorage.getItem('list'))
    if (taskList) {
      setArray(taskList)
    }
  }, [])

  const setList = (task) => {
    if (task) {
      setArray([...array, { task: task, complite: false }])
      localStorage.setItem('list', JSON.stringify([...array, { task: task, complite: false }]))
    }
  }

  const updateList = (index, value) => {
    const updateArray = array.map((item, i) =>
      i == index ? { ...item, task: value } : item
    )
    setArray(updateArray);
    localStorage.setItem('list', JSON.stringify(updateArray))
  }

  const complite = (index) => {
    const updateArray = array.map((item, i) =>
      i == index ? { ...item, complite: true } : item
    )
    setArray(updateArray)
    localStorage.setItem('list', JSON.stringify(updateArray))
  }

  const deleteTask = (i) => {
    const newArray = array.filter((a, index) => {
      return index !== i
    })
    console.log(newArray);
    setArray(newArray)
    localStorage.setItem('list', JSON.stringify(newArray))
  }

  return (
    <>
      <div className="inputTask">
        <input
          type="text"
          placeholder='Введите задачу'
          value={task}
          onChange={(a) => setTask(a.target.value)} />
        <button
          onClick={() => {
            setList(task);
            setTask('')
          }}
          className='btnAdd'>Добавить задание</button>
      </div>
      <div className="list">
        {
          array.map((e, index) => (
            <div className="taskBox" key={index}>
              <input className={"task " + (e.complite ? "line" : "text")}
                onChange={(a) => updateList(index, a.target.value)}
                value={e.task} />
              <div className="btns">
                <button
                  onClick={() => complite(index)}
                  className='btnDone'>выполнено</button>
                <button
                  onClick={() => deleteTask(index)}
                  className='btnDelete'>удалить</button>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
