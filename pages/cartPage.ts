import { BasePage } from "./basePage";
import { extractPrice } from "../utils/priceUtils";

export class CartPage extends BasePage {
  readonly path = "https://cart.ebay.com";
  
  private totalSelector = '[data-test-id="ITEM_TOTAL"]';
  private removeButtonSelector = '[data-test-id="cart-remove-item"]';

  async getTotalPrice(): Promise<number | null> {
    const locator = this.page.locator(this.totalSelector);

    try {
      await locator.waitFor({ state: "visible" });
      const text = await locator.innerText();
      return extractPrice(text);
    } catch (error) {
      console.error("Failed to retrieve cart total price:", error);
      return null;
    }
  }

  async removeAllItems(): Promise<void> {
    const removeButtons = this.page.locator(this.removeButtonSelector);
    const count = await removeButtons.count();

    for (let i = 0; i < count; i++) {
      await removeButtons.first().click();
      await this.page.waitForTimeout(500);
    }
  }

  async navigate() {
    await this.page.goto(this.path, { waitUntil: "domcontentloaded" });
  }

  async takeScreenshot(fileName: string) {
    await this.page.screenshot({ path: `screenshots/${fileName}.png` });
  }
}
