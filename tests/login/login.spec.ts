import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";

test("(non-page object) show login error on wrong email and password", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByTestId("nav-sign-in").click();
  await page.getByTestId("email").fill("fake@fake.com");
  await page.getByTestId("password").fill("fakepass");

  await page.getByTestId("login-submit").click();

  await expect(page.getByTestId("login-error")).toContainText(
    "Invalid email or password",
  );
});

test("(page object) show login error on wrong email and password", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  loginPage.goto();
  loginPage.logIn("fake@fake.com", "fakepass");
  await expect(page.getByTestId("login-error")).toContainText(
    "Invalid email or password",
  );
});
