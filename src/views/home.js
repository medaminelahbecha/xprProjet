import React, { Component } from "react";
import Header from "../components/menu/header";
import Menu from "../components/menu/menu";
import Footer from "../components/menu/footer";

export default class home extends Component {
  render() {
    return (
      <div>
        <Header />
        <Menu />
        <Footer />
      </div>
    );
  }
}
