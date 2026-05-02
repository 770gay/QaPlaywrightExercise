import { Page, expect } from "@playwright/test";
import { ProductPage } from "../pages/productPage";
import { CartPage } from "../pages/cartPage";

export class CartService {
  private productPage: ProductPage;
  private cartPage: CartPage;

  constructor(private page: Page) {
    this.productPage = new ProductPage(page);
    this.cartPage = new CartPage(page);
  }

  async addItemsToCart(urls: string[]) {
    let index = 1;
    for (const url of urls) {
      await this.page.goto(url);
      await this.productPage.selectRandomVariants();
      await this.productPage.addToCart();
      await this.productPage.waitForLightbox();
      await this.productPage.screenshotLightbox(`screenshots/item-${index}.png`);

      index++;
    }
  }

  async assertCartTotalNotExceeds(budgetPerItem: number, itemsCount: number) {
    await this.cartPage.navigate();

    const total = await this.cartPage.getTotalPrice();
    const expectedMax = budgetPerItem * itemsCount;

    expect(total, "Cart total price not found or invalid").not.toBeNull();
    expect(total!).toBeLessThanOrEqual(expectedMax);

    await this.cartPage.takeScreenshot("cart-summary");
  }

  async clearCart(): Promise<void> {
    await this.cartPage.navigate();
    await this.cartPage.removeAllItems();
  }

  async linkToCart(): Promise<void> {
    await this.cartPage.navigate();
  }
}
