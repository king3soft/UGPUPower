import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export const DemoChart = () => {
    //   const [seriesData, setSeriesData] = useState([]);
    const [gpuLineData, setGpuLineData] = useState({
        chart: {
            type: 'line',
            animation: false // Disable animations
        },
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

    useEffect(() => {
        const interval = setInterval(() => {
            const newSeriesData = gpuLineData.series.map((series, index) => {
                const newDataPoint = Math.floor(Math.random() * 20) + 5;
                return {
                    name: `Series ${index + 1}`,
                    data: [...series.data, newDataPoint]
                };
            });
            setGpuLineData({ ...gpuLineData, series: newSeriesData });
        }, 1000);

        return () => clearInterval(interval);
    }, [gpuLineData]);

    // Function to add a new line
    const addLine = () => {
        const newLineNumber = gpuLineData.series.length + 1;
        setGpuLineData([...gpuLineData.series, {
            name: `Series ${newLineNumber}`,
            data: []
        }]);
    };

    // Function to remove the last line
    const removeLine = () => {
        if (gpuLineData.series.length > 0) {
            const updatedSeriesData = [...gpuLineData.series];
            updatedSeriesData.pop();
            setGpuLineData({ ...gpuLineData, series: updatedSeriesData });
        }
    };

    return (
        <div>
            <button onClick={addLine}>Add Line</button>
            <button onClick={removeLine}>Remove Line</button>
            <HighchartsReact highcharts={Highcharts} options={gpuLineData} />
        </div>
    );
};

export default DemoChart;