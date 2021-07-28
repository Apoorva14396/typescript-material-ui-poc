import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connection } from '../../lib/axiosInstance';
import { setUserInfo } from '../../redux/actions/userInfoAction';

const Header = (props: any) => {
  const history = useHistory();
  const handleLogout = () => {
    connection
      .post('/logout', {
        email: props.userInfo.email
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          history.push('/');
          props.setUserInfo('');
          localStorage.clear();
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <AppBar position='static'>
      <Toolbar style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
        {props.userInfo.loginToken && (
          <>
            {props.userInfo.role === 'admin' && (
              <Button
                style={{ color: 'white', justifyContent: 'flex-end' }}
                onClick={() => {
                  history.push('/list');
                }}
              >
                View List
              </Button>
            )}

            <Button style={{ color: 'white', justifyContent: 'flex-end' }} onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
const mapStateToProps = (state: any) => ({
  userInfo: state.userInfo
});
const mapDispatchToProps = {
  setUserInfo: setUserInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
