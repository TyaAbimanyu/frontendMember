<template>
  <div>
    <div>
      <h4 class="q-ma-md">Check Out Page</h4>
    </div>

    <div class="row justify-between">
      <h5 class="q-mx-md">Email
        <p class="q-my-md">{{ email }}</p>
      </h5>
      <h5 class="q-mx-md">Total Payment
        <p class="q-my-md">Rp.{{ allTotalPrice }}</p>
      </h5>
    </div>
    <div>
      <h5 class="q-ma-md">Name
        <p class="q-my-md">{{ name }}</p>
      </h5>
      <h5 class="q-my-lg q-ma-md">
        Address
        <q-input rounded standout v-model="address" type="textarea" style="width: 70%;" class="q-my-sm"></q-input>
      </h5>

      <h5 class="column q-ma-md">Transfer To
        <q-btn-dropdown
        class="q-my-md"
        :label="selectedBank ? selectedBank.bankNumber + ' - ' + selectedBank.bankName : 'Select Bank'"
        color="green"
        style="width: 20%;">

        <q-list>
          <q-item v-for="item in data.bankList" :key="item.bankId" clickable v-close-popup @click="selectBank(item)">
            <q-item-section>
              <q-item-label>{{ item.bankNumber }} - {{ item.bankName }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      </h5>
    </div>

    <div class="text-right">
      <q-btn class="q-ma-md" color="red" @click="backToCart">Back To Cart</q-btn>
      <q-btn class="q-ma-md" color="green" @click="submitCartData">Submit</q-btn>
    </div>
  </div>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const data = ref({
  memberEmail: '',
  memberName: '',
  cartTotalPrice: 0,
  bankList: []
})
const email = ref('')
const name = ref('')
const allTotalPrice = ref(0)
const router = useRouter()
const address = ref('')
const selectedBank = ref()

function getData () {
  api.get('getDataOrder').then((response) => {
    console.log(response.data)
    email.value = response.data.data.memberEmail
    name.value = response.data.data.memberName
    allTotalPrice.value = response.data.data.cartTotalPrice
    data.value = response.data.data
  }).catch(error => {
    console.error('Failed to fetch data:', error)
  })
}

getData()

function selectBank (bankData) {
  selectedBank.value = bankData
}

function submitCartData () {
  api.post('submitCart', {
    allTotalPrice: allTotalPrice.value,
    address: address.value
  }).then((response) => {
    console.log(response.data)
    data.value = response.data
    sessionStorage.setItem('checkout', JSON.stringify(data.value))
  }).catch(error => {
    console.error('Failed to submit data:', error)
  })
  router.push({ path: 'Submit' })
}

function backToCart () {
  router.push({ path: 'Cart' })
}
</script>
