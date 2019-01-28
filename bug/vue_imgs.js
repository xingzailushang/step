// vue 图片顺序加载
/* 
 * 修改showAll 中的值，并不能触发页面更新，需用 vue.$set()
 * 参考地址1  https://blog.csdn.net/websoftware/article/details/73200957
 * 参考地址2  https://blog.csdn.net/zifeiyu130/article/details/78950244
 */
<template lang="pug">
    .page-raiders
        bx-header(:title="bxtitle")
        img(:src="raidersAll[0]", v-if="showAll[0]")
        img(:src="raidersAll[1]", v-if="showAll[1]")
        img(:src="raidersAll[2]", v-if="showAll[2]")
        img(:src="raidersAll[3]", v-if="showAll[3]")
        img(:src="raidersAll[4]", v-if="showAll[4]")
        img(:src="raidersAll[5]", v-if="showAll[5]")
        img(:src="raidersAll[6]", v-if="showAll[6]")
        img(:src="raidersAll[7]", v-if="showAll[7]")
        img(:src="raidersAll[8]", v-if="showAll[8]")

</template>
<script>
    export default {
        data() {
            return {
                raidersAll: [
                    require("./raider0.jpg"),
                    require("./raider1.jpg"),
                    require("./raider2.jpg"),
                    require("./raider3.jpg"),
                    require("./raider4.jpg"),
                    require("./raider5.jpg"),
                    require("./raider6.jpg"),
                    require("./raider7.jpg"),
                    require("./raider8.jpg"),
                ],
                showAll: [
                    true,false,false,false,false,false,false,false,false
                ],
                nowIndex: 0
            }
        },
        created() {
            this.downloadImg(this.nowIndex);
        },
        methods: {
            downloadImg(i) {
                if(i < 9){
                    let img = new Image();
                    img.src = this.raidersAll[i];
                    img.onload = () => {
                        this.$set(this.showAll, i, true)
                        this.nowIndex++;
                        this.downloadImg(this.nowIndex);
                    }
                }
            },

        }
    }

</script>
<style lang="stylus">
   
</style>
