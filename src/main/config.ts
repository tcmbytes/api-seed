import { cleanEnv, port, str } from 'envalid'

export type Config = {
  HOSTNAME: string
  PORT: number
}

export const config = cleanEnv<Config>(
  process.env,
  {
    HOSTNAME: str({ default: '', desc: 'Server hostname' }),
    PORT: port({ default: 8000, desc: 'Server port' }),
  },
  {
    reporter: (opts): void => {
      const errors = opts.errors
      if (!Object.keys(errors).length) {
        return
      }

      const errorDetails = Object.entries(errors).reduce<Record<string, string>>((acc, [key, value]) => {
        if (value) {
          acc[key] = value?.message
        }

        return acc
      }, {})

      throw new Error('ENV_VARIABLE_ISSUE \n' + JSON.stringify(errorDetails, null, '\t'))
    },
  },
)
