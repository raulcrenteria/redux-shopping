import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

import SubTotal from './components/subtotal/subtotal';
import PickupSavings from './components/pickupSavings/pickupSavings';
import TaxesFees from './components/taxesfees/taxesfees';
import EstimatedTotal from './components/estimatedtotal/estimatedtotal';
import ItemDetails from './components/itemdetails/itemdetails';
import PromoCodeDiscount from './components/promocode/promocode';

import {connect} from 'react-redux';
import {handleChange} from './actions/promoCodeActions';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 200,
      PickupSavings: -3.85,
      taxes: 0,
      estimatedTotal: 0,
      disablePromoButton: false

    };
  }

// COMPONENTE DID MOUNT
componentDidMount = () => {
  this.setState({
    taxes: (this.state.total + this.state.PickupSavings) * 0.16
  },
  function() {
    this.setState({
      estimatedTotal: this.state.total + this.state.PickupSavings + this.state.taxes
      });
    }
  );
}

giveDiscountHandler = () => {
  if(this.props.promoCode === 'DISCOUNT'){
      this.setState({
        estimatedTotal: this.state.estimatedTotal * 0.9
      },
      function(){
        this.setState({
          disablePromoButton: true
        })
      })

  }
}

  render() {
    return (
      <div className="container">
        {/* in react-mdl is 'Grid' in react-bootstrap is 'Container' */}
        <Container className="purchase-card">
          <SubTotal price={this.state.total.toFixed(2)}/>
          <PickupSavings price={this.state.PickupSavings}/>
          <TaxesFees taxes={this.state.taxes.toFixed(2)}></TaxesFees>
          <hr />
          <EstimatedTotal price={this.state.estimatedTotal.toFixed(2)}/>
          <ItemDetails
              price={this.state.estimatedTotal.toFixed(2)}/>
          <hr />
          <PromoCodeDiscount
            giveDiscount={()=> this.giveDiscountHandler()}
            isDisabled={this.state.disablePromoButton}
          />

        </Container>


        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  promoCode: state.promoCode.value
})

export default connect (mapStateToProps, {handleChange})(App);
