import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Theme from "highcharts/themes/brand-dark";
import PropTypes from "prop-types"
Theme(Highcharts);

const TempChart = (props) => {
  const { lineOption } = props;
  return (
    <HighchartsReact
      containerProps={{
        style: { height: "50%" },
      }}
      highcharts={Highcharts}
      options={{
        ...lineOption,
        credits: {
          enabled: false,
        },
        title: {
          text: props?.title || "Unkown",
          floating: false,
          align: "left",
        },
        chart: {
          type: "line",
          animation: false // Disable animations
        },
        accessibility: {
          enabled: false
        },        
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
        },
        plotOptions: {
          series: {
            animation: true,
          },
        },
      }}
    />
  )
}

TempChart.propTypes = {
  lineOption: PropTypes.any,
  title: PropTypes.string,
}

export default TempChart;
