<template>
    <div class="wrap layer">
        <div class="head">
            <SvgStudy height='30' width='30' />
            <strong>学 习 笔 记</strong>
            <!-- <span class="search">
                <input type="text" placeholder="Search">
                <SvgSearch class="icon" />
            </span> -->
        </div>
        <ul class="note-label">
            <li v-for="(item, index) in label" :key="index">
                <SvgFolder width='40' />
                <router-link :to="`/note/${item.link}`">
                    <span>{{ item.folder }}</span>
                </router-link>
                <p>files: {{ item.files ? item.files.length : 0 }}</p>
                <!-- <SvgMore class="more" /> -->
            </li>
        </ul>
    </div>
</template>

<script>
import SvgFolder from '@/static/folader.svg?inline';
import SvgMore from '@/static/more.svg?inline';
import SvgStudy from '@/static/study.svg?inline';
import SvgSearch from '@/static/search.svg?inline';
export default {
    components: {
        SvgFolder,
        SvgMore,
        SvgStudy,
        SvgSearch
    },
    head: {
        title: '嗝儿屁_学习笔记'
    },
    async asyncData({ $axios, app }) {
		const label = await $axios.$get(`/note/label`);
		return { label };
	},
    created () {
        if (this.$store.state.noteLabel.length == 0) {
            this.$store.state.noteLabel = this.label;
        }
    }
}
</script>

<style lang='scss' scoped>
.wrap{
    margin: 90px auto;
    padding: 12px;
    border-radius: 14px;
    box-sizing: border-box;
    box-shadow: 0 5px 16px rgba(0,0,0,.2);
}
.head{
    padding: 10px;
    border-bottom: 2px solid #eee;
    svg, strong, input{
        vertical-align: middle;
        margin-right: 10px;
    }
    .search{
        position: absolute;
        input{
            padding: 0 10px;
            line-height: 32px;
            background: #eee;
            border-radius: 5px;
            border: none;
        }
        .icon{
            position: absolute;
            top: 0; bottom: 0;
            right: 20px;
            margin: auto;
            width: 18px;
            height: 18px;
        }
    }
}
.note-label{
    display: flex;
    flex-wrap: wrap;
    align-content: stretch;
    li{
        width: 25%;
        // height: 100px;
        // border: 1px solid #ccc;
        box-sizing: border-box;
        border-radius: 8px;
        margin-top: 10px;
        padding: 10px;
        cursor: pointer;
        position: relative;
        a{
            color: #404040;
        }
        &:hover{
            box-shadow: 0 0 12px rgba(0,0,0,.2);
        }
        svg, span{
            vertical-align: middle;
        }
        span{
            margin-left: 10px;
        }
        p{
            margin-left: 6px;
            color: #999;
        }
        .more{
            position: absolute;
            right: 16px;
            top: 16px;
            height: 14px;
            width: 14px;
        }
    }
}
@media (max-width: 995px) {
    .note-label li {
        width: calc(100% / 3);
    }
}
@media (max-width: 767px) {
    .wrap{
        margin-top: 80px;
        margin-left: 10px;
        margin-right: 10px;
    }
    .note-label{
        justify-content: center;
        li {
            display: inline;
            width: auto;
            margin-top: 0;
            svg, p{
                display: none;
            }
        }
    } 
}
</style>