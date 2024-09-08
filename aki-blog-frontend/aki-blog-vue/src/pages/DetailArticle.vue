<!-- Article Detail -->
<template>
    <div>
        <sg-nav></sg-nav>
        <div class="container" id="detail">
            <el-row  :gutter="30">
                <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
                    <sg-articleDetail></sg-articleDetail>
                    <sg-message></sg-message>
                </el-col>
                <el-col :sm="24"  :md="8" >
                    <sg-rightlist></sg-rightlist>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import header from '../components/header.vue'
import rightlist from '../components/rightlist.vue'
import articleDetail from '../components/articleDetail.vue'
import message from '../components/message.vue'
    export default {
        name:'DetailShare',
        data() { 
            return {

            }
        },
        methods: { 

        },
        components: { 
            'sg-nav':header,
            'sg-articleDetail':articleDetail,
            'sg-message':message,
            'sg-rightlist':rightlist,
        },
        created() { // Life circle function

        },
        mounted() {
            this.$nextTick(() => {
                var anchor = document.querySelector("#detail");
                if (anchor) {
                    var top = anchor.offsetTop - 60;
                    document.body.scrollTop = top;
                    document.documentElement.scrollTop = top;
                }
            });
        }
    }
</script>

<style>
</style>
