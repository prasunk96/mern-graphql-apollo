import React from 'react';
import { Route } from 'react-router-dom';

//SET OF HELPER FUNCTIONS AND COMPONENTS

//PIECE OF CREATING A PRIVATE ROUTE WITH REDIRECT - FOR AUTH
const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

//CREATES A REACT ROUTER ROUTE THAT CAN ACCEPT PROPS
export const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

//FUNCTION TO PARSE VERBOSE MONTH FROM NUMBERS
export const monthParse = (month) => {
  switch(month){
    case 0: return 'January'
    case 1: return 'February'
    case 2: return 'March'
    case 3: return 'April'
    case 4: return 'May'
    case 5: return 'June'
    case 6: return 'July'
    case 7: return 'August'
    case 8: return 'September'
    case 9: return 'October'
    case 10: return 'November'
    case 11: return 'December'
    default: return month
  }
}