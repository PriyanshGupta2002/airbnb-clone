// "use client";
// import React from "react";
// import { DateRange, Range, RangeKeyDict } from "react-date-range";
// import "react-date-range/dist/styles.css"; // main style file
// import "react-date-range/dist/theme/default.css"; // theme css file
// interface CalendarProps {
//   value: Range;
//   disabledDates?: Date[];
//   onChange: (value: RangeKeyDict) => void;
// }
// const Calendar: React.FC<CalendarProps> = ({
//   disabledDates,
//   onChange,
//   value,
// }) => {
//   return (
//     <div>
//       <DateRange
//         rangeColors={["#262626"]}
//         ranges={[value]}
//         date={new Date()}
//         onChange={onChange}
//         className="w-full"
//         direction="vertical"
//         showDateDisplay={false}
//         minDate={new Date()}
//         disabledDates={disabledDates}
//       />
//     </div>
//   );
// };

// export default Calendar;

"use client";
import React from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
interface CalendarProps {
  value: Range;
  disabledDates?: Date[];
  onChange: (value: RangeKeyDict) => void;
}
const Calendar: React.FC<CalendarProps> = ({
  disabledDates,
  onChange,
  value,
}) => {
  return (
    <div>
      <DateRange
        rangeColors={["#262626"]}
        ranges={[value]}
        date={new Date()}
        onChange={onChange}
        direction="vertical"
        showDateDisplay={false}
        minDate={new Date()}
        disabledDates={disabledDates}
      />
    </div>
  );
};

export default Calendar;
