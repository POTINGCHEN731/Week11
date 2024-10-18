<template>
    <pre>{{ count }}</pre>
  </template>
    
    <script setup>
    import {ref, onMounted} from 'vue'
    import axios from "axios"
    const count = ref(null);
    const error = ref(null);
    const getBookCount = async()=>{
      try{
        const response = await axios.get("https://countbooks-7wtrv4pysa-uc.a.run.app");
        count.value = response.data;
        error.value = null;
      }catch(err){
        console.log("Error getting book counts",error);
        error.value = err;
        count.value = null;
      }
    }
    onMounted(() =>{
        getBookCount();
    })
    </script>