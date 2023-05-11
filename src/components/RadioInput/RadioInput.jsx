import PropTypes from 'prop-types';
import './input.scss';

const RadioInput = ({
  id,
  label,
  value,
  className,
  classLabel,
  checked,
  onChange,
}) => {
  return (
    <label key={id} htmlFor={id} className={classLabel}>
      <input
        className={className}
        type="radio"
        id={id}
        name="position"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="custom-radio" />
      {label}
    </label>
  );
};

RadioInput.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  classLabel: PropTypes.string,
  value: PropTypes.number,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  methods: PropTypes.object,
};

RadioInput.displayName = 'RadioInput';

export default RadioInput;
