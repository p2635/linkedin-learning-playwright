import { test, expect } from "@playwright/test";

const API_BASE_URL = "https://api.practicesoftwaretesting.com";
const EXPECTED_COUNT_PRODUCT_ITEMS = 9;
const EXPECTED_COUNT_PRODUCT_ITEMS_TOTAL = 51;

test.describe("Products API", async () => {
  test("GET test", async ({ request }) => {
    const RESPONSE = await request.get(API_BASE_URL + "/products");
    const BODY = await RESPONSE.json();

    expect(RESPONSE.status()).toBe(200);
    expect(BODY.data.length).toBe(EXPECTED_COUNT_PRODUCT_ITEMS);
    expect(BODY.total).toBe(EXPECTED_COUNT_PRODUCT_ITEMS_TOTAL);
  });
});

test.describe("Login", async () => {
  const USER = "customer2@practicesoftwaretesting.com";
  const PASS = "welcome01";

  test("POST test", async ({ request }) => {
    const RESPONSE = await request.get(API_BASE_URL + "/users/login", {
      data: {
        email: USER,
        password: PASS,
      },
    });
    const BODY = await RESPONSE.json();
    expect(RESPONSE.status()).toBe(200);
    expect(BODY.access_token).toBeTruthy();
  });
});
