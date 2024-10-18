<script setup>
import { ref, onMounted } from 'vue'
import  db  from '../Firebase/init.js'
import { collection, query, where,getDocs, deleteDoc, doc, updateDoc, orderBy,limit } from 'firebase/firestore'

const books = ref([]);
const editingBook = ref(null);
const showAll = ref(false);
const fetchBooks = async () => {
    try {
        let q;
        if (showAll.value) {
            q = query(
                collection(db, 'books'),
                where('isbn', '>', 1000),
                orderBy('isbn', 'asc')
            );
        } else {
            q = query(
                collection(db, 'books'),
                where('isbn', '>', 1000),
                orderBy('isbn', 'asc'),
                limit(5)
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

const deleteBook = async (bookId) => {
  try {
    const bookRef = doc(db, 'books', bookId);
    await deleteDoc(bookRef);
    console.log('Book deleted successfully');
    fetchBooks(); 
  } catch (error) {
    console.error('Error deleting book: ', error);
  }
};

const editBook = (book) => {
    editingBook.value = { ...book }; 
};
const updateBook = async (bookId) => {
    try {
        const bookRef = doc(db, 'books', bookId);
        await updateDoc(bookRef, {
            name: editingBook.value.name,
            isbn: editingBook.value.isbn,
        });
        console.log('Book updated successfully');
        fetchBooks(); 
        editingBook.value = null; 
    } catch (error) {
        console.error('Error updating book: ', error);
    }
};
const cancelEdit = () => {
    editingBook.value = null;
};

const toggleShowAll = () => {
    showAll.value = !showAll.value;
    fetchBooks(); 
};


</script>

<template>
    <div>
        <h1>Book with ISBN > 1000</h1>
        <ul>
        <li v-for="book in books" :key="book.id" class = "mt-3">
            {{ book.name }} - ISBN: {{ book.isbn }}  
        <button  @click="editBook(book)" class=" btn btn-primary btn-small">Edit</button>
        <button @click="deleteBook(book.id)" class=" btn btn-primary btn-small">Delete</button>
        </li>
        </ul>
        <button @click="toggleShowAll">
            {{ showAll ? 'Show Top 5 Books' : 'Show All Books' }}
        </button>
        <div v-if="editingBook">
            <h2>Edit Book</h2>
            <form @submit.prevent="updateBook(editingBook.id)">
                <label for="name">Name:</label>
                <input type="text" v-model="editingBook.name" />

                <label for="isbn">ISBN:</label>
                <input type="number" v-model="editingBook.isbn" />

                <button type="submit" class=" btn btn-primary btn-small">Update Book</button>
                <button @click="cancelEdit" class=" btn btn-primary btn-small">Cancel</button>
            </form>
        </div>
    </div>
</template>

<style>
.btn-small {
    padding: 5px 10px;
    font-size: 12px;
}
</style>