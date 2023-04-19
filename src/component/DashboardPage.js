import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  TableBody,
  Paper,
  Table,
  Typography,
} from "@material-ui/core";
import { Edit, Delete, AddCircleOutline } from "@material-ui/icons";

function DashboardPage() {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [deleteTodo, setDeleteTodo] = useState(null);
  const [createTodo, setCreateTodo] = useState(false);

  const jwt = localStorage.getItem("jwtToken");
  let isLoggedIn = false;

  if (jwt) {
    isLoggedIn = true;
  }
  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todos", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setTodos(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      fetchTodos();
    }
  }, [jwt, isLoggedIn]);

  const handleEditTodo = (todo) => {
    setEditTodo(todo);
  };

  const handleDeleteTodo = (todo) => {
    setDeleteTodo(todo);
  };
  const handleCreateTodoSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/todos/`,
        {
          title: createTodo.title,
          completed: createTodo.completed,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === createTodo.id ? { ...todo, ...response.data } : todo
        )
      );
      setCreateTodo(null);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditTodoSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/todos/${editTodo.id}`,
        {
          title: editTodo.title,
          completed: editTodo.completed,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === editTodo.id ? { ...todo, ...response.data } : todo
        )
      );
      setEditTodo(null);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTodoSubmit = async () => {
    try {
      await axios.delete(`http://localhost:5000/todos/${deleteTodo.id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== deleteTodo.id)
      );
      setDeleteTodo(null);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <Typography variant="body1" style={{ float: "right" }}>
            Create Todo
            <IconButton color="primary" onClick={() => setCreateTodo(true)}>
              <AddCircleOutline />
            </IconButton>
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr.</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Completed</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todos.map((todo, index) => (
                  <TableRow key={todo.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{todo.title}</TableCell>
                    <TableCell>{todo.completed ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditTodo(todo)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeleteTodo(todo)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog open={Boolean(editTodo)} onClose={() => setEditTodo(null)}>
            <DialogTitle>Edit Todo</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Title"
                value={editTodo?.title}
                onChange={(e) =>
                  setEditTodo((prevTodo) => ({
                    ...prevTodo,
                    title: e.target.value,
                  }))
                }
                fullWidth
              />
              <TextField
                margin="dense"
                label="Completed"
                select
                value={editTodo?.completed ? "Yes" : "No"}
                onChange={(e) =>
                  setEditTodo((prevTodo) => ({
                    ...prevTodo,
                    completed: e.target.value === "Yes" ? true : false,
                  }))
                }
                fullWidth
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditTodo(null)}>Cancel</Button>
              <Button color="primary" onClick={handleEditTodoSubmit}>
                Save
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={Boolean(createTodo)}
            onClose={() => setCreateTodo(null)}
          >
            <DialogTitle>Create Todo</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Title"
                value={createTodo?.title}
                onChange={(e) =>
                  setCreateTodo((prevTodo) => ({
                    ...prevTodo,
                    title: e.target.value,
                  }))
                }
                fullWidth
              />
              <TextField
                margin="dense"
                label="Completed"
                select
                value={createTodo?.completed ? "Yes" : "No"}
                onChange={(e) =>
                  setCreateTodo((prevTodo) => ({
                    ...prevTodo,
                    completed: e.target.value === "Yes" ? true : false,
                  }))
                }
                fullWidth
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setCreateTodo(null)}>Cancel</Button>
              <Button color="primary" onClick={handleCreateTodoSubmit}>
                Save
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={Boolean(deleteTodo)}
            onClose={() => setDeleteTodo(null)}
          >
            <DialogTitle>Delete Todo</DialogTitle>
            <DialogContent>
              <p>Are you sure you want to delete "{deleteTodo?.title}"?</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteTodo(null)}>Cancel</Button>
              <Button color="secondary" onClick={handleDeleteTodoSubmit}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <h1>Please login first!</h1>
      )}
    </div>
  );
}

export default DashboardPage;
