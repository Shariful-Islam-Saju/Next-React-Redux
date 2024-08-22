"use client";
import React, { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, resetTodos } from "../lib/features/todoSlice";
import { RootState } from "../lib/store";

const Home: React.FC = () => {
  const [text, setText] = useState("");
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(
        addTodo({
          text,
        })
      );
      setText("");
    }
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleResetTodos = () => {
    dispatch(resetTodos());
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-slate-400 mt-32 rounded-md" >
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className=" mb-4">
        <form className="flex justify-between" onSubmit={handleAddTodo}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className=" border min-w-72 border-gray-300 p-2 rounded mr-2"
            placeholder="Enter a todo"
          />{" "}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Todo
          </button>
        </form>
      </div>
      <ul className="list-disc pl-5">
        {todos.map((todo) => (
          <li key={todo.id} className="flex mb-4 bg-purple-300  py-2 px-4 justify-between items-center ">
            <span className="max-w-72 overflow-hidden">{todo.text}</span>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {todos.length > 0 && (
        <button
          onClick={handleResetTodos}
          className="mt-4 bg-gray-500 text-white p-2 rounded"
        >
          Reset Todos
        </button>
      )}
    </div>
  );
};

export default Home;
