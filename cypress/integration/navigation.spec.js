const routes = [
  {
    name: 'home',
    path: '/',
  },
  {
    name: 'profile',
    path: '/profile',
  },
  {
    name: 'subscriptions',
    path: '/subscriptions/active',
  },
  {
    name: 'internalServerError',
    path: '/error/internal-server-error',
  },
  {
    name: 'notFound',
    path: '/error/not-found',
  },
];

describe('navigation', () => {
  describe('visiting routes', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    afterEach(() => {
      cy.visit('/');
    });

    routes.forEach(({ name, path }) => {
      it(`should visit "${name}" with success`, () => {
        cy.visit(path);

        cy.url().should('eq', Cypress.config().baseUrl + path);
      });
    });
  });
});
