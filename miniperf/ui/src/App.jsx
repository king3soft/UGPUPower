import React from "react";
import "./App.css";
import {Dashboard} from "./pages/Dashboard";
import { ConfigProvider, theme } from 'antd';

class App extends React.Component {
  render() {
    return (
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <Dashboard />
      </ConfigProvider>
    );
  }
}

export default App;
