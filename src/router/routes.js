import Login from '../pages/login/login.vue'
import Page404 from '../pages/page404/index.vue'
import vipList from '../pages/vipList.vue'
import vipSetting from '../pages/vipSetting.vue'
import instrumentPDF from '../pages/instrumentPDF.vue'
import vipInfo from '../pages/vipInfo.vue'
import vipInfoGroup from '../pages/vipInfoGroup.vue'
import vipInfoCustom from '../pages/vipInfoCustom.vue'


const routes = [{
        path: '/login',
        component: Login
    },
    {
        path:"/vipList",
        component: vipList
    },
    {
        path:"/vipSetting",
        component: vipSetting
    },
    {
        path:"/instrumentPDF",
        component: instrumentPDF
    },
    {
        path:"/vipInfo",
        component: vipInfo
    },
    {
        path:"/vipInfoGroup",
        component: vipInfoGroup
    },
    {
        path:"/vipInfoCustom",
        component: vipInfoCustom
    },
    {
        path: '/',
        component: Login
    },
    {
        path: '*',
        component: Page404 //404页面
    }
]

export default routes