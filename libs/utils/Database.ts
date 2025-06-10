import { menuItems } from '@/types/interface/common';

export const getMenuData = (t: (key: string) => string): menuItems[] => {
  return [
    {
      label: t('register'),
      href: {
        pathname: '/register',
        query: {},
      },
    },
    {
      label: t('find-email'),
      href: {
        pathname: '/find-email',
        query: {},
      },
    },
    {
      label: t('find-email'),
      href: {
        pathname: '/found-email',
        query: {},
      },
    },
    {
      label: t('reset-pwd'),
      href: {
        pathname: '/find-pwd',
        query: {},
      },
    },
    {
      label: t('reset-pwd'),
      href: {
        pathname: '/reset-pwd',
        query: {},
      },
    },
    {
      label: t('mypage'),
      href: {
        pathname: '/mypage',
        query: {},
      },
    },
    {
      label: t('edit-profile'),
      href: {
        pathname: '/edit-profile',
        query: {},
      },
    },
    {
      label: t('daily-quiz'),
      href: {
        pathname: '/daily-quiz',
        query: {},
      },
    },
    {
      label: t('lucky-draw'),
      href: {
        pathname: '/lucky-draw',
        query: {},
      },
    },
    {
      label: t('learning-management'),
      href: {
        pathname: '/learning-management',
        query: {},
      },
    },
    {
      label: t('customer/notice'),
      href: {
        pathname: '/customer/notice',
        query: {},
      },
    },
    {
      label: t('customer/inquiry'),
      href: {
        pathname: '/customer/inquiry',
        query: {},
      },
    },
    {
      label: t('points'),
      href: {
        pathname: '/points',
        query: {},
      },
    },
    {
      label: t('setting'),
      href: {
        pathname: '/setting',
        query: {},
      },
    },
    {
      label: t('daily-attendance'),
      href: {
        pathname: '/daily-attendance',
        query: {},
      },
    },
  ];
};

// export const menuData: menuItems[] = [
//   {
//     label: 'Sign Up',
//     href: {
//       pathname: '/register',
//       query: {},
//     },
//   },
//   {
//     label: 'Find Email',
//     href: {
//       pathname: '/find-email',
//       query: {},
//     },
//   },
//   {
//     label: 'Find Email',
//     href: {
//       pathname: '/found-email',
//       query: {},
//     },
//   },
//   {
//     label: 'Reset Password',
//     href: {
//       pathname: '/find-pwd',
//       query: {},
//     },
//   },
//   {
//     label: 'Reset Password',
//     href: {
//       pathname: '/reset-pwd',
//       query: {},
//     },
//   },
//   {
//     label: 'My Page',
//     href: {
//       pathname: '/mypage',
//       query: {},
//     },
//   },
//   {
//     label: 'Change Profile',
//     href: {
//       pathname: '/edit-profile',
//       query: {},
//     },
//   },
//   {
//     label: 'Daily Quiz',
//     href: {
//       pathname: '/daily-quiz',
//       query: {},
//     },
//   },
//   {
//     label: 'Lucky Draw',
//     href: {
//       pathname: '/lucky-draw',
//       query: {},
//     },
//   },
//   {
//     label: 'Learning Management',
//     href: {
//       pathname: '/learning-management',
//       query: {},
//     },
//   },
//   {
//     label: 'Customer Support',
//     href: {
//       pathname: '/customer/notice',
//       query: {},
//     },
//   },
//   {
//     label: 'Customer Support',
//     href: {
//       pathname: '/customer/inquiry',
//       query: {},
//     },
//   },
//   {
//     label: 'Point History',
//     href: {
//       pathname: '/points',
//       query: {},
//     },
//   },
//   {
//     label: 'Settings',
//     href: {
//       pathname: '/setting',
//       query: {},
//     },
//   },
//   {
//     label: 'Daily Attendance',
//     href: {
//       pathname: '/daily-attendance',
//       query: {},
//     },
//   },
// ];
