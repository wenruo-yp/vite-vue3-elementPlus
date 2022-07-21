<template>
    <div id="login">
        <div class="login-container">
            <div class="headerTitle">后台管理平台</div>
            <el-form :model="loginForm" :rules="rules" ref="loginRef" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="请输入用户名" clearable>
                        <template #prepend>
                            <el-icon><User/></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输密码" v-model="loginForm.password" clearable>
                        <template #prepend>
                            <el-icon><Lock/></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-button type="primary" @click="submitForm" style="width: 100%;">登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
export default {
    setup() {
        const loginForm = reactive({
            username: "admin",
            password: "123456",
        });
        const rules = {
            username: [
                { required: true,message: "请输入用户名",trigger: "blur",}
            ],
            password: [
                { required: true, message: "请输入密码", trigger: "blur" }
            ]
        };

        const loginRef = ref(null);

        const submitForm = () => {
            loginRef.value.validate((valid) => {
                if (valid) {
                    ElMessage.success("登录成功");
                } else {
                    ElMessage.error("请检查登录名或密码是否正确");
                    return false;
                }
            });
        };

        return {
            loginForm,
            rules,
            loginRef,
            submitForm
        };
    },
};
</script>
<style lang="scss" scoped>
#login{
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login/login2.jpg);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: 100% 100%;
    position: relative;
    .login-container{
        position: absolute;
        top: 38%;
        right: 16%;
        width: 280px;
        background: #a4cbda;
        padding: 10px 20px 20px 20px;
        box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);
        border-radius: 4px;
        .headerTitle{
            text-align: center;
            margin: 10px 0 20px 0;
            font-size: 22px;
            font-weight: 550;
            color: #fff;
            letter-spacing: 4px;
        }
    }
}
</style>