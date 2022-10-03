import styled from "styled-components";
import { Bar, Pie, Radar, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";

const ChartShow = (props) => {
  // ${props => props.data.datasets[0].marginleft}
  const data = props.data;
  const type = data.datasets[0].type;
  const options = props.options;

  const width = data.width;
  const mwidth = data.mwidth;
  const margintop = data.margintop;
  const marginleft = data.marginleft;
  const size = { width, mwidth, marginleft, margintop };

  return (
    <Container data={size}>
      {type === "pie" && <Pie data={data} options={options} />}
      {type === "radar" && <Radar data={data} options={options} />}
      {type === "bar" && <Bar data={data} options={options} />}
      {type === "doughnut" && <Doughnut data={data} options={options} />}
    </Container>
  );
};
export default ChartShow;

const Container = styled.div`
  margin-left: ${(props) => props.data.marginleft}vw;
  margin-top: ${(props) => props.data.margintop}vw;
  width: ${(props) => props.data.width}vw;
  @media screen and (max-width: 750px) {
    width: ${(props) => props.data.mwidth}px;
  }
`;
