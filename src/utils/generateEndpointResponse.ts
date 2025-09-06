interface GenerateEndpointResponseProps {
  data: any;
  message: string;
  status: number;
}

export function generateEndpointResponse({
  data,
  message,
  status,
}: GenerateEndpointResponseProps) {
  return new Response(
    JSON.stringify({
      data,
      message,
      status,
    }),
    {
      status: status,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
