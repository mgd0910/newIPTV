let debug = process.env.NODE_ENV == 'development'

const config = {
    isMobile () {
        return window.innerWidth < 767
    },
    apiHost: process.apiHost,
    debug
}

export default config