import React, { useState, useEffect } from "react";
import Form from "./Form";
import "./App.css";

function App() {
  const [id, setId] = useState("");
  const [todos, setTodos] = useState([]);


  useEffect(() => {
    const lsTodos = localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : null;
    if (lsTodos) {
      setTodos(lsTodos);
    }
  }, []);

    useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const delItem = (id, data) => data.filter((item) => item.id !== id);

  const todoSubmit = (todo) => {
    setTodos([...todos, todo]);
  };

  const todoDelete = (e) => {
    if (!e.target.name) return;
    setTodos(delItem(e.target.name, todos));
  };

  const commentSubmit = (comment) => {
    if (!id) return;
    const newTodos = todos.map((item) => {
      if (item.id === id) {
        if (item.comments) {
          item.comments = [...item.comments, comment];
          return item;
        }
        item.comments = [comment];
        return item;
      }
      return item;
    });
    console.log(newTodos);
    setTodos(newTodos);
  };

  const commentDelete = (e) => {
    if (!e.target.name) return;
    const newTodos = todos.map((item) => {
      if (item.id === id) {
        item.comments = delItem(e.target.name, item.comments);
        return item;
      }
      return item;
    });
    setTodos(newTodos);
  };

  const openComents = (e) => {
    if (!e.target.id) return;
    // console.log(e.target.id);
    setId(e.target.id);
  };
  const getComments = (id) => todos.find((item) => item.id === id);
  return (
    <div className="App">
      <Form
        title={`Tasks ${todos.length}`}
        fnListener={openComents}
        data={todos}
        fnDelete={todoDelete}
        fnSubmit={todoSubmit}
      />
      <Form
        type="comments"
        id={id}
        title={`Comments ${id}`}
        // fnListener={openComents}
        data={(id && getComments(id) && (getComments(id).comments || [])) || []}
        fnDelete={commentDelete}
        fnSubmit={commentSubmit}
      />
      {/* <Comments
    data={[]}
    fnDelete={todoDelete}
    fnSubmit={todoSubmit}
    /> */}
      {/* <Comments id={id} deleteId={deleteId} calcComments={handleCalcComments} /> */}
    </div>
  );
}

export default App;
