import { Button, Select, Space } from "antd";
import { useState } from "react";
import { ReloadOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useMount } from "ahooks";
import useInitialState from "@hooks/useInitialState";

const PackageSelect = (props) => {
  const { focus$, onCaptureClick } = props;
  const { dataSource } = useInitialState();
  const [devicesList, setDevicesList] = useState([]);
  const [packagesList, setPackagesList] = useState([]);
  const [currentDevice, setCurrentDevice] = useState(null);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);

  useMount(() => {
    console.log("PackageSelect Mount");
    setTimeout(function () {
      getDeviceInfo();
    }, 1000);
  })

  const getDeviceInfo = () => {
    setDataLoading(true);
    dataSource
      .getDevices()
      .then((res) => {
        const { data: deviceData, message: deviceMsg } = res;
        const deviceOptions = (deviceData?.devices || []).map((item) => ({
          name: item,
          value: item,
        }))
        setDevicesList(deviceOptions);
        let fetchDevice = currentDevice;
        if (currentDevice === null || !deviceOptions.find(item => item.value === currentDevice)) {
          fetchDevice = deviceOptions[0]?.value
          setCurrentDevice(deviceOptions[0]?.value);
        }
        console.log("message", deviceMsg);
        // focus$.emit({ message: deviceMsg || 'get devices Succeed' })
        return fetchDevice;
      })
      .then(async (device) => {
        // 去请求当前的包
        console.log("device", device);
        await getPackagesList(device);
        setDataLoading(false);
      })
      .catch((error) => {
        alert(error);
      })
  }

  const getPackagesList = (device) => {
    return dataSource
      .getPackages(device)
      .then((res) => {
        const { data, message } = res;
        const options = (data?.packages || []).map((item) => ({
          name: item,
          value: item
        }))
        if (currentPackage === null || !options.find(item => item.value === currentPackage)) {
          setCurrentPackage(options[0]?.value);
        }
        setPackagesList(options);

        // focus$.emit({ message: message || 'get packages Succeed' })
      })
      .catch((error) => alert(error))
  }

  const handleDeviceChange = (value) => {
    setCurrentDevice(value);
    getPackagesList(value)
  }

  const handleChange = (value) => {
    setCurrentPackage(value)
  }

  const handleRefresh = (value) => {
    getDeviceInfo()
  }

  return (
    <Space>
      <Select
        showSearch
        style={{ minWidth: '180px' }}
        loading={dataLoading}
        placeholder="select a device"
        options={devicesList}
        value={currentDevice}
        onChange={handleDeviceChange}
      />
      <Select
        showSearch
        style={{ minWidth: '200px' }}
        loading={dataLoading}
        placeholder="select a package"
        options={packagesList}
        value={currentPackage}
        onChange={handleChange}
      />
      <Button
        onClick={handleRefresh}
      >Refresh</Button>

      <Button
        // style={{ marginLeft: '10px' }} 
        type="primary"
        disabled={!currentPackage}
        onClick={() => onCaptureClick(currentDevice, currentPackage)}
      >Capture</Button>
    </Space>
  );
};

PackageSelect.propTypes = {
  focus$: PropTypes.any,
  onCaptureClick: PropTypes.func,
}

export default PackageSelect;
