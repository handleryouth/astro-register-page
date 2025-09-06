import z from "astro:schema";
import { generateEndpointResponse } from "../../utils/generateEndpointResponse";

export const prerender = false;

export async function POST({ request }) {
  try {
    const body = await request.json();
    const registerSchema = z.object({
      fullName: z.string({ message: "Full name must be filled" }),
      email: z
        .string({ message: "Email must be filled" })
        .email({ message: "Input must be in email format" }),
      githubUsername: z.string({ message: "Github username must be filled" }),
    });
    const parseResult = registerSchema.safeParse(body);
    if (parseResult.success) {
      const successResponse = generateEndpointResponse({
        data: parseResult.data,
        message: "Success Parsing",
        status: 200,
      });

      return successResponse;
    } else {
      const errorResponse = generateEndpointResponse({
        data: null,
        message: parseResult.error.message,
        status: 200,
      });
      return errorResponse;
    }
  } catch (err: any) {
    const errorResponse = generateEndpointResponse({
      data: null,
      message: err.message,
      status: 500,
    });
    return errorResponse;
  }
}
