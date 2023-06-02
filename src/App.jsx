import { useState } from 'react';
import logo from './assets/logo.svg';
import CreateCard from './pages/CreateCard';

function App() {
  return (
    <main>
      <nav className='navbar'>
        <img src={logo} alt='logo' className='logo' />
      </nav>
      <section className='createCard'>
        <CreateCard />
      </section>
      <footer className='footer'>
        <p>&copy;4E656F 2023</p>
      </footer>
    </main>
  );
}

export default App;
