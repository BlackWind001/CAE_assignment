import React from 'react';
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './App.css';

class SingleRow extends React.Component{
	constructor(props){
		super(props);
		this.state = {value: 0, textValue: 'Zero', btnClass : 'btn-warning', toShow : ''};
		this.updateValue = this.updateValue.bind(this);
		this.deleteRow = this.deleteRow.bind(this);
	}
	updateValue(){
		let value = this.state.value+1;
		let textValue = value==0?'zero':value;
		let btnClass = value==0?'btn-warning':'btn-info';
		this.setState({value : value, textValue : textValue, btnClass : btnClass});
		this.props.updateCart("+",1);
	}
	deleteRow(){
		let value = this.state.value;
		this.props.updateCart("-",value);
		this.setState({value : 0,toShow : 'hidden'});
	}
	render(){
		return(
			<div className={'buttonsRow '+this.state.toShow}>
				<button style={{minWidth : '3.7rem'}} className={'btn '+this.state.btnClass} disabled>{this.state.textValue}</button>
				<button onClick={this.updateValue} className={'btn btn-secondary'}>Increment</button>
				<button className={'btn btn-danger'} onClick={this.deleteRow}>Delete</button>
			</div>
		);
	}
}

class Body extends React.Component{
	constructor(props){
		super(props);
		this.state = {noOfItemsInBasket  : 0, iconText : '0', products: [1,2,4,3]}
		this.updateCart = this.updateCart.bind(this);
	}
	updateCart(action, value){
		let noOfItemsInBasket = this.state.noOfItemsInBasket;
		switch(action){
			case "+" : noOfItemsInBasket += value;break;
			case "-" : noOfItemsInBasket -= value; break;
			default : noOfItemsInBasket = noOfItemsInBasket;
		}
		this.setState({noOfItemsInBasket : noOfItemsInBasket, iconText : ''+noOfItemsInBasket})		
	}
	render(){
		return (
			<React.Fragment>
				<div className={'container-fluid'}>
					<div className={'row border topbar d-flex'}>
						<h1 className={'mr-auto left-2 align-self-center'}>Counter</h1>
						<div style={{height:'5rem',width:'5rem'}} className={'ml-auto right-2'}>	
							<CircularProgressbar value={100} text={`${this.state.iconText}`} 
								styles={{text : {fontSize : '40px', fill : '#bfcadb'},
										 path : {stroke : '#bfcadb'}
								 }}
							/>
						</div>
					</div>
					<div className={'container-fluid'}>
						<div className={'col withButtons'}>
							{
								this.state.products.map(()=>{
									return <SingleRow updateCart={this.updateCart}/>
								})
							}
						</div>
						
					</div>
				</div>
			</React.Fragment>			
		);
	}
}

function App() {
  return (
  	<React.Fragment>
  		<Body />
  	</React.Fragment>
  );
}

export default App;
