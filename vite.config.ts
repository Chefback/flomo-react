import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    return {
        build: {
            sourcemap: true
        },
        plugins: [
            react(),
            sentryVitePlugin({
                org: process.env.SENTRY_ORG,
                project: process.env.SENTRY_PROJECT,
                ignore: ['node_modules'],
                urlPrefix: '~/flomo',
                include: './dist',
                release: '1.0',
                authToken: process.env.SENTRY_AUTH_TOKEN
            })
        ],
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
            }
        },
        css: {
            preprocessorOptions: {
                less: {
                    modifyVars: {
                        'primary-color': '#30cf79'
                    },
                    additionalData: `@import '@/styles/variables.less';`,
                    javascriptEnabled: true
                }
            }
        },
        base: './', // 设置打包路径
        server: {
            port: 3000, // 设置服务启动端口号
            open: false, // 设置服务启动时是否自动打开浏览器
            cors: true // 允许跨域
            // proxy: {
            //   '/api': {
            //     target: 'http://xxx.xxx.xxx.xxx:8000',
            //     changeOrigin: true,
            //     secure: false,
            //     rewrite: (path) => path.replace('/api/', '/')
            //   }
            // }
        }
    }
})
