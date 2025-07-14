<template>
    <div class="chat-container">
        <a-layout class="chat-layout">
            <!-- 左侧聊天列表 -->
            <a-layout-sider class="chat-sidebar" :width="280" :collapsed="false" :collapsible="false">
                <!-- 搜索栏 -->
                <div class="search-section">
                    <a-input placeholder="搜索聊天" size="medium" class="search-input">
                        <template #prefix>
                            <icon-search />
                        </template>
                    </a-input>
                </div>

                <!-- 聊天列表 -->
                <div class="chat-list">
                    <!-- 聊天项示例 -->
                    <div v-for="chat in chatList" :key="chat.id"
                        :class="['chat-item', { active: chat.id === activeChat }]" @click="selectChat(chat.id)">
                        <a-avatar :size="40" class="chat-avatar">
                            {{ chat.name.charAt(0) }}
                        </a-avatar>
                        <div class="chat-info">
                            <div class="chat-header">
                                <span class="chat-name">{{ chat.name }}</span>
                                <span class="chat-time">{{ chat.time }}</span>
                            </div>
                            <div class="chat-preview">
                                <span class="last-message">{{ chat.lastMessage }}</span>
                                <a-badge v-if="chat.unreadCount > 0" :count="chat.unreadCount" class="unread-badge" />
                            </div>
                        </div>
                    </div>
                </div>
            </a-layout-sider>

            <!-- 右侧聊天区域 -->
            <a-layout-content class="chat-content">
                <!-- 聊天头部 -->
                <div class="chat-header-bar">
                    <div class="current-chat-info">
                        <a-avatar :size="32">
                            {{ getCurrentChatName()?.charAt(0) }}
                        </a-avatar>
                        <div class="current-chat-details">
                            <h3 class="current-chat-name">{{ getCurrentChatName() }}</h3>
                            <span class="current-chat-status">在线</span>
                        </div>
                    </div>
                    <div class="chat-actions">
                        <a-button type="text" size="small">
                            <icon-phone />
                        </a-button>
                        <a-button type="text" size="small">
                            <icon-video-camera />
                        </a-button>
                        <a-button type="text" size="small">
                            <icon-more />
                        </a-button>
                    </div>
                </div>

                <!-- 消息区域 -->
                <div class="messages-area">
                    <div v-for="message in messages" :key="message.id"
                        :class="['message-item', message.sender === 'me' ? 'sent' : 'received']">
                        <a-avatar v-if="message.sender !== 'me'" :size="32" class="message-avatar">
                            {{ message.senderName?.charAt(0) }}
                        </a-avatar>
                        <div class="message-content">
                            <div class="message-bubble">
                                {{ message.content }}
                            </div>
                            <span class="message-time">{{ message.time }}</span>
                        </div>
                        <a-avatar v-if="message.sender === 'me'" :size="32" class="message-avatar">
                            我
                        </a-avatar>
                    </div>
                </div>

                <!-- 输入区域 -->
                <div class="input-area">
                    <div class="input-toolbar">
                        <a-button type="text" size="small">
                            <icon-attachment />
                        </a-button>
                        <a-button type="text" size="small">
                            <icon-face-smile-fill />
                        </a-button>
                    </div>
                    <div class="input-section">
                        <a-textarea v-model="newMessage" placeholder="输入消息..." :rows="3" class="message-input"
                            @keydown.enter.exact="sendMessage" @keydown.enter.shift.exact.prevent />
                        <a-button type="primary" :disabled="!newMessage.trim()" @click="sendMessage"
                            class="send-button">
                            发送
                        </a-button>
                    </div>
                </div>
            </a-layout-content>
        </a-layout>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
    IconSearch,
    IconPhone,
    IconVideoCamera,
    IconMore,
    IconAttachment,
    IconFaceSmileFill
} from '@arco-design/web-vue/es/icon'

// 聊天列表数据
const chatList = ref([
    {
        id: 1,
        name: '张三',
        lastMessage: '你好，最近怎么样？',
        time: '10:30',
        unreadCount: 2
    },
    {
        id: 2,
        name: '李四',
        lastMessage: '项目进度如何？',
        time: '09:15',
        unreadCount: 0
    },
    {
        id: 3,
        name: '王五',
        lastMessage: '明天开会记得准时参加',
        time: '昨天',
        unreadCount: 1
    },
    {
        id: 4,
        name: '技术团队',
        lastMessage: '新功能已经上线了',
        time: '昨天',
        unreadCount: 5
    }
])

// 当前激活的聊天
const activeChat = ref(1)

// 消息数据
const messages = ref([
    {
        id: 1,
        sender: 'other',
        senderName: '张三',
        content: '你好，最近怎么样？',
        time: '10:25'
    },
    {
        id: 2,
        sender: 'me',
        content: '还不错，工作比较忙',
        time: '10:26'
    },
    {
        id: 3,
        sender: 'other',
        senderName: '张三',
        content: '理解，注意休息哦',
        time: '10:30'
    }
])

// 新消息输入
const newMessage = ref('')

// 选择聊天
const selectChat = (chatId: number) => {
    activeChat.value = chatId
    // 这里可以加载对应聊天的消息
}

// 获取当前聊天名称
const getCurrentChatName = () => {
    const currentChat = chatList.value.find(chat => chat.id === activeChat.value)
    return currentChat?.name || ''
}

// 发送消息
const sendMessage = () => {
    if (!newMessage.value.trim()) return

    const message = {
        id: Date.now(),
        sender: 'me',
        content: newMessage.value.trim(),
        time: new Date().toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    messages.value.push(message)
    newMessage.value = ''
}
</script>

<style scoped>
.chat-container {
    height: 100vh;
    background: #f5f5f5;
}

.chat-layout {
    height: 100%;
}

/* 左侧聊天列表样式 */
.chat-sidebar {
    background: white;
    border-right: 1px solid #e8e8e8;
    display: flex;
    flex-direction: column;
}

.search-section {
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
}

.search-input {
    border-radius: 20px;
}

.chat-list {
    flex: 1;
    overflow-y: auto;
    padding: 8px 0;
}

.chat-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.chat-item:hover {
    background: #f8f9fa;
}

.chat-item.active {
    background: #e6f4ff;
    border-right: 3px solid #1890ff;
}

.chat-avatar {
    margin-right: 12px;
    background: #1890ff;
}

.chat-info {
    flex: 1;
    min-width: 0;
}

.chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
}

.chat-name {
    font-weight: 500;
    color: #333;
    font-size: 14px;
}

.chat-time {
    font-size: 12px;
    color: #999;
}

.chat-preview {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.last-message {
    color: #666;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
}

.unread-badge {
    margin-left: 8px;
}

/* 右侧聊天区域样式 */
.chat-content {
    display: flex;
    flex-direction: column;
    background: white;
}

.chat-header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
    background: white;
}

.current-chat-info {
    display: flex;
    align-items: center;
}

.current-chat-details {
    margin-left: 12px;
}

.current-chat-name {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
}

.current-chat-status {
    color: #52c41a;
    font-size: 12px;
}

.chat-actions {
    display: flex;
    gap: 8px;
}

.messages-area {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background: #fafafa;
}

.message-item {
    display: flex;
    margin-bottom: 16px;
    align-items: flex-end;
}

.message-item.sent {
    justify-content: flex-end;
}

.message-item.received {
    justify-content: flex-start;
}

.message-avatar {
    margin: 0 8px;
}

.message-content {
    max-width: 60%;
    display: flex;
    flex-direction: column;
}

.message-item.sent .message-content {
    align-items: flex-end;
}

.message-item.received .message-content {
    align-items: flex-start;
}

.message-bubble {
    padding: 10px 16px;
    border-radius: 18px;
    word-wrap: break-word;
    margin-bottom: 4px;
}

.message-item.sent .message-bubble {
    background: #1890ff;
    color: white;
}

.message-item.received .message-bubble {
    background: white;
    color: #333;
    border: 1px solid #e8e8e8;
}

.message-time {
    font-size: 12px;
    color: #999;
    margin: 0 8px;
}

.input-area {
    padding: 16px 20px;
    border-top: 1px solid #f0f0f0;
    background: white;
}

.input-toolbar {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
}

.input-section {
    display: flex;
    gap: 12px;
    align-items: flex-end;
}

.message-input {
    flex: 1;
    resize: none;
    border-radius: 8px;
}

.send-button {
    align-self: flex-end;
    height: 36px;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .chat-sidebar {
        width: 240px !important;
    }

    .message-content {
        max-width: 80%;
    }
}
</style>