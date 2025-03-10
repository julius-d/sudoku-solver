import React from "react";

interface SudokuFieldProps {
  rowNumber: number;
  colNumber: number;
  foundNumber: number | undefined;
  cantBes: number[];
  fieldName: string;
  numberFoundBy: string;
  handleChange: () => void;
  highlight: boolean;
}

function createBorderClassName(rowNumber: number, colNumber: number) {
  let classNames = "";
  if (rowNumber % 3 === 0) {
    classNames += "strong-border-top ";
  }
  if ((rowNumber + 1) % 3 === 0) {
    classNames += "strong-border-bottom ";
  }
  if ((colNumber + 1) % 3 === 0) {
    classNames += "strong-border-right ";
  }
  if (colNumber % 3 === 0) {
    classNames += "strong-border-left ";
  }
  return classNames;
}

const SudokuField: React.FunctionComponent<SudokuFieldProps> = React.memo(
  (props) => {
    const {
      rowNumber,
      colNumber,
      foundNumber,
      cantBes,
      handleChange,
      fieldName,
      numberFoundBy,
      highlight,
    } = props;

    const borderClassName = createBorderClassName(rowNumber, colNumber);
    const numberFoundByUser = numberFoundBy === "USER";
    const highlightForFound = foundNumber && !numberFoundByUser;
    return (
      <td
        className={`tg-0lax ${borderClassName} ${
          highlightForFound ? "highlight-found" : ""
        }
        ${highlight ? "highlight" : ""}
        `}
      >
        {foundNumber ? (
          <div
            style={{
              fontSize: 24,
              fontWeight: numberFoundByUser ? "bold" : "normal",
            }}
          >
            {foundNumber}
          </div>
        ) : (
          <>
            <input
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              maxLength={1}
              size={1}
              name={fieldName}
              value={""}
              onChange={handleChange}
              autoComplete="sudoku"
            />
            <br />
            <s>{cantBes.join(" ")}</s>
          </>
        )}
      </td>
    );
  },
);

export default SudokuField;
