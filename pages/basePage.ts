import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async click(selector: string) {
    await this.page.click(selector);
  }

  async type(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  async getText(selector: string) {
    return this.page.innerText(selector);
  }

  async waitFor(selector: string) {
    await this.page.waitForSelector(selector);
  }
}