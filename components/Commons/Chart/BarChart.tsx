import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

export interface IChartItem {
  chartData: any;
  height: number;
  type: "DAY" | "MONTH" | "LABEL";
  chartTitle?: string;
  Xtitle?: string;
  Ytitle?: string;
  printData?: (item: number) => string;
}

export const BarChart = ({
  chartData,
  height,
  type,
  chartTitle,
  Xtitle,
  Ytitle,
  printData,
}: IChartItem) => {
  Chart.register(...registerables, ChartDataLabels);

  const isBarChart = chartData.datasets.some(
    (dataset: any) => dataset.type === "bar"
  );

  return (
    <div style={{ height, width: "100%" }}>
      <Bar
        data={chartData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          // 차트 레이아웃에 패딩을 주어서 라벨이 빠져나가지 않도록
          layout: {
            padding: {
              left: 0,
              right: 70,
              bottom: 20,
              top: 20,
            },
          },
          // 차트의 x,y 축 타이틀 달기
          scales: {
            x: {
              stacked: isBarChart,
              display: true,
              ticks: {
                sampleSize: 0,
              },
              title: {
                display: true,
                text: Xtitle,
              },
            },
            y: {
              stacked: isBarChart,
              type: "logarithmic",
              ticks: {
                callback: function (value: any) {
                  if (value === 1) {
                    return printData ? printData(value) : value;
                  } else if (value % 10 === 0) {
                    return printData
                      ? printData(value.toLocaleString())
                      : value.toLocaleString();
                  }
                  return "";
                },
              },
              title: {
                display: true,
                text: Ytitle,
              },
              grid: {
                color: "transparent",
                drawOnChartArea: false,
              },
            },
          },
          plugins: {
            // 차트타이틀
            title: {
              text: chartTitle,
              display: true,
              align: "start",
              color: "#000000",
              padding: { bottom: 20 },
              font: {
                weight: "normal",
              },
            },
            // 각 데이터의 표시
            legend: {
              display: true,
              position: "bottom",
              align: "center",
            },
            // 차트에 마우스 댔을 때 표시
            tooltip: {
              enabled: true,
              backgroundColor: "#f9f9f9", // 튤팁 색상
              titleColor: "#000000",
              bodyColor: "#000000",
              borderColor: "#dbdbdb",
              borderWidth: 1,
              padding: 10,
              callbacks: {
                label: (item: any) =>
                  `${item.dataset.label}: ${
                    printData
                      ? printData(item.formattedValue)
                      : item.formattedValue
                  }`,
              },
            },
            // 차트위에 표시되는 글자
            datalabels: {
              display: true,
              borderRadius: 4,
              color: "black",
              padding: 6,
              anchor: "center",
              clamp: true,
              clip: false,
              font(context) {
                return context.dataset.type !== "line"
                  ? { size: 9 }
                  : { size: 12 };
              },
              rotation: (context) => {
                // 꺾은선일때만 정방향 바차트는 수직으로
                return context.dataset.type === "line" ? 0 : 90;
              },
              formatter: (value: any, context: any) => {
                if (context.dataset.label) {
                  return type === "DAY"
                    ? printData
                      ? printData(value)
                      : value
                    : null;
                } else {
                  return null;
                }
              },
            },
          },
        }}
      />
    </div>
  );
};
