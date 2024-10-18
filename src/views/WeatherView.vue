<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-8 offset-md-2 text-center">
        <h1>Current Weather</h1>
        <div class="search-bar d-flex justify-content-center mb-4">
          <input type="text" v-model="city" placeholder="Enter city name" class="me-2"/>
          <button @click="searchByCity" class="search-button btn btn-primary">Search</button>
        </div>
      </div>
      <div class="col-md-8 offset-md-2 text-center" v-if="weatherData">
        <h2>
          {{weatherData.name}}, {{ weatherData.sys.country }}
        </h2>
        <img :src="iconUrl" alt="Weather Icon" class="my-3" />
        <p class="mb-1">{{ temperature }} °C</p>
        <span>{{ weatherData.weather[0].description }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref} from "vue"
import axios from 'axios'
const city = ref("")
const weatherData = ref(null);
const temperature = ref(null);
const iconUrl = ref(null);

const searchByCity = async()=>{
  try{
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=81960ac2717f389b299fa83ead767fc6`)
    weatherData.value = response.data
    temperature.value = Math.floor(weatherData.value.main.temp - 273)
    iconUrl.value = `http://api.openweathermap.org/img/w/${weatherData.value.weather[0].icon}.png`
  }
  catch(error){
    console.log('Error info: ',error)
  }
}

// Access the longtitude and Latitude currently
onMounted(()  =>{
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position)=>{
      const {latitude,longitude}= position.coords
      getCurrentPositionWeatherData(latitude,longitude)
    })
  }
})
// get the current location
const getCurrentPositionWeatherData = async(latitude,longitude)=>{
  try{
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=81960ac2717f389b299fa83ead767fc6`)
    weatherData.value = response.data
    temperature.value = Math.floor(weatherData.value.main.temp - 273)
    iconUrl.value = `http://api.openweathermap.org/img/w/${weatherData.value.weather[0].icon}.png`
  }
  catch(error){
    console.log('Error info: ',error)
  }
}
</script>