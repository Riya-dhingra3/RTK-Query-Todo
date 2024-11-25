import React, { useEffect, useState } from "react";
import { useAddTodoMutation, useGetAllTodosQuery, useLazyGetTodoQuery } from "./store/apiSlice";
import { useDeleteTodoMutation } from "./store/deleteApiSlice";

const App = () => {
  const queryObj = useGetAllTodosQuery();
  const { data, isLoading, error ,refetch} = queryObj;
  const [trigger, result] = useLazyGetTodoQuery();
  const [deleteTodoFn , deleteResult] = useDeleteTodoMutation();
  // console.log(mutation);
  const [addTodo]=useAddTodoMutation();  


  console.log(result.isError);
  console.log(result.error)
  const [enteredTodo,setEnteredTodo]=useState("");
  const [activeTaskId, setActiveTaskId] = useState(null); // Track active task status

  // useEffect(()=>{
  //   if(deleteResult.isSuccess){
  //   alert("Todo deleted")
  // }},[deleteResult.isSuccess])
  const handleGetStatus = (id) => {
    setActiveTaskId(id); // Set active task ID
    trigger(id);
  };

  const getStatus = (isCompleted) => {
    return isCompleted ? "Completed" : "Pending";
  };

  const handleDelete=(id)=>{
    deleteTodoFn(id)
    // fetch('https://dummyjson.com/todos/1', {
    //   method: 'DELETE',
    // })
    // .then(res => res.json())
    // .then(console.log);
  }

  function handleInputchange(event){
    setEnteredTodo(event.target.value);
  }

  function handleAddTodo() {
    addTodo({
      completed: false,
      userId: 123,
      todo: enteredTodo,
    })
    // This is not the best way.
    // Reverts the last action or promise in prevous state
      // .unwrap()
      // .then((result) => {
      //   console.log('Todo added:', result);
      //   setEnteredTodo('');
      //   refetch();
      // })
      // .catch((error) => {
      //   console.error('Error adding todo:', error);
      // });
  }

  // function handleAddTodo() {
  //   fetch('https://dummyjson.com/todos/add', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       completed: false,
  //       userId: 123,
  //       todo: enteredTodo,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log('Todo added:', data);
  //       setEnteredTodo('');
  //     })
  //     .catch((error) => {
  //       console.error('Error adding todo:', error);
  //     });
  // }
  


  if (isLoading) {
    return (
      <div style={styles.container}>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <h1>Error occurred while fetching todos.</h1>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Todo List</h1>
      <div>
        <input onChange={handleInputchange} value={enteredTodo} placeholder="Enter Todo.." type="text"></input>
        <button onClick={handleAddTodo}>Add todo</button>
      </div>
      <ul style={styles.todoList}>
        {data?.map((todo) => (
          <li key={todo.id} style={styles.todoItem}>
            <span
              style={{
                ...styles.taskName,
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.todo}
            </span>
            <button onClick={()=>handleDelete(todo.id)}>Delete</button>
            <button onClick={() => handleGetStatus(todo.id)}>Check Status</button>
            {activeTaskId === todo.id && result?.isLoading && <span>Loading status...</span>}
            {activeTaskId === todo.id && result?.data && (
              <span>{getStatus(result.data.completed)}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  todoList: {
    listStyle: "none",
    padding: 0,
    marginTop: "20px",
  },
  todoItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  taskName: {
    cursor: "pointer",
  },
};

export default App;
