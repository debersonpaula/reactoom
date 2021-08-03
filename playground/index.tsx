import React from 'react';
import ReactDOM from 'react-dom';
import { EnableLogs } from '../src';
import { App } from './App';
import './style.css';

EnableLogs();

const root = document.getElementById('app');
ReactDOM.render(<App />, root);
