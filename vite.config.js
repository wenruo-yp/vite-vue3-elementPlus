const resolve = path.resolve
import vue from '@vitejs/plugin-vue'
import path from "path"
import { defineConfig , loadEnv } from "vite"
import { viteMockServe } from 'vite-plugin-mock'
import ElementPlus from 'unplugin-element-plus/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


export default ({ mode }) =>{
    const env = loadEnv(mode,process.cwd());
    return defineConfig({
        base: './',
        plugins: [
            vue(),
            viteMockServe({
                // default
                mockPath: './mock',
                localEnabled: mode === 'development',//本地启用测试环境
            }),
            ElementPlus({
                useSource: true,
            }),
            AutoImport({
                // 自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
                resolvers: [ElementPlusResolver({
                    importStyle: "sass",
                })],
            }),
            Components({
                // 自动引入修改主题色添加这一行，使用预处理样式
                resolvers: [ElementPlusResolver({
                    importStyle: "sass",
                })],
            }),          
        ],
        css: {
            preprocessorOptions: {
              scss: {
                // 自定义主题颜色
                additionalData: `@use "@/styles/element/index.scss" as *;`,
              },
            },
        },
        optimizeDeps: {
            //默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。
            include: ['schart.js']
        },
        resolve: {
            // 配置资源路径
            alias: {
                "@/": `${path.resolve(__dirname, "src")}/`,
            },
        },
        server: {
            host: '172.20.4.72',
            port:8080,
            proxy:{
              '/assets':{
                target:'http://localhost:9998',//需要跨域的地址
                changeOrigin:true, //是否开启跨域
              }
            },
        },
        build: {
            outDir: './dist/',
            assetsDir: 'static/css/', // 指定生成静态资源的存放路径
            // 清除console和debugger
            terserOptions: {
              compress: {
                drop_console: true,
                drop_debugger: true,
              },
            },
            // chunkSizeWarningLimit: 1500,大文件报警阈值设置,不建议使用
            rollupOptions: {
                output: { 
                    //静态资源分类打包
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    entryFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
                    manualChunks(id) { 
                            //静态资源分拆打包
                            if (id.includes('node_modules')) {
                                return id.toString().split('node_modules/')[1].split('/')[0].toString();
                            }
                        }
                }
            }
        }
    })
}