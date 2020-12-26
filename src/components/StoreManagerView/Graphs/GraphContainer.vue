<template>
  <div class="graphs-page-container">
    <v-card-title>Charts and Graphs </v-card-title>
    <order-filter-container @update-filter="onUpdateQuery" />
    <v-dialog
      :value="!!displayExpandedChart"
      @click:outside="onDeselectExpandedChart"
    >
      <div v-if="displayExpandedChart" class="dialog-container">
        <div class="dialog-title">
          <v-card-title>{{ displayExpandedChart.title }}</v-card-title>
        </div>
        <div class="close-container" @click="onDeselectExpandedChart">
          <v-btn x-small fab>
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </div>
        <top-articles
          v-if="displayExpandedChart"
          :baseQuery="displayExpandedChart.baseQuery"
          :query="query"
          :isExpanded="true"
        />
      </div>
    </v-dialog>
    <div class="graphs-container">
      <graph-bracket-container
        v-for="(chart, index) in charts"
        :key="index"
        :title="chart.title"
      >
        <top-articles :baseQuery="chart.baseQuery" :query="query" />
        <div
          class="expand-view-anchor-container"
          @click="() => onExpandChart(index)"
        >
          Expand This Chart
        </div>
      </graph-bracket-container>
      <graph-bracket-container title="Top Sold Items">
        <pie-chart baseQuery="items" :query="query" />
      </graph-bracket-container>
    </div>
  </div>
</template>

<script>
import OrderFilterContainer from "../OrdersCmps/OrderFilter/OrderFilterContainer.vue";
import GraphBracketContainer from "./GraphCmps/GraphBracketContainer.vue";
import PieChart from "./GraphCmps/PieChart.vue";
import TopArticles from "./GraphCmps/TopArticles.vue";

export default {
  components: { GraphBracketContainer, OrderFilterContainer, TopArticles,PieChart },
  data() {
    return {
      charts: [
        { title: "Top Spending", baseQuery: "topspending" },
        { title: "Top Purchases", baseQuery: "topvisiting" },
        { title: "Top Average", baseQuery: "topaverage" },
      ],
      query: [],
      displayExpandedChart: null,
    };
  },
  methods: {
    onUpdateQuery(query) {
      this.query = [...query];
    },
    onExpandChart(idx) {
      this.displayExpandedChart = { ...this.charts[idx] };
    },
    onDeselectExpandedChart() {
      this.displayExpandedChart = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.graphs-container {
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-template-rows: 1fr;
  gap: 1rem;
}

.dialog-container {
  padding: 1rem;
  background-color: white;
  position: relative;
}
.dialog-title {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
}
.close-container {
  position: absolute;
  right: 1rem;
  top: 1rem;
}

.expand-view-anchor-container {
  padding: 0 1rem 1rem;
  height: 100%;
  cursor: pointer;
  color: #1976d2;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
</style>
