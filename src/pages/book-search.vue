<template>
<div id="search">
    <!-- :はv-bindの省略記法 -->
    <!-- @はv-onの省略記法 -->
    <form>
        <label>キーワード: </label>
        <input type="text" size="large" v-model="keyword">
        <div>
            <button type="button" @click="fetch()">検索</button>
        </div>
    </form>
    <hr />
    <BookInfo v-for="(book, i) of books"
        :linkable="true" :book="book" :index="i + 1" :key="book.isbn">
    </BookInfo>
</div>
</template>

<script>
export default {
    data() {
        return {
            keyword: 'vuejs',
            books: [],

        }
    },
    methods: {
        async fetch() {
            const data = await this.$axios.$get(`https://www.googleapis.com/books/v1/volumes?q=${this.keyword}`)
            for (let book of data.items) {
                const authors = book.volumeInfo.authors
                const price = book.saleInfo.listPrice
                const img = book.volumeInfo.imageLinks
                this.books.push({
                    id: book.id,
                    title: book.volumeInfo.title,
                    author: authors ? authors.join(',') : '',
                    price: price ? price.amount : '-',
                    publisher: book.volumeInfo.publisher,
                    published: book.volumeInfo.publishedDate,
                    image: img ? img.smallThumbnail : ''
                })
            }
        }
    }
}
</script>

<style scoped>
#search form {
    margin-top: 15px;
}
</style>