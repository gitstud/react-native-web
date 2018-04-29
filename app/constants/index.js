import moment from 'moment';

export const SKILLS = [
  'PRO',
  'ABOUT SCRATCH',
  'ADVANCED',
  'EXPERIENCED',
  'INTERMEDIATE',
  'BEGINNER',
  'NEWBIE',
];

export const MONTHS = [
  { value: 'JANUARY' },
  { value: 'FEBRUARY' },
  { value: 'MARCH' },
  { value: 'APRIL' },
  { value: 'MAY' },
  { value: 'JUNE' },
  { value: 'JULY' },
  { value: 'AUGUST' },
  { value: 'SEPTEMBER' },
  { value: 'OCTOBER' },
  { value: 'NOVEMBER' },
  { value: 'DECEMBER' },
];

const MONTH_INDEX = [
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER',
];

export const DAYS = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
];

export const TIMES = [
  '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
];

export function getMonth() {
  return MONTH_INDEX[moment().month()];
}

export function getYear() {
  return moment().year();
}

export function daysInMonth(month, year) {
  const m = moment().month(month);
  return moment(m).daysInMonth();
}

export function findFirstDay(month, year) {
  const firstDay = new Date(year, [...MONTH_INDEX].indexOf(month), 1);
  return moment(firstDay).day();
}

export function parseDay(month, day) {
  let d = moment().set('month', month);
  d = moment(d).set('date', Number(day));
  d = moment(d).set('hour', 0);
  d = moment(d).set('minute', 0);
  d = moment(d).set('second', 0);
  d = moment(d).set('millisecond', 0);
  return {date: d.get('date'), day: DAYS[d.day()], timeStamp: d};
}
