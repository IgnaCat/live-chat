import React from 'react';
import Home from './components/Home';
import Store from './components/Store';

const App = () => {
  return (
    <div>
      <Store>
        <Home />
      </Store>
    </div>
  );
};

export default App;
