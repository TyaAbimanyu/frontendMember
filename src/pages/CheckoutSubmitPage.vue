<template>
  <div>
    <div>
      <h4>Checkout Submit Page</h4>
    </div>

    <div>
      <h6>Order Number
        <p>{{ orderNumber }}</p>
      </h6>
    </div>

    <div>
      <h6>Transfer To
        <p>{{ bankNumber }} - {{ bankName }}</p>
      </h6>
    </div>

    <div>
      <q-btn color="green" @click="confirmPayment">Confrim Payment</q-btn>
    </div>

  </div>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const data = ref([])
const orderNumber = ref('')
const bankName = ref('')
const bankNumber = ref('')

function getDataSubmit () {
  api.get('getDataSubmit', {

  }).then((response) => {
    data.value = response.data.data
    orderNumber.value = response.data.data.orderNumber

    if (data.value.bankList && data.value.bankList.length > 0) {
      const firstBank = data.value.bankList[0]
      bankName.value = firstBank.bankName
      bankNumber.value = firstBank.bankNumber
    }
  })
}

getDataSubmit()

function confirmPayment () {
  api.put('setConfirmOrder', {
    orderNumber: orderNumber.value
  }).then((response) => {
    console.log(response.data)
  })
  router.push({ path: 'Confirm' })
}
</script>
