import PropTypes from 'prop-types';
import Button from '../Button/Button.jsx';
import Input from '../Input/Input.jsx';
import Positions from '../Positions/Positions.jsx';
import Spinner from '../Spinner/Spinner.jsx';
import { useForm, FormProvider } from 'react-hook-form';
import SuccessImage from '../../assets/images/success-image.svg';
import axios from 'axios';
import './form.scss';
import { useEffect, useState } from 'react';
import Image from '../Image/Image.jsx';
import { connect } from 'react-redux';
import { fetchUsers, fetchUsersSuccess } from '../../redux/reducer.jsx';

const mapStateToProps = (state) => {
  return {
    users: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (obj) => dispatch(fetchUsers(obj)),
    fetchUsersSuccess: (obj) => dispatch(fetchUsersSuccess(obj)),
  };
};
const Form = (props) => {
  const [btnDisabled, setBtnDisabled] = useState(false);
  const { fetchUsers, fetchUsersSuccess } = props;

  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;
  const errorsLength = Object.keys(errors).length;

  const signUpAPI = (inputData) => {
    const formData = new FormData();
    Object.keys(inputData).forEach((fieldName) => {
      if (fieldName === 'photo') {
        const file = inputData.photo[0];
        formData.append(fieldName, file, file.name);
      } else {
        formData.append(fieldName, inputData[fieldName]);
      }
    });
    return formData;
  };
  const onSubmit = async (data) => {
    const headers = {
      'Content-Type': 'multipart/form-data',
      Token:
        'eyJpdiI6IjA5ZXorOHR3WDlndUJTcmJxMlh4Q1E9PSIsInZhbHVlIjoiM3ByOHBXUUlyZnRQR1lXelJTelBZXC9mMU1jSkU0eUtSVDlUamxWaG90cHljTm93MlRYWnhqTFIzc3BuSDNaTDBLYXI4NXJkcXlyK1RhdW5mZEZVWVpnPT0iLCJtYWMiOiJjYTEwYjdmYTFjMDk1ODVhMWJkYjAyZDFjOTM4Y2Q3Mzk3ZTU5M2YzNmY1NDQ2OGJjYzRlY2YyZjUxM2ZkZTBhIn0=',
      Authorization: '*',
    };

    try {
      const response = await axios.post(
        'https://frontend-test-assignment-api.abz.agency/api/v1/users',
        signUpAPI(data),
        { headers }
      );
      console.log(response.data);
      fetchUsersSuccess([]);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (errorsLength >= 1) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [errorsLength, errors]);

  return (
    <div className="formSection">
      {isSubmitSuccessful ? (
        <h2 className="formSection__title">User successfully registered</h2>
      ) : (
        <h2 className="formSection__title">Working with POST request</h2>
      )}

      <div className="container">
        {!isSubmitSuccessful ? (
          <FormProvider {...methods}>
            <form
              className="formPost"
              action="#"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                id={'name'}
                label={'Your name'}
                type={'text'}
                className={`inputText ${(errors.name && 'error') || ''}`}
                nameInput={'name'}
                errors={errors.name}
                {...register('name')}
              />
              <Input
                id={'email'}
                label={'Email'}
                type={'text'}
                className={`inputText ${(errors.email && 'error') || ''}`}
                nameInput={'email'}
                errors={errors.email}
                {...register('email')}
              />
              <Input
                id={'phone'}
                label={'Phone'}
                type={'tel'}
                className={`inputText ${(errors.phone && 'error') || ''}`}
                nameInput={'phone'}
                errors={errors.phone}
                {...register('phone')}
              />
              <Positions />
              <Input
                id={'file'}
                type={'file'}
                label={'Photo'}
                nameInput={'photo'}
                errors={errors.photo}
                {...register('photo')}
              />
              {isSubmitting ? (
                <Spinner />
              ) : (
                <Button
                  text={'Sign Up'}
                  type={'Submit'}
                  disabled={btnDisabled}
                />
              )}
            </form>
          </FormProvider>
        ) : (
          <Image src={SuccessImage} alt={'success'} />
        )}
      </div>
    </div>
  );
};

Form.propTypes = {
  user: PropTypes.object,
  fetchUsers: PropTypes.func,
  fetchUsersSuccess: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
