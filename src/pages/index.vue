<template>
<div classs="list">
    <p>{{ bookCount }}件の読書情報が記録されています。</p>
    <!-- :はv-bindの省略記法 -->
    <BookInfo v-for="(book, i) of books"
        :linkable="true" :book="book" :index="i + 1" :key="book.isbn">
    </BookInfo>
</div>
</template>

<script>

export default {
  name: 'TopHome',
  data() {
    return {
      books: []
    }
  },
  computed: {
    bookCount() {
      return this.$store.getters['bookCount']
    }
  },
  methods: {
    onchange(page) {
      this.books = this.$store.getters['getRangeByPage'](page)
    }
  },
  mounted() {
    this.books = this.$store.getters['getRangeByPage'](1)
  }
}
</script>
