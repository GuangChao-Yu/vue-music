<template>
  <Scroll class="suggest" :data="result" :pullup="pullup" :pulldown="pulldown" @scrollToEnd="searchMore" ref="suggest" @scrollToTop="searchTop" @beforeScroll="listScroll">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="(item,index) in result" :key="index" @click="selectItem(item)">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果" v-show="!hasMore&&!result.length"></no-result>
    </div>
  </Scroll>
</template>

<script>
import { search } from '../../api/search'
import { ERR_OK } from '../../api/config'
import { createSong } from '../../common/js/song'
import Scroll from '../../base/scroll'
import Loading from '../../base/loading'
import Singer from '../../common/js/singer'
import { mapMutations, mapActions } from 'vuex'
import noResult from '../../base/no-result/no-result'

const TYPE_SINGER = 'singer'
const perPage = 20

export default {
  name: 'suggest',
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    searchTop() {
      alert('收到上拉刷新事件了')
    },
    search() {
      this.hasMore = true
      this.page = 1
      this.$refs.suggest.scrollTo(0, 0)
      search(this.query, this.page, this.showSinger, perPage).then((res) => {
        if (res.code === ERR_OK) {
          this.result = this._genResult(res.data)
          this._checkMore(res.data)
        }
      })
    },
    refresh() {
      this.$refs.suggest.refresh()
    },
    _checkMore(data) {
      const song = data.song
      if (!song.list.length || (song.curnum + song.curpage * perPage) >= song.totalnum) {
        this.hasMore = false
      }
    },
    _genResult(data) {
      let ret = []
      if (data.zhida && data.zhida.singerid) {
        ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } })
      }
      if (data.song) {
        ret = ret.concat(this._normalizeSongs(data.song.list))
      }
      return ret
    },
    getIconCls(item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    getDisplayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.name}-${item.singer}`
      }
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((musicdata) => {
        if (musicdata.songid && musicdata.albumid) {
          ret.push(createSong(musicdata))
        }
      })
      return ret
    },
    searchMore() {
      if (!this.hasMore) return
      this.page++
      search(this.query, this.page, this.showSinger, perPage).then((res) => {
        this.result = this.result.concat(this._genResult(res.data))
        this._checkMore(res.data)
      })
    },
    selectItem(item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        })
        this.$router.push({
          path: `/search/${singer.id}`
        })
        this.setSinger(singer)
      } else {
        this.insertSong(item)
      }
      this.$emit('select')
    },
    listScroll() {
      this.$emit('listScroll')
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions(['insertSong'])
  },
  watch: {
    query(newQuery) {
      if (!newQuery) return
      this.search(newQuery)
    }
  },
  data() {
    return {
      page: 1,
      result: [],
      pullup: true,
      pulldown: true,
      hasMore: true,
      beforeScroll: true
    }
  },
  components: {
    [Scroll.name]: Scroll,
    [Loading.name]: Loading,
    noResult
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
