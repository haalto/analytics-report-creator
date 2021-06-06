import { jsToDb, camelToSnakeCase, renameKeysWith } from "./helpers";

describe("Test functions to convert camel cases to snake cases", () => {
  test("Convert camel case to snake case", () => {
    expect(camelToSnakeCase("firstName")).toStrictEqual("first_name");
  });

  test("Rename keys", () => {
    expect(
      renameKeysWith(camelToSnakeCase, { firstName: "moro" })
    ).toStrictEqual({
      first_name: "moro",
    });
  });

  test("Convert objects keys to snake case", () => {
    expect(jsToDb({ firstName: "Hannes" })).toStrictEqual({
      first_name: "Hannes",
    });
  });
});
