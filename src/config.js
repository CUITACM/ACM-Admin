// api root
const HOST = 'http://127.0.0.1:3000';
export const CDN_ROOT = HOST;
export const API_ROOT = `${HOST}/api/v1`;

export const NavbarMenu = [
  {
    to: '/admin/main',
    text: '系统信息',
    children: []
  },
  {
    to: '/admin/users',
    text: '用户管理',
    children: [
      { to: '/admin/users', text: '所有用户' },
      { to: '/admin/users/newcomers', text: '新生申请' }
    ]
  },
  {
    to: '/admin/articles',
    text: '文章管理',
    children: [
      { to: '/admin/articles', text: '所有文章' }
    ]
  },
  {
    to: '/admin/resources',
    text: '资源管理',
    children: [
      { to: '/admin/resources', text: '所有资源' }
    ]
  },
  { to: '/admin/spiders', text: '爬虫管理' },
  { to: '/admin/achievements', text: '成就管理' }
];
