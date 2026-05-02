import { BasePage } from "./basePage";

export class HomePage extends BasePage {

  private searchInput = '#gh-ac';
  private searchButton = '#gh-search-btn';

  async search(query: string) {
    await this.type(this.searchInput, query);
    await this.click(this.searchButton);
  }
}