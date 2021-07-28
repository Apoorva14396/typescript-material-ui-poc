import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { connection } from '../../lib/axiosInstance';
import { base64ToImage } from '../../utils/base64toImg';
import { setToken } from '../../utils/setToken';

const DataView = (props: any) => {
  const history = useHistory();
  const [firstName, setFirstName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [image, setImage] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [department, setDepartment] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setToken();
    connection
      .get(`/user/getUser/${props.match.params.id}`)
      .then((res) => {
        setFirstName(res.data.firstName);
        setPhone(res.data.phone);
        setEmail(res.data.email);
        setAddress(res.data.address);
        setDescription(res.data.description);
        setGender(res.data.gender);
        setDepartment(res.data.department);
        if (res.data.image && res.data.image.data) {
          const data = base64ToImage(res.data.image.data);
          setImage(data);
        }
      })
      .catch((err) => {
        console.log('err is', err);
      });
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
      <Card style={{ overflowWrap: 'break-word', width: '600px' }}>
        <CardContent>
          <h2 style={{ color: '#0761d1', textAlign: 'center' }}>{firstName}'s Details</h2>
          <Grid container spacing={2}>
            <Grid style={{ display: 'flex', justifyContent: 'center' }} item xs={12} sm={12}>
              <img id='profile' alt='profile' src={`data:image/jpeg;base64,${image}`} width={100} />
            </Grid>
            <Grid item xs={5} sm={5}>
              <strong> First Name</strong>
            </Grid>
            <Grid item xs={7} sm={7}>
              {firstName}
            </Grid>
            <Grid item xs={5} sm={5}>
              <strong> Phone</strong>
            </Grid>
            <Grid item xs={7} sm={7}>
              {phone}
            </Grid>
            <Grid item xs={5} sm={5}>
              <strong> Email</strong>
            </Grid>
            <Grid item xs={7} sm={7}>
              {email}
            </Grid>
            <Grid item xs={5} sm={5}>
              <strong> Address</strong>
            </Grid>
            <Grid item xs={7} sm={7}>
              {address}
            </Grid>
            <Grid item xs={5} sm={5}>
              <strong> Gender</strong>
            </Grid>
            <Grid item xs={7} sm={7}>
              {gender}
            </Grid>
            <Grid item xs={5} sm={5}>
              <strong> Department</strong>
            </Grid>
            <Grid item xs={7} sm={7}>
              {department}
            </Grid>
            <Grid item xs={5} sm={5}>
              <strong> Description</strong>
            </Grid>
            <Grid item xs={7} sm={7}>
              {description}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            variant='contained'
            size='large'
            color='secondary'
            onClick={() => {
              history.push(`/data/edit/${props.match.params.id}`);
            }}
          >
            Edit
          </Button>
          {props.userInfo.role === 'admin' && (
            <Button
              variant='contained'
              size='large'
              color='secondary'
              onClick={() => {
                history.push('/list');
              }}
            >
              Back
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

const mapStateToProps = (state: any) => ({
  userInfo: state.userInfo
});
export default connect(mapStateToProps)(DataView);
