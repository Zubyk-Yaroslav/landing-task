import User from '../Card/Card.jsx';
import '../../styles/main.scss';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import Button from '../Button/Button.jsx';
import Spinner from '../Spinner/Spinner.jsx';
import './users.scss';
import { connect } from 'react-redux';
import {
  fetchUsers,
  handleUpdatePage,
  allPages,
} from '../../redux/reducer.jsx';

const mapStateToProps = (state) => {
  return {
    users: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (currentPage) => dispatch(fetchUsers(currentPage)),
    handleUpdatePage: () => dispatch(handleUpdatePage()),
    allPages: (obj) => dispatch(allPages(obj)),
  };
};

const Users = (props) => {
  const { users, fetchUsers, handleUpdatePage, allPages } = props;

  useEffect(() => {
    fetchUsers(users.pageLoad).then(() => {
      allPages(users.total_pages);
    });
  }, []);

  function handleLoadMoreClick() {
    const nextPage = users.pageLoad + 1;
    fetchUsers(nextPage).then(() => {
      handleUpdatePage();
    });
  }

  return (
    <div className="userWrapper">
      <div className="container">
        <h2>Working with GET request</h2>
        <div className="users">
          {users.users.map((user) => {
            return <User key={user.id} {...user} />;
          })}
        </div>
        {users.loading ? (
          <Spinner />
        ) : !users.last_page ? (
          <Button text={'Load More'} onClick={handleLoadMoreClick} />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.object,
  fetchUsers: PropTypes.func,
  fetchUsersSuccess: PropTypes.func,
  handleUpdatePage: PropTypes.func,
  allPages: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
