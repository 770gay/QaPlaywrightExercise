import { BasePage } from "./basePage";

export class ProductPage extends BasePage {
  private addToCartBtn = "//span[contains(@class, 'ux-call-to-action__text') and contains(., 'Add to cart')]";
  private lightbox = ".lightbox-dialog__window.lightbox-dialog__window--animate.keyboard-trap--active";

  async selectRandomVariants() {
    const customSelects = this.page.locator('[data-testid="x-msku-evo"] .listbox-button', {
      has: this.page.locator(".btn__text", { hasText: /^Select$/i }),
    });

    const customCount = await customSelects.count();

    if (customCount > 0) {
      for (let i = 0; i < customCount; i++) {
        const currentContainer = customSelects.first();
        await currentContainer.click();

        const validOptions = currentContainer
          .locator('.listbox__option[role="option"]:not([aria-disabled="true"])')
          .filter({ hasNotText: /Select|Out of stock/i });

        const optionsCount = await validOptions.count();
        if (optionsCount > 0) {
          const randomIndex = Math.floor(Math.random() * optionsCount);
          await validOptions.nth(randomIndex).click();
          await this.page.waitForTimeout(500);
        }
      }
    } else {
      const nativeSelects = this.page.locator("select:visible");
      const nativeCount = await nativeSelects.count();

      for (let i = 0; i < nativeCount; i++) {
        const select = nativeSelects.nth(i);
        const options = select.locator("option:not([disabled])");
        const optionsCount = await options.count();

        if (optionsCount > 1) {
          const randomIndex = Math.floor(Math.random() * (optionsCount - 1)) + 1;
          await select.selectOption({ index: randomIndex });
        }
      }
    }
  }

  async addToCart() {
    await this.page.locator(this.addToCartBtn).click();
  }

  async waitForLightbox(): Promise<void> {
    await this.page.locator(this.lightbox).waitFor({ state: "visible" });
  }

  async screenshotLightbox(path: string): Promise<void> {
    await this.page.locator(this.lightbox).screenshot({ path });
  }
}
