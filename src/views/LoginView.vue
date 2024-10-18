<script setup>
import { ref } from 'vue'
import { isAuthenticated } from '../router/index.js';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import db from '../firebase/init'
import { useRouter } from 'vue-router'

const formData = ref({
  username: '',
  password: '',})
  const router = useRouter()
  
  const submitForm = async () => {
    const userEmail = formData.value.username
    const userPassword = formData.value.password

    try {
        const { user } = await signInWithEmailAndPassword(getAuth(), userEmail, userPassword)

        const userRef = doc(db, 'users', user.uid)
        const userSnap = await getDoc(userRef)

        if (userSnap.exists()) {
            const userData = userSnap.data()
            isAuthenticated.value = {
                user: user,
                role: userData.role, 
            }
            console.log(`Logged in as ${userData.role}`)
            router.push({ name: 'About' })  
        } else {
            console.error('No user document found in Firestore')
        }
    } catch (error) {
        alert(error.code)
    }
}
</Script>

<template>
  <!-- 🗄️ W3. Library Registration Form -->
  <div class="container mt-5 ">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">🗄️  My health</h1>
        <p class="text-center">
          Allow user to login .
        </p>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-4 col-sm-4 offset-4">
              <label for="username" class="form-label">Email</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="formData.username"
              />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-4 col-sm-4 offset-4">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
              />
              <div class ="mt-3">
                <button type="submit" class="btn btn-primary me-3 offset-5">Login</button>
                </div>
                <div class="text-center mt-3">
                <router-link to="/firebase-register">
                Don't have an account? Click here to create one
               </router-link>
                </div>

              </div>
              </div>
              </form>
              </div>
              </div>
              </div>
</template>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  /* background-color: #e0bfbf; */
  border-radius: 10px;
}

@media (min-width: 1441px) {
  .container {
    max-width: 150vw;
  }
}

/* Class selectors */
.form {
  text-align: center;
  margin-top: 50px;
}

/* ID selectors */
#username:focus,
#password:focus,
#isAustralian:focus,
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
</style>