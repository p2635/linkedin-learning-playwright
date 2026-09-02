import { test, expect } from "@playwright/test";

test("show login error on wrong email and password", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("nav-sign-in").click();
  await page.getByTestId("email").fill("fake@fake.com");
  await page.getByTestId("password").fill("fakepass");

  await page.getByTestId("login-submit").click();

  await expect(page.getByTestId("login-error")).toContainText(
    "Invalid email or password",
  );
});
