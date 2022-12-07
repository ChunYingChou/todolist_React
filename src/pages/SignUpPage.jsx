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
// import { register, checkPermission } from 'api/auth';
import Swal from 'sweetalert2';
import { useAuth } from 'contexts/AuthContext';


const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
 
  const navigate = useNavigate();

   const { register, isAuthenticated } = useAuth();

  const handleClick = async () => {
    if (username.length === 0 || email.length === 0 || password.length === 0) {
      alert('請輸入帳號或密碼以及email');
      return;
    }

    // const { success, authToken } = await register({
    //   username,
    //   email,
    //   password,
    // });

    const success = await register({
      username,
      email,
      password,
    });

    if (success) {
      // localStorage.setItem('authToken', authToken);
      Swal.fire({
        title: '註冊成功!',
        icon: 'success',
        showConfirmButton: false,
        position: 'top',
        timer: 1000,
      });
      // navigate('/todos');
      return;
    }
    Swal.fire({
      title: '註冊失敗!',
      icon: 'error',
      showConfirmButton: false,
      position: 'top',
      timer: 1000,
    });
  };

  // 驗證是否是登入狀態
  //  useEffect(() => {
  //    const checkTokenIsValid = async () => {
  //      const authToken = localStorage.getItem('authToken');
  //      if (!authToken) {
  //        return;
  //      }
  //      const result = await checkPermission(authToken);
  //      if (result) {
  //        navigate('/todos');
  //      }
  //    };
  //    checkTokenIsValid();
  //  }, [navigate]);

  useEffect(() => {
    if(isAuthenticated) {
      navigate('/todos')
    }
  },[navigate, isAuthenticated])

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>建立您的帳號</h1>
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
          label="Email"
          placeholder="請輸入email"
          value={email}
          onChange={(emailInputValue) => setEmail(emailInputValue)}
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
      <AuthButton onClick={handleClick}>註冊</AuthButton>
      <Link to="/login">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
