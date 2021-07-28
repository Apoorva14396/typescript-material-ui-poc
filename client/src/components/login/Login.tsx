import { FormHelperText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MailIcon from '@material-ui/icons/Mail';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connection } from '../../lib/axiosInstance';
import { setUserInfo } from '../../redux/actions/userInfoAction';

const Login = (props: any) => {
  const history = useHistory();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorEmail, setErrorEmail] = React.useState('');
  const [errorPassword, setErrorPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const validatePassword = (password: any) => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[A-Za-z\d `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]{8,}$/;
    return re.test(String(password));
  };

  const validateLength = (str: any) => {
    return str.length > 7;
  };
  const validateLower = (str: any) => {
    const re = /[a-z]+/;
    return re.test(String(str));
  };
  const validateUpper = (str: any) => {
    const re = /[A-Z]+/;
    return re.test(String(str));
  };
  const validateNumber = (str: any) => {
    const re = /[0-9]+/;
    return re.test(String(str));
  };
  const validateSpecialChar = (str: any) => {
    const re = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return re.test(String(str));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  const handleLogin = () => {
    connection
      .post('/login', {
        email: email.toLowerCase(),
        password: password.toLowerCase()
      })
      .then((res) => {
        if (res.data) {
          if (res.data.user) {
            props.setUserInfo(res.data.user);
            toast.success(res.data.message);
            connection.defaults.headers.authorization = res.data.user.loginToken;
            localStorage.setItem('user', JSON.stringify(res.data.user));
            if (res.data.user.role === 'admin') {
              history.push('/list');
            } else {
              history.push(`/data/view/${res.data.user._id}`);
            }
          } else {
            toast.success(res.data.err.message);
          }
        }
        if (res.data.err) {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.message, 'err');
      });
  };

  const handleUserEmailChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setPassword(event.target.value);
  };

  return (
    <form autoComplete='off'>
      <Grid container direction='row' justify='center' alignItems='center' style={{ height: '450px' }}>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <h1 style={{ color: '#0761d1', display: 'flex' }}>Login</h1>
              <TextField
                required
                fullWidth
                id='email'
                type='email'
                placeholder='Email'
                margin='normal'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <MailIcon />
                    </InputAdornment>
                  )
                }}
                onChange={(event) => {
                  if (
                    event.target.value.length !== 0 &&
                    new RegExp(
                      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
                    ).test(event.target.value) === true
                  ) {
                    setEmail(event.target.value);
                    setErrorEmail('');
                  } else {
                    setErrorEmail('Please enter valid email');
                  }
                  if (event.target.value.length === 0) {
                    setErrorEmail('This field is required');
                  }
                }}
              />
              <FormHelperText
                error
                style={{
                  color: 'red',
                  fontSize: '14px'
                }}
              >
                {' '}
                {errorEmail}
              </FormHelperText>

              {email && !errorEmail && (
                <>
                  <TextField
                    required
                    fullWidth
                    id='password'
                    placeholder='Password'
                    margin='normal'
                    InputProps={{
                      type: showPassword ? 'text' : 'password',
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Icon
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </Icon>
                        </InputAdornment>
                      )
                    }}
                    onChange={(event) => {
                      if (event.target.value.length !== 0) {
                        setPassword(event.target.value);
                        setErrorPassword('');
                      } else {
                        setErrorPassword('This field is required');
                      }
                    }}
                  />
                  <FormHelperText
                    style={{
                      color: 'red',
                      fontSize: '14px'
                    }}
                    error
                  >
                    {' '}
                    {errorPassword}
                  </FormHelperText>
                  {password && !validatePassword(password) && (
                    <ul
                      style={{
                        color: 'red',
                        paddingLeft: '10px',
                        fontSize: '14px'
                      }}
                    >
                      {!validateLength(password) && <li>The password must be 8 digits in length.</li>}
                      {!validateLower(password) && <li>The password must have a lowercase character.</li>}
                      {!validateUpper(password) && <li>The password must have a uppercase character.</li>}
                      {!validateNumber(password) && <li>The password must have a number.</li>}
                      {!validateSpecialChar(password) && <li>The password must have a special character.</li>}
                    </ul>
                  )}
                </>
              )}
            </CardContent>
            <CardActions>
              {email !== '' &&
                password !== '' &&
                !errorPassword &&
                !errorEmail &&
                validateLength(password) &&
                validateLower(password) &&
                validateUpper(password) &&
                validateNumber(password) &&
                validateSpecialChar(password) && (
                  <Button variant='contained' size='large' color='primary' onClick={handleLogin}>
                    Login
                  </Button>
                )}
              <Button
                style={{ float: 'right' }}
                variant='contained'
                size='large'
                color='secondary'
                onClick={() => {
                  history.push('/');
                }}
              >
                Cancel
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
};

const mapDispatchToProps = {
  setUserInfo: setUserInfo
};

export default connect(null, mapDispatchToProps)(Login);
