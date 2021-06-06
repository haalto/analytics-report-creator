import gql from "graphql-tag";

export default gql`
  query getLastnameCounts {
    allCustomers {
      groupedAggregates(groupBy: LAST_NAME) {
        keys
        distinctCount {
          id
        }
      }
    }
  }
`;
