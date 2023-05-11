import './App.css';
import Header from './components/Header/Header.jsx';
import Hero from './components/Hero/Hero.jsx';
import Users from './components/Cards/Cards.jsx';
import Form from './components/Form/Form.jsx';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Users />
      <Form />
    </div>
  );
}

export default App;
