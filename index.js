import {
  SpellBase,
  SpellResult,
  DefaultDisplayType,
} from 'zeppelin-spell'

export default class EchoSpell extends SpellBase {
  constructor() {
    super("%echo")
  }

  interpret(paragraphText, config) {

    const { repeat, delay, } = this.getConfig(config)

    let text = ''

    for (let i = 0; i < repeat; i++) {
      text += `${paragraphText}\n`
    }

    const p = new Promise(resolve => {
      setTimeout(() => {
        resolve(text)
      }, delay)
    })

    return new SpellResult(p)
  }

  getConfig(config) {
    let repeat = 1
    let delay = 1000

    try {
      repeat = parseInt(config.repeat)
      delay = parseInt(config.delay)
    } catch(error) { /** use default value */ }

    return { repeat, delay, }
  }
}
