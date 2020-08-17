import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const router = new VueRouter({
	mode: 'history',
	routes :[
		{
			path: '/', redirect: '/project'
		},
		
		{
			path:'/index',
			name:'home',
			component:resolve => require(['@/views/home.vue'],resolve)
		},
		{
			path:'/new-course',
			name:'latest',
			component:resolve => require(['@/views/latest.vue'],resolve)
		},
		{
			path:'/maternal',
			name:'parenting',
			component:resolve => require(['@/views/parenting.vue'],resolve)
		},
		{
			path:'/disease',
			name:'disease',
			component:resolve => require(['@/views/disease.vue'],resolve)
		},
		{
			path:'/tcm',
			name:'medicine',
			component:resolve => require(['@/views/medicine.vue'],resolve)
		},
		{
			path:'/lecture',
			name:'interview',
			component:resolve => require(['@/views/interview.vue'],resolve)
		},
		{
			path:'/micro-drama',
			name:'drama',
			component:resolve => require(['@/views/drama.vue'],resolve)
		},
		{
			path:'/fitness',
			name:'fitness',
			component:resolve => require(['@/views/fitness.vue'],resolve)
		},
		{
			path:'/free',
			name:'free',
			component:resolve => require(['@/views/free.vue'],resolve)
		},
		{
			path:'/record',
			name:'record',
			component:resolve => require(['@/views/record.vue'],resolve)
		},
		{
			path:'/collect',
			name:'collect',
			component:resolve => require(['@/views/collect.vue'],resolve)
		},
		{
			path:'/search',
			name:'search',
			component:resolve => require(['@/views/search.vue'],resolve)
		},
		{
			path:'/play',
			name:'play',
			component:resolve => require(['@/views/play.vue'],resolve)
		},
		{
			path:'/screening',
			name:'screening',
			component:resolve => require(['@/views/screening.vue'],resolve)
		},
		{
			path:'/project',
			name:'project',
			component:resolve => require(['@/views/project.vue'],resolve)
		},
		{
			path:'/moveTest',
			name:'moveTest',
			component:resolve => require(['@/views/moveTest.vue'],resolve)
		},
		
	]
})
router.beforeEach((to, from, next) => {
	next()
})
export default router
