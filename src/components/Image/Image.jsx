import PropTypes from 'prop-types';

const Image = (props) => {
  const { src, alt } = props;
  return <img src={src} alt={alt} />;
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Image;
