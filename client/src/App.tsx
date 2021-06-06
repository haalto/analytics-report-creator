import React, { useEffect, useState } from "react";
import {
  InMemoryCache,
  ApolloClient,
  ApolloProvider,
  useQuery,
} from "@apollo/client";
import getLastnameCounts from "./graphql/query/getLastnameCounts.query";

import { createGlobalStyle } from "styled-components";
import { BarChartElement } from "./components/Charts/BarChart";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useAppDispatch, useAppSelector } from "./hooks/store";
import { addChart, updateData } from "./store/reducers/charts";

const GlobalStyle = createGlobalStyle`

  body {
    margin: 0;
    padding: 0;
    background: whitesmoke;
    font-family: 'Baloo Tammudu 2', cursive;
  }
`;

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
});

const extractData = (data: any) => {
  const extractedData = data.allCustomers.groupedAggregates.map((d: any) => {
    const count = Number(d.distinctCount.id);
    const value = d.keys[0];
    return { count, value };
  });
  return extractedData as { value: string; count: number }[];
};

const ChartBoard = () => {
  const [chartData, setChartData] = useState<any>();
  const { data } = useQuery(getLastnameCounts);
  const dispatch = useAppDispatch();
  const rCharts = useAppSelector((state) => state.charts);

  useEffect(() => {
    if (data) {
      const extractedData = extractData(data);
      setChartData(extractedData);
    }
  }, [data]);

  if (!chartData) {
    return <div>loading</div>;
  }

  const addDataToChart = (id: string) => {
    dispatch(updateData({ id, data: chartData }));
  };

  const renderCharts = () => {
    return rCharts.charts.map((c) => (
      <BarChartElement key={c.id} {...c} addData={addDataToChart} />
    ));
  };

  const handleAddEmptyChart = () => {
    dispatch(addChart());
  };

  return (
    <>
      <button onClick={handleAddEmptyChart}>Add chart</button>
      <div>{renderCharts()}</div>
    </>
  );
};

const App = () => {
  return (
    <>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <GlobalStyle />
          <ChartBoard />
        </ApolloProvider>
      </Provider>
    </>
  );
};

export default App;
