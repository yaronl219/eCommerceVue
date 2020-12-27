<template>
  <v-main>
    <div class="home">
      <v-card width="calc(80vh + 2rem)">
        <div class="about">
          <v-card-title><h1>Welcome to myShop</h1></v-card-title>
          <v-card-text>
            <p>
              myShop was built as a project to better master Vue.js and
              simulates an e-commerce webshop.
            </p>
            <p>
              You can add or remove item in the "Store manager" view, and create
              orders in the "Store" view
            </p>
            <h3>Want to know more?</h3>
            <a href='/geek'>Read the technical details</a>
            <h3>About me</h3>
            <p>I'm a fresh full stack developer seeking a new challenge</p>
            <p>
              You can check out my portfolio
              <a href="https://yaronl219.github.io/portfolio">here</a>
            </p>
            <p>If you'd like to see the repository for this project on Github, you can check it out <a href="https://github.com/yaronl219/eCommerceVue">here</a></p>
          </v-card-text>
        </div>
      </v-card>
      <div class="large-btns">
        <router-link to="/admin">
          <div class="large-btn admin">
            <div class="overlay-text">Store Manager</div>
          </div>
        </router-link>
        <router-link to="/store">
          <div class="large-btn store">
            <div class="overlay-text">Store</div>
          </div>
        </router-link>
      </div>
    </div>
  </v-main>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style lang="scss" scoped>
.home {
  h1 {
    word-break: normal;
  }
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.about {
  padding: 1rem;
  h3 {
    margin: 2rem 0 0.75rem;
  }
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
}
.admin {
  background-image: url("../assets/img/admin.png");
}

.store {
  background-image: url("../assets/img/store.png");
}

a {
  text-decoration: none;
}
.large-btns {
  padding: 2rem 0rem;
  // min-height: 50vh;
  display: grid;
  // justify-items: center;
  width: 100%;
  max-width: calc(80vh + 2rem);
  grid-template-columns: repeat(auto-fit, minmax(250px, 40vh));
  grid-template-rows: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}
.large-btn {
  cursor: pointer;
  background-size: cover;
  background-position: center;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  filter: grayscale(100%);


  .overlay-text {
    transition: 0.5s;
    opacity: 0%;
    font-size: 3rem;
    font-weight: 500;
    color: #fafafa;
    text-align: center;
  }

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
  &:hover {
    transition: 0.5s;
    transform: scale(1.025, 1.025);
    filter: grayscale(0%);
    .overlay-text {
      opacity: 100%;
    }
  }
}
</style>