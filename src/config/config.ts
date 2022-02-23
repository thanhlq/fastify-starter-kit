//Thanh LE, 2022/02/23

export default class Configuration {

  isProduction(): boolean {
    return (process.env.NODE_DEEV === 'production')
  }
}
