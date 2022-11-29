<template>
<!-- :はv-bindの省略記法 -->
<!-- @はv-onの省略記法 -->
<div class="clearfix" :class="{ linkable }" @click="onclick">
    <div class="image"><img :src="book.image" /></div>
    <div class="details">
        <ul>
            <li v-if="index">{{ index }}.</li>
            <li>{{ book.title }} ({{ book.price }})</li>
            <li>{{ book.author }} 著</li>
            <li>{{ book.publisher }} /刊</li>
            <li>{{ book.published }} /発売</li>
        </ul>
    </div>
</div>
</template>

<script>
import { UPDATE_CURRENT } from '@/store/mutation-types'

export default {
    name: 'BookInfo',
    props: {
        index: {type: Number},
        linkable: {type: Boolean, default: false},
        book: {type: Object}

    },
    methods: {
        onclick() {
            if (this.linkable) {
                this.$store.dispatch(UPDATE_CURRENT, this.book);
                this.$router.push('/book-form')
            }
        }
    }
}
</script>

<style>
.linkable:hover {
    cursor: pointer;
    background-color: #ff9;
}
</style>