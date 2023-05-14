import { arrayMove } from "@/utils/array.utils";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import cn from "classnames";
import { useState } from "react";
import { Column, useTable } from "react-table";
import { v4 } from "uuid";
import { DragIcon } from "./icons";

export type { Column as IColumn } from "react-table";

export interface ITableProps<T extends object = {}> {
  className?: string;
  columns: Column<T>[];
  data: T[];
  onChange: (value: T[]) => void;
}

const Table = <T extends object>({
  className,
  columns,
  data,
  onChange
}: ITableProps<T>) => {
  const [id] = useState(v4());
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable({
      columns,
      data,
    });
  const handleDrag = async (result: DropResult) => {
    const { destination, source } = result;
    if (!destination || destination.index === source.index) return;
    onChange(arrayMove(data, source.index, destination.index))
  };

  return (
    <DragDropContext onDragEnd={handleDrag}>
      <Droppable droppableId={id} direction="vertical">
        {(provided) => {
          return (
            <div className={cn(className)}>
              <table
                {...getTableBodyProps()}
                {...provided.droppableProps}
                ref={provided.innerRef}
                {...getTableProps()}
                className={cn(
                  "font-light bg-white divide-y text-md ",
                  className
                )}
              >
                <thead className="overflow-hidden text-xs">
                  {headerGroups.map((headerGroup, index) => (
                    <tr
                      {...headerGroup.getHeaderGroupProps()}
                      className="font-semibold text-gray-500 w-full "
                    >
                      <th className="px-4 py-1 text-left border-b border-solid border-gray-200"></th>
                      {headerGroup.headers.map((column, index) => (
                        <th
                          scope="col"
                          className="px-4 py-1 text-left border-b border-solid border-gray-200"
                          {...column.getHeaderProps({
                            style: {
                              minWidth: column.minWidth,
                              width: column.width,
                              maxWidth: column.maxWidth,
                            },
                          })}
                        >
                          <div>{column.render("Header")}</div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="font-medium text-gray-500 ">
                  {rows.map((row, index) => {
                    prepareRow(row);
                    return (
                      <Draggable
                        draggableId={row.id}
                        key={row.id}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          return (
                            <tr
                              {...row.getRowProps()}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={cn(
                                "border-b border-solid border-gray-200 last:border-b-0",
                                snapshot.isDragging && `border-b-0`
                              )}
                            >
                              <td className="px-4 py-1 align-middle ">
                                <div {...provided.dragHandleProps}>
                                  <DragIcon />
                                </div>
                              </td>
                              {row.cells.map((cell) => (
                                <td
                                  {...cell.getCellProps()}
                                  className="px-4 py-1 align-middle "
                                  key={row.id}
                                >
                                  <div>{cell.render("Cell")}</div>
                                </td>
                              ))}
                            </tr>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default Table;
