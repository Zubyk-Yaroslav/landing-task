import User from '../Card/Card.jsx';
import '../../styles/main.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from '../Button/Button.jsx';
import Spinner from '../Spinner/Spinner.jsx';
import './users.scss';
const Users = () => {
  const [users, setUsers] = useState([]);
  const [pageLoad, setPageLoad] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataFetch = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${pageLoad}&count=6`
        );
        const usersData = response.data;
        if (usersData.total_pages === pageLoad) {
          setLastPage(true);
        }

        if (response.status) {
          console.log('Users data loaded successfully.');
          const sortedUsers = usersData.users.sort(
            (objA, objB) =>
              new Date(objB.registration_timestamp) -
              new Date(objA.registration_timestamp)
          );
          setUsers((u) => [...u, ...sortedUsers]);
          setLoading(false);
        } else {
          console.error('Failed to load users data.');
        }
      } catch (error) {
        console.error('Error while loading users data:', error);
      }
    };

    if (pageLoad > 1) {
      dataFetch();
    }
  }, [pageLoad]);

  function handleLoadMoreClick() {
    const newPageLoad = pageLoad + 1;
    setPageLoad(newPageLoad);
  }

  return (
    <div className="userWrapper">
      <div className="container">
        <h2>Working with GET request</h2>
        <div className="users">
          {users.map((user) => {
            return <User key={user.id} {...user} />;
          })}
        </div>
        {loading ? (
          <Spinner />
        ) : !lastPage ? (
          <Button text={'Load More'} onClick={handleLoadMoreClick} />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Users;
