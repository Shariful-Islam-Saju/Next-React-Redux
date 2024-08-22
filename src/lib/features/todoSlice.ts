import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {v4 as uuidv4} from 'uuid'
interface Todo {
  id: string;
  text: string;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ text: string }>) => {
      state.todos.push({ id: uuidv4(), text: action.payload.text });
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    resetTodos: (state) => {
      state.todos = [];
    },
  },
});

export const { addTodo, deleteTodo, resetTodos } = todoSlice.actions;
export default todoSlice.reducer;
