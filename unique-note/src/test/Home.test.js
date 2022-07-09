import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event' 
import Home from "../components/Home/Home";


const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('Test Usenavigate', () => {
  afterEach(()=>{
    jest.restoreAllMocks()
  })

  it('Test with Mock', async () => {
    render(<Home/>);
    expect(screen.getByText(/Un bloc de notas a tu alcance ¡Toma nota ahora!/i)).toBeInTheDocument()
    await userEvent.click(screen.getByText(/Registrarse/i))
    expect(mockNavigate).toHaveBeenCalledWith('/Register')
  });
})