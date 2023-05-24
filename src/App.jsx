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
    </main>
  );
}

export default App;
