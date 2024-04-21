import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface EventDateTimeInputProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
}

const EventDateTimeInput: React.FC<EventDateTimeInputProps> = ({
  selected,
  onChange,
}) => {
  const DateTimeInput = forwardRef<HTMLInputElement>((props, ref) => (
    <input
      {...props}
      ref={ref}
      type="text"
      placeholder="Event time..?"
      className="date-time-input w-full px-3 py-1 pr-10 text-md bg-white font-work-sans focus:outline-none rounded-lg border-2 border-mint focus:border-blue resize-none"
    />
  ));

  return (
    <div className="relative px-2 mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-md font-montserrat-alt pl-2">
          When's it happening?
        </span>
      </div>
      <DatePicker
        selected={selected}
        onChange={onChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeCaption="Time"
        dateFormat="dd/MM/yy HH:mm"
        customInput={<DateTimeInput />}
        popperPlacement="bottom-end"
        popperModifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 10],
            },
            fn: () => ({}),
          },
          {
            name: "preventOverflow",
            options: {
              rootBoundary: "viewport",
              tether: false,
              altAxis: true,
            },
            fn: () => ({}),
          },
        ]}
        calendarClassName="text-black bg-white font-montserrat-alt border-2 border-blue border-dashed rounded-lg shadow-lg"
        dayClassName={(date: Date) =>
          date.getDate() === selected?.getDate() ? "selected" : null
        }
      />
    </div>
  );
};

export default EventDateTimeInput;
