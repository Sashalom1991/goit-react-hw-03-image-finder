import { Component } from "react";
import LoaderSpiner from "react-loader-spinner";
export default class Loader extends Component {
  //other logic
  render() {
    return (
      <LoaderSpiner
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    );
  }
}