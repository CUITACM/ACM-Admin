// api root
const HOST = PRODUCTION ? 'http://127.0.0.1:3000' : 'http://127.0.0.1:3000';
export const CDN_ROOT = HOST;
export const API_ROOT = `${HOST}/api/v1`;
export const defaultAfterLogin = `${window.location.origin}/meter`;
export const SiteName = 'CUIT ACM Admin';

export function joinCDN(url) {
  if (url == null) return '';
  return `${CDN_ROOT}${url}`;
}

export const NavbarMenu = [
  // {
  //   to: '/admin/main',
  //   text: '系统信息',
  //   children: [
  //     { to: '/admin/main/dashboard', text: '仪表盘', icon: 'dashboard' },
  //   ]
  // },
  {
    to: '/admin/users',
    text: '用户管理',
    children: [
      { to: '/admin/users/list', text: '校队用户', icon: 'user' },
      { to: '/admin/users/newcomers', text: '新生申请', icon: 'bars' }
    ]
  },
  {
    to: '/admin/articles',
    text: '文章管理',
    children: [
      { to: '/admin/articles/news', text: '新闻管理', icon: 'bars' },
      { to: '/admin/articles/solution', text: '解题报告', icon: 'bars' },
    ]
  },
  // {
  //   to: '/admin/resources',
  //   text: '图库管理',
  //   children: [
  //     { to: '/admin/resources/list', text: '所有', icon: 'bars' },
  //     { to: '/admin/resources/slides', text: '首页轮播图', icon: 'bars' },
  //   ]
  // },
  {
    to: '/admin/spiders',
    text: '爬虫管理',
    children: [
      { to: '/admin/spiders/accounts', text: '账号管理', icon: 'bars' },
      { to: '/admin/spiders/submits', text: '所有提交', icon: 'bars' },
      { to: '/admin/spiders/workers', text: '爬虫后台', icon: 'code-o' }
    ]
  },
  {
    to: '/admin/achievements',
    text: '成就管理',
    children: [
      { to: '/admin/achievements/list', text: '成就管理', icon: 'bars' },
    ]
  },
  {
    to: '/admin/honors',
    text: '荣誉墙管理',
    children: [
      { to: '/admin/honors/list', text: '荣誉列表', icon: 'bars' },
    ]
  }
];
