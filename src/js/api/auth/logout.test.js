import { logout } from "./logout.js";

describe("logout function", () => {
  global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  };

  it("clears token", () => {
    const fakeToken = "token";
    localStorage.setItem("token", fakeToken);

    logout();

    expect(localStorage.getItem("token")).toBeUndefined();
  });
});
