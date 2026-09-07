import { expect, test } from "@playwright/test";

test.describe("Strony uwierzytelniania", () => {
  test("strona logowania renderuje się poprawnie", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByPlaceholder("ty@przyklad.pl")).toBeVisible();
    await expect(page.getByLabel("Hasło")).toBeVisible();
    await expect(page.getByRole("button", { name: "Zaloguj się" })).toBeVisible();
    await expect(page.getByText("Nie masz jeszcze konta?")).toBeVisible();
  });

  test("strona rejestracji renderuje się poprawnie", async ({ page }) => {
    await page.goto("/register");
    await expect(page.getByPlaceholder("ty@przyklad.pl")).toBeVisible();
    await expect(page.getByLabel("Hasło")).toBeVisible();
    await expect(page.getByRole("button", { name: "Utwórz konto" })).toBeVisible();
    await expect(page.getByText("Masz już konto?")).toBeVisible();
  });

  test("można przejść z logowania do rejestracji", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("link", { name: "Utwórz je bezpłatnie" }).click();
    await expect(page).toHaveURL("/register");
  });

  test("można przejść z rejestracji do logowania", async ({ page }) => {
    await page.goto("/register");
    await page.getByRole("link", { name: "Zaloguj się" }).click();
    await expect(page).toHaveURL("/login");
  });
});
