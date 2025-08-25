import { Assets } from 'pixi.js'

const AssetLoader = (() => {
  let instance

  function createInstance() {
    const concurrency = 10
    const queue = []
    let running = 0

    async function load(key, fallbackKey) {
      if (Assets.cache.has(key)) {
        return Promise.resolve(Assets.cache.get(key))
      }

      return new Promise((resolve, reject) => {
        const task = async () => {
          running++
          try {
            const tex = await Assets.load(key)
            resolve(tex)
          } catch (err) {
            // eslint-disable-next-line no-console
            console.warn(
              `Failed to load asset: ${key}, fallback to ${fallbackKey}`,
              err
            )
            if (fallbackKey) {
              try {
                const fallback = await Assets.load(fallbackKey)
                resolve(fallback)
              } catch (fallbackErr) {
                reject(fallbackErr)
              }
            } else {
              reject(err)
            }
          } finally {
            running--
            runNext()
          }
        }

        if (running < concurrency) {
          task()
        } else {
          queue.push(task)
        }
      })
    }

    function runNext() {
      if (queue.length > 0 && running < concurrency) {
        const next = queue.shift()
        next()
      }
    }

    return { load }
  }

  return {
    getInstance() {
      if (!instance) {
        instance = createInstance()
      }
      return instance
    }
  }
})()

export default AssetLoader.getInstance()
