import styled from "styled-components";
import { Bar, Pie, Radar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const ChartShow = (props) => {
  console.log(props.data.width);

  // ${props => props.data.datasets[0].marginleft}
  const data = props.data;
  const type = data.datasets[0].type
  const options = props.options;

  const width = data.width;
  const margintop = data.margintop;
  const marginleft = data.marginleft;
  const size = { width, marginleft, margintop };
  console.log(size);

  return (
    <Container data={size}>
      {type === "pie" && <Pie data={data} options={options} />}
      {type === "radar" && <Radar data={data} options={options} />}
      {type === "bar" && <Bar data={data} options={options} />}
    </Container>
  );
};
export default ChartShow;

const Container = styled.div`
  margin-left: ${props => props.data.marginleft}px;
  margin-top: ${props => props.data.margintop}px;
  width: ${props => props.data.width}px;
  `;


