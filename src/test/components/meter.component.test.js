import React from "react";
import { fireEvent, render, screen } from '@testing-library/react';
import Meter from '../../components/meter.component';

import { Switch, Route, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
const props = {
    match: {
      params: {}
    }
  }
const   BuyToken = () =>{
  return(
    <BrowserRouter>
    <Switch>
           <Meter {...props}/>
           </Switch></BrowserRouter>
  )
}

describe('meter component', () => {
    test('should render all buttons available', () => {
        render( <BuyToken/>
         );
        const buttonElements= screen.getAllByRole("button"); 
        expect(buttonElements.length).toBe(2);
      });

});
