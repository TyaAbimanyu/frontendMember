<template>
  <div>
    <h5 class="q-px-xl">Product Page</h5>
  </div>

  <div class="form">
    <div style="width: 100%;" class="column items-center">
      <q-card class="q-pa-md q-my-md" v-for="index in data" :key="index" style="width: 80%;">
        <div>
          <div class="row justify-between">
            <h5>{{ index.product.title }}</h5>
          </div>
          <div class="row">
            <q-card class="q-mx-sm q-mb-md" v-for="item in index.image" :key="item" style="width: 30%;">
              <q-img :src="'http://localhost:8080/uploads/' + item.image" >
              </q-img>
            </q-card>
          </div>
          <div class="row justify-between">
            <h6> Rp. {{ index.product.price }}</h6>
          </div>
          <div class="text-right">
            <q-btn class="q-mr-xl" @click="ViewDetail(index)" color="green">View</q-btn>
            <q-btn class="q-mr-xl" @click="AddToCart(index)" color="red">Add To Cart</q-btn>
          </div>
        </div>
      </q-card>
    </div>
  </div>

</template>

<script setup>

import { ref } from 'vue'
import { api } from 'src/boot/axios'
import { useRouter } from 'vue-router'

const token = localStorage.getItem('admin_token_uuid')
const data = ref([])
const router = useRouter()

function getProduct () {
  api.get('getProductData', {
    token
  }).then((response) => {
    data.value = response.data
  }).catch((error) => {
    console.error(error)
  })
}

getProduct()

function ViewDetail (index) {
  router.push({ name: 'DetailProductPage', params: { productId: index.product.productId } })
}

function AddToCart () {
  router.push({ path: 'Cart' })
}

// function searchData () {
//   api.get('SearchOrder/' + search.value, {
//   }).then((response) => {
//     data.value = response.data
//   })
// }

</script>
