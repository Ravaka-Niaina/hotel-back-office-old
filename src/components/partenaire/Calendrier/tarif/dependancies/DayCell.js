import Cell from './Cell';

const DayCell = ({
  x,
  y,
  selectDay,
  deselectDay,
  highlight,
  selectOneDay,
  data,
  isprice,
}) => {

  return Cell({
    x,
    y,
    selectDay,
    deselectDay,
    selectOneDay,
    highlight,
    content: data ? data + ((isprice) ? ' Є' : '') : '',
  });

}

export default DayCell;