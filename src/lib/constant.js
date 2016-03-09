export default Constant {

  //添加前缀
   addPrefix(obj = {},prefix = "") {
      const key
      const mirrored = {}

      if (typeof obj === 'object' ) {
          for (key in obj) {
              if (obj.hasOwnProperty(key)) {
                  mirrored[key] = prefix + key
              }
          }
      }

      return mirrored
  }

}

