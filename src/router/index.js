import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/admin',
    name: 'Store Manager View',
    component: () => import('../views/ManagerView/StoreManager.vue'),
    children: [
      {
        path: 'mobile',
        alias: '/',
        name: 'Mobile Warning',
        component: () => import('../components/StoreManagerView/MobileWarning.vue')
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('../components/StoreManagerView/ProductManagement/ProductManagement.vue')
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../components/StoreManagerView/OrdersCmps/OrderPreviewContainer.vue')
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('../components/StoreManagerView/Users/UserContainer')
      },
      {
        path: 'graphs',
        name: 'Graphs',
        component: () => import('../components/StoreManagerView/Graphs/GraphContainer.vue')
      },
    ]
  },
  {
    path: '/add',
    name: 'Add Product',
    component: () => import(/* webpackChunkName: "about" */ '../views/ManagerView/AddProduct.vue'),
    children: [
      {
        path: ':id',
        name: 'Edit Product'
      }
    ]
  },
  {
    path: '/store/:id',
    name: 'Item Details',
    component: () => import('../views/StoreFrontView/StoreItemDetails')
  },
  {
    path: '/store',
    name: 'Store View',
    component: () => import('../views/StoreFrontView/StoreFront.vue'),
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/StoreFrontView/Checkout.vue'),
  },
  {
    path: '/complete',
    name: 'Complete',
    component: () => import('../views/StoreFrontView/OrderComplete.vue'),
  },
  {
    path: '*',
    name: 'Home',
    component: Home
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
