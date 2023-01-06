import React from "react";
import ReactDOM from "react-dom";
import logo from '../assets/10th.png'
import "./search.less";

class Search extends React.Component {
  render() {
    return <div className="text">
            <span>search-text-3333</span>
            <img src={logo} />
      </div>;
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById("root")
);
