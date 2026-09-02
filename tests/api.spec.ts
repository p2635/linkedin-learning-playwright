import { test, expect } from "@playwright/test";

const API_BASE_URL = "https://api.practicesoftwaretesting.com";
const EXPECTED_COUNT_PRODUCT_ITEMS = 9;
const EXPECTED_COUNT_PRODUCT_ITEMS_TOTAL = 50;

test.describe("Products API", async () => {
  const API_URL = API_BASE_URL + "/products";

  test("GET test", async ({ request }) => {
    const RESPONSE = await request.get(API_URL);
    const BODY = await RESPONSE.json();

    expect(RESPONSE.status()).toBe(200);
    expect(BODY.data.length).toBe(EXPECTED_COUNT_PRODUCT_ITEMS);
    expect(BODY.total).toBe(EXPECTED_COUNT_PRODUCT_ITEMS_TOTAL);
  });
});

test.describe("Login API", async () => {
  const API_URL = API_BASE_URL + "/users/login";
  const USER = "customer3@practicesoftwaretesting.com";
  const PASS = "welcome01";

  test("POST test", async ({ request }) => {
    const RESPONSE = await request.get(API_URL, {
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
