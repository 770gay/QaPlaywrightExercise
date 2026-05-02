import { Page } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";

export class LoginService {
  private loginPage: LoginPage;

  constructor(private page: Page) {
    this.loginPage = new LoginPage(page);
  }

  async login(userId: string, password: string) {
    await this.page.goto(this.loginPage.path);
    await this.loginPage.login(userId, password);
    await this.page.waitForLoadState("domcontentloaded");
  }

  async isLoggedIn(): Promise<boolean> {
    const userMenu = await this.page
      .locator("#gh-uo")
      .isVisible()
      .catch(() => false);
    return userMenu;
  }
}
