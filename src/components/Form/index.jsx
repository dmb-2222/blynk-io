import React, { useState} from "react";
import style from "./ToDo.module.css";
const uniqid = require("uniqid");

const ToDo = ({ id, title, data, type, fnDelete, fnSubmit, fnListener }) => {
  const [text, setText] = useState("");

  const handleChange = ({ target }) => {
    setText(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "comments" && !id) return;
    if (text.length < 1) return;
    fnSubmit({ text, id: uniqid() });
    setText("");
  };

  return (
    <div className={style.todo} onClick={fnListener}>
      <h1>{title}</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type task here..."
          value={text}
          required
          onChange={handleChange}
        />
        {type === "comments" && !id ? "" : <button type="submit">Add</button>}
      </form>
      {data.length ? (
        data.map((item) => (
          <div className={style.task} key={item.id} id={item.id}>
            <p>{item.text}</p>
            <div>
              <span>{(item.comments && item.comments.length) || 0}</span>
              <button name={item.id} onClick={fnDelete}>
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className={style.task}>
          <p>Nothing to show</p>
        </div>
      )}
    </div>
  );
};
export default ToDo;
