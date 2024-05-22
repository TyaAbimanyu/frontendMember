const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') },
      { path: 'Register', component: () => import('pages/RegisterPage.vue') },
      { path: 'Home', component: () => import('pages/HomePage.vue') },
      { path: 'Cart', component: () => import('pages/CartPage.vue') },
      { path: 'Confirm', component: () => import('pages/ConfirmPaymentPage.vue') },
      { path: 'Detail/:productId', name: 'DetailProductPage', component: () => import('pages/ProductDetailPage.vue') },
      { path: 'Check', name: 'CheckOutPage', component: () => import('pages/CheckOutPage.vue') },
      { path: 'Submit', name: 'CheckoutSubmitPage', component: () => import('pages/CheckoutSubmitPage.vue') }

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
