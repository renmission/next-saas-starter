import { expect, test } from "@playwright/test";

test.describe("Login Functionality", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page before each test
    await page.goto("/login");
  });

  test("should display login form correctly", async ({ page }) => {
    // Check if all elements are present
    await expect(
      page.getByRole("heading", { name: "Welcome back" }),
    ).toBeVisible();
    await expect(
      page.getByText("Enter your email to sign in to your account"),
    ).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Sign in with Email" }),
    ).toBeVisible();
    await expect(
      page.getByText("Don't have an account? Sign Up"),
    ).toBeVisible();
  });

  test("should show validation errors for empty form submission", async ({
    page,
  }) => {
    // Click sign in without filling any fields
    await page.getByRole("button", { name: "Sign in with Email" }).click();

    // Check for validation messages
    await expect(page.getByText("Please enter your email")).toBeVisible();
    await expect(page.getByText("Please enter your password")).toBeVisible();
  });

  test("should show error for invalid email format", async ({ page }) => {
    await page.getByLabel("Email").fill("invalidemail");
    await page.getByLabel("Password").fill("somepassword");
    await page.getByRole("button", { name: "Sign in with Email" }).click();

    await expect(
      page.getByText("Please enter a valid email address"),
    ).toBeVisible();
  });

  test("should show error for invalid credentials", async ({ page }) => {
    await page.getByLabel("Email").fill("wrong@example.com");
    await page.getByLabel("Password").fill("wrongpassword");
    await page.getByRole("button", { name: "Sign in with Email" }).click();

    // Assuming your app shows an error message for invalid credentials
    await expect(page.getByText("Invalid email or password")).toBeVisible();
  });

  test("should login successfully with valid credentials", async ({ page }) => {
    await page.getByLabel("Email").fill("user@example.com");
    await page.getByLabel("Password").fill("correctpassword");
    await page.getByRole("button", { name: "Sign in with Email" }).click();

    // Assert redirection to dashboard or home page after successful login
    // Adjust the URL based on where your app redirects after login
    await expect(page).toHaveURL("/dashboard");

    // Optional: Check for elements that should be present after successful login
    await expect(page.getByText("Welcome, User")).toBeVisible();
  });

  test("should navigate to sign up page when clicking on sign up link", async ({
    page,
  }) => {
    await page.getByText("Don't have an account? Sign Up").click();
    await expect(page).toHaveURL("/register");
  });

  test("should maintain form data when switching between dark and light modes", async ({
    page,
  }) => {
    // Assuming you have a theme toggle button
    const themeToggle = page.getByRole("button", { name: "Toggle theme" });

    // Fill in the form
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Password").fill("password123");

    // Toggle theme
    await themeToggle.click();

    // Check if form data is maintained
    await expect(page.getByLabel("Email")).toHaveValue("test@example.com");
    await expect(page.getByLabel("Password")).toHaveValue("password123");

    // Toggle theme back
    await themeToggle.click();

    // Check again
    await expect(page.getByLabel("Email")).toHaveValue("test@example.com");
    await expect(page.getByLabel("Password")).toHaveValue("password123");
  });
});
