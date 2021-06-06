import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBarChart } from "../../types";
import { v1 } from "uuid";

interface ChartsState {
  charts: IBarChart[];
}

interface PositionPayload {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface UpdateDataPayload {
  id: string;
  data: [];
}

interface DuplicateChartPayload {
  id: string;
}

interface RemoveChartPayload {
  id: string;
}

interface NewPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

const initialState: ChartsState = {
  charts: [
    {
      id: v1(),
      x: 294,
      y: 13,
      width: 1053,
      height: 576,
      dataKeyX: "value",
      dataKeyY: "count",
      data: [],
    },
  ],
};

export const chartsSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {
    updatePosition: (state, action: PayloadAction<PositionPayload>) => {
      const chart = state.charts.find((c) => c.id === action.payload.id);
      if (chart) {
        const updatedChart = updateChartPosition(chart, {
          x: action.payload.x,
          y: action.payload.y,
          width: action.payload.width,
          height: action.payload.height,
        });
        state.charts = state.charts
          .filter((c) => c.id !== action.payload.id)
          .concat(updatedChart);
      }
    },
    updateData: (state, action: PayloadAction<UpdateDataPayload>) => {
      const chart = state.charts.find((c) => c.id === action.payload.id);
      if (chart) {
        const updatedChart = { ...chart, data: action.payload.data };
        state.charts = state.charts
          .filter((c) => c.id !== action.payload.id)
          .concat(updatedChart);
      }
    },
    duplicateChart: (state, action: PayloadAction<DuplicateChartPayload>) => {
      const chart = state.charts.find((c) => c.id === action.payload.id);
      if (chart) {
        const duplicatedChart = {
          ...chart,
          x: chart.x + 20,
          y: chart.y + 20,
          id: v1(),
        };
        state.charts = state.charts.concat(duplicatedChart);
      }
    },
    deleteChart: (state, action: PayloadAction<RemoveChartPayload>) => {
      state.charts = state.charts.filter((c) => c.id !== action.payload.id);
    },

    addChart: (state) => {
      const emptyChart = generateEmptyChart();
      state.charts = state.charts.concat(emptyChart);
    },
  },
});

const updateChartPosition = (chart: IBarChart, newPosition: NewPosition) => {
  return { ...chart, ...newPosition };
};

const generateEmptyChart = (): IBarChart => {
  return {
    id: v1(),
    x: 200,
    y: 500,
    width: 400,
    height: 600,
    dataKeyX: "value",
    dataKeyY: "count",
    data: [],
  };
};

export const {
  updatePosition,
  updateData,
  duplicateChart,
  deleteChart,
  addChart,
} = chartsSlice.actions;

export default chartsSlice.reducer;
