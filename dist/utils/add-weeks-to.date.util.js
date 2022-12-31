"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addWeeksToDate = void 0;
const addWeeksToDate = (dateObj, numberOfWeeks) => {
    dateObj.setDate(dateObj.getDate() + numberOfWeeks * 7);
    return dateObj;
};
exports.addWeeksToDate = addWeeksToDate;
