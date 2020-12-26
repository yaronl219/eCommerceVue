

<script>
import { chartService } from "@/services/chartService";
import { Pie, mixins } from "vue-chartjs";
import { utilService } from '../../../../services/utilService';
// import { utilService } from '../../../../services/utilService';
const { reactiveData } = mixins;

export default {
  props: ["baseQuery", "query"],
  extends: Pie,
  mixins: [reactiveData],
  data() {
    return {
      chartData: null,
      options: {
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  created() {
    this.getChartData();
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
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
      this.chartData = this.parseData(data);
      this.isLoading = false;
    },
    parseData(rawData) {
      let data = [];
      let labels = [];
      let backgroundColor = [];

      rawData.forEach((item) => {
        data.push(item.count);
        labels.push(item._id.title);
        backgroundColor.push(utilService.getRandomColor(0.5));
      });
      return {
        datasets: [{ data: data, 
        backgroundColor, borderWidth: 1 }],
        labels,
      };
    },
  },
};
</script>

<style>
</style>