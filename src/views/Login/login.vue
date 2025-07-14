<template>
    <div class="login-container">
        <!-- 背景装饰 -->
        <div class="background-decoration">
            <div class="floating-shape shape-1"></div>
            <div class="floating-shape shape-2"></div>
            <div class="floating-shape shape-3"></div>
        </div>

        <!-- 中央登录区域 -->
        <div class="login-wrapper">
            <div class="login-card">
                <!-- 品牌logo -->
                <div class="brand-header">
                    <div class="logo">
                        <div class="logo-icon">S</div>
                        <span class="brand-name">SimpleMe</span>
                    </div>
                    <p class="brand-subtitle">简单高效的协作平台</p>
                </div>

                <!-- 标题切换 -->
                <div class="tab-switcher">
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
                <div v-if="loginOrRegister === 'login'" class="form-section">
                    <a-form :model="loginForm" @submit="handleLogin" layout="vertical">
                        <a-form-item>
                            <a-input v-model:value="loginForm.username" placeholder="手机号/邮箱/用户名" size="large"
                                class="input-field">
                                <template #prefix>
                                    <icon-user class="input-icon" />
                                </template>
                            </a-input>
                        </a-form-item>

                        <a-form-item>
                            <a-input-password v-model:value="loginForm.password" placeholder="请输入密码" size="large"
                                class="input-field">
                                <template #prefix>
                                    <icon-lock class="input-icon" />
                                </template>
                            </a-input-password>
                        </a-form-item>

                        <!-- 选项行 -->
                        <div class="form-options">
                            <a-checkbox v-model="rememberPassword" class="remember-me">
                                记住密码
                            </a-checkbox>
                            <a-link class="forgot-password" @click="handleForgotPassword">
                                忘记密码？
                            </a-link>
                        </div>

                        <a-form-item>
                            <a-button type="primary" html-type="submit" size="large" block class="submit-button"
                                :loading="loading">
                                登录
                            </a-button>
                        </a-form-item>
                    </a-form>
                </div>

                <!-- 注册表单 -->
                <div v-if="loginOrRegister === 'register'" class="form-section">
                    <a-form :model="registerForm" @submit="handleRegister" layout="vertical">
                        <a-form-item>
                            <a-input v-model:value="registerForm.email" placeholder="请输入邮箱" size="large"
                                class="input-field">
                                <template #prefix>
                                    <icon-email class="input-icon" />
                                </template>
                            </a-input>
                        </a-form-item>

                        <a-form-item>
                            <a-input v-model:value="registerForm.username" placeholder="请输入用户名" size="large"
                                class="input-field">
                                <template #prefix>
                                    <icon-user class="input-icon" />
                                </template>
                            </a-input>
                        </a-form-item>

                        <a-form-item>
                            <a-input-password v-model:value="registerForm.password" placeholder="请输入密码" size="large"
                                class="input-field">
                                <template #prefix>
                                    <icon-lock class="input-icon" />
                                </template>
                            </a-input-password>
                        </a-form-item>

                        <!-- 协议同意 -->
                        <div class="agreement-section">
                            <a-checkbox v-model="agreeTerms" class="agreement-checkbox">
                                我已阅读并同意
                                <a-link class="agreement-link">《服务协议》</a-link>
                                和
                                <a-link class="agreement-link">《隐私政策》</a-link>
                            </a-checkbox>
                        </div>

                        <a-form-item>
                            <a-button type="primary" html-type="submit" size="large" block class="submit-button"
                                :loading="loading" :disabled="!agreeTerms">
                                注册
                            </a-button>
                        </a-form-item>
                    </a-form>
                </div>

                <!-- 第三方登录 -->
                <div class="social-login">
                    <div class="divider">
                        <span>其他登录方式</span>
                    </div>
                    <div class="social-buttons">
                        <button class="social-btn wechat" @click="handleSocialLogin('wechat')">
                            <div class="social-icon wechat-icon"></div>
                        </button>
                        <button class="social-btn qq" @click="handleSocialLogin('qq')">
                            <div class="social-icon qq-icon"></div>
                        </button>
                        <button class="social-btn github" @click="handleSocialLogin('github')">
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
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
}

/* 背景装饰 */
.background-decoration {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
}

.floating-shape {
    position: absolute;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    animation: float 20s ease-in-out infinite;
}

.shape-1 {
    width: 200px;
    height: 200px;
    top: 10%;
    left: 10%;
    animation-delay: 0s;
}

.shape-2 {
    width: 150px;
    height: 150px;
    top: 50%;
    right: 15%;
    animation-delay: 8s;
}

.shape-3 {
    width: 120px;
    height: 120px;
    bottom: 20%;
    left: 20%;
    animation-delay: 16s;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0px) scale(1);
    }

    33% {
        transform: translateY(-20px) scale(1.02);
    }

    66% {
        transform: translateY(15px) scale(0.98);
    }
}

/* 登录包装器 */
.login-wrapper {
    position: relative;
    width: 100%;
    max-width: 400px;
}

/* 登录卡片 */
.login-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 40px 32px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

/* 品牌头部 */
.brand-header {
    text-align: center;
    margin-bottom: 32px;
}

.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
}

.logo-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 18px;
    font-weight: bold;
    margin-right: 12px;
}

.brand-name {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    letter-spacing: -0.5px;
}

.brand-subtitle {
    color: #666;
    font-size: 14px;
    margin: 0;
    font-weight: 400;
}

/* 标签切换器 */
.tab-switcher {
    display: flex;
    background: #f8f9fa;
    border-radius: 12px;
    padding: 4px;
    margin-bottom: 24px;
}

.tab-btn {
    flex: 1;
    padding: 10px;
    background: none;
    border: none;
    font-size: 14px;
    font-weight: 500;
    color: #666;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.tab-btn.active {
    background: white;
    color: #667eea;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
}

/* 表单区域 */
.form-section {
    animation: slideIn 0.4s ease;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 输入框样式 */
.input-field {
    margin-bottom: 16px;
}

.input-field :deep(.arco-input-wrapper) {
    border-radius: 12px;
    border: 1px solid #e8e9ea;
    background: #fafbfc;
    transition: all 0.3s ease;
    height: 48px;
}

.input-field :deep(.arco-input-wrapper:hover) {
    border-color: #667eea;
    background: white;
}

.input-field :deep(.arco-input-wrapper.arco-input-focus) {
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.input-field :deep(.arco-input) {
    background: transparent;
    padding-left: 40px;
    font-size: 14px;
    color: #333;
}

.input-field :deep(.arco-input::placeholder) {
    color: #aaa;
}

.input-icon {
    color: #999;
    font-size: 16px;
}

/* 表单选项 */
.form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
}

.remember-me :deep(.arco-checkbox-label) {
    font-size: 14px;
    color: #666;
}

.forgot-password {
    font-size: 14px;
    color: #667eea;
    text-decoration: none;
}

.forgot-password:hover {
    color: #5a6fd8;
}

/* 协议部分 */
.agreement-section {
    margin-bottom: 24px;
}

.agreement-checkbox :deep(.arco-checkbox-label) {
    font-size: 13px;
    color: #666;
    line-height: 1.5;
}

.agreement-link {
    color: #667eea;
    font-size: 13px;
}

/* 提交按钮 */
.submit-button {
    height: 48px;
    border-radius: 12px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 24px;
    transition: all 0.3s ease;
}

.submit-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.submit-button:disabled {
    background: #e8e9ea;
    color: #aaa;
    transform: none;
    box-shadow: none;
}

/* 第三方登录 */
.social-login {
    text-align: center;
}

.divider {
    position: relative;
    margin-bottom: 20px;
}

.divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #e8e9ea;
}

.divider span {
    background: rgba(255, 255, 255, 0.95);
    color: #999;
    padding: 0 16px;
    font-size: 12px;
}

.social-buttons {
    display: flex;
    justify-content: center;
    gap: 12px;
}

.social-btn {
    width: 44px;
    height: 44px;
    border: 1px solid #e8e9ea;
    border-radius: 12px;
    background: white;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.social-btn:hover {
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.social-icon {
    width: 20px;
    height: 20px;
    border-radius: 4px;
}

.wechat-icon {
    background: #07c160;
}

.qq-icon {
    background: #1296db;
}

.github-icon {
    background: #24292e;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .login-container {
        padding: 16px;
    }

    .login-card {
        padding: 32px 24px;
        border-radius: 16px;
    }

    .brand-name {
        font-size: 20px;
    }
}

@media (max-width: 480px) {
    .login-wrapper {
        max-width: 100%;
    }

    .login-card {
        padding: 24px 20px;
    }

    .social-buttons {
        gap: 8px;
    }

    .social-btn {
        width: 40px;
        height: 40px;
    }
}
</style>