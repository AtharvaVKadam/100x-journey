import React, { useState } from "react";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  todoListState,
  todoFilterState,
  filteredTodoListState,
  todoListStatsState,
} from "./store/atoms";

function App() {
  return (
    <RecoilRoot>
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1>Recoil Todo Machine ⚡️</h1>
        <TodoListStats />
        <TodoListFilters />
        <TodoItemCreator />
        <TodoList />
      </div>
    </RecoilRoot>
  );
}

function TodoList() {
  const todoList = useRecoilValue(filteredTodoListState);

  return (
    <>
      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
}

function TodoListStats() {
  const { totalNum, totalCompletedNum, percentCompleted } = useRecoilValue(todoListStatsState);

  return (
    <div style={{ background: "#f0f0f0", padding: "10px", marginBottom: "20px", borderRadius: "5px" }}>
      <strong>Stats:</strong> Total: {totalNum} | Done: {totalCompletedNum} | 
      Progress: {percentCompleted}%
    </div>
  );
}

function TodoListFilters() {
  const [filter, setFilter] = useRecoilState(todoFilterState);

  const updateFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      Filter:
      <select value={filter} onChange={updateFilter} style={{ marginLeft: "10px" }}>
        <option value="Show All">Show All</option>
        <option value="Completed">Completed</option>
        <option value="Uncompleted">Uncompleted</option>
      </select>
    </div>
  );
}

function TodoItemCreator() {
  const [inputValue, setInputValue] = useState("");
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: Math.random(), 
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue("");
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <button onClick={addItem} style={{ marginLeft: "10px" }}>Add</button>
    </div>
  );
}

function TodoItem({ item }) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  const editItemText = ({ target: { value } }) => {
    const newList = replaceItemAtIndex(todoList, index, { ...item, text: value });
    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, { ...item, isComplete: !item.isComplete });
    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);
    setTodoList(newList);
  };

  return (
    <div style={{ marginTop: "10px", borderBottom: "1px solid #eee", paddingBottom: "5px" }}>
      <input type="checkbox" checked={item.isComplete} onChange={toggleItemCompletion} />
      <input type="text" value={item.text} onChange={editItemText} style={{ margin: "0 10px", border: "none" }} />
      <button onClick={deleteItem}>X</button>
    </div>
  );
}

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export default App;