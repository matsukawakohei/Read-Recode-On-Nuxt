import { UPDATE_CURRENT, UPDATE_BOOK } from './mutation-types'

export const state = () => ({
  books: [],
  current: null
})

export const getters = {
  bookCount(state) {
    return state.books.length
  },
  allBooks(state) {
    return state.books
  },
  getRangeByPage(state) {
    return page => {
      const SIZE = 3
      return state.books.slice((page - 1) * SIZE, (page - 1) * SIZE + SIZE)
    }
  },
  getBookById(state) {
    return id => {
      return state.books.find(book => book.id === id)
    }
  },
  current(state) {
    return state.current;
  }
}

export const mutations = {
  updateCurrent(state, payload) {
    state.current = payload
  },
  updateBook(state, payload) {
    const book = this.getters.getBookById(payload.id)
    if (book) {
      Object.assign(book, payload)
    } else {
      state.books.push(payload)
    }
  }
}

export const actions = {
  updateCurrent({ commit }, payload) {
    commit(UPDATE_CURRENT, payload)
  },
  updateBook({ commit }, payload) {
    commit(UPDATE_BOOK, payload)
  }
}

// export const plugins = () => ({
//   createPersistedState({
//     key: 'read-recode',
//     storage: localStorage
//   })
// })
