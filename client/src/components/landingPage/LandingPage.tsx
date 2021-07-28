import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useHistory } from 'react-router-dom';

const LandingPage = () => {
  const history = useHistory();

  return (
    <form autoComplete='off'>
      <Grid container direction='row' justify='center' alignItems='center' style={{ height: '450px' }}>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <h1 style={{ color: '#0761d1', display: 'flex', justifyContent: 'center' }}>TypeScript Application</h1>
            </CardContent>
            <CardActions>
              <Button
                variant='contained'
                size='large'
                color='primary'
                onClick={() => {
                  history.push('/login');
                }}
              >
                Login
              </Button>
              <Button
                variant='contained'
                size='large'
                color='primary'
                onClick={() => {
                  history.push('/register');
                }}
              >
                Signup
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
};
export default LandingPage;
