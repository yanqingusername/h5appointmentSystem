<template>
  <div class="child-section">
    <van-nav-bar
      title="修改配置"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main">

      
      <div class="dis_setting">
        <div class="s_center_t">VIP上门（5人以下）</div>
      </div>

      <div class="search-list-role">
        <div class="dis_setting_i" >
                <div class="s_center_t_item">每时段上限</div>
                <div class="s_setting_t_item" style="color:#E06596;"><van-stepper v-model="appointment_person_num" integer input-width="40" theme="round" button-size="30"/></div>
              </div>
      </div>

      <div class="dis_setting_icon">
        <div class="s_setting_t" style="color:#E27A62;"><van-icon name="info-o" size="24" style="margin-right:4px;color:#E27A62;"/></div>
        <div class="s_center_t" style="color:#E27A62;">温馨提示：当前有多少个可以做家庭上门服务的护士，就设置为多少。</div>
      </div>
      
      <div class="empty_view"></div>
      

      <div class="view_bottom">
        <div class="view_bottom_left" @click="clickSubmit">保存配置</div>
      </div>
    </div>


  </div>
</template>

<script>
import { updatePersonNum } from "../request/api";
import { Toast } from "vant";
export default {
  name: "",
  components: {
  },
  data() {
    return {
      roleId:'',
      roleName:'',
      userId:'',
      appointment_person_num: 1,
    };
  },
  created() {
    this.roleId = this.$route.query.id;
    this.roleName = this.$route.query.name;
    this.userId = this.$route.query.userId;
    console.log(this.roleId)
    console.log(this.roleName)
    console.log(this.userId)
   
  },
  mounted() {
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    clickSubmit(){
      let that = this;
      updatePersonNum({
        service_type: '0',
        appointment_person_num: that.appointment_person_num
      }).then((res) => {
        if (res.data.success) {
          Toast(res.data.msg)
        } else {
          Toast(res.data.msg)
        }
      });
    }
  },
};
</script>
<style scoped lang="scss">

.child-section{
background-color: #F5F5F5;
height: 100%;
}
.icon_logo {
  width: 40px;
  height: 40px;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  // padding-top: 30px;
}

.dis_setting{
  width: 100%;
      display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 80px 50px 20px 50px;
}
  .s_center_t{
  font-size: 28px;
}

.dis_setting_i{
  width: 100%;
      display: flex;
    justify-content: space-between;
    align-items: center;
  padding: 30px 20px;
  background:#FFFFFF;
  border-radius: 20px;
  margin-top: 20px;
}

.dis_setting_icon{
  width: 100%;
      display: flex;
  padding: 30px 30px;
  margin-top: 20px;
}

.s_center_t_item{
  font-size: 32px;
}

.s_setting_t_item{
  font-size: 32px;
}

.search-list-role{
  // height: 1110px;
  border: 0 none;
  // background-color: #FFFFFF;
  width: 100%;
  padding: 0px 30px;

}

.empty_view{
  height: 150px;
  width: 100%;
}

.view_bottom {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  position: fixed;
  bottom: 50px;
  z-index: 9;
  height: 120px;
}

.view_bottom_left {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 690px;
  height: 98px;
  background: #E06596;
  border-radius: 50px;
  border: 1px solid #E06596;
  font-size: 34px;
  color: #FFFFFF;
}


</style>