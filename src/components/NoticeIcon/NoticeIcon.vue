<template>
  <a-popover
    v-model="visible"
    trigger="click"
    placement="bottomRight"
    overlayClassName="header-notice-wrapper"
    :getPopupContainer="() => $refs.noticeRef.parentElement"
    :autoAdjustOverflow="true"
    :arrowPointAtCenter="true"
    :overlayStyle="{ width: '300px', top: '50px' }"
  >
    <template slot="content">
      <a-spin :spinning="loading">
        <a-tabs>
          <a-tab-pane tab="通知" key="1">
            <a-list>
              <a-list-item v-for="(notice, index) in noticeList" :key="index">
                <a-list-item-meta :title="notice.title" :description="notice.description">
                  <a-avatar style="background-color: white" slot="avatar" :src="notice.src"/>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-tab-pane>
          <a-tab-pane tab="消息" key="2">
						<a-list>
							<a-list-item v-for="(message, index) in messageList" :key="index">
								<a-list-item-meta :title="message.title" :description="message.description">
									<a-avatar style="background-color: white" slot="avatar" :src="message.src"/>
								</a-list-item-meta>
							</a-list-item>
						</a-list>
          </a-tab-pane>
          <a-tab-pane tab="待办" key="3">
						<a-list>
							<a-list-item v-for="(todo, index) in todoList" :key="index">
								<a-list-item-meta :title="todo.title" :description="todo.description">
									<a-avatar style="background-color: white" slot="avatar" :src="todo.src"/>
								</a-list-item-meta>
							</a-list-item>
						</a-list>
          </a-tab-pane>
        </a-tabs>
      </a-spin>
    </template>
    <span @click="fetchNotice" class="header-notice" ref="noticeRef" style="padding: 0 18px">
      <a-badge :count="noticeList.length+messageList.length+todoList.length">
        <a-icon style="font-size: 16px; padding: 4px" type="bell" />
      </a-badge>
    </span>
  </a-popover>
</template>

<script>
export default {
  name: 'HeaderNotice',
  data () {
    return {
      loading: false,
      visible: false,
			// 通知信息列表
			noticeList: [],
			// 消息列表
			messageList: [],
			// 待办列表
			todoList: [],
    }
  },
	created() {
  	this.initOption();
	},
  methods: {
  	// 初始化操作
  	initOption() {
			this.getNoticeInfoList();
			this.getMessageList();
			this.getTodoList();
		},
    fetchNotice () {
      if (!this.visible) {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 2000)
      } else {
        this.loading = false
      }
      this.visible = !this.visible
    },
		// 获取短信列表
		getMessageList() {
			this.messageList = [
				{
					title: '欢迎使用这个项目',
					description: '现在',
					src: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png'
				},
			];
		},
		// 获取待办列表
		getTodoList() {
			this.todoList = [
				{
					title: '你会为这个项目留下了一个star？',
					description: '待会',
					src: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png'
				},
			];
		},
		// 获取通知信息列表
		getNoticeInfoList() {
    	this.noticeList = [
				{
					title: '你收到了 14 份新周报',
					description: '一年前',
					src: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png'
				},
				{
					title: '你推荐的 曲妮妮 已通过第三轮面试',
					description: '一年前',
					src: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png'
				},
				{
					title: '这种模板可以区分多种通知类型',
					description: '一年前',
					src: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png'
				},
			];
		}
  }
}
</script>

<style lang="css">
  .header-notice-wrapper {
    top: 50px !important;
  }
</style>
<style lang="less" scoped>
  .header-notice{
    display: inline-block;
    transition: all 0.3s;

    span {
      vertical-align: initial;
    }
  }
</style>
