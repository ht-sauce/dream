<template>
  <pre
    @paste="paste"
    style="margin-bottom:15px; border: #d1d4da 1px solid; border-radius: 3px; width: 100%;min-height: 35px;background: #f8f8f8; padding: 10px 10px;box-sizing: border-box;"
  ><code></code></pre>
</template>

<script>
export default {
  mounteds: {
    paste(e) {
      console.log(111111, e);
    }
  }
};
</script>
