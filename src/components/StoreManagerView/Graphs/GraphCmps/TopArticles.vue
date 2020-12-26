<template>
  <div class="top-articles-container">
    <div v-if="isLoading">
      <v-progress-circular indeterminate />
    </div>
    <div class="top-articls-table" v-bind:class="{'expanded-view':isExpanded}" v-if="!isLoading">
      <v-simple-table fixed-header height="300px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">Index</th>
              <th class="text-center">Customer Phone Number</th>
              <th class="text-center">Customer Name</th>
              <th class="text-center" v-if="isExpanded">Amount Of Purchases</th>
              <th class="text-center" v-if="isExpanded">Total Purchases</th>
              <th class="text-center" v-if="isExpanded">Average Purchase Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in chartData" :key="item.index" class="data-row">
              <td class="text-center idx" @click="()=>onClickCustomer(item._id.phone)">{{ index + 1 }}</td>
              <td class="text-center phone" @click="()=>onClickCustomer(item._id.phone)">{{ item._id.phone }}</td>
              <td class="text-center table-title" @click="()=>onClickCustomer(item._id.phone)">{{ item._id.name }}</td>
              <td class="text-center amount" @click="()=>onClickCustomer(item._id.phone)" v-if="isExpanded">{{ item.count }}</td>
              <td class="text-center price" @click="()=>onClickCustomer(item._id.phone)" v-if="isExpanded"><price-container :price="item.total" /></td>
              <td class="text-center price" @click="()=>onClickCustomer(item._id.phone)" v-if="isExpanded">
                <price-container :price="item.avgSpending" />
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
import { chartService } from "@/services/chartService";
import PriceContainer from "../../../GlobalCmps/PriceContainer.vue";

export default {
  props: ["baseQuery", "query", 'isExpanded'],
  components: {
    PriceContainer,
  },
  data() {
    return {
      chartData: null,
      isLoading: true,
    };
  },
  created() {
    this.getChartData();
  },
  watch: {
    query: {
      handler() {
        this.getChartData();
      },
      deep: true,
    },
  },
  methods: {
    async getChartData() {
      this.isLoading = true;
      const data = await chartService.getChartData(this.baseQuery, this.query);
      this.chartData = data;
      this.isLoading = false;
    },
    onClickCustomer(phoneNumber) {
      
      this.$router.push(`/admin/users?user=${phoneNumber}`)
    }
  },
};
</script>

<style lang="scss" scoped>
.expanded-view {
  tr {
    grid-template-columns: 4rem 8rem 1fr repeat(3, 8rem);
  }
}

tr {
  transition: 0.1s;
  display: grid;
  width: 100%;
  grid-template-columns: 4rem 8rem 1fr;
}

.data-row {
  cursor: pointer;
}


.table-title {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>