import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
export const menuItems = [
  {
    key: '/',
    icon: <HomeIcon />,
    label: "Dashboard",
    slug: '/'
  },
  {
    key: '/products',
    icon: <AllInboxIcon />,
    label: "Products",
    slug: '/products'
  },
  {
    key: '/categories',
    icon: <CategoryIcon />,
    label: "Categories",
    slug: '/categories'
  },
  {
    key: '/brands',
    icon: <BrandingWatermarkIcon />,
    label: "Brands",
    slug: '/brands'
  },
  {
    key: '/banner',
    icon: <ViewCarouselIcon />,
    label: "Banner",
    slug: '/banner'
  },

]