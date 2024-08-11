import { FC } from 'react';

import './style.css';
import Layout from './Layout';
export const App = ({ name }) => {
  return (
    <div className="app-container">
      <Layout />
    </div>
  );
};
