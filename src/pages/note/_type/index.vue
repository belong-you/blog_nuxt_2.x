<template>
  
</template>

<script>
export default {
    async asyncData ({ $axios, params, store, app, $router }) {
        if (store.state.noteLabel.length == 0) {
			const label = await $axios.$get(`/note/label`);
			store.state.noteLabel = label;
		}
        const arr = store.state.noteLabel;
        let str = null;
		arr.forEach(val => {
			if (val.link.toLowerCase() == params.type.toLowerCase()) {
                str = val.files[0].match(/[\d|\.]+/)[0];
                app.head.title = '个人笔记 | ' + val.folder;
			}
		})
        return {
            params,
            str,
        }
    },
    created () {
        if (this.str == null) {
            this.$router.replace(`/note/label`);
            return;
        }
        this.$router.replace(`/note/${this.params.type}/${this.str}`)
    }
    
}
</script>

<style>

</style>