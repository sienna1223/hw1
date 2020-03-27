// alias : rcc
import React, {Component} from 'react';

class App extends Component {

  state = {
    userName : '',
    password : '',
    email : '',
    list : [],
    validation : false
  };

  id = 1;

  handleChange = (e) =>{
    const {name, value} = e.target;

    this.setState({
      [name] : value
    });
  };


  handleInsert = () => {
    this.setState({
      list : this.state.list.concat({
        userName : this.state.userName,
        password : this.state.password,
        email : this.state.email,
        id : this.id
      }),
      userName : '',
      password : '',
      email : ''
    });
    this.id++;
  };

  isSafe = () => {
    //비번이 6자리 이상
    //username을 포함하고 있지 않음
    //알파벳 대소문자 각각 하나 이상
    //이메일 @ 포함
    const rule1 = this.state.password.length >= 6 ;
    const rule2 = !this.state.password.includes(this.state.userName);
    const rule3 = !!this.state.password.match(/[A-Z]/g) && !!this.state.password.match(/[a-z]/g);
    const rule4 = this.state.email.includes('@');

    return rule1 && rule2 && rule3 && rule4;
  };


  render() {
    const {userName, password, email} = this.state;
    return (
      <div>
        <input name="userName" value={userName} onChange={this.handleChange} placeholder="ID"/>
        <input name="password" value={password} onChange={(e) => {this.handleChange(e); this.isSafe();}} type="password" placeholder="PASSWORD"/>
        <input name="email" value={email} onChange={this.handleChange} type="email" onKeyUp={this.isSafe} placeholder="E-mail"/>
        <button onClick={this.handleInsert} disabled={!this.isSafe()}>추가하기</button>
      </div>
    );
  }
}

export default App;
