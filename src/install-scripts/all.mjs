import sysAll from './sys/all.mjs'
import userAll from './user/all.mjs'

export default async () => {
  await sysAll()
  await userAll()
}
