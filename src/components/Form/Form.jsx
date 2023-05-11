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

const Form = () => {
  const [btnDisabled, setBtnDisabled] = useState(false);
  const methods = useForm();
  const {
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
        'eyJpdiI6Iit5ZGpmOENGY3BMdmdrVWNrdTZiNXc9PSIsInZhbHVlIjoiNXdaVHFkdFc1TWtHZ3pOOHNjYlVFdUVmS2xtYnRCWGlLWEtOS0ZyVFpqa3RGV1RTbjE1eHdGN1lzaHNNYUtsWUxZeE9UMXJ4SENSamJhdWZIMG5hSHc9PSIsIm1hYyI6IjZkYTRiNDZkMzgxZTBlYzI1YTEzM2IwYTY1NTI5YzkyMTEyZjlkNGFlNTI1ZmYzMTk1NzMxYzAxODBhNWM3OTEifQ==',
      Authorization: '*',
    };

    try {
      const response = await axios.post(
        'https://frontend-test-assignment-api.abz.agency/api/v1/users',
        signUpAPI(data),
        { headers }
      );
      console.log(response.data);
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
        <h2 className="formSection__title">Working with POST request</h2>
      ) : (
        <h2 className="formSection__title">User successfully registered</h2>
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
              />
              <Input
                id={'email'}
                label={'Email'}
                type={'text'}
                className={`inputText ${(errors.name && 'error') || ''}`}
                nameInput={'email'}
                errors={errors.name}
              />
              <Input
                id={'phone'}
                label={'Phone'}
                type={'tel'}
                className={`inputText ${(errors.name && 'error') || ''}`}
                nameInput={'phone'}
                errors={errors.name}
              />
              <Positions />
              <Input
                id={'file'}
                type={'file'}
                label={'Photo'}
                nameInput={'photo'}
                errors={errors.name}
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

Form.propTyped = {
  user: PropTypes.object,
};

export default Form;
