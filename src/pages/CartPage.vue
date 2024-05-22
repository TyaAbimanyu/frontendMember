<template>
  <div>
    <h5 class="q-ma-md">Cart</h5>

    <div class="text-right">
      <q-btn class="q-ma-md" color="green" @click="deletedItem">Delete Selected</q-btn>
    </div>

    <div>
      <!-- Bagian buat Nampilin semua productnya dikasih nama index -->
      <q-card class="q-pa-md" v-for="(item,index) in cartData" :key="index">
        <div>
          <!-- Bagian buat Nampilin image dengan index ke nol -->
          <q-card class="row">
            <q-checkbox v-model="item.selected"/>
            <q-img :src="getImageFirstIndex(item.images)" style="width: 30%;" ratio="3" />
            <div class="row">
              <h6 class="q-pa-lg">{{ item.title }}</h6>
              <h6 class="column q-pa-lg">Quantity
                <q-input label="Quantity" type="number" v-model="item.quantity" @change="updateQuantity(item)" :min="0"/>
                <h6>Rp.{{ item.price }}</h6>
              </h6>
            </div>
            <h6 class="q-pa-lg">Rp.{{ item.totalPrice }}</h6>
          </q-card>
        </div>
      </q-card>
    </div>

    <div class="text-right">
      <div class="row q-py-xs ">
        <h6 class="q-mx-lg">Grand Total</h6>
        <h5 class="q-mx-lg">Rp. {{ allTotalPrice }}</h5>
      </div>

      <div class="row">
        <q-btn class="q-mx-md" color="green" @click="backHome">Continue Shopping</q-btn>
        <q-btn class="q-mx-md" color="red" @click="chekout">Check Out</q-btn>
      </div>
    </div>

  </div>
</template>

<script setup>

import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { api } from 'src/boot/axios'

const router = useRouter()
const token = localStorage.getItem('member_token_uuid')
const cartData = ref([])
const allTotalPrice = ref(0)

function getImageFirstIndex (images) {
  return Array.isArray(images) && images.length > 0 ? 'http://localhost:8080/uploads/' + images[0] : ''
}

function getDataCart () {
  api.post('getDataCart', { token })
    .then((response) => {
      cartData.value = response.data.cartItems.map(item => ({ ...item, selected: false }))
      allTotalPrice.value = response.data.cartTotalPrice
    })
    .catch((error) => {
      console.error(error)
    })
}
getDataCart()

function updateQuantity (item) {
  item.totalPrice = item.price * item.quantity
  updaSelectedPrice()
  api.post('updateQuantity', {
    token,
    productUuid: item.productUuid,
    quantity: item.quantity
  }).then((response) => {
    console.log(response)
  }).catch((error) => {
    console.error(error)
  })
}

function updaSelectedPrice () {
  allTotalPrice.value = cartData.value.reduce((acc, cur) => {
    return cur.selected ? acc + cur.totalPrice : acc
  }, 0)
}

function backHome () {
  router.push({ path: 'Home' })
}
function deletedItem () {
  const selectedItems = cartData.value.filter(item => item.selected)
  const selectedProductUuids = selectedItems.map(item => item.productUuid)

  console.log(selectedProductUuids)

  if (selectedProductUuids.length > 0) {
    api.post('deleteDataCart', {
      token,
      productUuids: selectedProductUuids
    }).then(() => {
      cartData.value = cartData.value.filter(item => !item.selected)
      updaSelectedPrice()
    }).catch((error) => {
      console.error(error)
    })
  } else {
    console.warn('No selected products to delete.')
  }
}

function chekout () {
  const selectedItems = cartData.value.filter(item => item.selected)
  const selectedProductUuids = selectedItems.map(item => item.productUuid)

  api.post('updateCartTotalPrice', {
    token,
    productUuids: selectedProductUuids
  }).catch((response) => {
    allTotalPrice.value = response.data.cartTotalPrice
  }).catch((error) => {
    console.error(error)
  })

  router.push({ name: 'CheckOutPage' })
}
</script>
