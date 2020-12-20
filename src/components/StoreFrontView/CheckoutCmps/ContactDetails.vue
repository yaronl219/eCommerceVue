<template>
  <v-card>
    <v-card-title> Contact Details </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          label="Full Name"
          required
          @input="onValidation"
          v-model="contactName"
        ></v-text-field>
        <v-text-field
          label="Phone Number"
          required
          @input="onValidation"
          :rules="phoneRules"
          v-model="phoneNumber"
        ></v-text-field>
        <v-text-field
          label="E-mail"
          @input="onValidation"
          :rules="emailRules"
          required
          v-model="email"
        >
        </v-text-field>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import parsePhoneNumber from 'libphonenumber-js'

export default {
  data() {
    return {
      contactName: '',
      phoneNumber: '',
      phoneRules: [
        v=> !!v || 'Phone Number is Required',
        v => {
          let isValid = false
          let parsedNumber = parsePhoneNumber(v,'IL')
          if (parsedNumber) {
            isValid = parsedNumber.isValid()
          }
          return isValid || 'Phone number must be valid'
        }
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    }
  },
  created() {
    const {contactDetails} = this.$store.getters
    if (contactDetails) {
      this.contactName = contactDetails.contactName
      this.phoneNumber = contactDetails.phoneNumber
      this.email = contactDetails.email
    }
  },
  methods: {
    onValidation() {
      if (![this.contactName,this.phoneNumber,this.email].every(v => v)) return
      let validation = this.$refs.form.validate()
      if (!validation) return
      let contactDetails = {
        contactName: this.contactName,
        phoneNumber: this.phoneNumber,
        email: this.email
      }
      console.log(contactDetails)
      this.$store.dispatch({type: 'setContactDetails',contactDetails})
      this.$emit('contact-details',contactDetails)
    }
  }
};
</script>

<style>
</style>