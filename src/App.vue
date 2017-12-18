<template>
  <div id="app">
    <m-header></m-header>
    <m-nav></m-nav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from './components/m-header/m-header'
import Tabs from './components/m-nav/m-nav'
import Player from './components/player/player'

export default {
  components: {
    [MHeader.name]: MHeader,
    [Tabs.name]: Tabs,
    [Player.name]: Player
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
