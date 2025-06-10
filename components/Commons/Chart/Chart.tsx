import { useCallback } from "react";
import { BarChart } from "./BarChart";
import {
  formatDateString,
  formatMonthString,
} from "@/libs/utils/format/formatDate";
import classNames from "classnames";
import { addCommasToNumber } from "@/libs/utils/format/formatNumber";
import Spinner from "../Spinner/Spinner";

interface IchartStyle {
  title: string; // 이름
  borderColor?: string; // 보더색
  backgroundColor?: string; // 배경색
  isSum?: boolean; // 합계인지
  value?: string; //값
  isBar?: boolean; // 바 차트 여부
}

type ChartItemDateType = {
  date: string; //날짜
};
type ChartItemNumberType = {
  [key: string]: number; //숫자
};
type ChartItemType = ChartItemDateType | ChartItemNumberType; //날짜+숫자

type ChartTotalsType = {
  key: string;
  title: string;
  value: string | number;
};

type chartDataType = {
  totals: ChartTotalsType[]; // 전 기간 값
  items: ChartItemType[]; // 날짜별 아이템들
};

type chartContentType = {
  title?: string; // 차트제목
  Xtitle?: string; // x축제목
  Ytitle?: string; // y축제목
  printData?: (item: number | string) => string; // 차트 데이터 표시하는 조건
};

type Ichart = {
  labels: IchartStyle[]; //라벨들
  chartData: chartDataType; //데이터
  type: "DAY" | "MONTH" | "LABEL"; //타입
  isTotal?: boolean; // 총합을 보여줄건지
  chartStyle?: chartContentType; // 차트 관련 데이터
  displayOption?: React.ReactNode;
  isLoading?: boolean; // 로딩바
  defaultBgColors?: string[]; // 디폴트 배경색
  height: number;
};

export const Chart = ({
  labels,
  chartData,
  type,
  isTotal = false,
  chartStyle,
  displayOption,
  isLoading,
  defaultBgColors,
  height,
}: Ichart) => {
  const countChartData = useCallback(() => {
    return {
      labels:
        type === "DAY"
          ? chartData?.items?.map((data: any) => formatDateString(data.date))
          : type === "MONTH"
            ? chartData?.items?.map((data: any) => formatMonthString(data.date))
            : type === "LABEL"
              ? chartData?.totals?.map((data: any) => data.title)
              : [], // Fallback in case none of the types match
      datasets: labels.map((label: IchartStyle) => {
        const dataPoints = chartData?.totals?.map((data: any) => {
          return data.key === label.value ? data.value : null;
        });
        // .filter((value) => value !== null); // null 값을 제거

        // 막대그래프
        if (label.isBar)
          return {
            type: "bar" as const,
            label: label.title,
            data: dataPoints,
            borderColor: label.borderColor,
            backgroundColor: label.backgroundColor,
            fill: true,
            barPercentage: 0.7,
            categoryPercentage: 0.8,
          };
        // 꺾은선 그래프
        else if (!label.isBar)
          return {
            type: "line" as const,
            label: label.title,
            borderColor: label.borderColor,
            backgroundColor: label.backgroundColor,
            borderWidth: 1,
            fill: false,
            borderDash: [2, 2],
            data: chartData?.items?.map((data: any) =>
              Math.floor(data[label?.value as string] ?? 0),
            ),
            pointRadius: 4,
            pointBackgroundColor: label.backgroundColor,
            datalabels: {
              align: "end",
              anchor: "end",
            },
            spanGaps: true,
          };
        else
          return {
            type: "line" as const,
            label: label.title,
            borderColor: label.borderColor,
            backgroundColor: label.backgroundColor,
            borderWidth: 1,
            fill: false,
            borderDash: [2, 2],
            data: chartData?.items?.map((data: ChartItemType) => {
              const { date, ...restValue } = data;
              const sum = Object.values(restValue).reduce(
                (acc, val) => acc + val,
                0,
              );
              return Math.floor(sum);
            }),
            pointRadius: 4,
            pointBackgroundColor: label.backgroundColor,
            datalabels: {
              align: "end",
              anchor: "end",
            },
            spanGaps: true,
          };
      }),
    };
  }, [chartData, type, labels]);

  return (
    <>
      {/* 토탈값 표시 */}
      {isTotal &&
        (isLoading || !chartData ? (
          <div className="relative min-h-[190px] w-full">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {chartData.totals.map((total, index) => {
              // 배경색
              const bgcolor =
                labels.find((label) => label.value === total.key)
                  ?.backgroundColor ?? defaultBgColors?.[index];
              // 시작일
              const startAt = chartData.items[0].date;
              const endAt = chartData.items[chartData.items.length - 1].date;

              return (
                <div
                  key={`totals_${total.title}`}
                  className={classNames(
                    "border-grayDB flex flex-col justify-between gap-4 border bg-white p-8",
                    "min-h-[190px]",
                  )}
                  style={{
                    backgroundColor: bgcolor,
                  }}
                >
                  <div className="flex flex-col flex-wrap justify-center gap-2">
                    <span className="text-md shrink-0">{total.title}</span>
                    <span className="shrink-0 text-xs font-light">
                      ({startAt} ~ {endAt})
                    </span>
                    {displayOption && (
                      <div className="text-xs font-light">{displayOption}</div>
                    )}
                  </div>
                  <p className="text-right text-lg font-bold">
                    {chartStyle?.printData
                      ? chartStyle?.printData(addCommasToNumber(total.value))
                      : total.value}
                  </p>
                </div>
              );
            })}
          </div>
        ))}
      {isLoading ? (
        <div className="relative h-[500px] w-full">
          <Spinner />
        </div>
      ) : (
        <BarChart
          chartData={countChartData()}
          height={height}
          type={type}
          chartTitle={chartStyle?.title}
          Xtitle={chartStyle?.Xtitle}
          Ytitle={chartStyle?.Ytitle}
          printData={chartStyle?.printData}
        />
      )}
    </>
  );
};
