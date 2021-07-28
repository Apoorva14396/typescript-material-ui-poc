import { FormHelperText, InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { FormatListBulletedRounded } from '@material-ui/icons';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connection } from '../../lib/axiosInstance';
import { base64ToImage } from '../../utils/base64toImg';
import { setToken } from '../../utils/setToken';

const DataEdit = (props: any) => {
  const history = useHistory();

  const [firstName, setFirstName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [image, setImage] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [department, setDepartment] = React.useState('');
  const [errorName, setErrorName] = React.useState('');
  const [errorAddress, setErrorAddress] = React.useState('');
  const [errorEmail, setErrorEmail] = React.useState('');
  const [errorPhone, setErrorPhone] = React.useState('');
  const [errorDescription, setErrorDescription] = React.useState('');
  const [errorImage, setErrorImage] = React.useState('');
  const [errorDepartment, setErrorDepartment] = React.useState('');
  const [disable, setDisable] = React.useState(true);
  const [tempImage, setTempImage] = React.useState('');
  const [editMode, setEditMode] = React.useState(false);

  React.useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    setToken();
    connection
      .get(`/user/getUser/${props.match.params.id}`)
      .then((res) => {
        const data = base64ToImage(res.data.image.data);
        setImage(data);
        setFirstName(res.data.firstName);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setAddress(res.data.address);
        setDescription(res.data.description);
        setDepartment(res.data.department);
      })
      .catch((err) => {
        console.log('err is', err);
      });
  };
  const upload = (e: any) => {
    setDisable(false);
    setEditMode(true);
    setTempImage(URL.createObjectURL(e.target.files[0]));

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

  const handleUpdate = () => {
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

    if (description === '') {
      setErrorDescription('This field is required');
    }
    if (department === '') {
      setErrorDepartment('This field is required');
    }
    if (
      firstName !== '' &&
      email !== '' &&
      address !== '' &&
      phone !== '' &&
      description !== '' &&
      department !== '' &&
      errorName === '' &&
      errorAddress === '' &&
      errorEmail === '' &&
      errorPhone === '' &&
      errorDescription === '' &&
      errorDepartment === ''
    ) {
      let formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('phone', phone);
      formData.append('address', address);
      formData.append('description', description);
      formData.append('email', email);
      formData.append('department', department);
      if (image) {
        formData.append('image', image);
      }
      connection.patch(`/user/updateUser/${props.match.params.id}`, formData).then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          getData();
          props.userInfo.role === 'admin' ? history.push('/list') : history.push(`/data/view/${props.match.params.id}`);
        }
      });
    }
  };
  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='center'
      style={{
        paddingTop: '20px'
      }}
    >
      <Card>
        <CardContent style={{ width: '450px', overflowWrap: 'break-word' }}>
          <h2 style={{ color: '#0761d1', display: 'flex', justifyContent: 'center' }}>{firstName}'s Details</h2>
          <Grid container spacing={3}>
            <Grid style={{ display: 'flex', justifyContent: 'center' }} item xs={12} sm={12}>
              <img
                id='profile'
                alt='profile'
                src={editMode ? tempImage : `data:image/jpeg;base64,${image}`}
                width={100}
              />
            </Grid>
            <div style={{ display: 'flex', margin: '10px' }}>
              <InputLabel shrink={true} className='input-label label-font'>
                Change Profile Picture
              </InputLabel>
              <input type='file' id='upload-button' onChange={upload} />
              <FormHelperText error> {errorImage}</FormHelperText>
            </div>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id='firstName'
                type='text'
                label='First Name'
                value={firstName}
                onChange={(event) => {
                  if (new RegExp('(?=.*[a-zA-Z])').test(event.target.value) === true) {
                    setFirstName(event.target.value);
                    setDisable(false);
                    setErrorName('');
                  } else {
                    setFirstName('');
                    setErrorName('Please enter valid name');
                  }
                  if (event.target.value.length === 0) {
                    setErrorName('This field is required');
                  } else if (event.target.value.length < 4) {
                    setErrorName('Minimum 4 character long');
                  }
                }}
              />
              <FormHelperText error> {errorName}</FormHelperText>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id='phone'
                type='text'
                label='Phone'
                value={phone}
                onChange={(event) => {
                  if (event.target.value.length !== 0) {
                    setPhone(event.target.value);
                    setDisable(false);
                    setErrorPhone('');
                  }
                  if (event.target.value.length === 0) {
                    setPhone('');
                    setErrorPhone('This field is required');
                  } else if (event.target.value.length < 10) {
                    setErrorPhone('Please enter valid phoneno, mimimum length required is 10');
                  } else if (event.target.value.length > 10) {
                    setErrorPhone('Please enter valid phoneno, mimimum length required is 10');
                  }
                }}
              />
              <FormHelperText error> {errorPhone}</FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='address'
                type='text'
                label='Address'
                value={address}
                onChange={(event) => {
                  if (new RegExp('(?=.*[a-zA-Z])').test(event.target.value) === true) {
                    setAddress(event.target.value);
                    setDisable(false);
                    setErrorAddress('');
                  } else {
                    setAddress('');
                    setErrorAddress('Please enter valid address');
                  }
                  if (event.target.value.length === 0) {
                    setErrorAddress('This field is required');
                  } else if (event.target.value.length < 4) {
                    setErrorAddress('Minimum 4 character long');
                  }
                }}
              />
              <FormHelperText error> {errorAddress}</FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='department'
                type='text'
                label='Department'
                value={department}
                onChange={(event) => {
                  if (event.target) {
                    setDepartment(event.target.value);
                    setDisable(false);
                    setErrorDepartment('');
                  }
                  if (event.target.value.length === 0) {
                    setErrorDepartment('This field is required');
                  }
                }}
              />
              <FormHelperText error> {errorDepartment}</FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='description'
                type='text'
                label='Description'
                value={description}
                onChange={(event) => {
                  if (event.target) {
                    setDescription(event.target.value);
                    setDisable(false);
                    setErrorDescription('');
                  }
                  if (event.target.value.length === 0) {
                    setErrorDescription('This field is required');
                  }
                }}
              />
              <FormHelperText error> {errorDescription}</FormHelperText>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            variant='contained'
            size='large'
            color='secondary'
            disabled={
              !(
                !disable &&
                firstName !== '' &&
                email !== '' &&
                address !== '' &&
                phone !== '' &&
                description !== '' &&
                department !== '' &&
                image !== '' &&
                errorName === '' &&
                errorAddress === '' &&
                errorEmail === '' &&
                errorPhone === '' &&
                errorDescription === '' &&
                errorImage === '' &&
                errorDepartment === ''
              )
            }
            onClick={handleUpdate}
          >
            Update
          </Button>
          <Button
            variant='contained'
            size='large'
            color='secondary'
            onClick={() => {
              props.userInfo.role === 'admin'
                ? history.push('/list')
                : history.push(`/data/view/${props.match.params.id}`);
            }}
          >
            Cancel
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

const mapStateToProps = (state: any) => ({
  userInfo: state.userInfo
});
export default connect(mapStateToProps)(DataEdit);
