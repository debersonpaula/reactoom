import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { reactHot } from 'tsrx/tools';
import { App } from './App';
import './style.css';
import { EnableDebugger } from 'reactoom';

EnableDebugger();

const root = document.getElementById('app');
const HotReloadComponent = reactHot(module, App);
ReactDOM.render(<HotReloadComponent />, root);
