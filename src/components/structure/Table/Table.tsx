import React, { useMemo } from 'react'
import { Box } from '../Box/Box'
import { Divider } from '../Divider/Divider'
import { BodyText } from '../../text'
import { Cell } from './Cell/Cell'

export type TableCell = string | React.ReactNode

export interface TableProps {
  /**
   * List of column headings.
   */
  headings: React.ReactNode[]
  /**
   * List of data cells to display in Table.
   */
  rows: TableCell[][]
  /**
   * Importance of each column. This uses `flex` property behind the scenes.
   * For example: a column with importance 2 will appear twice as large as a column with importance 1.
   *
   * By default, all columns have an importance of 1.
   */
  columnsImportance?: number[]
}

/**
 * Organize and display data in a Table fashion.
 */
export const Table: React.FC<TableProps> = ({ headings, rows, columnsImportance = [] }) => {
  const headingsItems = useMemo(
    () =>
      headings.map((x, index) => _createCellFromDescriptor(x, 0, index, columnsImportance, true)),
    [headings, columnsImportance],
  )

  const rowsItems = useMemo(
    () =>
      rows.map((row, rowIndex) => (
        <Box key={rowIndex} horizontal>
          {row.map((x, index) =>
            _createCellFromDescriptor(x, rowIndex + 1, index, columnsImportance),
          )}
        </Box>
      )),
    [rows, columnsImportance],
  )

  return (
    <Box>
      <Box horizontal>{headingsItems}</Box>
      <Divider />
      {rowsItems}
    </Box>
  )
}

const _createCellFromDescriptor = (
  cell: TableCell,
  row: number,
  columnIndex: number,
  columnsImportance: number[],
  heading = false,
): JSX.Element => (
  <Cell key={row + '-' + columnIndex} flex={columnsImportance[columnIndex] ?? 1}>
    <BodyText variation={heading ? 'strong' : undefined}>{cell}</BodyText>
  </Cell>
)
