import React from "react";
import { fireEvent, render, screen } from '@testing-library/react';
import MetersList from '../../components/meters-list.component';
import MeterDataService from "../../services/meter.service";

import { Switch, Route, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

const   BuyToken = () =>{
  return(
    <BrowserRouter>
    <Switch>
           <MetersList />
           </Switch></BrowserRouter>
  )
}

describe('list meters', () => {

    beforeEach(() => {
        MeterDataService.getAll()
        .then(response => {
          this.setState({
            meters: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      });

    test('should render list of meter heading', () => {
        render( <BuyToken/>
         );
        const lableElelment = screen.getByText(/Meters List/i); 
        expect(lableElelment).toBeInTheDocument();
      });

      test('should render meter item', async () => {
        render( <BuyToken/>
         );
         const clickContent = screen.getByText(/Please click on a meter.../i)
        const meters = await screen.findByTestId("meter-0"); 
        expect(meters).toBeInTheDocument();
        expect(clickContent).toBeInTheDocument();
      });

      test('should render multiple meter item', async () => {
        render( <BuyToken/>
         );
         const clickContent = screen.getByText(/Please click on a meter.../i)
        const meters = await screen.findByTestId(/meter/i); 
        expect(meters).toBeInTheDocument();
        expect(clickContent).toBeInTheDocument();
      });

      test('should render meter content', () => {
        render( <BuyToken/>
         );
        const meters = screen.getAllByTestId("meter"); 
        fireEvent.click(meters[0]);
        const clickContent = screen.getByText(/Please click on a meter.../i)
        const lableElement = screen.getByLabelText(/Remaining days/i);

        expect(meters.length).toBeGreaterThan(1);
        expect(lableElement).toBeInTheDocument();
        expect(clickContent).toBeFalsy();
      });
});
