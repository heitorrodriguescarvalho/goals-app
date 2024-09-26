import { z } from 'zod'

export const AuthSchema = z.object({
  email: z
    .string()
    .min(1, 'Informe seu email')
    .email('Informe um email válido'),
  password: z
    .string()
    .min(1, 'Informe uma senha')
    .min(8, 'A senha deve conter pelo menos 8 caracteres')
    .max(32, 'A senha deve conter no máximo 32 caracteres'),
})
