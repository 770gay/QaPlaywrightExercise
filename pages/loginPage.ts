import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
  readonly path = "/cart";

  private signInBar = "//a[text()='Sign in']";
  private emailInput = "#userid";
  private continueButton = "#signin-continue-btn";
  private passwordInput = "#pass";
  private loginInButton = "#sgnBt";
  private errorMessage = "#errf";

  async signIn() {
    await this.click(this.signInBar);
  }

  async enterUserId(userId: string) {
    await this.type(this.emailInput, userId);
    await this.click(this.continueButton);
  }

  async enterPassword(password: string) {

    await this.type(this.passwordInput, password);
    await this.click(this.loginInButton);
  }

  async login(userId: string, password: string) {
    try {
      await this.signIn();
      await this.enterUserId(userId);
      await this.enterPassword(password);
    } catch (error) {
      throw error;
    }
  }

  async getErrorMessage(): Promise<string | null> {
    return this.getText(this.errorMessage).catch(() => null);
  }
}
