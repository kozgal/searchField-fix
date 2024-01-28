const example = /* HTML */ `<sp-search-field>
  <input spSearchFieldInput aria-label="Search" placeholder="Search" />
</sp-search-field>`;

describe("SearchField", () => {
  it("clears the input when Escape is pressed", () => {
    cy.mount(example);
    cy.get("input").type("search query");
    cy.realPress("Escape");
    cy.get("input").should("have.value", "");
  });

  it("submits the search when Enter is pressed", () => {
    const onSubmit = cy.stub();
    cy.mount(
      `<sp-search-field>
          <input
            spSearchFieldInput
            (spSearchFieldSubmitted)="onSubmit()"
            aria-label="Search"
            placeholder="Search"
          />
        </sp-search-field>`,
      { componentProperties: { onSubmit } }
    );
    cy.get("input").type("s");
    cy.realPress("Enter");
    cy.wrap(onSubmit).should("be.calledOnceWith", );
  });

  it("clears the input when clear button is pressed", () => {
    cy.mount(example);
    cy.get("input").type("search query");
    cy.findByRole("button").click();
    cy.get("input").should("have.value", "");
  });

  it("sets the expected aria-label on the clear button", () => {
    cy.mount(example);
    cy.get("input").type("search query");
    cy.findByRole("button", { name: "Clear search" });
  });

  it("focuses the input when the box (including the search icon) is clicked", () => {
    cy.mount(example);
    cy.root().realClick({ x: 8, y: 15 });
    // due to the manual focus change from button back to input instead of preventing focus on button to begin with,
    // adding 100ms sleep here to allow focus on the button to change back to the input
    // maybe 100ms is a bit overkill, could probably be 30 or so.
    cy.get("input").should("be.focused").blur();
    cy.root().realClick({ x: 18, y: 15 });
    cy.get("input").should("be.focused").blur();
    cy.root().realClick({ x: 290, y: 15 });
    cy.get("input").should("be.focused");
  });
});
