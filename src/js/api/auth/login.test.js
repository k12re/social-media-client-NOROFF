import { login } from "./login.js";

const email = "kenthore@noroff.no";
const password = "123123123";

describe("login function", () => {
  class LocalStorageMock {
    constructor() {
      this.store = {};
    }
    clear() {
      this.store = {};
    }
    getItem(key) {
      return this.store[key] || null;
    }
    setItem(key, value) {
      this.store[key] = String(value);
    }
    removeItem(key) {
      delete this.store[key];
    }
  }

  const localStorageMock = new LocalStorageMock();
  const getItemSpy = jest.spyOn(localStorageMock, "getItem");
  const setItemSpy = jest.spyOn(localStorageMock, "setItem");
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

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith("token", '"testToken"');
    expect(localStorage.getItem).toHaveBeenCalledWith("token");
    expect(localStorage.getItem("token")).toBe('"testToken"');
  });
});
