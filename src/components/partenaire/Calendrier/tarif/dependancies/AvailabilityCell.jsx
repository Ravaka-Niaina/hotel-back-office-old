import Cell from './Cell';

function AvailabilityCell ({
    highlight,
    selectDay,
    deselectDay,
    selectOneDay,
    x,
    y,
    closed,
}) {

    return Cell({
      x,
      y,
      selectDay,
      deselectDay,
      selectOneDay,
      highlight,
      cellHeight: 22.25,
      cellContentStyle: {
        height: "15px",
        backgroundColor: ( highlight ? closed ? '#eb8383' : '#96ebac' : closed ? '#FF0000' : '#64E986' ),
        marginTop: "-12px"
      },
      removeDefaultColor: true,
    });
    
}

export default AvailabilityCell;