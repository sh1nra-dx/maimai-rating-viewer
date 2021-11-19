/**
 *  舞萌DX底分对象查看器 - 应用配置文件
 * 
 *  @author X-buster <shinra.dx@outlook.com>
 *  @license MIT
 */

const config: IConfig = {
    app: {
        debug: false
    },
    data: {
        api: {
            url: "https://api.mairating.shinra-dx.plus/",
            devUrl: "http://localhost/",
            suffix: ".json"
        },
        prober: "https://www.diving-fish.com/api/maimaidxprober/query/player"
    }
}

/* 以下内容请勿修改 */

interface IConfig {
    app: {
        debug: boolean
    }
    data: {
        api: {
            url: string
            devUrl: string
            suffix: string
        }
        prober: string
    }
}

export default config

/* 以上内容请勿修改 */