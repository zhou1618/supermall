module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }//router和store不需要配置，因为所有的组件都可以通过this.$router和this.$store拿到
    }
  }
}