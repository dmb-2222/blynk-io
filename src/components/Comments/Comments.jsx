import React, { useState } from "react";
import style from "./Comments.module.css";


const INITIAL_VALUE = { text: "", id: "" };

const Comments = ({ id, deleteId, calcComments }) => {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState(INITIAL_VALUE);

  const set = { setValue };

  const handleChange = ({ target }) => {
    set[target.name]({ text: target.value, id: id });
  };

  const handleSubmite = (e) => {
    e.preventDefault();
    setItems((items) => [...items, value]);
    setValue(INITIAL_VALUE);
  };
  if (items.length > 0) {
    const sumComments = items.reduce((acc, el) => {
      acc[el.id] = (acc[el.id] || 0) + 1;
      return acc;
    }, {});
    calcComments(sumComments, items.length);
  }

  const resault = deleteId
    ? items.filter((item) => item.id !== deleteId && item.id === id)
    : items.filter((item) => item.id === id);

  return (
    <div className={style.comments}>
      <h1>Comments # {id} </h1>
      <form onSubmit={handleSubmite}>
        <input
          type="text"
          name="setValue"
          placeholder="Type task here..."
          value={value.text}
          required
          onChange={handleChange}
        />
        {id && <button type="submit">Add</button>}
      </form>
      {resault.length !== 0 &&
        resault.map((item, index) => (
          <div className={style.comment} key={index}>
            <p>{item.text}</p>
          </div>
        ))}
    </div>
  );
};
export default Comments;
