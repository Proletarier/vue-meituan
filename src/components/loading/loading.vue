<template>
  <div v-if="show" id="loading">
    <div class="load_bg">
      <i class="load_animate"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style lang='stylus' scoped>
#loading {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;

  .load_bg {
    display: inline-flex;
    margin: auto;
    height: 47px;
    width: 47px;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAABeCAYAAACq0qNuAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAACpElEQVR42u3dX2/SYBiG8YsXBkSxmWZ4hmfG7/91NNGDnTkylDBTiAMPHphYgZU/7T3C/TvbCE25eGlLOXga7K8DZEAP6AJtoAk0DtjWOVoAj8AMyIEJMAam+2ykbKwG8BboE8HtfxPgDhgRb85OZcJnwIBY3fa8HLglPgVb7QqfiOA36ldypobEGzDf9GBzy5NawEfgWr33Z+wVcbT4wYb4m8K3gE/LJ9px2sTiHVGIXwyfiJXu6KfTAt4A96yddIvhP+DDSxXawBXwc/WPtPZghk+kVbohGgP/hh+o9+wCDFheSa7Cv8PX6XXoEl9En8L31Xt0QfoQ4Tv4NkCdekAnsXbAt9pkCa92hV7CJ1WFbiIu7q1e7cT2G2VWnWbicn45ekka6fht2CEcXsThRRxexOFFHF7E4UUcXsThRRxexOFFHF7E4UUcXsThRRxexOFFHF7E4UUcXsThRRxexOFFHF7E4UUcXsThRRxexOFFHF7E4UUcXsThRRxexOFFHF7E4UUcXsThRRxexOFFHF7E4UUcXsThRRxexOFFHF7E4UUcXsThRRxexOFFHF7E4UUcXsThRRIlxqPZyS0SMTDQ6vWYiCmNVq9ZIoYCWr3yRIzDtHpNEs+Mv7RKjBMxedervj4TYLq6jr9T780FuYO/X6BG+CRbh5xo/RR+QUzbtWrdsvzCuj6YZUpMQfMs12oMge+rP4oTccbEJDSPKDqtB+AbOwbpLogZ09fE5F07Xg58oXBrZtMMqDlxAsiIqbt2uF/AZ+B38YFtw7fmxIzpK3zMP9QQ+MqWm5Blhm9lxORdzwQsJyeuXnbeESg79axBTN59D7xWv7IX6oG4ahlR4jeOQ8bNdYhPQY/4FLSJQ9aljK5bEIePGbG6J8Tqnu6zkT9X5lbtRNYDpQAAAABJRU5ErkJggg==');
    background-size: 100% 100%;

    .load_animate {
      margin: auto;
      display: block;
      height: 26px;
      width: 26px;
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAQAAABvcdNgAAAC/UlEQVRYw+3Xz0uTcRzA8UedPyN/TGWgm5MiZTCnbWFeomnK0kOSCyHcIUWlOuhDl3bISyVWO3gSWRZUR2Hp0VOhniQQZDAIOsZ2eP6Idwe/rMfvnrk9z5QI/D6n72ff7/Pa8+H7U1FMFkZJk2ZUOe9CGoD0+UOinN0LBznkkMFiIWpx4qTWPHSEhsZP7MVAVODCjRuneSiFhobGSlGQHbdVaEFAGTyFICoF46bePFTFD0FtFoQcgmmnzMpwGBOQxt3TIOqy31NndeR9FdABVfkgymgXjMP6EPeQEdRTacJmsvX67PdUljKb3gkopUtoht+MZetOwdiLnZ677DIt/yvs/EJDI5m35zHkolyKl+HARw8NJ8P7pEiRYodhqcMdkhzJ0UIrAo14CRAgQI8xlCLFe66WtHjV0CUQA2iQAx2VZIkmS4iNDvw6pjdnCtPEEkkddsAt00wDfTrETwc244ZdfNJR30xDPTrmGjWnNx5mp2TIS2MxzSuZZp/vllLnw4fD0op3Uf59YYAt9qRniwHL72shSEh6grQoBswee2xZhnKZECGC+aDts4cG2M5hEiWkrtWAuk3rxSD9P2eWjXt8YAO/6Z5tTBDGI58fjBv3s0aCBAnipqEJIkSIMI7r9IZOXgikNChChJE8exL1zLGpY75YSt2kjpqin2q5yXU+65BN5izcCxRFoZp+pnTYpHSRYV3HvCyQ4cL77JCOChtDa9yUunl5wwrevK/tZJZZOqWoi3EBPTj5g58NPjIuH4+4xCpx4rzNC82hovJEPvNQjocw4SLvgDwkTpw4Md2RLEqUrmx9HhUVlaFSst3GuoBC2ViUZZaJZusBAS3SbB1aFMzrvyll+fjR3ccfCSpslekVTJw+XVSCFIUrAlItXQ6w8Uowz07EcyBF4b6ApqkwD40IZp32glAzC4K6YR6KCWhKihtAikJQQPNWoVUuFwXV8BgVlVkrQyFGDF9O3BBSFDqZYUZeIUqZW3mgs99/pQl7flA3UZ7TbbbfH2Ist6VkGxDNAAAAAElFTkSuQmCC');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      animation: _loading 1s linear 0s infinite normal running;
    }

    @keyframes _loading {
      form {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }
  }
}
</style>