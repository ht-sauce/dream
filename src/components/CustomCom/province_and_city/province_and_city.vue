<template>
  <div class="province_and_city">
    <el-select
      v-model="value.province"
      placeholder="请选择省"
      size="small"
      value-key="areaname"
      @change="e => get_province_and_city(e, 1)"
    >
      <el-option
        v-for="(item, index) in province"
        :key="item.areacode"
        :label="item.areaname"
        :value="{
          areacode: item.areacode,
          areaname: item.areaname,
          index: index,
        }"
      >
      </el-option>
    </el-select>
    <span>省</span>
    <el-select
      v-model="value.city"
      placeholder="请选择市"
      size="small"
      value-key="areaname"
      @change="e => get_province_and_city(e, 2)"
    >
      <el-option
        v-for="(item, index) in cityArray.subarea"
        :key="item.areacode"
        :label="item.areaname"
        :value="{
          areacode: item.areacode,
          areaname: item.areaname,
          index: index,
        }"
      >
      </el-option>
    </el-select>
    <span>市</span>
    <el-select
      v-model="value.area"
      placeholder="请选择区"
      value-key="areaname"
      size="small"
      @change="e => get_province_and_city(e, 3)"
    >
      <el-option
        v-for="(item, index) in areaArray.subarea"
        :key="item.areacode"
        :label="item.areaname"
        :value="{
          areacode: item.areacode,
          areaname: item.areaname,
          index: index,
        }"
      >
      </el-option>
    </el-select>
    <span>区</span>
  </div>
</template>

<script>
import address from './address.json'
export default {
  props: {
    value: {
      type: [Object, Array],
      default() {
        return {
          province: '',
          city: '',
          area: '',
        }
      },
    },
  },
  watch: {
    // 监听vue值，设置默认值
    value: {
      immediate: true,
      deep: true,
      handler(e) {
        if (e.province && typeof e.province === 'string') {
          // 根据省级数据获取市数组
          address.data.map((city, ci) => {
            if (city.areaname === e.province) {
              this.cityArray = city
              e.province = {
                areacode: city.areacode,
                areaname: city.areaname,
                index: ci,
              }
              // 在得到市级数据之后，根据传入市级数据得到区数据
              if (e.city) {
                city.subarea.map((area, ai) => {
                  if (area.areaname === e.city) {
                    this.areaArray = area
                    e.city = {
                      areacode: area.areacode,
                      areaname: area.areaname,
                      index: ai,
                    }
                    if (e.area) {
                      this.areaArray.subarea.map((val, index) => {
                        if (val.areaname === e.area) {
                          e.area = {
                            areacode: val.areacode,
                            areaname: val.areaname,
                            index: index,
                          }
                        }
                      })
                    }
                  }
                })
              }
            }
          })
        }
      },
    },
  },
  data() {
    return {
      province: address.data,
      cityArray: [],
      areaArray: [],
    }
  },
  created() {},
  methods: {
    get_province_and_city(e, type) {
      // 省份
      if (type === 1) {
        // 找到的市数据存入数组
        this.cityArray = address.data[e.index]
        this.value.city = ''
        this.value.area = ''
        this.areaArray = []
      }
      // 市操作
      if (type === 2) {
        this.value.area = ''
        this.areaArray = this.cityArray.subarea[e.index]
      }
      // 区操作
      //if (type === 3) {}
      this.$emit('change', this.value)
    },
  },
}
</script>

<style scoped lang="scss">
.province_and_city {
  display: flex;
  align-items: center;
  > span {
    padding: 7px;
  }
}
</style>
