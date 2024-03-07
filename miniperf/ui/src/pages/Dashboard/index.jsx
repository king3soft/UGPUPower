/* eslint-disable no-unused-vars */
import React, { useEffect, useReducer, useState } from "react";
import { Layout, Flex, FloatButton } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import styles from "./index.module.css";
import PackageSelect from "./components/PackageSelect";
import TempChart from "./components/TempChart";
import PowerChart from "./components/PowerChart";
import { CustomerServiceOutlined, SendOutlined } from "@ant-design/icons";
import useInitialState from '../../hooks/useInitialState';
import update from 'immutability-helper';
import DemoChart from "./components/DemoChar";
import { useMemoizedFn } from "ahooks/"

export const Dashboard = () => {
  const { dataSource } = useInitialState()
  const [ip, setIp] = useState()
  const [timerId, setTimerId] = useState(-1)
  const [gpuLineData, setGpuLineData] = useState({
    series: [{
      name: "kgsl/temp", data: [], lineWidth: 0.5, marker: {
        radius: 1 // Set the data point size here
      }
    }],
    xAxis: {
      crosshair: true,
      min: 0,
      max: 200,
    },
    yAxis: {
      min: 0,
      max: 80,
    },
  });

  const [powerLineData, setPowerLineData] = useState({
    series: [{ name: "kgsl/temp", data: [] }],
    xAxis: {
      crosshair: true,
      min: 0,
      max: 200,
    },
    yAxis: {
      min: 0,
      max: 80,
    },
  });

  const loopFetch = useMemoizedFn(() => {
    fetch(`http://${ip}:8081/kgsl/temp`)
      .then((response) => {
        response.json().then((res) => {
          const new_data = res;

          const { series, xAxis, yAxis } = gpuLineData;

          // useMemoizedFn, this is ok
          const newSeriesData = series.map((line, index) => {
            const newTemp = Number(res[index]) / 1000;
            console.log(line.data.length, res, index)
            return {
              // name: `Series ${index + 1}`,
              data: [...line.data, newTemp]
            };
          });
          setGpuLineData({ ...gpuLineData, series: newSeriesData });

          // useMemoizedFn, this is not ok
          /*
          var i = 0;
          new_data.forEach((element) => {
            series[i++].data.push(Number(element) / 1000);
          });

          if (series[0].data.length > xAxis.max) {
            xAxis.max *= 2;
          }

          setGpuLineData({
            ...gpuLineData,
            series: [...series],
            xAxis: xAxis,
          });
          */        
        });
      })
      .catch((error) => {
        console.error(error);
      });
  })

  const startProfiler = (ip) => {
    if (timerId != -1) {
      clearInterval(timerId);
    }
    setIp(ip);
    setTimerId(setInterval(loopFetch, 1000));
  }

  const handleCapture = (currentDevice, currentPackage) => {
    dataSource.startCapture().then((res) => {
      if (res.data?.ip) {
        startProfiler(res.data?.ip)
      }
    }).catch((err) => {
      alert(err)
    })
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const newSeriesData = gpuLineData.series.map((series, index) => {
  //       const newDataPoint = Math.floor(Math.random() * 20) + 5;
  //       return {
  //         name: `Series ${index + 1}`,
  //         data: [...series.data, newDataPoint]
  //       };
  //     });
  //     setGpuLineData({ ...gpuLineData, series: newSeriesData });
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [gpuLineData]);

  return (
    <Layout className={styles.layoutStyle}>
      <Header className={styles.header}>
        <PackageSelect onCaptureClick={handleCapture}></PackageSelect>
      </Header>
      <Content className={styles.content}>
        <TempChart title="GPU_Temp" lineOption={gpuLineData}></TempChart>
        {/* <PowerChart title="Power" options={powerLineData}></PowerChart> */}
        {/* <DemoChart></DemoChart> */}
      </Content>
      <Footer className={styles.footer}>Footer</Footer>
      {/* <FloatButton
        shape="circle"
        style={{
          right: 20,
          bottom: 20,
        }}
        icon={<SendOutlined />}
      /> */}
    </Layout>
  );
};
