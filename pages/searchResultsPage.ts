import { BasePage } from "./basePage";

export class SearchResultsPage extends BasePage {
  private itemsSelector = "//ul[contains(@class,'srp-results')]//li[contains(@class,'s-card')]";
  private nextButton = "a[aria-label='Go to next search page']";

  async applyMaxPrice(maxPrice: number) {
    const maxInput = this.page.locator("input[aria-label^='Maximum Value in']");
    if (await maxInput.isVisible()) {
      await maxInput.fill(maxPrice.toString());
      await this.page.keyboard.press("Enter");
      await this.page.waitForSelector(this.itemsSelector, { state: "visible" });
    }
  }

  async getItems() {
    return this.page.locator(this.itemsSelector);
  }

  async goToNextPage(): Promise<boolean> {
    const next = this.page.locator(this.nextButton);

    if (await next.isVisible()) {
      await next.click();
      await this.page.waitForLoadState("networkidle");
      return true;
    }

    return false;
  }
}
