import { test, expect } from "@playwright/test";

test.describe("Checkout tests", () => {
  test("Buy first item as guest happy path", async ({ page }) => {
    await page.goto("/");

    // Add item to cart
    await page.getByAltText("Combination Pliers").click();
    await page.getByTestId("add-to-cart").click();

    // Navigate to cart and go through payment process
    await page.getByTestId("nav-cart").click();
    await page.getByTestId("proceed-1").click();
    await page.getByRole("tab", { name: "Continue as Guest" }).click();
    await page.getByTestId("guest-email").fill("my@email.com");
    await page.getByTestId("guest-first-name").fill("John");
    await page.getByTestId("guest-last-name").fill("Doe");
    await page.getByTestId("guest-submit").click();
    await page.getByTestId("proceed-2-guest").click();
    await page.getByTestId("country").selectOption("AL");
    await page.getByTestId("postal_code").fill("5555");
    await page.getByTestId("house_number").fill("55");
    await page.getByTestId("proceed-3").click();
    await page.getByTestId("payment-method").selectOption("buy-now-pay-later");
    await page.getByTestId("monthly_installments").selectOption("3");
    await page.getByTestId("finish").click();

    await expect(page.locator(".help-block")).toHaveText(
      "Payment was successful",
    );
    await expect(page.getByTestId("payment-success-message")).toContainText(
      "Payment was successful",
    );
    await expect(page).toHaveScreenshot("checkout-happy-path.png");
  });
});
