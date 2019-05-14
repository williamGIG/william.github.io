module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins:[
      [
        "component",
        {
          //引入mint-ui的插件
          "libraryName": "mint-ui",
          "style": true
        }
      ]
  ]
}
