<template>
	<div class="container clearfix" :style="{width: sidebarBool ? 'calc(100vw - 310px)' : '100vw'}">
		<div class="note-page layer">
			<p class="type">
				<SvgFolder class="folder-svg" />
				<span>
					<router-link to="/note/label">{{ folder }}</router-link>
				</span> / 
				<SvgNote class="note-svg" />
				<span>{{ fileName }}</span>
				<SvgDropDown @click="show = !show" :class="show ? 'active' : ''" class="drop-down-svg" />
			</p>
			<div class="wrap clearfix">
				<div class="content fr markdown-preview" v-html="content"></div>
				<ul class="list fl" :class="show ? 'active' : ''">
					<li v-for="(item, index) in files" 
						:key="index" 
						@click="change(item)"
						:class="item.match(/(\d|\.)+/)[0] == params.id ? 'active' : ''"
					>
						{{ item.slice(0, -3) }}
					</li>
				</ul>
			</div>
		</div>
		<SvgList class="list-svg" @click="sidebarBool = true" />
		<ul class="anchor-links fr" v-show="sidebarBool">
			<li v-for="item in sidebarList" :key='item.id' 
				:class="[item.level]"
				:data-t="item.offsetTop">
				<a :href="'#' + item.id" @click="jumpScrollToY($event, item.offsetTop - 80, item.id)">{{ item.text }}</a>
			</li>
			<SvgClose class="close-svg" @click="sidebarBool = false" />
		</ul>
	</div>
</template>

<script>
import SvgFolder from '@/static/folader.svg?inline';
import SvgNote from '@/static/note.svg?inline';
import SvgClose from '@/static/close.svg?inline';
import SvgList from '@/static/list.svg?inline';
import SvgDropDown from '@/static/dropDown.svg?inline';
import cheerio from 'cheerio';
import '@/util/myMarkdown.scss'
import { scrollTo, throttle } from '@/util/browser.js';
import md from '@/util/interpretMd.js';
import { stringAscll } from '@/util/string';
import h1js from 'highlight.js/lib/core';
export default {
	async asyncData({ $axios, params, store, app }) {
		if (store.state.noteLabel.length == 0) {
			const label = await $axios.$get(`/note/label`);
			store.state.noteLabel = label;
		}
		const arr = store.state.noteLabel;
		let files = {};
		arr.forEach(val => {
			if (val.link.toLowerCase() == params.type.toLowerCase()) {
				files = val;
			}
		})
		let fileName = '';
		files.files.forEach(val => {
			if (val.startsWith(params.id + ' ')) {
				fileName = val;
			}
		})
		let fileSrc = `${files.id} ${files.folder}${files.link == files.folder ? '' : '_' + files.link}/${fileName}`;
		fileSrc = stringAscll(fileSrc);
		// const md = new Markdown();
		const content = md.interpretMd(await $axios.$get('/note/src/' + fileSrc));

		app.head.title = '学习笔记 | ' + files.folder + '_' + fileName.match(/\s.+\.md/)[0].slice(1, -3);
		return {
			...files,  // folder, link, files
			params,
			content,
			fileName: fileName.slice(0, -3),
		}
	},
	data () {
		return {
			show: false,
			sidebarList: [],  // 锚链接跳转列表
			sidebarBool: true,  // 是否显示锚链接跳转列表
		}
	},
	methods: {
		change (str) {
			const id = str.split(' ')[0];
			if (id == this.params.id) return;
			this.$router.push(`/note/${this.params.type}/${id}`);
			this.show = false;
		},
		getTitleAnchorLink () {
			const $ = cheerio.load(this.content);
			const arr = Array.from($('h1,h2,h3,h4'));
			arr.forEach(val => {
				const id = val.attribs.id;
				const text = val.children[0].data;
				const level = val.name
				const offsetTop = document.getElementById(id).offsetTop;
				this.sidebarList.push({id, text, level, offsetTop});
			})
		},
		jumpScrollToY (e, num, id) {
			scrollTo(num);
			e.preventDefault();
			console.log(this.$router)
		}
	},
	mounted () {
		console.log(h1js.highlightAuto(`<pre><code>
			var obj = 'hello'  // 注释
		</code></pre>`))
		this.getTitleAnchorLink();
		if (document.body.offsetWidth < 1025) {
			this.sidebarBool = false;
		}
	},
	beforeRouteUpdate (to, from, next) {
		if (to.path != from.path) next();
	},
	components: {
		SvgFolder,
		SvgNote,
		SvgDropDown,
		SvgClose,
		SvgList,
	}
};
</script>

<style lang='scss' scoped>
.note-page{
	margin-top: 80px;
}
.type{
	svg, span{
		vertical-align: middle;
	}
	.folder-svg{
		width: 30px;
		height: 30px;
	}
	.note-svg{
		width: 26px;
		height: 26px;
	}
	.drop-down-svg{
		display: none;
		width: 26px;
		height: 26px;
	}
}
.wrap{
	width: 100%;
	margin-top: 20px;
	.list{
		width: 200px;
		li{
			line-height: 36px;
			padding: 0 10px;
			box-sizing: border-box;
			font-size: 14px;
			cursor: pointer;
			&:hover{
				background: rgba(0,0,0,.1);
			}
			a{
				display: inline-block;
				width: 100%;
				height: 100%;
			}
			&:not(:nth-last-child(1)){
				border-bottom: 1px solid #eee;
			}
			&.active{
				background: rgba(0, 81, 255, .3);
			}
		}
	}
	.content{
		width: calc(100% - 200px);
		padding: 0 20px;
		box-sizing: border-box;
	}
}
.container{
	width: calc(100vw - 310px);
	.list-svg{
		position: fixed;
		top: 80px; right: 8px;
		width: 20px;
		height: 20px;
		padding: 4px 10px;
		border: 1px solid transparent;
		background: white;
		box-shadow: 2px 2px 6px rgba(0,0,0,.1);
		cursor: pointer;
		&:hover{
			border-color: #999;
		}
	}
	.anchor-links{
		position: fixed;
		top: 60px;
		right: 0;
		width: 260px;
		padding: 20px;
		background: white;
		// box-shadow: 0 5px 10px rgba(0,0,0,.2);
		border-left: 1px solid #ccc;
		// border-radius: 5px;
		li{
			line-height: 32px;
			&.h1{
				font-weight: 700;
				font-size: 18px;
			}
			&.h2{
				list-style: inside;
			}
			&.h3{
				margin-left: 2em;
				list-style: circle;
			}
			&.h4{
				margin-left: 3em;
				list-style: square;
			}
			a{
				color: #404040;
			}
		}
		.close-svg{
			position: absolute;
			right: 20px; top: 24px;
			width: 20px;
			height: 20px;
			cursor: pointer;
		}
	}
}
@media (max-width: 768px) {
	.container{
		width: 100vw !important;
	}
	.type{
		.drop-down-svg{
			display: inline-block;
			transform: rotate(0);
			transition: transform .4s;
			&.active{
				transform: rotate(-90deg);
			}
		}
	}
	.wrap{
		.list{
			position: absolute;
			background: white;
			width: 100%;
			z-index: 99;
			transform: translateX(-100%);
			transition: transform .4s;
			li{
				text-align: center;
			}
			&.active{
				transform: translateX(0);
			}
		}
		.content{
			width: 100%;
			padding: 0 8px;
		}
	}
}
</style>