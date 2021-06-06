import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAppDispatch } from "../../hooks/store";
import {
  duplicateChart,
  deleteChart,
  updatePosition,
} from "../../store/reducers/charts";
import { DraggableChart } from "./DraggableChart";

type Props = {
  id: string;
  data: [];
  dataKeyX: string;
  dataKeyY: string;
  x: number;
  y: number;
  width: number;
  height: number;
  addData: (id: string) => void;
};

type ExportedData = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const BarChartElement: React.FC<Props> = ({
  id,
  data,
  dataKeyX,
  dataKeyY,
  x,
  y,
  width,
  height,
  addData,
}) => {
  const dispatch = useAppDispatch();

  const handleDuplicate = () => {
    dispatch(duplicateChart({ id }));
  };

  const handleAddData = () => {
    addData(id);
  };

  const handlePostionOrResizeChange = (positionAndDimensions: ExportedData) => {
    dispatch(updatePosition({ id, ...positionAndDimensions }));
  };

  const handleDelete = () => {
    dispatch(deleteChart({ id }));
  };

  return (
    <DraggableChart
      x={x}
      y={y}
      width={width}
      height={height}
      onChange={handlePostionOrResizeChange}
    >
      <div>
        <button onClick={handleDuplicate}>Duplicate</button>
        <button onClick={handleAddData}>Add data</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, left: -35, right: 5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey={dataKeyX} />
          <YAxis dataKey={dataKeyY} />
          <Tooltip />
          <Bar dataKey={dataKeyY} fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </DraggableChart>
  );
};
