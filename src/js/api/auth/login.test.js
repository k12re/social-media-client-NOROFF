import { apiPath } from "../constants.js";
import { headers } from "../headers.js";
import { login } from "./login.js";

const email = "kenthore@noroff.no";
const password = "123123123";
// const accessToken = "testToken";

describe("login function", () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  const localStorageMock = {
    setItem: jest.fn(),
    getItem: jest.fn(),
    clear: jest.fn(),
  };

  global.localStorage = localStorageMock;

  it("fetches and stores token in localStorage", async () => {
    const mockResponse = {
      ok: true,
      json: () =>
        Promise.resolve({
          accessToken: "testToken",
          name: "kenthore",
          email: "kenthore@noroff.no",
        }),
    };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    await login(email, password);

    expect(fetch).toHaveBeenCalledWith(`${apiPath}/social/auth/login`, {
      method: "post",
      body: JSON.stringify({
        email: "kenthore@noroff.no",
        password: "123123123",
      }),
      headers: headers("application/json"),
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "token",
      '"testToken"'
    );
    expect(localStorageMock.getItem).toHaveBeenCalledWith("token");
    expect(localStorageMock.getItem("token")).toBe('"testToken"');
  });
});
