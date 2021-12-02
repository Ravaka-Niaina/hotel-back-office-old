import React from "react";

function IsState(props){
  return(
    <div>
      <input
        type="text"
        onChange={props.saveInput}
      />
      <button onClick={props.addNewItem}> Add Item </button>
      
    </div>
  );
}

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      cart : ['corm' , "zo"]
    }
  }

  saveInput = (e) => {
    this.setState({ input: e.target.value });
  };

  addNewItem = () => {
    let { cart, input } = this.state;
    cart.push(input);
    console.log("onclick")
    // this.state.cart.push(this.state.input); // same as above, though bad practice 
  };
  render() {
    return (
      <div>
      <IsState 
        saveInput = {this.saveInput}
        addNewItem = {this.addNewItem} 
        cart = {this.state.cart}
        /> 
        <ul>
          {this.state.cart.map((subItems, sIndex) => {
            return <li key={sIndex}> {subItems}</li>
          })}
        </ul>
      </div>
      
    );
  }
}