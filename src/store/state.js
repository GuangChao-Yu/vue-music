import {
  playMode
} from '../common/js/config'
import {
  loadSearch
} from '../common/js/cache'

const state = {
  singer: {}, // 歌曲
  playing: false, // 是否播放
  fullScreen: false, // 是否全屏
  playlist: [], // 播放列表
  sequenceList: [], // 顺序列表
  mode: playMode.sequence, // 播放类型
  currentIndex: -1, // 当前播放
  disc: {},
  topList: {},
  searchHistory: loadSearch()
}

export default state
