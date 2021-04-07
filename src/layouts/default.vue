<template>
	<div>
		<Header />
		<Nuxt />
		<Footer />
	</div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
	components: {
		Header,
		Footer,
	},
}
</script>

<style>
body, ul, h1, h2, h3, h4, h5, h6, p{
	margin: 0;
}
ul, input{
	padding: 0;
}
.layer{
	margin: 60px auto;
	max-width: 1200px;
}
ul{
	list-style: none;
}
a{
	text-decoration: none;
	color: #003bfc;
}
input{
	border: 1px solid;
	outline : none;
}
.clearfix::after{
	content: '';
	display: block;
	clear: both;
}
.fl{
	float: left;
}
.fr{
	float: right;
}

</style>
