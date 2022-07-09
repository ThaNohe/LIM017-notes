import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react'
import {Router} from 'react-router-dom'
import Login from '../src/components/Login/Login.js';
import { AuthProvider } from '../context/authContext.js'


jest.mock('../firebase/firebaseConfig.js')
 describe('Usuario no disponible', () => {
  it('Verificar si no hay usuario', ()=> {
    const history = createMemoryHistory()
  render(
<AuthProvider>
  <Router location = {history.location} navigator={history}>
  <Login />
  </Router>
  </AuthProvider>,
  );
  const btnLogin = screen.getByText('Inicia Sesión');
  expect(btnLogin).toBeInTheDocument();
  })
 })



/* test('Login renderiza la vista', async () => {
  const history = createMemoryHistory()
  render(
<AuthProvider>
  <Router location = {history.location} navigator={history}>
  <Login />
  </Router>
  </AuthProvider>,
  )
  expect(screen.getByText(/Inicia Sesión/i)).toBeInTheDocument()
  }); */