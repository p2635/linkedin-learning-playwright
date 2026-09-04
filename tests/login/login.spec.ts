import { test, expect } from "../../fixtures/testData";
import { LoginPage } from "../../pages/loginPage";

test("(non-page object) show login error on wrong email and password", async ({
  page,
  testData,
}) => {
  await page.goto("/");
  await page.getByTestId("nav-sign-in").click();
  await page.getByTestId("email").fill(testData.invalidLogin.email);
  await page.getByTestId("password").fill(testData.invalidLogin.password);

  await page.getByTestId("login-submit").click();

  await expect(page.getByTestId("login-error")).toContainText(
    "Invalid email or password",
  );
});

test("(page object) show login error on wrong email and password", async ({
  page,
  testData,
}) => {
  const loginPage = new LoginPage(page);
  loginPage.goto();
  loginPage.logIn(testData.invalidLogin.email, testData.invalidLogin.password);
  await expect(page.getByTestId("login-error")).toContainText(
    "Invalid email or password",
  );
});
