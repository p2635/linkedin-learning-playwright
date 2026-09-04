import { test as base } from "@playwright/test";

type TestData = {
  invalidLogin: { email: string; password: string };
};

export const test = base.extend<{ testData: TestData }>({
  testData: async ({}, use) => {
    await use({
      invalidLogin: { email: "fake@fake.com", password: "fakepass" },
    });
  },
});

export { expect } from "@playwright/test";
