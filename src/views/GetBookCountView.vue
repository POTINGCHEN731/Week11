<template>
  <div class="about">
      <div class="row mt-5">
          <div class="col-md-8 offset-md-2">
    <h1 class = 'text-center'>Get book Counter</h1>
    <button @click="getBookCount">Get book Count</button>
    <p v-if = "count !=null">Total number of books:{{ count }}</p>
    <p v-if = "error">{{error }}</p>  
    </div>
    </div>
  </div>
</template>
  
  <script setup>
  import {ref} from 'vue'
  import axios from "axios"
  const count = ref(null);
  const error = ref(null);
  const getBookCount = async()=>{
    try{
      const response = await axios.get("https://countbooks-7wtrv4pysa-uc.a.run.app");
      count.value = response.data.count;
      error.value = null;
    }catch(err){
      console.log("Error getting book counts",error);
      error.value = err;
      count.value = null;
    }
  }
  </script>