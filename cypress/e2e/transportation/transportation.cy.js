describe("Transportation Module", () => {

  before(() => {
    cy.login();
  });

  it("TR001 - Verify route list fields", () => {
    cy.visit("/busRoute");
  });

  it("TT002 - Verify travellers list fields", () => {
    cy.visit("/transportList");
  });

  it("TR003 - Verify route import", () => {
    cy.visit("/busRoute");
  });

  it("TR004 - Verify route export", () => {});
  it("TR005 - Verify route download", () => {});

  it("TT006 - Verify traveller import", () => {});
  it("TT007 - Verify traveller export", () => {});
  it("TT008 - Verify traveller download", () => {});

  it("TR009 - Route search valid", () => {});
  it("TR010 - Route search invalid", () => {});

  it("TT011 - Traveller search valid", () => {});
  it("TT012 - Traveller search invalid", () => {});

  it("TR013 - Open create route", () => {});
  it("TT014 - Open create transport", () => {});

  it("TR015 - Create route valid", () => {});
  it("TT016 - Create traveller valid", () => {});

  it("TR017 - Route mandatory fields", () => {});
  it("TT018 - Traveller mandatory fields", () => {});

  it("TR019 - Route partial validation", () => {});
  it("TR020 - Route partial validation", () => {});
  it("TR021 - Route partial validation", () => {});

  it("TT022 - Traveller partial validation", () => {});
  it("TT023 - Traveller partial validation", () => {});
  it("TT024 - Traveller partial validation", () => {});

  it("TR025 - Route empty submit", () => {});
  it("TT026 - Traveller empty submit", () => {});

  it("TR027 - Route invalid contact", () => {});
  it("TR028 - Route invalid bus", () => {});
  it("TR029 - Route invalid address", () => {});

  it("TT030 - Traveller invalid contact", () => {});
  it("TT031 - Traveller invalid fee", () => {});

  it("TR032 - Route mobile responsive", () => {});
  it("TR033 - Route tablet responsive", () => {});
  it("TT034 - Traveller responsive", () => {});
});
