<template>
    <header>
        <div class="logo fl">
            <SvgList class="list-svg" @click="show = true"/>
            <SvgLogo class="logo-svg" />
        </div>
        
        <ul class="list fl" :class="show ? 'active' : ''">
            <li class="close">
                <SvgClose class="close-svg" @click.stop="show = false" />
                <SvgLogo class="logo-svg" />
            </li>
            <li v-for="(item, index) in list" :key="index" @click="show = false">
                <router-link :to="item.to">{{ item.name }}</router-link>
            </li>
            
        </ul>
        <div class="sign-in fr">signIn</div>
        <div class="search fr">
            <!-- <input type="text"> -->
            <SvgSearch class="icon fr" />
        </div>
    </header>
</template>

<script>
import SvgSearch from '@/static/search.svg?inline';
import SvgLogo from '@/static/logo.svg?inline';
import SvgList from '@/static/list.svg?inline';
import SvgClose from '@/static/close.svg?inline';
export default {
    components: {
        SvgSearch,
        SvgLogo,
        SvgList,
        SvgClose,
    },
    data () {
        return {
            show: false,
            list: [
                { name: '首页', to: '/' },
                { name: '笔记', to: '/note/label' },
                { name: '留言', to: '/' },
                { name: '关于', to: '/about' },
            ]
        }
    }

}
</script>

<style lang="scss" scoped>
header{
    position: fixed;
    top: 0;
    width: 100vw;
    height: 60px;
    padding: 0 20px;
    box-sizing: border-box;
    box-shadow: 5px 0 10px rgba(0,0,0,.1);
    background: white;
    z-index: 999;
}
.logo, .list, .sign-in, .search{
    line-height: 60px;
}
.logo{
    .logo-svg{
        position: absolute;
        top: 0; bottom: 0;
        margin: auto;
        height: 40px;
    }
    .list-svg{
        width: 20px;
        height: 60px;
        display: none;
        margin-right: 16px;
    }
}
.list{
    margin-left: 100px;
    li.close{
        display: none;
    }
    li{
        float: left;
        padding: 0 20px;
        cursor: pointer;
        &:hover{
            background: rgba(0,0,0,.1);
        }
        a{
            display: inline-block;
            width: 100%;
            height: 100%;
        }
    }
}
.search{
    margin-right: 20px;
    max-width: 300px;
    position: relative;
    input{
        line-height: 28px;
        border-color: #999;
        border-radius: 4px;
        background: #eee;
        box-sizing: border-box;
        padding: 0 10px;
        border-width: 0;
        &:focus{
            border-color: #006eff;
        }
    }
    .icon{
        position: absolute;
        right: 10px;
        width: 14px;
        height: 60px;
    }
}
@media (max-width: 767px) {
    .logo{
        .list-svg{
            display: inline-block;
        }
    }
    .list{
        position: fixed;
        left: 0; top: 0;
        margin: 0;
        z-index: 10;
        width: 66%;
        height: 100vh;
        background: white;
        transform: translateX(-100%);
        transition: transform .4s;
        &.active{
            transform: translateX(0);
            box-shadow: 5px 0 10px rgba(0,0,0,.2);
        }
        li.close{
            display: block;
            margin-top: 8px;
            svg{
                vertical-align: middle;
            }
            .logo-svg{
                width: 80px;
            }
            .close-svg{
                margin-right: 20px;
                width: 22px;
                height: 22px;
            }
        }
        li{
            float: none;
            line-height: 40px;
            letter-spacing: 4px;
            &:not(:last-of-type){
                border-bottom: 1px solid #eee;
            }
        }
        
    }
    
}

</style>