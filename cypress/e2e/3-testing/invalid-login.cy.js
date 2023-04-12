describe("Noroff Social Media", () => {
  it("can fail login attempt", () => {
    cy.visit("https://k12re.github.io/social-media-client-NOROFF/");
    cy.wait(2000);
    cy.get("#registerModal button")
      .should("be.visible")
      .contains("Login")
      .click();
    cy.wait(1000);
    cy.get("input#loginEmail[name='email']").type("kenthore@noroff.no", {
      delay: 100,
    });
    cy.get("input#loginPassword").type("123123123123", { delay: 100 });
    cy.get("button[type=submit]").contains("Login").click();
    cy.on("window:alert", (text) => {
      expect(text).to.contain(
        "Either your username was not found or your password is incorrect"
      );
    });
  });
});
