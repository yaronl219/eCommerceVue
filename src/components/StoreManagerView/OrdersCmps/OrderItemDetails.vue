<template>
  <div class="order-items-container">
    <v-simple-table fixed-header height="300px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Index</th>
            <th class="text-left table-title">Item</th>
            <th class="text-left">Amount</th>
            <th class="text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          <!-- <order-item-table-row v-for="(item, index) in orderItems" :key="index + item.id" :orderItem="item" :index="index" /> -->
          <tr v-for="item in orderItems" :key="item.key" v-bind:class="{'item-row':item.isItem, 'extra-row':!item.isItem}">
            <td class="idx">{{ item.index }}</td>
            <td class="table-title">{{ item.title }}</td>
            <td class="amount">{{ item.amount }}</td>
            <td class="price"><price-container :price="item.price" /></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { utilService } from '../../../services/utilService';
import PriceContainer from '../../GlobalCmps/PriceContainer.vue';
export default {
  components: { PriceContainer },
  props: ["order"],
  computed: {
    orderItems() {
      const items = [];
      this.order.items.forEach((item,idx) => {
        const newItem = item;
        newItem.isItem = true;
        newItem.index = idx+1
        newItem.key = utilService.makeId()
        items.push(newItem)
        item.extras.forEach((extra,idx) => {
            const newExtra = extra
            newExtra.isItem = false
            newExtra.index = idx+1
            newExtra.amount = 1
            newExtra.key = utilService.makeId()
            items.push(newExtra)
        })
      });
      return items;
    },
  },
  data() {
    return {
      headers: [
        {
          text: "Item",
          align: "start",
          value: "title",
        },
        { text: "Amount", value: "amount" },
        { text: "Price", value: "price" },
        { text: "Extras", value: "parse(extras)" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
tr {
    transition: 0.1s;
    display: grid;
    width: 100%;
    grid-template-columns: 5rem 1fr 5rem 5rem;

}
.extra-row {
    background-color: rgba(0,0,0,0.1);
    text-indent: 1.5rem;
}
</style>