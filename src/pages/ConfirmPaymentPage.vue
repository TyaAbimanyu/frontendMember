<template>
  <div>
    <h5>Confirm Page</h5>

    <div>
      <h6>Order Number
        <q-input filled standout v-model="bankData.orderNumber" readonly style="width: 80%;"></q-input>
      </h6>
    </div>

    <div>
      <h6>
        Transfer Date
        <q-input v-model="bankData.confirmDate" type="date" style="width: 80%;"></q-input>
      </h6>
    </div>

    <div>
      <h6 class="column q-ma-md">Transfer To
        <q-btn-dropdown
          class="q-my-md"
          :label="selectedBank ? selectedBank.bankNumber + ' - ' + selectedBank.bankName : 'Select Bank'"
          color="green"
          style="width: 20%;"
        >
          <q-list>
            <q-item v-for="item in bankData.bankList" :key="item.bankId" clickable v-close-popup @click="selectBank(item)">
              <q-item-section>
                <q-item-label>{{ item.bankNumber }} - {{ item.bankName }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </h6>
    </div>

    <div>
      <h6>Bank Name
        <q-input filled standout v-model="bankData.bankName" style="width: 80%;"></q-input>
      </h6>
    </div>

    <div>
      <h6>Bank Account Name
        <q-input filled standout v-model="bankData.bankAccountName" style="width: 80%;"></q-input>
      </h6>
    </div>

    <div>
      <h6>Bank Account Number
        <q-input filled standout v-model="bankData.bankAccountNumber" style="width: 80%;"></q-input>
      </h6>
    </div>

    <div>
      <h6>Payment Receipt
        <q-file v-model="files" label="Select File" filled style="width: 80%;">
          <template v-slot:prepend>
            <q-icon name="upload"/>
          </template>
        </q-file>
      </h6>
    </div>

    <div class="text-right">
      <q-btn @click="submitData" color="green">Submit</q-btn>
    </div>
  </div>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const files = ref(null)
const selectedBank = ref()
const data = ref([])
const router = useRouter()
const bankData = ref({
  orderNumber: '',
  confirmDate: null,
  bankName: '',
  bankAccountName: '',
  bankAccountNumber: ''
  // bankList: []
})

function getCheckOut () {
  api.get('getDataCheck', {

  }).then((response) => {
    data.value = response.data
    bankData.value.orderNumber = response.data.data.orderNumber
    bankData.value.bankList = response.data.data.bankList
  })
}
getCheckOut()

function selectBank (bankDatas) {
  selectedBank.value = bankDatas
  bankData.value.bankName = bankDatas.bankName
  bankData.value.bankAccountName = bankDatas.bankAccountName
  bankData.value.bankAccountNumber = bankDatas.bankAccountNumber
}

function submitData () {
  const submitData = {
    ...bankData.value,
    bankId: selectedBank.value.bankId
  }
  api.post('paymentSubmit', {
    data: JSON.stringify(submitData),
    files: files.value
  }).then((response) => {
    console.log(response.data)
  })
  router.push({ path: 'Cart' })
}

</script>
