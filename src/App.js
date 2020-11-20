import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

const App = () => {

  const [listItems, addListItems] = useState([
    { id: 0, quantity: 1, text: 'ogórek', isDone: false },
    { id: 1, quantity: 4, text: 'Mars', isDone: false },
    { id: 2, quantity: 1, text: 'ser', isDone: false },
  ])

  const [inputValue, addInputValue] = useState('')
  const [inputEmpty, addInputEmpty] = useState(false)

  const handleInputValueOnChange = (e) => {
    const value = e.target.value
    addInputValue(value)
  }

  const handleAddToList = () => {

    if (inputValue !== '') {
      const Item = {
        id: listItems.length,
        quantity: 1,
        text: inputValue,
        isDone: false,
      }
      console.log(Item)
      console.log(listItems)
      const newItems = [...listItems, Item]
      addListItems(newItems)
      addInputValue('')
      addInputEmpty(false)
    }

    else {
      addInputEmpty(true)
    }
  }

  const handleDeleteItem = (id) => {
    let listItemsCopy = [...listItems]

    let newlListItems = listItemsCopy.filter(item => item.id !== id)
    addListItems(newlListItems)
  }

  const handleQuantityPlus = (index) => {
    const newItems = [...listItems]

    newItems[index].quantity++
    addListItems(newItems)
  }

  const handleQuantityMinus = (index) => {
    const newItems = [...listItems]

    if (newItems[index].quantity > 1) {
      console.log(newItems[index].quantity)
      newItems[index].quantity--
      addListItems(newItems)
    }
  }

  const handleDone = (id) => {
    const newItems = [...listItems]
    newItems[id].isDone = !newItems[id].isDone
    addListItems(newItems)
  }


  return (
    <div className="app">
      <div className="addtolist">
        <div className="add-el">
          <input type='text' maxlength="20" value={inputValue} onChange={handleInputValueOnChange} placeholder={inputEmpty ? 'Write first, then add!' : "Write something!"}></input>
          <button onClick={handleAddToList} className="add-el-btn"><FontAwesomeIcon icon={faPlus} /></button>
        </div>
      </div>
      <div className="applist">
        {listItems.map(listItem => (
          <div className="el-cnt">
            <div className="task-text">
              <p className={listItem.isDone ? 'done' : 'notdone'} onClick={() => handleDone(listItem.id)} key={listItem.id}>{listItem.text}</p>
            </div>
            <div className="inc-dec-btn">
              <FontAwesomeIcon onClick={() => handleQuantityMinus(listItem.id)} className="icon-btn" icon={faChevronLeft} />
              <p>{listItem.quantity}</p>
              <FontAwesomeIcon onClick={() => handleQuantityPlus(listItem.id)} className="icon-btn" icon={faChevronRight} />
              <button className="del-btn" onClick={() => handleDeleteItem(listItem.id)}><FontAwesomeIcon icon={faTimes} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
