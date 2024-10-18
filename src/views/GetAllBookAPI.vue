<script setup>
import { ref, onMounted } from 'vue'
import  db  from '../Firebase/init.js'
import { collection, query,getDocs } from 'firebase/firestore'

const books = ref([]);
const fetchBooks = async () => {
    try {
        let q;
       {
            q = query(
                collection(db, 'books'),
            );
        } 
        const querySnapshot = await getDocs(q)
        const booksArray = []
        querySnapshot.forEach((doc) => {
            booksArray.push({ id: doc.id, ...doc.data() })
        })
        books.value = booksArray
    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {
    fetchBooks();
})
</script>

<template>
<pre>{{ books }}</pre>
</template>

<style>
.btn-small {
    padding: 5px 10px;
    font-size: 12px;
}
</style>