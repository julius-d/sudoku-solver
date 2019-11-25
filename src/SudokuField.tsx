import React, {useMemo} from "react";

interface SudokuFieldProps {
  rowNumber: number,
  colNumber: number,
  foundNumber: number | undefined,
  cantBes: number[],
  fieldName :string,
  handleChange : () => void
}

function createBorderClassName(rowNumber: number, colNumber: number) {
  let classNames = "";
  if (rowNumber % 3 === 0) {
    classNames += "strong-border-top ";
  }
  if ((rowNumber+1) % 3 === 0) {
    classNames += "strong-border-bottom ";
  }
  if ((colNumber+1) % 3 === 0) {
    classNames += "strong-border-right ";
  } if ((colNumber) % 3 === 0) {
    classNames += "strong-border-left ";
  }
  return classNames;

}

const SudokuField: React.FunctionComponent<SudokuFieldProps> = React.memo((props) => {
  const {rowNumber, colNumber, foundNumber, cantBes, handleChange, fieldName} = props;

  const borderClassName = createBorderClassName(rowNumber, colNumber);
  return <td className={`tg-0lax ${borderClassName}`}>
    {foundNumber ?
        <strong style={{fontSize  : 20}}>{foundNumber}</strong> :

        <><input type="text"
                 maxLength={1}
                 size={1}
                 name={fieldName}
                 value={""}
                 onChange={handleChange}
                 autoComplete="sudoku"
        />
          <br/><s>{cantBes.join()}</s>
        </>}
  </td>;
});

export default SudokuField;
