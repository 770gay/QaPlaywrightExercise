import { test } from "@playwright/test";
import { SearchService } from "../services/searchService";
import { CartService } from "../services/cartService";
import { LoginService } from "../services/loginService";
import * as data from "../data/testData.json";

test.describe("E2E - eBay flow", () => {
  test("complete flow", async ({ page }) => {
    const loginService = new LoginService(page);
    const searchService = new SearchService(page);
    const cartService = new CartService(page);

    await loginService.login(process.env.EBAY_USER!, process.env.EBAY_PASS!);
  
    const urls = await searchService.searchItemsByNameUnderPrice(
      data.search.query,
      data.search.maxPrice,
      data.search.limit,
    );

    test.skip(urls.length === 0, "No items found");

    await cartService.addItemsToCart(urls);

    await cartService.assertCartTotalNotExceeds(data.search.maxPrice, urls.length);

    await cartService.clearCart();
  });
});
