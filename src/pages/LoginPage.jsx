import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { login, checkPermission } from '../api/auth';
import Swal from 'sweetalert2';
import { useAuth } from 'contexts/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  const handleClick = async () => {
    if (username.length === 0 || password.length === 0) {
      alert('請輸入帳號或密碼');
      return;
    }

    // const { success, authToken } = await login({
    //   username,
    //   password,
    // });

    const success = await login({
      username,
      password,
    });

    if (success) {
      // localStorage.setItem('authToken', authToken);
      Swal.fire({
        title: '登入成功!',
        icon: 'success',
        showConfirmButton: false,
        position: 'top',
        timer: 1000,
      });
      // navigate('/todos');
    } else {
      Swal.fire({
        title: '登入失敗!',
        icon: 'error',
        showConfirmButton: false,
        position: 'top',
        timer: 1000,
      });
    }
  };

  // 驗證是否是登入狀態
  // useEffect(() => {
  //   const checkTokenIsValid = async () => {
  //     const authToken = localStorage.getItem('authToken');
  //     if (!authToken) {
  //       return;
  //     }
  //     const result = await checkPermission(authToken);
  //     if (result) {
  //       navigate('/todos');
  //     }
  //   };

  //   checkTokenIsValid();
  // }, [navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todos');
    }
  }, [navigate, isAuthenticated]);

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>登入 Todo</h1>

      <AuthInputContainer>
        <AuthInput
          label="帳號"
          placeholder="請輸入帳號"
          value={username}
          onChange={(nameInputValue) => setUsername(nameInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          type="password"
          label="密碼"
          placeholder="請輸入密碼"
          value={password}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>登入</AuthButton>
      <Link to="/signup">
        <AuthLinkText>註冊</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;
