import { Page } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { SearchResultsPage } from "../pages/searchResultsPage";
import { extractPrice } from "../utils/priceUtils";

export class SearchService {
  private homePage: HomePage;
  private resultsPage: SearchResultsPage;

  constructor(private page: Page) {
    this.homePage = new HomePage(page);
    this.resultsPage = new SearchResultsPage(page);
  }

  async searchItemsByNameUnderPrice(query: string, maxPrice: number, limit = 5): Promise<string[]> {
    const results: string[] = [];

    await this.homePage.search(query);
    await this.resultsPage.applyMaxPrice(maxPrice);

    while (results.length < limit) {
      const items = await this.resultsPage.getItems();

      await items
        .first()
        .waitFor({ state: "visible" })
        .catch(() => null);

      const count = await items.count();

      if (count === 0) break;

      for (let i = 0; i < count; i++) {
        const item = items.nth(i);

        const priceText = await item
          .locator(".s-card__attribute-row")
          .first()
          .innerText()
          .catch(() => null);

        const link = await item
          .locator("a.s-card__link")
          .first()
          .getAttribute("href")
          .catch(() => null);

        const price = priceText ? extractPrice(priceText) : null;

        if (price !== null && price <= maxPrice && link) {
          if (!results.includes(link)) {
            results.push(link);
          }

          if (results.length >= limit) {
            return results;
          }
        }
      }

      const hasNext = await this.resultsPage.goToNextPage();
      if (!hasNext) break;

      await this.page.waitForLoadState("domcontentloaded");
    }

    return results;
  }
}
