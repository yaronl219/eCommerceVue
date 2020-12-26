<template>
  <v-main>
    <div class="item-details-screen-container">
      <div class="go-back-container">
        <v-btn x-small @click="onGoBack">
          <v-icon> mdi-chevron-left </v-icon>
          Back To Catalog
        </v-btn>
      </div>
      <div class="item-details">
        <div v-if="item" class="left">
          <v-card>
            <div class="img-container">
              <product-image :imgUrl="item.img" />
              <on-sale-ribbon v-if="item.onSale" />
            </div>
            <!-- add amount here later -->
            <v-card-title>{{ item.title }}</v-card-title>
            <v-card-text>
              <div>
                {{ item.description }}
              </div>
              <div><price-container :price="calculatedPrice" /></div>
            </v-card-text>
            <div class="amount-container">
              <amount-modifier
                :amount="cartItem.amount"
                @change-amount="onSetAmount"
              />
            </div>
          </v-card>
          <div class="add-to-cart-btn-container">
            <v-btn @click="onAddToCart" color="success">Add To Cart</v-btn>
          </div>
        </div>
        <div
          v-if="item && (item.features.length || item.extras.length)"
          class="right"
        >
          <v-card>
            <extra-feature-list
              v-if="item.features.length"
              :extras="item.features"
              title="Product Features"
            />
            <extra-feature-list
              v-if="item.extras.length"
              title="Paid Extras"
              :extras="item.extras"
              :addedExtras="cartItem.extras"
              :isEditable="true"
              @check-feature="onCheckExtra"
            />
          </v-card>
        </div>
      </div>
    </div>
  </v-main>
</template>

<script>
import PriceContainer from "../../components/GlobalCmps/PriceContainer.vue";
import ProductImage from "../../components/GlobalCmps/ProductImage.vue";
import AmountModifier from "../../components/StoreFrontView/AmountModifier.vue";
import ExtraFeatureList from "../../components/StoreFrontView/ExtraFeaturesCmps/ExtraFeatureList.vue";
import OnSaleRibbon from "../../components/StoreFrontView/GlobalCmps/OnSaleRibbon.vue";
import { itemService } from "../../services/itemService";
import { utilService } from "../../services/utilService";

export default {
  components: {
    ProductImage,
    ExtraFeatureList,
    AmountModifier,
    PriceContainer,
    OnSaleRibbon,
  },
  data() {
    return {
      item: null,
      calculatedPrice: 0,
      cartItem: {
        amount: 1,
        extras: [],
      },
    };
  },
  async created() {
    await this.loadItem();
    if (this.$route.query.edit) {
      this.getItemPref(this.$route.query.edit);
    }
  },
  watch: {
    productId: (newVal, oldVal) => {
      if (this.$route.params.id !== oldVal.$route.params.id) {
        this.loadItem();
        this.resetCartChanges();
      }
    },
  },
  methods: {
    async loadItem() {
      const { id } = this.$route.params;
      if (!id) return this.$router.push("/store");
      const item = await itemService.getItem(id);
      this.item = item;
      this.calculateItemPrice();
    },
    getItemPref(cartId) {
      const cartItem = this.$store.getters.cartItem(cartId);
      if (!cartItem) return;
      this.cartItem = cartItem;
    },
    resetCartChanges() {
      this.cartItem.extras = [];
    },
    onCheckExtra(extra) {
      let extraIdx = this.cartItem.extras.findIndex(
        (currExtra) => currExtra.id === extra.id
      );
      if (extraIdx >= 0) {
        this.cartItem.extras.splice(extraIdx, 1);
      } else {
        this.cartItem.extras.push(extra);
      }
      this.calculateItemPrice();
    },
    calculateItemPrice() {
      let itemPrice = Number(this.item.basePrice);
      this.cartItem.extras.forEach((extra) => {
        itemPrice += extra.price;
      });
      this.calculatedPrice = itemPrice;
    },
    onAddToCart() {
      this.cartItem.id = this.item._id;
      this.cartItem.price = this.calculatedPrice;
      if (!this.cartItem.cartId) {
        this.cartItem.img = this.item.img;
        this.cartItem.title = this.item.title;
        this.cartItem.cartId = utilService.makeId();
      }
      this.$store.dispatch({ type: "addItemToCart", item: this.cartItem });
      this.$router.push("/store");
    },
    onSetAmount(amount) {
      if (amount < 1) return;
      this.cartItem.amount = amount;
    },
    onGoBack() {
      this.$router.push("/store");
    },
  },
};
</script>

<style lang="scss" scoped>
.item-details-screen-container {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.go-back-container {
  padding-bottom: 0.5rem;
  align-self: flex-start;
}

.item-details {
  max-width: 75rem;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  transition: 0.2s;
  justify-items: center;
  // align-items: center;
}
.img-container {
  height: 20rem;
  position: relative;
}

.left,
.right {

  max-width: 30rem;
  width: 100%;
}

.add-to-cart-btn-container {
  display: flex;
  justify-content: center;
  padding: 0.5rem;
}
.amount-container {
  width: 50%;
  margin: 0 auto;
  padding: 0.5rem;
}

@media screen and (max-width: 735px) {
  .item-details-screen-container {
    padding: 0.5rem;
  }
  .add-to-cart-btn-container {
    z-index: 3;
    width: 100%;
    left: 0px;
    position: fixed;
    bottom: 0px;
  }
}
</style>