import { test as setup, expect } from "@playwright/test";

setup("authenticate as customer 01", async ({ page, context }) => {
  const USER = process.env.TEST_CUSTOMER01_EMAIL!;
  const PASS = process.env.TEST_CUSTOMER01_PASSWORD!;
  const AUTH_FILE = ".auth/customer01.json";

  await page.goto("/");
  await page.getByTestId("nav-sign-in").click();
  await page.getByTestId("email").fill(USER);
  await page.getByTestId("password").fill(PASS);
  await page.getByTestId("login-submit").click();

  await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
  await expect(page.getByTestId("page-title")).toContainText("My account");

  await page.context().storageState({ path: AUTH_FILE });
});
