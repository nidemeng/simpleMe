<template>
    <div class="login-container">
        <!-- 左侧装饰区域 -->
        <div class="decoration-area">
            <div class="brand-section">
                <div class="logo">
                    <div class="logo-icon"></div>
                    <span class="brand-name">SimpleMe</span>
                </div>
                <h1 class="welcome-title">欢迎使用 SimpleMe</h1>
                <p class="welcome-subtitle">简单高效的协作平台</p>
            </div>

            <!-- 装饰图形 -->
            <div class="decoration-graphics">
                <div class="graphic-item graphic-1"></div>
                <div class="graphic-item graphic-2"></div>
                <div class="graphic-item graphic-3"></div>
            </div>
        </div>

        <!-- 右侧登录区域 -->
        <div class="login-area">
            <div class="login-box">
                <!-- 标题切换 -->
                <div class="tab-header">
                    <button :class="['tab-btn', { active: loginOrRegister === 'login' }]"
                        @click="loginOrRegister = 'login'">
                        登录
                    </button>
                    <button :class="['tab-btn', { active: loginOrRegister === 'register' }]"
                        @click="loginOrRegister = 'register'">
                        注册
                    </button>
                </div>

                <!-- 登录表单 -->
                <div v-if="loginOrRegister === 'login'" class="form-content">
                    <a-form :model="loginForm" @submit="handleLogin" layout="vertical">
                        <a-form-item class="form-item">
                            <a-input v-model:value="loginForm.username" placeholder="手机号/邮箱/用户名" size="large"
                                class="input-field">
                                <template #prefix>
                                    <icon-user class="input-icon" />
                                </template>
                            </a-input>
                        </a-form-item>

                        <a-form-item class="form-item">
                            <a-input-password v-model:value="loginForm.password" placeholder="请输入密码" size="large"
                                class="input-field">
                                <template #prefix>
                                    <icon-lock class="input-icon" />
                                </template>
                            </a-input-password>
                        </a-form-item>

                        <!-- 记住密码和忘记密码 -->
                        <div class="form-options">
                            <a-checkbox v-model="rememberPassword" class="remember-checkbox">
                                记住密码
                            </a-checkbox>
                            <a-link class="forgot-link" @click="handleForgotPassword">
                                忘记密码？
                            </a-link>
                        </div>

                        <a-form-item class="form-item">
                            <a-button type="primary" html-type="submit" size="large" block class="submit-btn"
                                :loading="loading">
                                登录
                            </a-button>
                        </a-form-item>
                    </a-form>
                </div>

                <!-- 注册表单 -->
                <div v-if="loginOrRegister === 'register'" class="form-content">
                    <a-form :model="registerForm" @submit="handleRegister" layout="vertical">
                        <a-form-item class="form-item">
                            <a-input v-model:value="registerForm.email" placeholder="请输入邮箱" size="large"
                                class="input-field">
                                <template #prefix>
                                    <icon-email class="input-icon" />
                                </template>
                            </a-input>
                        </a-form-item>

                        <a-form-item class="form-item">
                            <a-input v-model:value="registerForm.username" placeholder="请输入用户名" size="large"
                                class="input-field">
                                <template #prefix>
                                    <icon-user class="input-icon" />
                                </template>
                            </a-input>
                        </a-form-item>

                        <a-form-item class="form-item">
                            <a-input-password v-model:value="registerForm.password" placeholder="请输入密码" size="large"
                                class="input-field">
                                <template #prefix>
                                    <icon-lock class="input-icon" />
                                </template>
                            </a-input-password>
                        </a-form-item>

                        <!-- 同意协议 -->
                        <div class="agreement-section">
                            <a-checkbox v-model="agreeTerms" class="agreement-checkbox">
                                我已阅读并同意
                                <a-link class="agreement-link">《服务协议》</a-link>
                                和
                                <a-link class="agreement-link">《隐私政策》</a-link>
                            </a-checkbox>
                        </div>

                        <a-form-item class="form-item">
                            <a-button type="primary" html-type="submit" size="large" block class="submit-btn"
                                :loading="loading" :disabled="!agreeTerms">
                                注册
                            </a-button>
                        </a-form-item>
                    </a-form>
                </div>

                <!-- 第三方登录 -->
                <div class="third-party-login">
                    <div class="divider-line">
                        <span>其他登录方式</span>
                    </div>
                    <div class="social-buttons">
                        <button class="social-btn wechat-btn" @click="handleSocialLogin('wechat')">
                            <div class="social-icon wechat-icon"></div>
                        </button>
                        <button class="social-btn qq-btn" @click="handleSocialLogin('qq')">
                            <div class="social-icon qq-icon"></div>
                        </button>
                        <button class="social-btn github-btn" @click="handleSocialLogin('github')">
                            <div class="social-icon github-icon"></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import { IconUser, IconLock, IconEmail } from '@arco-design/web-vue/es/icon'

const loginOrRegister = ref('login')
const loading = ref(false)
const rememberPassword = ref(false)
const agreeTerms = ref(false)

const loginForm = ref({
    username: '',
    password: ''
})

const registerForm = ref({
    email: '',
    username: '',
    password: ''
})

// 登录处理
const handleLogin = async () => {
    if (!loginForm.value.username || !loginForm.value.password) {
        Message.warning('请填写完整信息')
        return
    }

    loading.value = true
    try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        Message.success('登录成功！')
        console.log('登录数据:', loginForm.value)
    } catch (error) {
        Message.error('登录失败，请重试')
    } finally {
        loading.value = false
    }
}

// 注册处理
const handleRegister = async () => {
    if (!registerForm.value.email || !registerForm.value.username || !registerForm.value.password) {
        Message.warning('请填写完整信息')
        return
    }

    if (!agreeTerms.value) {
        Message.warning('请同意服务协议和隐私政策')
        return
    }

    loading.value = true
    try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        Message.success('注册成功！请登录')
        console.log('注册数据:', registerForm.value)
        loginOrRegister.value = 'login'
    } catch (error) {
        Message.error('注册失败，请重试')
    } finally {
        loading.value = false
    }
}

// 忘记密码
const handleForgotPassword = () => {
    Message.info('忘记密码功能开发中...')
}

// 第三方登录
const handleSocialLogin = (platform: string) => {
    Message.info(`${platform} 登录功能开发中...`)
}
</script>

<style scoped>
.login-container {
    display: flex;
    height: 100vh;
    background: #f5f5f5;
}

/* 左侧装饰区域 */
.decoration-area {
    flex: 1;
    background: linear-gradient(135deg, #1890ff 0%, #722ed1 100%);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 60px;
    overflow: hidden;
}

.brand-section {
    text-align: center;
    z-index: 2;
    position: relative;
}

.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
}

.logo-icon {
    width: 48px;
    height: 48px;
    background: #fff;
    border-radius: 12px;
    margin-right: 12px;
    position: relative;
}

.logo-icon::after {
    content: 'S';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #1890ff;
    font-size: 24px;
    font-weight: bold;
}

.brand-name {
    color: #fff;
    font-size: 24px;
    font-weight: 600;
}

.welcome-title {
    color: #fff;
    font-size: 42px;
    font-weight: 300;
    margin: 0 0 16px 0;
    letter-spacing: 1px;
}

.welcome-subtitle {
    color: rgba(255, 255, 255, 0.8);
    font-size: 18px;
    margin: 0;
    font-weight: 300;
}

/* 装饰图形 */
.decoration-graphics {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.graphic-item {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    animation: float 20s ease-in-out infinite;
}

.graphic-1 {
    width: 200px;
    height: 200px;
    top: 10%;
    left: 10%;
    animation-delay: 0s;
}

.graphic-2 {
    width: 150px;
    height: 150px;
    top: 60%;
    right: 15%;
    animation-delay: 7s;
}

.graphic-3 {
    width: 100px;
    height: 100px;
    bottom: 20%;
    left: 20%;
    animation-delay: 14s;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0px) scale(1);
    }

    33% {
        transform: translateY(-30px) scale(1.1);
    }

    66% {
        transform: translateY(20px) scale(0.9);
    }
}

/* 右侧登录区域 */
.login-area {
    width: 480px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
}

.login-box {
    width: 100%;
    max-width: 360px;
}

/* 标签切换 */
.tab-header {
    display: flex;
    margin-bottom: 40px;
    background: #f0f0f0;
    border-radius: 8px;
    padding: 4px;
}

.tab-btn {
    flex: 1;
    padding: 12px;
    background: none;
    border: none;
    font-size: 16px;
    font-weight: 500;
    color: #666;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.tab-btn.active {
    background: #fff;
    color: #1890ff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 表单内容 */
.form-content {
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.form-item {
    margin-bottom: 20px;
}

/* 输入框样式 */
.input-field :deep(.arco-input-wrapper) {
    border-radius: 8px;
    border: 1px solid #d9d9d9;
    transition: all 0.2s ease;
    height: 48px;
}

.input-field :deep(.arco-input-wrapper:hover) {
    border-color: #1890ff;
}

.input-field :deep(.arco-input-wrapper.arco-input-focus) {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.input-field :deep(.arco-input) {
    padding-left: 40px;
    font-size: 14px;
}

.input-icon {
    color: #bfbfbf;
    font-size: 16px;
}

/* 表单选项 */
.form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
}

.remember-checkbox :deep(.arco-checkbox-label) {
    font-size: 14px;
    color: #666;
}

.forgot-link {
    font-size: 14px;
    color: #1890ff;
    text-decoration: none;
}

/* 协议部分 */
.agreement-section {
    margin-bottom: 24px;
}

.agreement-checkbox :deep(.arco-checkbox-label) {
    font-size: 12px;
    color: #666;
    line-height: 1.5;
}

.agreement-link {
    color: #1890ff;
    font-size: 12px;
}

/* 提交按钮 */
.submit-btn {
    height: 48px;
    border-radius: 8px;
    background: #1890ff;
    border: none;
    font-size: 16px;
    font-weight: 500;
}

.submit-btn:hover {
    background: #40a9ff;
}

.submit-btn:disabled {
    background: #f5f5f5;
    color: #bfbfbf;
}

/* 第三方登录 */
.third-party-login {
    margin-top: 32px;
    text-align: center;
}

.divider-line {
    position: relative;
    margin-bottom: 24px;
}

.divider-line::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #f0f0f0;
}

.divider-line span {
    background: #fff;
    color: #999;
    padding: 0 16px;
    font-size: 12px;
}

.social-buttons {
    display: flex;
    justify-content: center;
    gap: 16px;
}

.social-btn {
    width: 48px;
    height: 48px;
    border: 1px solid #e8e8e8;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.social-btn:hover {
    border-color: #1890ff;
    transform: translateY(-2px);
}

.social-icon {
    width: 24px;
    height: 24px;
    background-size: contain;
}

.wechat-icon {
    background: #07c160;
    border-radius: 4px;
}

.qq-icon {
    background: #1296db;
    border-radius: 4px;
}

.github-icon {
    background: #24292e;
    border-radius: 4px;
}

/* 响应式 */
@media (max-width: 768px) {
    .login-container {
        flex-direction: column;
    }

    .decoration-area {
        height: 200px;
        padding: 40px 20px;
    }

    .welcome-title {
        font-size: 28px;
    }

    .login-area {
        width: 100%;
        padding: 20px;
    }
}
</style>