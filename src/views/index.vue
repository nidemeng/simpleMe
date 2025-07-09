<template>
    <div class="layout-container">
        <a-layout class="layout">
            <!-- Header 部分 -->
            <a-layout-header class="layout-header">
                <div class="header-content">
                    <!-- 左侧 Logo 和标题 -->
                    <div class="header-left">
                    </div>
                    <!-- 右侧用户信息 -->
                    <div class="header-right">
                        <a-dropdown trigger="click" position="bottom">
                            <div class="user-info">
                                <a-avatar class="user-avatar" :size="32">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="用户头像" />
                                </a-avatar>
                            </div>
                            <template #content>
                                <a-doption @click="handleProfile">
                                    <icon-user />
                                    <span>个人资料</span>
                                </a-doption>
                                <a-doption @click="handleSettings">
                                    <icon-settings />
                                    <span>系统设置</span>
                                </a-doption>
                                <a-doption disabled>
                                    <icon-notification />
                                    <span>消息通知</span>
                                </a-doption>
                                <a-doption class="logout-option" @click="handleLogout">
                                    <icon-poweroff />
                                    <span>退出登录</span>
                                </a-doption>
                            </template>
                        </a-dropdown>
                    </div>
                </div>
            </a-layout-header>

            <!-- 主体内容部分 -->
            <a-layout class="layout-content">
                <!-- 左侧导航栏 -->
                <a-layout-sider class="layout-sider" :width="120" :collapsible="true" v-model:collapsed="collapsed"
                    :collapsed-width="64">
                    <a-menu :default-selected-keys="[activeMenu]" :style="{ width: '100%', height: '100%' }"
                        @menu-item-click="handleMenuClick">
                        <a-menu-item key="dashboard">
                            <template #icon>
                                <icon-home />
                            </template>
                            <span>首页</span>
                        </a-menu-item>
                        <a-menu-item key="chat">
                            <template #icon>
                                <icon-message />
                            </template>
                            <span>聊天</span>
                        </a-menu-item>
                        <a-menu-item key="docs">
                            <template #icon>
                                <icon-file />
                            </template>
                            <span>文档</span>
                        </a-menu-item>
                    </a-menu>
                </a-layout-sider>
                <!-- 右侧内容区域 -->
                <a-layout-content class="content-area">
                    <router-view></router-view>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
    IconUser,
    IconSettings,
    IconNotification,
    IconPoweroff,
    IconHome,
    IconMessage,
    IconFile,
} from '@arco-design/web-vue/es/icon'
import { RouterView } from 'vue-router'


// 用户信息
const userInfo = ref({
    name: '管理员',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    role: 'admin'
})

// 侧边栏折叠状态
const collapsed = ref(false)

// 当前激活的菜单
const activeMenu = ref('dashboard')

// 处理菜单点击
const handleMenuClick = (key: string) => {
    activeMenu.value = key
    console.log('切换到菜单:', key)
}

// 处理用户下拉菜单点击
const handleProfile = () => {
    console.log('查看个人资料')
    // 可以在这里添加路由跳转或弹窗
}

const handleSettings = () => {
    console.log('打开系统设置')
    activeMenu.value = 'settings'
}

const handleLogout = () => {
    console.log('退出登录')
    // 这里添加退出登录逻辑
    // 清除token，跳转到登录页等
}
</script>

<style scoped>
.layout-container {
    height: 100vh;
    width: 100%;
}

.layout {
    height: 100%;
}

/* Header 样式 */
.layout-header {
    background-color: #fff;
    border-bottom: 1px solid #e5e6eb;
    padding: 0;
    height: 38px;
}

.header-content {
    height: 100%;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-left {
    display: flex;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    color: #1d2129;
}

.logo-text {
    margin-left: 8px;
}

.header-right {
    display: flex;
    align-items: center;
}

.user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 6px;
    transition: background-color 0.2s;
}

.user-info:hover {
    background-color: #f2f3ff;
}

.user-avatar {
    margin-right: 8px;
}

.username {
    color: #1d2129;
    font-size: 14px;
    margin-right: 8px;
    font-weight: 500;
}

.dropdown-icon {
    color: #86909c;
    font-size: 12px;
    transition: transform 0.2s;
}

.user-info:hover .dropdown-icon {
    transform: rotate(180deg);
}

/* 主体布局样式 */
.layout-content {
    height: calc(100vh - 64px);
}

.layout-sider {
    background-color: #fff;
    border-right: 1px solid #e5e6eb;
}

.content-area {
    background-color: #f2f3ff;
    overflow: auto;
}

.content-wrapper {
    padding: 16px 24px;
    height: 100%;
}

.breadcrumb {
    margin-bottom: 16px;
}

.main-content {
    background-color: #fff;
    border-radius: 6px;
    padding: 24px;
    height: calc(100% - 40px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 下拉菜单样式 */
:deep(.arco-dropdown-option) {
    display: flex;
    align-items: center;
    gap: 8px;
}

:deep(.arco-dropdown-option.logout-option) {
    color: #f53f3f;
}

:deep(.arco-dropdown-option.logout-option:hover) {
    background-color: #fff2f0;
    color: #f53f3f;
}

/* 菜单样式优化 */
:deep(.arco-menu-item) {
    margin: 4px 8px;
    border-radius: 6px;
}

:deep(.arco-menu-item-selected) {
    background-color: #e8f4ff;
    color: #165dff;
}

:deep(.arco-menu-sub-menu-title) {
    margin: 4px 8px;
    border-radius: 6px;
}

:deep(.arco-menu-icon) {
    margin-left: -8px;

}
</style>