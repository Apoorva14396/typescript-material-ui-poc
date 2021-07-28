import { FormHelperText, InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DescriptionIcon from '@material-ui/icons/Description';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connection } from '../../lib/axiosInstance';

const Register = () => {
  const history = useHistory();

  const [firstName, setFirstName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [image, setImage] = React.useState('');
  const [errorName, setErrorName] = React.useState('');
  const [errorAddress, setErrorAddress] = React.useState('');
  const [errorEmail, setErrorEmail] = React.useState('');
  const [errorPhone, setErrorPhone] = React.useState('');
  const [errorPassword, setErrorPassword] = React.useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = React.useState('');
  const [errorDescription, setErrorDescription] = React.useState('');
  const [errorImage, setErrorImage] = React.useState('');
  const [errorGender, setErrorGender] = React.useState('');
  const [errorDepartment, setErrorDepartment] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [gender, setGender] = React.useState('female');
  const [department, setDepartment] = React.useState('');

  const handleGender = (event: any) => {
    setGender(event.target.value);
  };

  const handleRegister = () => {
    if (firstName === '') {
      setErrorName('This field is required');
    }
    if (email === '') {
      setErrorEmail('This field is required');
    }
    if (address === '') {
      setErrorAddress('This field is required');
    }
    if (phone === '') {
      setErrorPhone('This field is required');
    }
    if (password === '') {
      setErrorPassword('This field is required');
    }
    if (confirmPassword === '') {
      setErrorConfirmPassword('This field is required');
    }
    if (description === '') {
      setErrorDescription('This field is required');
    }
    if (gender === '') {
      setErrorGender('This field is required');
    }
    if (department === '') {
      setErrorDepartment('This field is required');
    }
    if (
      firstName !== '' &&
      email !== '' &&
      address !== '' &&
      phone !== '' &&
      password !== '' &&
      description !== '' &&
      confirmPassword !== '' &&
      image !== '' &&
      gender !== '' &&
      department !== '' &&
      errorName === '' &&
      errorAddress === '' &&
      errorEmail === '' &&
      errorPhone === '' &&
      errorPassword === '' &&
      errorDescription === '' &&
      errorConfirmPassword === '' &&
      errorImage === '' &&
      errorGender === '' &&
      errorDepartment === ''
    ) {
      let formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('password', password.toLowerCase());
      formData.append('confirmPassword', confirmPassword.toLowerCase());
      formData.append('phone', phone);
      formData.append('address', address);
      formData.append('description', description);
      formData.append('gender', gender);
      formData.append('department', department);
      formData.append('email', email.toLowerCase());
      if (image) {
        formData.append('image', image);
      }

      connection.post('/register', formData).then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          history.push('/');
        }
      });
    }
  };
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
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownConfirmPassword = (event: any) => {
    event.preventDefault();
  };
  const upload = (e: any) => {
    if (e.target.files.length) {
      let files = e.target.files[0];
      setImage(e.target.files[0]);
      if (!files) {
        setErrorImage('Please select image.');
      }
      if (!files.name.match(/\.(jpeg|png|jpg)$/)) {
        setErrorImage('Please upload a file in a valid format. We currently support: PNG, JPEG,JPG');
      }
    }
  };
  return (
    <form autoComplete='off'>
      <Grid container direction='row' justify='center' alignItems='center' style={{ height: '450px' }}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <h1 style={{ color: '#0761d1' }}>Register</h1>
              <TextField
                fullWidth
                id='firstName'
                type='text'
                placeholder='First Name'
                margin='normal'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountCircleIcon />
                    </InputAdornment>
                  )
                }}
                onChange={(event) => {
                  if (
                    event.target.value.length !== 0 &&
                    new RegExp('(?=.*[a-zA-Z])').test(event.target.value) === true
                  ) {
                    setFirstName(event.target.value);
                    setErrorName('');
                  } else {
                    setErrorName('Please enter valid name');
                  }
                  if (event.target.value.length === 0) {
                    setErrorName('This field is required');
                  } else if (event.target.value.length < 4) {
                    setErrorName('Minimum 4 character long');
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
                {errorName}{' '}
              </FormHelperText>
              <TextField
                fullWidth
                id='phone'
                type='tel'
                placeholder='Phone'
                margin='normal'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <PhoneIcon />
                    </InputAdornment>
                  )
                }}
                onChange={(event) => {
                  if (event.target.value.length !== 0) {
                    setPhone(event.target.value);
                    setErrorPhone('');
                  }
                  if (event.target.value.length === 0) {
                    setErrorPhone('This field is required');
                  } else if (event.target.value.length < 10) {
                    setErrorPhone('Please enter valid phoneno, mimimum length required is 10');
                  } else if (event.target.value.length > 10) {
                    setErrorPhone('Please enter valid phoneno, mimimum length required is 10');
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
                {errorPhone}
              </FormHelperText>
              <TextField
                fullWidth
                id='address'
                type='address'
                placeholder='Address'
                margin='normal'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <HomeIcon />
                    </InputAdornment>
                  )
                }}
                onChange={(event) => {
                  if (
                    event.target.value.length !== 0 &&
                    new RegExp('(?=.*[a-zA-Z])').test(event.target.value) === true
                  ) {
                    setAddress(event.target.value);
                    setErrorAddress('');
                  } else {
                    setErrorAddress('Please enter valid address');
                  }
                  if (event.target.value.length === 0) {
                    setErrorAddress('This field is required');
                  } else if (event.target.value.length < 4) {
                    setErrorAddress('Minimum 4 character long');
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
                {errorAddress}
              </FormHelperText>
              <TextField
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
                style={{
                  color: 'red',
                  fontSize: '14px'
                }}
                error
              >
                {' '}
                {errorEmail}
              </FormHelperText>
              <TextField
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
                    new RegExp(
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[A-Za-z\d `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]{8,}$/
                    );
                    setPassword(event.target.value);
                    setErrorPassword('');
                  } else {
                    setErrorPassword('This field is required');
                  }
                }}
              />
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
              <TextField
                fullWidth
                id='confirmPassword'
                placeholder='Confirm Password'
                margin='normal'
                InputProps={{
                  type: showConfirmPassword ? 'text' : 'password',
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon
                        aria-label='toggle confirm password visibility'
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                      >
                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                      </Icon>
                    </InputAdornment>
                  )
                }}
                onChange={(event) => {
                  if (event.target.value.length !== 0) {
                    new RegExp(
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[A-Za-z\d `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]{8,}$/
                    );
                    setConfirmPassword(event.target.value);
                    setErrorConfirmPassword('');
                  } else {
                    setErrorConfirmPassword('This field is required');
                  }
                }}
              />
              <FormHelperText error> {errorConfirmPassword}</FormHelperText>{' '}
              {confirmPassword && !validatePassword(confirmPassword) && (
                <ul
                  style={{
                    color: 'red',
                    paddingLeft: '10px',
                    fontSize: '14px'
                  }}
                >
                  {!validateLength(confirmPassword) && <li>The confirm password must be 8 digits in length.</li>}
                  {!validateLower(confirmPassword) && <li>The confirm password must have a lowercase character.</li>}
                  {!validateUpper(confirmPassword) && <li>The confirm password must have a uppercase character.</li>}
                  {!validateNumber(confirmPassword) && <li>The confirm password must have a number.</li>}
                  {!validateSpecialChar(confirmPassword) && (
                    <li>The confirm password must have a special character.</li>
                  )}
                </ul>
              )}
              {!(confirmPassword === password) && (
                <ul
                  style={{
                    color: 'red',
                    paddingLeft: '10px',
                    fontSize: '14px'
                  }}
                >
                  <li>Password doesn't match.</li>
                </ul>
              )}
              <TextField
                fullWidth
                id='description'
                type='description'
                placeholder='Description'
                margin='normal'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <DescriptionIcon />
                    </InputAdornment>
                  )
                }}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
              <TextField
                fullWidth
                id='department'
                type='department'
                placeholder='Department'
                margin='normal'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <DescriptionIcon />
                    </InputAdornment>
                  )
                }}
                onChange={(event) => {
                  if (event.target.value.length !== 0) {
                    setDepartment(event.target.value);
                    setErrorDepartment('');
                  } else {
                    setErrorDepartment('Please enter valid Department');
                  }
                  if (event.target.value.length === 0) {
                    setErrorDepartment('This field is required');
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
                {errorDepartment}
              </FormHelperText>
              <FormControl component='fieldset'>
                <FormLabel component='legend'>Gender</FormLabel>
                <RadioGroup aria-label='gender' name='gender1' value={gender} onChange={handleGender}>
                  <FormControlLabel value='female' control={<Radio />} label='Female' />
                  <FormControlLabel value='male' control={<Radio />} label='Male' />
                </RadioGroup>
              </FormControl>
              <FormHelperText error> {errorGender}</FormHelperText>{' '}
              <div style={{ display: 'flex' }}>
                <InputLabel style={{ width: '78px' }}>Profile Pic</InputLabel>
                <br />
                <input type='file' id='upload-button' onChange={upload} />
              </div>
              <FormHelperText
                style={{
                  color: 'red',
                  fontSize: '14px'
                }}
                error
              >
                {' '}
                {errorImage}{' '}
              </FormHelperText>
            </CardContent>
            <CardActions>
              <Button
                variant='contained'
                size='large'
                color='secondary'
                onClick={handleRegister}
                disabled={
                  !(
                    firstName !== '' &&
                    email !== '' &&
                    address !== '' &&
                    phone !== '' &&
                    password !== '' &&
                    description !== '' &&
                    confirmPassword !== '' &&
                    image !== '' &&
                    errorName === '' &&
                    errorAddress === '' &&
                    errorEmail === '' &&
                    errorPhone === '' &&
                    errorPassword === '' &&
                    errorDescription === '' &&
                    errorConfirmPassword === '' &&
                    errorImage === ''
                  )
                }
              >
                Register
              </Button>
              <Button
                variant='contained'
                size='large'
                color='secondary'
                onClick={() => {
                  history.push('/login');
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

export default Register;
