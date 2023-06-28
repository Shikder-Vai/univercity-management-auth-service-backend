import { z } from 'zod';

const createUserZodShcema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'role is require',
    }),
    password: z.string().optional(),
  }),
});

export const zodUserValidation = { createUserZodShcema };

/**
 * request validation by zod
 * body =>  object
 * data => object
 */
