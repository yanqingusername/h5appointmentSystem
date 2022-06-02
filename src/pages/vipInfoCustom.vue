<template>
  <div class="child-section">
    <van-nav-bar
      title="填写预约信息"
    />
    <!-- left-text="返回"
      left-arrow
      @click-left="onClickLeft" -->
    <div class="main" v-if="isShowResult == 1">

      <div class="dis_setting_icon_d">
        <div class="s_center_t_d">感谢您使用VIP上门检测服务</div>
      </div>

      <div class="search-list-role-from">
        <div class="search-list-role-from-a">
          <div class="search-list-role-from-b">上门地址</div>
          <div class="search-list-role-from-c">
            <div class="s_center_t_item" style="width: 20%">姓名</div>
            <div class="select-item input-item">
              <input
                v-model="vip_person"
                type="text"
                name="vip_person"
                placeholder="请输入联系人姓名"
                maxlength="50"
              />
            </div>
          </div>

          <div class="search-list-role-from-c">
            <div class="s_center_t_item" style="width: 20%">手机号</div>
            <div class="select-item input-item">
              <input
                v-model="vip_phone"
                type="number"
                name="vip_phone"
                placeholder="请输入联系人手机号"
                maxlength="11"
              />
              <div class="clear_1" @click="clearPhone" v-if="vip_phone">
                <img class="icon_clear" src="../assets/images/deleteTest.png" />
              </div>
            </div>
          </div>
          <div class="search-list-role-from-c">
            <div class="s_center_t_item" style="width: 20%">所在地区</div>
            <div class="select-item input-item" @click="clickArea">
              <input
                v-model="provincecityarea"
                type="text"
                name="provincecityarea"
                placeholder="请选择所在地区"
                disabled="true"
              />
              <div class="clear_1" style="padding: 0px">
                <van-icon name="arrow" />
              </div>
            </div>
          </div>
          <div class="search-list-role-from-g" style="border-bottom: none">
            <div class="s_center_t_item_g" >详细地址</div>
            <van-field
              v-model="address"
              rows="1"
              autosize
              label=""
              type="textarea"
              placeholder="请填写详细地址"
            />
          </div>
        </div>
      </div>

      <div class="dis_setting_icon">
        <div class="s_setting_t" style="color: #e27a62">
          <van-icon
            name="info-o"
            size="20"
            style="margin-right: 4px; color: #e27a62"
          />
        </div>
        <div class="s_center_t" style="color: #e27a62" @click.stop="clickPDF">
          温馨提示：上门区域限北京四环内及部分四环外，<span style="text-decoration-line: underline;">点击查看</span>
        </div>
      </div>

      <div class="search-list-role-from">
        <div class="search-list-role-from-a">
          <div class="search-list-role-from-d">
            <div class="s_center_t_item">期望上门时间</div>
            <div class="s_setting_t_item" @click="clickDate">
              <span>{{dateText ? dateText : '请选择期望上门时间'}}</span><van-icon name="arrow" />
            </div>
          </div>
        </div>
      </div>

      <div class="search-list-role">
        <div class="dis_setting_i">
          <div class="s_center_t_item">受检人数</div>
          <div class="s_setting_t_item" style="color: #e06596">
            <van-stepper
              v-model="inspection_person_num"
              integer
              input-width="40"
              theme="round"
              button-size="30"
              max="10"
            />
          </div>
        </div>
      </div>

      <div class="dis_setting_icon">
        <!-- <div class="s_setting_t" style="color: #e27a62">
          <van-checkbox v-model="checkedStatus" checked-color="#ee0a24">已阅读并同意<span style="text-decoration-line: underline;">预约须知</span></van-checkbox>
        </div> -->

        <div class="s_setting_t" style="color: #e27a62">
         <van-checkbox v-model="checkedStatus" checked-color="#ee0a24"></van-checkbox>
        </div>
        <div class="s_center_t" style="color: #e27a62" @click.stop="clickYYXZPDF">
          已阅读并同意<span style="text-decoration-line: underline;">预约须知</span>
        </div>

      </div>

      <div class="empty_view"></div>

      <div class="view_bottom">
        <div class="view_bottom_left" @click="clickSubmit">提交预约</div>
      </div>
    </div>

    <div class="main" v-if="isShowResult == 2">

      <div class="dis_setting_icon_dd" style="color:#E06596;">
        <div class="s_center_t_d">提交成功</div>
      </div>

<div class="search-list-role">
  <div
            v-for="(item, index) in resultInfo"
            :key="index">
      <div class="search-result-view">
              <div class="dis_setting" style="padding: 0px;">
                <div class="s_center_t_item">{{ '预约信息' }}</div>
              </div>
              <div class="search-result-view-item" v-if="item.vip_person">
                <div class="search-result-view-left">联系人</div>
                <div class="search-result-view-right">{{item.vip_person}}</div>
              </div>
              <div class="search-result-view-item" v-if="item.vip_phone">
                <div class="search-result-view-left">手机号</div>
                <div class="search-result-view-right">{{item.vip_phone}}</div>
              </div>
              <div class="search-result-view-item" v-if="item.address" style="positon:relative;">
                <div class="search-result-view-left">上门地址</div>
                <div class="search-result-view-right" style="width: 70%;">{{item.province}}{{item.city}}{{item.area}}{{item.address}}</div>
              </div>
              <div class="search-result-view-item" v-if="item.text">
                <div class="search-result-view-left">检测类型</div>
                <div class="search-result-view-right">{{item.text}}</div>
              </div>
              <div class="search-result-view-item" v-if="item.expect_date">
                <div class="search-result-view-left">预约时间</div>
                <div class="search-result-view-right">{{item.expect_date}} {{item.expect_time_bucket}}</div>
              </div>
              <div class="search-result-view-item" v-if="item.inspection_person_num">
                <div class="search-result-view-left">受检人数</div>
                <div class="search-result-view-right">{{item.inspection_person_num}}人</div>
              </div>
            </div>
  </div>
</div>
    </div>


    
    <van-popup v-model="isShowArea" round position="bottom">
      <van-area title="选择地区" :area-list="areaList" @confirm="areaConfirm" @cancel="areaCancel"/>
    </van-popup>


    <van-popup v-model="isShowDate" round position="bottom">
      <van-picker show-toolbar title="选择开始时间" :columns="objectMultiArray" @cancel="dateCancel" @confirm="dateConfirm"/>
    </van-popup>


    <van-dialog
      v-model="isShowUpdate"
      showCancelButton
      :beforeClose="beforeUpdate"
      confirmButtonColor='#E06596'
      cancel-button-color='#E06596'
      confirm-button-text="同意并继续"
      cancel-button-text="返回上一步"
    >
    <div class="dialog_item">
        <div class="dialog_item_text">免责说明</div>
        <div class="dialog_item_title">
          <img class="dialog_item_img" :src="disclaimer_img" />
        </div>
    </div>
    </van-dialog>

    <van-dialog
      v-model="isShowAreaImg"
      :beforeClose="beforeAraeImg"
      confirm-button-text="好的,我知道了"
      theme="round"
    >
    <div class="dialog_item">
        <div class="dialog_item_title">
          <img class="dialog_item_img" src="../assets/images/area_img.png" />
        </div>
    </div>
    </van-dialog>

    <van-dialog
      v-model="isShowShouldKnow"
      :beforeClose="beforeShouldKnow"
      confirm-button-text="好的,我知道了"
      theme="round"
    >
    <div class="dialog_item">
        <div class="dialog_item_text">预约须知</div>
        <div class="dialog_item_title">
          <img class="dialog_item_img" src="../assets/images/should_know.png" />
        </div>
    </div>
    </van-dialog>

  </div>
</template>

<script>
import {
  Toast,
  Button,
  Dialog,
} from "vant";
import { createCustomerAddressInfo,getVIPInfoByNum,getVIPServiceType } from "../request/api";
import { areaList } from '@vant/area-data';

export default {
  name: "",
  components: {
    [Dialog.Component.name]: Dialog.Component, //Dialog.Component写成这样才生效
    [Button.name]: Button,
  },
  data() {
    return {
      isShowShouldKnow: false,
      isShowAreaImg: false,
      isShowResult: 1,
      resultInfo: [],
      appointment_vip_num:'',
      inspection_person_num: 1,
      remark: "",
      vip_person: "",
      vip_phone: "",
      province: "",
      city: "",
      area: "",
      expect_date: "",
      expect_time_bucket: "",

      text: "",
      service_type: "",
      service_status: "",
      address: "",
      provincecityarea: "",
      statuvalue: '0',
      showPopover: false,
      
      isShowArea: false,
      areaList,
      objectMultiArray:[],
      // objectMultiArray: [
      //                     {
      //                         "text": "05月31日",
      //                         "children": [
      //                             {
      //                                 "text": "11:00",
      //                                 disabled: true
      //                             },
      //                             {
      //                                 "text": "12:00",
      //                             },
      //                             {
      //                                 "text": "13:00",
      //                             },
      //                             {
      //                                 "text": "14:00",
      //                             },
      //                             {
      //                                 "text": "15:00",
      //                             },
  
      //                         ]
      //                     },
      //                     {
      //                         "text": "06月01日",
      //                         "children": [
      //                             {
      //                                 "text": "11:00"
      //                             },
      //                             {
      //                                 "text": "12:00",
      //                             },
      //                             {
      //                                 "text": "13:00",
      //                             },
      //                             {
      //                                 "text": "14:00",
      //                             },
      //                             {
      //                                 "text": "15:00",
      //                             },
  
      //                         ]
                                
      //                     },
                         
      //                     {
      //                         "text": "06月01日",
      //                         "children": [
      //                             {
      //                                 "text": "11:00",
                                    
      //                             },
      //                             {
      //                                 "text": "12:00",
      //                             },
      //                             {
      //                                 "text": "13:00",
      //                             },
      //                             {
      //                                 "text": "14:00",
      //                             },
      //                             {
      //                                 "text": "15:00",
      //                             },
  
      //                         ]
      //                     },
                          
      //                 ],
      isShowDate: false,
      dateText: '',
      isShowUpdate: false,
      checkedStatus: false,
      area_img: '', //地图参数
      disclaimer_img: '', //免责声明
      should_know: '', //预约须知
    };
  },
  created() {
    this.appointment_vip_num = this.$route.query.avipnum;
  },
  mounted() {
    this.getVIPInfoByNum();

    this.getVIPServiceType();
  },
  methods: {
    getVIPServiceType(){
      let that = this;
      getVIPServiceType({}).then((res) => {
        if (res.data.success) {
          let service_type_info = res.data.service_type_info;
          that.objectMultiArray = service_type_info[0].objectMultiArray;
          // that.area_img = service_type_info[0].area_img; //地图参数
          that.disclaimer_img = service_type_info[0].disclaimer_img; //免责声明
          // that.should_know = service_type_info[0].should_know; //预约须知

          if(that.objectMultiArray.length > 0){
            let objList = [];
            for (let i = 0; i < that.objectMultiArray.length; i++) {
              let obj = {};
              obj.text =  that.objectMultiArray[i].date;
              obj.children =  [];
              let item = that.objectMultiArray[i].time;
              for (let j = 0; j < item.length; j++) {
                let timelist = item[j];
                let objTime = {};
                objTime.text = timelist.time_section;
                if(timelist.can_use == 1){
                  objTime.disabled = true;
                }
                obj.children.push(objTime)
              }
              objList.push(obj);
            }

            that.objectMultiArray = objList;
          }
        } else {
            Toast(res.data.msg)
        }
      });
    },
    getVIPInfoByNum(){
      let that = this;
      getVIPInfoByNum({
        appointment_vip_num: that.appointment_vip_num
      }).then((res) => {
        if (res.data.success) {
          let result = res.data.result
          if(result && result.length > 0){
            let item = result[0];
            if(item.vip_person && item.vip_phone && item.text && item.province && item.city && item.address && item.expect_date && item.inspection_person_num){
              that.isShowResult = 2;
              that.resultInfo.push(result[0]);
            }
          }
        } else {
            Toast(res.data.msg)
        }
      });
    },
    onClickLeft() {
      this.$router.back();
    },
    beforeUpdate(action, done) {
      let that = this;
      if(action === 'confirm') {
        let param = {
          appointment_vip_num: that.appointment_vip_num,
          vip_person: that.vip_person,
          vip_phone: that.vip_phone,
          province: that.province,
          city: that.city,
          area: that.area,
          address: that.address,
          expect_date: that.expect_date,
          expect_time_bucket: that.expect_time_bucket,
          inspection_person_num: that.inspection_person_num
        }

        console.log('--params-->:',param)

        createCustomerAddressInfo(param).then((res) => {
          if (res.data.success) {
            that.isShowUpdate = false;
            that.isShowResult = 2;
            that.getVIPInfoByNum();
            done() //关闭
          } else {
            that.isShowUpdate = false;
            Toast(res.data.msg);
            done(false) //关闭
          }
        });
      } else if(action === 'cancel') {
        this.isShowUpdate = false;
        done() //关闭
      }
    },
    checkPhone(phone) {
      var phoneReg = /^1\d{10}$/;
      if (phone.length != 11) {
        return false;
      } else if (!phoneReg.test(phone)) {
        return false;
      } else {
        return true;
      }
    },
    /**
     * 保存
     */
    clickSubmit() {
      let that = this;

      if(that.vip_person == ''){
        Toast('请输入联系人姓名');
        return;
      }

      if(that.vip_phone == ''){
        Toast('请输入联系人手机号');
        return;
      }

      if (!that.checkPhone(that.vip_phone)) {
        Toast('手机号有误')
        return;
      } 

      if(that.provincecityarea == ''){
        Toast('请选择所在地区');
        return;
      }

      if(that.address == ''){
        Toast('请填写详细地址');
        return;
      }

      if(that.dateText == ''){
        Toast('请选择期望上门时间');
        return;
      }

      if(that.checkedStatus == false){
        Toast('请阅读并勾选预约须知');
        return;
      }

      that.isShowUpdate = true;

    },
    clearPhone() {
      this.vip_phone = "";
    },
    
    
    clickArea(){
      this.isShowArea = true;
    },
    areaConfirm(item){
      console.log(item)
      if(item.length>0){
        let areaList = [];
        for(let i = 0; i < item.length; i++){
          areaList.push(item[i].name);
        }
        let areaName = '';
          areaName= areaList.join(",");
          this.province = areaList[0];
          this.city = areaList[1];
          this.area = areaList[2];
          console.log(areaList[0],areaList[1],areaList[2])
        this.provincecityarea = areaName;
      }
      this.isShowArea = false;
    },
    areaCancel(){
      this.isShowArea = false;
    },
    clickDate(){
      this.isShowDate = true;
    },
    dateCancel(){
      this.isShowDate = false;
    },
    dateConfirm(date){
      console.log(date)
      if(date.length>0){
        let dateValue = '';
          dateValue = date.join(" ");
        this.dateText = dateValue;
        this.expect_date = date[0];
        this.expect_time_bucket = date[1];
        this.isShowDate = false;
      }
    },
    clickPDF() {
      this.isShowAreaImg = true;
      // this.$router.push({
      //   path: "/instrumentPDF"
      // });
      // return;
    },
    beforeAraeImg(action, done){
      this.isShowAreaImg = false;
      done();
    },
    clickYYXZPDF() {
      this.isShowShouldKnow = true;
      // this.$router.push({
      //   path: "/instrumentPDF"
      // });
      // return;
    },
    beforeShouldKnow(action, done){
      this.isShowShouldKnow = false;
      done();
    },
  },
};
</script>
<style scoped lang="scss">
.child-section {
  background-color: #f5f5f5;
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

.dis_setting {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 80px 50px 20px 50px;
}
.s_center_t {
  font-size: 28px;
}

.dis_setting_i {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 20px;
  background: #ffffff;
  border-radius: 20px;
  margin-top: 20px;
}

.dis_setting_i_mar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  // align-items: center;
  padding: 10px 20px;
  background: #ffffff;
  border-radius: 20px;
  margin-top: 20px;
}

.dis_setting_icon {
  width: 100%;
  align-items: center;
  display: flex;
  padding: 20px 30px 0px;
}

.dis_setting_icon_d{
  width: 100%;
  align-items: center;
  display: flex;
  padding: 50px 30px 30px 30px;
}

.dis_setting_icon_dd{
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 80px 30px 50px 30px;
}

.s_center_t_d{
  font-size: 40px;
}

.s_center_t_item {
  font-size: 32px;
}

.s_setting_t_item {
  font-size: 32px;
}

.select-item {
  width: 80%;
}
.input-item {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  input {
    width: 100%;
    height: 80px;
    background: #ffffff;
    border-radius: 12px;
    border: none;
    outline: none;
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    padding-left: 20px;
  }

  .icon_scan {
    width: 40px;
    height: 40px;
  }
}

.search-list-role {
  // height: 1110px;
  border: 0 none;
  // background-color: #FFFFFF;
  width: 100%;
  padding: 0px 30px;

     .search-result-view {
      display: flex;
      //   align-items: center;
      // justify-content: space-between;
      padding: 30px 30px;
  background-color: #FFFFFF;
  border-radius: 10px;
  margin-top: 30px;
  flex-direction: column;


  .search-result-view-item{
    width: 100%;
      display: flex;
    // justify-content: space-between;
    // align-items: center;
    padding: 10px 0px;
  

.search-result-view-left{
  width: 25%;
  font-size: 30px;
  color: #999999;
}

.search-result-view-right{
  width: 75%;
  font-size: 30px;
}
  }
     }
}

.empty_view {
  height: 100px;
  width: 100%;
}

.view_bottom {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  // position: fixed;
  // bottom: 50px;
  z-index: 9;
  height: 120px;
}

.view_bottom_left {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 690px;
  height: 98px;
  background: #e06596;
  border-radius: 50px;
  border: 1px solid #e06596;
  font-size: 34px;
  color: #ffffff;
}

.search-list-role-from {
  // height: 1110px;
  border: 0 none;
  width: 100%;
  padding: 0px 30px;
  margin-top: 20px;
  border-radius: 20px;

  .search-list-role-from-a {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    background: #ffffff;
    border-radius: 20px;

    .search-list-role-from-b {
      padding-top: 10px;
      font-size: 32px;
    }

    .search-list-role-from-c {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #ffffff;
      padding: 10px 0px;
      border-bottom: 1px solid #dddddd;
    }

    .search-list-role-from-g{
      width: 100%;
      display: flex;
      justify-content: space-between;
      background: #ffffff;
      padding: 10px 0px;
      border-bottom: 1px solid #dddddd;

      
    }
  }
}

.s_center_t_item_g{
        width: 20%;
        margin-top:10px;
        font-size: 32px;
      }

.clear_1 {
  position: absolute;
  padding: 16px;
  right: 0px;
  font-size: 32px;
}

.icon_clear {
  width: 32px;
  height: 32px;
}

.el-textarea {
  width: 78%;
  border: none;
}
.el-textarea__inner {
  border: none;
}
.van-cell {
  padding: 6px 0px !important;
  width: 77% !important;
}

::v-deep .van-field__control::-webkit-input-placeholder {
  color: #666666;
  font-size: 0.38rem;
}

.search-list-role-from-d {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 20px 0px;
}

.dialog_item{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 20px;
    }

    .dialog_item_text{
      font-size: 32px;
      padding: 20px;
    }

    .dialog_item_title{
      overflow-y: scroll;
      height: 800px;
    }

    .dialog_item_img{
      width: 100%;
    }

.checkbox_class{
  padding: 20px;
  display: flex;
  align-items: center;
  width: 50%;
}

::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;height: 0;
}
</style>