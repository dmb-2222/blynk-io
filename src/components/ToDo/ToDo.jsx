import React, { useState, useEffect } from "react";
import style from "./ToDo.module.css";
const uniqid = require("uniqid");

const INITIAL_VALUE = { text: "", id: "", counter: 0 };

const ToDo = ({ getId, handleDeleteId, sumComments }) => {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState(INITIAL_VALUE);


  let res = [];
  if (sumComments) {
    for (let key in sumComments) {
      console.log("Ключ", key, "Значение", sumComments[key]);
      res = items.reduce((acc, el, index) => {
        acc.push(el);
        if (el.id === key) {
          acc[index].counter = sumComments[key];
          el.counter = sumComments[key];
        }
        return acc;
      }, []);
    }
    console.log("items", items, "res", res);
    // setItems((res)=>[...res]);
  }
  // useEffect(() => {
  //   if (res.length > 0) {
  //     setItems(res);
  //   }
  // }, [res]);

  const set = { setValue };

  const handleChange = ({ target }) => {
    set[target.name]({ text: target.value, id: uniqid() });
  };

  const handleSubmite = (e) => {
    e.preventDefault();
    setItems((items) => [...items, { ...value, counter: 0 }]);
    setValue(INITIAL_VALUE);
  };

  const handleDelete = (id) => {
    const deleteResult = items.filter((item) => item.id !== id);
    setItems(deleteResult);
    handleDeleteId(id);
  };

  return (
    <div className={style.todo}>
      <h1>Items</h1>
      <form onSubmit={handleSubmite}>
        <input
          type="text"
          name="setValue"
          placeholder="Type task here..."
          value={value.text}
          required
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
      {items.length !== 0 &&
        items.map((item, index) => (
          <div
            className={style.task}
            key={index}
            onClick={() => getId(item.id)}
          >
            <p>{item.text}</p>
            <div>
              <span>{item.counter}</span>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))}
    </div>
  );
};
export default ToDo;
