// alias : rcc
import React, {Component} from 'react';

class App extends Component {

  state = {
    userName : '',
    password : '',
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
        id : this.id
      }),
      userName : '',
      password : ''
    });
    this.id++;
  };

  isSafe = () => {
    //비번이 6자리 이상
    //username을 포함하고 있지 않음
    //알파벳 대소문자 각각 하나 이상
    const rule1 = this.state.password.length >= 6 ;
    const rule2 = !this.state.password.includes(this.state.userName);
    const rule3 = !!this.state.password.match(/[A-Z]/g) && !!this.state.password.match(/[a-z]/g);

    this.setState({
      validation : rule1 && rule2 && rule3
    })
  };


  render() {
    const {userName, password , list} = this.state;

    return (
      <div>
        <input name="userName" value={userName} onChange={this.handleChange} placeholder="ID"/>
        <input name="password" value={password} onChange={this.handleChange} onKeyUp={this.isSafe} type="password" placeholder="PASSWORD"/>
        <button onClick={this.handleInsert} disabled={!this.state.validation}>추가하기</button>
        <ul>
          {list.map(item => {
            return(
              <li key={item.id}>아이디는 {item.userName} 비밀번호는 {item.password} 입니다</li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default App;
