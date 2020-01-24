// https://docs.cypress.io/api/introduction/api.html

describe("Material Todo App", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/");
    cy.route(
      "GET",
      "https://jsonplaceholder.typicode.com/*",
      "fixtures:todos.json"
    );
  });
  it("lets the user create new todos", () => {
    cy.wait(2000);
    cy.getSelector("todo-body").type("test test");
    cy.getSelector("todo-remarks").type("remarks remarks");
    cy.getSelector("todo-form-submit").click();
    cy.wait(2000);
    cy.getSelector("todo-title")
      .first()
      .contains("test test");
  });

  it("lets the user move todos", () => {
    cy.wait(2000);
    cy.get(".todo-container")
      .first()
      .find("button")
      .first()
      .click();
    cy.wait(1000);
    cy.getSelector("todo-urgent")
      .its("length")
      .should("eq", 1);
  });

  it("lets the user filter todos", () => {
    cy.wait(2000);
    cy.getSelector("filters-text").type("as");
    cy.wait(1000);
    cy.getSelector("todo-pending")
      .its("length")
      .should("eq", 1);
  });
});
