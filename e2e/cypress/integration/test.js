describe("My First Test", () => {
  it("TodoListが表示されること", () => {
    cy.visit("/");
    // cy.visit("https://www.google.com/");
    // cy.contains("div", "VeeValidate");
    cy.contains("div", "TodoList");
    cy.contains("div", "aaa");
    // cy.contains("div.v-dialog", "Select Country").should("be.visible");
  });

  it("localhostにアクセス", () => {
    cy.visit("http://localhost:3000");
    cy.contains("div", "aaa");
  });
});
