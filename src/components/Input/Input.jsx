import PropTypes from 'prop-types';
import './input.scss';
import { useFormContext } from 'react-hook-form';
import { forwardRef } from 'react';

const Input = forwardRef((props, ref) => {
  const { id, label, type, className, nameInput, value, errors } = props;
  const methods = useFormContext();
  const onChange = (event) => {
    if (event.target.value) {
      methods.setValue(nameInput, event.target.value);
    }
  };

  return (
    <label className={`inputLabel ${(errors && 'error') || ''}`} htmlFor={id}>
      <input
        className={className}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        name={id}
        ref={ref}
        {...methods.register(nameInput, {
          required: `Your ${nameInput} is required`,
        })}
      />
      {errors && <span className="error-msg">{errors.message}</span>}
      <span className="floating-label">{label}</span>
    </label>
  );
});

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  nameInput: PropTypes.string,
  errors: PropTypes.object,
};

Input.displayName = 'Input';

export default Input;
