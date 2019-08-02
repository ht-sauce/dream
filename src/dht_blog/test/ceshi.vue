<template>
  <div>
    <div class="middle">
      <ul>
        <li><img src="./img/1.jpg" alt="" /></li>
        <li><img src="./img/2.jpg" alt="" /></li>
        <li><img src="./img/3.jpg" alt="" /></li>
        <li><img src="./img/4.jpg" alt="" /></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    var new_array = [];
    function _getChilds(data) {
      if (data.ObjType == "某个数") {
        new_array.push(cs_data);
      }
      if (data.Childs) {
        if (data.Childs.length > 0) {
          getChilds(data.Childs);
        }
      }
    }
    function getChilds(data) {
      for (var i = 0; i < data.length; i++) {
        _getChilds(data[i]);
      }
    }
  },
  methods: {
    drag(ev) {
      ev.dataTransfer.setData("Text", ev.target.id);
    }
  }
};
</script>

<style scoped lang="scss">
.middle {
  width: 526.4px;
  height: 185px;
  overflow: hidden;
  transform-style: preserve-3d;
  border: 1px solid #000;
  perspective: 800px;
  margin: 0 auto;
  transform: translateY(100%);
}
.middle ul {
  position: relative;
  height: 185px;
  width: 2000px;
}
.middle ul li {
  width: 329px;
  height: 185px;
  overflow: hidden;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.middle ul li img {
  width: 100%;
}
.middle ul li:nth-of-type(1) {
  transform: translateX(230.3px) scale(0.8);
  animation: three-D 12s ease 0s infinite;
}
.middle ul li:nth-of-type(2) {
  transform: translateX(98.7px) scale(1);
  animation: three-Dmm 12s ease 0s infinite;
}
.middle ul li:nth-of-type(3) {
  transform: translateX(230.3px) scale(0.8);
  animation: three-D 12s ease -3s infinite;
}
.middle ul li:nth-of-type(4) {
  transform: translateX(230.3px) scale(0.8);
  animation: three-D 12s ease 3s infinite;
}
@keyframes three-D {
  5%,
  25% {
    opacity: 0.8;
    z-index: 1;
    transform: translateX(230.3px) scale(0.8);
  }
  30%,
  50% {
    opacity: 1;
    z-index: 2;
    transform: translateX(98.7px) scale(1);
  }
  55%,
  75% {
    opacity: 0.8;
    z-index: 1;
    transform: translateX(-32.9px) scale(0.8);
  }
  76% {
    opacity: 0;
  }
  77%,
  100% {
    opacity: 0;
    transform: translateX(230.3px) scale(0.8);
  }
}
@keyframes three-Dmm {
  5%,
  25% {
    opacity: 0.8;
    z-index: 1;
    transform: translateX(-32.9px) scale(0.8);
  }
  26% {
    opacity: 0;
  }
  27%,
  50% {
    opacity: 0;
    transform: translateX(230.3px) scale(0.8);
  }
  55%,
  75% {
    opacity: 0.8;
    z-index: 1;
    transform: translateX(230.3px) scale(0.8);
  }
  80%,
  100% {
    opacity: 1;
    z-index: 2;
    transform: translateX(98.7px) scale(1);
  }
}
</style>
