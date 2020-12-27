<template>
  <v-main>
    <div class="about-container">
      <h2>About</h2>
      <div class="about-project">
        <h3>About this project</h3>
        <p>
          This project started out as a basic project to create a webshop with
          Vue.js.<br />
          That's it. just a basic frontend project to display some items, and
          cart.
        </p>
        <p>
          It quickly grew as more ideas came and I started having fun with it.
        </p>
        <p>
          As you can see, the "admin site" is quite extensive and offers
          reports, product editing system and user details
        </p>
        <p>
          I then needed some test data, so built a very basic Python script to
          create fake orders (get all items, create a fake customer, randomize
          1-5 items and send an order).<br />
          You can play around with it and filter according to different variable
          which is really fun.
        </p>
        <p>
          All the filtering is done via MongoDB's amazing tools for filtering
          and aggregating data. For example: there is no "user" collection in
          the DB, but by aggregating and grouping the "Orders" collection, I was
          able to create a user screen (A user is a number of orders which the
          contact details are identical). This allowed for a whole new feature
          and screen to be born without adding redundant data to the DB, and
          with almost no extra code in the backend
        </p>
        <p>
          All in all, it became a fun project that kept me ocupied during the
          recent Covid lockdown for about a week
        </p>
      </div>
      <div class="tools-container">
        <h3>Tools Used</h3>
        <div class="tools">
          <div class="frontend">
            <h4>Frontend</h4>
            <ul>
              <li>Vue.js (Including Vue Router & VueX</li>
              <li><a href="https://vuetifyjs.com/en/">Vuetify</a></li>
              <li><a href="https://vue-chartjs.org/">Vue Chart.js</a></li>
              <li>
                <a href="https://sortablejs.github.io/Vue.Draggable/#/simple"
                  >Vue Draggable (for the drag and drop of products)</a
                >
              </li>
              <li>
                <a href="https://www.npmjs.com/package/vue-scrollto"
                  >Vue scroll.to (for the drag and drop of products)</a
                >
              </li>
              <li>
                <a href="https://github.com/braintree/card-validator"
                  >Braintree Card Validator (for the CC number validation in the
                  store</a
                >
              </li>
              <li>
                <a href="https://www.npmjs.com/package/libphonenumber-js"
                  >Google's "libphonenumber" (To validate proper phone
                  numbers</a
                >
              </li>
            </ul>
          </div>
          <div class="backend">
            <h4>Backend</h4>
            <ul>
              <li>Node.js</li>
              <li>Express</li>
              <li>MongoDB</li>
              <li>Cloudinary (To upload product images)</li>
              <li>
                <a href="https://github.com/EthanRBrown/rrad"
                  >Addresses were taken from this Github repo</a
                >
              </li>
              <li>
                <a href="http://api.namefake.com/random/random"
                  >The names were taken from "Namefake"</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </v-main>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>

.about-container {
    padding: 1rem;
    
    >div {
        margin: 1.5rem 0rem;
    }
}


.tools {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}
</style>