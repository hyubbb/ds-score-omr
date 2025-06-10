"use client";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@/components/Style/BigCalendarCustom.css";
import classNames from "classnames";
import { useCallback } from "react";

export type CalendarViewType = "month" | "day";

export interface IBigCalendar {
  propsDate: Date;
  propsView: CalendarViewType;
  onChange: (date: Date, view: string) => void;
  eventList: any[];
  eventCustom?: any;
  onEventClick?: (item: any) => void;
  btnNum?: 1 | 2;
}

export const BigCalendar = ({
  propsDate,
  propsView,
  onChange,
  eventList,
  eventCustom,
  onEventClick,
  btnNum,
}: IBigCalendar) => {
  const onNavigate = useCallback(
    (newDate: Date) => {
      onChange(newDate, propsView);
    },
    [onChange, propsView],
  );
  // 일정 더보기
  const onShowMore = useCallback(
    (events: any, date: any) => {
      onChange(date, "day");
      events;
    },
    [onChange],
  );

  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);

  // 상단 달 이동 버튼
  const Toolbar = (props: any) => {
    const { date, view } = props;

    const currentYear = new Date(propsDate).getFullYear();
    const currentMonth = new Date(propsDate).getMonth() + 1;
    const currentDate = new Date(propsDate).getDate();
    const lastDate = new Date(currentYear, currentMonth, 0).getDate();

    // 버튼 선택 시 이동
    const navigate = (action: any) => {
      let newDate = moment(date).toDate();
      if (action === "TODAY") {
        newDate = new Date();
      } else if (action === "PREV") {
        if (view === "month") {
          newDate.setMonth(newDate.getMonth() - 1);
        } else if (view === "day") {
          newDate.setDate(newDate.getDate() - 1);
        }
      } else if (action === "NEXT") {
        if (view === "month") {
          newDate.setMonth(newDate.getMonth() + 1);
        } else if (view === "day") {
          newDate.setDate(newDate.getDate() + 1);
        }
      }
      props.onNavigate(action);
      onChange(newDate, view);
    };

    // 년도 변경
    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newYear = parseInt(event.target.value);
      const newDate = new Date(propsDate);
      newDate.setFullYear(newYear);
      onNavigate(newDate);
      onChange(newDate, view);
    };

    // 달 변경
    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newMonth = parseInt(event.target.value);
      const newDate = new Date(propsDate);
      newDate.setMonth(newMonth - 1);
      newDate.setDate(1);
      onNavigate(newDate);
      onChange(newDate, view);
    };

    // 날짜 변경
    const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newDates = parseInt(event.target.value);
      const newDate = new Date(propsDate);
      newDate.setDate(newDates);
      onNavigate(newDate);
      onChange(newDate, view);
    };

    // 년도 그리기
    const renderYearOptions = () => {
      const options = [];
      const startYear = currentYear - 20;
      const endYear = currentYear + 20;
      for (let year = startYear; year <= endYear; year++) {
        options.push(
          <option key={year} value={year}>
            {year}년
          </option>,
        );
      }
      return options;
    };

    // 달 옵션 그리기
    const renderMonthOptions = () => {
      const options = [];
      for (let month = 1; month <= 12; month++) {
        options.push(
          <option key={month} value={month}>
            {month}월
          </option>,
        );
      }
      return options;
    };

    // 일 옵션 그리기
    const renderDateOptions = () => {
      const options = [];
      for (let date = 1; date <= lastDate; date++) {
        options.push(
          <option key={date} value={date}>
            {date}일
          </option>,
        );
      }
      return options;
    };

    return (
      <div
        className={classNames(
          "rbc-toolbar",
          btnNum === 1 && "one_btn",
          btnNum === 2 && "two_btn",
        )}
      >
        <div className="rbc-btn-group">
          <button type="button" onClick={() => navigate("TODAY")}>
            {view === "month" ? "이번달" : "오늘"}
          </button>
          <button type="button" onClick={() => navigate("PREV")}>
            이전
          </button>
          <button type="button" onClick={() => navigate("NEXT")}>
            다음
          </button>
        </div>
        <div className="rbc-toolbar-label">
          <select
            name="year"
            id="big-calendar-year"
            onChange={handleYearChange}
            value={currentYear}
          >
            {renderYearOptions()}
          </select>
          <select
            name="month"
            id="big-calendar-month"
            onChange={handleMonthChange}
            value={currentMonth}
          >
            {renderMonthOptions()}
          </select>
          {view === "day" && (
            <select
              name="date"
              id="big-calendar-date"
              onChange={handleDateChange}
              value={currentDate}
            >
              {renderDateOptions()}
            </select>
          )}
        </div>
        <div className="rbc-btn-group">
          <button
            type="button"
            onClick={() => {
              props.onView("month");
              onChange(date, "month");
            }}
          >
            월 단위
          </button>
          <button
            type="button"
            onClick={() => {
              props.onView("day");
              onChange(date, "day");
            }}
          >
            일 단위
          </button>
        </div>
      </div>
    );
  };

  // 상단 요일 한글로
  const dayHeader = (props: any) => {
    const { label } = props;

    const koreanDay = {
      Sun: "일",
      Mon: "월",
      Tue: "화",
      Wed: "수",
      Thu: "목",
      Fri: "금",
      Sat: "토",
    };

    return (
      <span
        className={classNames(
          label === "Sun" && "text-[#b93d3d]",
          label === "Sat" && "text-[#3e3ebb]",
        )}
      >
        {koreanDay[label as keyof typeof koreanDay]}
      </span>
    );
  };

  // 날짜별 색 지정
  const MyDateHeader = (props: any) => {
    const { label, date } = props;
    const day = new Date(date).getDay();

    const currentDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0);

    return (
      <div
        className={classNames(
          day === 0 && "sunday",
          day === 6 && "satday",
          "flex flex-row items-center justify-between p-2",
        )}
      >
        <div>{label}</div>
      </div>
    );
  };

  // 이벤트 리스트 시간대 맞추기
  const transformEvents = eventList?.map((e) => {
    const { start_at, end_at, is_all_day, ...restValue } = e;
    return {
      start: new Date(start_at),
      end: new Date(end_at),
      allDay: is_all_day ? true : false,
      ...restValue,
    };
  });

  return (
    <Calendar
      localizer={localizer}
      events={transformEvents}
      date={propsDate}
      view={propsView}
      onNavigate={onNavigate}
      startAccessor="start"
      endAccessor="end"
      views={["month", "day"]}
      style={{
        height: propsView === "month" ? 1200 : 2000,
      }}
      onSelectEvent={onEventClick}
      onShowMore={onShowMore}
      dayLayoutAlgorithm={"no-overlap"}
      components={{
        toolbar: Toolbar,
        event: eventCustom,
        month: {
          header: dayHeader,
          dateHeader: MyDateHeader,
        },
      }}
      formats={{
        timeGutterFormat: (date, culture) =>
          localizer.format(date, "hh:mm A", culture),
      }}
    />
  );
};
