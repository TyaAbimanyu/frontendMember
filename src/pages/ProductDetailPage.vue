<template>
  <div>
    <h4>Product Detail Page</h4>
    <div>
      <h5>{{ title }}</h5>
      <p>{{ description }}</p>
      <div>
        <q-card class="row">
          <q-img :src="mainImage" style="width: 30%;" />
          <div class="row">
            <h6 class="column">Quantity
              <q-input label="Quantity" type="number" v-model="quantity" :min="0"/>
            </h6>
            <h6>Rp. {{ price }}</h6>
          </div>
        </q-card>
        <q-btn color="green" @click="addToCart">Add To Cart</q-btn>
      </div>

      <div class="row">
        <q-card class="q-ma-md q-pa-md" v-for="image in images" :key="image.product_image_uuid">
          <q-img :src="'http://localhost:8080/uploads/' + image.product_image" class="q-mx-md" ratio="1"/>
        </q-card>
      </div>
    </div>
  </div>

  <div>
    <h5>Other Product</h5>
    <div class="form">
      <div style="width: 100%;" class="column items-center">
        <q-card class="q-pa-md q-my-md" v-for="product in otherProducts" :key="product.product.productId" style="width: 80%;">
          <div>
            <div class="row justify-between">
              <h5>{{ product.product.title }}</h5>
            </div>
            <div class="row">
              <q-img :src="'http://localhost:8080/uploads/' + product.image[0].image" style="width: 40%;" class="q-mx-sm q-mb-md" />
            </div>
            <div class="row justify-between">
              <h6>Rp. {{ product.product.price }}</h6>
            </div>
            <div class="text-right">
              <q-btn class="q-mr-xl" @click="viewDetail(product.product.productId)" color="green">View</q-btn>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from 'src/boot/axios'

const route = useRoute()
const router = useRouter()

const title = ref('')
const description = ref('')
const price = ref(0)
const mainImage = ref('')
const quantity = ref(1)
const images = ref([])
const otherProducts = ref([])

const token = localStorage.getItem('member_token_uuid')

function getProduct () {
  api.get('getImageDetail/' + route.params.productId)
    .then((response) => {
      const productData = response.data.product
      title.value = productData.product_title
      description.value = productData.product_description
      price.value = productData.product_price
      if (response.data.images.length > 0) {
        mainImage.value = 'http://localhost:8080/uploads/' + response.data.images[0].product_image
      }
      images.value = response.data.images
      quantity.value = 1
    })
    .catch((error) => {
      console.error(error)
    })
}
getProduct()

function getOtherProducts () {
  api.get('getProductDataMember')
    .then((response) => {
      otherProducts.value = response.data
    })
    .catch((error) => {
      console.error(error)
    })
}
getOtherProducts()

function addToCart () {
  api.post('AddToCartDetail', {
    token,
    price: price.value,
    quantity: quantity.value,
    TotalPrice: price.value * quantity.value,
    productId: route.params.productId
  }).then((response) => {
    console.log(response.data)
  }).catch((error) => {
    console.error(error)
  })
}

watch(() => route.params.productId, (newVal) => {
  getProduct()
  getOtherProducts()
})
function viewDetail (id) {
  router.push({ name: 'DetailProductPage', params: { productId: id } })
  getProduct()
  getOtherProducts()
}

</script>
