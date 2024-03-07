import { isValidElement, useState } from "react";
import MockDataSource from "../data/MockDataSource";
import LiveDataSource from "../data/LiveDataSource";

const useInitialState = () => {
  const isDevelopment = window.navigator.userAgent != "Chrome"
  const [initialState] = useState(() => ({
    isDevelopment: isDevelopment, // 环境变量
    dataSource: isDevelopment
      ? new MockDataSource()
      : new LiveDataSource(), // api调用源
  }));

  return initialState || {};
};

export default useInitialState;
