import { BannerPage, BrandsPage, CategoriesPage, DashboardPage, ProductsPage } from "../pages";

export const routes = [
  {
    id: 1,
    path: '/',
    element: <DashboardPage />
  },
  {
    id: 2,
    path: '/products',
    element: <ProductsPage />
  },
  {
    id: 3,
    path: '/categories',
    element: <CategoriesPage />
  },
  {
    id: 4,
    path: '/brands',
    element: <BrandsPage />
  },
  {
    id: 5,
    path: '/banner',
    element: <BannerPage />
  },
]