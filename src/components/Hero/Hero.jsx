import Button from '../Button/Button.jsx';
import './hero.scss';
import '../../styles/main.scss';

const Hero = () => {
  return (
    <div className="hero">
      <div className="container">
        <h1 className="title">Test assignment for front-end developer</h1>
        <p className="paragraph">
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they&apos;ll be building web interfaces with accessibility
          in mind. They should also be excited to learn, as the world of
          Front-End Development keeps evolving.
        </p>
        <Button text={'Sign up'} />
      </div>
    </div>
  );
};

export default Hero;
