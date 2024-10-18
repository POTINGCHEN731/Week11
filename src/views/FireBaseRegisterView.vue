<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import db from '../Firebase/init';

const router = useRouter()
const Email = ref('');
const password = ref('');
const auth = getAuth();

const createAccount = async() => {
  const userEmail = Email.value;
  const userPassword = password.value;
  const role = userEmail.toLowerCase().includes('admin') ? 'admin' : 'user';
    try {
        const { user } = await createUserWithEmailAndPassword(auth, userEmail, userPassword)
        await setDoc(doc(db, 'users', user.uid), {
            email: userEmail,
            role: role, 
        })
        alert('Account created successfully')
        router.push({ name: 'About' })
    } catch (error) {
        alert(error.message)
    }
}
  
</script>
    <template>
  <!-- 🗄️ W3. Library Registration Form -->
  <div class="container mt-5 ">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">🗄️ Firebase sign up</h1>
        <p class="text-center">
          Allow user to create a new account .
        </p>
        <form @submit.prevent="createAccount">
          <div class="row mb-3">
            <div class="col-md-4 col-sm-4 offset-4">
              <label for="username" class="form-label">Email</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="Email"
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
                v-model="password"
              />
              <div class ="mt-3">
                <button type="submit" class="btn btn-primary me-3 offset-4">Sign up</button>
                </div>
              </div>
              </div>
              </form>
              </div>
              </div>
              </div>
</template>

<style></style>