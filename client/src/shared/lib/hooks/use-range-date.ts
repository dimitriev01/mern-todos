import { useState } from 'react';
import {getDayFromNow, getPreviousWeek} from "../helpers/transform-date";

export const useRangeDate = (from?: Date, to?: Date) => {
    const [dateFrom, setDateFrom] = useState<Date>(from ?? getPreviousWeek());
    const [dateTo, setDateTo] = useState<Date>(to ?? getDayFromNow());

    return {
        from: {
            value: dateFrom,
            onChange: setDateFrom,
        },
        to: {
            value: dateTo,
            onChange: setDateTo,
        },
    };
};
