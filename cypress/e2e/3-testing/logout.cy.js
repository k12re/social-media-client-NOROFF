describe("Noroff Social Media user", () => {
  beforeEach(() => {
    cy.visit("https://k12re.github.io/social-media-client-NOROFF/");
    cy.wait(2000);
    cy.get("#registerModal button")
      .should("be.visible")
      .contains("Login")
      .click();
    cy.wait(1000);
    cy.get("input#loginEmail[name='email']").type(Cypress.env("email_env"), {
      delay: 100,
    });
    cy.get("input#loginPassword").type(Cypress.env("password_env"), {
      delay: 100,
    });
    cy.get("button[type=submit]").contains("Login").click();
  });
  it("User can then logout of platform", () => {
    cy.wait(1000);
    cy.get("button").contains("Logout").click();
  });
});
