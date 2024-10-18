<script setup>
import { ref } from 'vue'
import BookList from '../components/BookList.vue'
import axios from "axios";
const isbn = ref('')
const name = ref('')

const addBook = async () => {
  try {
    const isbnNumber = Number(isbn.value);
    if (isNaN(isbnNumber)) {
      alert('ISBN must be a valid number');
      return;
    }

    await axios.post('https://addbook-7wtrv4pysa-uc.a.run.app', {
      isbn: isbnNumber,
      name: name.value,
    });

    isbn.value = '';
    name.value = '';
    alert('Book added successfully!');
  } catch (error) {
    console.error('Error adding book:', error);
    alert('Failed to add book');
  }
};


</script>

<template>
    <div>
        <h1>Add book</h1>
        <form @submit.prevent = "addBook">
            <div>
            <label for="isbn">ISBN:</label>
            <input type="text" id="isbn" v-model="isbn" required>
            </div>
            <div>
            <label for="name">Name</label>
            <input type="text" id="name" v-model="name" required>
            </div>
            <button type = "submit">Add book</button>
        </form>
        <BookList />
    </div>
</template>