import Button from '../Button/Button.jsx';
import Image from '../Image/Image.jsx';
import Logo from '../../assets/images/Logo.svg';
import '../../styles/header.scss';
import '../../styles/main.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Image src={Logo} alt={'Logo'} />
        </div>
        <div className="btn-wrapper">
          <Button text={'Users'} />
          <Button text={'Sign up'} />
        </div>
      </div>
    </header>
  );
};

export default Header;
