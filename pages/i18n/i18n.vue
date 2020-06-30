<template>
	<view>
		<view v-for="(lang, key, index) in langs" :key="key" :style="{color: key === language ? '#39c' : '#333'}" @tap="toggleLanguage(key)">{{ lang }}</view>
		
		<view>-------</view>
		
		
		<view>{{lang.text}}</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { getLanguages } from '@/lang'
	export default {
		data() {
			return {
				langs: getLanguages()
			}
		},
		computed: {
			...mapGetters([
			      'language'
			    ]),
			lang() {
				return this.$t('test')
			}
		},
		methods: {
			toggleLanguage(lang) {
				this.$i18n.locale = lang
				this.$store.dispatch('setLanguage', lang)
			}
		}
	}
</script>

<style>

</style>
