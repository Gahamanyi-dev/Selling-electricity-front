import React from "react";
import { fireEvent, render, screen } from '@testing-library/react';
import AddMeter from '../../components/buy-token.component';

import { Switch, Route, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

const   BuyToken = () =>{
  return(
    <BrowserRouter>
    <Switch>
           <AddMeter />
           </Switch></BrowserRouter>
  )
}

describe('buy a token', () => {
    test('should render all meters available', () => {
        render( <BuyToken/>
         );
        const lableElelment = screen.getByLabelText(/Meter number/i); 
        expect(lableElelment).toBeInTheDocument();
      });

      test('input should work', () => {
        render(<BuyToken />);
        const inputElements = screen.getByTestId("meter_input")
        fireEvent.change(inputElements, {target:{value:'123456'}})

        expect(inputElements.value).toBe("123456");
      });   
      
      test('should buy token successfully', () => {
        render(<BuyToken />);
        const inputElements = screen.getByTestId("meter_input")
        fireEvent.change(inputElements, {target:{value:'123456'}})
        const moneyInput = screen.getByTestId("money_input")
        fireEvent.change(moneyInput, {target:{value:'300'}})

       
        
        const buttonElement = screen.getByRole('button',{name:/Submit/i})
        fireEvent.click(buttonElement);
        const headingElement = screen.getByTestId('success_heading');
        expect(headingElement).toBeInTheDocument();
      });   
});
