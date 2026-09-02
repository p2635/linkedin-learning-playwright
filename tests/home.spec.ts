import { test, expect } from "@playwright/test";

const CUST01_AUTH_PATH = ".auth/customer01.json";
const EXPECTED_PAGE_TITLE = "Practice Software Testing - Toolshop - v5.0";
const EXPECTED_COUNT_PRODUCT_ITEMS = 9;

test.describe("Home page not logged in", () => {
  test.beforeEach("go to homepage", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("assert page title", async ({ page }) => {
    await expect(page).toHaveTitle(EXPECTED_PAGE_TITLE);
  });

  test("assert sign in button exists", async ({ page }) => {
    await expect(page.getByTestId("nav-sign-in")).toBeVisible();
  });

  // Flaky - the page doesn't always fully load and therefore wrong count is fetched
  test("assert product item count with locator assertion", async ({ page }) => {
    const ITEMS = page.getByTestId("product-name");
    await expect(ITEMS).toHaveCount(EXPECTED_COUNT_PRODUCT_ITEMS);
  });

  // Flaky - the page doesn't always fully load and therefore wrong count is fetched
  test("assert product item count with expect assertion", async ({ page }) => {
    const ITEMS = page.getByTestId("product-name");
    expect(await ITEMS.count()).toBe(EXPECTED_COUNT_PRODUCT_ITEMS);
  });

  test("search for Thor Hammer", async ({ page }) => {
    await page.getByTestId("search-query").fill("thor");
    await page.getByTestId("search-submit").click();
    await expect(
      page.getByTestId("product-name").getByText("Thor Hammer"),
    ).toBeVisible();
  });

  test("visual test", { tag: "@visual" }, async ({ page }) => {
    await expect(page).toHaveScreenshot("homepage-not-logged-in.png", {
      mask: [page.getByTitle("Practice Software Testing - Toolshop")],
    });
  });
});

test.describe("Home page logged in as cust01", () => {
  test.use({ storageState: CUST01_AUTH_PATH });

  test.beforeEach("go to homepage", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("assert customer 01 is signed in", async ({ page }) => {
    await expect(page.getByTestId("nav-sign-in")).not.toBeVisible();
    await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
  });

  test("visual test authorised", { tag: "@visual" }, async ({ page }) => {
    await expect(page).toHaveScreenshot("homepage-cust-01.png", {
      mask: [page.getByTitle("Practice Software Testing - Toolshop")],
    });
  });
});
