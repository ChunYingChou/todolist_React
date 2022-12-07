import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useState, useEffect } from 'react';
import { getTodos, createTodo, patchTodo, deleteTodo } from 'api/todos';
import { useNavigate } from 'react-router-dom';
// import { checkPermission } from 'api/auth';
import { useAuth } from 'contexts/AuthContext';

// const dummyTodos = [
//   {
//     title: 'Learn react-router',
//     isDone: true,
//     id: 1,
//   },
//   {
//     title: 'Learn to create custom hooks',
//     isDone: false,
//     id: 2,
//   },
//   {
//     title: 'Learn to use context',
//     isDone: true,
//     id: 3,
//   },
//   {
//     title: 'Learn to implement auth',
//     isDone: false,
//     id: 4,
//   },
// ];

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  // const [amount, setAmount] = useState(todos.length);
  const amount = todos.length;

  const navigate = useNavigate();

  const { isAuthenticated,currentMember } = useAuth()

  const handleChange = (value) => {
    setInputValue(value);
  };

  const handleAddTodo = async () => {
    if (inputValue.length === 0) {
      return;
    }

    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });

      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false,
          },
        ];
      });
      setInputValue('');
      // setAmount(amount + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = async () => {
    if (inputValue.length === 0) {
      return;
    }
    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });

      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false,
          },
        ];
      });
      setInputValue('');
      // setAmount(amount + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleDone = async (id) => {
    const currentTodo = todos.find((todo) => todo.id === id);
    try {
      await patchTodo({
        id,
        isDone: !currentTodo.isDone,
      });
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              isDone: !todo.isDone,
            };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChageMode = ({ id, isEdit }) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isEdit,
          };
        }
        return { ...todo, isEdit: false };
      });
    });
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== id);
      });
      // setAmount(amount - 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async ({ id, title }) => {
    try {
      await patchTodo({
        id,
        title,
      });
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              title,
              isEdit: false,
            };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getTodosAsync = async () => {
      try {
        const todos = await getTodos();
        setTodos(todos.map((todo) => ({ ...todo, isEdit: false })));
      } catch (error) {
        console.error(error);
      }
    };
    getTodosAsync();
  }, []);

  // 驗證是否是登入狀態
  // useEffect(() => {
  //   const checkTokenIsValid = async () => {
  //     const authToken = localStorage.getItem('authToken');
  //     if (!authToken) {
  //       navigate('/login');
  //     }
  //     const result = await checkPermission(authToken);
  //     if (!result) {
  //       navigate('/login');
  //     }
  //   };
  //   checkTokenIsValid();
  // }, [navigate]);

  useEffect(() => {
    if(!isAuthenticated) {
      navigate('/login')
    }
  },[navigate, isAuthenticated])

  return (
    <div>
      TodoPage
      <Header username={currentMember?.name} />
      <TodoInput
        inputValue={inputValue}
        onChange={handleChange}
        onAddTodo={handleAddTodo}
        onKeyDown={handleKeyDown}
      />
      <TodoCollection
        todos={todos}
        onToggleDone={handleToggleDone}
        onChangeMode={handleChageMode}
        onDelete={handleDeleteTodo}
        onSave={handleSave}
      />
      <Footer amount={amount} />
    </div>
  );
};

export default TodoPage;
