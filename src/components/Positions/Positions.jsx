import { useEffect, useState } from 'react';
import RadioInput from '../RadioInput/RadioInput.jsx';
import './positions.scss';
import { useFormContext } from 'react-hook-form';

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [loaded, setIsLoaded] = useState(true);
  const positionLength = positions.length;

  useEffect(() => {
    if (positionLength === 0) {
      setIsLoaded(false);
    }
    if (loaded) return;
    const getPositions = async () => {
      try {
        const response = await fetch(
          'https://frontend-test-assignment-api.abz.agency/api/v1/positions'
        );
        if (response) {
          const data = await response.json();
          setPositions(data.positions);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPositions();
  }, [loaded, positionLength]);

  const handlePositionChange = (event) => {
    methods.setValue('position_id', event.target.value);
  };

  const methods = useFormContext();
  return (
    <div className="choosePosition">
      <p className="choosePosition__text">Select your position</p>
      {positions.map((position, index) => (
        <RadioInput
          key={position.id}
          id={index + 1}
          label={position.name}
          value={index + 1}
          className={'inputRadio'}
          classLabel={'radio-label'}
          onChange={handlePositionChange}
          methods={{ ...methods.register('position_id') }}
        />
      ))}
    </div>
  );
};
export default Positions;
