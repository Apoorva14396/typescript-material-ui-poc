import React from 'react';
import { Chart } from 'react-google-charts';
import { connection } from '../../lib/axiosInstance';
import { setToken } from '../../utils/setToken';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const UserRegisteredAnalytics = () => {
  const history = useHistory();
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setToken();
    connection
      .get('/registeredAnalytics')
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log('err is', err);
      });
  };
  return (
    <>
      <Button
        variant='contained'
        size='large'
        color='secondary'
        style={{ marginTop: '17px', float: 'right', marginRight: '63px' }}
        onClick={() => {
          history.push('/list');
        }}
      >
        Back
      </Button>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: '20px' }}>
        <Chart
          width={1000}
          height={500}
          chartType='ColumnChart'
          loader={<div>Loading Chart</div>}
          data={data}
          options={{
            title: 'User registered/created per hour',
            chartArea: { width: '30%' },
            hAxis: {
              title: 'Hour(IN UTC)',
              minValue: 0
            },
            vAxis: {
              title: 'Count '
            }
          }}
          legendToggle
        />
      </div>
    </>
  );
};

export default UserRegisteredAnalytics;
