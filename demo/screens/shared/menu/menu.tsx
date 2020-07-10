import React from 'react';
import navigate from '@cookbook/navigator';

interface Category {
  label: string;
  route: {
    name: string;
    params?: Record<string, string | number>;
  };
  categories?: Category[];
}

const menu: Category[] = [
  {
    label: 'Home',
    route: {
      name: 'home',
    },
  },
  {
    label: 'Profile',
    route: {
      name: 'profile',
    },
    categories: [
      {
        label: 'Default',
        route: {
          name: 'profile',
        },
      },
      {
        label: 'With id',
        route: {
          name: 'profile',
          params: { id: 453 },
        },
      },
      {
        label: 'With Query String',
        route: {
          name: 'profile',
          params: { page: 2 },
        },
      },
      {
        label: 'All Options',
        route: {
          name: 'profile',
          params: { id: 453, page: 2 },
        },
      },
    ],
  },
  {
    label: 'Subscriptions',
    route: {
      name: 'subscriptions',
    },
    categories: [
      {
        label: 'Default',
        route: {
          name: 'subscriptions',
        },
      },
      {
        label: 'With specific type',
        route: {
          name: 'subscriptions',
          params: { type: 'deactivated' },
        },
      },
      {
        label: 'With id',
        route: {
          name: 'subscriptions',
          params: { id: 453 },
        },
      },
      {
        label: 'With Query String',
        route: {
          name: 'subscriptions',
          params: { page: 2 },
        },
      },
      {
        label: 'All Options',
        route: {
          name: 'subscriptions',
          params: { type: 'deactivated', id: 453, page: 2 },
        },
      },
    ],
  },
];

const Menu: React.FunctionComponent<Record<string, unknown>> = () => {
  const handleOnClick = (routeName: string, params?: Record<string, string | number>): void => {
    navigate[routeName](params);
  };

  const renderCategories = (categories: Category[]): React.ReactNode => (
    <ul className="menu-category">
      {categories.map(({ label, route, categories: more }, idx) => (
        <React.Fragment>
          <li key={`${route.name}-${idx}`}>
            <span
              onClick={(e) => {
                e.preventDefault();
                handleOnClick(route.name, route.params);
              }}
            >
              {label}
            </span>
            {more && renderCategories(more)}
          </li>
        </React.Fragment>
      ))}
    </ul>
  );

  return <div className="menu-container">{renderCategories(menu)}</div>;
};

export type { Menu };
export default Menu;
