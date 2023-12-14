import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './css/normalize.css';
import './css/index.css';
import { Shop } from './shop';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Shop />
	</BrowserRouter>,
);
