import { test, expect } from "@playwright/test";

const API_BASE_URL = process.env.API_BASE_URL;
const EXPECTED_COUNT_PRODUCT_ITEMS = 9;
const EXPECTED_COUNT_PRODUCT_ITEMS_TOTAL = 50;

test.describe("Products API", async () => {
  const API_URL = `${API_BASE_URL}/products`;

  test("retrieve products and verify length and total", async ({ request }) => {
    const RESPONSE = await request.get(API_URL);
    const BODY = await RESPONSE.json();

    expect(RESPONSE.status()).toBe(200);
    expect(BODY.data.length).toBe(EXPECTED_COUNT_PRODUCT_ITEMS);
    expect(BODY.total).toBe(EXPECTED_COUNT_PRODUCT_ITEMS_TOTAL);
  });

  test("GET Combination Pliers data", async ({ request }) => {
    // Get ID for Combination Pliers (because it changes every 2 hours)
    const search = await request.get(`${API_URL}/search`, {
      data: {
        q: "combination pliers",
      },
    });
    const searchJson = await search.json();
    const pliersId = searchJson.data[0].id;
    console.log(`The ID for Combination Pliers is ${pliersId}`);

    // Get product details for the pliers
    const RESPONSE = await request.get(`${API_URL}/${pliersId}`);
    const BODY = await RESPONSE.json();

    expect(RESPONSE.status()).toBe(200);
    expect(BODY.id).toBe(pliersId);
    expect(BODY.name).toBe("Combination Pliers");
    expect(BODY.description).toBe(
      "Versatile combination pliers designed for gripping, bending, and cutting wire with ease. Featuring chrome vanadium steel construction with induction-hardened cutting edges, these pliers deliver excellent grip and leverage for a wide range of tasks. The precision-machined jaws combine flat gripping surfaces with a pipe-grip section and integrated wire cutter for true multi-purpose functionality. Ergonomic bi-component handles reduce hand fatigue during extended use and provide a secure hold even with oily or gloved hands. The joint is precisely fitted to eliminate play and ensure smooth operation over thousands of cycles. Ideal for electricians, mechanics, and DIY enthusiasts tackling everyday projects around the workshop or job site.",
    );
  });
});

test.describe("Login API", async () => {
  const API_URL = `${API_BASE_URL}/users/login`;
  const USER = "customer3@practicesoftwaretesting.com";
  const PASS = "welcome01";

  test("POST test", async ({ request }) => {
    const RESPONSE = await request.post(API_URL, {
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
