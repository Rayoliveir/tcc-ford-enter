
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/inicio"
  },
  {
    "renderMode": 2,
    "route": "/homepage"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/register"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 545, hash: '05c34406d9ed5316d6c9d75417211895a641cbda5c919b159f785d92f90f205a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 947, hash: '959c494bfeab9511043025455f063cf8e4b795ad2f54ec9dc80431478673feaa', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 15699, hash: 'e77fbd7e3e311605778f0fed89451058242583f0efb9141a50518f327ec2c62b', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'homepage/index.html': {size: 36075, hash: 'e7fc80ab5e37688527a071ab262f2dfb449d4d11a4605b69012f509533347b48', text: () => import('./assets-chunks/homepage_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 12271, hash: '0a9fc8ad0ae89414f1909caf4f325aab85b8e00cb8b8d9b02a61cef3604523f1', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 11681, hash: '273a90da850ed7a13ceefde307f5d81092f0ad69ad3783b323d667006af6a673', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'inicio/index.html': {size: 15699, hash: 'e77fbd7e3e311605778f0fed89451058242583f0efb9141a50518f327ec2c62b', text: () => import('./assets-chunks/inicio_index_html.mjs').then(m => m.default)},
    'styles-KK73LTR2.css': {size: 1376, hash: 'aMYK53OeKPY', text: () => import('./assets-chunks/styles-KK73LTR2_css.mjs').then(m => m.default)}
  },
};
