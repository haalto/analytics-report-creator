import React, { useState } from "react";
import { Rnd } from "react-rnd";

type ExportedData = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  children: any;
  onChange?: (data: ExportedData) => void;
};

export const DraggableChart: React.FC<Props> = ({
  x,
  y,
  width,
  height,
  children,
  onChange,
}) => {
  const [size, setSize] = useState({ width, height });
  const [position, setPosition] = useState({ x, y });

  const handleSizeChange = (widthChange: number, heightChange: number) => {
    setSize((current) => ({
      width: current.width + widthChange,
      height: current.height + heightChange,
    }));
    if (onChange) {
      onChange({ ...size, ...position });
    }
  };

  const handlePositionChange = (x: number, y: number) => {
    setPosition({ x, y });
    if (onChange) {
      onChange({ ...size, ...position });
    }
  };

  return (
    <Rnd
      default={{
        x: x,
        y: y,
        width: width,
        height: height,
      }}
      minHeight={200}
      minWidth={300}
      style={{
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        padding: "2rem",
      }}
      bounds="window"
      onDragStop={(e, d) => handlePositionChange(d.x, d.y)}
      onResizeStop={(e, d, el, p) => handleSizeChange(p.width, p.height)}
    >
      {children}
    </Rnd>
  );
};
