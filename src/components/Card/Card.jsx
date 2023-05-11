import PropTypes from 'prop-types';
import Image from '../Image/Image.jsx';
import './user.scss';

const User = (props) => {
  const { name, position, email, phone, photo } = props;
  return (
    <div className="user">
      <div className="image">
        <Image src={photo} alt={name} />
      </div>
      <div className="name">{name}</div>
      <ul className="info">
        <li className="position">{position}</li>
        <li className="mail">{email}</li>
        <li className="phone">{phone}</li>
      </ul>
    </div>
  );
};

User.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};

export default User;
